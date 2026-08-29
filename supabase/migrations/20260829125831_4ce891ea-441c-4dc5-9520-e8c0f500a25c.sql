-- Hide WiFi credentials from public reads of guide_properties using column-level grants
REVOKE SELECT ON public.guide_properties FROM anon;
REVOKE SELECT ON public.guide_properties FROM authenticated;

GRANT SELECT (
  id, slug, name, address, latitude, longitude,
  check_in_time, check_out_time, hero_image_url,
  contact_phone, contact_whatsapp, contact_email,
  max_guests, bedrooms, bathrooms, is_published,
  created_at, updated_at
) ON public.guide_properties TO anon, authenticated;

GRANT ALL ON public.guide_properties TO service_role;