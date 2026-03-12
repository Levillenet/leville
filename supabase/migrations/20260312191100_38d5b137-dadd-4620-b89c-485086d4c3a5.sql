CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  device_type text DEFAULT 'desktop',
  language text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views"
  ON public.page_views FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Only backend can read page views"
  ON public.page_views FOR SELECT TO public
  USING (false);

CREATE POLICY "No updates on page views"
  ON public.page_views FOR UPDATE TO public
  USING (false);

CREATE POLICY "No deletes on page views"
  ON public.page_views FOR DELETE TO public
  USING (false);

CREATE INDEX idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX idx_page_views_path ON public.page_views (path);