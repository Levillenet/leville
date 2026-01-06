-- Add column for actual outdoor temperature from Open-Meteo API
ALTER TABLE heat_pump_history 
ADD COLUMN actual_outdoor_temp NUMERIC;

-- Add comment explaining the column
COMMENT ON COLUMN heat_pump_history.actual_outdoor_temp IS 'Actual outdoor temperature from Open-Meteo API (MELCloud ATA devices report incorrect -15°C)';