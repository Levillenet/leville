-- Create heat pump global settings table
CREATE TABLE public.heat_pump_global_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  checkout_drop_enabled BOOLEAN NOT NULL DEFAULT false,
  checkout_drop_temperature INTEGER NOT NULL DEFAULT 20,
  checkout_drop_time TEXT NOT NULL DEFAULT '10:00',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default row
INSERT INTO public.heat_pump_global_settings (id) VALUES ('global');

-- Enable RLS
ALTER TABLE public.heat_pump_global_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can read heat_pump_global_settings"
ON public.heat_pump_global_settings FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_global_settings"
ON public.heat_pump_global_settings FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_global_settings"
ON public.heat_pump_global_settings FOR UPDATE
USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete heat_pump_global_settings"
ON public.heat_pump_global_settings FOR DELETE
USING (false);

-- Add heat pump name column to property_maintenance
ALTER TABLE public.property_maintenance
ADD COLUMN heat_pump_name TEXT DEFAULT NULL;

-- Add next checkout drop timestamp to heat_pump_settings
ALTER TABLE public.heat_pump_settings
ADD COLUMN next_checkout_drop_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create checkout drop log table
CREATE TABLE public.heat_pump_checkout_drop_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id BIGINT NOT NULL,
  property_id TEXT NOT NULL,
  dropped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  from_temperature NUMERIC,
  to_temperature NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.heat_pump_checkout_drop_log ENABLE ROW LEVEL SECURITY;

-- RLS policies for log
CREATE POLICY "Admins can read heat_pump_checkout_drop_log"
ON public.heat_pump_checkout_drop_log FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert heat_pump_checkout_drop_log"
ON public.heat_pump_checkout_drop_log FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update heat_pump_checkout_drop_log"
ON public.heat_pump_checkout_drop_log FOR UPDATE
USING (false);

CREATE POLICY "Only backend can delete heat_pump_checkout_drop_log"
ON public.heat_pump_checkout_drop_log FOR DELETE
USING (false);