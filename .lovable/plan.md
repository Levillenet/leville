# SEO-metatagien korjaus: duplikaattikuvaus pois

## Tarkistin nyt myös tuotannon (leville.net), en vain previewiä

Ajoin oikean selaimen `https://leville.net`-osoitteeseen ja odotin 3 s hydraation jälkeen. Tulos neljältä reitiltä:

| Reitti | title | description-tageja | canonical |
|---|---|---|---|
| `/` | Leville.net – paikallinen Levi-opas… | **2** | `https://leville.net/` |
| `/opas/laskettelu-levi` | Laskettelu Levillä 2026 – 43 rinnettä… | **2** | `https://leville.net/opas/laskettelu-levi` |
| `/mokit-levilla` | Mökit Leviltä 2026 — vuokramökit… | **2** | `https://leville.net/mokit-levilla` |
| `/vuokramokit/glacier-apartments-levi` | Glacier Apartments Levi – 10 perhehuoneistoa… | **2** | `https://leville.net/vuokramokit/glacier-apartments-levi` |

Yhtään JS-virhettä ei kirjautunut millään reitillä.

Eli tuotannossa **title ja canonical toimivat oikein myös alasivuilla** — myös niillä kahdella, jotka auditissasi näyttivät rikkinäisiltä. Auditin työkalu on todennäköisesti lukenut raakaa HTML:ää tai lopettanut odottamisen ennen kuin lazy-ladattu reittikomponentti ehti mountata (nämä sivut ovat `React.lazy`-takana, joten ne renderöityvät myöhemmin kuin etusivu).

**Error-swallowing (kohta 1):** tarkistin `src/App.tsx`:n — ei `ErrorBoundary`ä eikä `componentDidCatch`ia `HelmetProvider`in tai reittien ympärillä. Ainoa `try/catch` koskee SEO-sivujen hakua tietokannasta eikä liity Helmetiin. `<Suspense>`-fallback voi viivästyttää alasivun metatageja, mutta ei niele niitä. Dev- ja prod-buildin välillä ei ole eroa, joka hiljentäisi SeoMetan.

## Ainoa oikea vika: duplikaattikuvaus

`index.html` sisältää staattisen `<meta name="description">`, jota Helmet ei poista. Jokaisella sivulla — myös tuotannossa — DOMissa on **kaksi** description-tagia, ja ensimmäisenä (jonka crawlerit ja `querySelector` näkevät) on aina sama geneerinen majoitusteksti. Tämä selittää oireen "kaikilla sivuilla sama kuvaus".

## Mitä teen

1. **`index.html`**: poistan staattisen `<meta name="description">`-tagin, jotta Helmetin sivukohtainen kuvaus on ainoa. `<title>` jää fallbackiksi ja päivitän sen etusivun uuteen muotoon. Tarkistan samalla, ettei og:/twitter:-tageja ole duplikaattina (nyt niitä ei ole).
2. **Etusivu** `src/pages/Index.tsx` (vain `fi`):
   - title: `Majoitus Levillä – Vuokramökit ja huoneistot keskustassa`
   - description: `Majoitus Levillä suoraan omistajalta: saunalliset vuokramökit ja huoneistot Levin keskustassa, kävelymatka rinteille. Varaa ilman välityspalkkioita.`
   Muut kielet ennallaan. Mikään skripti ei ylikirjoita `document.title`:ä — haku ei löydä yhtään `document.title`-osumaa lähdekoodista, joten poistettavaa logiikkaa ei ole.
3. **Duplikaattiauditointi**: ajan skriptin, joka kerää kaikkien reittien title + description ja raportoi, jos kaksi sivua jakaa saman. Korjaan löytyvät duplikaatit uniikeiksi. Jos duplikaatteja ei ole, raportoin sen — en kirjoita toimivia tekstejä uusiksi.
4. **Julkaisu + tuotantovarmistus (kohta 2)**: julkaisen muutoksen ja ajan saman selaintarkistuksen **julkaistulle** `https://leville.net`-osoitteelle, en previewille. Raportoin `document.title`, `querySelectorAll('meta[name=description]').length === 1` ja `link[rel=canonical]` vähintään reiteiltä `/opas/laskettelu-levi`, `/mokit-levilla` ja yhdeltä `/vuokramokit/`-sivulta.

## Mitä en tee

- **En rakenna uutta `src/components/Seo.tsx`:ää** — sovitun mukaisesti `SeoMeta` + `HreflangTags` jäävät.
- **En lisää hreflangia kaikille sivuille fi/en/x-default-kaavalla.** Sivustolla on tietoinen sääntö: hreflang vain oikeasti käännetylle sisällölle. Esimerkiksi `/vuokramokit/glacier-apartments-levi` näyttää nyt 0 alternatea, mikä on oikein — EN-versiota ei ole.
- **En koske ulkoasuun, sisältöön tai tyyleihin.**
