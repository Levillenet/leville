# Sesonkipikahaut etusivun hakupalkin alle

## Mitä asiakas näkee
- Hakupalkin alla pieni avattava painike **"Sesonkipikahaut"** (EN: "Peak season quick search"). Suljettuna vie yhden rivin.
- Avattuna sesongit pieninä siruina/kortteina, esim.:
  - Joulu 19.–27.12.
  - Uusivuosi 26.12.–4.1.
  - Hiihtoloma vko 8 / vko 9 / vko 10
  - Pääsiäinen (la ennen pääsiäisviikkoa – 2. pääsiäispäivä)
  - Ehdotetut lisät: Ruska (vko 37–38), Kaamos / joulun alusviikot (vko 49–50) ja Vappu – voidaan jättää pois, jos et halua.
- Sirua painettaessa aukeaa lista **kaikista sillä välillä myytävissä olevista vapaista jaksoista**:
  huoneiston nimi · max henkilömäärä · päivät ja yöt · hinta siivouksineen · **"Varaa tästä"** (suora Moder-linkki kyseiseen huoneistoon ja päiviin, avautuu uuteen välilehteen, kampanja- ja kieliparametrit mukana kuten muissakin varauslinkeissä).
- Järjestys: pisimmät/koko jakson kattavat ensin, sitten halvin.
- Menneet sesongit katoavat automaattisesti; seuraava vuosi tulee tilalle ilman käsityötä (päivät lasketaan kalenterista, pääsiäinen kaavalla).
- Jos sesongilla ei ole yhtään vapaata: "Tämä sesonki on täynnä" + linkki tarjouspyyntöön/WhatsAppiin.
- Suomeksi etusivulla ja englanniksi /en-etusivulla.

## Päivämääräsäännöt
- Hiihtolomaviikko N: lauantai ennen viikkoa N → lauantai viikolla N (7 yötä), sallitaan myös sunnuntaihin asti (8 yötä). Hakuväli siis la–su.
- Joulu 19.–27.12., uusivuosi 26.12.–4.1. (kiinteät).
- Pääsiäinen: lauantai viikkoa ennen pääsiäistä → 2. pääsiäispäivä (2027: 20.3.–29.3.).
- Sesonki näkyy, kunnes sen viimeinen päivä on mennyt.

## Hinta
- Näytetään jakson hinta **siivousmaksu mukaan lukien**, merkinnällä "sis. loppusiivouksen". Tämä on tietoinen poikkeus pelastusikkunan säännöstä (siellä siivous jätetään pois); kirjaan poikkeuksen muistiin.
- Jos luotettavaa hintaa ei saada, hinta jätetään pois ja näytetään vain "Varaa tästä".

## Tekninen toteutus
- Uusi backend-funktio `season-availability`: ottaa sesongin alku/loppu, hakee Moderin päiväkalenterin (sama lähde kuin nykyinen `moder-availability`/äkkilähdöt: vapaat päivät, minimiyöt, check-in/out-kiellot, päivähinnat) ja muodostaa jokaiselle huoneistolle kaikki varattavissa olevat yhtenäiset jaksot välin sisällä (min-yöt ja saapumis/lähtökiellot huomioiden). Hinta = päivähintojen summa + kohteen `cleaning_fee` mappingista. Max henkilöt mappingista. Välimuisti 1 h.
- `src/lib/seasons.ts`: sesonkimäärittelyt + päivälaskenta (ISO-viikot, pääsiäiskaava, menneiden suodatus). Testit: vko 8/2027 = 20.2.–28.2., pääsiäinen 2027 = 20.3.–29.3., mennyt sesonki ei näy, vuodenvaihde laskee seuraavan vuoden.
- Testi jaksonmuodostukselle (deno): minimiyöt, saapumiskielto, hinta sisältää siivouksen.
- UI-komponentti `SeasonQuickSearch` ladataan laiskasti (ei käynnistyspolulle, LCP-sääntö), ja data haetaan vasta kun sesonki avataan.
- Varaa-linkit kulkevat nykyisen appendAdParams-/kielilogiikan kautta.
- GA-tapahtumat: `season_quick_open`, `season_quick_book_click` (suostumuksen mukaan).

## Ei muuteta
Hakupalkkia itseään, pelastusikkunaa, muita sivuja tai tekstejä.
