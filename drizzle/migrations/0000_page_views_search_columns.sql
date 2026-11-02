ALTER TABLE public.page_views
  ADD COLUMN IF NOT EXISTS haku_id uuid,
  ADD COLUMN IF NOT EXISTS saapuminen date,
  ADD COLUMN IF NOT EXISTS lahto date,
  ADD COLUMN IF NOT EXISTS oita integer,
  ADD COLUMN IF NOT EXISTS aikuiset integer,
  ADD COLUMN IF NOT EXISTS lapset integer,
  ADD COLUMN IF NOT EXISTS henkiloita integer,
  ADD COLUMN IF NOT EXISTS jousto integer,
  ADD COLUMN IF NOT EXISTS kohde text,
  ADD COLUMN IF NOT EXISTS tulos_vapaita integer,
  ADD COLUMN IF NOT EXISTS tilanne text,
  ADD COLUMN IF NOT EXISTS minimi_oita integer,
  ADD COLUMN IF NOT EXISTS vaihtoehtoja integer,
  ADD COLUMN IF NOT EXISTS valittu_saapuminen date,
  ADD COLUMN IF NOT EXISTS valittu_lahto date,
  ADD COLUMN IF NOT EXISTS siirto_pv integer,
  ADD COLUMN IF NOT EXISTS kieli text;
CREATE INDEX IF NOT EXISTS page_views_haku_idx ON public.page_views (created_at) WHERE path LIKE '/event/haku%';