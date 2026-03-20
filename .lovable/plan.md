

## LCP-korjaus: Hero-kuvan preload, kriittinen CSS ja staattinen HTML-shell

### Ongelma
Google Search Console raportoi LCP yli 4s mobiilissa 50 URL:lle. Syyt: selain odottaa React-bundlea + CSS-bundlea ennen kuin saa mitään piirrettävää.

### Muutokset

**Tiedosto: `index.html`**

1. **Hero-kuvan preload** — Lisätään `<link rel="preload">` ensimmäiselle hero-kuvalle (`hero-chalet.jpg`). Koska Vite hashaa tiedostonimet buildissa, preload ei toimi suoralla src/assets-polulla. Ratkaisu: kopioidaan hero-chalet.jpg → `public/hero-chalet.jpg` ja preloadataan se. Hero-komponentissa käytetään edelleen importtia, mutta `index.html` saa selaimen lataamaan kuvan heti.

2. **Kriittinen inline-CSS** — Lisätään `<style>`-lohko `<head>`-osaan, joka sisältää:
   - Body/tausta: `#0a1628` (background-color jo paikallaan bodyssa, pidetään)
   - Header: taustanväri, flex-asettelu, logo-tila, navigaation perustyyli
   - Hero-osion perusrakenne: min-height, taustanväri, flex-keskitys
   - Fonttien perusmääritykset (DM Sans, Cormorant Garamond fallbackeineen)

3. **Staattinen HTML-shell** — Korvataan tyhjä `<div id="root"></div>` minimaalisella rakenteella:
   - Header-palkki logon tilalla ja navigaatiolinkeillä (harmaa placeholder)
   - Hero-alue oikealla taustavärillä, keskitetyllä otsikolla "Leville.net" ja latausilmoituksella
   - React korvaa tämän heti kun se mounttaa

**Tiedosto: `public/hero-chalet.jpg`** (uusi)
- Kopioidaan `src/assets/hero-chalet.jpg` → `public/hero-chalet.jpg` preload-käyttöön
- Tämä on ylimääräinen kopio, mutta tarvitaan koska Vite ei paljasta hashattua polkua ennen buildia

### Muutettavat tiedostot
- `index.html` — preload-link, inline CSS, staattinen shell
- `public/hero-chalet.jpg` — kopio preloadille

