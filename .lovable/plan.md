# Levi Hintasivun korjaus: ruokakauppaväite

## Tavoite
Poista sivulta **Hinnat Levillä** väärä väite, että Levin kauppojen hinnat olisivat 10–15 % korkeammat kuin muualla Suomessa, ja korvaa se todenmukaisella tiedolla.

## Varmistettava tila
Tiedosto `src/pages/guide/LevinHinnatPage.tsx` sisältää ruokakauppa-osiossa (Rivit 280–308) kaksi harhaanjohtavaa lausetta:
- Rivillä 282: "Hintataso on hieman korkeampi kuin Etelä-Suomessa, mutta ei dramaattisesti."
- Rivillä 300: "Kauppojen hinnat ovat noin 10–15 % korkeammat kuin Helsingissä."

## Suunniteltavat muutokset

### 1. Ruokakauppa-osion tekstin päivitys
- Korvataan rivin 282 lause neutraalimmalla: "Hintataso on käytännössä sama kuin muualla Suomessa — K-ryhmän ja S-ryhmän ketjuhinnoittelu on valtakunnallinen ja Levin kaupat ovat normaaleja K- ja S-Market -myymälöitä."
- Poistetaan rivin 300 virheellinen 10–15 % -väite. Tilalle voidaan lisätä esimerkiksi: "Suurissa ketjukaupoissa hinnat ovat pääsääntöisesti samat kuin muualla maassa. Sesonkiaikoina joidenkin tuotteiden tarjoukset voivat vaihdella, mutta perusvalikoiman hintaeroja ei ole merkittävästi."

### 2. Hissilippujen hintojen tarkistus (valinnainen, riippuen kausijulkaisusta)
- Tarkistetaan Levin virallisesta verkkokaupasta (levi.skiperformance.com), ovatko kauden 2026–2027 hissilippuhinnat jo julki.
- Jos uudet hinnat ovat saatavilla, päivitetään PriceTable-rivit 198–207 vastaamaan uusia hintoja.
- Jos uudet hinnat eivät ole vielä julki, säilytetään nykyiset 2025–2026 hinnat ja disclaimer ("suuntaa-antavia, perustuvat kauteen 2025–2026").

### 3. Validointi
- Ajetetaan `bun run build` ja `node scripts/validate-routes.mjs` varmistaakseen, että muutokset eivät riko sivua.
- Tarkistetaan esikatselussa, että ruokakauppa-osio näyttää oikealta ja että 10–15 % -väite on poistunut.
