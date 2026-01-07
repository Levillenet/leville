import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  RefreshCw, 
  Thermometer, 
  ThermometerSun,
  Home,
  ExternalLink,
  AlertTriangle,
  Building,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Settings
} from "lucide-react";

interface DeviceSettings {
  // Long API field names from Z-Wave config
  Floor_minimum_temperature_limit_FLo?: number;
  Floor_maximum_temperature_limit_FHi?: number;
  Air_minimum_temperature_limit_ALo?: number;
  Air_maximum_temperature_limit_AHi?: number;
}

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
    min?: number;
    max?: number;
    step?: number;
  }>;
  settings?: DeviceSettings;
  homeyId?: string;
  homeyName?: string;
}

interface ApartmentGroup {
  code: string;
  devices: FloorHeatingDevice[];
}

interface DeviceStats {
  air: { min: number | null; max: number | null };
  floor: { min: number | null; max: number | null };
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
  const [deviceStats, setDeviceStats] = useState<Record<string, DeviceStats>>({});
  
  // Connected Homeys state
  const [connectedHomeys, setConnectedHomeys] = useState<{ id: string; name: string; expires_at: string }[]>([]);
  const [removingHomey, setRemovingHomey] = useState<string | null>(null);
  
  // Bulk selection state
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [bulkTemperature, setBulkTemperature] = useState<number>(22);
  const [applyingBulk, setApplyingBulk] = useState(false);
  
  // Bulk settings state (FHi, AHi limits)
  const [bulkAHi, setBulkAHi] = useState<number>(27);
  const [bulkFHi, setBulkFHi] = useState<number>(28);
  const [applyingBulkSettings, setApplyingBulkSettings] = useState(false);
  
