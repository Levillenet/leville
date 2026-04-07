
-- Add assignment_type column
ALTER TABLE public.apartment_maintenance
ADD COLUMN assignment_type text NOT NULL DEFAULT 'kiinteistohuolto';

-- Remove duplicates (all have same default assignment_type), keep newest
DELETE FROM public.apartment_maintenance a
USING public.apartment_maintenance b
WHERE a.apartment_id = b.apartment_id
  AND a.assignment_type = b.assignment_type
  AND a.created_at < b.created_at;

-- Add unique constraint
ALTER TABLE public.apartment_maintenance
ADD CONSTRAINT apartment_maintenance_apartment_assignment_unique 
UNIQUE (apartment_id, assignment_type);
