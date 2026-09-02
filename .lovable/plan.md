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

**Ongelma:** äkkilähtösivun 1 yön haku kysyy Moderilta 2 yön **kokonaishinnan** (120 €) ja näyttää sen sellaisenaan 1 yön hintana. Tarkoitus on käyttää 2 yön hintaa **per yö** eli jakaa se kahdella: 120 € ÷ 2 = **60 €** 1 yön hinnaksi (+ siivous 60 € = 120 €, alennuksineen vähemmän).

## Mitä tehdään

1. **1 yön hinta = 2 yön hinta ÷ 2.** Säilytetään nykyinen tapa, jossa 1 yön kysely hakee Moderilta 2 yön hinnan samalle saapumispäivälle (koska 1 yölle ei ole omaa hintaa), mutta palautettava hinta jaetaan kahdella. Koska 2 yön hintaan sisältyy keston muutos-% (+24 %) ja jakaminen kahdella jakaa myös sen, päivähinta säilyy korrektina: 80 € × 1,24 × 0,60 ≈ 60 €/yö.
2. **Pyöristys**: pyöristetään lähimpään euroon kuten muuallakin (120 ÷ 2 = 60 €, esim. 119 ÷ 2 → 60 €).
3. **Vastauksessa kerrotaan mistä hinta tuli** (`pricedNights: 2, perNight: true`), jotta jatkossa on heti nähtävissä että kortin hinta on 2 yön hinta per yö.
4. **Beds24 pois nimistä.** Äkkilähdöt hakevat jo kaiken datan Moderista – Beds24-rajapintaa ei enää kutsuta. Jäljellä on vain vanhoja nimiä (`Beds24Deal`, `fetchBeds24Availability`, `beds24_room_id`-avain). Siistitään koodin nimet Moder-muotoon niin ettei kukaan luule Beds24:ää yhä käytettävän. Tietokannan sarakenimi `beds24_room_id` jätetään ennalleen, koska se on kohteen tunniste useassa muussakin taulussa – vain sen käyttö dokumentoidaan kommentilla.

## Tarkistus toteutuksen jälkeen

- Haku 14.9.–15.9.2026: Skistar 310 näyttää 1 yön hinnan, joka vastaa Moderia (n. 48 € + siivous), ei 120 €.
- Haku 14.9.–16.9.2026 (2 yötä) pysyy 120 € + siivous.
- Pidemmät jaksot (3, 4, 6 yötä) pysyvät ennallaan.

## Tekniset yksityiskohdat

- `supabase/functions/moder-availability/index.ts`: `mode=prices` -haarasta poistetaan `priceTo = nightsRequested === 1 ? addDays(from, 2) : to`; lisätään 1 yön fallback saatavuusdatan `day_rate`-kentästä (`parseAvailabilities` tuottaa jo `dayRate`).
- `src/pages/Akkilahdot.tsx`: `getModerPrice`/`getTotalPrice` eivät muutu logiikaltaan, mutta `null`-hinta piilottaa kortin nykyiseen tapaan; tyyppien ja funktioiden uudelleennimeäminen (`ModerDeal`, `fetchModerAvailability`).
- Funktio deployataan muutoksen jälkeen; saatavuusvälimuisti ei vaikuta `mode=prices`-hakuun.
