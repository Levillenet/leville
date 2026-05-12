ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS viewport_w INTEGER;
CREATE INDEX IF NOT EXISTS idx_page_views_session_created ON public.page_views (session_id, created_at);