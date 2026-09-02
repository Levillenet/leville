# Hintatarkistus-työkalu äkkilähtöasetuksiin

Uusi työkalu adminin äkkilähtöasetuksiin, jolla näet rivi riviltä miten minkä tahansa kohteen hinta muodostuu valitulle ajanjaksolle.

## Mitä työkalu tekee

1. Valitset ajanjakson (esim. 14.9.–16.9.2026) ja yhden, useamman tai kaikki kohteet.
2. Työkalu tekee saman kyselyn Moderiin kuin äkkilähtösivu (`mode=prices`) juuri sille jaksolle.
3. Tulos näytetään taulukkona, jossa jokaiselle kohteelle on oma rivi ja avattava laskelma:

```text
Glacier A6 (504858)             2 yötä  14.9.–16.9.2026
  Moderin jaksohinta (LOS 2 yötä)                288 €
  Perusalennus (10 %)                          − 28,80 €
  Superäkkilähtö (saapumiseen 12 pv → 0 %)      − 0,00 €
  Jaksokohtainen lisäalennus (asetukset)        − 0,00 €
  ─────────────────────────────────────────────────────
  Asiakkaan hinta                                259 €
  Per yö                                      129,60 €
  Siivousmaksu: sisältyy Moderin hintaan (ei lisätä)
  Huom: vapaana 14.9.–16.9., minimiyöt Moderista 2
```

4. Rivillä näkyy myös miksi kohde ei näy äkkilähdöissä, jos näin on: minimiyömäärä ei täyty, ei vapaata jaksoa, gap fill -sääntö ei vielä auki, hintaa ei saada Moderista.
5. Erikoistapaukset merkitään selvästi: 1 yön haussa käytetään Moderin 2 yön hintaa jaettuna kahdella (Moder ei hinnoittele yhtä yötä), jolloin rivillä lukee "1 yön hinta johdettu 2 yön hinnasta".
6. Vertailua varten näytetään myös Moderin päivähinta (`day_rate`) samalle jaksolle, jolloin näet suoraan, johtuuko outo hinta Moderin LOS-hinnoittelusta (esim. Skistar 310 kalliimpi kuin Glacier) vai omista alennuksista.

## Sijainti ja käyttö

- Uusi osio "Hintatarkistus" äkkilähtöasetusten alle adminissa.
- Kohdevalinta: hakukenttä + valintaruudut, painike "Valitse kaikki".
- Painike "Tarkista hinnat" tekee tuoreen Moder-kyselyn (ei välimuistia).
- Tulokset voi kopioida leikepöydälle tekstinä, jotta hintaepäselvyyden voi lähettää eteenpäin.

## Tekniset yksityiskohdat

- Uusi komponentti `src/components/admin/DealsPriceCheck.tsx`, upotetaan `SiteSettingsAdmin.tsx`-osioon äkkilähtöasetusten perään.
- Data:
  - `moder-availability?mode=prices&from=YYYY-MM-DD&to=YYYY-MM-DD&debug=true` → Moderin LOS-jaksohinnat per Beds24-roomId.
  - `moder-availability` (listaus) → vapaat jaksot, `minNights`, `isGap`, `windowNights` syyksi näkyvyydelle.
  - Kohdenimet ja tiedot: `getAllPropertyDetailsWithOverride` + `property_settings`.
  - Asetukset: `deals_base_discount`, `deals_super_discount`, `deals_discount_one_night`, `deals_gap_fill`, `deals_days_ahead` (`site_settings`).
  - Jaksokohtaiset alennukset: `period_settings`.
- Edge-funktioon `moder-availability` lisätään `mode=prices`-vastaukseen valinnainen `debug`-lohko: raaka `day_rate` per yö ja Moderin `total_price` per pituus (1–7 yötä) valituille kohteille. Olemassa oleva vastausrakenne säilyy ennallaan, jotta äkkilähtösivu ei muutu.
- Laskenta käyttää samaa logiikkaa kuin `Akkilahdot.tsx` (`getSuperDiscountPct`, perusalennus, 1 yön sääntö). Logiikka siirretään jaettuun apumoduuliin `src/lib/dealPricing.ts`, jonka sekä äkkilähtösivu että hintatarkistus tuovat, jotta hinnat eivät voi erota toisistaan.
- Vain admineille (sama suojaus kuin muut asetukset). Asiakassivuun ei tehdä muutoksia.
