# SEO-metatagien korjaus: mikä on oikeasti rikki

## Mitä tarkistin ensin

Ajoin selaintarkistuksen live-previewissä neljällä reitillä (`/`, `/majoitukset`, `/mokit-levilla`, `/opas/laskettelu-levi`) ja luin lähdekoodin. Tulos:

- `react-helmet-async` on jo asennettu ja `HelmetProvider` on `src/App.tsx`:ssä.
- Kaikilla 125 sivukomponentilla `src/pages/`-kansiossa on jo oma `<Helmet>` tai `SeoMeta`.
- `document.title` ja `link[rel=canonical]` **päivittyvät oikein** jokaisella reitinvaihdolla — esim. `/mokit-levilla` → "Mökit Leviltä 2026 — vuokramökit ja loma-asunnot keskustassa", canonical `https://leville.net/mokit-levilla`.
- Mikään skripti ei ylikirjoita `document.title`:ä (haku `document.title` ei löydä osumia lähdekoodista).

Eli oletus "kaikki reitit päätyvät samaan geneeriseen titleen ilman canonicalia" ei pidä paikkaansa. Uuden `Seo.tsx`-komponentin rakentaminen ja 125 sivun uudelleenkirjoitus tekisi olemassa olevat, hyvin viritetyt metatagit uusiksi ilman hyötyä — ja rikkoisi hreflang-logiikan, joka on tarkoituksella rajattu vain käännettyihin sivuihin.

## Mikä on oikeasti rikki

**Duplikaattikuvaus jokaisella sivulla.** `index.html` sisältää staattisen `<meta name="description">`, jota Helmet ei poista. Jokaisella reitillä DOMissa on siis **kaksi** description-tagia, ja ensimmäisenä (eli se, jonka crawlerit ja `querySelector` näkevät) on aina sama geneerinen majoitusteksti — myös oppaissa ja aktiviteettisivuilla. Tämä on juuri se oire, jonka havaitsit.

**Etusivun title.** Etusivu käyttää tällä hetkellä opas-painotteista titleä ("Leville.net – paikallinen Levi-opas: lumitilanne, ladut ja rinteet"), ei rahahakuihin osuvaa majoitustitleä.

## Mitä teen

1. **`index.html`**: poistan staattisen `<meta name="description">`-tagin. Kommentti tiedostossa sanoo jo, ettei metatageja pidä pitää siellä — description on jäänyt. `<title>` jää fallbackiksi ei-JS-crawlereille (Helmet korvaa sen). Tarkistan samalla, ettei og:/twitter:-tageja ole duplikaattina (nyt niitä ei ole — og:image löytyy tasan kerran).
2. **Etusivun title ja description** `src/pages/Index.tsx`:ssä (vain `fi`):
   - title: `Majoitus Levillä – Vuokramökit ja huoneistot keskustassa`
   - description: `Majoitus Levillä suoraan omistajalta: saunalliset vuokramökit ja huoneistot Levin keskustassa, kävelymatka rinteille. Varaa ilman välityspalkkioita.`
   Muut kielet jäävät ennalleen.
3. **Duplikaattiauditointi**: ajan skriptin, joka kerää kaikkien reittien title + description ja raportoi, jos kaksi sivua jakaa saman. Korjaan löytyvät duplikaatit käsin uniikeiksi. Jos duplikaatteja ei ole, raportoin sen — en kirjoita toimivia tekstejä uusiksi.
4. **Varmistus**: ajan saman selaintarkistuksen uudelleen vähintään 3 reitillä ja näytän, että description-tageja on tasan 1 ja arvo vastaa sivua.

## Mitä en tee (ja miksi)

- **En luo uutta `src/components/Seo.tsx`:ää enkä vaihda 125 sivua sen taakse.** Nykyinen `SeoMeta.tsx` + `HreflangTags.tsx` tekee jo saman ja enemmän (og:locale, kuvan alt-tekstit, kielikohtaiset fallbackit).
- **En lisää hreflangia kaikille sivuille fi/en/x-default -kaavalla.** Sivustolla on tietoinen sääntö: hreflang vain oikeasti käännetylle sisällölle, ei aavereittejä. Automaattinen fi/en-pari loisi satoja 404-alternateja.
- **En koske ulkoasuun, sisältöön tai tyyleihin.**

Jos haluat silti nimenomaan uuden `Seo.tsx`-abstraktion nykyisen tilalle, sanothan — se on tehtävissä, mutta se on refaktorointi eikä SEO-korjaus.
