-- 1) Index for fast pruning
CREATE INDEX IF NOT EXISTS idx_heat_pump_history_recorded_at
  ON public.heat_pump_history (recorded_at);

-- 2) Retention function
CREATE OR REPLACE FUNCTION public.prune_heat_pump_history()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted integer;
BEGIN
  LOOP
    DELETE FROM public.heat_pump_history
    WHERE ctid IN (
      SELECT ctid FROM public.heat_pump_history
      WHERE recorded_at < now() - interval '90 days'
      LIMIT 20000
    );
    GET DIAGNOSTICS deleted = ROW_COUNT;
    EXIT WHEN deleted = 0;
  END LOOP;
END;
$$;

-- 3) Initial cleanup
SELECT public.prune_heat_pump_history();

-- 4) Daily cleanup job
SELECT cron.unschedule('heat-pump-history-cleanup')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'heat-pump-history-cleanup');

SELECT cron.schedule(
  'heat-pump-history-cleanup',
  '0 3 * * *',
  $$SELECT public.prune_heat_pump_history();$$
);

-- 5) Reduce cron frequency
SELECT cron.alter_job(jobid, schedule := '*/5 * * * *') FROM cron.job WHERE jobname = 'autoresponder-poll-every-min';
SELECT cron.alter_job(jobid, schedule := '*/15 * * * *') FROM cron.job WHERE jobname = 'send-worklist-check';
SELECT cron.alter_job(jobid, schedule := '0 3-17 * * *') FROM cron.job WHERE jobname = 'ticket-reminders-hourly';