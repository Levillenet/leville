# Majoituskorttien kuvagallerian korjaus

## Ongelma
- Kortin kuvaa vaihdettaessa seuraava kuva ladataan vasta painalluksen jälkeen täysikokoisena, joten vaihto tuntuu jumittavan.
- Mobiilissa nuolipainikkeet ovat näkymättömiä (näkyvät vain hiiren ollessa päällä), eikä pyyhkäisy toimi.
- Täyden koon näkymä on piirretty kortin sisään; kortin animaatiot/rajaukset voivat estää sen oikean toiminnan, eikä vaihdon aikana näy mitään latausmerkkiä, joten kuva näyttää "jäävän paikalleen".

## Korjaukset
1. **Täyden koon näkymä erilliseksi kerrokseksi** sivun päälle (ei kortin sisään), jotta painikkeet ja vaihto toimivat varmasti kaikilla laitteilla.
2. **Pyyhkäisy** vasemmalle/oikealle sekä kortissa että täyden koon näkymässä.
3. **Esilataus**: seuraava ja edellinen kuva ladataan valmiiksi taustalla, joten vaihto on välitön.
4. **Latausmerkki** täyden koon näkymään, kun kuva on vielä tulossa.
5. **Nuolet aina näkyvissä** kosketusnäytöillä, isommat painallusalueet.
6. **Kevyemmät kuvat korteissa**: gallerian muillekin kuville käytetään pienempiä versioita (luodaan -800w WebP -versiot), täyden koon näkymä käyttää alkuperäistä.

## Tekninen
- `PropertyCard.tsx`: lightbox `createPortal(document.body)`, touchstart/touchend-swipe (kynnys ~40 px), `new Image()`-preload naapureille, `onLoad`-spinner, nuolet `opacity-100 md:opacity-0 md:group-hover:opacity-100`.
- Skripti, joka luo `-800w.webp`-sisarukset kaikille `properties.ts`:n galleriakuville; `heroSrcSet` laajennetaan koskemaan niitä.
- Tarkistus Playwrightilla mobiilikoossa: avaus, nuolet, pyyhkäisy, kuvan vaihtuminen.
