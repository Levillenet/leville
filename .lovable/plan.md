# Äkkilähdöt Moderin rajapinnalle + perusalennus

## Yhteenveto

Äkkilähtöjen hinnat ja saatavuus haetaan jatkossa Moderin rajapinnasta Beds24:n sijaan. Admin-asetuksiin lisätään uusi **perusalennus (%)**, joka lasketaan automaattisesti Moderin hinnasta. Jaksokohtainen alennus säilyy ennallaan lisäalennuksena. Varaaminen jatkuu WhatsApp-viestillä.

## 1. Moder-haku (backend)

Moderin API tarjoaa juuri tarvittavat endpointit (`Authorization: Bearer <MODER_API_TOKEN>`, token on jo tallessa):

- `GET /api/v1/availabilities?date_start&date_end&room_types[]` → per päivä: `is_free`, `free_rooms`, `day_rate`, `min_nights`, `checkin_denied`, `checkout_denied`, `blackout`
- `GET /api/v1/prices?room_types[]&date_start&date_end&guests_adults` → jakson `total_price` ja päivähinnat

Toteutus:

- Uusi edge-funktio `moder-availability`.
- Huoneistotyypit luetaan `moder_property_mapping`-taulusta (`moder_room_type_id`). Kaksi kohdetta (Karhupirtti, Skistar 322) on ilman Moder-id:tä — ne jäävät listalta pois, kunnes id lisätään.
- Vapaat jaksot muodostetaan päiväkohtaisesta saatavuudesta: peräkkäiset vapaat päivät → yhtenäinen vapaa ikkuna, huomioiden `min_nights`, `checkin_denied`, `checkout_denied` ja `blackout`. Aikaikkuna edelleen `deals_days_ahead` (nyt 28).
- Funktio palauttaa **vapaan ikkunan sekä sen yökohtaiset hinnat** (`prices`-endpointin `dates`-taulukko), jolloin minkä tahansa lyhyemmän osajakson hinta voidaan laskea suoraan. Hinnat ovat sentteinä → jaetaan 100:lla.
- Kenttänimet pidetään yhteensopivina nykyisen `Beds24Deal`-rakenteen kanssa (`roomId`, `roomName`, `checkIn`, `checkOut`, `nights`, `price`) ja lisätään `nightlyPrices` sekä `windowNights`. `roomId` mapataan takaisin Beds24-id:ksi, jotta olemassa olevat siivousmaksut, markkinointinimet ja WhatsApp-numerot `propertyDetails.ts`:stä ja `property_settings`-taulusta osuvat oikein.

## 1b. Jaksojen pilkkominen ja uudet suodattimet

Pitkiä vapaita ikkunoita ei enää näytetä sellaisenaan — niistä myydään mitä tahansa öitä.

- Näytettävä jakso on **enintään 7 yötä**, vaikka vapaana olisi esim. 14 yötä.
- Yläreunan suodattimet muuttuvat: **2 yötä / 3 yötä / 4+ yötä** (nykyisten "kaikki / 1–2 / 3+" tilalle).
- Valittu suodatin määrää näytettävän jakson pituuden ikkunan alusta laskien:
  - "2 yötä" → 2 yön jakso
  - "3 yötä" → 3 yön jakso
  - "4+ yötä" → pisin mahdollinen, kuitenkin enintään 7 yötä
- Ikkuna näytetään vain, jos siitä saadaan valitun mittainen jakso ja kohteen `min_nights` täyttyy.
- Kun vapaa ikkuna on pidempi kuin näytetty jakso, kortissa näkyy huomautus: *"Tällä jaksolla on vapaana yhteensä X yötä — voit valita haluamasi päivät. Kysy WhatsAppilla."* Teksti käännetään kaikille 7 kielelle.
- Jakson hinta lasketaan yökohtaisten hintojen summana + siivousmaksu, joten pilkottu jakso hinnoitellaan oikein.
- WhatsApp-viestiin lisätään tieto koko vapaasta ikkunasta, jotta asiakas voi pyytää eri pituutta.


## 2. Hakutiheys

