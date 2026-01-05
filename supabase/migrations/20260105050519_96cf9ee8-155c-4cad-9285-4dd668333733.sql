-- Create temperature reset log table for tracking 24h resets
CREATE TABLE public.heat_pump_temp_reset_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id INTEGER NOT NULL,
  reset_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  original_temperature NUMERIC NOT NULL,
  reset_to_temperature NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for fast 24h queries
CREATE INDEX idx_temp_reset_log_device_time ON public.heat_pump_temp_reset_log(device_id, reset_at DESC);

-- Enable RLS (admin only access)
ALTER TABLE public.heat_pump_temp_reset_log ENABLE ROW LEVEL SECURITY;

-- Admin access policy
CREATE POLICY "Admins can view temp reset logs"
ON public.heat_pump_temp_reset_log
FOR ALL
USING (public.is_admin(auth.uid()));

-- Add column for tracking reset count in UI response
COMMENT ON TABLE public.heat_pump_temp_reset_log IS 'Tracks automatic temperature resets for 24h statistics';