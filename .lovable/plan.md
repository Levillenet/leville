# Kuvien optimointi: WebP + pakkaus

Kyllä, tämä onnistuu. Tällä hetkellä projektissa on noin **330 MB kuvia**: 226 MB `src/assets`-kansiossa ja 104 MB `public`-kansiossa. Osa on jopa 7 MB:n yksittäisiä JPEG-tiedostoja.

Tärkeä huomio: `src/assets`-kuvat muunnetaan jo nyt automaattisesti WebP-muotoon julkaisuvaiheessa (vite-imagetools, leveys 800px). Ne eivät siis hidasta sivustoa — ne vain vievät turhaan tilaa repossa. Sen sijaan `public`-kansion kuvat (Glacier, Skistar, Hiihtäjänkuja jne.) tarjoillaan sellaisenaan alkuperäiskoossa, ja ne ovat oikea suorituskyky- ja tilaongelma.

## Vaihe 1 — public-kansion kuvat WebP-muotoon (suurin hyöty)

- Muunnetaan kaikki `public/`-kansion kohde-JPEG/PNG-kuvat WebP-muotoon (maksimileveys 1920px, laatu 82). **Tiedostonimet pysyvät täysin samoina — vain pääte muuttuu** (`/glacier/a2/05.jpg` → `/glacier/a2/05.webp`).
- Viittaukset haetaan koko projektista, ei vain `properties.ts`:stä: kaikki `.ts`, `.tsx`, `.html`, `.txt`, `.json`, `.css` -tiedostot. Erityisesti tarkistetaan:
  - `index.html` meta-tagit ja `<link rel="preload">`
  - JSON-LD -komponentit ja skeemat (`JsonLd.tsx`, `StructuredData.tsx`, `src/utils/structuredData.ts`, sivukohtaiset skeemat)
  - `SeoMeta.tsx` sekä sivujen omat `og:image` / `twitter:image` -tagit
  - `public/llms-full.txt` ja `public/llms.txt`
  - `src/data/*.ts` (properties, street-hubs, propertyDetails, searchIndex ym.)
  - Reunatapaukset: dynaamisesti koostetut polut (esim. `${slug}/01.jpg`) käydään läpi käsin.
- Poistetaan alkuperäiset tiedostot vasta kun kaikki viittaukset on päivitetty; lopuksi varmistetaan haulla, ettei koodissa ole yhtään jäljelle jäänyttä `.jpg`/`.png`-viittausta muunnettuihin tiedostoihin.
- Poikkeus: `og-*.png`-jakokuvat säilytetään PNG-muodossa (osa somepalveluista ei tue WebPiä) — ne vain pakataan pienemmiksi, nimet ja polut ennallaan, joten meta-tageihin ei tule muutoksia.
- Odotettu tulos: ~104 MB → noin 12–18 MB, ja nopeammin latautuvat kohdesivut.


## Vaihe 2 — src/assets-lähdekuvien pakkaus

- Pakataan lähde-JPEG/PNG-kuvat paikoilleen samalla tiedostonimellä (maksimileveys 1920px, laatu 82) — tiedostopäätteitä ei vaihdeta, joten **yhtään importtia ei tarvitse muuttaa** ja riski on minimaalinen.
- Odotettu tulos: ~226 MB → noin 35–50 MB. Julkaistu sivusto pysyy visuaalisesti identtisenä, koska build skaalaa kuvat joka tapauksessa 800px WebPiksi.

## Vaihe 3 — tarkistus

- Type-check + build.
- Selaintarkistus etusivulta ja yhdeltä Glacier-kohdesivulta, että kaikki kuvat latautuvat (ei 404-virheitä konsolissa).

## Tekniset yksityiskohdat

- Muunnos tehdään `cwebp`/ImageMagick-työkaluilla sandboxissa, ei uusia riippuvuuksia projektiin.
- Hero-LCP-kuva `public/hero-chalet.jpg` ja sen `<link rel="preload">` `index.html`-tiedostossa päivitetään yhtä aikaa, ettei preload mene rikki.
- `vite.config.ts`:n imagetools-asetuksia ei muuteta.
- Ei muutoksia sisältöön, otsikoihin, layoutiin tai SEO-metaan.
