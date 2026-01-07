-- Create table for floor heating temperature history
CREATE TABLE public.floor_heating_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  device_name TEXT NOT NULL,
  apartment_code TEXT NOT NULL,
  homey_id TEXT NOT NULL,
  homey_name TEXT,
  
  -- Measured temperatures
  air_temperature NUMERIC,
  floor_temperature NUMERIC,
  target_temperature NUMERIC,
  
  -- Device state
  power_on BOOLEAN DEFAULT true,
  
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX idx_floor_heating_history_device ON public.floor_heating_history(device_id);
CREATE INDEX idx_floor_heating_history_recorded ON public.floor_heating_history(recorded_at DESC);
CREATE INDEX idx_floor_heating_history_apartment ON public.floor_heating_history(apartment_code);

-- Enable RLS
ALTER TABLE public.floor_heating_history ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can read floor_heating_history"
  ON public.floor_heating_history
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert floor_heating_history"
  ON public.floor_heating_history
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only backend can update floor_heating_history"
  ON public.floor_heating_history
  FOR UPDATE
  USING (false);

CREATE POLICY "Only backend can delete floor_heating_history"
  ON public.floor_heating_history
  FOR DELETE
  USING (false);