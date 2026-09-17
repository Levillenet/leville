CREATE TABLE public.group_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building text NOT NULL,
  language text NOT NULL DEFAULT 'fi',
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  group_type text NOT NULL,
  group_size text NOT NULL,
  arrival date,
  departure date,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.group_inquiries TO service_role;

ALTER TABLE public.group_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read group inquiries"
ON public.group_inquiries
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));