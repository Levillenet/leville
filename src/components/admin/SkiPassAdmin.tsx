import { useState, useCallback } from "react";
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
  Percent,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getDefaultPropertyDetails, getAllDefaultPropertyDetails } from "@/data/propertyDetails";
import { 
  getSkiPassSettings,
  canAllocateSkiPass,
  getBlockingDays,
  getAvailablePassesForDateRange,
  getActiveAllocationsFromDb,
  getPeriodSettingsFromDb,
  generatePeriodId,
  DbPeriodSettings
} from "@/data/skiPassAllocations";
import { useAdminSettingsManager } from "@/hooks/useAdminSettings";

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

interface SkiPassAdminProps {
  adminPassword: string;
}

const SkiPassAdmin = ({ adminPassword }: SkiPassAdminProps) => {
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempCapacity, setTempCapacity] = useState(4);
  const { toast } = useToast();
  
  const settings = getSkiPassSettings();

  const { 
    settings: dbSettings, 
    isLoading: isLoadingSettings,
    upsertPeriod,
    isSaving 
  } = useAdminSettingsManager(adminPassword);

  const periodSettings = dbSettings?.periodSettings || [];

  // Fetch Beds24 deals
  const { data: beds24Deals = [], isLoading: isLoadingDeals } = useQuery({
    queryKey: ['beds24-availability-admin'],
    queryFn: fetchBeds24Availability,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = isLoadingSettings || isLoadingDeals;

  // Get allocation status from database
  const getAllocationStatus = useCallback((roomId: string, checkIn: string, checkOut: string): boolean => {
    const period = periodSettings.find(
      p => p.property_id === roomId && p.check_in === checkIn && p.check_out === checkOut
    );
    return period?.has_ski_pass || false;
  }, [periodSettings]);

  // Get period settings from database
  const getLocalPeriodSettings = useCallback((roomId: string, checkIn: string, checkOut: string) => {
    return getPeriodSettingsFromDb(roomId, checkIn, checkOut, periodSettings);
  }, [periodSettings]);

  const handleToggleAllocation = (deal: Beds24Deal) => {
    const periodKey = generatePeriodId(deal.roomId, deal.checkIn, deal.checkOut);
    const currentStatus = getAllocationStatus(deal.roomId, deal.checkIn, deal.checkOut);
    const currentSettings = getLocalPeriodSettings(deal.roomId, deal.checkIn, deal.checkOut);
    
    if (!currentStatus) {
      // Check if we can allocate
      if (!canAllocateSkiPass(deal.checkIn, deal.checkOut, periodSettings, periodKey)) {
        const blockingDays = getBlockingDays(deal.checkIn, deal.checkOut, periodSettings, periodKey);
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
    
    // Toggle ski pass
    upsertPeriod({
      property_id: deal.roomId,
      check_in: deal.checkIn,
      check_out: deal.checkOut,
      has_ski_pass: !currentStatus,
      has_special_offer: currentSettings.specialOffer,
      custom_discount: currentSettings.customDiscount || 0,
      show_discount: currentSettings.showDiscountBadge
    });
    
    toast({
      title: currentStatus ? "Hissilippu poistettu" : "Hissilippu annettu",
      description: `${getMarketingName(deal)} ${format(new Date(deal.checkIn), "d.M")} - ${format(new Date(deal.checkOut), "d.M")}`
    });
  };

  const handleToggleSpecialOffer = (deal: Beds24Deal, checked: boolean) => {
    const currentSettings = getLocalPeriodSettings(deal.roomId, deal.checkIn, deal.checkOut);
    
    upsertPeriod({
      property_id: deal.roomId,
      check_in: deal.checkIn,
      check_out: deal.checkOut,
      has_ski_pass: currentSettings.hasSkiPass,
      has_special_offer: checked,
      custom_discount: currentSettings.customDiscount || 0,
      show_discount: currentSettings.showDiscountBadge
    });
  };

  const handleUpdateDiscount = (deal: Beds24Deal, discount: number | null) => {
    const currentSettings = getLocalPeriodSettings(deal.roomId, deal.checkIn, deal.checkOut);
    
    upsertPeriod({
      property_id: deal.roomId,
      check_in: deal.checkIn,
      check_out: deal.checkOut,
      has_ski_pass: currentSettings.hasSkiPass,
      has_special_offer: currentSettings.specialOffer,
      custom_discount: discount || 0,
      show_discount: currentSettings.showDiscountBadge
    });
  };

  const handleToggleShowDiscount = (deal: Beds24Deal, checked: boolean) => {
    const currentSettings = getLocalPeriodSettings(deal.roomId, deal.checkIn, deal.checkOut);
    
    upsertPeriod({
      property_id: deal.roomId,
      check_in: deal.checkIn,
      check_out: deal.checkOut,
      has_ski_pass: currentSettings.hasSkiPass,
      has_special_offer: currentSettings.specialOffer,
      custom_discount: currentSettings.customDiscount || 0,
      show_discount: checked
    });
  };

  const getMarketingName = (deal: Beds24Deal): string => {
    const dbOverride = dbSettings?.propertySettings?.find(s => s.property_id === deal.roomId);
    if (dbOverride?.marketing_name) return dbOverride.marketing_name;
    const property = getDefaultPropertyDetails(deal.roomId);
    return property?.name || deal.roomName;
  };

  // Get cleaning fee for a property
  const getCleaningFee = (roomId: string): number => {
    const dbOverride = dbSettings?.propertySettings?.find(s => s.property_id === roomId);
    if (dbOverride) return dbOverride.cleaning_fee;
    const property = getDefaultPropertyDetails(roomId);
    return property?.cleaningFee || 0;
  };

  // Get property-level discount
  const getPropertyDiscount = (roomId: string, nights: number): number => {
    const dbOverride = dbSettings?.propertySettings?.find(s => s.property_id === roomId);
    if (dbOverride) {
      if (nights === 1) return dbOverride.discount_1_night || 0;
      if (nights === 2) return dbOverride.discount_2_nights || 0;
      return dbOverride.discount_3_plus_nights || 0;
    }
    const property = getDefaultPropertyDetails(roomId);
    if (!property) return 0;
    if (nights === 1) return property.oneNightDiscount || 0;
    if (nights === 2) return property.twoNightDiscount || 0;
    return property.longStayDiscount || 0;
  };

  // Get the original API price + cleaning fee
  const getOriginalApiPrice = (deal: Beds24Deal): number | null => {
    if (deal.price == null) return null;
    const cleaningFee = getCleaningFee(deal.roomId);
    return Math.round(deal.price + cleaningFee);
  };

  // Get the current displayed price (with property-level discounts)
  const getCurrentDisplayPrice = (deal: Beds24Deal): number | null => {
    if (deal.price == null) return null;
    const cleaningFee = getCleaningFee(deal.roomId);
    let basePrice = deal.price;
    const discount = getPropertyDiscount(deal.roomId, deal.nights);

    if (discount > 0) {
      basePrice = basePrice * (1 - discount / 100);
    }

    return Math.round(basePrice + cleaningFee);
  };

  // Get the special offer price (additional discount)
  const getSpecialOfferPrice = (deal: Beds24Deal, customDiscount: number | null): number | null => {
    if (deal.price == null || customDiscount == null || customDiscount <= 0) return null;
    const currentPrice = getCurrentDisplayPrice(deal);
    if (currentPrice == null) return null;
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
    const activeAllocs = getActiveAllocationsFromDb(periodSettings);
    if (activeAllocs.length === 0) return { maxUsed: 0, maxDate: null };
    
    const dateUsage: Record<string, number> = {};
    const currentSettings = getSkiPassSettings();
    
    for (const alloc of activeAllocs) {
      const startDate = new Date(alloc.check_in);
      const endDate = new Date(alloc.check_out);
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
  }, [periodSettings]);

  const usageStats = getDailyUsageStats();
  const availablePasses = settings.totalCapacity - usageStats.maxUsed;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Ladataan tietoja...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comprehensive info box explaining all features */}
      <Card className="bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border-cyan-500/30">
        <CardContent className="py-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-cyan-400" />
            Jaksokohtaisten asetusten opas
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            {/* Left column - Toggle explanations */}
            <div className="space-y-4">
              <div className="bg-background/50 p-3 rounded-lg border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Ticket className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-foreground">Hissilippu</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Lisää 2 ilmaista hissilippua majoitukseen. Näyttää sivulla badgen "Tähän majoitukseen mukaan 2 hissilippua!". 
                  Kapasiteetti on rajattu {settings.totalCapacity} lippuun/päivä.
                </p>
              </div>
              
              <div className="bg-background/50 p-3 rounded-lg border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-foreground">Erikoistarjous</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Lisää kultaisen "Erikoistarjous"-badgen majoituskorttiin ja korostaa hinnan isommalla kursiivilla. 
                  <strong> Tämä on visuaalinen merkintä</strong> - varsinainen alennus asetetaan Alennus-painikkeilla.
                </p>
              </div>
            </div>
            
            {/* Right column - Discount explanations */}
            <div className="space-y-4">
              <div className="bg-background/50 p-3 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-green-400" />
                  <span className="font-semibold text-foreground">Alennus (10%, 20%, 30%)</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Jaksokohtainen lisäalennus, joka lasketaan <strong>huoneistohinnan päälle</strong>. 
                  Esim. jos huoneistolla on jo 15% alennus ja lisäät 10% jaksoalennuksen, lopullinen hinta on: 
                  (API-hinta × 0.85 + siivous) × 0.90
                </p>
              </div>
              
              <div className="bg-background/50 p-3 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-4 text-purple-400 font-bold text-sm">👁️</span>
                  <span className="font-semibold text-foreground">Näytä alennus</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Kun päällä, näyttää asiakkaalle <strong>alkuperäisen hinnan yliviivattuna</strong> (esim. <span className="line-through">309€</span>) 
                  alennetun hinnan vieressä. Korostaa säästöä visuaalisesti. Piilottaa prosenttibadgen, koska hinnanero näkyy suoraan.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground bg-background/30 p-2 rounded flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              <strong>Hinnan prioriteetti:</strong> Jaksokohtainen alennus (tässä välilehdessä) sovelletaan AINA kun se on asetettu, 
              riippumatta Erikoistarjous-togglesta. Erikoistarjous-toggle vaikuttaa vain ulkoasuun (badge ja korostettu tyyli).
            </span>
          </div>
        </CardContent>
      </Card>

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
              <Badge variant="outline" className="text-lg px-3 py-1">
                {settings.totalCapacity}
              </Badge>
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
            <span>Jokainen varaus käyttää 2 lippua (1 setti). Kapasiteetti {settings.totalCapacity}/pv = maksimissaan {settings.totalCapacity / 2} päällekkäistä varausta samana päivänä. Asetukset synkronoituvat automaattisesti.</span>
          </div>
        </CardContent>
      </Card>

      {/* Periods by Property */}
      {Object.keys(dealsByProperty).length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Ei vapaita jaksoja tällä hetkellä.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Ticket className="w-5 h-5 text-cyan-400" />
            Vapaat jaksot - Hallitse yksittäisiä jaksoja
          </h3>
          
          {Object.entries(dealsByProperty).map(([roomId, deals]) => {
            const propertyName = getMarketingName(deals[0]);
            
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
                      const localPeriodSettings = getLocalPeriodSettings(deal.roomId, deal.checkIn, deal.checkOut);
                      const availableForPeriod = getAvailablePassesForDateRange(
                        deal.checkIn, 
                        deal.checkOut,
                        periodSettings,
                        isAllocated ? periodKey : undefined
                      );
                      const canAllocate = availableForPeriod >= settings.passesPerAllocation || isAllocated;
                      
                      return (
                        <div 
                          key={deal.id} 
                          className={`p-4 rounded-lg border ${
                            isAllocated || localPeriodSettings.specialOffer
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
                                {localPeriodSettings.specialOffer && (
                                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Erikoistarjous
                                  </Badge>
                                )}
                                {localPeriodSettings.customDiscount && localPeriodSettings.customDiscount > 0 && (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                    <Percent className="w-3 h-3 mr-1" />
                                    -{localPeriodSettings.customDiscount}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {/* Price display */}
                            <div className="text-right space-y-1">
                              {deal.price != null ? (
                                <>
                                  <div className="text-xs text-muted-foreground">
                                    API: <span className="font-medium">{getOriginalApiPrice(deal)}€</span>
                                  </div>
                                  <div className="text-sm">
                                    Nyt: <span className="font-semibold text-foreground">{getCurrentDisplayPrice(deal)}€</span>
                                  </div>
                                  {localPeriodSettings.customDiscount && localPeriodSettings.customDiscount > 0 && (
                                    <div className="text-sm">
                                      Erikoistarjous: <span className="font-bold text-green-400">{getSpecialOfferPrice(deal, localPeriodSettings.customDiscount)}€</span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <span className="text-muted-foreground text-sm">Hinta ei saatavilla</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Row 2: Controls */}
                          <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-2 border-t border-border/50">
                            {/* Ski pass toggle */}
                            <div className="flex items-center gap-2 bg-cyan-500/5 px-3 py-2 rounded-lg border border-cyan-500/20">
                              <Switch
                                id={`skipass-${deal.id}`}
                                checked={isAllocated}
                                onCheckedChange={() => handleToggleAllocation(deal)}
                                disabled={(!canAllocate && !isAllocated) || isSaving}
                              />
                              <Label 
                                htmlFor={`skipass-${deal.id}`}
                                className={`text-sm font-medium ${!canAllocate && !isAllocated ? 'text-muted-foreground' : 'text-cyan-400'}`}
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
                            <div className="flex items-center gap-2 bg-amber-500/5 px-3 py-2 rounded-lg border border-amber-500/20">
                              <Switch
                                id={`special-${deal.id}`}
                                checked={localPeriodSettings.specialOffer}
                                onCheckedChange={(checked) => handleToggleSpecialOffer(deal, checked)}
                                disabled={isSaving}
                              />
                              <Label htmlFor={`special-${deal.id}`} className={`text-sm font-medium ${localPeriodSettings.specialOffer ? 'text-amber-400' : ''}`}>
                                Erikoistarjous
                              </Label>
                              <span className="text-xs text-muted-foreground hidden md:inline">(badge)</span>
                            </div>
                            
                            {/* Custom discount buttons */}
                            <div className="flex items-center gap-2 bg-green-500/5 px-3 py-2 rounded-lg border border-green-500/20">
                              <Label className="text-sm font-medium text-green-400">Alennus:</Label>
                              <div className="flex items-center gap-1">
                                {[10, 20, 30].map(val => (
                                  <Button
                                    key={val}
                                    type="button"
                                    size="sm"
                                    variant={localPeriodSettings.customDiscount === val ? "default" : "outline"}
                                    className={`h-8 w-12 p-0 text-xs ${localPeriodSettings.customDiscount === val ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                    onClick={() => handleUpdateDiscount(
                                      deal, 
                                      localPeriodSettings.customDiscount === val ? null : val
                                    )}
                                    disabled={isSaving}
                                  >
                                    {val}%
                                  </Button>
                                ))}
                              </div>
                            </div>
                            
                            {/* Show discount toggle */}
                            <div className="flex items-center gap-2 bg-purple-500/5 px-3 py-2 rounded-lg border border-purple-500/20">
                              <Switch
                                id={`showdiscount-${deal.id}`}
                                checked={localPeriodSettings.showDiscountBadge}
                                onCheckedChange={(checked) => handleToggleShowDiscount(deal, checked)}
                                disabled={isSaving}
                              />
                              <Label htmlFor={`showdiscount-${deal.id}`} className={`text-sm font-medium ${localPeriodSettings.showDiscountBadge ? 'text-purple-400' : ''}`}>
                                Näytä alennus
                              </Label>
                              <span className="text-xs text-muted-foreground hidden md:inline">(yliviivaus)</span>
                            </div>
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
