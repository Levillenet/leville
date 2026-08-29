# Läpileikkaava tietoturvatarkastus

Kävin läpi tietokannan käyttöoikeudet, tallennustilan säännöt ja kaikki taustafunktiot. Kriittisiä (julkaisun estäviä) havaintoja ei ole — julkinen sisältö, opassivut ja analytiikka ovat kunnossa, tallennustilan kirjoitus on rajattu admineille, ja vieraiden henkilötietojen poisto on pitänyt.

Alla on löydökset vakavuusjärjestyksessä ja mitä kullekin tehdään.

## 1. Suojaamattomat taustafunktiot (korkein prioriteetti)

Seuraavat funktiot ovat avoinna kenelle tahansa internetistä ilman salasanaa tai kirjautumista, ja ne käyttävät sisäisesti palveluavainta tai maksullisia rajapintoja:

| Funktio | Mitä kuka tahansa voi tehdä nyt |
|---|---|
| `maintenance-bookings` | Hakea Beds24-varaustiedot (kohde, saapumis-/lähtöpäivät, henkilömäärät, kanava) |
| `mark-cleaned` | Merkitä minkä tahansa kohteen siivotuksi |
| `maintenance-settings` | Lukea/kirjoittaa huoltoasetuksia |
| `melcloud-api`, `homey-api`, `floor-heating-cron` | Ohjata lämpöpumppuja ja lattialämmitystä |
| `send-worklist`, `check-booking-changes`, `ticket-reminders` | Laukaista sähköpostilähetyksiä (kuluja ja roskapostiriski) |
| `get-guide-wifi` | Hakea minkä tahansa julkaistun kohteen WiFi-salasanan pelkällä slugilla |

Korjaus: lisätään jokaiseen sama salasanatarkistus, joka on jo käytössä esim. `get-cleaning-status`- ja `manage-timed-notices`-funktioissa (`ADMIN_PASSWORD` / tarvittaessa `VIEWER_PASSWORD`). Ajastetuille funktioille (`floor-heating-cron`, `ticket-reminders`, `check-booking-changes`, `send-worklist`) otetaan käyttöön oma `CRON_SECRET`-tunniste, jotta ajastukset toimivat edelleen. Admin-paneelin kutsut päivitetään lähettämään salasana mukana, jotta mikään näkymä ei hajoa.

`get-guide-wifi` rajataan niin, että WiFi-tiedot palautetaan vain, kun kutsussa on kohteen oma pääsytunniste (opaslinkin token) tai admin-salasana.

## 2. Löysä CORS

23 funktiota sallii kutsut mistä tahansa verkkotunnuksesta (`Access-Control-Allow-Origin: *`). Osalle se on oikein (sitemap, säädata, chatbot), mutta admin- ja huoltofunktioille ei. Rajataan admin- ja huoltofunktiot `https://leville.net` + esikatselutunnus -listalle, kuten muissa funktioissa jo on.

## 3. Tietokannan havainnot

- `has_role` ja `is_admin` ovat suoritettavissa kirjautumattomana. Ne eivät vuoda tietoa (palauttavat vain tosi/epätosi omalle id:lle), mutta `EXECUTE`-oikeus poistetaan `anon`-roolilta siisteyden vuoksi.
- `autoresponder_log`, `autoresponder_rules`, `autoresponder_settings`: RLS päällä ilman sääntöjä = kaikki suora pääsy estetty, vain taustafunktiot pääsevät. Tämä on tarkoituksellista, ei muutosta — kirjataan tietoturvamuistioon, ettei sitä enää nosteta havaintona.
- Julkisesti luettavat taulut tarkistettu: `booking_terms`, `message_templates`, `period_settings`, `property_settings`, `ski_pass_capacity`, `ticket_categories`, julkaistut oppaat, bannerit ja tiedotteet. Näissä ei ole henkilötietoja eikä salaisuuksia — jätetään ennalleen. `message_templates` käydään läpi varmuuden vuoksi, ettei viestipohjissa ole sisäistä tietoa.

## 4. Kirjautumisasetukset

Vuotaneiden salasanojen suojaus on pois päältä. Kytketään päälle.

## 5. Admin-kirjautumisen rakenne (tiedoksi, ei tässä korjattavana)

Admin-paneeli toimii jaetulla salasanalla, joka säilyy selaimen localStoragessa. Tämä on tietoinen valinta ja toimiva, mutta pitkällä aikavälillä siirtyminen oikeaan kirjautumiseen (sähköposti + rooli `user_roles`-taulussa, joka on jo olemassa) olisi selvästi turvallisempi. Tehdään erillisenä työnä, jos haluat.

## Työjärjestys

1. `CRON_SECRET`-salaisuus käyttöön.
2. Salasana-/cron-tarkistus 10 suojaamattomaan funktioon + CORS-rajaus; admin-paneelin kutsut päivitetään vastaavasti.
3. `get-guide-wifi` rajataan.
4. Tietokantamigraatio: `EXECUTE`-oikeuden poisto `anon`-roolilta `has_role`- ja `is_admin`-funktioilta.
5. Vuotaneiden salasanojen suojaus päälle.
6. Tietoturvaskannaus uudelleen + admin-paneelin toimintojen läpikäynti selaimella, ettei mikään näkymä hajonnut.

## Mitä ei kosketa

Sivuston ulkoasu, sisältö, SEO-metatiedot, hakukoneoptimointi, varausvirta, saatavuustiedot ja analytiikka pysyvät ennallaan.
