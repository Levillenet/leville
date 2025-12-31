-- Remove permissive UPDATE policy
DROP POLICY IF EXISTS "Users can unsubscribe with valid token" ON public.aurora_alerts;

-- Create restrictive UPDATE policy - no direct updates allowed
-- All unsubscribe operations go through the edge function
CREATE POLICY "No direct updates allowed"
ON public.aurora_alerts
FOR UPDATE
USING (false)
WITH CHECK (false);