-- Create beds24_cache table for caching API responses
CREATE TABLE public.beds24_cache (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.beds24_cache ENABLE ROW LEVEL SECURITY;

-- Public read access for edge function to check cache
CREATE POLICY "Anyone can read cache"
ON public.beds24_cache
FOR SELECT
USING (true);

-- No public insert/update - handled by service role in edge function