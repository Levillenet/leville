-- Lock down internal pricing/discount configuration from direct public data-API reads.
DROP POLICY IF EXISTS "Anyone can read period settings" ON public.period_settings;
DROP POLICY IF EXISTS "Anyone can read property settings" ON public.property_settings;

CREATE POLICY "Admins can read period settings"
  ON public.period_settings FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can read property settings"
  ON public.property_settings FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

REVOKE ALL ON public.period_settings FROM anon;
REVOKE ALL ON public.property_settings FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.period_settings FROM authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.property_settings FROM authenticated;
GRANT SELECT ON public.period_settings TO authenticated;
GRANT SELECT ON public.property_settings TO authenticated;
GRANT ALL ON public.period_settings TO service_role;
GRANT ALL ON public.property_settings TO service_role;

-- Internal trigger helper should not be callable by site visitors or signed-in users.
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
