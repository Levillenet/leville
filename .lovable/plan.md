# Äkkilähtöjen hinta: mistä 62 € tulee ja miten se korjataan

## Mitä mittaukset osoittavat

Ajoin taustapalvelun `mode=prices`-haun Hiihtäjänkuja 5A2:lle (Moder room type 304) saapumispäivälle 7.9.2026, kaikilla pituuksilla 1–7 yötä. Moderin `/api/v1/prices`-vastauksen kenttä `total_price` antaa:

| Yöt | 5A2 | Karhupirtti |
|---|---|---|
| 1 | 62 € | 140 € |
| 2 | 154 € | 280 € |
| 3 | 213 € | 546 € |
| 4 | 332 € | 804 € |
| 5 | 409 € | 1039 € |
| 6 | 513 € | 1360 € |
| 7 | 574 € | 1681 € |

Eli 62 € tulee tosiaan Moderin rajapinnasta, ei sivustolta. Se ei vastaa Moderin varausnäkymän 110 € yöhintaa, joten `total_price` ei ole se hinta, jolla myydään (todennäköisesti netto-/pohjahinta ilman lisiä tai eri hinnastosta). Tätä ei voi päätellä pelkästä nykyisestä koodista, koska taustapalvelu poimii vastauksesta vain `total_price`-kentän eikä lokita muuta.

Löysin lisäksi varmistetun bugin: `mode=prices` -haara on koodissa **välimuistin jälkeen**. Kun välimuisti on voimassa, päivämäärähaku ei koskaan mene Moderiin vaan palauttaa vanhan listauspaketin (`deals`), jolloin sivu näyttää hinnan väärältä ajanjaksolta. Tämä on nyt tuotannossa päällä.

## Korjaus

1. **Diagnostiikka ensin (yksi ajo):** lokitetaan Moderin `/api/v1/prices`- ja `/api/v1/availabilities`-vastauksen koko JSON yhdelle huonetyypille ja yhdelle yölle, jotta nähdään kaikki hintakentät (esim. `total_price`, `price`, `rate`, `services`, `taxes`, `day_rate`). Verrataan niitä Moderin näyttämään 110 €:oon ja valitaan oikea kenttä.
2. **Käytetään oikeaa kenttää** hintalähteenä `fetchStayPrices`-funktiossa. Jos mikään kenttä ei vastaa 110 €:a, käytetään `availabilities`-vastauksen `day_rate`-summaa jakson yli ja merkitään LOS-hinnoittelu Moderin osalta puuttuvaksi (silloin pyydetään Moderilta oikea päätepiste).
3. **Välimuistibugi:** siirretään `mode=prices` -haara ennen välimuistitarkistusta, niin päivämäärähaku hakee aina tuoreet jaksohinnat.
4. **Siivousmaksu:** koska Moder ei lisää siivousta (se palauttaa vain majoitushinnan), siivousmaksu **jää** hintaan mukaan yhtenä eränä, mutta lisätään vain kerran ja alennus lasketaan majoitusosuudesta — ei siivouksesta. Yliviivattu alkuperäishinta lasketaan samalla kaavalla ilman alennusta.
5. Sama laskenta myös adminin hintariveille, jotta esikatselu ja julkinen sivu täsmäävät.

## Tekniset yksityiskohdat

- `supabase/functions/moder-availability/index.ts`: `mode=prices` -haaran siirto rivin ~280 välimuistilohkon edelle; `fetchStayPrices` lokittaa raakavastauksen kertaluontoisesti ja lukee valitun hintakentän.
- `src/pages/Akkilahdot.tsx`: `getTotalPrice` / yliviivattu hinta — alennus vain majoitusosuudesta, siivous lisätään kerran.
- `src/components/admin/SkiPassAdmin.tsx`: `getCurrentDisplayPrice` samaan kaavaan.
- Ei muutoksia tietokantaan; `moder_property_mapping.cleaning_fee` pysyy siivousmaksun lähteenä.
