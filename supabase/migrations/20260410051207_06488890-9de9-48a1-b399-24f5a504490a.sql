
CREATE TABLE public.ticket_apartments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  apartment_id text NOT NULL,
  apartment_name text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'open',
  resolve_token text NOT NULL DEFAULT gen_random_uuid()::text,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_ticket_apartments_token ON public.ticket_apartments(resolve_token);
CREATE INDEX idx_ticket_apartments_ticket ON public.ticket_apartments(ticket_id);

ALTER TABLE public.ticket_apartments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read ticket_apartments"
  ON public.ticket_apartments FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Only backend can insert ticket_apartments"
  ON public.ticket_apartments FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only backend can update ticket_apartments"
  ON public.ticket_apartments FOR UPDATE
  USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete ticket_apartments"
  ON public.ticket_apartments FOR DELETE
  USING (false);
