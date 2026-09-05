# Sivun latausnopeuden korjaus (LCP)

Google raportoi, että käytännössä kaikki sivut latautuvat hitaasti (161 sivua "Poor"). Suurin syy on etusivun iso taustakuva-karuselli, sen taustalla heti ladattavat neljä lisäkuvaa, varausjärjestelmän skripti sekä fontit. Alla mitä muutetaan.

## Mitä tehdään

### 1. Mittaus ennen ja jälkeen
Ajetaan Googlen PageSpeed-mittaus (mobiili ja työpöytä) osoitteille `https://leville.net`, `/majoitukset` ja yhdelle kohdesivulle. Tulokset (LCP, CLS, TBT, kokonaispisteet) kirjataan ennen muutoksia ja uudelleen niiden jälkeen, jotta ero näkyy mustaa valkoisella.

### 2. Taustakuvat kevyemmiksi
- Yksi näkyvä kuva latautuu heti; muut neljä kuvaa ladataan vasta kun sivu on valmis ja käyttäjä on ollut sivulla hetken (nyt ne ladataan heti, yhteensä yli megatavu).
- Kuvista tehdään pienemmät versiot puhelimelle, tabletille ja työpöydälle, ja selain valitsee oikean koon. Puhelimessa ladataan nykyisen ison kuvan sijaan murto-osa.
- Kaikki taustakuvat muunnetaan kevyempään muotoon (WebP) nykyisten raskaiden JPG-kuvien tilalle.
- Kuvien vaihtoanimaatio (Ken Burns + tähtitaivas) käynnistetään vasta ensimmäisen näkymän piirtämisen jälkeen, jotta se ei hidasta avautumista. Liikettä vähennetään myös laitteilla, joissa käyttäjä on valinnut "vähennä liikettä".

### 3. Varausjärjestelmän (Moder) skripti
- Skripti ladataan vasta kun sivu on käyttövalmis tai kun käyttäjä lähestyy varausosiota, ei heti sivun avautuessa.
- Poistetaan skriptin osoitteesta joka latauskerralla vaihtuva lisäys, joka estää selainta käyttämästä välimuistia — nyt sama tiedosto haetaan uudestaan joka sivulatauksella.
- Sen palvelimeen otetaan yhteys valmiiksi etukäteen, jotta lataus on nopeampi kun se alkaa.

### 4. Fontit
- Vähennetään haettavia fonttileikkauksia (nyt kolme perhettä ja useita paksuuksia).
- Fontit ladataan sivun omalta palvelimelta Googlen sijaan, jolloin vältetään ylimääräinen yhteydenotto ulkopuoliseen osoitteeseen.
- Teksti näkyy heti varafontilla ja vaihtuu ilman hyppyä.

### 5. Muu turha kuorma alkulatauksessa
- Kevennetään etusivun heti ladattavaa koodia: alaosan osiot ja chat-painike ladataan vasta kun niitä tarvitaan.
- Some-jakokuvat (yli 300 kt kukin) ja `apple-touch-icon` (395 kt) pakataan pienemmiksi.

## Tekniset yksityiskohdat
- Hero: `src/components/Hero.tsx` — `srcSet`/`sizes` responsiivisille varianteille, taustakuvien esilataus `requestIdleCallback`-taakse, animaatiot vasta `load`-tapahtuman jälkeen, `prefers-reduced-motion`-tuki, tähtien määrä pienemmäksi mobiilissa.
- Kuvat: `vite-imagetools` tuottaa `w=640/1024/1536&format=webp` variantit `src/assets/hero-*.jpg`:sta; `/public/hero-chalet.webp` säilyy LCP-preloadina mutta lisätään mobiiliversio `imagesrcset`-attribuutilla `index.html`:ään.
- Moder: `src/components/ModerBookingWidget.tsx` — skriptin lisäys `requestIdleCallback`/IntersectionObserver-pohjaiseksi, `?v=Date.now()` pois (korvataan versiovakioilla), `<link rel="preconnect">` S3-originiin `index.html`:ään.
- Fontit: itse hostatut `woff2`-tiedostot `public/fonts/`, `@font-face` + `font-display: swap` `src/index.css`:ssä, Google Fonts -linkit pois `index.html`:stä; vain käytössä olevat paksuudet.
- Etusivu: `src/pages/Index.tsx` ja `src/pages/en/Index.tsx` — `WhatsAppChat` ja loput osiot `lazy` + `Suspense` (EN-versio tuo nyt kaiken eagerina).
- Mittaus: PageSpeed Insights API mobiili+työpöytä, tulokset raportoidaan chatissa ennen/jälkeen.

Ei muutoksia sisältöön, teksteihin, hinnoitteluun eikä varauslogiikkaan.
