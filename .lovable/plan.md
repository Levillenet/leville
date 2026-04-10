

# Plan: Aseta cron-ajastukset varaustilanteen tarkistukseen ja muistutuksiin

## Nykytilanne
- `check-booking-changes` ja `ticket-reminders` Edge Functionit ovat valmiit mutta niille ei ole asetettu cron-ajoa → ne eivät toimi automaattisesti.

## Muutokset

### 1. Lisää `check-booking-changes` config.toml:iin
- `verify_jwt = false` jotta cron voi kutsua sitä

### 2. Aseta cron-ajastukset (SQL insert, ei migraatio)
- **`check-booking-changes`**: Joka tunti klo 8–22 Suomen aikaa (`0 5-19 * * *` UTC) — tarkistaa varausmuutokset
- **`ticket-reminders`**: Joka tunti (`0 * * * *`) — hoitaa muistutukset ja toistuvien tikettien luonnin

### 3. Varmista pg_cron ja pg_net extensionit
- Tarvitaan cron-kutsujen tekemiseen

## Tulos
- Varaustilanteen muutokset tarkistetaan **kerran tunnissa** klo 8–22
- Muistutukset ja toistuvat tiketit käsitellään **kerran tunnissa** ympäri vuorokauden

### Tiedostot
| Tiedosto | Muutos |
|---|---|
| `supabase/config.toml` | Lisää `check-booking-changes` verify_jwt = false |
| SQL (insert) | Cron-ajastukset molemmille funktioille |

