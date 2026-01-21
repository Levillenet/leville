-- Create booking_terms table for storing translatable content
CREATE TABLE public.booking_terms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  
  -- Finnish (MASTER language)
  title_fi TEXT NOT NULL,
  content_fi TEXT NOT NULL,
  
  -- Translations
  title_en TEXT,
  content_en TEXT,
  title_sv TEXT,
  content_sv TEXT,
  title_de TEXT,
  content_de TEXT,
  title_es TEXT,
  content_es TEXT,
  title_fr TEXT,
  content_fr TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  translations_updated_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.booking_terms ENABLE ROW LEVEL SECURITY;

-- Anyone can read booking terms (public content)
CREATE POLICY "Anyone can read booking terms"
ON public.booking_terms
FOR SELECT
USING (true);

-- Only backend can modify booking terms
CREATE POLICY "Only backend can insert booking terms"
ON public.booking_terms
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update booking terms"
ON public.booking_terms
FOR UPDATE
USING (false)
WITH CHECK (false);

CREATE POLICY "Only backend can delete booking terms"
ON public.booking_terms
FOR DELETE
USING (false);

-- Create trigger for updated_at
CREATE TRIGGER update_booking_terms_updated_at
BEFORE UPDATE ON public.booking_terms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial content from current Varausehdot page
INSERT INTO public.booking_terms (section_key, sort_order, title_fi, content_fi) VALUES
('general', 1, 'Yleiset ehdot', 'Nämä varausehdot koskevat kaikkia LeVILLE.NET -sivuston kautta tehtyjä majoitusvarauksia. Varauksen tekeminen merkitsee näiden ehtojen hyväksymistä.'),

('booking', 2, 'Varauksen tekeminen', 'Varaus on sitova, kun olet saanut varausvahvistuksen sähköpostiisi. Varauksen yhteydessä maksetaan varausmaksu, joka on 30% kokonaishinnasta. Loppumaksu maksetaan viimeistään 30 päivää ennen majoituksen alkamista. Mikäli varaus tehdään alle 30 päivää ennen majoituksen alkamista, koko summa maksetaan kerralla.'),

('cancellations', 3, 'Peruutukset', 'Peruutus on aina tehtävä kirjallisesti (esimerkiksi sähköpostitse). Peruutusehdot:

• Yli 60 päivää ennen: Varausmaksusta pidätetään 50€ käsittelykuluna
• 30-60 päivää ennen: Varausmaksu pidätetään kokonaan
• Alle 30 päivää ennen: Koko majoituksen hinta veloitetaan
• Saapumatta jättäminen (no-show): Koko hinta veloitetaan

Suosittelemme matkavakuutuksen ottamista peruutusturvan saamiseksi.'),

('keys', 4, 'Avainten luovutus', 'Avaimet noudetaan erikseen ilmoitetusta paikasta. Sisäänkirjautumisaika on klo 16:00 alkaen ja uloskirjautumisaika klo 11:00 mennessä, ellei toisin sovita. Avainten palauttamatta jättämisestä tai katoamisesta veloitetaan 150€.'),

('accommodation', 5, 'Majoittuminen', 'Majoittuja sitoutuu noudattamaan kohteen järjestyssääntöjä ja pitämään huoneiston siistinä. Lemmikkieläimet ovat sallittuja vain erikseen mainituissa kohteissa lisämaksusta. Tupakointi on kielletty kaikissa kohteissamme.'),

('smoking_allergies', 6, 'Tupakointi ja allergiat', 'Kaikki kohteet ovat savuttomia. Tupakointi sisätiloissa johtaa 500€ lisäsiivouskustannukseen. Emme voi taata täysin allergeenivapaita tiloja, vaikka pyrimme huolelliseen siivoukseen.'),

('damages', 7, 'Vahingot', 'Majoittuja on velvollinen ilmoittamaan välittömästi mahdollisista vahingoista tai puutteista. Majoittujan aiheuttamat vahingot korvataan täysimääräisesti. Vakuutamme suosittamaan matkavakuutusta, joka kattaa myös vastuuvahingot.'),

('force_majeure', 8, 'Ylivoimainen este', 'Emme vastaa varaukseen liittyvistä esteistä, jotka johtuvat ylivoimaisesta esteestä (force majeure), kuten luonnonkatastrofeista, sodasta, lakosta tai viranomaismääräyksistä. Tällaisessa tilanteessa pyrimme löytämään vaihtoehtoisen ratkaisun.'),

('guest_count', 9, 'Henkilömäärä', 'Majoittujien määrä ei saa ylittää kohteen ilmoitettua maksimihenkilömäärää. Ylimääräisistä henkilöistä veloitetaan lisämaksu tai varaus voidaan purkaa.'),

('additional_info', 10, 'Lisätiedot', 'Pidätämme oikeuden muutoksiin varausehtoihin. Mahdolliset muutokset eivät koske jo tehtyjä varauksia. Kaikissa majoitukseen liittyvissä kysymyksissä ota yhteyttä asiakaspalveluumme.'),

('price_errors', 11, 'Hintavirheet', 'Pidätämme oikeuden korjata ilmeiset hintavirheet. Jos varaus on tehty virheellisellä hinnalla, otamme yhteyttä ja tarjoamme mahdollisuuden peruuttaa varauksen maksutta tai hyväksyä oikea hinta.'),

('applicable_law', 12, 'Sovellettava laki', 'Näihin ehtoihin sovelletaan Suomen lakia. Mahdolliset erimielisyydet pyritään ratkaisemaan ensisijaisesti neuvottelemalla. Kuluttaja-asioissa voi kääntyä myös kuluttajariitalautakunnan puoleen.');