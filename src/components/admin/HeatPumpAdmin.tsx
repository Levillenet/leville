import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  RefreshCw, 
  Thermometer, 
  Flame, 
  Snowflake, 
  Wind, 
  Droplets,
  Minus,
  Plus,
  Loader2,
  AlertCircle
} from "lucide-react";

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
  fanSpeed: number;
  numberOfFanSpeeds: number;
}

interface DevicesResponse {
  devices: HeatPumpDevice[];
  error?: string;
}

const OPERATION_MODES = [
  { id: 1, name: 'Lämmitys', icon: Flame, color: 'text-orange-500' },
  { id: 3, name: 'Jäähdytys', icon: Snowflake, color: 'text-blue-500' },
  { id: 8, name: 'Auto', icon: Thermometer, color: 'text-green-500' },
  { id: 2, name: 'Kuivaus', icon: Droplets, color: 'text-yellow-500' },
  { id: 7, name: 'Tuuletus', icon: Wind, color: 'text-gray-500' },
];

const HeatPumpAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [controllingDevice, setControllingDevice] = useState<number | null>(null);

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
    staleTime: 60000, // 1 minute
    refetchInterval: 300000, // 5 minutes
  });

  const controlMutation = useMutation({
    mutationFn: async (params: {
      deviceId: number;
      buildingId: number;
      power?: boolean;
      setTemperature?: number;
      operationMode?: number;
    }) => {
      const { data, error } = await supabase.functions.invoke('melcloud-api', {
        method: 'POST',
        body: params,
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Muutos tehty",
        description: "Lämpöpumpun asetukset päivitetty",
      });
      // Refetch after a short delay to get updated state
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['melcloud-devices'] });
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Virhe",
        description: error instanceof Error ? error.message : "Ohjaus epäonnistui",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setControllingDevice(null);
    },
  });

  const handlePowerToggle = (device: HeatPumpDevice) => {
    setControllingDevice(device.deviceId);
    controlMutation.mutate({
      deviceId: device.deviceId,
      buildingId: device.buildingId,
      power: !device.power,
    });
  };

  const handleTemperatureChange = (device: HeatPumpDevice, delta: number) => {
    const newTemp = Math.max(16, Math.min(31, device.setTemperature + delta));
    if (newTemp === device.setTemperature) return;
    
    setControllingDevice(device.deviceId);
    controlMutation.mutate({
      deviceId: device.deviceId,
      buildingId: device.buildingId,
      setTemperature: newTemp,
    });
  };

  const handleModeChange = (device: HeatPumpDevice, modeId: number) => {
    if (device.operationModeId === modeId) return;
    
    setControllingDevice(device.deviceId);
    controlMutation.mutate({
      deviceId: device.deviceId,
      buildingId: device.buildingId,
      operationMode: modeId,
    });
  };

  const getOperationModeIcon = (mode: string) => {
    switch (mode) {
      case 'heating':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'cooling':
        return <Snowflake className="w-5 h-5 text-blue-500" />;
      case 'auto':
        return <Thermometer className="w-5 h-5 text-green-500" />;
      case 'drying':
        return <Droplets className="w-5 h-5 text-yellow-500" />;
      case 'fan':
        return <Wind className="w-5 h-5 text-gray-500" />;
      default:
        return <Thermometer className="w-5 h-5 text-muted-foreground" />;
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
                Ilmalämpöpumput
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {devices.length} laitetta löydetty
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
          const isControlling = controllingDevice === device.deviceId;
          
          return (
            <Card 
              key={device.deviceId} 
              className={`relative transition-all ${isControlling ? 'opacity-70' : ''}`}
            >
              {isControlling && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg z-10">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getOperationModeIcon(device.operationMode)}
                    <CardTitle className="text-base">{device.deviceName}</CardTitle>
                  </div>
                  <Switch
                    checked={device.power}
                    onCheckedChange={() => handlePowerToggle(device)}
                    disabled={isControlling}
                  />
                </div>
                <Badge 
                  variant={device.power ? "default" : "secondary"}
                  className="w-fit"
                >
                  {device.power ? 'Päällä' : 'Pois'}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Current Temperature */}
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-foreground">
                    {device.roomTemperature.toFixed(1)}°C
                  </p>
                  <p className="text-sm text-muted-foreground">Huonelämpötila</p>
                </div>

                {/* Target Temperature Control */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleTemperatureChange(device, -0.5)}
                    disabled={isControlling || !device.power}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="text-center min-w-[80px]">
                    <p className="text-2xl font-semibold text-primary">
                      {device.setTemperature.toFixed(1)}°C
                    </p>
                    <p className="text-xs text-muted-foreground">Tavoite</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleTemperatureChange(device, 0.5)}
                    disabled={isControlling || !device.power}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Operation Mode */}
                <div className="flex flex-wrap justify-center gap-1">
                  {OPERATION_MODES.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = device.operationModeId === mode.id;
                    return (
                      <Button
                        key={mode.id}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleModeChange(device, mode.id)}
                        disabled={isControlling || !device.power}
                        className="flex items-center gap-1 px-2"
                      >
                        <Icon className={`w-3 h-3 ${isActive ? '' : mode.color}`} />
                        <span className="text-xs hidden sm:inline">{mode.name}</span>
                      </Button>
                    );
                  })}
                </div>

                {/* Last Communication */}
                <p className="text-xs text-center text-muted-foreground">
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
