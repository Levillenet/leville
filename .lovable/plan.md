
## CLS 0.707 korjaus — kuvien mitat kuntoon (oikeilla suhteilla)

### Mitä löytyi nyt koodista
- `Header.tsx`: logolla on `width/height`, mutta arvot pitää varmistaa kuvan oikeaan natiivisuhteeseen.
- `Footer.tsx`: logolla on tällä hetkellä väärä suhde (`240x192`), mikä voi aiheuttaa ison layout-shiftin.
- `Hero.tsx`: `width/height` on asetettu kaikille hero-kuville samaan 16:9-muotoon, vaikka kuvat eivät ole samaa kuvasuhdetta.
- `About.tsx`: carouselin `<img>`-tageilta puuttuu `width/height` kokonaan.

### Toteutussuunnitelma
1. **Korjaa logojen dimensioarvot kaikkiin logo-instansseihin**
   - Päivitä `Header.tsx` ja `Footer.tsx` käyttämään samaa, logon oikeaa natiivisuhdetta vastaavaa `width` + `height`-paria.
   - Erityisesti footerin nykyinen väärä suhde korjataan (tämä on todennäköisin iso CLS-lähde).

2. **Korjaa hero-kuvien mitat kuvatiedostokohtaisesti**
   - `Hero.tsx`: korvaa yksi yhteinen `1920x1080`-asetus kuvasrc-kohtaisella metadatalla (width/height per hero-kuva).
   - Näin selain saa oikean aspektisuhteen heti, eikä arvioi väärin.

3. **Lisää puuttuvat mitat About-carouselin kuviin**
   - `About.tsx`: lisää `<img>`-tageihin `width` ja `height` (vähintään vakioitu 4:3, mieluiten kuvatiedostojen todelliset mitat).
   - Tällä poistetaan “Kuvaelementti, jonka kokoa ei ole asetettu” myös etusivun alemmasta osasta.

4. **Nopea etusivun audit ennen julkaisu**
   - Tarkistus `Index`-reitillä renderöityviin komponentteihin: `Header`, `Hero`, `About`, `Footer`.
   - Varmistetaan, että jokaisella näkyvällä `<img>`-tagilla on sekä `width` että `height`.

5. **Verifiointi**
   - Aja mobiili-Lighthouse/PageSpeed etusivulle.
   - Varmista että:
     - audit “image elements do not have explicit width and height” ei enää listaa etusivun kuvia
     - CLS laskee merkittävästi (tavoite < 0.1).

### Muokattavat tiedostot
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/Hero.tsx`
- `src/components/About.tsx`
