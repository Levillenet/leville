

# Tiketin "Merkitse tehdyksi" -linkki sähköpostissa + admin-nappi

## Yhteenveto

Kaksi muutosta:
1. **Admin UI**: Lisätään selkeä "✅ Merkitse tehdyksi" -nappi tiketin yksityisnäkymään (Select-pudotusvalikon lisäksi)
2. **Sähköposti**: Lisätään tiketin sähköposteihin "Merkitse tehdyksi" -linkki/nappi, jota painamalla huoltoyhtiö voi ratkaista tiketin ilman kirjautumista. Tiketille tallentuu tieto kuka ratkaisi (admin vai suorittaja sähköpostista).

## Tekniset muutokset

### 1. Tietokantamigraatio
- Lisätään `tickets`-tauluun:
  - `resolved_at` (timestamptz, nullable) – ratkaisuhetki
  - `resolved_by` (text, nullable) – "admin" tai "email_link"
  - `resolve_token` (text, unique, default `gen_random_uuid()`) – salainen token sähköpostilinkkiä varten

### 2. Uusi Edge Function: `resolve-ticket-public`
- Julkinen endpoint (`verify_jwt = false`)
- Vastaanottaa `token`-parametrin (GET-pyyntö)
- Etsii tiketin tokenilla, tarkistaa ettei jo ratkaistu
- Päivittää: `status = 'resolved'`, `resolved_at = now()`, `resolved_by = 'email_link'`
- Kirjaa historian: `changed_by: "suorittaja (sähköposti)"`
- Palauttaa yksinkertaisen HTML-sivun: "Tiketti merkitty tehdyksi ✅"

### 3. Sähköpostipohja (`manage-tickets/index.ts`)
- `doSendEmail`-funktiossa: haetaan/generoidaan tiketin `resolve_token`
- Lisätään sähköpostin HTML-pohjaan vihreä nappi: **"✅ Merkitse tehdyksi"**
- Linkki osoittaa: `https://jcvxklzcxngctyqmknax.supabase.co/functions/v1/resolve-ticket-public?token=XYZ`

### 4. Admin UI (`TicketAdmin.tsx`)
- Lisätään tiketin yksityisnäkymään selkeä **"✅ Merkitse tehdyksi"** -nappi (kun tila ei ole "resolved")
- Kun admin painaa nappia: päivitetään `resolved_by = "admin"`, `resolved_at = now()`
- Näytetään ratkaisun jälkeen: "Ratkaisija: Admin" tai "Ratkaisija: Suorittaja (sähköpostilinkki)" + aikaleima

### 5. Config (`supabase/config.toml`)
- Lisätään `[functions.resolve-ticket-public]` ja `verify_jwt = false`

## Tiedostot

| Tiedosto | Muutos |
|---|---|
| Migraatio (SQL) | `resolved_at`, `resolved_by`, `resolve_token` sarakkeet |
| `supabase/functions/resolve-ticket-public/index.ts` | Uusi julkinen endpoint |
| `supabase/functions/manage-tickets/index.ts` | Resolve-token + sähköpostin "Merkitse tehdyksi" -nappi |
| `src/components/admin/TicketAdmin.tsx` | "Merkitse tehdyksi" -nappi + ratkaisijan tiedot |
| `supabase/config.toml` | Uusi funktio-konfiguraatio |

