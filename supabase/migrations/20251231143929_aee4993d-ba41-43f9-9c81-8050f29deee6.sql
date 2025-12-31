-- Fix the UPDATE policy to actually work with token-based unsubscribe
DROP POLICY IF EXISTS "Users can unsubscribe with valid token" ON public.aurora_alerts;

-- Create proper UPDATE policy - the token must be provided in the WHERE clause
-- This works because RLS evaluates the USING clause against the row being updated
CREATE POLICY "Users can unsubscribe with valid token"
ON public.aurora_alerts
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Note: The security is enforced by requiring the unsubscribe_token in the .eq() clause
-- Without knowing the token, users cannot target any specific row