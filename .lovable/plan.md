# Äkkilähtöjen 1 yön hinta korjataan (Moder)

## Mistä 120 € tulee

Testasin Moderin hinnat kohteelle Skistar 310 (room type 11960), saapuminen 14.9.2026:

| Yötä | Moder palauttaa | Tarkistuslaskelma |
|---|---|---|
| 2 | 120 € | (80+80) × 1,24 (LOS 2 yötä +24 %) × 0,60 (sääntö "ruska" −40 %) = 119 € |
| 3 | 159 € | (80+80+80) × 1,11 × 0,60 = 160 € |
| 4 | 190 € | (80+80+80+99) × 0,93 × 0,60 = 189 € |
| 6 | 267 € | vastaavasti |

Eli Moderin hinnoittelu toimii täsmälleen kuten kuvasi näyttävät: päivähinnat + keston mukainen muutos-% + hintasääntö.

**Ongelma:** äkkilähtösivun 1 yön haku ei kysy Moderilta 1 yön hintaa. Nykyinen koodi (`supabase/functions/moder-availability/index.ts`, mode=prices) muuttaa 1 yön kyselyn automaattisesti 2 yön kyselyksi, koska aiemmin oletettiin ettei Moder anna 1 yön hintaa. Siksi kortti näyttää 14.9.–15.9. hintana 120 € (= kahden yön hinta) + siivous 60 € = 180 €.

Oikea 1 yön hinta olisi 80 € × 0,60 = **48 €** (ei keston muutos-%, koska sääntötaulussa kesto alkaa 2 yöstä) → 48 + 60 siivous = 108 €, alennuksineen vähemmän.

## Mitä tehdään

1. **Poistetaan 1 yö → 2 yötä -kikka.** 1 yön haku kysyy Moderilta aidon 1 yön hinnan (`date_start` = saapuminen, `date_end` = seuraava päivä).
2. **Varajärjestely, jos Moder ei palauta 1 yön hintaa:** hinta lasketaan saapumispäivän omasta `day_rate`-hinnasta (sama luku, jonka Moder antaa saatavuusrajapinnassa), ei koskaan kahden yön summasta. Jos kumpikaan ei anna hintaa, kohdetta ei näytetä 1 yön haussa lainkaan – parempi jättää pois kuin näyttää väärä hinta.
3. **Vastauksessa kerrotaan mistä hinta tuli** (`pricedNights` ja lähde), jotta jatkossa on heti nähtävissä käyttääkö kortti aitoa vai laskettua hintaa.
4. **Beds24 pois nimistä.** Äkkilähdöt hakevat jo kaiken datan Moderista – Beds24-rajapintaa ei enää kutsuta. Jäljellä on vain vanhoja nimiä (`Beds24Deal`, `fetchBeds24Availability`, `beds24_room_id`-avain). Siistitään koodin nimet Moder-muotoon niin ettei kukaan luule Beds24:ää yhä käytettävän. Tietokannan sarakenimi `beds24_room_id` jätetään ennalleen, koska se on kohteen tunniste useassa muussakin taulussa – vain sen käyttö dokumentoidaan kommentilla.

## Tarkistus toteutuksen jälkeen

- Haku 14.9.–15.9.2026: Skistar 310 näyttää 1 yön hinnan, joka vastaa Moderia (n. 48 € + siivous), ei 120 €.
- Haku 14.9.–16.9.2026 (2 yötä) pysyy 120 € + siivous.
- Pidemmät jaksot (3, 4, 6 yötä) pysyvät ennallaan.

## Tekniset yksityiskohdat

- `supabase/functions/moder-availability/index.ts`: `mode=prices` -haarasta poistetaan `priceTo = nightsRequested === 1 ? addDays(from, 2) : to`; lisätään 1 yön fallback saatavuusdatan `day_rate`-kentästä (`parseAvailabilities` tuottaa jo `dayRate`).
- `src/pages/Akkilahdot.tsx`: `getModerPrice`/`getTotalPrice` eivät muutu logiikaltaan, mutta `null`-hinta piilottaa kortin nykyiseen tapaan; tyyppien ja funktioiden uudelleennimeäminen (`ModerDeal`, `fetchModerAvailability`).
- Funktio deployataan muutoksen jälkeen; saatavuusvälimuisti ei vaikuta `mode=prices`-hakuun.
