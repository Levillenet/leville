-- Convert company_type to array and rename
ALTER TABLE public.maintenance_companies ADD COLUMN company_types text[] NOT NULL DEFAULT '{kiinteistohuolto}';
UPDATE public.maintenance_companies SET company_types = ARRAY[company_type];
ALTER TABLE public.maintenance_companies DROP COLUMN company_type;
