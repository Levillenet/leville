-- Auto-vastaajan laajennukset: aikataulutus, drafts-hyväksyntä, oppiminen

-- 1) Settings: lisää aikaikkunat ja whitelist-aiheet
ALTER TABLE public.autoresponder_settings
  ADD COLUMN IF NOT EXISTS auto_send_hours_start time NOT NULL DEFAULT '22:00',
  ADD COLUMN IF NOT EXISTS auto_send_hours_end time NOT NULL DEFAULT '07:00',
  ADD COLUMN IF NOT EXISTS auto_send_topics text[] NOT NULL DEFAULT ARRAY['sauna','wifi','checkin','checkout']::text[],
  ADD COLUMN IF NOT EXISTS always_require_approval boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS away_subject jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS away_body jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS away_send_outside_topics boolean NOT NULL DEFAULT true;

-- Seed reasonable away message defaults if empty
UPDATE public.autoresponder_settings
SET 
  away_subject = COALESCE(NULLIF(away_subject, '{}'::jsonb), '{
    "fi":"Kiitos viestistäsi – olemme yhteydessä pian",
    "en":"Thanks for your message – we will be in touch soon",
    "sv":"Tack för ditt meddelande – vi återkommer snart",
    "de":"Danke für Ihre Nachricht – wir melden uns bald"
  }'::jsonb),
  away_body = COALESCE(NULLIF(away_body, '{}'::jsonb), '{
    "fi":"Hei,\n\nKiitos viestistäsi! Tämä on automaattinen poissaolovastaus. Tiimimme käsittelee viestisi seuraavan toimistoaikana (ma–pe 9–17 EET).\n\nKiireellisissä asioissa (vesivuoto, tulipalo, ei lämpöä talvella) soita huoltokumppanillemme: +358 44 13 13 13.\n\nYstävällisin terveisin,\nLeville-asiakaspalvelu",
    "en":"Hello,\n\nThanks for your message! This is an automated out-of-office reply. Our team will get back to you during office hours (Mon–Fri 9–17 EET).\n\nFor critical emergencies (water leak, fire, no heat in winter) please call our maintenance partner at +358 44 13 13 13.\n\nKind regards,\nLeville guest support",
    "sv":"Hej,\n\nTack för ditt meddelande! Detta är ett automatiskt frånvarosvar. Vårt team återkommer under kontorstid (mån–fre 9–17 EET).\n\nVid akuta nödfall (vattenläcka, brand, ingen värme på vintern) ring vår underhållspartner: +358 44 13 13 13.\n\nVänliga hälsningar,\nLeville gästsupport",
    "de":"Hallo,\n\nVielen Dank für Ihre Nachricht! Dies ist eine automatische Abwesenheitsantwort. Unser Team meldet sich während der Bürozeiten (Mo–Fr 9–17 EET).\n\nBei kritischen Notfällen (Wasserschaden, Feuer, keine Heizung im Winter) rufen Sie bitte unseren Wartungspartner an: +358 44 13 13 13.\n\nFreundliche Grüße,\nLeville Gästesupport"
  }'::jsonb)
WHERE id = 1;

-- 2) Drafts table: viestit jotka odottavat ihmisen hyväksyntää tai jotka on jo lähetetty/hylätty
CREATE TABLE IF NOT EXISTS public.autoresponder_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gmail_message_id text NOT NULL UNIQUE,
  gmail_thread_id text,
  in_reply_to text,
  references_header text,
  from_email text NOT NULL,
  from_domain text NOT NULL,
  from_name text,
  incoming_subject text,
  incoming_body text,
  detected_topic text,
  detected_language text,
  matched_rule_id uuid,
  matched_rule_name text,
  ai_subject text,
  ai_body text,
  edited_subject text,
  edited_body text,
  status text NOT NULL DEFAULT 'pending', -- pending | approved_sent | edited_sent | discarded | auto_sent | auto_away_sent | error
  was_edited boolean NOT NULL DEFAULT false,
  decided_by text,
  decided_at timestamptz,
  sent_at timestamptz,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.autoresponder_drafts ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_ar_drafts_status_created ON public.autoresponder_drafts(status, created_at DESC);

CREATE TRIGGER ar_drafts_updated_at
BEFORE UPDATE ON public.autoresponder_drafts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3) Learned responses: muokatut/hyväksytyt vastaukset jotka syötetään AI:lle few-shotina
CREATE TABLE IF NOT EXISTS public.autoresponder_learned (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text,
  language text NOT NULL DEFAULT 'en',
  source_subject text,
  source_body text,
  approved_subject text NOT NULL,
  approved_body text NOT NULL,
  was_edited boolean NOT NULL DEFAULT false,
  use_count integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.autoresponder_learned ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_ar_learned_topic_lang ON public.autoresponder_learned(topic, language, is_active);

CREATE TRIGGER ar_learned_updated_at
BEFORE UPDATE ON public.autoresponder_learned
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4) RLS: vain backend, hallinta tehdään palvelinpuolen edge-functioilla service-role-avaimella
CREATE POLICY "Only backend manages drafts (no select)" ON public.autoresponder_drafts FOR SELECT USING (false);
CREATE POLICY "Only backend manages drafts (no insert)" ON public.autoresponder_drafts FOR INSERT WITH CHECK (false);
CREATE POLICY "Only backend manages drafts (no update)" ON public.autoresponder_drafts FOR UPDATE USING (false);
CREATE POLICY "Only backend manages drafts (no delete)" ON public.autoresponder_drafts FOR DELETE USING (false);

CREATE POLICY "Only backend manages learned (no select)" ON public.autoresponder_learned FOR SELECT USING (false);
CREATE POLICY "Only backend manages learned (no insert)" ON public.autoresponder_learned FOR INSERT WITH CHECK (false);
CREATE POLICY "Only backend manages learned (no update)" ON public.autoresponder_learned FOR UPDATE USING (false);
CREATE POLICY "Only backend manages learned (no delete)" ON public.autoresponder_learned FOR DELETE USING (false);