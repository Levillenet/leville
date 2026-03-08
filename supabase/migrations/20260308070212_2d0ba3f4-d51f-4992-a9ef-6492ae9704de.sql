
CREATE TABLE public.seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL UNIQUE,
  title text NOT NULL,
  component_name text NOT NULL,
  lang text NOT NULL DEFAULT 'fi',
  is_published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;

-- Anyone can read published pages (for dynamic routing)
CREATE POLICY "Anyone can read published seo pages"
  ON public.seo_pages FOR SELECT
  USING (is_published = true);

-- Admins can read all pages
CREATE POLICY "Admins can read all seo pages"
  ON public.seo_pages FOR SELECT
  USING (is_admin(auth.uid()));

-- Only backend can insert/update/delete
CREATE POLICY "Only backend can insert seo pages"
  ON public.seo_pages FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only backend can update seo pages"
  ON public.seo_pages FOR UPDATE
  USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete seo pages"
  ON public.seo_pages FOR DELETE
  USING (false);
