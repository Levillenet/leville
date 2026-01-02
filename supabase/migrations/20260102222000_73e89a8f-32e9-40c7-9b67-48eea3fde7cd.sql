-- Remove public SELECT policy from beds24_cache
DROP POLICY IF EXISTS "Anyone can read cache" ON public.beds24_cache;

-- Create restrictive policy - only service role can access (for edge functions)
-- No authenticated or anon access needed since frontend uses edge function
CREATE POLICY "Only backend can read cache" 
ON public.beds24_cache 
FOR SELECT 
USING (false);

-- Allow service role to INSERT/UPDATE (for edge function caching)
CREATE POLICY "Only backend can insert cache" 
ON public.beds24_cache 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Only backend can update cache" 
ON public.beds24_cache 
FOR UPDATE 
USING (false)
WITH CHECK (false);

-- Note: Service role bypasses RLS, so edge functions still work
-- These policies block direct client access while allowing server-side access