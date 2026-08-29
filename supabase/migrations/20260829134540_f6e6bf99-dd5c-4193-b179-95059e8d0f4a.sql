CREATE OR REPLACE FUNCTION public.purge_expired_aurora_alerts()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.aurora_alerts
  WHERE created_at < now() - interval '14 days';
$$;

SELECT cron.schedule(
  'purge-expired-aurora-alerts',
  '30 3 * * *',
  $$ SELECT public.purge_expired_aurora_alerts(); $$
);

DELETE FROM public.aurora_alerts WHERE created_at < now() - interval '14 days';