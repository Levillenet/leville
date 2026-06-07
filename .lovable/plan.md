# Korjaus: GSC "Soft 404" -ongelma (45 URL:a)

## Diagnoosi

GSC raportoi 45 URL:a Soft 404 -tilassa. Syyt jakautuvat kolmeen ryhmään:

**A. Vääriä/vanhoja slugeja, joille on olemassa oikea sivu** (~22 URL)
Google on indeksoinut vanhoja tai kirjoitusvirheellisiä polkuja, esim.:
- `/sv/guide/basta-tid-norrsken-levi` → oikea `/sv/guide/basta-tiden-norrsken-levi`
- `/de/aktivitaeten/schneemobilsafari-levi` → oikea `/de/aktivitaeten/schneemobil-safari-levi`
- `/nl/activiteiten/sneeuwscootersafari-levi` → oikea `/nl/activiteiten/sneeuwscooter-safari-levi`
- `/nl/gids/skien-in-levi` → oikea `/nl/gids/skieen-in-levi`
- `/nl/gids/noorderlicht-fotografie-levi` → `/nl/gids/noorderlicht-fotograferen-levi`
- `/de/news` → `/de/aktuelles`
- `/fr/hebergement` → `/fr/hebergements`
- `/sv/guide/activities-in-levi`, `/es/guide/activities-in-levi`, `/fr/guide/activities-in-levi`, `/de/guide/seasons-in-levi`, `/es/guide/seasons-in-levi` → kielikohtaiset hub-polut
- `/guide/winter-clothing-guide-levi` → `/guide/how-to-dress-for-winter-in-levi-lapland`
- `/opas/miten-paasee-leville` → `/matka/miten-paasee-leville-helsingista`
- `/guide/levi-vs-yllas-vs-ruka` → `/guide/levi-vs-yllas-vs-ruka-comparison`
- `/guide/christmas-dinner-in-levi` → `/en/guide/christmas-dinner-in-levi`
- `/accommodations/guides` → `/accommodations`

**B. Vanhoja WordPress-aikaisia URL:ja, joille ei vastinetta** (~5 URL)
- `/2020/`, `/hiihtajankuja-5-b-2/`, `/tietoa`, `/opas`, `/latukartta`

**C. Googlen "arvauksia" käännösslugeista** (~18 URL)
Polut, joita Google on luonut vanhasta sisällöstä tai automaattikäännöksistä, eikä niille koskaan luotu sivua. Esim. `/de/ratgeber/nordlichter-levi`, `/es/guia/auroras-boreales-levi`, `/sv/aktiviteter/snoskovandring-levi`, `/de/ratgeber/sauna-levi`, `/nl/gids/sauna-levi`, jne.

**Juurisyy ryhmissä B ja C**: SPA-fallback palauttaa HTTP 200 + `NotFound`-komponentin, joka ei sisällä `noindex`-metatagia. Google luokittelee tämän Soft 404:ksi ja säilyttää URL:t indeksin "discovery"-tilassa.

## Toimenpiteet

### 1. Lisää NotFound-sivulle noindex (kriittinen)
Päivitä `src/pages/NotFound.tsx` käyttämään `react-helmet-async`ia:
- `<meta name="robots" content="noindex, follow" />`
- Vaihda `<title>` muotoon "404 — Sivua ei löytynyt | Leville"
- Aseta canonical osoittamaan `https://leville.net/` (juureen)
- Tämä on yleisin Soft 404 -korjaus SPA:ssa: kerrotaan Googlelle "tämä todella on 404, pudota indeksistä".

### 2. Lisää 301-tyyliset uudelleenohjaukset App.tsx:ään (~22 reittiä)
React Router `<Route>` + `<Navigate to="..." replace />`. Tämä palauttaa selaimelle 200 + oikean kanonisen URL:n, ja Google siirtää URL:n korvautuneeksi.

Lisättävät uudelleenohjaukset:
```
/sv/guide/basta-tid-norrsken-levi          → /sv/guide/basta-tiden-norrsken-levi
/de/aktivitaeten/schneemobilsafari-levi    → /de/aktivitaeten/schneemobil-safari-levi
/nl/activiteiten/sneeuwscootersafari-levi  → /nl/activiteiten/sneeuwscooter-safari-levi
/nl/gids/skien-in-levi                     → /nl/gids/skieen-in-levi
/nl/gids/noorderlicht-fotografie-levi      → /nl/gids/noorderlicht-fotograferen-levi
/de/news                                   → /de/aktuelles
/fr/hebergement                            → /fr/hebergements
/sv/guide/activities-in-levi               → /sv/guide/aktiviteter-i-levi
/es/guide/activities-in-levi               → /es/guia/actividades-en-levi
/fr/guide/activities-in-levi               → /fr/guide/activites-a-levi
/de/guide/seasons-in-levi                  → /de/ratgeber/jahreszeiten-in-levi
/es/guide/seasons-in-levi                  → /es/guia/estaciones-en-levi
/guide/winter-clothing-guide-levi          → /guide/how-to-dress-for-winter-in-levi-lapland
/opas/miten-paasee-leville                 → /matka/miten-paasee-leville-helsingista
/guide/levi-vs-yllas-vs-ruka               → /guide/levi-vs-yllas-vs-ruka-comparison
/guide/christmas-dinner-in-levi            → /en/guide/christmas-dinner-in-levi
/accommodations/guides                     → /accommodations
```

### 3. Loput URL:t (~23 kpl ryhmissä B ja C)
Ei tarvitse erillistä reittiä. Ne osuvat `*`-jokerireitille → uudistettu NotFound näyttää 404-sivun `noindex`-tagilla → Google pudottaa ne seuraavissa indeksointikierroksissa.

### 4. Käyttäjälle ohjeistus
Pyydetään käyttäjää `Validate fix`-painikkeen kautta Search Consolessa kun muutokset on julkaistu, jotta Google priorisoi uudelleentarkistuksen.

## Vaikutus

- Soft 404 -merkinnät katoavat 1–3 viikossa, kun Google indeksoi URL:t uudelleen.
- Vanhojen URL:ien link equity siirtyy nykyisille polkuille uudelleenohjauksen kautta.
- Ei vaikutusta muihin sivuihin tai käyttäjäkokemukseen.

## Ei tämän suunnitelman piirissä

- Lisäkäännösten luominen englanninkielisille sivuille
- Uusi sitemap-rakenne (nykyinen on jo puhdas)
- WordPress-aikaisten kuva-URL:ien siivous (eri ongelma)
