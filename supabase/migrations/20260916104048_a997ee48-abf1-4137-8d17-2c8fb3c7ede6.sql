CREATE TABLE IF NOT EXISTS public.rate_limit_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket text NOT NULL,
  client_key text NOT NULL,
  attempts integer NOT NULL DEFAULT 1,
  window_started_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (bucket, client_key)
);

GRANT ALL ON public.rate_limit_attempts TO service_role;

ALTER TABLE public.rate_limit_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only backend can read rate limit attempts"
  ON public.rate_limit_attempts FOR SELECT TO authenticated USING (false);
CREATE POLICY "Only backend can insert rate limit attempts"
  ON public.rate_limit_attempts FOR INSERT TO authenticated WITH CHECK (false);
CREATE POLICY "Only backend can update rate limit attempts"
  ON public.rate_limit_attempts FOR UPDATE TO authenticated USING (false);
CREATE POLICY "Only backend can delete rate limit attempts"
  ON public.rate_limit_attempts FOR DELETE TO authenticated USING (false);
