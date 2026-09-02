INSERT INTO public.site_settings (id, value)
VALUES ('deals_gap_fill', '{"g1": true, "g2": {"enabled": true, "oneNight": {"enabled": true, "days": 5}}, "g3": {"enabled": true, "twoNights": {"enabled": true, "days": 7}, "oneNight": {"enabled": true, "days": 3}}}'::jsonb)
ON CONFLICT (id) DO NOTHING;