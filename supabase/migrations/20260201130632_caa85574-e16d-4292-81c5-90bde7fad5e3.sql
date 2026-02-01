-- Create message_templates table for storing WhatsApp message templates
CREATE TABLE public.message_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for message_templates
ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;

-- RLS policies for message_templates
CREATE POLICY "Anyone can read templates" ON public.message_templates FOR SELECT USING (true);
CREATE POLICY "Only backend can insert templates" ON public.message_templates FOR INSERT WITH CHECK (false);
CREATE POLICY "Only backend can update templates" ON public.message_templates FOR UPDATE USING (false) WITH CHECK (false);
CREATE POLICY "Only backend can delete templates" ON public.message_templates FOR DELETE USING (false);

-- Create trigger for updating updated_at
CREATE TRIGGER update_message_templates_updated_at
BEFORE UPDATE ON public.message_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default templates
INSERT INTO public.message_templates (name, message, is_default) VALUES
  ('Revontulet', 'Hei [NIMI]! 🌌 Tänään on ennustettu revontulia alueella. Hyviä katseluhetkiä! - Leville', true),
  ('Sähkökatko', 'Hei [NIMI]. Alueella on sähkökatko. Pahoittelemme häiriötä. Ilmoitamme kun tilanne korjaantuu. - Leville', true),
  ('Yleinen tiedote', 'Hei [NIMI]. [VIESTI] - Leville', true);

-- Create message_logs table for logging sent messages
CREATE TABLE public.message_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  apartment_name TEXT,
  template_name TEXT,
  message_content TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  sent_by TEXT
);

-- Enable RLS for message_logs
ALTER TABLE public.message_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for message_logs
CREATE POLICY "Admins can read message logs" ON public.message_logs FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Only backend can insert logs" ON public.message_logs FOR INSERT WITH CHECK (false);
CREATE POLICY "Only backend can update logs" ON public.message_logs FOR UPDATE USING (false);
CREATE POLICY "Only backend can delete logs" ON public.message_logs FOR DELETE USING (false);