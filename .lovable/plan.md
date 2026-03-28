

# CrossCountrySkiingInLevi + TopWinterActivities → DE, SV, FR, ES

## Tilanne
Käännökset, reitit, routeConfig ja sitemap puuttuvat kokonaan. Aiempi toteutus ei tallentunut koodiin.

## Muutokset (7 kohtaa)

### 1. Uusi: `src/pages/guide/crossCountrySkiingTranslations.ts`
Siirretään FI/EN/NL inline-käännökset komponentista + lisätään DE, SV, FR, ES (meta, sections, FAQ, CTA, readNext).

### 2. Uusi: `src/pages/activities/topWinterActivitiesTranslations.ts`
Siirretään FI/EN/NL inline-käännökset + lisätään DE, SV, FR, ES.

### 3. `src/pages/guide/CrossCountrySkiingInLevi.tsx`
Import käännökset erillisestä tiedostosta, päivitä customUrls ja locale-mapit kaikille 7 kielelle.

### 4. `src/pages/activities/TopWinterActivities.tsx`
Import käännökset erillisestä tiedostosta, päivitä hreflangUrls kaikille 7 kielelle.

### 5. `src/App.tsx` — 8 uutta reittiä
| Sivu | DE | SV | FR | ES |
|------|----|----|----|----|
| CrossCountry | `/de/ratgeber/langlauf-in-levi` | `/sv/guide/langdskidakning-i-levi` | `/fr/guide/ski-de-fond-a-levi` | `/es/guia/esqui-de-fondo-en-levi` |
| TopWinter | `/de/aktivitaeten/winteraktivitaeten-levi` | `/sv/aktiviteter/vinteraktiviteter-levi` | `/fr/activites/activites-hiver-levi` | `/es/actividades/actividades-invierno-levi` |

### 6. `src/translations/index.ts` — routeConfig
Päivitetään `crossCountrySkiing` ja `topWinterActivities` lokalisoiduilla poluilla (nykyisin fallback EN).

### 7. `public/sitemap.xml`
8 uutta `<url>`-merkintää täysin hreflang-ristireferensseillä (7 kieltä + x-default).

