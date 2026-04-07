
# SMS-lähetys tiketeistä Twilion avulla

## Yhteenveto

Lisätään tiketteihin SMS-ilmoitusmahdollisuus Twilio-connectoria käyttäen. Logiikka peilaa sähköpostilogiikkaa: oletuksena huolto-/siivousyhtiön puhelinnumero, mutta manuaalinen syöttö mahdollinen.

## 1. Twilio-yhteys

Yhdistetään Twilio-connector projektiin `standard_connectors--connect`-työkalulla. Tämä tuo `TWILIO_API_KEY` ja `LOVABLE_API_KEY` käyttöön edge functioneissa.

## 2. Tietokantamuutokset

Lisätään `tickets`-tauluun:
```sql
ALTER TABLE public.tickets ADD COLUMN send_sms boolean DEFAULT false;
ALTER TABLE public.tickets ADD COLUMN phone_override text;
```

## 3. Edge function: `manage-tickets/index.ts`

- Uusi `resolveRecipientPhone`-funktio (peilaa `resolveRecipientEmail`):
  1. `ticket.phone_override` → käytä suoraan
  2. `apartment_maintenance` → yhtiön `phone`-kenttä (filtteröi `assignment_type` mukaan)
- Uusi `sendTicketSms`-funktio:
  - Käyttää Twilio-gatewayta (`https://connector-gateway.lovable.dev/twilio/Messages.json`)
  - Viesti sisältää: kohde, tikettityyppi, kuvaus (lyhennetty SMS-muotoon)
  - Lähettäjänumero = Twilion puhelinnumero (tallennetaan secretiin `TWILIO_FROM_NUMBER`)
- `create_ticket`: jos `send_sms === true`, kutsutaan `sendTicketSms`
- `ticket-reminders/index.ts`: vastaava SMS-tuki muistutuksissa

## 4. UI: `TicketAdmin.tsx`

Tiketin luontilomakkeeseen lisätään sähköpostin rinnalle:

- **"Lähetä SMS-ilmoitus"** -kytkin (Switch)
- **"Puhelinnumero"** -kenttä (`type="text"`):
  - Placeholder näyttää huolto-/siivousyhtiön oletusnumeron (haetaan `resolvePhone`-kutsulla samalla logiikalla kuin email)
  - Käyttäjä voi kirjoittaa minkä tahansa numeron päälle
- `phonePreview`-state peilaa `emailPreview`-statea
- `useEffect` hakee oletusnumeron kun huoneisto/assignment_type valitaan (sama kuin emaililla)

## 5. Puhelinnumeron resolvointi edge functionissa

```
resolveRecipientPhone(supabase, apartmentId, assignmentType):
  1. apartment_maintenance → maintenance_company_id → companies.phone
  2. null jos ei löydy
```

## 6. SMS-viesti

Lyhyt tekstimuoto:
```
Leville.net: Uusi tiketti – [Kohde] – [Otsikko]. [Kuvaus (max 140 merkkiä)]. Katso: leville.net/admin
```

Muistutus:
```
Leville.net: Muistutus – [Kohde] – [Otsikko]. Tyhjä yö lähiaikoina. Katso: leville.net/admin
```

## 7. Twilio-puhelinnumero

Tarvitaan Twilio-numero SMS-lähettäjäksi. Tallennetaan `TWILIO_FROM_NUMBER`-secretiin (esim. `+358...`).

## Muutosten yhteenveto

| Kohde | Muutos |
|---|---|
| Twilio-connector | Yhdistetään projektiin |
| Migraatio (SQL) | `send_sms` + `phone_override` sarakkeet `tickets`-tauluun |
| `manage-tickets/index.ts` | `resolveRecipientPhone`, `sendTicketSms`, SMS-lähetys create/reminder |
| `ticket-reminders/index.ts` | SMS-tuki muistutuksissa |
| `TicketAdmin.tsx` | SMS-kytkin, puhelinnumerokenttä placeholderilla, phonePreview-logiikka |
| Secret | `TWILIO_FROM_NUMBER` |
