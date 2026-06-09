## Tavoite

Lisätään `InlineBookingLink`-tipit kovaliikenteisimmille sivuille (Lumitilanne/Snow Report ja Revontulet-sivut), joilta ne nykyisellään puuttuvat.

## Uusi intent: `auroraStay`

Lisätään `src/components/InlineBookingLink.tsx`-presetteihin uusi `auroraStay`-intent — **ei** lupaa että revontulet näkyvät terassilta, vaan ohjaa pimeään paikkaan kävelymatkan päähän:

- **FI:** "Vinkki: majoituksistamme pienen kävelymatkan päässä on pimeitä paikkoja, joista revontulia bongaa parhaiten —" → "katso majoitukset Levillä" → `/majoitukset` 🌌
- **EN:** "Tip: a short walk from our apartments you'll find dark spots where the aurora shows up best —" → "see accommodations in Levi" → `/en/accommodations` 🌌

## Mihin sivuihin lisätään

### Lumitilanne / Snow Report
- `src/pages/Latuinfo.tsx` (FI lumitilanne & latuinfo)
- `src/pages/guide/LeviSnowReport.tsx` (EN snow report)

Tipit: `trackside` + `glacierPrime` + `directNoFees`.

### Revontulet (FI + EN)
- `src/pages/Revontulet.tsx` (FI revontulipääsivu)
- `src/pages/guide/NorthernLightsSeasonLevi.tsx`
- `src/pages/guide/NorthernLightsForecastLevi.tsx`
- `src/pages/guide/BestTimeNorthernLightsLevi.tsx`
- `src/pages/guide/WhereToSeeNorthernLightsLevi.tsx`
- `src/pages/guide/NorthernLightsPhotographyLevi.tsx`

Tipit: `auroraStay` + `stayCentre` (tai `glacierPrime` riippuen kontekstista). `lang={lang}` jokaisessa.

## Sijoittelu

- 1–2 tippiä per sivu, sijoitettuna johdantotekstin jälkeen ennen ensimmäistä isoa osio-otsikkoa — sama kuvio kuin aiemmin tehdyillä opassivuilla.
- Ei kosketa olemassa olevia CTA-kortteja ("Browse accommodations" -korttia ei poisteta).

## Mitä EI muuteta

- Ei muuteta JSON-LD:tä, breadcrumbeja, meta-arvoja, hreflang-asetuksia tai kuvia.
- Ei luvata revontulien näkyvän terassilta missään copy-tekstissä.
- Ei kosketa hintalupauksia (price parity).
- Ei uusia komponentteja, ei tyylimuutoksia.

Toteutus: 1 preset-lisäys `InlineBookingLink.tsx`:ään + 8 sivun edit.