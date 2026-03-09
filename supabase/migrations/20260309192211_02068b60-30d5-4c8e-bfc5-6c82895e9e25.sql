
CREATE TABLE public.chatbot_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_message text NOT NULL,
  bot_response text,
  detected_language text DEFAULT 'unknown',
  property_mentioned text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.chatbot_logs ENABLE ROW LEVEL SECURITY;

-- Only backend can insert
CREATE POLICY "Only backend can insert chatbot_logs" ON public.chatbot_logs
  FOR INSERT TO public WITH CHECK (false);

-- Only backend can update  
CREATE POLICY "Only backend can update chatbot_logs" ON public.chatbot_logs
  FOR UPDATE TO public USING (false);

-- Only backend can delete
CREATE POLICY "Only backend can delete chatbot_logs" ON public.chatbot_logs
  FOR DELETE TO public USING (false);

-- No public read
CREATE POLICY "Only backend can read chatbot_logs" ON public.chatbot_logs
  FOR SELECT TO public USING (false);
