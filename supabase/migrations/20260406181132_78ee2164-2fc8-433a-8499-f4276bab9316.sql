-- Make maintenance_company_id nullable to allow property-only assignments
ALTER TABLE public.apartment_maintenance ALTER COLUMN maintenance_company_id DROP NOT NULL;
