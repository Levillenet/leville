-- Add company_type to maintenance_companies
ALTER TABLE public.maintenance_companies ADD COLUMN company_type text NOT NULL DEFAULT 'kiinteistohuolto';
