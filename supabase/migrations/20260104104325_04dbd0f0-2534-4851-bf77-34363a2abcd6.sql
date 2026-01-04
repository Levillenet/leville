-- Create property_maintenance table for storing maintenance-related info
CREATE TABLE public.property_maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT NOT NULL UNIQUE,
  owner_email TEXT,
  cleaning_email TEXT,
  cleaning_fee NUMERIC DEFAULT 0,
  max_guests INTEGER,
  linen_price_per_person NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create maintenance_settings table
CREATE TABLE public.maintenance_settings (
  id TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.property_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for property_maintenance
CREATE POLICY "Admins can read property maintenance"
ON public.property_maintenance
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only backend can insert property maintenance"
ON public.property_maintenance
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update property maintenance"
ON public.property_maintenance
FOR UPDATE
USING (false)
WITH CHECK (false);

CREATE POLICY "Only backend can delete property maintenance"
ON public.property_maintenance
FOR DELETE
USING (false);

-- RLS policies for maintenance_settings
CREATE POLICY "Admins can read maintenance settings"
ON public.maintenance_settings
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only backend can insert maintenance settings"
ON public.maintenance_settings
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update maintenance settings"
ON public.maintenance_settings
FOR UPDATE
USING (false)
WITH CHECK (false);

CREATE POLICY "Only backend can delete maintenance settings"
ON public.maintenance_settings
FOR DELETE
USING (false);

-- Create trigger for updated_at
CREATE TRIGGER update_property_maintenance_updated_at
BEFORE UPDATE ON public.property_maintenance
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_maintenance_settings_updated_at
BEFORE UPDATE ON public.maintenance_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial settings
INSERT INTO public.maintenance_settings (id, value) VALUES 
('worklist_send_time', '{"hour": 19, "minute": 0}'::jsonb),
('worklist_enabled', '{"enabled": true}'::jsonb),
('last_worklist_sent', '{"timestamp": null}'::jsonb);

-- Insert property maintenance data from Excel (using only property_id)
INSERT INTO public.property_maintenance (property_id, owner_email, cleaning_email, cleaning_fee, max_guests, linen_price_per_person) VALUES
('350154', 'info@leville.net', 'info@leville.net', 130, 6, 12),
('350155', 'info@leville.net', 'info@leville.net', 130, 6, 12),
('350156', 'info@leville.net', 'info@leville.net', 130, 6, 12),
('350157', 'info@leville.net', 'info@leville.net', 130, 6, 12),
('350158', 'info@leville.net', 'info@leville.net', 130, 6, 12),
('504843', 'info@leville.net', 'info@leville.net', 150, 8, 12),
('504845', 'info@leville.net', 'info@leville.net', 150, 8, 12),
('504846', 'info@leville.net', 'info@leville.net', 150, 5, 12),
('504847', 'info@leville.net', 'info@leville.net', 150, 5, 12),
('504848', 'info@leville.net', 'info@leville.net', 150, 8, 12),
('504849', 'info@leville.net', 'info@leville.net', 150, 8, 12),
('504850', 'info@leville.net', 'info@leville.net', 150, 5, 12),
('504851', 'info@leville.net', 'info@leville.net', 150, 5, 12),
('496498', 'info@leville.net', 'info@leville.net', 150, 6, 12),
('504853', 'info@leville.net', 'info@leville.net', 150, 10, 12),
('504852', 'info@leville.net', 'info@leville.net', 150, 6, 12),
('504854', 'info@leville.net', 'info@leville.net', 150, 10, 12),
('453336', 'info@leville.net', 'info@leville.net', 100, 4, 12),
('504856', 'info@leville.net', 'info@leville.net', 150, 7, 12),
('504855', 'info@leville.net', 'info@leville.net', 100, 4, 12),
('453338', 'info@leville.net', 'info@leville.net', 100, 4, 12),
('453339', 'info@leville.net', 'info@leville.net', 100, 4, 12),
('504857', 'info@leville.net', 'info@leville.net', 150, 8, 12),
('504858', 'info@leville.net', 'info@leville.net', 150, 8, 12),
('453335', 'info@leville.net', 'info@leville.net', 250, 18, 12),
('504859', 'info@leville.net', 'info@leville.net', 200, 14, 12),
('504860', 'info@leville.net', 'info@leville.net', 200, 14, 12);