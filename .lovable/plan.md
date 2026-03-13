

## /levi-sivun konversio-optimointi

### Ongelma
Sivu on puhdas navigointihubi: kaikki linkit ohjaavat sisäisiin oppaisiin. Ainoa varauskehotus on aivan sivun lopussa (rivi 754), ja sekin ohjaa /majoitukset-sivulle eikä suoraan varausmoottoriin. Käyttäjä ei koskaan pääse Moder-varauslinkille asti.

### Ratkaisu: 3 strategista booking-CTA:ta

**1. Hero-osion jälkeen (rivi 455 jälkeen)** — Heti intron alle kompakti varaus-CTA-painike joka ohjaa suoraan Moder-varausmoottorin:
- Iso `Button` linkillä `app.moder.fi/levillenet` (kieliversiot)
- Teksti: "Varaa majoitus" / "Book accommodation"

**2. Quick Links -osion jälkeen (rivi 648 jälkeen)** — Visuaalinen booking-banneri ennen Quiz/Joulu-kortteja:
- Gradient-taustainen `Card` tekstillä "Oletko valmis Levi-lomaan?" + Moder-linkki
- Erottaa informaatiosisällön ja viihteellisen sisällön

**3. Loppupainike korjaus (rivi 754-761)** — Nykyinen "Varaa majoitus" -painike ohjaa /majoitukset-sivulle. Muutetaan osoittamaan suoraan Moder-varausmoottoriin (`a`-tagi `target="_blank"`) samoin kuin PageCTA.

### Tiedosto

| Tiedosto | Muutos |
|---|---|
| `src/pages/Levi.tsx` | Lisää 2 uutta booking-CTA:ta + korjaa loppupainikkeen linkki Moderiin |

Kaikki CTA:t käyttävät samaa `getModerUrl(lang)`-logiikkaa kuin `StickyBookingBar`. Uusi content-avain `bookNow` ja `readyHeading` lisätään olemassaolevaan `content`-objektiin 7 kielelle.

