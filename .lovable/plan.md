

## Laskettelusivujen meta-optimointi ja pakettitarjous-kortti

### Muutokset

**1. SkiingInLevi.tsx — Meta-päivitykset (FI + EN)**
- FI title: `"Laskettelu Levillä 2026 — Rinteet, hissiliput ja majoituspaketit | Leville.net"`
- FI description: `"Levin 43 rinnettä ja 28 hissiä. Kysy tarjous majoitus + hissiliput -paketista suoraan meiltä. Rinnekartta, vaikeustasot ja vinkit laskettelulomalle."`
- EN title: `"Skiing in Levi 2026 — Slopes, Lift Passes & Accommodation Packages | Leville.net"`
- EN description: `"Levi's 43 slopes and 28 lifts. Ask us for a combined accommodation + lift pass package. Slope map, difficulty levels and tips for your ski holiday."`

**2. SkiingInLevi.tsx — Pakettitarjous-kortti**
- Lisätään uusi callout-kortti hero-osion ja ensimmäisen kuvan väliin (rivin 363 jälkeen)
- Käytetään `glass-card border-primary` -tyyliä erottuvuuden vuoksi
- FI/EN-käännökset translations-objektiin
- Kortti sisältää otsikon (🎿-emojilla), tekstikappaleen ja CTA-napin
- Nappi linkittää `/yhteystiedot` (FI) tai `/en/contact` (EN)

**3. CrossCountrySkiingInLevi.tsx — Meta-päivitykset (FI + EN)**
- FI title: `"Hiihtoladut Levillä 2026 — Reitit, latukartta ja majoitus latujen vieressä | Leville.net"`
- EN title: `"Cross-Country Skiing in Levi 2026 — Trails, Map & Accommodation Near Tracks | Leville.net"`

### Muutettavat tiedostot
1. `src/pages/guide/SkiingInLevi.tsx` — meta + uusi käännösavain `packageDeal` + callout-kortti JSX:ään
2. `src/pages/guide/CrossCountrySkiingInLevi.tsx` — meta-titlet

