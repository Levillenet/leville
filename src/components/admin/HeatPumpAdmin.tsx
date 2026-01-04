import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  RefreshCw, 
  Thermometer, 
  Flame, 
  Snowflake, 
  Wind, 
  Droplets,
  Loader2,
  AlertCircle,
  Lock,
  ChevronDown,
  Settings,
  History,
  Power,
  PowerOff,
  AlertTriangle,
  Timer,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import HeatPumpHistory from "./HeatPumpHistory";

type OperatingState = 'HEATING' | 'COOLING' | 'DEFROST' | 'IDLE' | 'OFF' | 'ERROR' | 'UNKNOWN';

interface HeatPumpDevice {
  deviceId: number;
  deviceName: string;
  buildingId: number;
  roomTemperature: number;
  setTemperature: number;
  outdoorTemperature: number | null;
  power: boolean;
  operationMode: string;
  operationModeId: number;
  lastCommunication: string;
  fanSpeed: number;
  numberOfFanSpeeds: number;
  prohibitPower: boolean;
  prohibitSetTemperature: boolean;
  prohibitOperationMode: boolean;
  // Enhanced fields
  operatingState: OperatingState;
  isDefrosting: boolean;
  lastDefrostMinutesAgo: number | null;
  pendingFanRecovery: boolean;
  fanAutoRecovery: boolean;
  fanRecoveryDelayMinutes: number;
}

interface DevicesResponse {
  devices: HeatPumpDevice[];
  error?: string;
}

