-- Create heat_pump_settings table for device-specific recovery settings
CREATE TABLE public.heat_pump_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id INTEGER NOT NULL UNIQUE,
    device_name TEXT,
    fan_auto_recovery BOOLEAN DEFAULT true,
    fan_recovery_delay_minutes INTEGER DEFAULT 60,
    pending_fan_recovery_at TIMESTAMP WITH TIME ZONE,
    pending_fan_speed INTEGER DEFAULT 4,
    last_known_state TEXT DEFAULT 'UNKNOWN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create heat_pump_history table for temperature and state logging
CREATE TABLE public.heat_pump_history (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id INTEGER NOT NULL,
    room_temperature NUMERIC,
    set_temperature NUMERIC,
    outdoor_temperature NUMERIC,
    operating_state TEXT NOT NULL,
    fan_speed INTEGER,
    power BOOLEAN,
    operation_mode TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for efficient history queries
CREATE INDEX idx_heat_pump_history_device_time ON public.heat_pump_history(device_id, recorded_at DESC);

-- Create heat_pump_defrost_log table for defrost cycle tracking
CREATE TABLE public.heat_pump_defrost_log (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id INTEGER NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for defrost log queries
CREATE INDEX idx_heat_pump_defrost_log_device_time ON public.heat_pump_defrost_log(device_id, started_at DESC);

-- Enable RLS on all tables
ALTER TABLE public.heat_pump_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heat_pump_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heat_pump_defrost_log ENABLE ROW LEVEL SECURITY;

-- RLS policies for heat_pump_settings
CREATE POLICY "Admins can read heat_pump_settings" 
ON public.heat_pump_settings 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_settings" 
ON public.heat_pump_settings 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_settings" 
ON public.heat_pump_settings 
FOR UPDATE 
USING (false);

CREATE POLICY "Only backend can delete heat_pump_settings" 
ON public.heat_pump_settings 
FOR DELETE 
USING (false);

-- RLS policies for heat_pump_history
CREATE POLICY "Admins can read heat_pump_history" 
ON public.heat_pump_history 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_history" 
ON public.heat_pump_history 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_history" 
ON public.heat_pump_history 
FOR UPDATE 
USING (false);

CREATE POLICY "Only backend can delete heat_pump_history" 
ON public.heat_pump_history 
FOR DELETE 
USING (false);

-- RLS policies for heat_pump_defrost_log
CREATE POLICY "Admins can read heat_pump_defrost_log" 
ON public.heat_pump_defrost_log 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_defrost_log" 
ON public.heat_pump_defrost_log 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_defrost_log" 
ON public.heat_pump_defrost_log 
FOR UPDATE 
USING (false);

CREATE POLICY "Only backend can delete heat_pump_defrost_log" 
ON public.heat_pump_defrost_log 
FOR DELETE 
USING (false);

-- Trigger for updated_at on heat_pump_settings
CREATE TRIGGER update_heat_pump_settings_updated_at
BEFORE UPDATE ON public.heat_pump_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();