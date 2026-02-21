
-- Guide properties - one per accommodation
CREATE TABLE public.guide_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  check_in_time TEXT DEFAULT '17:00',
  check_out_time TEXT DEFAULT '11:00',
  hero_image_url TEXT,
  wifi_name TEXT,
  wifi_password TEXT,
  contact_phone TEXT,
  contact_whatsapp TEXT,
  contact_email TEXT,
  max_guests INTEGER,
  bedrooms TEXT,
  bathrooms TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Guide sections - flexible content blocks per property
CREATE TABLE public.guide_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.guide_properties(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  icon TEXT DEFAULT 'info',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Guide images - photos per section or property
CREATE TABLE public.guide_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.guide_properties(id) ON DELETE CASCADE,
  section_key TEXT,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.guide_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_images ENABLE ROW LEVEL SECURITY;

-- Public read for published guides (unlisted but accessible)
CREATE POLICY "Anyone can read published guides"
  ON public.guide_properties FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can read all guides"
  ON public.guide_properties FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert guides"
  ON public.guide_properties FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only backend can update guides"
  ON public.guide_properties FOR UPDATE
  USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete guides"
  ON public.guide_properties FOR DELETE
  USING (false);

-- Sections: public read if parent property is published
CREATE POLICY "Anyone can read sections of published guides"
  ON public.guide_sections FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.guide_properties WHERE id = property_id AND is_published = true));

CREATE POLICY "Admins can read all sections"
  ON public.guide_sections FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert sections"
  ON public.guide_sections FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only backend can update sections"
  ON public.guide_sections FOR UPDATE
  USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete sections"
  ON public.guide_sections FOR DELETE
  USING (false);

-- Images: same pattern
CREATE POLICY "Anyone can read images of published guides"
  ON public.guide_images FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.guide_properties WHERE id = property_id AND is_published = true));

CREATE POLICY "Admins can read all images"
  ON public.guide_images FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert images"
  ON public.guide_images FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only backend can update images"
  ON public.guide_images FOR UPDATE
  USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete images"
  ON public.guide_images FOR DELETE
  USING (false);

-- Storage bucket for guide images
INSERT INTO storage.buckets (id, name, public) VALUES ('guide-images', 'guide-images', true);

CREATE POLICY "Anyone can view guide images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'guide-images');

CREATE POLICY "Admins can upload guide images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'guide-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update guide images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'guide-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete guide images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'guide-images' AND is_admin(auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_guide_properties_updated_at
  BEFORE UPDATE ON public.guide_properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_guide_sections_updated_at
  BEFORE UPDATE ON public.guide_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for faster lookups
CREATE INDEX idx_guide_sections_property ON public.guide_sections(property_id, sort_order);
CREATE INDEX idx_guide_images_property ON public.guide_images(property_id, section_key);
