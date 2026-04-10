ALTER TABLE public.tickets
  ADD COLUMN IF NOT EXISTS maintenance_company_id uuid REFERENCES public.maintenance_companies(id) ON DELETE SET NULL;