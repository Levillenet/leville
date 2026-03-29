
CREATE TABLE public.timed_notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content_fi text,
  content_en text,
  content_de text,
  content_sv text,
  content_fr text,
  content_es text,
  content_nl text,
  target_pages text[] NOT NULL DEFAULT '{}',
  starts_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  style text NOT NULL DEFAULT 'info',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.timed_notices ENABLE ROW LEVEL SECURITY;

-- Public can read active, currently valid notices
CREATE POLICY "Anyone can read active valid notices"
ON public.timed_notices
FOR SELECT
TO public
USING (is_active = true AND starts_at <= now() AND expires_at >= now());

-- Backend-only write
CREATE POLICY "Only backend can insert timed_notices"
ON public.timed_notices FOR INSERT TO public WITH CHECK (false);

CREATE POLICY "Only backend can update timed_notices"
ON public.timed_notices FOR UPDATE TO public USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete timed_notices"
ON public.timed_notices FOR DELETE TO public USING (false);

-- Admins can read all notices (including expired/inactive)
CREATE POLICY "Admins can read all timed_notices"
ON public.timed_notices FOR SELECT TO public USING (is_admin(auth.uid()));
