-- Create table for logging fan speed resets
CREATE TABLE public.heat_pump_fan_reset_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id bigint NOT NULL,
  reset_at timestamp with time zone NOT NULL DEFAULT now(),
  from_fan_speed integer NOT NULL,
  to_fan_speed integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for efficient 24h queries
CREATE INDEX idx_heat_pump_fan_reset_log_device_time 
ON public.heat_pump_fan_reset_log(device_id, reset_at DESC);

-- Enable RLS
ALTER TABLE public.heat_pump_fan_reset_log ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can view fan reset logs"
ON public.heat_pump_fan_reset_log
FOR ALL
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert fan reset logs"
ON public.heat_pump_fan_reset_log
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update fan reset logs"
ON public.heat_pump_fan_reset_log
FOR UPDATE
USING (false);

CREATE POLICY "Only backend can delete fan reset logs"
ON public.heat_pump_fan_reset_log
FOR DELETE
USING (false);