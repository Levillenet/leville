# Korjataan Google-hakutulos haulle "leville"

## Tausta (vahvistettu)
- Koodissa metat ovat jo oikein: `Majoitus Levillä ${vuosi} – Vuokramökit ja huoneistot Levin keskustassa | Leville.net` ja uusi majoitusjohtoinen kuvaus.
- Live-sivu `leville.net` palauttaa edelleen vanhan otsikon *"Leville.net – paikallinen Levi-opas: lumitilanne, ladut ja rinteet"* — prerenderatun snapshotin vanha versio on vielä palvelussa.
- Google-hakutulos näyttää siksi vanhaa tekstiä; se päivittyy vasta uudelleenindeksoinnin jälkeen.

## Vaiheet
1. **Julkaisu** — julkaistaan nykyinen koodi tuotantoon, jotta uusi meta menee liveen.
2. **Varmistus curlilla** — tarkistetaan, että `leville.net` palauttaa uuden otsikon ja kuvauksen (jos edge-välimuisti näyttää vanhaa, odotetaan hetki ja varmistetaan uudelleen).
3. **Uudelleenindeksointi GSC:ssä** — pyydetään etusivun indeksointia Search Console -liittimen kautta (URL Inspection), jotta Google hakee sivun nopeammin uudelleen.
4. **Raportti** — kerrotaan, milloin muutos näkyy livenä ja mitä odottaa hakutuloksessa (yleensä päivien sisällä, koska kyseessä on usein haettu etusivu).

Ei muutoksia sivun sisältöön tai muihin tiedostoihin — meta on jo valmiina.
