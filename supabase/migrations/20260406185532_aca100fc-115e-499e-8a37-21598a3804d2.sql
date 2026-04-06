ALTER TABLE public.ticket_email_log 
ADD COLUMN scheduled_for timestamptz DEFAULT NULL,
ADD COLUMN email_type text DEFAULT 'creation';

COMMENT ON COLUMN public.ticket_email_log.scheduled_for IS 'When this email should be sent. NULL = already sent.';
COMMENT ON COLUMN public.ticket_email_log.email_type IS 'Type: creation, reminder, scheduled_reminder, recurring_pending';