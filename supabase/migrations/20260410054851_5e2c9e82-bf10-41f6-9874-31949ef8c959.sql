-- Add per-apartment guest schedule columns
ALTER TABLE public.ticket_apartments
  ADD COLUMN IF NOT EXISTS guest_departure_date date,
  ADD COLUMN IF NOT EXISTS next_guest_arrival_date date;

-- Add next recurrence timestamp to tickets
ALTER TABLE public.tickets
  ADD COLUMN IF NOT EXISTS next_recurrence_at timestamptz;