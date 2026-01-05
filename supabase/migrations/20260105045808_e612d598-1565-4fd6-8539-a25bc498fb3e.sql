-- Add max temperature reset feature columns to heat_pump_settings
ALTER TABLE public.heat_pump_settings
ADD COLUMN IF NOT EXISTS max_temp_reset_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS max_temp_limit numeric DEFAULT 22,
ADD COLUMN IF NOT EXISTS max_temp_reset_delay_minutes integer DEFAULT 60,
ADD COLUMN IF NOT EXISTS pending_temp_reset_at timestamp with time zone DEFAULT null,
ADD COLUMN IF NOT EXISTS original_set_temperature numeric DEFAULT null;