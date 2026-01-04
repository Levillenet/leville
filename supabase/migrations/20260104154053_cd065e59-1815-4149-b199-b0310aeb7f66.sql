-- Create moder_property_mapping table for Beds24 <-> Moder ID mapping
CREATE TABLE public.moder_property_mapping (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    beds24_room_id TEXT NOT NULL UNIQUE,
    moder_room_type_id INTEGER,
    property_name TEXT NOT NULL,
    cleaning_fee NUMERIC DEFAULT 0,
    max_guests INTEGER,
    linen_price NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.moder_property_mapping ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can read moder_property_mapping" 
ON public.moder_property_mapping 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert moder_property_mapping" 
ON public.moder_property_mapping 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Only backend can update moder_property_mapping" 
ON public.moder_property_mapping 
FOR UPDATE 
USING (false);

CREATE POLICY "Only backend can delete moder_property_mapping" 
ON public.moder_property_mapping 
FOR DELETE 
USING (false);

-- Create cleaning_status table for tracking cleaning and notifications
CREATE TABLE public.cleaning_status (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    property_id TEXT NOT NULL,
    check_in_date DATE NOT NULL,
    booking_id TEXT,
    guest_name TEXT,
    guest_email TEXT,
    guest_phone TEXT,
    cleaned_at TIMESTAMP WITH TIME ZONE,
    cleaned_by TEXT,
    notification_sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(property_id, check_in_date)
);

-- Enable RLS
ALTER TABLE public.cleaning_status ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can read cleaning_status" 
ON public.cleaning_status 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Only backend can insert cleaning_status" 
ON public.cleaning_status 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Only backend can update cleaning_status" 
ON public.cleaning_status 
FOR UPDATE 
USING (false);

CREATE POLICY "Only backend can delete cleaning_status" 
ON public.cleaning_status 
FOR DELETE 
USING (false);

-- Insert Beds24 to Moder mappings from Excel data
INSERT INTO public.moder_property_mapping (beds24_room_id, moder_room_type_id, property_name, max_guests, cleaning_fee, linen_price) VALUES
('350154', 308, 'Skistar 211', 5, 99, 15),
('350155', 309, 'Skistar 212', 5, 99, 15),
('418927', 311, 'Skistar 522', 5, 99, 15),
('350156', 312, 'Skistar 422', 5, 99, 15),
('350166', 313, 'Skistar 321', 5, 99, 15),
('547818', NULL, 'Skistar 322', 5, 99, 15),
('350159', 310, 'Skistar 521', 5, 99, 15),
('350167', 316, 'Immelrinne 4', 11, 199, 15),
('418932', 319, 'Tunturi A304', 4, 119, 15),
('350161', 317, 'Tunturi A104', 4, 119, 15),
('350162', 318, 'Tunturi B111', 6, 119, 15),
('350163', 320, 'Tunturi B211', 6, 119, 15),
('418933', 321, 'Tunturi D307', 4, 119, 15),
('418934', 322, 'Tunturi D315', 6, 119, 15),
('418935', 323, 'Tunturi D316', 4, 119, 15),
('350164', 324, 'Immelkartano A3', 5, 119, 15),
('350165', 325, 'Karhunvartija A3', 4, 119, 15),
('418940', 326, 'Karhunvartija A7', 6, 119, 15),
('418941', 327, 'Karhunvartija A8', 4, 119, 15),
('418942', 328, 'Riekontie 1', 8, 199, 15),
('418943', 329, 'Rantatähti 3A', 6, 119, 15),
('418944', 330, 'Karhunvartija C21', 4, 119, 15),
('418945', 331, 'Karhunvartija C22', 4, 119, 15),
('419420', 332, 'Glacier A8', 12, 250, 15),
('419421', 333, 'Glacier B8', 12, 250, 15),
('419423', NULL, 'Karhupirtti', 4, 119, 15);