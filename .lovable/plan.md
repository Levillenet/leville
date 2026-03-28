

# SkiingInLevi — käännös DE, SV, FR, ES

## Yhteenveto
Lisätään SkiingInLevi-sivulle neljä uutta kieliversiota (saksa, ruotsi, ranska, espanja) käännöksineen, reitteineen ja SEO-asetuksineen. Kielivalitsin toimii oikein, koska `routeConfig` ja `customUrls` päivitetään.

## Reitit

| Kieli | Polku |
|-------|-------|
| DE | `/de/ratgeber/skifahren-in-levi` |
| SV | `/sv/guide/skidakning-i-levi` |
| FR | `/fr/guide/ski-a-levi` |
| ES | `/es/guia/esqui-en-levi` |

## Muutokset tiedostoittain

### 1. `src/pages/guide/SkiingInLevi.tsx`
- Lisätään `translations`-objektiin neljä uutta avainta: `de`, `sv`, `fr`, `es` — sama rakenne kuin `en`/`nl`, käännetty sisältö
- `customUrls`-objektiin lisätään kaikki 4 uutta polkua
- `homeLabels`, `homeLinks`, `leviLinks` -mappeihin lisätään DE/SV/FR/ES-arvot
- `og:locale`-logiikka laajennetaan kattamaan kaikki kielet (`de_DE`, `sv_SE`, `fr_FR`, `es_ES`)

### 2. `src/App.tsx`
- Lisätään 4 uutta `<Route>`-elementtiä kunkin kieliversion kohdalle (DE/SV/FR/ES-osioihin):
  ```
  <Route path="/de/ratgeber/skifahren-in-levi" element={<SkiingInLevi lang="de" />} />
  <Route path="/sv/guide/skidakning-i-levi" element={<SkiingInLevi lang="sv" />} />
  <Route path="/fr/guide/ski-a-levi" element={<SkiingInLevi lang="fr" />} />
  <Route path="/es/guia/esqui-en-levi" element={<SkiingInLevi lang="es" />} />
  ```

### 3. `src/translations/index.ts`
- Päivitetään `skiing`-avain `routeConfig`-objektissa:
  ```
  skiing: {
    fi: "/opas/laskettelu-levi",
    en: "/guide/skiing-in-levi",
    sv: "/sv/guide/skidakning-i-levi",
    de: "/de/ratgeber/skifahren-in-levi",
    es: "/es/guia/esqui-en-levi",
    fr: "/fr/guide/ski-a-levi",
    nl: "/nl/gids/skieen-in-levi"
  }
  ```

### 4. `public/sitemap.xml`
- Lisätään 4 uutta `<url>`-merkintää vastaavilla polkuilla, priority 0.7, changefreq monthly

### 5. Käännössisältö (tiivistelmä)
Jokaiselle kielelle käännetään: meta (title, description, canonical), kaikki osiot (overview, slopes, tips, lifts, passes), FAQ, readNext-linkit (osoittavat kyseisen kielen versioihin), packageDeal, breadcrumb ja CTA. ReadNext-linkit osoittavat kunkin kielen olemassa oleviin sivuihin.

