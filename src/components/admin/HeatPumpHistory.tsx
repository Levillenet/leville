import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Thermometer, Snowflake, Clock, TrendingUp, Zap, Activity } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

interface HeatPumpHistoryProps {
  deviceId: number;
  deviceName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface HistoryPoint {
  room_temperature: number;
  set_temperature: number;
  outdoor_temperature: number | null;
  actual_outdoor_temp: number | null; // Open-Meteo temperature
  operating_state: string;
  recorded_at: string;
}

interface DefrostLog {
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
}

interface RecoveryLog {
  defrost_ended_at: string;
  target_reached_at: string | null;
  recovery_duration_seconds: number | null;
  recovery_speed: number | null;
  outdoor_temperature: number | null;
  temperature_delta: number | null;
}

interface HistoryResponse {
  history: HistoryPoint[];
  defrostLogs: DefrostLog[];
  recoveryLogs: RecoveryLog[];
  statistics: {
    defrostCount: number;
    avgDurationSeconds: number;
    maxDurationSeconds: number;
    avgRoomTemperature: number | null;
    avgRecoverySpeed: number | null;
  };
}

type Period = '24h' | '7d' | '30d';

const HeatPumpHistory = ({ deviceId, deviceName, open, onOpenChange }: HeatPumpHistoryProps) => {
  const [period, setPeriod] = useState<Period>('24h');

  const { data, isLoading, error } = useQuery({
    queryKey: ['heat-pump-history', deviceId, period],
    queryFn: async (): Promise<HistoryResponse> => {
      // Use hourly aggregation for 7d and 30d views
      const aggregation = period === '24h' ? 'raw' : 'hourly';
      
      const response = await supabase.functions.invoke(
        `melcloud-api?action=getHistory&deviceId=${deviceId}&period=${period}&aggregation=${aggregation}`, 
        { method: 'GET' }
      );
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      return response.data;
    },
    enabled: open,
    staleTime: 60000,
  });

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds} s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return secs > 0 ? `${mins} min ${secs} s` : `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours} h ${remainingMins} min`;
  };

  const formatXAxis = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (period === '24h') {
      return date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric' });
  };

  // Process chart data - prefer actual_outdoor_temp from Open-Meteo over MELCloud value
  const chartData = data?.history?.map((point) => ({
    time: point.recorded_at,
    roomTemp: point.room_temperature,
    setTemp: point.set_temperature,
    outdoorTemp: point.actual_outdoor_temp ?? point.outdoor_temperature,
    isDefrost: point.operating_state === 'DEFROST' ? point.room_temperature : null,
  })) || [];

  // Find defrost periods for reference areas
  const defrostAreas = data?.defrostLogs?.map((log) => ({
    x1: log.started_at,
    x2: log.ended_at || new Date().toISOString(),
  })) || [];

  // Recovery speed vs outdoor temperature scatter data
  const recoveryScatterData = data?.recoveryLogs?.filter(
    (r) => r.recovery_speed !== null && r.outdoor_temperature !== null
  ).map((r) => ({
    outdoorTemp: r.outdoor_temperature,
    recoverySpeed: r.recovery_speed,
    duration: r.recovery_duration_seconds,
  })) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            {deviceName} - Lämpötila- ja tehoanalyysi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Period selector */}
          <div className="flex gap-2">
            <Button
              variant={period === '24h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('24h')}
            >
              24 tuntia
            </Button>
            <Button
              variant={period === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('7d')}
            >
              7 päivää
            </Button>
            <Button
              variant={period === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('30d')}
            >
              30 päivää
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Ladataan historiaa...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-destructive">
              Virhe ladattaessa historiaa: {error instanceof Error ? error.message : 'Tuntematon virhe'}
            </div>
          )}

          {data && !isLoading && (
            <>
              {/* Statistics cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Snowflake className="w-4 h-4" />
                      <span className="text-sm">Sulatukset</span>
                    </div>
                    <p className="text-2xl font-bold">{data.statistics.defrostCount}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Keskim. kesto</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {data.statistics.avgDurationSeconds > 0 
                        ? formatDuration(data.statistics.avgDurationSeconds)
                        : '-'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Pisin sulatus</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {data.statistics.maxDurationSeconds > 0 
                        ? formatDuration(data.statistics.maxDurationSeconds)
                        : '-'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Keskim. lämpötila</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {data.statistics.avgRoomTemperature !== null 
                        ? `${data.statistics.avgRoomTemperature}°C`
                        : '-'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">Palautumisnopeus</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {data.statistics.avgRecoverySpeed !== null 
                        ? `${data.statistics.avgRecoverySpeed} °C/min`
                        : '-'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Temperature chart */}
              {chartData.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    Lämpötilahistoria {period === '24h' ? '(5 min välein)' : '(tuntikohtainen)'}
                  </h4>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="time" 
                          tickFormatter={formatXAxis}
                          className="text-xs"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          domain={['auto', 'auto']}
                          className="text-xs"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => `${value}°C`}
                        />
                        <Tooltip 
                          labelFormatter={(label) => new Date(label).toLocaleString('fi-FI')}
                          formatter={(value: number, name: string) => {
                            const labels: Record<string, string> = {
                              roomTemp: 'Huonelämpötila',
                              setTemp: 'Tavoite',
                              outdoorTemp: 'Ulkolämpötila',
                            };
                            return [`${value?.toFixed(1)}°C`, labels[name] || name];
                          }}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend 
                          formatter={(value) => {
                            const labels: Record<string, string> = {
                              roomTemp: 'Huonelämpötila',
                              setTemp: 'Tavoite',
                              outdoorTemp: 'Ulkolämpötila',
                            };
                            return labels[value] || value;
                          }}
                        />
                        
                        {/* Defrost areas */}
                        {defrostAreas.map((area, index) => (
                          <ReferenceArea
                            key={index}
                            x1={area.x1}
                            x2={area.x2}
                            fill="hsl(var(--primary))"
                            fillOpacity={0.15}
                          />
                        ))}

                        <Line 
                          type="monotone" 
                          dataKey="roomTemp" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={false}
                          name="roomTemp"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="setTemp" 
                          stroke="hsl(var(--muted-foreground))" 
                          strokeWidth={1}
                          strokeDasharray="5 5"
                          dot={false}
                          name="setTemp"
                        />
                        {chartData.some(d => d.outdoorTemp !== null) && (
                          <Line 
                            type="monotone" 
                            dataKey="outdoorTemp" 
                            stroke="hsl(142 76% 36%)" 
                            strokeWidth={1}
                            dot={false}
                            name="outdoorTemp"
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Ei historiadataa valitulle ajanjaksolle
                </div>
              )}

              {/* Recovery speed analysis */}
              {recoveryScatterData.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Palautumisnopeus vs ulkolämpötila
                    <span className="text-xs text-muted-foreground font-normal">
                      (Auttaa tunnistamaan kriittisen ulkolämpötilan)
                    </span>
                  </h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          type="number" 
                          dataKey="outdoorTemp" 
                          name="Ulkolämpötila"
                          unit="°C"
                          domain={['auto', 'auto']}
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="recoverySpeed" 
                          name="Palautumisnopeus"
                          unit=" °C/min"
                          domain={[0, 'auto']}
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <ZAxis type="number" dataKey="duration" range={[50, 200]} />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value: number, name: string) => {
                            if (name === 'Ulkolämpötila') return [`${value.toFixed(1)}°C`, name];
                            if (name === 'Palautumisnopeus') return [`${value.toFixed(3)} °C/min`, name];
                            return [value, name];
                          }}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Scatter 
                          name="Palautuminen" 
                          data={recoveryScatterData} 
                          fill="hsl(var(--primary))"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Jos palautumisnopeus laskee selvästi ulkolämpötilan laskiessa, lämpöpumpun teho ei riitä kylmimmissä olosuhteissa.
                  </p>
                </div>
              )}

              {/* Defrost log table */}
              {data.defrostLogs.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Snowflake className="w-4 h-4" />
                    Viimeisimmät sulatusjaksot
                  </h4>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-2">Alkoi</th>
                          <th className="text-left p-2">Päättyi</th>
                          <th className="text-left p-2">Kesto</th>
                          <th className="text-left p-2">Tila</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.defrostLogs.slice(0, 10).map((log, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="p-2">
                              {new Date(log.started_at).toLocaleString('fi-FI')}
                            </td>
                            <td className="p-2">
                              {log.ended_at 
                                ? new Date(log.ended_at).toLocaleString('fi-FI')
                                : '-'}
                            </td>
                            <td className="p-2">
                              {log.duration_seconds 
                                ? formatDuration(log.duration_seconds)
                                : '-'}
                            </td>
                            <td className="p-2">
                              {log.ended_at ? (
                                <Badge variant="secondary">Päättynyt</Badge>
                              ) : (
                                <Badge variant="default" className="animate-pulse">
                                  Käynnissä
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeatPumpHistory;
