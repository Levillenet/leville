# Äkkilähdöt: oikea Moder-hinta ja katoavat tarjoukset

## Mistä hintaero johtuu

Tarkistin taustapalvelun vastauksen. Tällä hetkellä hinta lasketaan laskemalla yhteen Moderin saatavuusvastauksen `day_rate`-päivähinnat. Se on **listahinta yhdelle yölle** — se ei sisällä Moderin pituus- eikä henkilömääräperusteista hinnoittelua.

Esimerkki (Glacier A5, 6 yötä):

```text
day_rate-summa (nykyinen laskenta)   1070 €
Moderin varausmoottorin oikea hinta   481 €  (03.09.–09.09.2026, 1 hlö)
```

Eli sivusto näyttää yli kaksinkertaista hintaa, ja alennukset lasketaan väärästä pohjahinnasta. Oikea hinta pitää hakea Moderin hinta-/tarjousrajapinnasta jaksolle (tulopäivä + lähtöpäivä + henkilömäärä), ei summaamalla päivähintoja.

## Mitä tehdään

### 1. Selvitetään oikea hintarajapinta (ensimmäinen askel)

Moderin julkista API-dokumentaatiota ei ole saatavilla, joten oikea päätepiste varmistetaan kokeilemalla. Taustapalveluun lisätään väliaikainen diagnostiikkatila (`?debug_price=1&room_type=<id>&from=2026-09-03&to=2026-09-09&guests=1`), joka kokeilee tunnetut vaihtoehdot (esim. `/api/v1/offers`, `/api/v1/prices`, `/api/v1/quotes`, `/api/v1/room_types/{id}/prices`, sekä `/api/v1/availabilities` henkilömäärä- ja yömääräparametreilla) ja palauttaa, mikä niistä tuottaa tunnetun oikean tuloksen 481 €.

Referenssitapaus, jota vasten verrataan: Glacier A5 Penthouse, 03.09.–09.09.2026, 1 hlö = 481 €.

Jos mikään päätepiste ei tuota oikeaa hintaa, ilmoitan sen ja pyydän Moderilta rajapintakuvauksen — tällöin hinta jätetään toistaiseksi piiloon ("Kysy hinta WhatsAppilla") väärän hinnan näyttämisen sijaan.

### 2. Hinnoittelu oikeaan rajapintaan

- Listaus: jokaiselle näytettävälle jaksolle haetaan oikea jaksohinta (kohde + tulopäivä + lähtöpäivä + kohteen oletushenkilömäärä). Vastaukset tallennetaan samaan välimuistiin kuin saatavuudet, jotta kutsumäärä pysyy pienenä.
- Päivämäärähaku: hinta haetaan käyttäjän valitsemille päiville ja henkilömäärälle.
- Yliviivattu "alkuperäinen hinta" = Moderin oikea jaksohinta + siivous. Perusalennus, superäkkilähtö-alennus ja jaksokohtainen alennus lasketaan tästä.
- Jos hintaa ei jollekin jaksolle saada, kortti näyttää hintakentän sijaan "Kysy hinta WhatsAppilla" — väärää hintaa ei näytetä koskaan.

### 3. Kadonneet äkkilähdöt

Listausnäkymä (Selaa tarjouksia) palauttaa edelleen 59 tarjousta, joten data on kunnossa. Tyhjä näkymä syntyy siitä, että sivu avautuu päivämäärähakuun, joka on tyhjä ennen valintaa, ja 21 päivän raja tyhjentää sitä kauemmas tehdyn haun.

Korjaukset:
- Sivu avautuu takaisin listausnäkymään, ja päivämäärähakuun siirrytään painikkeella.
- Jos haku menee 21 päivän rajan yli, näytetään selite ja suora varauslinkki (tämä on jo tehty) — ei tyhjää sivua.
- Listaus näkyy myös hakunäkymän alla, jotta sivu ei ole koskaan täysin tyhjä.

## Tekniset yksityiskohdat

- `supabase/functions/moder-availability/index.ts`: väliaikainen `debug_price`-haara, sen jälkeen jaksohintojen haku ja tallennus dealin kenttään (`quotedPrice`), `rates`-summa jää vain varafallbackiksi ja merkitään epävarmaksi.
- `src/pages/Akkilahdot.tsx`: `getModerPrice`/`getOriginalApiPrice` käyttävät `quotedPrice`-arvoa; jos puuttuu → hinta piiloon. Oletusmoodi `list`.
- `src/components/admin/SkiPassAdmin.tsx`: sama hintalähde adminin hintariveille.
- Varmistus: taustapalvelun vastaus tarkistetaan referenssitapausta vastaan ja sivu selaimessa (listaus + haku).
