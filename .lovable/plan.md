## Glacier Apartments: korostetaan huippusijaintia, poistetaan "Hullu Poro -alue" -termi

**Fakta:** Glacier Apartments (Ratsastajankuja 2) sijaitsee **Eturinteen Alppikylässä** — vain n. **20 m hiihtoladulta**, n. **150 m päärinteestä** ja kaikki keskustan palvelut askelmatkan päässä. Lähistöllä myös **Hullu Poro -hotelli** ja **Hullu Poro Areena**, mutta aluetta EI kutsuta "Hullu Poro -alueeksi".

### 1. `src/components/InlineBookingLink.tsx`
- Lisätään uusi intent **`glacierPrime`** (FI + EN), emoji 🏔️
  - FI: "Vinkki: vain n. 20 m hiihtoladulta ja n. 150 m päärinteestä, palvelut askelmatkan päässä —" → "katso Glacier Apartments Eturinteen Alppikylässä" → `/kadut/glacier-apartments-levi`
  - EN: vastaava käännös, linkki `/en/accommodations`
- Päivitetään **`trackside`** intent osoittamaan Glacieriin (n. 20 m hiihtoladulta) Hiihtäjänkujan sijaan — säilytetään tip-tyyli.

### 2. `src/data/street-hubs.ts` — Glacier-hubit
**`ratsastajankuja-levi`** ja **`glacier-apartments-levi`**:
- Korvataan kaikki "Hullu Poro -alue" → "**Eturinteen Alppikylä**" (metaDescription, subtitle, intro).
- Päivitetään intro mainitsemaan ensimmäisessä kappaleessa: ~20 m hiihtoladulta, ~150 m päärinteestä, palvelut askelmatkan päässä.
- Glacierin intron loppuun: "Lähistöllä ovat myös Hullu Poro -hotelli ja Hullu Poro Areena" (säilyttää maamerkit ilman aluenimeä).
- Päivitetään `facts`:
  - Poistetaan "Hullu Poro -ravintolaan / n. 100 m" ja "Front Slope -rinteille / n. 250 m"
  - Lisätään "Hiihtoladulle / n. 20 m" ja "Päärinteelle / n. 150 m"

### 3. `public/llms-full.txt` — B4 Glacier-osio
- Otsikko: "Levi Glacier Apartments (Front Slope Alpine Village)" — pois "Hullu Poro area".
- Location-rivi: "Front Slope Alpine Village, Levi centre. ~20 m to cross-country track, ~150 m to main slope, walking distance to all services. Hullu Poro hotel & Hullu Poro Areena nearby."

### 4. Top-guide-sivut — `glacierPrime`-tip lisäys
Yksi `<InlineBookingLink variant="tip" intent="glacierPrime" lang={lang} />` per sivu, intro-kappaleen jälkeen:
- `src/pages/guide/SummerInLevi.tsx` (kesän aktiivisille — ladut & palvelut)
- `src/pages/guide/CrossCountrySkiingInLevi.tsx` (n. 20 m ladulta)
- `src/pages/guide/SkiingInLevi.tsx` (n. 150 m päärinteestä)
- `src/pages/guide/LeviWithChildren.tsx` (tilavat huoneistot + lasten pelihuone)
- `src/pages/guide/RestaurantsAndServices.tsx` (palvelut askelmatkan päässä)

### Ei muutoksia
- `properties.ts` shortDescriptioneihin ei kosketa tässä iteraatiossa (paitsi jos tarkistuksessa löytyy "Hullu Poro -alue"-viittauksia — silloin korvataan "Eturinteen Alppikylä").
- Muut osoitteet (Hiihtäjänkuja, Skimbaajankuja) eivät muutu — Hullu Poro -ravintola mainintana naapurustossa on OK.

### Tekniset huomiot
- SEO/hreflang ei muutu, vain copy ja yksi uusi intent.
- Hinta-paritetti-sääntö säilyy.
- Ei uusia komponentteja.