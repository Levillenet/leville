
-- Create ticket type enum
CREATE TYPE public.ticket_type AS ENUM ('seasonal', 'urgent');

-- Create ticket priority enum  
CREATE TYPE public.ticket_priority AS ENUM ('1', '2');

-- Create ticket status enum
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved');

-- Create maintenance_companies table
CREATE TABLE public.maintenance_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.maintenance_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read maintenance_companies" ON public.maintenance_companies
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Only backend can insert maintenance_companies" ON public.maintenance_companies
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Only backend can update maintenance_companies" ON public.maintenance_companies
  FOR UPDATE USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete maintenance_companies" ON public.maintenance_companies
  FOR DELETE USING (false);

-- Create apartment_maintenance table
CREATE TABLE public.apartment_maintenance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  apartment_id TEXT NOT NULL,
  maintenance_company_id UUID NOT NULL REFERENCES public.maintenance_companies(id) ON DELETE CASCADE,
  contact_email_override TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.apartment_maintenance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read apartment_maintenance" ON public.apartment_maintenance
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Only backend can insert apartment_maintenance" ON public.apartment_maintenance
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Only backend can update apartment_maintenance" ON public.apartment_maintenance
  FOR UPDATE USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete apartment_maintenance" ON public.apartment_maintenance
  FOR DELETE USING (false);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  apartment_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type ticket_type NOT NULL DEFAULT 'seasonal',
  priority ticket_priority NOT NULL DEFAULT '1',
  status ticket_status NOT NULL DEFAULT 'open',
  send_email BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read tickets" ON public.tickets
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Only backend can insert tickets" ON public.tickets
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Only backend can update tickets" ON public.tickets
  FOR UPDATE USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete tickets" ON public.tickets
  FOR DELETE USING (false);

-- Create ticket_email_log table
CREATE TABLE public.ticket_email_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  sent_to TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'sent',
  error_message TEXT
);

ALTER TABLE public.ticket_email_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read ticket_email_log" ON public.ticket_email_log
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Only backend can insert ticket_email_log" ON public.ticket_email_log
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Only backend can update ticket_email_log" ON public.ticket_email_log
  FOR UPDATE USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete ticket_email_log" ON public.ticket_email_log
  FOR DELETE USING (false);
