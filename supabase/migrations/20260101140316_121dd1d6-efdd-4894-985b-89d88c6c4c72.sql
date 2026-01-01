-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can subscribe to aurora alerts" ON public.aurora_alerts;

-- Create a proper PERMISSIVE INSERT policy for public subscriptions
CREATE POLICY "Anyone can subscribe to aurora alerts"
ON public.aurora_alerts
FOR INSERT
TO public
WITH CHECK (true);