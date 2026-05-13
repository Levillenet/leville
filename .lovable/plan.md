## Tilanne

Google Search Console on nyt kytketty ja **leville.net on jo verifioitu** (sc-domain-tasolla, omistajatason oikeudet). API toimii — testihaku palautti viimeiseltä 90 päivältä mm. `saatieto-levilta` 1 023 klikkiä / 19 356 näyttöä.

## Tärkeä rajoitus: levi.fi-linkin klikkejä ei näy GSC API:sta

Search Console -**API** antaa vain **orgaaniset Google-hakutulokset** (klikit, näytöt, CTR, positio per haku/sivu/maa). Se ei kerro mitään muiden sivustojen viittausliikenteestä. **Ulkoiset linkit (levi.fi → leville.net) näkyvät GSC:n "Linkit"-osiossa vain web-käyttöliittymässä**, eivät API:n kautta.

Eli levi.fi:n tuomat **klikit** (oikeat kävijät) saa selville vain:
- (a) leville.netin omasta analytiikasta `referrer = levi.fi` — tämä teillä on jo `page_views`-taulussa, ei tarvitse uutta integraatiota
- (b) GSC UI:sta (Search Console → Links → Top linking sites → levi.fi → top linked pages) — ei automatisoitavissa API:lla

Search Console -integraation aito hyöty on **orgaanisen näkyvyyden** seuranta: paljonko Google näyttää teitä, mihin hakuihin, missä positioissa, ja kuinka trendi liikkuu.

## Mitä rakennetaan

### 1. Admin-välilehti "Search Console" (`/admin`)

Uusi komponentti `src/components/admin/SearchConsoleAdmin.tsx`, lisätään olemassa olevaan adminin tabbinavigaatioon (samaan tyyliin kuin `PageViewsAdmin`).

Aikavälivalitsin: 7 / 28 / 90 päivää (oletus 28). Filtteri: kieli (kaikki / fi / en / de / sv / fr / es / nl) johdettuna URL-prefiksistä.

Näkymät (kortteja):
- **Yhteenveto**: kokonaisklikit, kokonaisnäytöt, keskimääräinen CTR, keskimääräinen positio + edellisen vastaavan jakson vertailu (Δ%)
- **Trendi**: päivätason aikasarja klikit + näytöt (Recharts LineChart)
- **Top haut** (top 25): haku, klikit, näytöt, CTR, positio
- **Top sivut** (top 25): URL, klikit, näytöt, CTR, positio
- **Top maat** (top 15)
- **Top laitteet**: mobile / desktop / tablet -jakauma

CSV-export samaan tyyliin kuin nykyisessä PageViews-raportissa (otsikko + REPORT_DESCRIPTION + datarivit), jotta data sopii LLM-analyysiin.

### 2. Edge function `get-search-console-stats`

Uusi `supabase/functions/get-search-console-stats/index.ts`:
- Suojataan adminin salasanalla (sama `ADMIN_PASSWORD`-malli kuin `get-page-view-stats`)
- Validoi inputit Zodilla (startDate, endDate, dimension)
- Kutsuu gateway-URL:ää `https://connector-gateway.lovable.dev/google_search_console/webmasters/v3/sites/sc-domain%3Aleville.net/searchAnalytics/query` kahdella headerilla (`Authorization: Bearer LOVABLE_API_KEY`, `X-Connection-Api-Key: GOOGLE_SEARCH_CONSOLE_API_KEY`)
- Tekee kuusi rinnakkaista kyselyä (yhteenveto, päivä, query, page, country, device) yhden kutsun aikana ja palauttaa yhdistetyn JSON:in
- Lyhyt in-memory cache (5 min) jotta GSC-kiintiötä ei kuluteta turhaan

### 3. Verkkomemo `levi.fi`-vaikutuksen seurantaan

Lisätään SearchConsoleAdmin-näkymään pieni ohjeteksti / linkki: "Nähdäksesi tarkat klikit levi.fi-linkistä, katso oman PageViews-adminin referrer-taulukko (`page_views.referrer LIKE '%levi.fi%'`) tai Search Console UI → Links."

Voin samalla lisätä **PageViewsAdminiin uuden kortin "Top referrers"** joka aggregoi `referrer`-kentän (top 10) — tämä näyttää _todelliset_ klikit levi.fi:stä ja muista lähteistä. Onko `referrer` tällä hetkellä jo kerätty? Pitää varmistaa edge functionissa `log-page-view` ennen kortin tekoa. Jos ei, lisätään se samaan migraatioon (`document.referrer` clientiltä).

## Tekniset huomiot

- GSC API:n rate limit: 1 200 kyselyä/min/projekti — ei lähellä rajaa
- API palauttaa max 25 000 riviä per kysely; käytetään `rowLimit: 1000` ja sivutusta vain jos tarpeen
- Päivämääräformaatti: `YYYY-MM-DD`, UTC
- Site URL pathissa pitää URL-enkoodata: `sc-domain%3Aleville.net`
- Cache invalidoituu jos käyttäjä vaihtaa aikaväliä

## Jälkeen toteutuksen

Voitte heti nähdä:
- Onko orgaaninen näkyvyys jatkuvasti nousussa (klikit/näytöt päivätasolla)
- Mihin hakuihin Google nostaa positioita
- Mitkä sivut vetävät eniten ja missä positio on lähellä top-10 → "low-hanging fruit"

Levi.fi:n klikit kannattaa katsoa joko sisäisestä referrer-datasta (PageViews-admin uusi kortti) tai GSC UI:sta käsin — API:lla ei voi.

## Hyväksyntä

Aloitanko (a) pelkän SearchConsoleAdmin-välilehden rakentamisesta, vai (b) samalla myös referrer-kortin lisäämisestä PageViewsAdminiin levi.fi-mittausta varten?