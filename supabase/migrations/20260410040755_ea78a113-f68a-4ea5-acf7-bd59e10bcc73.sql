
ALTER TABLE public.tickets
ADD COLUMN resolved_at timestamptz,
ADD COLUMN resolved_by text,
ADD COLUMN resolve_token text UNIQUE DEFAULT gen_random_uuid();
