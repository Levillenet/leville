-- Create table for individual pump performance baselines per temperature range
CREATE TABLE public.heat_pump_performance_baseline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id INTEGER NOT NULL,
  outdoor_temp_range TEXT NOT NULL, -- e.g., "-25_-20", "-20_-15", "-15_-10"
  avg_recovery_speed NUMERIC DEFAULT 0, -- °C per minute
  avg_temp_debt NUMERIC DEFAULT 0, -- average temperature below target
  total_recovery_time_seconds INTEGER DEFAULT 0, -- cumulative recovery time
  sample_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(device_id, outdoor_temp_range)
);

-- Create table for fleet-wide baselines per temperature range
CREATE TABLE public.heat_pump_fleet_baseline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  outdoor_temp_range TEXT NOT NULL UNIQUE,
  fleet_avg_recovery_speed NUMERIC DEFAULT 0, -- average of all pumps
  fleet_avg_temp_debt NUMERIC DEFAULT 0,
  device_count INTEGER DEFAULT 0, -- how many devices contributed
  sample_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.heat_pump_performance_baseline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heat_pump_fleet_baseline ENABLE ROW LEVEL SECURITY;

-- RLS policies for heat_pump_performance_baseline
CREATE POLICY "Admins can read heat_pump_performance_baseline"
ON public.heat_pump_performance_baseline
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_performance_baseline"
ON public.heat_pump_performance_baseline
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_performance_baseline"
ON public.heat_pump_performance_baseline
FOR UPDATE
USING (false);

CREATE POLICY "Only backend can delete heat_pump_performance_baseline"
ON public.heat_pump_performance_baseline
FOR DELETE
USING (false);

-- RLS policies for heat_pump_fleet_baseline
CREATE POLICY "Admins can read heat_pump_fleet_baseline"
ON public.heat_pump_fleet_baseline
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_fleet_baseline"
ON public.heat_pump_fleet_baseline
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_fleet_baseline"
ON public.heat_pump_fleet_baseline
FOR UPDATE
USING (false);

CREATE POLICY "Only backend can delete heat_pump_fleet_baseline"
ON public.heat_pump_fleet_baseline
FOR DELETE
USING (false);

-- Trigger for updated_at
CREATE TRIGGER update_heat_pump_performance_baseline_updated_at
BEFORE UPDATE ON public.heat_pump_performance_baseline
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_heat_pump_fleet_baseline_updated_at
BEFORE UPDATE ON public.heat_pump_fleet_baseline
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();