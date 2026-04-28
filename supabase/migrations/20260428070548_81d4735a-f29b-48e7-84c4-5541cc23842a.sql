ALTER TABLE public.autoresponder_settings
  ADD COLUMN IF NOT EXISTS away_hours_start time NOT NULL DEFAULT '22:00',
  ADD COLUMN IF NOT EXISTS away_hours_end time NOT NULL DEFAULT '07:00',
  ADD COLUMN IF NOT EXISTS away_only_in_window boolean NOT NULL DEFAULT false;