Toteutetaan välimuistin vanhenemisikkunana `beds24_cache`-taulussa (id `moder_availability`), ei erillisenä ajastettuna työnä:

- klo 06–23 Suomen aikaa: data haetaan uudelleen, jos se on yli **1 tunti** vanhaa
- klo 23–06: uudelleenhaku, jos data on yli **2 tuntia** vanhaa

Tämä antaa täsmälleen pyydetyn tuoreuden mutta ei aja tyhjää yöllä, kun kukaan ei katso sivua — eli ei turhaa Cloud-kulutusta. Adminin "päivitä nyt" -toiminto pakottaa haun ohi välimuistin kuten nytkin.

## 3. Perusalennus (uusi asetus)

- Uusi rivi `site_settings`-tauluun: `deals_base_discount` (numero, %, oletus 0).
- Admin: `SiteSettingsAdmin.tsx` → Äkkilähdöt-osioon uusi kenttä "Perusalennus (%)" nykyisten päälle/pois- ja päiväikkuna-asetusten viereen.

### Hintalogiikka

```text
Normaalihinta (yliviivattu) = Moderin jakson hinta + siivousmaksu
Perusalennettu hinta        = Moderin hinta × (1 − perusalennus%) + siivousmaksu
Lopullinen hinta            = perusalennettu hinta × (1 − jaksokohtainen alennus%)
```

- Jos jaksolle **ei** ole annettu erillistä alennusta: näytetään normaalihinta yliviivattuna ja perusalennettu hinta korostettuna.
- Jos jaksolle on annettu lisäalennus (`period_settings.custom_discount`): se lasketaan perusalennetun hinnan päälle, ja yliviivattuna näkyy edelleen Moderin normaalihinta.
- Alennusprosenttibadge näyttää yhteenlasketun todellisen alennuksen normaalihintaan verrattuna.
- Nykyiset kohdekohtaiset yö-määrään sidotut alennukset (`discount_1_night` / `_2_nights` / `_3_plus_nights`) korvautuvat perusalennuksella äkkilähdöissä, jotta hinnoittelu pysyy yhtenä selkeänä ketjuna. Jos haluat säilyttää nekin rinnalla, kerro — se on helppo pitää mukana.

## 4. Mitä säilyy ennallaan

- WhatsApp-varauspyyntö samalla viestipohjalla ja hinnalla, kaikilla 7 kielellä.
- Suodattimet (kaikki / 1–2 yötä / 3+ yötä), 7 yön yläraja, hissilippu- ja erikoistarjousmerkinnät, jaksokohtaiset asetukset ja niiden hallinta.
- Etusivun hakubanneri ja Moderin varauswidget: ei muutoksia.
- Sivun ulkoasu, SEO-metat ja JSON-LD-rakenne.

## 5. Varmistus

- Kutsutaan `moder-availability` suoraan ja tarkistetaan, että jaksot ja hinnat tulevat oikein useammalle kohteelle.
- Verrataan muutamaa jaksoa Moderin varaussivun hintaan, että summat täsmäävät.
- Playwright: `/akkilahdot` näyttää kortit, yliviivatun normaalihinnan ja alennetun hinnan; WhatsApp-linkin viesti sisältää lopullisen hinnan.
- Tarkistetaan välimuistin osuma- ja uudelleenhakukäyttäytyminen lokeista.

## Tekniset yksityiskohdat

- Uusi tiedosto: `supabase/functions/moder-availability/index.ts`.
- Muokattavat: `src/pages/Akkilahdot.tsx` (datalähde + hintaketju), `src/components/admin/SiteSettingsAdmin.tsx` (perusalennus-kenttä), `supabase/functions/admin-settings/index.ts` tarvittaessa sallitun asetusavaimen lisäys.
- `deals_base_discount` lisätään `site_settings`-tauluun datarivinä (ei skeemamuutosta).
- Beds24-funktio `beds24-availability` jätetään paikalleen toistaiseksi (ei poisteta), jotta paluu vanhaan onnistuu yhdellä muutoksella.
- Tuotannon base-URL varmistetaan ensimmäisellä testikutsulla (`app.moder.fi` vs. dokumentaatiossa näkyvä `dev-app.moder.fi`).
