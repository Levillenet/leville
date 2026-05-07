## Tavoite
Viimeistellään "mökit"-näkyvyys SEO/sisällössä: lisätään puuttuva H2, päivitetään footer-kuvaukset 7 kielellä ja muutetaan CTA-napit neljällä sää-/lasketteluoppaan sivulla muotoon "Katso huoneistot ja mökit" / "View apartments & cabins".

## Muutokset

### 1. Majoitukset.tsx — H2-otsikko
Lisätään ennen `accommodations`-grid-osiota (n. rivi 165) uusi H2:
- FI: `"Mökit ja huoneistot Levillä"` + lyhyt johdantokappale
- EN: `"Cabins and apartments in Levi"`
- Muut kielet vastaavasti käännettyinä (sv/de/es/fr/nl)
Tekstit `src/translations/{lang}.ts`-tiedostoihin (uusi kenttä `majoitukset.sectionHeading` + `sectionIntro`).

### 2. Footer.tsx — kuvaukset
Päivitetään `description`-kenttä kaikilla 7 kielellä mainitsemaan sekä huoneistot että mökit:
- FI: `"Laadukkaita huoneistoja ja mökkejä Levin keskustassa. Varaa suoraan meiltä parhaaseen hintaan."`
- EN: `"Quality apartments and cabins in Levi center. Book directly from us for the best price."`
- sv/de/es/fr/nl: vastaava käännös

### 3. CTA-napit neljällä sivulla
Muutetaan nappitekstit:
- `src/pages/guide/weatherInLeviTranslations.ts` — CTA-napin teksti
- `src/pages/guide/skiingInLeviTranslations.ts` — CTA-napin teksti
- `src/pages/guide/crossCountrySkiingTranslations.ts` rivi 60 — `accommodation: "Katso huoneistot ja mökit"`
- `src/pages/guide/LeviSnowReport.tsx` rivi 74 — `button: "Katso huoneistot ja mökit →"`

FI: `"Katso huoneistot ja mökit"` · EN: `"View apartments & cabins"`

## Tekniset huomiot
- En koske muiden sivujen yleisiin "Katso majoitukset" -CTA:ihin (vain nämä neljä, kuten pyydetty).
- Dynaaminen vuosi, canonical-URL:t ja muut SEO-asetukset säilyvät ennallaan.
- Ei uusia reittejä, ei sitemap-muutoksia.

## Tiedostot
- `src/translations/fi.ts`, `en.ts`, `sv.ts`, `de.ts`, `es.ts`, `fr.ts`, `nl.ts`
- `src/pages/Majoitukset.tsx` (renderöi uusi H2)
- `src/components/Footer.tsx`
- `src/pages/guide/weatherInLeviTranslations.ts`
- `src/pages/guide/skiingInLeviTranslations.ts`
- `src/pages/guide/crossCountrySkiingTranslations.ts`
- `src/pages/guide/LeviSnowReport.tsx`