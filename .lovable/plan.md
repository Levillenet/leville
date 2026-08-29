# Saatavuustiedot + revontulitilausten 14 vrk vanheneminen

## 1. Saatavuustiedot tikettejä varten: toimivat edelleen, eivät sisällä asiakastietoja

Tarkistettu koodista:

- `maintenance-bookings` hakee Beds24:stä saapumiset ja lähdöt, mutta lukee vain huoneiston tunnisteen, henkilömäärän ja varauskanavan — ei nimiä, sähköposteja eikä puhelinnumeroita.
- `check-booking-changes` päivittää tiketeille vain lähtö- ja saapumispäivät (`guest_departure_date`, `next_guest_arrival_date`), ei henkilötietoja.
- `beds24-availability` hakee vain vapaat jaksot ja hinnat.

Eli tiketöinnin ja siivousaikataulun tarvitsema tieto "milloin majoitus on vapaa" säilyy täysin ennallaan. Tähän ei tehdä muutoksia.

## 2. Revontulitilaukset vanhenevat 14 vuorokaudessa

Uusi sääntö: tilaus on voimassa 14 vrk tilaushetkestä, minkä jälkeen se päättyy ja sähköposti poistetaan tietokannasta kokonaan.

Toteutus:

- Tietokantaan ajastettu siivous (päivittäin), joka poistaa `aurora_alerts`-riveistä kaikki yli 14 vrk vanhat tilaukset — rivi poistetaan, joten sähköpostia ei jää talteen.
- `check-aurora-alerts` lähettää hälytyksiä vain alle 14 vrk vanhoille tilauksille, jotta vanhentunut tilaus ei saa viestiä siivousajon välissä.
- Tilauslomakkeelle ja vahvistussähköpostiin lisätään selkeä maininta: tilaus on voimassa 14 vuorokautta, minkä jälkeen sähköposti poistetaan automaattisesti. Teksti lisätään kaikille lomakkeen kielille.
- Uudelleentilaus onnistuu milloin tahansa samalla lomakkeella (aloittaa uuden 14 vrk jakson).

## Tekniset yksityiskohdat

- Migraatio: `purge_expired_aurora_alerts()` (security definer, `DELETE FROM public.aurora_alerts WHERE created_at < now() - interval '14 days'`) + `pg_cron`-ajastus kerran vuorokaudessa.
- `supabase/functions/check-aurora-alerts/index.ts`: aktiivisten tilaajien hakuun lisätään `.gte("created_at", now-14d)`.
- `src/components/AuroraAlertSubscribe.tsx`: voimassaoloteksti lomakkeelle (fi/en/sv/de/es/fr).
- `supabase/functions/send-aurora-confirmation/index.ts`: sama maininta vahvistusviestiin.
- Kertaluonteinen siivous: nykyiset yli 14 vrk vanhat tilaukset poistetaan heti ajastuksen käyttöönoton yhteydessä.
