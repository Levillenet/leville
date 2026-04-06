-- Add recurrence fields to tickets
ALTER TABLE public.tickets
  ADD COLUMN recurrence_months integer DEFAULT NULL,
  ADD COLUMN recurrence_source_id uuid DEFAULT NULL,
  ADD COLUMN recurrence_note text DEFAULT NULL;

-- Add comment for clarity
COMMENT ON COLUMN public.tickets.recurrence_months IS 'How many months until this ticket repeats after resolution';
COMMENT ON COLUMN public.tickets.recurrence_source_id IS 'ID of the original ticket this was spawned from';
COMMENT ON COLUMN public.tickets.recurrence_note IS 'Description of the recurring task';