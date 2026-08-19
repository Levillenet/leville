REVOKE ALL ON FUNCTION public.prune_heat_pump_history() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_heat_pump_history() TO service_role;