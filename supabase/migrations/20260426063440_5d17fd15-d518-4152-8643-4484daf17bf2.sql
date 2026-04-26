-- Add placement column to distinguish hero badge from below-hero banner
ALTER TABLE public.promo_banners
ADD COLUMN IF NOT EXISTS placement TEXT NOT NULL DEFAULT 'below_hero';

-- Optional check via trigger-friendly constraint (allow only known values)
ALTER TABLE public.promo_banners
DROP CONSTRAINT IF EXISTS promo_banners_placement_check;

ALTER TABLE public.promo_banners
ADD CONSTRAINT promo_banners_placement_check
CHECK (placement IN ('hero', 'below_hero'));

CREATE INDEX IF NOT EXISTS idx_promo_banners_placement ON public.promo_banners(placement);