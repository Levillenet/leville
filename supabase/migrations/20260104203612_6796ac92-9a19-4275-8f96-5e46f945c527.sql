-- Muuta fan_auto_recovery oletusarvo falseksi
ALTER TABLE public.heat_pump_settings ALTER COLUMN fan_auto_recovery SET DEFAULT false;

-- Päivitä olemassaolevat NULL-arvot falseksi
UPDATE public.heat_pump_settings SET fan_auto_recovery = false WHERE fan_auto_recovery IS NULL;

-- Luo tehonriittävyysmetriikat-taulu
CREATE TABLE public.heat_pump_efficiency_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id INTEGER NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  degree_minutes NUMERIC DEFAULT 0,
  recovery_speed NUMERIC,
  efficiency_status TEXT DEFAULT 'UNKNOWN',
  outdoor_temp_at_calculation NUMERIC,
  temp_debt NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Luo palautumisloki-taulu
CREATE TABLE public.heat_pump_recovery_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id INTEGER NOT NULL,
  defrost_ended_at TIMESTAMP WITH TIME ZONE NOT NULL,
  target_reached_at TIMESTAMP WITH TIME ZONE,
  recovery_duration_seconds INTEGER,
  recovery_speed NUMERIC,
  outdoor_temperature NUMERIC,
  temperature_delta NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Lisää degree_minutes heat_pump_settings-tauluun jatkuvaa seurantaa varten
ALTER TABLE public.heat_pump_settings 
  ADD COLUMN IF NOT EXISTS degree_minutes NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS efficiency_status TEXT DEFAULT 'UNKNOWN',
  ADD COLUMN IF NOT EXISTS recovery_tracking_started_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS recovery_tracking_start_temp NUMERIC;

-- RLS heat_pump_efficiency_metrics
ALTER TABLE public.heat_pump_efficiency_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read heat_pump_efficiency_metrics" 
  ON public.heat_pump_efficiency_metrics 
  FOR SELECT 
  USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_efficiency_metrics" 
  ON public.heat_pump_efficiency_metrics 
  FOR INSERT 
  WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_efficiency_metrics" 
  ON public.heat_pump_efficiency_metrics 
  FOR UPDATE 
  USING (false);

CREATE POLICY "Only backend can delete heat_pump_efficiency_metrics" 
  ON public.heat_pump_efficiency_metrics 
  FOR DELETE 
  USING (false);

-- RLS heat_pump_recovery_log
ALTER TABLE public.heat_pump_recovery_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read heat_pump_recovery_log" 
  ON public.heat_pump_recovery_log 
  FOR SELECT 
  USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_recovery_log" 
  ON public.heat_pump_recovery_log 
  FOR INSERT 
  WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_recovery_log" 
  ON public.heat_pump_recovery_log 
  FOR UPDATE 
  USING (false);

CREATE POLICY "Only backend can delete heat_pump_recovery_log" 
  ON public.heat_pump_recovery_log 
  FOR DELETE 
  USING (false);