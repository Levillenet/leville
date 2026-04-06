
-- 1. Ticket categories
CREATE TABLE public.ticket_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  color text NOT NULL DEFAULT '#6B7280',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.ticket_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read ticket categories" ON public.ticket_categories FOR SELECT USING (true);
CREATE POLICY "Only backend can insert ticket_categories" ON public.ticket_categories FOR INSERT WITH CHECK (false);
CREATE POLICY "Only backend can update ticket_categories" ON public.ticket_categories FOR UPDATE USING (false) WITH CHECK (false);
CREATE POLICY "Only backend can delete ticket_categories" ON public.ticket_categories FOR DELETE USING (false);

-- 2. Properties (kiinteistöt)
CREATE TABLE public.properties (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  business_id text,
  contact_email text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read properties" ON public.properties FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Only backend can insert properties" ON public.properties FOR INSERT WITH CHECK (false);
CREATE POLICY "Only backend can update properties" ON public.properties FOR UPDATE USING (false) WITH CHECK (false);
CREATE POLICY "Only backend can delete properties" ON public.properties FOR DELETE USING (false);

-- 3. Ticket history (audit log)
CREATE TABLE public.ticket_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id uuid NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  changed_at timestamp with time zone NOT NULL DEFAULT now(),
  changed_by text,
  field_changed text,
  old_value text,
  new_value text,
  action_type text NOT NULL DEFAULT 'updated'
);

ALTER TABLE public.ticket_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read ticket_history" ON public.ticket_history FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Only backend can insert ticket_history" ON public.ticket_history FOR INSERT WITH CHECK (false);
CREATE POLICY "Only backend can update ticket_history" ON public.ticket_history FOR UPDATE USING (false) WITH CHECK (false);
CREATE POLICY "Only backend can delete ticket_history" ON public.ticket_history FOR DELETE USING (false);

-- 4. Add columns to tickets
ALTER TABLE public.tickets ADD COLUMN category_id uuid REFERENCES public.ticket_categories(id);
ALTER TABLE public.tickets ADD COLUMN property_id uuid REFERENCES public.properties(id);
ALTER TABLE public.tickets ADD COLUMN email_override text;
ALTER TABLE public.tickets ADD COLUMN target_type text NOT NULL DEFAULT 'apartment';

-- 5. Add property_id to apartment_maintenance
ALTER TABLE public.apartment_maintenance ADD COLUMN property_id uuid REFERENCES public.properties(id);

-- 6. Seed default categories
INSERT INTO public.ticket_categories (name, color) VALUES
  ('Kodinkone', '#EF4444'),
  ('Kiinteistön korjaus', '#F97316'),
  ('Valaisinkorjaus', '#EAB308'),
  ('Sisäremontointi', '#22C55E'),
  ('LVI (putki/ilmanvaihto)', '#3B82F6'),
  ('Lukitus ja ovet', '#8B5CF6'),
  ('Piha ja ulkoalueet', '#06B6D4'),
  ('Muu', '#6B7280');
