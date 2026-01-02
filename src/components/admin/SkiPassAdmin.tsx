import { useState, useEffect } from "react";
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
  const [allocations, setAllocations] = useState<Record<string, boolean>>({});
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempCapacity, setTempCapacity] = useState(settings.totalCapacity);
  const { toast } = useToast();

  // Fetch Beds24 deals
  const { data: beds24Deals = [], isLoading, refetch } = useQuery({
    queryKey: ['beds24-availability-admin'],
    queryFn: fetchBeds24Availability,
    staleTime: 5 * 60 * 1000, // 5 min cache for admin
  });

  // Cleanup expired allocations on mount
  useEffect(() => {
    cleanupExpiredAllocations();
  }, []);

  // Load allocation status for all periods
  useEffect(() => {
    const allocationStatus: Record<string, boolean> = {};
    beds24Deals.forEach(deal => {
      const periodKey = `${deal.roomId}_${deal.checkIn}_${deal.checkOut}`;
      allocationStatus[periodKey] = getPeriodAllocationStatus(deal.roomId, deal.checkIn, deal.checkOut);
    });
    setAllocations(allocationStatus);
  }, [beds24Deals]);

  const handleToggleAllocation = (deal: Beds24Deal) => {
    const periodKey = `${deal.roomId}_${deal.checkIn}_${deal.checkOut}`;
    const currentStatus = allocations[periodKey] || false;
    
    if (!currentStatus) {
      // Trying to allocate - check capacity
      if (!canAllocateSkiPass(deal.checkIn, deal.checkOut)) {
        toast({
          title: "Kapasiteetti täynnä",
          description: "Tämän ajanjakson päivät menevät päällekkäin muiden varauksien kanssa. Ei riittävästi vapaita lippuja.",
          variant: "destructive"
        });
        return;
      }
    }
    
    const result = toggleSkiPassAllocation(deal.roomId, deal.checkIn, deal.checkOut);
    
    if (result.success) {
      setAllocations(prev => ({
        ...prev,
        [periodKey]: !currentStatus
      }));
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

  // Calculate used passes
  const countUsedPasses = (): number => {
    let count = 0;
    Object.entries(allocations).forEach(([_, isAllocated]) => {
      if (isAllocated) count += settings.passesPerAllocation;
    });
    return count;
  };

  const usedPasses = countUsedPasses();
  const availablePasses = settings.totalCapacity - usedPasses;

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
                <span className="text-muted-foreground">Käytössä:</span>
                <Badge className={usedPasses > 0 ? "bg-cyan-500/20 text-cyan-400 ml-2" : "ml-2"}>
                  {usedPasses} / {settings.totalCapacity}
                </Badge>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Vapaana:</span>
                <Badge className={availablePasses > 0 ? "bg-green-500/20 text-green-400 ml-2" : "bg-red-500/20 text-red-400 ml-2"}>
                  {availablePasses}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Jokainen varaus käyttää 2 lippua (1 setti). Kapasiteetti {settings.totalCapacity} = maksimissaan {settings.totalCapacity / 2} päällekkäistä varausta.</span>
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
                      const periodKey = `${deal.roomId}_${deal.checkIn}_${deal.checkOut}`;
                      const isAllocated = allocations[periodKey] || false;
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
                              <Badge variant="outline" className="text-amber-400 border-amber-500/30">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Päällekkäisyys
                              </Badge>
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
