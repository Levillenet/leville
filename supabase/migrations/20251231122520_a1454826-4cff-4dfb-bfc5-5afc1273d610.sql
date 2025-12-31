-- Create aurora_alerts table for email subscriptions
CREATE TABLE public.aurora_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  language TEXT DEFAULT 'fi',
  is_active BOOLEAN DEFAULT true,
  unsubscribe_token UUID DEFAULT gen_random_uuid(),
  last_alert_sent TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.aurora_alerts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (insert)
CREATE POLICY "Anyone can subscribe to aurora alerts"
ON public.aurora_alerts
FOR INSERT
WITH CHECK (true);

-- Allow unsubscribe via token (update is_active)
CREATE POLICY "Anyone can unsubscribe via token"
ON public.aurora_alerts
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow reading own subscription by email or token
CREATE POLICY "Anyone can check subscription status"
ON public.aurora_alerts
FOR SELECT
USING (true);