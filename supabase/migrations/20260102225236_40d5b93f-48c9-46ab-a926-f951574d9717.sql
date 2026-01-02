-- Create table for property settings (cleaning fees, marketing names, discounts)
CREATE TABLE public.property_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id text NOT NULL UNIQUE,
  marketing_name text,
  cleaning_fee numeric DEFAULT 0,
  discount_1_night numeric DEFAULT 0,
  discount_2_nights numeric DEFAULT 0,
  discount_3_plus_nights numeric DEFAULT 0,
  show_discount boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create table for period-specific settings (ski passes, special offers, custom discounts)
CREATE TABLE public.period_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  has_ski_pass boolean DEFAULT false,
  has_special_offer boolean DEFAULT false,
  custom_discount numeric DEFAULT 0,
  show_discount boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(property_id, check_in, check_out)
);

-- Create table for global ski pass capacity settings
CREATE TABLE public.ski_pass_capacity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  allocated_passes integer DEFAULT 0,
  max_passes integer DEFAULT 4,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.property_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.period_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ski_pass_capacity ENABLE ROW LEVEL SECURITY;

-- Public read access for frontend
CREATE POLICY "Anyone can read property settings" ON public.property_settings
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read period settings" ON public.period_settings
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read ski pass capacity" ON public.ski_pass_capacity
  FOR SELECT USING (true);

-- Only backend can write (admin functions use service role)
CREATE POLICY "Only backend can insert property settings" ON public.property_settings
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Only backend can update property settings" ON public.property_settings
  FOR UPDATE USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete property settings" ON public.property_settings
  FOR DELETE USING (false);

CREATE POLICY "Only backend can insert period settings" ON public.period_settings
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Only backend can update period settings" ON public.period_settings
  FOR UPDATE USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete period settings" ON public.period_settings
  FOR DELETE USING (false);

CREATE POLICY "Only backend can insert ski pass capacity" ON public.ski_pass_capacity
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Only backend can update ski pass capacity" ON public.ski_pass_capacity
  FOR UPDATE USING (false) WITH CHECK (false);

CREATE POLICY "Only backend can delete ski pass capacity" ON public.ski_pass_capacity
  FOR DELETE USING (false);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_property_settings_updated_at
  BEFORE UPDATE ON public.property_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_period_settings_updated_at
  BEFORE UPDATE ON public.period_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ski_pass_capacity_updated_at
  BEFORE UPDATE ON public.ski_pass_capacity
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();