# Gap Fill: väliin jäävien öiden täyttölogiikka äkkilähtöihin

## Idea

Gap = kahden varauksen väliin jäävä vapaa jakso. Gap Fill -säännöt saavat ohittaa kohteen normaalin minimiyöpymisen. Muut (ei-gap) vapaat jaksot noudattavat edelleen Moderin minimiyöpymistä normaalisti.

## Säännöt

**1 yön gap**
- Voidaan aina myydä 1 yön varauksena, minimiyöpymisestä riippumatta.
- Ei omaa ennakkoaika-asetusta: näkyy koko äkkilähtöikkunan ajan (asetus "Näytä äkkilähtöjä X päivää eteenpäin").

**2 yön gap**
- Koko 2 yön gap myydään aina ensisijaisesti (ohittaa minimiyöpymisen).
- Jos koko gapia ei ole myyty, 1 yön myynti avautuu vasta kun saapumiseen on enintään X päivää (käyttäjän asetus).

**3 yön gap**
- Koko 3 yön gap ensisijaisesti.
- 2 yön varaus avautuu, kun saapumiseen on enintään X päivää.
- 1 yön varaus avautuu, kun saapumiseen on enintään Y päivää (Y ≤ X).

**Yli 3 yön vapaat jaksot**
- Ei gap fill -poikkeusta: normaali minimiyöpyminen pätee (koko gapin voi silti varata kokonaan).

## Asetukset (admin → Äkkilähdöt)

Uusi "Gap Fill" -osio:

```text
1 yön gap
  [x] Salli 1 yön gap fill        (myynti sallittu koko äkkilähtöikkunan ajan)

2 yön gap
  [x] Salli 2 yön gap fill
  [x] Salli 1 yön varaus, jos koko gapia ei ole myyty   [ X ] päivää ennen saapumista

3 yön gap
  [x] Salli 3 yön gap fill
  [x] Salli 2 yön varaus, jos koko gapia ei ole myyty   [ X ] päivää ennen saapumista
  [x] Salli 1 yön varaus, jos gapia ei edelleen ole myyty [ Y ] päivää ennen saapumista
```

Validoinnit: päiväarvot 0–30; 3 yön gapin 1 yön raja (Y) ei voi olla suurempi kuin 2 yön raja (X) — arvo rajataan automaattisesti ja käyttäjälle näytetään huomautus. Kytkimen ollessa pois kyseinen lyhennys ei aukea koskaan.

## Tekniset yksityiskohdat

- Uusi `site_settings`-rivi `deals_gap_fill`, arvo JSON:
  `{ "g1": true, "g2": { "enabled": true, "oneNight": { "enabled": true, "days": 5 } }, "g3": { "enabled": true, "twoNights": { "enabled": true, "days": 7 }, "oneNight": { "enabled": true, "days": 3 } } }`
  Lisätään `supabase/functions/admin-settings/index.ts` -haun sallittujen id:iden listaan (rivi 95).
- `src/components/admin/SiteSettingsAdmin.tsx`: uusi Gap Fill -kortti (Switchit + Input-kentät), tallennus `updateSiteSetting`-kutsuilla kuten muutkin asetukset.
- `src/pages/Akkilahdot.tsx`:
  - Uusi `gapFill`-memo lukee asetuksen `adminSettings.siteSettings`-listalta oletusarvoilla.
  - `isStayAllowed` korvataan funktiolla `evaluateStay(deal, checkIn, nights)`, joka palauttaa `{ allowed, reason }`:
    - Perusehdot ennallaan: mahtuu ikkunaan, `noCheckIn`, `noCheckOut`.
    - Ei-gap-ikkuna: `nights >= minNights` → `reason: "min-nights"` / `"below-min-nights"`.
    - Gap-ikkuna, `nights === windowNights` (koko gap): sallittu kun kyseinen taso on päällä (`g1`/`g2.enabled`/`g3.enabled`, yli 3 yön gapissa normaali minimiyö) → `reason: "gap-full"`.
    - Gap 2 yötä, `nights === 1`: sallittu jos `g2.oneNight.enabled` ja `daysUntil(checkIn) <= days` → `reason: "gap2-1n-window"`.
    - Gap 3 yötä, `nights === 2`: `g3.twoNights` + päiväraja → `"gap3-2n-window"`; `nights === 1`: `g3.oneNight` + päiväraja → `"gap3-1n-window"`.
    - Muussa tapauksessa palautetaan `allowed: false` ja syy (esim. `"gap-window-not-open-yet"`).
  - Hakutulokset ja "Esimerkkejä vapaista jaksoista" -kortit käyttävät samaa funktiota, joten säännöt vaikuttavat oikeasti myytävään saatavuuteen.
- Debug: `console.debug`-lokit muodossa `[gapfill] room=<id> in=<pvm> nights=<n> window=<n> gap=<bool> minNights=<n> daysUntil=<n> -> <allowed>/<reason>`, kirjataan vain kun `?debug=gapfill` on URL:ssa, jotta tuotantokonsoli pysyy siistinä.
- Hinnoittelu ja alennukset ennallaan.

## Varmistus

- `tsgo --noEmit` puhtaana.
- Playwright `/akkilahdot?debug=gapfill`: tarkistetaan konsolilokeista, että 1 yön gap näkyy, 2 yön gapin 1 yön jakso avautuu vasta rajan sisällä ja 3 yön gapin portaat toimivat.
- Adminissa asetusten tallennus ja uudelleenlataus.
