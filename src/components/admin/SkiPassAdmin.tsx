import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { 
  Ticket, 
  AlertCircle, 
  Settings, 
  Save,
  Info,
  Sparkles,
  Percent
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getPropertyDetails } from "@/data/propertyDetails";
import {
  getSkiPassSettings,
  saveSkiPassSettings,
  toggleSkiPassAllocation,
  getPeriodAllocationStatus,
  getAvailablePassesForDateRange,
  canAllocateSkiPass,
  cleanupExpiredAllocations,
  getBlockingDays,
  getActiveAllocations,
  generatePeriodId,
  updatePeriodSettings,
  getPeriodSettings,
  SkiPassSettings
} from "@/data/skiPassAllocations";

interface Beds24Deal {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  price: number | null;
  currency: string;
  maxPersons: number;
  available: boolean;
}

// Fetch Beds24 availability
const fetchBeds24Availability = async (): Promise<Beds24Deal[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('beds24-availability');
    if (error) {
      console.error('Error fetching Beds24 availability:', error);
      return [];
    }
    return data?.deals || [];
  } catch (err) {
    console.error('Error fetching Beds24 availability:', err);
    return [];
  }
};

const SkiPassAdmin = () => {
  const [settings, setSettings] = useState<SkiPassSettings>(getSkiPassSettings());
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempCapacity, setTempCapacity] = useState(settings.totalCapacity);
  const { toast } = useToast();

  // Fetch Beds24 deals
  const { data: beds24Deals = [], isLoading } = useQuery({
    queryKey: ['beds24-availability-admin'],
    queryFn: fetchBeds24Availability,
    staleTime: 5 * 60 * 1000,
  });

  // Cleanup expired allocations on mount
  useEffect(() => {
    cleanupExpiredAllocations();
  }, []);

  // Get allocation status directly from localStorage
  const getAllocationStatus = useCallback((roomId: string, checkIn: string, checkOut: string): boolean => {
    return getPeriodAllocationStatus(roomId, checkIn, checkOut);
  }, [refreshKey]);

  const handleToggleAllocation = (deal: Beds24Deal) => {
    const periodKey = generatePeriodId(deal.roomId, deal.checkIn, deal.checkOut);
    const currentStatus = getAllocationStatus(deal.roomId, deal.checkIn, deal.checkOut);
    
    if (!currentStatus) {
      if (!canAllocateSkiPass(deal.checkIn, deal.checkOut, periodKey)) {
        const blockingDays = getBlockingDays(deal.checkIn, deal.checkOut, periodKey);
        const blockedDatesStr = blockingDays
          .slice(0, 3)
          .map(d => `${format(new Date(d.date), "d.M")} (${d.used}/${d.capacity})`)
          .join(", ");
        const moreText = blockingDays.length > 3 ? ` (+${blockingDays.length - 3} muuta)` : "";
        
        toast({
          title: "Kapasiteetti täynnä",
          description: `Ei riitä lippuja koko ajalle. Täynnä päivinä: ${blockedDatesStr}${moreText}`,
          variant: "destructive"
        });
        return;
      }
    }
    
    const result = toggleSkiPassAllocation(deal.roomId, deal.checkIn, deal.checkOut);
    
    if (result.success) {
      setRefreshKey(prev => prev + 1);
      toast({
        title: currentStatus ? "Hissilippu poistettu" : "Hissilippu annettu",
        description: `${getMarketingName(deal)} ${format(new Date(deal.checkIn), "d.M")} - ${format(new Date(deal.checkOut), "d.M")}`
      });
    } else {
      toast({
        title: "Virhe",
        description: result.error || "Tuntematon virhe",
        variant: "destructive"
      });
    }
  };

  const handleToggleSpecialOffer = (deal: Beds24Deal, checked: boolean) => {
    updatePeriodSettings(deal.roomId, deal.checkIn, deal.checkOut, { specialOffer: checked });
    setRefreshKey(prev => prev + 1);
    toast({
      title: checked ? "Erikoistarjous lisätty" : "Erikoistarjous poistettu",
      description: `${getMarketingName(deal)} ${format(new Date(deal.checkIn), "d.M")} - ${format(new Date(deal.checkOut), "d.M")}`
    });
  };

  const handleUpdateDiscount = (deal: Beds24Deal, discount: number | null) => {
    updatePeriodSettings(deal.roomId, deal.checkIn, deal.checkOut, { customDiscount: discount });
    setRefreshKey(prev => prev + 1);
  };

  const handleToggleShowDiscount = (deal: Beds24Deal, checked: boolean) => {
    updatePeriodSettings(deal.roomId, deal.checkIn, deal.checkOut, { showDiscountBadge: checked });
    setRefreshKey(prev => prev + 1);
  };

  const handleSaveSettings = () => {
    saveSkiPassSettings({ totalCapacity: tempCapacity });
    setSettings({ ...settings, totalCapacity: tempCapacity });
    setEditingSettings(false);
    setRefreshKey(prev => prev + 1);
    toast({
      title: "Asetukset tallennettu",
      description: `Hissilippukapasiteetti: ${tempCapacity} lippua`
    });
  };

  const getMarketingName = (deal: Beds24Deal): string => {
    const property = getPropertyDetails(deal.roomId);
    return property?.name || deal.roomName;
  };

  // Calculate discounted price for a deal (with custom discount from period settings)
  const calculateDiscountedPrice = (deal: Beds24Deal, customDiscount: number | null): number | null => {
    if (!deal.price) return null;
    if (!customDiscount) return deal.price;
    return Math.round(deal.price * (1 - customDiscount / 100));
  };

  // Get the original API price + cleaning fee
  const getOriginalApiPrice = (deal: Beds24Deal): number | null => {
    if (!deal.price) return null;
    const property = getPropertyDetails(deal.roomId);
    const cleaningFee = property?.cleaningFee || 0;
    return Math.round(deal.price + cleaningFee);
  };

  // Get the current displayed price (with property-level discounts)
  const getCurrentDisplayPrice = (deal: Beds24Deal): number | null => {
    if (!deal.price) return null;
    const property = getPropertyDetails(deal.roomId);
    const cleaningFee = property?.cleaningFee || 0;
    let basePrice = deal.price;
    
    // Apply property-level discount based on nights
    let discount = 0;
    if (deal.nights === 1 && property?.oneNightDiscount) {
      discount = property.oneNightDiscount;
    } else if (deal.nights === 2 && property?.twoNightDiscount) {
      discount = property.twoNightDiscount;
    } else if (deal.nights >= 3 && property?.longStayDiscount) {
      discount = property.longStayDiscount;
    }
    
    if (discount > 0) {
      basePrice = basePrice * (1 - discount / 100);
    }
    
    return Math.round(basePrice + cleaningFee);
  };

  // Get the special offer price (additional discount on top of PropertyAdmin discount)
  const getSpecialOfferPrice = (deal: Beds24Deal, customDiscount: number | null): number | null => {
    if (!deal.price || !customDiscount) return null;
    // First get the PropertyAdmin discounted price
    const currentPrice = getCurrentDisplayPrice(deal);
    if (!currentPrice) return null;
    // Apply custom discount as additional discount on top of PropertyAdmin price
    return Math.round(currentPrice * (1 - customDiscount / 100));
  };

  // Group deals by property
  const dealsByProperty = beds24Deals.reduce((acc, deal) => {
    if (!acc[deal.roomId]) {
      acc[deal.roomId] = [];
    }
    acc[deal.roomId].push(deal);
    return acc;
  }, {} as Record<string, Beds24Deal[]>);

  // Calculate daily usage statistics
  const getDailyUsageStats = useCallback((): { maxUsed: number; maxDate: string | null } => {
    const activeAllocs = getActiveAllocations();
    if (activeAllocs.length === 0) return { maxUsed: 0, maxDate: null };
    
    const dateUsage: Record<string, number> = {};
    const currentSettings = getSkiPassSettings();
    
    for (const alloc of activeAllocs) {
      const startDate = new Date(alloc.checkIn);
      const endDate = new Date(alloc.checkOut);
      const current = new Date(startDate);
      
      while (current < endDate) {
        const dateKey = current.toISOString().split('T')[0];
        dateUsage[dateKey] = (dateUsage[dateKey] || 0) + currentSettings.passesPerAllocation;
        current.setDate(current.getDate() + 1);
      }
    }
    
    let maxUsed = 0;
    let maxDate: string | null = null;
    for (const [date, used] of Object.entries(dateUsage)) {
      if (used > maxUsed) {
        maxUsed = used;
        maxDate = date;
      }
    }
    
    return { maxUsed, maxDate };
  }, [refreshKey]);

  const usageStats = getDailyUsageStats();
  const availablePasses = settings.totalCapacity - usageStats.maxUsed;

  return (
    <div className="space-y-6">
      {/* Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5" />
            Hissilippuasetukset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Label className="text-sm text-muted-foreground">Kapasiteetti (lippuja):</Label>
              {editingSettings ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={tempCapacity}
                    onChange={(e) => setTempCapacity(Number(e.target.value))}
                    className="w-20 h-8"
                    min={2}
                    step={2}
                  />
                  <Button size="sm" onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-1" />
                    Tallenna
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => {
                    setTempCapacity(settings.totalCapacity);
                    setEditingSettings(false);
                  }}>
                    Peruuta
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {settings.totalCapacity}
                  </Badge>
                  <Button size="sm" variant="ghost" onClick={() => setEditingSettings(true)}>
                    Muokkaa
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-sm">
                <span className="text-muted-foreground">Max käyttö/pv:</span>
                <Badge className={usageStats.maxUsed > 0 ? "bg-cyan-500/20 text-cyan-400 ml-2" : "ml-2"}>
                  {usageStats.maxUsed} / {settings.totalCapacity}
                </Badge>
                {usageStats.maxDate && (
                  <span className="text-xs text-muted-foreground ml-1">
                    ({format(new Date(usageStats.maxDate), "d.M")})
                  </span>
                )}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Vapaana min:</span>
                <Badge className={availablePasses > 0 ? "bg-green-500/20 text-green-400 ml-2" : "bg-red-500/20 text-red-400 ml-2"}>
                  {availablePasses}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Jokainen varaus käyttää 2 lippua (1 setti). Kapasiteetti {settings.totalCapacity}/pv = maksimissaan {settings.totalCapacity / 2} päällekkäistä varausta samana päivänä.</span>
          </div>
        </CardContent>
      </Card>

      {/* Periods by Property */}
      {isLoading ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Ladataan vapaita jaksoja...
          </CardContent>
        </Card>
      ) : Object.keys(dealsByProperty).length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Ei vapaita jaksoja tällä hetkellä.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Ticket className="w-5 h-5 text-cyan-400" />
            Vapaat jaksot - Hissilippujen, erikoistarjousten ja alennusten hallinta
          </h3>
          
          {Object.entries(dealsByProperty).map(([roomId, deals]) => {
            const property = getPropertyDetails(roomId);
            const propertyName = property?.name || deals[0]?.roomName || roomId;
            
            return (
              <Card key={roomId}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">
                    {propertyName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {deals.map(deal => {
                      const periodKey = generatePeriodId(deal.roomId, deal.checkIn, deal.checkOut);
                      const isAllocated = getAllocationStatus(deal.roomId, deal.checkIn, deal.checkOut);
                      const periodSettings = getPeriodSettings(deal.roomId, deal.checkIn, deal.checkOut);
                      const availableForPeriod = getAvailablePassesForDateRange(
                        deal.checkIn, 
                        deal.checkOut,
                        isAllocated ? periodKey : undefined
                      );
                      const canAllocate = availableForPeriod >= settings.passesPerAllocation || isAllocated;
                      const discountedPrice = calculateDiscountedPrice(deal, periodSettings.customDiscount);
                      
                      return (
                        <div 
                          key={deal.id} 
                          className={`p-4 rounded-lg border ${
                            isAllocated || periodSettings.specialOffer
                              ? 'bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border-cyan-500/30' 
                              : 'bg-muted/20 border-border'
                          }`}
                        >
                          {/* Row 1: Dates and price info */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                              <div className="text-sm">
                                <span className="font-medium">
                                  {format(new Date(deal.checkIn), "d.M.yyyy", { locale: fi })}
                                </span>
                                <span className="text-muted-foreground mx-2">–</span>
                                <span className="font-medium">
                                  {format(new Date(deal.checkOut), "d.M.yyyy", { locale: fi })}
                                </span>
                                <span className="text-muted-foreground ml-2">
                                  ({deal.nights} {deal.nights === 1 ? 'yö' : 'yötä'})
                                </span>
                              </div>
                              
                              {/* Badges */}
                              <div className="flex items-center gap-2">
                                {isAllocated && (
                                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                                    <Ticket className="w-3 h-3 mr-1" />
                                    2 hissilippua
                                  </Badge>
                                )}
                                {periodSettings.specialOffer && (
                                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Erikoistarjous
                                  </Badge>
                                )}
                                {periodSettings.customDiscount && periodSettings.customDiscount > 0 && (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                    <Percent className="w-3 h-3 mr-1" />
                                    -{periodSettings.customDiscount}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {/* Price display - show all three prices */}
                            <div className="text-right space-y-1">
                              {deal.price ? (
                                <>
                                  {/* API price */}
                                  <div className="text-xs text-muted-foreground">
                                    API: <span className="font-medium">{getOriginalApiPrice(deal)}€</span>
                                  </div>
                                  {/* Current displayed price */}
                                  <div className="text-sm">
                                    Nyt: <span className="font-semibold text-foreground">{getCurrentDisplayPrice(deal)}€</span>
                                  </div>
                                  {/* Special offer price (if discount is set) */}
                                  {periodSettings.customDiscount && periodSettings.customDiscount > 0 && (
                                    <div className="text-sm">
                                      Erikoistarjous: <span className="font-bold text-green-400">{getSpecialOfferPrice(deal, periodSettings.customDiscount)}€</span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <span className="text-muted-foreground text-sm">Hinta ei saatavilla</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Row 2: Controls */}
                          <div className="flex items-center gap-6 pt-2 border-t border-border/50">
                            {/* Ski pass toggle */}
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`skipass-${deal.id}`}
                                checked={isAllocated}
                                onCheckedChange={() => handleToggleAllocation(deal)}
                                disabled={!canAllocate && !isAllocated}
                              />
                              <Label 
                                htmlFor={`skipass-${deal.id}`}
                                className={`text-sm ${!canAllocate && !isAllocated ? 'text-muted-foreground' : ''}`}
                              >
                                Hissilippu
                              </Label>
                              {!canAllocate && !isAllocated && (
                                <Badge variant="outline" className="text-amber-400 border-amber-500/30 text-xs">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Täynnä
                                </Badge>
                              )}
                            </div>
                            
                            {/* Special offer toggle */}
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`special-${deal.id}`}
                                checked={periodSettings.specialOffer}
                                onCheckedChange={(checked) => handleToggleSpecialOffer(deal, checked)}
                              />
                              <Label htmlFor={`special-${deal.id}`} className="text-sm">
                                Erikoistarjous
                              </Label>
                            </div>
                            
                            {/* Custom discount input */}
                            <div className="flex items-center gap-2">
                              <Label className="text-sm text-muted-foreground">Alennus %:</Label>
                              <Input
                                type="number"
                                value={periodSettings.customDiscount ?? ""}
                                onChange={(e) => handleUpdateDiscount(
                                  deal, 
                                  e.target.value ? Number(e.target.value) : null
                                )}
                                placeholder="-"
                                className="w-16 h-8 text-center"
                                min={0}
                                max={100}
                              />
                            </div>
                            
                            {/* Show discount toggle - only visible if customDiscount > 0 */}
                            {periodSettings.customDiscount && periodSettings.customDiscount > 0 && (
                              <div className="flex items-center gap-2">
                                <Switch
                                  id={`showdiscount-${deal.id}`}
                                  checked={periodSettings.showDiscountBadge}
                                  onCheckedChange={(checked) => handleToggleShowDiscount(deal, checked)}
                                />
                                <Label htmlFor={`showdiscount-${deal.id}`} className="text-sm">
                                  Näytä alennus
                                </Label>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SkiPassAdmin;