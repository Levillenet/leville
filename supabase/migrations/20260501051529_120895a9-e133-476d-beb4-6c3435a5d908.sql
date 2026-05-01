ALTER TABLE public.autoresponder_settings
  ADD COLUMN IF NOT EXISTS ai_replies_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS ai_drafts_enabled boolean NOT NULL DEFAULT true;