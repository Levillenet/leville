# Suunnitelma: poista käännöspuuttuvat reitit ja hreflang-viittaukset

## Tavoite
Poista 21 reittiä, jotka renderöivät komponentteja kielillä joille niillä ei ole käännöksiä. Komponentti putoaa suomeen ja lähettää suomenkielisen kanonisen tagin, jolloin Google indeksoi sivut suomenkielisen alkuperäisen duplikaatteina.

## Muutokset

### 1. `src/App.tsx` — poista 21 `<Route>`-riviä
Poistettavat reitit (vahvistettu riveillä 788–812):

**SkiingInLevi (4 kpl):**
- `/de/ratgeber/skifahren-in-levi`
- `/sv/guide/skidakning-i-levi`
- `/fr/guide/ski-a-levi`
- `/es/guia/esqui-en-levi`

**LeviWithChildren (4 kpl):**
- `/de/ratgeber/levi-mit-kindern`
- `/sv/guide/levi-med-barn`
- `/fr/guide/levi-avec-enfants`
- `/es/guia/levi-con-ninos`

**RestaurantsAndServices (5 kpl):**
- `/de/ratgeber/restaurants-und-services-levi`
- `/sv/guide/restauranger-och-tjanster-levi`
- `/fr/guide/restaurants-et-services-levi`
- `/es/guia/restaurantes-y-servicios-levi`
- `/nl/gids/restaurants-en-diensten-levi`

**WeatherInLevi (4 kpl):**
- `/de/levi/wetter-in-levi`
- `/sv/levi/vader-i-levi`
- `/fr/levi/meteo-a-levi`
- `/es/levi/clima-en-levi`

**HowToGetToLevi (4 kpl):**
- `/de/reise/anreise-nach-levi`
- `/sv/resa/hur-tar-man-sig-till-levi`
- `/fr/voyage/comment-aller-a-levi`
- `/es/viaje/como-llegar-a-levi`

**Ei kosketa:** `lazy()`-import-lauseita, koska komponentteja käyttävät jäljelle jäävät fi/en/nl-reitit.

### 2. Hreflang-objektien siivous
Poista vain määritellyt kieliavaimet. Ei kosketa muihin objekteihin (breadcrumbs, homeLinks, leviLinks, käännökset, layout).

| Tiedosto | Objekti | Rivit | Poistettavat | Jäljelle jäävät |
|---|---|---|---|---|
| `src/pages/guide/SkiingInLevi.tsx` | `customUrls` | 326–334 | de, sv, fr, es | fi, en, nl |
| `src/pages/guide/LeviWithChildren.tsx` | `hreflangUrls` | 609–617 | de, sv, fr, es | fi, en, nl |
| `src/pages/guide/WeatherInLevi.tsx` | `customUrls` | 473–481 | de, sv, fr, es | fi, en, nl |
| `src/pages/travel/HowToGetToLevi.tsx` | `hreflangUrls` | 536–544 | de, sv, fr, es | fi, en, nl |
| `src/pages/guide/RestaurantsAndServices.tsx` | `hreflangUrls` | 270–277 | de, sv, fr, es | fi, en |

Huomio: `RestaurantsAndServices.tsx`:n `hreflangUrls`-objektissa ei ole `nl`-avainta, joten lopputila on fi + en.

## Validointi
- Ajoitan TypeScript-tarkistuksen (`tsgo` / `tsc --noEmit`) ja tuotantobuildin.
- Tarkistan Playwrightilla, että poistetut polut (esim. `/de/ratgeber/skifahren-in-levi`) eivät enää renderöi sivua ja että fi/en/nl-polut toimivat.
- Raportoin tiedosto- ja rivimuutokset toteutuksen jälkeen.
