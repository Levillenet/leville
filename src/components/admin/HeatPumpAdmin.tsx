import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface HeatPumpDevice {
  deviceId: number;
  deviceName: string;
  buildingId: number;
  roomTemperature: number;
  setTemperature: number;
  power: boolean;
  operationMode: string;
  operationModeId: number;
  lastCommunication: string;
  prohibitPower: boolean;
  prohibitSetTemperature: boolean;
  prohibitOperationMode: boolean;
}

interface DevicesResponse {
  devices: HeatPumpDevice[];
  error?: string;
}

const HeatPumpAdmin = () => {
  const queryClient = useQueryClient();
  const [openLocks, setOpenLocks] = useState<Record<number, boolean>>({});
  const [optimisticState, setOptimisticState] = useState<Record<number, Partial<HeatPumpDevice>>>({});

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
      // Clear optimistic state on success
      setOptimisticState(prev => {
        const next = { ...prev };
        delete next[variables.deviceId];
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ['melcloud-devices'] });
    },
    onError: (error, variables) => {
      // Revert optimistic state on error
      setOptimisticState(prev => {
        const next = { ...prev };
        delete next[variables.deviceId];
        return next;
      });
      toast.error(`Virhe: ${error.message}`);
    },
  });

  const handleProhibitToggle = (
    device: HeatPumpDevice,
    field: 'prohibitPower' | 'prohibitSetTemperature' | 'prohibitOperationMode',
    value: boolean
  ) => {
    // Optimistic update
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

  const getDeviceState = (device: HeatPumpDevice) => ({
    ...device,
    ...optimisticState[device.deviceId],
  });

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
                Lämpötilat
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
          const state = getDeviceState(device);
          const isUpdating = prohibitMutation.isPending && 
            prohibitMutation.variables?.deviceId === device.deviceId;
          
          return (
            <Card key={device.deviceId}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {modeInfo.icon}
                    <CardTitle className="text-base">{device.deviceName}</CardTitle>
                  </div>
                  <Badge variant={device.power ? "default" : "secondary"}>
                    {device.power ? 'Päällä' : 'Pois'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="py-2 text-center">
                  <p className="text-4xl font-bold text-foreground">
                    {device.roomTemperature.toFixed(1)}°C
                  </p>
                  <p className="text-sm text-muted-foreground">Huonelämpötila</p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>Tavoite: {device.setTemperature.toFixed(1)}°C</span>
                  <span>•</span>
                  <span>{modeInfo.name}</span>
                </div>

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
    </div>
  );
};

export default HeatPumpAdmin;
