# Äkkilähdöt: 1 ja 2 yön näyttösäännöt (siivousaika + Moderin minimiyöt)

## Säännöt

**1 yö**
- Näytetään **vain** kun kyseessä on kahden varauksen välissä oleva **tasan 1 yön aukko** (gap-ikkuna, jonka pituus on 1 yö).
- Ei koskaan näytetä samalle päivälle: jos saapumispäivä on tänään, 1 yön jaksoa ei näytetä (huonetta ei ehditä siivota).
- Muissa tapauksissa (pidempi vapaa jakso, josta asiakas valitsisi 1 yön) 1 yötä ei näytetä lainkaan.

**2 yötä**
- Näytetään kun Moderin **minimiyöt on enintään 2**, tai kun kyseessä on **tasan 2 yön aukko** varausten välissä.
- Jos Moderin minimi on 3 tai enemmän eikä kyseessä ole 2 yön aukko, 2 yön jaksoa ei näytetä.

**Yleistys (koskee kaikkia pituuksia)**
- Aukko-ikkunan (gap) minimiyöt saa ohittaa vain silloin, kun varataan **koko aukko** (esim. 3 yön aukosta 3 yötä). Aukon sisältä lyhyempää jaksoa ei enää näytetä, jos se alittaa Moderin minimin.
- Muuten voimassa on normaali sääntö: yöt ≥ Moderin minimiyöt.

Säännöt vaikuttavat sekä hakutuloksiin että "Esimerkkejä vapaista jaksoista" -kortteihin, jotta esimerkeissä ei näy jaksoja, joita ei oikeasti myydä.

## Tekniset yksityiskohdat

- `src/pages/Akkilahdot.tsx`, `isStayAllowed`:
  - Uusi laskenta `windowNights = deal.windowNights ?? deal.nights`.
  - `nights === 1` → sallittu vain jos `deal.isGap && windowNights === 1 && checkIn > todayIso`.
  - Muuten sallittu jos `nights >= (deal.minNights ?? 1)` **tai** (`deal.isGap && nights === windowNights`).
  - Muut nykyiset ehdot (mahtuu ikkunaan, `noCheckIn`, `noCheckOut`) säilyvät ennallaan.
- `exampleWindows`-memo suodattaa ehdokkaat samalla `isStayAllowed`-funktiolla; jos valittu pituus ei kelpaa, jakso jätetään pois (tai lyhennetään sallittuun pituuteen), jottei esimerkeissä näy kiellettyjä 1–2 yön jaksoja.
- Ei muutoksia taustapalveluun eikä hinnoitteluun.

## Varmistus

- `tsgo --noEmit` puhtaana.
- Playwright `/akkilahdot`: 1 yön haku tälle päivälle → ei tuloksia; 1 yön haku, jossa on 1 yön aukko → tulos näkyy; 2 yön haku kohteessa, jonka minimi on 3 → ei tuloksia ilman 2 yön aukkoa.
