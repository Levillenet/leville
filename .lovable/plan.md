## Tavoite

Lisätä kolme korkean arvon analytiikkalisäystä, jotka näkyvät sekä admin-UI:ssa että CSV-raportissa:

1. **Viewport-leveys** (uusi sarake page_viewsiin)
2. **Sisääntulosivut** (landing pages — aggregaatti, ei uutta saraketta)
3. **Poistumissivut** (exit pages — aggregaatti, ei uutta saraketta)

Lisäksi varauskonversion seurantaa parannetaan UTM-parametrien avulla (todellinen "varaus toteutui" -vahvistus vaatisi Moder-puolen webhookin — rajataan ulkopuolelle, mainitaan).

## Muutokset

### 1. Tietokanta

Migraatio:
- `ALTER TABLE page_views ADD COLUMN viewport_w INTEGER` (nullable, vanhoilla riveillä tyhjä).
- Indeksi `idx_page_views_session_created` jos sitä ei vielä ole — landing/exit-haku tarvitsee `(session_id, created_at)`.

Landing ja exit eivät vaadi omaa saraketta: ne lasketaan istuntodatasta (first/last row per `session_id`).

### 2. Frontend — `src/components/PageViewTracker.tsx`

- Lisätään `viewport_w: window.innerWidth` jokaiseen `log-page-view`-kutsuun (sekä pageview että event).
- Ei muita muutoksia.

### 3. Edge — `supabase/functions/log-page-view/index.ts`

- Hyväksytään `viewport_w` request bodysta (Zod-validointi, valinnainen int 200–10000).
- Tallennetaan `page_views`-tauluun.

### 4. Edge — `supabase/functions/get-page-view-stats/index.ts`

**CSV**
- Lisätään `viewport_w` sarake header- ja rivirakenteeseen.

**JSON-aggregaatit** (UI:lle)
- `byViewport`: bucket-jaottelu: `<640` (mobile-S), `640–1023` (mobile-L/tablet-S), `1024–1439` (tablet-L/laptop), `≥1440` (desktop).
- `topLandingPages`: ryhmitä rivit `session_id`:n mukaan, ota kunkin istunnon ensimmäinen pageview-polku, laske top 15.
- `topExitPages`: vastaavasti viimeinen pageview-polku per istunto, top 15.
- Suoritetaan vain riveille joilla on `session_id`.

### 5. UI — `src/components/admin/PageViewsAdmin.tsx`

Lisätään kolme uutta korttia olemassa olevien jälkeen:

- **"Sisääntulosivut"** — top 15 sivua joilta istunnot alkavat (taulukko, polku + count + %)
- **"Poistumissivut"** — top 15 sivua joilta istunnot päättyvät (taulukko, polku + count + %)
- **"Näytön leveys"** — BarChart 4 bucketilla, mobiili/tabletti/laptop/desktop-jaottelu

### 6. CSV REPORT_DESCRIPTION päivitys

- Lisätään `viewport_w` sarakkeen kuvaus (selainikkunan leveys pikseleinä, hyödyllinen responsiivisuusongelmien jäljitykseen).
- Lisätään uusi osio **SISÄÄNTULO- JA POISTUMISSIVUT**: selitetään että nämä lasketaan CSV-datasta `session_id`-ryhmittelyllä (eivät erillinen sarake), ja että UI näyttää ne valmiiksi aggregoituna.

### 7. Varauskonversio — kevyt UTM-vahvistus

- Käydään läpi keskeiset Moder-linkit (BookingStickyBar, hero-widget, page-CTA:t) ja lisätään niihin `?utm_source=leville-direct&utm_medium=<event_type>&utm_content=<source_path>` -parametrit, JOS niitä ei vielä ole. Tämä mahdollistaa Moder/GA-puolella konversion attribuution.
- **Rajaus**: todellinen "varaus syntyi" -takaisinkutsu vaatisi Moder-webhookin tai pixel-pingauksen Moder-puolelta. Tämä ei kuulu tähän iteraatioon — mainitaan käyttäjälle jatkokehityskohteena.

## Tekninen huomio

- Kaikki uudet datapisteet ovat anonyymeja eikä riko evästeetöntä linjaa.
- Vanhoissa riveissä `viewport_w` on `NULL`; UI näyttää bucketissa "Tuntematon".
- Landing/exit lasketaan vain rivieiltä joissa `session_id` on olemassa (vanhat 13.3.2026 edeltävät rivit jäävät pois — sama rajaus kuin nykyisissä istuntomittareissa).

## Vaikutus

- 1 schema-migraatio, 4 koodimuutosta (tracker, 2 edge funktiota, admin UI), 1 dokumentaatiopäivitys.
- CSV:hen yksi uusi sarake; UI:hin kolme uutta korttia.
- Ei rikkovia muutoksia olemassa olevaan dataan.
