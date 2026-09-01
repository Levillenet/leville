# Moder API:n hinta- ja saatavuushaut äkkilähtöihin

## Vastaus: kyllä saa

Moderin julkisen rajapinnan dokumentaatiossa (Swagger) on suoraan kaksi sopivaa endpointia:

- `GET /api/v1/availabilities?date_start&date_end&room_types[]` — päiväkohtainen saatavuus per huoneistotyyppi: `is_free`, `free_rooms`, `day_rate`, `min_nights`, `checkin_denied`, `blackout`.
- `GET /api/v1/prices?room_types[]&date_start&date_end&guests_adults` — kokonaishinta (`total_price`) ja päivähinnat valitulle jaksolle.

Autentikointi on yksinkertainen `Authorization: Bearer <token>` — ja `MODER_API_TOKEN` on jo tallennettuna backendin salaisuuksiin, eli avaimet ovat kunnossa.

## Mitä nyt tapahtuu (tausta)

Äkkilähdöt-sivu hakee hinnat ja saatavuuden nykyään Beds24:stä edge-funktiolla `beds24-availability`. Siinä on havaittuja puutteita: hinnat haetaan yksi tarjous kerrallaan (hidas, paljon API-kutsuja) ja osa tarjouksista jää ilman hintaa. Moderista sekä saatavuus että hinta saadaan yhdellä/kahdella kutsulla koko joukolle huoneistotyyppejä kerralla.

Kannassa on jo valmiina `moder_property_mapping`-taulu, jossa lähes kaikilla kohteilla on `moder_room_type_id` — vain Karhupirtti ja Skistar 322 puuttuvat (ohitetaan, jäävät Beds24:lle).

## Mitä tehdään

1. **Laajennetaan `beds24-availability`-edge-funktiota Moder-lähteellä** (nimetään uudelleen sisäisesti, mutta funktion URL säilyy samana, joten etupään muutoksia ei tarvita):
   - Luetaan `moder_property_mapping`-taulusta ne kohteet, joilla on `moder_room_type_id`.
   - Kutsutaan `GET /api/v1/availabilities` kaikille mapped-tyypeille seuraaville 28 päivälle (sama `deals_days_ahead`-ikkuna).
   - Muodostetaan vapaat jaksoja samalla logiikalla kuin nykyinen Beds24-käsittely (min. 1 yö, `min_nights` huomioiden).
   - Haetaan `GET /api/v1/prices` jaksoille ja lasketaan kokonaishinta.
   - **Yhdistelmästrategia: Moder ensisijainen, Beds24 varalla.** Jos Moder vastaa kohteelle, käytetään sitä; muutoin käytetään nykyistä Beds24-dataa (esim. Karhupirtti, Skistar 322). Jos Moder-kutsu epäonnistuu kokonaan, palataan täysin Beds24:ään — sivu ei koskaan tyhjene.
   - Hinnat välitetään sentteinä API:sta, jaetaan 100:lla euroiksi.
2. **Välimuisti säilyy:** Moder-vastaus tallennetaan samaan `beds24_cache`-tauluun omalla id:llä (esim. `moder_availability`), jolloin Beds24:n rate limit -suojauslogiikka kattaa myös Moderin. Ei uusia tauluja.
3. **Salaisuudet:** `MODER_API_TOKEN` luetaan edge-funktiossa `Deno.env.get()` — ei koodiin, ei lokille.
4. **Varauslinkit säilyvät ennallaan:** äkkilähtökortit jatkavat ohjausta Moderin varausmoottoriin nykyisten URLien kautta. Etusivun hakubanneriin EI kosketa.

## Varmistus

- Kutsutaan edge-funktiota ja tarkistetaan, että vastauksessa on Moder-lähtöisiä tarjouksia oikeilla hinnoilla.
- Playwright: `/akkilahdot` näyttää kortit eikä tyhjä-tilaa; console ilman virheitä.
- Käännetty varoitus: jos yksikään Moder-kutsu heittää virheen, lokiin tulee selkeä rivi ja fallback toimii.

## Tekniset yksityiskohdat

- Base-URL: dokumentaatio näkyy osoitteessa `dev-app.moder.fi`; tuotanto-osoite varmistetaan ensimmäisellä testikutsulla (todennäköisesti `https://app.moder.fi`). Jos tuotanto ei vastaa, käytetään dev-pohjaa toistaiseksi — dokumentoitu funktioon.
- Muutettavat tiedostot: `supabase/functions/beds24-availability/index.ts` (laajennus). Etupää: ei muutoksia.
- `room_types[]` välitetään query-muodossa `room_types[]=318&room_types[]=319...` (standardi taulukkoparametri).
- `guests_adults` oletuksena 2, sama kuin nykyisessä Beds24-offer-haussa.
