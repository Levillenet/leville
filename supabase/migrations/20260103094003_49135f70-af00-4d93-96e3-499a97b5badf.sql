-- Create site_settings table for general site configuration
CREATE TABLE public.site_settings (
  id TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Backend-only write access
CREATE POLICY "Only backend can insert site settings"
ON public.site_settings
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update site settings"
ON public.site_settings
FOR UPDATE
USING (false)
WITH CHECK (false);

CREATE POLICY "Only backend can delete site settings"
ON public.site_settings
FOR DELETE
USING (false);

-- Add trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default value for deals_days_ahead (14 days)
INSERT INTO public.site_settings (id, value) 
VALUES ('deals_days_ahead', '14'::jsonb);