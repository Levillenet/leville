-- Auto-responder settings (singleton)
CREATE TABLE IF NOT EXISTS public.autoresponder_settings (
  id INT PRIMARY KEY DEFAULT 1,
  enabled BOOLEAN NOT NULL DEFAULT FALSE,
  mailbox_label TEXT NOT NULL DEFAULT 'INBOX',
  poll_interval_minutes INT NOT NULL DEFAULT 5,
  last_poll_at TIMESTAMPTZ,
  signature_html TEXT NOT NULL DEFAULT '

—
Leville Oy
leville.net · +358 44 13 13 13',
  default_language TEXT NOT NULL DEFAULT 'en',
  test_mode BOOLEAN NOT NULL DEFAULT TRUE,
  test_recipients TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ai_system_prompt TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT autoresponder_settings_singleton CHECK (id = 1)
);

INSERT INTO public.autoresponder_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Auto-responder rules
CREATE TABLE IF NOT EXISTS public.autoresponder_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  priority INT NOT NULL DEFAULT 100,
  match_domain TEXT NOT NULL DEFAULT '*',
  match_keywords TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  active_days INT[] NOT NULL DEFAULT ARRAY[0,1,2,3,4,5,6],
  active_hours_start TIME NOT NULL DEFAULT '00:00',
  active_hours_end TIME NOT NULL DEFAULT '23:59',
  response_mode TEXT NOT NULL DEFAULT 'ai' CHECK (response_mode IN ('template','ai')),
  template_subject JSONB NOT NULL DEFAULT '{}'::jsonb,
  template_body JSONB NOT NULL DEFAULT '{}'::jsonb,
  ai_extra_instructions TEXT,
  cooldown_hours INT NOT NULL DEFAULT 24,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS autoresponder_rules_active_priority_idx
  ON public.autoresponder_rules (is_active, priority);

-- Log of processed messages
CREATE TABLE IF NOT EXISTS public.autoresponder_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gmail_message_id TEXT NOT NULL UNIQUE,
  gmail_thread_id TEXT,
  from_email TEXT NOT NULL,
  from_domain TEXT NOT NULL,
  subject TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  matched_rule_id UUID REFERENCES public.autoresponder_rules(id) ON DELETE SET NULL,
  matched_rule_name TEXT,
  action TEXT NOT NULL,
  reply_subject TEXT,
  reply_body TEXT,
  reply_sent_at TIMESTAMPTZ,
  is_test BOOLEAN NOT NULL DEFAULT FALSE,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS autoresponder_log_from_email_idx ON public.autoresponder_log (from_email, reply_sent_at DESC);
CREATE INDEX IF NOT EXISTS autoresponder_log_created_at_idx ON public.autoresponder_log (created_at DESC);

-- Updated_at triggers
DROP TRIGGER IF EXISTS autoresponder_settings_updated_at ON public.autoresponder_settings;
CREATE TRIGGER autoresponder_settings_updated_at
  BEFORE UPDATE ON public.autoresponder_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS autoresponder_rules_updated_at ON public.autoresponder_rules;
CREATE TRIGGER autoresponder_rules_updated_at
  BEFORE UPDATE ON public.autoresponder_rules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: lock everything down. Edge functions use service role.
ALTER TABLE public.autoresponder_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autoresponder_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autoresponder_log ENABLE ROW LEVEL SECURITY;

-- Seed example rules
INSERT INTO public.autoresponder_rules (name, priority, match_domain, response_mode, ai_extra_instructions, cooldown_hours, active_hours_start, active_hours_end)
VALUES
  ('Booking.com guest auto-confirm', 10, 'guest.booking.com', 'ai',
   'The sender is a Booking.com guest. Confirm we received the message and answer their question concisely with the correct link from the leville.net knowledge base. Always provide a direct answer or link, never ask for clarification.',
   12, '00:00', '23:59'),
  ('Yoajan vastaaja (22-07)', 50, '*', 'ai',
   'Reply that our office is closed for the night and we will respond during business hours (Mon-Fri 9-17 EET). If the question can be answered with a leville.net link (sauna, heating, check-in, wifi), include that direct link so the guest gets help immediately. End by reminding them to call the maintenance company at +358 44 13 13 13 only for critical emergencies (water leak, fire, no heat).',
   24, '22:00', '07:00')
ON CONFLICT DO NOTHING;