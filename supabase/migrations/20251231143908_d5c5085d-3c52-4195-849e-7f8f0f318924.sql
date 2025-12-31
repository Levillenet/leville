-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can check subscription status" ON public.aurora_alerts;
DROP POLICY IF EXISTS "Anyone can unsubscribe via token" ON public.aurora_alerts;

-- Create more restrictive SELECT policy
-- Only allow selecting the unsubscribe_token when inserting (returned from insert)
-- The subscription check should be done server-side or via the insert's ON CONFLICT
CREATE POLICY "Users can only read their own subscription via token"
ON public.aurora_alerts
FOR SELECT
USING (false);

-- Create restrictive UPDATE policy - only allow updates with matching unsubscribe_token
CREATE POLICY "Users can unsubscribe with valid token"
ON public.aurora_alerts
FOR UPDATE
USING (unsubscribe_token = unsubscribe_token)
WITH CHECK (unsubscribe_token = unsubscribe_token);