# Palauta per-komponenttinen varauskonversioseuranta

## Tavoite
`PageViewTracker.tsx` kirjaa tällä hetkellä kaikki `app.moder.fi`-linkit yhtenä "booking-link"-tapahtumana. Tämä korjaus erottelee yläpalkin, etusivun nosto-osan, sivun CTA-painikkeen ja alareunan kiinnitetyn palkin omiksi konversiotapahtumikseen `data-booking-source`-attribuutin avulla.

## Muutokset

### 1. Komponenttien data-booking-source -attribuutit
Lisätään seuraaviin komponentteihin `data-booking-source` attribuutti `app.moder.fi`-linkkiin:
- `src/components/PageCTA.tsx` → `data-booking-source="page-cta"`
- `src/components/StickyBookingBar.tsx` → `data-booking-source="sticky-bar"`
- `src/components/Header.tsx` → `data-booking-source="header"`
- `src/components/Features.tsx` → `data-booking-source="features"`

### 2. PageViewTracker outbound click handler
Päivitetään `src/components/PageViewTracker.tsx` lukuohjauslogiikka:
- Kun klikattu anchor vie `app.moder.fi`, luetaan `data-booking-source` attribuutti.
- Reititetään tapahtuma:
  - `"page-cta"` → `/event/booking-page-cta`
  - `"sticky-bar"` → `/event/booking-sticky-bar`
  - `"header"` → `/event/booking-header`
  - `"features"` → `/event/booking-features`
  - muu / puuttuva → `/event/booking-link`
- `.moder-bar__search-button`-haara säilytetään ennallaan (`/event/booking-search-widget`).
- Muu logiikka `PageViewTracker`issä ei muutu.

### 3. Admin-näkymän päivitys
Päivitetään `src/components/admin/PageViewsAdmin.tsx`:
- Lisätään `EVENT_LABELS`:
  - `/event/booking-header`: "Yläpalkin varauslinkki"
  - `/event/booking-features`: "Etusivun nostot"
- Lisätään `allConversionTypes`-taulukkoon kaksi uutta tapahtumaa.
- Lisätään vastaavat SummaryCards-kortit näkymään.

## Rajaus
- Ei muuteta tekstisisältöä, tyylejä tai layouttia.
- Ei muuteta muita `PageViewTracker`in osia.
