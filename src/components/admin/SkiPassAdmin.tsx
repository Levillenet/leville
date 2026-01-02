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
  Info
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
  const [refreshKey, setRefreshKey] = useState(0); // Used to force re-render after toggle
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempCapacity, setTempCapacity] = useState(settings.totalCapacity);
  const { toast } = useToast();

  // Fetch Beds24 deals
  const { data: beds24Deals = [], isLoading } = useQuery({
    queryKey: ['beds24-availability-admin'],
    queryFn: fetchBeds24Availability,
    staleTime: 5 * 60 * 1000, // 5 min cache for admin
  });

  // Cleanup expired allocations on mount
  useEffect(() => {
    cleanupExpiredAllocations();
  }, []);

  // Get allocation status directly from localStorage (single source of truth)
  const getAllocationStatus = useCallback((roomId: string, checkIn: string, checkOut: string): boolean => {
    return getPeriodAllocationStatus(roomId, checkIn, checkOut);
  }, [refreshKey]); // refreshKey dependency forces re-evaluation

  const handleToggleAllocation = (deal: Beds24Deal) => {
    const periodKey = generatePeriodId(deal.roomId, deal.checkIn, deal.checkOut);
    const currentStatus = getAllocationStatus(deal.roomId, deal.checkIn, deal.checkOut);
    
    if (!currentStatus) {
      // Trying to allocate - check capacity with excludePeriodId
      if (!canAllocateSkiPass(deal.checkIn, deal.checkOut, periodKey)) {
        const blockingDays = getBlockingDays(deal.checkIn, deal.checkOut, periodKey);
        const blockedDatesStr = blockingDays
          .slice(0, 3) // Show max 3 dates
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
      // Force re-render by incrementing refreshKey
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

  const handleSaveSettings = () => {
    saveSkiPassSettings({ totalCapacity: tempCapacity });
    setSettings({ ...settings, totalCapacity: tempCapacity });
    setEditingSettings(false);
    setRefreshKey(prev => prev + 1); // Refresh to recalculate availability
    toast({
      title: "Asetukset tallennettu",
      description: `Hissilippukapasiteetti: ${tempCapacity} lippua`
    });
  };

  const getMarketingName = (deal: Beds24Deal): string => {
    const property = getPropertyDetails(deal.roomId);
    return property?.name || deal.roomName;
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
    
    // Build a map of date -> passes used
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
    
    // Find max
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
            Vapaat jaksot ja hissilippujen jako
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
                  <div className="space-y-2">
                    {deals.map(deal => {
                      const periodKey = generatePeriodId(deal.roomId, deal.checkIn, deal.checkOut);
                      const isAllocated = getAllocationStatus(deal.roomId, deal.checkIn, deal.checkOut);
                      const availableForPeriod = getAvailablePassesForDateRange(
                        deal.checkIn, 
                        deal.checkOut,
                        isAllocated ? periodKey : undefined
                      );
                      const canAllocate = availableForPeriod >= settings.passesPerAllocation || isAllocated;
                      
                      return (
                        <div 
                          key={deal.id} 
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            isAllocated 
                              ? 'bg-cyan-500/10 border-cyan-500/30' 
                              : 'bg-muted/20 border-border'
                          }`}
                        >
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
                            
                            {isAllocated && (
                              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                                <Ticket className="w-3 h-3 mr-1" />
                                2 hissilippua
                              </Badge>
                            )}
                            
                            {!canAllocate && !isAllocated && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-amber-400 border-amber-500/30">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Päällekkäisyys
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  (vapaana: {availableForPeriod})
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Label 
                              htmlFor={`toggle-${deal.id}`}
                              className={`text-sm ${!canAllocate && !isAllocated ? 'text-muted-foreground' : ''}`}
                            >
                              {isAllocated ? 'Lippu annettu' : 'Anna hissilippu'}
                            </Label>
                            <Switch
                              id={`toggle-${deal.id}`}
                              checked={isAllocated}
                              onCheckedChange={() => handleToggleAllocation(deal)}
                              disabled={!canAllocate && !isAllocated}
                            />
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