## Ongelma

Kuvakaappauksessa Levi Glacier A6:n pääkuva on pesuhuone (`/glacier/a4-a6/02.jpg`). A4:n pääkuva on saunan kuva (`/glacier/a4-a6/01.jpg`) — myös vähemmän myyvä. Pääkuva tulee kentästä `heroImage` `src/data/properties.ts`-tiedostossa, jota `PropertyCard` näyttää listauksissa.

## Korjaus

1. **Vaihda A6:n heroImage** (`properties.ts` rivi 884) — pois pesuhuoneesta `/glacier/a4-a6/02.jpg`. Vaihtoehdot samasta kuvasarjasta: jokin oleskelutilan/keittiön kuva (esim. `/glacier/a4-a6/03.jpg`–`13.jpg`), tai turvallinen ulkokuva `/glacier/exterior-a.jpg` (jota A1/A3/A5 jo käyttävät).

2. **Vaihda A4:n heroImage samalla** (rivi 806) — nykyinen `01.jpg` on sauna. Käytä esim. oleskelutilan kuvaa tai `/glacier/exterior-a.jpg`. (Sauna ei ole pesuhuone, mutta käyttäjän käsky on selvä: korttien pitäisi näyttää myyvä pääkuva — varmistetaan että pesuhuonetta ei käytetä missään.)

3. **Tarkista loput hero-kuvat** käymällä läpi kaikki `heroImage`-rivit. Tunnistettavat riskit:
   - `/skistar/kolmio/02.jpg`, `/skistar/kaksio/02.jpg`, `/skistar/yksio/02.jpg` jne. — avaan ne tarkistaakseni, onko kyseessä pesuhuone. Jos on, vaihdan oleskelu-/keittiö-/ulkokuvaan.
   - `/glacier/a2/01.jpg`, `/glacier/b1-b2/01.jpg`, `/glacier/b3-b4/01.jpg`, `/hiihtajankuja/05.jpg` — sama tarkistus.

4. **Sääntö muistiin** (`mem://`): "Älä koskaan käytä pesuhuone-/kylpyhuonekuvaa majoituksen pääkuvana (heroImage) propertyCard-listauksissa. Suosi ulko-, oleskelu- tai keittiökuvaa."

## Tekninen kuvaus

- Tiedosto: `src/data/properties.ts` — vain `heroImage`-kentän arvon vaihto kohteilla, joiden hero osoittaa pesuhuonekuvaan.
- Ei muutoksia `PropertyCard`-komponenttiin eikä `images[]`-järjestykseen — pesuhuonekuva pysyy galleriassa, vain pääkuva vaihtuu.
- Tarkistus tapahtuu avaamalla epäselvät hero-kuvat (`code--view public/...`) ja vaihtamalla heroImage tarpeen mukaan.

## Vahvistettavaa

Onko ok että vaihdan A4:n hero-kuvan myös (saunasta esim. ulkokuvaan tai oleskelutilaan), vai haluatko että vain pesuhuonekuvat (A6 + mahd. muut) vaihdetaan?
