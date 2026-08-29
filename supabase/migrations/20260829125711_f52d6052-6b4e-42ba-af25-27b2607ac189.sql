-- Remove permissive public write policies on guide-images storage
DROP POLICY IF EXISTS "Anyone can upload guide images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update guide images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete guide images" ON storage.objects;

-- Restrict site_settings reads (contains OAuth tokens); backend uses service role
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;

CREATE POLICY "Admins can read site settings"
ON public.site_settings
FOR SELECT
USING (public.is_admin(auth.uid()));

REVOKE SELECT ON public.site_settings FROM anon;
GRANT SELECT ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;