ALTER TABLE public.autoresponder_settings
  ADD COLUMN IF NOT EXISTS enabled_at timestamptz;

-- Initialize for current row so the next poll only processes mail from now on
UPDATE public.autoresponder_settings
SET enabled_at = COALESCE(enabled_at, now())
WHERE id = 1 AND enabled = true;