  // Draft targets for slider responsiveness during drag
  const [draftTargets, setDraftTargets] = useState<Record<string, number>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchConnectedHomeys();
    fetchDevices();
    fetchDeviceStats();
  }, []);

  const fetchConnectedHomeys = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('homey-api', {
        body: { action: 'getConnectedHomeys' }
      });

      if (error) {
        console.error('Error fetching connected Homeys:', error);
        return;
      }

      setConnectedHomeys(data.homeys || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const fetchDeviceStats = async () => {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from('floor_heating_history')
        .select('device_id, air_temperature, floor_temperature')
        .gte('recorded_at', twentyFourHoursAgo);

      if (error) {
        console.error('Error fetching device stats:', error);
        return;
      }

      // Calculate min/max for each device
      const stats: Record<string, DeviceStats> = {};
      
      for (const record of data || []) {
        if (!stats[record.device_id]) {
          stats[record.device_id] = {
            air: { min: null, max: null },
            floor: { min: null, max: null }
          };
        }
        
        const s = stats[record.device_id];
        
        if (record.air_temperature != null) {
          if (s.air.min === null || record.air_temperature < s.air.min) {
            s.air.min = record.air_temperature;
          }
          if (s.air.max === null || record.air_temperature > s.air.max) {
            s.air.max = record.air_temperature;
          }
        }
        
        if (record.floor_temperature != null) {
          if (s.floor.min === null || record.floor_temperature < s.floor.min) {
            s.floor.min = record.floor_temperature;
          }
          if (s.floor.max === null || record.floor_temperature > s.floor.max) {
            s.floor.max = record.floor_temperature;
          }
        }
      }
      
      setDeviceStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchConnectedHomeys(), fetchDevices(), fetchDeviceStats()]);
    setRefreshing(false);
    toast({
      title: "Päivitetty",
      description: "Laitteiden tiedot päivitetty"
    });
  };

  const handleAddHomey = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('homey-api', {
        body: { action: 'addHomey' }
      });

      if (error) throw error;

      if (data?.authUrl) {
        window.open(data.authUrl, '_blank');
        toast({
          title: "Lisää Homey",
          description: "Valitse Homey OAuth-sivulla ja palaa takaisin"
        });
      }
    } catch (error) {
      console.error('Add Homey error:', error);
      toast({
        title: "Virhe",
        description: "Homeyn lisääminen epäonnistui",
        variant: "destructive"
      });
    }
  };

  const handleRemoveHomey = async (homeyId: string, homeyName: string) => {
    if (!confirm(`Haluatko varmasti poistaa Homeyn "${homeyName}"?`)) return;
    
    try {
      setRemovingHomey(homeyId);
      const { error } = await supabase.functions.invoke('homey-api', {
        body: { action: 'removeHomey', homeyIdToRemove: homeyId }
      });

      if (error) throw error;

      // Update local state
      setConnectedHomeys(prev => prev.filter(h => h.id !== homeyId));
      
      // Refresh devices
      await fetchDevices();
      
      toast({
        title: "Homey poistettu",
        description: `${homeyName} poistettu onnistuneesti`
      });
    } catch (error) {
      console.error('Remove Homey error:', error);
      toast({
        title: "Virhe",
        description: "Homeyn poistaminen epäonnistui",
        variant: "destructive"
      });
    } finally {
      setRemovingHomey(null);
    }
  };

  // Handle slider value change (during drag)
  const handleSliderChange = (deviceId: string, value: number) => {
    setDraftTargets(prev => ({ ...prev, [deviceId]: value }));
  };

  const handleSetTemperature = async (deviceId: string, temperature: number, homeyId?: string) => {
    if (isViewer) return;
    
    // Round to 0.5 degree precision
    const roundedTemp = Math.round(temperature * 2) / 2;
    
    // Update draft to rounded value immediately
    setDraftTargets(prev => ({ ...prev, [deviceId]: roundedTemp }));
    
    try {
      setUpdatingDevice(deviceId);
      
      const { error } = await supabase.functions.invoke('homey-api', {
        body: {
          action: 'setCapability',
          deviceId,
          capability: 'target_temperature',
          value: roundedTemp,
          targetHomeyId: homeyId
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
                value: roundedTemp
              }
            }
          };
        }
        return device;
      }));
      
      // Clear draft after successful update
      setDraftTargets(prev => {
        const next = { ...prev };
        delete next[deviceId];
        return next;
      });

      toast({
        title: "Lämpötila asetettu",
        description: `Tavoitelämpötila: ${roundedTemp}°C`
      });
    } catch (error) {
      console.error('Error setting temperature:', error);
      // Revert draft to original value on error
      const originalDevice = devices.find(d => d.id === deviceId);
      const originalTemp = originalDevice?.capabilitiesObj?.target_temperature?.value as number | undefined;
      if (originalTemp != null) {
        setDraftTargets(prev => ({ ...prev, [deviceId]: originalTemp }));
      }
      toast({
        title: "Virhe",
        description: "Lämpötilan asetus epäonnistui",
        variant: "destructive"
      });
    } finally {
      setUpdatingDevice(null);
    }
  };

  const handleTogglePower = async (deviceId: string, currentValue: boolean, homeyId?: string) => {
    if (isViewer) return;
    
    try {
      setUpdatingDevice(deviceId);
      
      const { error } = await supabase.functions.invoke('homey-api', {
        body: {
          action: 'setCapability',
          deviceId,
          capability: 'onoff',
          value: !currentValue,
          targetHomeyId: homeyId
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

  const handleBulkSetTemperature = async () => {
    if (isViewer || selectedDevices.length === 0) return;
    
    setApplyingBulk(true);
    const roundedTemp = Math.round(bulkTemperature * 2) / 2;
    
    let successCount = 0;
    let failCount = 0;
    
    for (const deviceId of selectedDevices) {
      const device = devices.find(d => d.id === deviceId);
      try {
        const { error } = await supabase.functions.invoke('homey-api', {
          body: {
            action: 'setCapability',
            deviceId,
            capability: 'target_temperature',
            value: roundedTemp,
            targetHomeyId: device?.homeyId
          }
        });

        if (error) {
          failCount++;
        } else {
          successCount++;
          // Update local state
          setDevices(prev => prev.map(d => {
            if (d.id === deviceId && d.capabilitiesObj.target_temperature) {
              return {
                ...d,
                capabilitiesObj: {
                  ...d.capabilitiesObj,
                  target_temperature: {
                    ...d.capabilitiesObj.target_temperature,
                    value: roundedTemp
                  }
                }
              };
            }
            return d;
          }));
        }
      } catch {
        failCount++;
      }
    }
    
    setApplyingBulk(false);
    setSelectedDevices([]);
    
    if (failCount === 0) {
      toast({
        title: "Lämpötilat asetettu",
        description: `${successCount} laitteen lämpötila asetettu ${roundedTemp}°C`
      });
    } else {
      toast({
        title: "Osittain onnistui",
        description: `${successCount} onnistui, ${failCount} epäonnistui`,
        variant: "destructive"
      });
    }
  };

  const handleBulkSetSettings = async () => {
    if (isViewer || selectedDevices.length === 0) return;
    
    setApplyingBulkSettings(true);
    
    try {
      // Use full API field names and multiply by 10 (API expects 270 for 27°C)
      const settings: Record<string, number> = {};
      settings['Air_maximum_temperature_limit_AHi'] = bulkAHi * 10;
      settings['Floor_maximum_temperature_limit_FHi'] = bulkFHi * 10;
      
      const deviceIds = selectedDevices.map(id => {
        const device = devices.find(d => d.id === id);
        return { deviceId: id, homeyId: device?.homeyId };
      });
      
      let successCount = 0;
      let failCount = 0;
      
      for (const { deviceId, homeyId } of deviceIds) {
        try {
          const { error } = await supabase.functions.invoke('homey-api', {
            body: {
              action: 'setDeviceSettings',
              deviceId,
              settings,
              targetHomeyId: homeyId
            }
          });

          if (error) {
            failCount++;
          } else {
            successCount++;
            // Update local state
            setDevices(prev => prev.map(d => {
              if (d.id === deviceId) {
                return {
                  ...d,
                  settings: { ...d.settings, ...settings }
                };
              }
              return d;
            }));
          }
        } catch {
          failCount++;
        }
      }
      
      setSelectedDevices([]);
      
      if (failCount === 0) {
        toast({
          title: "Raja-arvot asetettu",
          description: `${successCount} laitteen raja-arvot päivitetty (AHi: ${bulkAHi}°C, FHi: ${bulkFHi}°C)`
        });
      } else {
        toast({
          title: "Osittain onnistui",
          description: `${successCount} onnistui, ${failCount} epäonnistui`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error setting bulk settings:', error);
      toast({
        title: "Virhe",
        description: "Raja-arvojen asetus epäonnistui",
        variant: "destructive"
      });
    } finally {
      setApplyingBulkSettings(false);
    }
  };

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const selectAllInApartment = (apartmentCode: string) => {
    const apartmentDeviceIds = devices
      .filter(d => d.name.substring(0, 2).toUpperCase() === apartmentCode)
      .map(d => d.id);
    
    const allSelected = apartmentDeviceIds.every(id => selectedDevices.includes(id));
    
    if (allSelected) {
      setSelectedDevices(prev => prev.filter(id => !apartmentDeviceIds.includes(id)));
    } else {
      setSelectedDevices(prev => [...new Set([...prev, ...apartmentDeviceIds])]);
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

  // Group devices by apartment code (first 2 characters of name)
  const groupedDevices = useMemo((): ApartmentGroup[] => {
    const groups: Record<string, FloorHeatingDevice[]> = {};
    
    devices.forEach(device => {
      const apartmentCode = device.name.substring(0, 2).toUpperCase();
      
      if (!groups[apartmentCode]) {
        groups[apartmentCode] = [];
      }
      groups[apartmentCode].push(device);
    });
    
    // Sort by apartment code (A1, A2, B1, B2, etc.)
    return Object.entries(groups)
      .map(([code, devs]) => ({ code, devices: devs }))
      .sort((a, b) => a.code.localeCompare(b.code, 'fi'));
  }, [devices]);

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
      {/* Connected Homeys section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="w-5 h-5" />
                Yhdistetyt Homeyt ({connectedHomeys.length})
              </CardTitle>
              <CardDescription>
                Hallitse Homey-laitteitasi
              </CardDescription>
            </div>
            <Button size="sm" onClick={handleAddHomey}>
              <Plus className="w-4 h-4 mr-2" />
              Lisää Homey
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {connectedHomeys.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Ei yhdistettyjä Homeyta. Lisää ensimmäinen Homey aloittaaksesi.
            </p>
          ) : (
            <div className="space-y-2">
              {connectedHomeys.map(homey => (
                <div key={homey.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-medium">{homey.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ID: {homey.id.slice(0, 8)}...
                    </span>
                  </div>
                  {!isViewer && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveHomey(homey.id, homey.name)}
                      disabled={removingHomey === homey.id}
                    >
                      {removingHomey === homey.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-destructive" />
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Devices header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Lattialämmitys</h2>
          <p className="text-sm text-muted-foreground">
            {devices.length} laitetta / {groupedDevices.length} huoneistoa
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
        <div className="space-y-8">
          {groupedDevices.map(apartment => {
            const allSelected = apartment.devices.every(d => selectedDevices.includes(d.id));
            const someSelected = apartment.devices.some(d => selectedDevices.includes(d.id));
            
            return (
              <div key={apartment.code} className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-2">
                  {!isViewer && (
                    <Checkbox
                      checked={allSelected}
                      ref={el => {
                        if (el && someSelected && !allSelected) {
                          el.dataset.state = 'indeterminate';
                        }
                      }}
                      onCheckedChange={() => selectAllInApartment(apartment.code)}
                    />
                  )}
                  <Building className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Huoneisto {apartment.code}</h3>
                  <Badge variant="secondary">{apartment.devices.length} laitetta</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ml-6">
                  {apartment.devices.map(device => {
                    const airTemp = getTemperatureValue(device, 'measure_temperature');
                    const floorTemp = getTemperatureValue(device, 'measure_temperature.floor');
                    const targetTemp = getTemperatureValue(device, 'target_temperature');
                    const isPoweredOn = getPowerValue(device);
                    const hasOnOff = device.capabilities.includes('onoff');
                    const isUpdating = updatingDevice === device.id;
                    const isSelected = selectedDevices.includes(device.id);
                    const stats = deviceStats[device.id];

                    return (
                      <Card 
                        key={device.id} 
                        className={`relative transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
                      >
                        {isUpdating && (
                          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 rounded-lg">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                          </div>
                        )}
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              {!isViewer && (
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => toggleDeviceSelection(device.id)}
                                  className="mt-1"
                                />
                              )}
                              <div>
                                <CardTitle className="text-base">{device.name}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Home className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    {device.homeyName || device.zone?.name || 'Tuntematon'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {hasOnOff && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {isPoweredOn ? 'Päällä' : 'Pois'}
                                </span>
                                <Switch
                                  checked={isPoweredOn}
                                  onCheckedChange={() => handleTogglePower(device.id, isPoweredOn, device.homeyId)}
                                  disabled={isViewer || isUpdating}
                                />
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {/* Temperature display */}
                          <div className="grid grid-cols-2 gap-3">
                            {airTemp !== null && (
                              <div className="text-center p-3 rounded-lg bg-muted/50">
                                <Thermometer className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                                <p className="text-xl font-bold">{airTemp.toFixed(1)}°C</p>
                                <p className="text-xs text-muted-foreground">Ilma</p>
                                {stats?.air?.min != null && stats?.air?.max != null && (
                                  <div className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
                                    <TrendingDown className="w-3 h-3 text-blue-400" />
                                    <span>{stats.air.min.toFixed(1)}</span>
                                    <span>/</span>
                                    <TrendingUp className="w-3 h-3 text-red-400" />
                                    <span>{stats.air.max.toFixed(1)}</span>
                                  </div>
                                )}
                              </div>
                            )}
                            {floorTemp !== null && (
                              <div className="text-center p-3 rounded-lg bg-muted/50">
                                <ThermometerSun className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                                <p className="text-xl font-bold">{floorTemp.toFixed(1)}°C</p>
                                <p className="text-xs text-muted-foreground">Lattia</p>
                                {stats?.floor?.min != null && stats?.floor?.max != null && (
                                  <div className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
                                    <TrendingDown className="w-3 h-3 text-blue-400" />
                                    <span>{stats.floor.min.toFixed(1)}</span>
                                    <span>/</span>
                                    <TrendingUp className="w-3 h-3 text-red-400" />
                                    <span>{stats.floor.max.toFixed(1)}</span>
                                  </div>
                                )}
                              </div>
                            )}
                            {airTemp === null && floorTemp === null && targetTemp !== null && (
                              <div className="text-center p-3 rounded-lg bg-muted/50 col-span-2">
                                <ThermometerSun className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                                <p className="text-xl font-bold">{targetTemp.toFixed(1)}°C</p>
                                <p className="text-xs text-muted-foreground">Tavoite</p>
                              </div>
                            )}
                          </div>

                          {/* Target temperature slider */}
                          {device.capabilities.includes('target_temperature') && targetTemp !== null && (airTemp !== null || floorTemp !== null) && (
                            <div className="space-y-3">
                              {(() => {
                                const displayTemp = draftTargets[device.id] ?? targetTemp;
                                return (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">Tavoite</span>
                                      <Badge variant="secondary">{displayTemp}°C</Badge>
                                    </div>
                                    <Slider
                                      value={[displayTemp]}
                                      min={device.capabilitiesObj.target_temperature?.min ?? 5}
                                      max={device.capabilitiesObj.target_temperature?.max ?? 35}
                                      step={device.capabilitiesObj.target_temperature?.step ?? 0.5}
                                      disabled={isViewer || isUpdating}
                                      onValueChange={(values) => handleSliderChange(device.id, values[0])}
                                      onValueCommit={(values) => handleSetTemperature(device.id, values[0], device.homeyId)}
                                      className="py-2"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>{device.capabilitiesObj.target_temperature?.min ?? 5}°C</span>
                                      <span>{device.capabilitiesObj.target_temperature?.max ?? 35}°C</span>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          )}

                          {/* Settings limits display */}
                          {(() => {
                            const aLo = device.settings?.Air_minimum_temperature_limit_ALo;
                            const aHi = device.settings?.Air_maximum_temperature_limit_AHi;
                            const fLo = device.settings?.Floor_minimum_temperature_limit_FLo;
                            const fHi = device.settings?.Floor_maximum_temperature_limit_FHi;
                            const hasAny = aLo != null || aHi != null || fLo != null || fHi != null;
                            
                            if (!hasAny) return null;
                            
                            // API returns values * 10 (e.g., 270 = 27°C)
                            const formatLimit = (val: number | undefined) => val != null ? (val / 10).toFixed(0) : '?';
                            
                            return (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded px-2 py-1.5">
                                <Settings className="w-3 h-3" />
                                {(aLo != null || aHi != null) && (
                                  <span>Ilma: {formatLimit(aLo)}-{formatLimit(aHi)}°C</span>
                                )}
                                {(fLo != null || fHi != null) && (
                                  <>
                                    <span className="text-muted-foreground/50">|</span>
                                    <span>Lattia: {formatLimit(fLo)}-{formatLimit(fHi)}°C</span>
                                  </>
                                )}
                              </div>
                            );
                          })()}

                          {/* Device class badge */}
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {device.class === 'thermostat' ? 'Termostaatti' : 
                               device.class === 'heater' ? 'Lämmitin' : device.class}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bulk action bar */}
      {selectedDevices.length > 0 && !isViewer && (
        <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[600px] z-50 border-primary bg-background/95 backdrop-blur shadow-lg">
          <CardContent className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{selectedDevices.length} laitetta valittu</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedDevices([])}
              >
                Peruuta
              </Button>
            </div>
            
            {/* Target temperature */}
            <div className="flex items-center gap-3">
              <span className="text-sm w-24">Tavoite:</span>
              <Input 
                type="number" 
                value={bulkTemperature}
                onChange={(e) => setBulkTemperature(Number(e.target.value))}
                className="w-20"
                min={5}
                max={35}
                step={0.5}
              />
              <span className="text-sm">°C</span>
              <Button 
                onClick={handleBulkSetTemperature}
                disabled={applyingBulk}
                size="sm"
              >
                {applyingBulk ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Aseta tavoite
              </Button>
            </div>
            
            {/* Settings limits (AHi, FHi) */}
            <div className="border-t pt-3">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Raja-arvojen muokkaus</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">AHi (ilma max):</span>
                  <Input 
                    type="number" 
                    value={bulkAHi}
                    onChange={(e) => setBulkAHi(Number(e.target.value))}
                    className="w-16 h-8"
                    min={15}
                    max={35}
                    step={1}
                  />
                  <span className="text-xs">°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">FHi (lattia max):</span>
                  <Input 
                    type="number" 
                    value={bulkFHi}
                    onChange={(e) => setBulkFHi(Number(e.target.value))}
                    className="w-16 h-8"
                    min={20}
                    max={35}
                    step={1}
                  />
                  <span className="text-xs">°C</span>
                </div>
                <Button 
                  onClick={handleBulkSetSettings}
                  disabled={applyingBulkSettings}
                  size="sm"
                  variant="secondary"
                >
                  {applyingBulkSettings ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Aseta raja-arvot
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
