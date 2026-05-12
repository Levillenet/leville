## Tavoite

CSV-raportti ja sen ihmisluettava kuvaus (REPORT_DESCRIPTION) vastaavat nyt UI-analytiikan loogista tilaa: maa, sivun kieli URL:sta, bottifiltteri ja yhtenäinen booking-link-seuranta.

## Nykytila

- `get-page-view-stats` edge-funktio palauttaa jo `country`-sarakkeen sekä CSV:hen että JSON-aggregaatteihin (lisättiin edellisessä muutoksessa).
- `PageViewTracker` lähettää nyt kaikki rivit `log-page-view`-edge-funktion kautta — IP-pohjainen maa, bottifiltteri, ja `language` tulee URL-prefiksistä (fi/en/sv/de/fr/es/nl).
- `REPORT_DESCRIPTION`-teksti (`src/components/admin/PageViewsAdmin.tsx`, rivit ~64–126) on jäänyt vanhaan tilaan: ei mainitse `country`-saraketta, kuvaa `language`:n vielä selaimen kielenä, eikä mainitse bottifiltteriä.

## Muutokset

### `src/components/admin/PageViewsAdmin.tsx` — `REPORT_DESCRIPTION`

**SARAKKEET-osio**
- Lisätään uusi rivi `country`-sarakkeelle ennen `device_type`:n jälkeistä `language`-riviä:
  - `- country: Kävijän maa (ISO 3166-1 alpha-2 -koodi, esim. "FI", "DE", "SE"). Päätellään IP-osoitteesta palvelinpuolella. Vanhoilla riveillä (ennen ~12.5.2026) tyhjä.`
- Korvataan vanha `language`-kuvaus:
  - **Uusi**: `- language: Sivun kieliversio URL-polusta pääteltynä (esim. /en/... → "en", /sv/... → "sv", muuten "fi"). Kertoo mitä kieliversiota katsottiin, ei selaimen UI-kieltä.`
- Lisätään huomautus `time`-rivin jälkeen tai BOTTILIIKENNE-osana: bottiliikenne suodatetaan pois jo kirjauksessa (Googlebot, crawler-UA, headless, prerender, jne.) eikä näy CSV:ssä.

**TAPAHTUMATYYPIT-osio**
- Päivitetään kohta 5 ("booking-link"):
  - Selvennetään, että kaikki klikkaukset `app.moder.fi`-linkkeihin (paitsi hakuwidget ja sticky bar) tallentuvat yhtenäisesti `booking-link`-tapahtumana globaalin click-handlerin kautta — ei vaadi onClick-handlereita yksittäisillä linkeillä. `referrer` = sivu jolla linkkiä klikattiin.

**MAA-ANALYYSI (uusi osio konversioanalyysin jälkeen)**
- Lyhyt kuvaus: maita voi ryhmitellä `country`-sarakkeen perusteella; vertaa kotimaisen (FI) ja kansainvälisen liikenteen konversioprosentteja, ja vertaa `country` vs `language` ristikkäin nähdäksesi esim. suomalaiset selaavatko englanninkielistä versiota.

### `supabase/functions/get-page-view-stats/index.ts`
- CSV-header ja rivirakenne on jo kohdallaan (`...language,country,session_id,...`). Ei muutoksia.
- Tarkistetaan ettei CSV-jonotusta tarvitse päivittää erikseen — ei tarvitse.

## Vaikutus

- CSV:n datakentät pysyvät samoina (jo päivitetyt).
- Vain ihmisluettava sarakekuvaus + analyysiohjeet päivittyvät, jolloin "Kopioi raportin kuvaus" -nappi antaa LLM:lle/lukijalle ajan tasalla olevan selityksen.
- Ei tietokantamuutoksia, ei muutoksia tracking-logiikkaan.
