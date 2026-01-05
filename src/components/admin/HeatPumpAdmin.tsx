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
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import HeatPumpHistory from "./HeatPumpHistory";

type OperatingState = 'HEATING' | 'COOLING' | 'DEFROST' | 'IDLE' | 'OFF' | 'ERROR' | 'UNKNOWN';
type EfficiencyStatus = 'SUFFICIENT' | 'MARGINAL' | 'INSUFFICIENT' | 'LEARNING' | 'UNKNOWN';

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
  // Efficiency fields - comparative
  degreeMinutes: number;
  efficiencyStatus: EfficiencyStatus;
  performanceRatio: number | null;
  efficiencyReason: string;
  baselineSampleCount: number;
  // Energy fields
  hasEnergyMeter: boolean;
  currentEnergy: number | null;
  dailyEnergy: number | null;
  totalEnergy: number | null;
}

interface DevicesResponse {
  devices: HeatPumpDevice[];
  error?: string;
}

interface HeatPumpAdminProps {
  isViewer?: boolean;
}

const HeatPumpAdmin = ({ isViewer = false }: HeatPumpAdminProps) => {
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
        // Clear pending when turning off auto-recovery
        ...(field === 'fanAutoRecovery' && value === false ? { pendingFanRecovery: false } : {}),
      },
    }));

    const params: {
      deviceId: number;
      deviceName: string;
      fanAutoRecovery?: boolean;
      fanRecoveryDelayMinutes?: number;
    } = {
      deviceId: device.deviceId,
      deviceName: device.deviceName,
    };

    if (field === 'fanAutoRecovery') {
      params.fanAutoRecovery = value as boolean;
    } else if (field === 'fanRecoveryDelayMinutes') {
      params.fanRecoveryDelayMinutes = value as number;
    }

    settingsMutation.mutate(params);
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

  const getEfficiencyStatusInfo = (status: EfficiencyStatus, performanceRatio: number | null, reason: string) => {
    switch (status) {
      case 'SUFFICIENT':
        return {
          icon: <CheckCircle2 className="w-4 h-4" />,
          label: performanceRatio !== null && performanceRatio >= 100 
            ? `Pärjää hyvin (+${performanceRatio - 100}%)`
            : 'Teho riittää',
          description: reason,
          className: 'text-green-600 bg-green-100 dark:bg-green-900/30',
          trendIcon: performanceRatio !== null && performanceRatio > 100 
            ? <TrendingUp className="w-3 h-3" /> 
            : null,
        };
      case 'MARGINAL':
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          label: performanceRatio !== null 
            ? `Hieman heikompi (${performanceRatio}%)`
            : 'Teho rajamailla',
          description: reason,
          className: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
          trendIcon: <TrendingDown className="w-3 h-3" />,
        };
      case 'INSUFFICIENT':
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          label: performanceRatio !== null 
            ? `Teho ei riitä (${performanceRatio}%)`
            : 'Teho ei riitä',
          description: reason,
          className: 'text-red-600 bg-red-100 dark:bg-red-900/30',
          trendIcon: <TrendingDown className="w-3 h-3" />,
        };
      case 'LEARNING':
        return {
          icon: <GraduationCap className="w-4 h-4" />,
          label: 'Oppii...',
          description: reason,
          className: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
          trendIcon: null,
        };
      default:
        return {
          icon: <Thermometer className="w-4 h-4" />,
          label: 'Analysoidaan...',
          description: reason || 'Ei dataa',
          className: 'text-muted-foreground bg-muted',
          trendIcon: null,
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

  const getFanSpeedLabel = (speed: number | undefined | null): string => {
    if (speed === undefined || speed === null) return '-';
    if (speed === 0) return 'AUTO';
    return String(speed);
  };

  const formatDegreeMinutes = (dm: number): string => {
    if (dm < 60) return `${Math.round(dm)} °C·min`;
    if (dm < 1440) return `${Math.round(dm / 60)} °C·h`;
    return `${(dm / 1440).toFixed(1)} °C·pv`;
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
          const efficiencyInfo = getEfficiencyStatusInfo(
            state.efficiencyStatus || 'UNKNOWN',
            state.performanceRatio ?? null,
            state.efficiencyReason || ''
          );
          const isUpdating = (prohibitMutation.isPending && 
            prohibitMutation.variables?.deviceId === device.deviceId) ||
            (settingsMutation.isPending && 
            settingsMutation.variables?.deviceId === device.deviceId);
          
          // Calculate temperature debt for display
          const tempDebt = Math.max(0, device.setTemperature - device.roomTemperature);
          
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
                {/* Temperatures - equal sizing for mobile readability */}
                <div className="grid grid-cols-3 gap-2 py-3">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">
                      {device.roomTemperature.toFixed(1)}°
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Huone</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      {device.setTemperature.toFixed(1)}°
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tavoite</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-muted-foreground">
                      {device.outdoorTemperature !== null ? `${device.outdoorTemperature.toFixed(1)}°` : '–'}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Ulko</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
                  {tempDebt > 0 && (
                    <span className="text-orange-500">Velka: {tempDebt.toFixed(1)}°C</span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>{modeInfo.name}</span>
                  <span>•</span>
                  <span>Puhallin: {getFanSpeedLabel(device.fanSpeed)}</span>
                </div>

                {/* Efficiency status - now with comparative info */}
                {device.power && device.operatingState !== 'OFF' && (
                  <div className={`flex flex-col items-center gap-1 text-sm rounded-md py-2 px-3 ${efficiencyInfo.className}`}>
                    <div className="flex items-center gap-2">
                      {efficiencyInfo.icon}
                      <span className="font-medium">{efficiencyInfo.label}</span>
                      {efficiencyInfo.trendIcon}
                    </div>
                    <span className="text-xs opacity-75 text-center">
                      {efficiencyInfo.description}
                    </span>
                    {tempDebt > 0 && state.efficiencyStatus !== 'LEARNING' && (
                      <span className="text-xs opacity-60">
                        Tavoitteesta: -{tempDebt.toFixed(1)}°C
                      </span>
                    )}
                  </div>
                )}

                {/* Energy consumption - only shown if device has meter */}
                {device.hasEnergyMeter && (
                  <div className="flex items-center justify-center gap-3 text-sm bg-muted/50 rounded-md py-2 px-3">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <div className="flex flex-col items-center">
                      {device.dailyEnergy !== null && (
                        <span className="font-medium">
                          Tänään: {device.dailyEnergy.toFixed(1)} kWh
                        </span>
                      )}
                      {device.currentEnergy !== null && (
                        <span className="text-xs text-muted-foreground">
                          Nykyinen: {device.currentEnergy.toFixed(2)} kW
                        </span>
                      )}
                    </div>
                  </div>
                )}

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
                {state.pendingFanRecovery && !device.isDefrosting && (
                  <div className="text-center text-sm text-amber-600 flex items-center justify-center gap-1">
                    <Timer className="w-4 h-4" />
                    Puhallustehon palautus odottaa
                  </div>
                )}
                {state.pendingFanRecovery && device.isDefrosting && (
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
                  Näytä lämpö- ja tehoanalyysi
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
                          Jos puhallustehoa lasketaan (AUTO, 1, 2, 3), se palautetaan automaattisesti tasolle 4 määritetyn ajan jälkeen.
                        </p>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>

                {/* Prohibit locks */}
                <Collapsible 
                  open={openLocks[device.deviceId]} 
                  onOpenChange={(open) => setOpenLocks(prev => ({ ...prev, [device.deviceId]: open }))}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Kaukosäätimen lukitukset
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openLocks[device.deviceId] ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Estä virran säätö</label>
                      <Switch
                        checked={state.prohibitPower}
                        onCheckedChange={(checked) => handleProhibitToggle(device, 'prohibitPower', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Estä lämpötilan säätö</label>
                      <Switch
                        checked={state.prohibitSetTemperature}
                        onCheckedChange={(checked) => handleProhibitToggle(device, 'prohibitSetTemperature', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Estä tilan vaihto</label>
                      <Switch
                        checked={state.prohibitOperationMode}
                        onCheckedChange={(checked) => handleProhibitToggle(device, 'prohibitOperationMode', checked)}
                        disabled={isUpdating}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* History modal */}
      {historyDevice && (
        <HeatPumpHistory
          deviceId={historyDevice.id}
          deviceName={historyDevice.name}
          open={!!historyDevice}
          onOpenChange={(open) => !open && setHistoryDevice(null)}
        />
      )}
    </div>
  );
};

export default HeatPumpAdmin;
