ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS country TEXT;
CREATE INDEX IF NOT EXISTS idx_page_views_country ON public.page_views(country);