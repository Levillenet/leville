CREATE TABLE public.promo_banner_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  banner_id UUID,
  banner_title TEXT,
  placement TEXT,
  language TEXT,
  target_url TEXT,
  session_id TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.promo_banner_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log promo banner clicks"
ON public.promo_banner_clicks
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only backend can read promo banner clicks"
ON public.promo_banner_clicks
FOR SELECT
USING (false);

CREATE POLICY "No updates on promo banner clicks"
ON public.promo_banner_clicks
FOR UPDATE
USING (false);

CREATE POLICY "No deletes on promo banner clicks"
ON public.promo_banner_clicks
FOR DELETE
USING (false);

CREATE INDEX idx_promo_banner_clicks_banner_id ON public.promo_banner_clicks(banner_id);
CREATE INDEX idx_promo_banner_clicks_created_at ON public.promo_banner_clicks(created_at DESC);