# Skistar-ryhmäsivu ja ristiinlinkitys Glacierin kanssa

Uusi jaettava myyntisivu **leville.net/skistar** ja **leville.net/en/skistar** samalla pohjalla kuin Glacier-sivu. Sivu ei ole navigaatiossa – se lähetetään suorana linkkinä ja löytyy Googlesta.

## Skistarin kulma: yksityisyyttä pienemmissä yksiköissä

Glacier myy koko talon isolle leirille; Skistar myy joustavuutta ja yksityisyyttä. Samasta talosta voi varata monta eri kokoista huoneistoa, jolloin ryhmä majoittuu samaan osoitteeseen mutta pienemmissä, omissa yksiköissään – valmentajat, pariskunnat ja yksin matkustavat saavat oman rauhan.

Lähdedatan mukaiset luvut (Postintie 3, 10 huoneistoa):

- 2 kpl kahden makuuhuoneen huoneistoa, 6 hengelle
- 3 kpl yhden makuuhuoneen huoneistoa, 4 hengelle
- 5 kpl studiota, 3 hengelle
- Makuupaikkoja yhteensä 39. Lähes kaikissa oma sauna, kaikissa keittiö ja WiFi.

Sivun sisältö: kansiosio ja avainluvut, yleistason esittely (ei huoneistoluetteloa), ryhmäosio (suksihuoltotila, moderni talo, keskustan sijainti, yksityisyys), sijainti ja etäisyydet, FAQ, tarjouspyyntölomake ja suorat yhteystiedot. Ei euromääräisiä hintoja.

Sijainnista kerrotaan rehellisesti: ydinkeskusta, K-Market n. 150 m, ravintolat askelten päässä, hisseille n. 700 m (8–10 min kävely), ei hissiä talossa.

## Ristiinlinkitys Glacier ↔ Skistar

Molemmille sivuille lyhyt osio "Toinen vaihtoehto ryhmälle":

- `/glacier` → linkki `/skistar`: "Jos ryhmä haluaa enemmän yksityisyyttä pienemmissä yksiköissä keskustassa."
- `/skistar` → linkki `/glacier`: "Jos haluatte vuokrata koko talon leirille eturinteen kupeeseen."

Sama englanniksi `/en/glacier` ↔ `/en/skistar`. Linkit ovat sivujen sisällä, eivät navigaatiossa tai footerissa.

## SEO

Skistar kohdistetaan hakuihin, joissa korostuu keskusta ja joustava ryhmämajoitus:

- **Suomi:** ryhmämajoitus Levin keskustassa, treenileiri majoitus Levi keskusta, useampi huoneisto samasta talosta, yritysryhmän majoitus Levi, studio ja kaksio Levi keskusta, suksien huoltotila Levi.
- **Englanti:** group accommodation Levi centre, training camp accommodation Levi, multiple apartments same building Levi, corporate group accommodation Levi, studio apartments Levi centre.

Etupainotteiset metaotsikot ja -kuvaukset FI/EN, avainsanat H1:ssä ja H2-otsikoissa, 5–6 kysymyksen FAQ (voiko varata useamman huoneiston kerralla, mahtuuko koko ryhmä, suksien huolto, laskutus yritykselle, kuinka kaukana rinteet ovat, erot Glacieriin), rakenteinen data ja hreflang FI↔EN sekä molemmat reitit sivukarttaan.

## Tekniset yksityiskohdat

- Uusi olio `src/data/building-pages.ts`:iin (`slug: "skistar"`, polut `/skistar` ja `/en/skistar`, osoite Postintie 3, geo, kuvat `/skistar/exterior.webp`, `/skistar/kaksio/*`, `/skistar/studio-102/*`).
- Sisältötyyppiin lisätään valinnainen `crossLink`-kenttä (otsikko, teksti, kohde-slug) ja `BuildingPage.tsx` renderöi sen; Glacierin olioon lisätään linkki Skistariin ja päinvastoin.
- Reitit `/skistar` ja `/en/skistar` eksplisiittisesti `App.tsx`:ään, uudet rivit `src/data/sitemapRoutes.ts`:iin ja edge-kopioon `supabase/functions/_shared/sitemapRoutes.ts`.
- Tarjouspyyntölomake käyttää nykyistä `send-group-inquiry`-funktiota ja `group_inquiries`-taulua; `buildingName` välitetään "Skistar-talo, Postintie 3".
- JSON-LD: `ApartmentComplex` (10 yksikköä, Postintie 3, geo), `FAQPage`, `BreadcrumbList`. Ei takka- eikä hintaväittämiä.

## Vaiheet

1. Skistar-sisältö FI/EN + reitit + sitemap.
2. Ristiinlinkkiosio molemmille sivuille (FI ja EN).
3. Tekstien viimeistely antamillasi tarkennuksilla (esim. suksihuoltotilan kuvaus, talon rakennusvuosi).
