
# Tiketöinnin sähköpostijärjestelmä

## 1. manage-tickets Edge Function – sähköposti tiketin luonnissa
- Uusi `send_ticket_email` action:
  - Hakee `apartment_maintenance` → `contact_email_override` tai `maintenance_companies.email`
  - Lähettää sähköpostin Resendillä (RESEND_API_KEY jo konfiguroitu)
  - Kirjaa tuloksen `ticket_email_log`-tauluun
  - Palauttaa varoituksen jos sähköpostia ei löydy
- `create_ticket` action kutsuu `send_ticket_email` kun `send_email = true`

## 2. ticket-reminders Edge Function – Priority 2 muistutukset
- Uusi cron-ajettu Edge Function (06:50 ja 17:50)
- Hakee avoimet Priority 2 tiketit
- Jokaiselle: tarkistaa Beds24-saatavuus (tyhjät yöt 14pv sisällä)
- Lähettää muistutuksen jos:
  - Tyhjä yö TÄNÄÄN → 07:00 aamulla
  - Tyhjä yö HUOMENNA → 18:00 illalla
- Kirjaa loki `ticket_email_log`-tauluun
- `get_next_empty_night` action palauttaa seuraavan tyhjän yön tiedot

## 3. TicketAdmin.tsx – UI-päivitykset
- Tiketin luontidialogi: varoitus jos sähköpostia ei löydy
- Priority 2 tikettien detail-näkymä:
  - "Seuraava tyhjä yö: {pvm}" (Beds24-data)
  - Ajastetun muistutuksen aika
  - "Lähetä muistutus nyt" -nappi
- Sähköpostilokin parannukset (muistutus vs. alkuperäinen)

## 4. Cron-ajastus (supabase insert)
- 06:50 ja 17:50 Helsinki-aikaa
- Kutsuu ticket-reminders Edge Functionia

## Tekniset huomiot
- RESEND_API_KEY on jo konfiguroitu
- Beds24 API käytetään olemassa olevan integraation kautta
- Sähköpostit suomeksi
- config.toml: lisätään manage-tickets ja ticket-reminders verify_jwt = false
