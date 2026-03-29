
CREATE TABLE public.promo_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  heading_fi text,
  heading_en text,
  heading_de text,
  heading_sv text,
  heading_fr text,
  heading_es text,
  heading_nl text,
  subtext_fi text,
  subtext_en text,
  subtext_de text,
  subtext_sv text,
  subtext_fr text,
  subtext_es text,
  subtext_nl text,
  button_text_fi text,
  button_text_en text,
  button_text_de text,
  button_text_sv text,
  button_text_fr text,
  button_text_es text,
  button_text_nl text,
  target_url text NOT NULL DEFAULT '/',
  theme text NOT NULL DEFAULT 'vappu',
  starts_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active valid promo banners"
  ON public.promo_banners FOR SELECT TO public
  USING (is_active = true AND starts_at <= now() AND expires_at >= now());

CREATE POLICY "Admins can read all promo banners"
  ON public.promo_banners FOR SELECT TO public
  USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert promo banners"
  ON public.promo_banners FOR INSERT TO public
  WITH CHECK (false);

CREATE POLICY "Only backend can update promo banners"
  ON public.promo_banners FOR UPDATE TO public
  USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete promo banners"
  ON public.promo_banners FOR DELETE TO public
  USING (false);
