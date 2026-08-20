# Kuvien optimointi: WebP + pakkaus

Kyllä, tämä onnistuu. Tällä hetkellä projektissa on noin **330 MB kuvia**: 226 MB `src/assets`-kansiossa ja 104 MB `public`-kansiossa. Osa on jopa 7 MB:n yksittäisiä JPEG-tiedostoja.

Tärkeä huomio: `src/assets`-kuvat muunnetaan jo nyt automaattisesti WebP-muotoon julkaisuvaiheessa (vite-imagetools, leveys 800px). Ne eivät siis hidasta sivustoa — ne vain vievät turhaan tilaa repossa. Sen sijaan `public`-kansion kuvat (Glacier, Skistar, Hiihtäjänkuja jne.) tarjoillaan sellaisenaan alkuperäiskoossa, ja ne ovat oikea suorituskyky- ja tilaongelma.

## Vaihe 1 — public-kansion kuvat WebP-muotoon (suurin hyöty)

- Muunnetaan kaikki `public/`-kansion kohde-JPEG/PNG-kuvat WebP-muotoon (maksimileveys 1920px, laatu 82).
- Päivitetään viittaukset koodissa `.jpg` → `.webp` (mm. `src/data/properties.ts`, muut komponentit joissa `/glacier/`, `/skistar/`, `/hiihtajankuja/`, `/images/` -polkuja).
- Poistetaan alkuperäiset tiedostot.
- Poikkeus: `og-*.png`-jakokuvat säilytetään PNG/JPEG-muodossa (osa somepalveluista ei tue WebPiä) — ne vain pakataan pienemmiksi.
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
