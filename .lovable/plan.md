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

## 4. Superäkkilähtö-alennus (uusi asetus)

Äkkilähtöasetuksiin lisätään "Superäkkilähtö" -osio, jossa annetaan porrastettu lisäalennus sen mukaan, montako päivää saapumiseen on aikaa:

- Alle 3 päivää → oma % (esim. 15)
- Alle 5 päivää → oma % (esim. 10)
- Alle 7 päivää → oma % (esim. 5)

Säännöt:

- Lisäalennus lasketaan **perusalennuksen päälle** (ketjutettuna), ja sen lisäksi jaksokohtainen lisäalennus toimii ennallaan.
- Alennusta **ei näytetä asiakkaalle** erikseen: kortilla näkyy vain lopullinen hinta ja yliviivattu alkuperäishinta — ei omaa merkintää tai prosenttia superalennuksesta.
- Käytetään aina lyhintä täyttyvää porrasta (esim. 2 päivän päässä oleva saapuminen saa alle 3 päivän prosentin).
- Sama laskenta sekä listauksessa, päivähaussa että adminin hintariveissä, jotta hinnat täsmäävät.

### Tekniset yksityiskohdat (kohta 4)

- Uusi `site_settings`-rivi `deals_super_discount`, arvo JSON: `{ "d3": 0, "d5": 0, "d7": 0 }`. Lisätään `admin-settings`-funktion sallittujen id:iden listaan (`deals_enabled`, `deals_days_ahead`, `deals_base_discount`, `deals_super_discount`).
- `src/components/admin/SiteSettingsAdmin.tsx`: kolme numerokenttää (0–90 %) + tallennus `updateSiteSetting`-kutsulla; selite että alennus ei näy asiakkaalle.
- Yhteinen laskentafunktio `getSuperDiscountPct(checkIn)` (päivien erotus tästä päivästä) käytössä sekä `src/pages/Akkilahdot.tsx`:n `getTotalPrice`-ketjussa (perusalennuksen jälkeen, ennen siivousmaksun lisäämistä) että `src/components/admin/SkiPassAdmin.tsx`:n `getCurrentDisplayPrice`-laskennassa.
- Yliviivattu alkuperäishinta säilyy Moderin alkuperäisenä hintana, joten superalennus näkyy vain lopullisessa summassa.