const HeatPumpAdmin = () => {
  const queryClient = useQueryClient();
  const [openLocks, setOpenLocks] = useState<Record<number, boolean>>({});
  const [openSettings, setOpenSettings] = useState<Record<number, boolean>>({});
  const [optimisticState, setOptimisticState] = useState<Record<number, Partial<HeatPumpDevice>>>({});
  const [historyDevice, setHistoryDevice] = useState<{ id: number; name: string } | null>(null);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['melcloud-devices'],
    queryFn: async (): Promise<DevicesResponse> => {
      const { data, error } = await supabase.functions.invoke('melcloud-api', {
        method: 'GET',
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    staleTime: 60000,
    refetchInterval: 300000,
  });

  const prohibitMutation = useMutation({
    mutationFn: async (params: {
      deviceId: number;
      buildingId: number;
      prohibitPower?: boolean;
      prohibitSetTemperature?: boolean;
      prohibitOperationMode?: boolean;
    }) => {
      const { data, error } = await supabase.functions.invoke('melcloud-api', {
        method: 'POST',
        body: {
          action: 'setProhibitFlags',
          ...params,
        },
      });
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, variables) => {
      setOptimisticState(prev => {
        const next = { ...prev };
        delete next[variables.deviceId];
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ['melcloud-devices'] });
    },
    onError: (error, variables) => {
      setOptimisticState(prev => {
        const next = { ...prev };
        delete next[variables.deviceId];
        return next;
      });
      toast.error(`Virhe: ${error.message}`);
    },
  });

  const settingsMutation = useMutation({
    mutationFn: async (params: {
      deviceId: number;
      deviceName: string;
      fanAutoRecovery?: boolean;
      fanRecoveryDelayMinutes?: number;
    }) => {
      const { data, error } = await supabase.functions.invoke('melcloud-api', {
        method: 'POST',
        body: {
          action: 'updateSettings',
          ...params,
        },
      });
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, variables) => {
      setOptimisticState(prev => {
        const next = { ...prev };
        delete next[variables.deviceId];
        return next;
      });
      toast.success('Asetukset tallennettu');
      queryClient.invalidateQueries({ queryKey: ['melcloud-devices'] });
    },
    onError: (error) => {
      toast.error(`Virhe: ${error.message}`);
    },
  });

  const handleProhibitToggle = (
    device: HeatPumpDevice,
    field: 'prohibitPower' | 'prohibitSetTemperature' | 'prohibitOperationMode',
    value: boolean
  ) => {
    setOptimisticState(prev => ({
      ...prev,
      [device.deviceId]: {
        ...prev[device.deviceId],
        [field]: value,
      },
    }));

    prohibitMutation.mutate({
      deviceId: device.deviceId,
      buildingId: device.buildingId,
      [field]: value,
    });
  };

  const handleSettingsChange = (
    device: HeatPumpDevice,
    field: 'fanAutoRecovery' | 'fanRecoveryDelayMinutes',
    value: boolean | number
  ) => {
    setOptimisticState(prev => ({
      ...prev,
      [device.deviceId]: {
        ...prev[device.deviceId],
        [field]: value,
      },
    }));

    settingsMutation.mutate({
      deviceId: device.deviceId,
      deviceName: device.deviceName,
      [field]: value,
    });
  };

  const getDeviceState = (device: HeatPumpDevice) => ({
    ...device,
    ...optimisticState[device.deviceId],
  });

  const getOperatingStateInfo = (state: OperatingState) => {
    switch (state) {
      case 'HEATING':
        return { 
          icon: <Flame className="w-4 h-4" />, 
          label: 'Lämmitys', 
          variant: 'default' as const,
          className: 'bg-orange-500 hover:bg-orange-600'
        };
      case 'COOLING':
        return { 
          icon: <Snowflake className="w-4 h-4" />, 
          label: 'Jäähdytys', 
          variant: 'default' as const,
          className: 'bg-blue-500 hover:bg-blue-600'
        };
      case 'DEFROST':
        return { 
          icon: <Snowflake className="w-4 h-4 animate-pulse" />, 
          label: 'Sulatus', 
          variant: 'default' as const,
          className: 'bg-cyan-500 hover:bg-cyan-600 animate-pulse'
        };
      case 'IDLE':
        return { 
          icon: <Power className="w-4 h-4" />, 
          label: 'Valmiustila', 
          variant: 'secondary' as const,
          className: ''
        };
      case 'OFF':
        return { 
          icon: <PowerOff className="w-4 h-4" />, 
          label: 'Pois päältä', 
          variant: 'outline' as const,
          className: ''
        };
      case 'ERROR':
        return { 
          icon: <AlertTriangle className="w-4 h-4" />, 
          label: 'Virhe / Offline', 
          variant: 'destructive' as const,
          className: ''
        };
      default:
        return { 
          icon: <Thermometer className="w-4 h-4" />, 
          label: 'Tuntematon', 
          variant: 'secondary' as const,
          className: ''
        };
    }
  };

  const getOperationModeInfo = (mode: string) => {
    switch (mode) {
      case 'heating':
        return { icon: <Flame className="w-4 h-4 text-orange-500" />, name: 'Lämmitys' };
      case 'cooling':
        return { icon: <Snowflake className="w-4 h-4 text-blue-500" />, name: 'Jäähdytys' };
      case 'auto':
        return { icon: <Thermometer className="w-4 h-4 text-green-500" />, name: 'Auto' };
      case 'drying':
        return { icon: <Droplets className="w-4 h-4 text-yellow-500" />, name: 'Kuivaus' };
      case 'fan':
        return { icon: <Wind className="w-4 h-4 text-muted-foreground" />, name: 'Tuuletus' };
      default:
        return { icon: <Thermometer className="w-4 h-4 text-muted-foreground" />, name: mode };
    }
  };

  const formatLastCommunication = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Juuri nyt';
    if (diffMins < 60) return `${diffMins} min sitten`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} h sitten`;
    return date.toLocaleDateString('fi-FI');
  };

  const formatDefrostTime = (minutes: number | null): string => {
    if (minutes === null) return 'Ei sulatushistoriaa';
    if (minutes < 60) return `${minutes} min sitten`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} h sitten`;
    return `${Math.floor(minutes / 1440)} pv sitten`;
  };

  const getFanSpeedLabel = (speed: number): string => {
    if (speed === 0) return 'AUTO';
    return String(speed);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Ladataan lämpöpumppuja...</span>
        </CardContent>
      </Card>
    );
  }

  if (error || data?.error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
          <AlertCircle className="w-12 h-12 text-destructive" />
          <p className="text-muted-foreground">
            {data?.error || (error instanceof Error ? error.message : 'Virhe ladattaessa lämpöpumppuja')}
          </p>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Yritä uudelleen
          </Button>
        </CardContent>
      </Card>
    );
  }

  const devices = data?.devices || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                Lämpöpumput
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {devices.length} laitetta
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
              Päivitä
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {devices.map((device) => {
          const modeInfo = getOperationModeInfo(device.operationMode);
          const stateInfo = getOperatingStateInfo(device.operatingState);
          const state = getDeviceState(device);
          const isUpdating = (prohibitMutation.isPending && 
            prohibitMutation.variables?.deviceId === device.deviceId) ||
            (settingsMutation.isPending && 
            settingsMutation.variables?.deviceId === device.deviceId);
          
          return (
            <Card key={device.deviceId} className={device.isDefrosting ? 'ring-2 ring-cyan-500' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {modeInfo.icon}
                    <CardTitle className="text-base truncate">{device.deviceName}</CardTitle>
                  </div>
                  <Badge 
                    variant={stateInfo.variant}
                    className={`flex items-center gap-1 shrink-0 ${stateInfo.className}`}
                  >
                    {stateInfo.icon}
                    {stateInfo.label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Temperatures */}
                <div className="py-2 text-center">
                  <p className="text-4xl font-bold text-foreground">
                    {device.roomTemperature.toFixed(1)}°C
                  </p>
                  <p className="text-sm text-muted-foreground">Huonelämpötila</p>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>Tavoite: {device.setTemperature.toFixed(1)}°C</span>
                  {device.outdoorTemperature !== null && (
                    <>
                      <span>•</span>
                      <span>Ulko: {device.outdoorTemperature.toFixed(1)}°C</span>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>{modeInfo.name}</span>
                  <span>•</span>
                  <span>Puhallin: {getFanSpeedLabel(device.fanSpeed)}</span>
                </div>

                {/* Defrost status */}
                <div className="text-center text-sm">
                  {device.isDefrosting ? (
                    <span className="text-cyan-600 font-medium flex items-center justify-center gap-1">
                      <Snowflake className="w-4 h-4 animate-pulse" />
                      Sulatus käynnissä
                    </span>
                  ) : device.lastDefrostMinutesAgo !== null ? (
                    <span className="text-muted-foreground">
                      Viimeisin sulatus: {formatDefrostTime(device.lastDefrostMinutesAgo)}
                    </span>
                  ) : null}
                </div>

                {/* Pending recovery status */}
                {device.pendingFanRecovery && !device.isDefrosting && (
                  <div className="text-center text-sm text-amber-600 flex items-center justify-center gap-1">
                    <Timer className="w-4 h-4" />
                    Puhallustehon palautus odottaa
                  </div>
                )}
                {device.pendingFanRecovery && device.isDefrosting && (
                  <div className="text-center text-sm text-amber-600 flex items-center justify-center gap-1">
                    <Timer className="w-4 h-4" />
                    Palautus odottaa sulatuksen päättymistä
                  </div>
                )}

                {/* History button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-muted-foreground"
                  onClick={() => setHistoryDevice({ id: device.deviceId, name: device.deviceName })}
                >
                  <History className="w-4 h-4 mr-2" />
                  Näytä lämpö- ja sulatushistoria
                </Button>

                {/* Fan recovery settings */}
                <Collapsible 
                  open={openSettings[device.deviceId]} 
                  onOpenChange={(open) => setOpenSettings(prev => ({ ...prev, [device.deviceId]: open }))}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Puhallustehon palautus
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openSettings[device.deviceId] ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Automaattinen palautus</label>
                      <Switch
                        checked={state.fanAutoRecovery}
                        onCheckedChange={(checked) => handleSettingsChange(device, 'fanAutoRecovery', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                    {state.fanAutoRecovery && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <label>Palautusviive</label>
                          <span className="font-medium">{state.fanRecoveryDelayMinutes} min</span>
                        </div>
                        <Slider
                          value={[state.fanRecoveryDelayMinutes]}
                          onValueCommit={([value]) => handleSettingsChange(device, 'fanRecoveryDelayMinutes', value)}
                          min={15}
                          max={180}
                          step={15}
                          disabled={isUpdating}
                        />
                        <p className="text-xs text-muted-foreground">
                          Palauttaa puhallustehon arvoon 4, jos asetetaan alle 4
                        </p>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>

                {/* Remote control locks */}
                <Collapsible 
                  open={openLocks[device.deviceId]} 
                  onOpenChange={(open) => setOpenLocks(prev => ({ ...prev, [device.deviceId]: open }))}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Kaukosäätimen lukot
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openLocks[device.deviceId] ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Lukitse virtapainike</label>
                      <Switch
                        checked={state.prohibitPower}
                        onCheckedChange={(checked) => handleProhibitToggle(device, 'prohibitPower', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Lukitse lämpötilan säätö</label>
                      <Switch
                        checked={state.prohibitSetTemperature}
                        onCheckedChange={(checked) => handleProhibitToggle(device, 'prohibitSetTemperature', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Lukitse tilan valinta</label>
                      <Switch
                        checked={state.prohibitOperationMode}
                        onCheckedChange={(checked) => handleProhibitToggle(device, 'prohibitOperationMode', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                    {isUpdating && (
                      <p className="text-xs text-muted-foreground text-center">
                        <Loader2 className="w-3 h-3 inline animate-spin mr-1" />
                        Päivitetään...
                      </p>
                    )}
                  </CollapsibleContent>
                </Collapsible>

                <p className="text-xs text-muted-foreground text-center">
                  Päivitetty: {formatLastCommunication(device.lastCommunication)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {devices.length === 0 && !isLoading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
            <Thermometer className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">Ei lämpöpumppuja löydetty</p>
          </CardContent>
        </Card>
      )}

      {/* History modal */}
      {historyDevice && (
        <HeatPumpHistory
          deviceId={historyDevice.id}
          deviceName={historyDevice.name}
          open={true}
          onOpenChange={(open) => !open && setHistoryDevice(null)}
        />
      )}
    </div>
  );
};

export default HeatPumpAdmin;
