# Äkkilähdöt: kalenterin tyhjennys + päivärajoitteen korjaus

## 1. "Tyhjennä valinnat" -nappi

Hakuwidgetin kalenteriin lisätään alapalkki, jossa on **Tyhjennä valinnat** -painike:

- Nollaa valitun ajanjakson (saapuminen ja lähtö) ja sulkee kalenterin.
- Painike näkyy myös kalenterin ulkopuolella (pieni "x"/Tyhjennä ajanjakson painikkeen vieressä), kun valinta on tehty, jotta uuden haun voi aloittaa yhdellä klikkauksella.
- Teksti käännetään kaikille 7 kielelle.

## 2. Päivärajoite (esim. 21 päivää) toimimaan

Nykytila koodissa: taustapalvelu hakee ja palauttaa jaksoja aikaikkunalla `asetus + 30 päivää` (`horizonDays`), ja myös listauksen yläraja (`maxCheckIn`) käyttää tuota laajennettua arvoa. Siksi asetuksella 21 tulee näkyviin jaksoja vielä kuukauden päähän.

Korjaus:

- Saatavuutta haetaan edelleen pidemmälle (jotta jaksojen pituudet ja aukot lasketaan oikein), mutta **saapumispäivän yläraja on tasan asetettu päivämäärä** (tänään + asetus).
- Rajoite palautetaan asiakkaalle vastauksessa, jotta sivu tietää sen.
- Sivu suodattaa sekä listauksen että päivähaun tulokset saman rajan mukaan.

## 3. Viesti rajan yli mentäessä

Kun haettu saapumispäivä on rajan ulkopuolella, tuloslistan tilalle näytetään selkeä huomautus:

> "Äkkilähtöjä näytetään 21 päivää eteenpäin. Valitse aikaisempi saapumispäivä tai varaa suoraan varausjärjestelmästä."

Viestissä oleva päiväluku tulee asetuksesta ja teksti käännetään kaikille kielille. Mukaan suora varauslinkki (moder), jotta pidemmän aikavälin varaus onnistuu.

## Tekniset yksityiskohdat

- `supabase/functions/moder-availability/index.ts`: `maxCheckIn = tänään + dealsDaysAhead` (haku `dateEnd` säilyy `dealsDaysAhead + 30`); payloadiin `daysAhead: dealsDaysAhead`. Cache-avain ennallaan, mutta uusi kenttä pakottaa käytännössä tuoreen rakenteen seuraavalla haulla (vanhassa cachessa kenttä puuttuu → fallback 21/asetus administa).
- `src/pages/Akkilahdot.tsx`:
  - `fetchBeds24Availability` palauttaa `{ deals, daysAhead }`; fallbackina admin-asetuksen `deals_days_ahead`.
  - `maxCheckInIso` = tänään + daysAhead; `filteredDeals` ja `searchItems` suodattavat `deal.checkIn <= maxCheckInIso`.
  - `searchCheckIn > maxCheckInIso` → näytetään rajoiteviesti tulosten sijaan.
  - Kalenteri-Popoverin footeriin `Tyhjennä valinnat` -painike (`setSearchCheckIn("")`, `setSearchCheckOut("")`, `setRangeOpen(false)`).
  - Uudet käännösavaimet `clearDates` ja `beyondWindow` `extraLabels`-objektiin (7 kieltä).
