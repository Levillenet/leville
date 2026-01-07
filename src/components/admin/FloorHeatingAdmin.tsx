import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  RefreshCw, 
  Thermometer, 
  ThermometerSun,
  Power,
  ExternalLink,
  AlertTriangle,
  Home
} from "lucide-react";

interface FloorHeatingDevice {
  id: string;
  name: string;
  zone: { id: string; name: string };
  class: string;
  capabilities: string[];
  capabilitiesObj: Record<string, {
    id: string;
    title: string;
    type: string;
    getable: boolean;
    setable: boolean;
    value: unknown;
  }>;
}

interface FloorHeatingAdminProps {
  isViewer?: boolean;
}

export default function FloorHeatingAdmin({ isViewer = false }: FloorHeatingAdminProps) {
  const [devices, setDevices] = useState<FloorHeatingDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [updatingDevice, setUpdatingDevice] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('homey-api', {
        body: { action: 'getFloorHeatingDevices' }
      });

      if (error) {
        console.error('Error fetching devices:', error);
        throw error;
      }

      if (data.needsAuth) {
        setNeedsAuth(true);
        setAuthUrl(data.authUrl);
        return;
      }

      setNeedsAuth(false);
      setDevices(data.devices || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Virhe",
        description: "Laitteiden haku epäonnistui",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDevices();
    setRefreshing(false);
    toast({
      title: "Päivitetty",
      description: "Laitteiden tiedot päivitetty"
    });
  };

  const handleSetTemperature = async (deviceId: string, temperature: number) => {
    if (isViewer) return;
    
    try {
      setUpdatingDevice(deviceId);
      
      const { data, error } = await supabase.functions.invoke('homey-api', {
        body: {
          action: 'setCapability',
          deviceId,
          capability: 'target_temperature',
          value: temperature
        }
      });

      if (error) throw error;

      // Update local state
      setDevices(prev => prev.map(device => {
        if (device.id === deviceId && device.capabilitiesObj.target_temperature) {
          return {
            ...device,
            capabilitiesObj: {
              ...device.capabilitiesObj,
              target_temperature: {
                ...device.capabilitiesObj.target_temperature,
                value: temperature
              }
            }
          };
        }
        return device;
      }));

      toast({
        title: "Lämpötila asetettu",
        description: `Tavoitelämpötila: ${temperature}°C`
      });
    } catch (error) {
      console.error('Error setting temperature:', error);
      toast({
        title: "Virhe",
        description: "Lämpötilan asetus epäonnistui",
        variant: "destructive"
      });
    } finally {
      setUpdatingDevice(null);
    }
  };

  const handleTogglePower = async (deviceId: string, currentValue: boolean) => {
    if (isViewer) return;
    
    try {
      setUpdatingDevice(deviceId);
      
      const { data, error } = await supabase.functions.invoke('homey-api', {
        body: {
          action: 'setCapability',
          deviceId,
          capability: 'onoff',
          value: !currentValue
        }
      });

      if (error) throw error;

      // Update local state
      setDevices(prev => prev.map(device => {
        if (device.id === deviceId && device.capabilitiesObj.onoff) {
          return {
            ...device,
            capabilitiesObj: {
              ...device.capabilitiesObj,
              onoff: {
                ...device.capabilitiesObj.onoff,
                value: !currentValue
              }
            }
          };
        }
        return device;
      }));

      toast({
        title: !currentValue ? "Kytketty päälle" : "Kytketty pois",
        description: `Laite ${!currentValue ? 'päällä' : 'pois päältä'}`
      });
    } catch (error) {
      console.error('Error toggling power:', error);
      toast({
        title: "Virhe",
        description: "Virran kytkentä epäonnistui",
        variant: "destructive"
      });
    } finally {
      setUpdatingDevice(null);
    }
  };

  const getTemperatureValue = (device: FloorHeatingDevice, capabilityId: string): number | null => {
    const cap = device.capabilitiesObj[capabilityId];
    if (cap && typeof cap.value === 'number') {
      return cap.value;
    }
    return null;
  };

  const getPowerValue = (device: FloorHeatingDevice): boolean => {
    const cap = device.capabilitiesObj.onoff;
    return cap?.value === true;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (needsAuth) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Homey-yhteys puuttuu
          </CardTitle>
          <CardDescription>
            Yhdistä Homey-tilisi hallitaksesi lattialämmitystä
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href={authUrl || '#'} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Yhdistä Homey
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Lattialämmitys</h2>
          <p className="text-sm text-muted-foreground">
            {devices.length} laitetta löydetty
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Päivitä
        </Button>
      </div>

      {devices.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Thermometer className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Ei lattialämmityslaitteita</h3>
            <p className="text-sm text-muted-foreground">
              Homey-järjestelmästä ei löytynyt termostaatteja tai lämmityslaitteita.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {devices.map(device => {
            const currentTemp = getTemperatureValue(device, 'measure_temperature');
            const targetTemp = getTemperatureValue(device, 'target_temperature');
            const isPoweredOn = getPowerValue(device);
            const hasOnOff = device.capabilities.includes('onoff');
            const isUpdating = updatingDevice === device.id;

            return (
              <Card key={device.id} className="relative">
                {isUpdating && (
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 rounded-lg">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{device.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Home className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {device.zone?.name || 'Tuntematon vyöhyke'}
                        </span>
                      </div>
                    </div>
                    {hasOnOff && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {isPoweredOn ? 'Päällä' : 'Pois'}
                        </span>
                        <Switch
                          checked={isPoweredOn}
                          onCheckedChange={() => handleTogglePower(device.id, isPoweredOn)}
                          disabled={isViewer || isUpdating}
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Temperature display */}
                  <div className="grid grid-cols-2 gap-4">
                    {currentTemp !== null && (
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <Thermometer className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                        <p className="text-2xl font-bold">{currentTemp.toFixed(1)}°C</p>
                        <p className="text-xs text-muted-foreground">Nykyinen</p>
                      </div>
                    )}
                    {targetTemp !== null && (
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <ThermometerSun className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                        <p className="text-2xl font-bold">{targetTemp.toFixed(1)}°C</p>
                        <p className="text-xs text-muted-foreground">Tavoite</p>
                      </div>
                    )}
                  </div>

                  {/* Target temperature slider */}
                  {device.capabilities.includes('target_temperature') && targetTemp !== null && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tavoitelämpötila</span>
                        <Badge variant="secondary">{targetTemp}°C</Badge>
                      </div>
                      <Slider
                        value={[targetTemp]}
                        min={5}
                        max={35}
                        step={0.5}
                        disabled={isViewer || isUpdating}
                        onValueCommit={(values) => handleSetTemperature(device.id, values[0])}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5°C</span>
                        <span>35°C</span>
                      </div>
                    </div>
                  )}

                  {/* Device class badge */}
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {device.class === 'thermostat' ? 'Termostaatti' : 
                       device.class === 'heater' ? 'Lämmitin' : device.class}
                    </Badge>
                    {device.capabilities.includes('thermostat_mode') && (
                      <Badge variant="outline" className="text-xs">
                        Tilavalinta
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
