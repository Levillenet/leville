# Äkkilähdöt: esimerkit levitetään seuraavalle kahdelle viikolle

## Syy (tarkistettu)
- Taustapalvelu palauttaa vapaat jaksot jo 21 päivää eteenpäin (19.11.–10.12.), eli asetus ei rajoita.
- Sivun "Esimerkkejä vapaista jaksoista" -lista ottaa vain 10 aikaisinta jaksoa. Tänään alkavia 1 yön aukkoja on 12, joten kaikki 10 esimerkkiä ovat tältä päivältä (19.–20.11.) eikä myöhempiä näy.
- Haku omilla päivillä toimii jo koko 21 päivän ajalle.

## Muutos
1. Esimerkit valitaan seuraavan 14 päivän ajalta tasaisesti: kierretään saapumispäivät läpi ja otetaan joka kierroksella yksi jakso per päivä, kunnes lista on täynnä.
2. Sama huoneisto korkeintaan 2 kertaa (kuten nyt), ja eri huoneistoja suositaan.
3. Esimerkkejä näytetään 12 (nyt 10), järjestettynä päivämäärän mukaan.
4. Pidemmät jaksot (2+ yötä) etusijalla saman päivän sisällä, jotta lista ei täyty pelkistä 1 yön aukoista.

## Tekninen
- Vain `exampleWindows` src/pages/Akkilahdot.tsx: suodatus checkIn ≤ tänään+14, ryhmittely päivittäin, round-robin.
- Logiikka erilliseen puhtaaseen funktioon + testi (scripts/): 12 tänään alkavaa jaksoa + myöhempiä → tulos kattaa useita eri päiviä, ei yli 14 pv päähän.
- Hinnat, alennukset ja hakulogiikka ennallaan.
