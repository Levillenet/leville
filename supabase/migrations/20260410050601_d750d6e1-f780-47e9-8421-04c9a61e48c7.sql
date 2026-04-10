-- Add 'changeover' to ticket_type enum
ALTER TYPE public.ticket_type ADD VALUE IF NOT EXISTS 'changeover';

-- Add departure and arrival date columns
ALTER TABLE public.tickets ADD COLUMN IF NOT EXISTS guest_departure_date date;
ALTER TABLE public.tickets ADD COLUMN IF NOT EXISTS next_guest_arrival_date date;