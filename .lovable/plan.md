## Tavoite

Lisätään uusi Skistar-talon huoneisto **310** koko sivustolle samalla mallilla kuin 209 ja 210 — sama Postintie 3 -rakennus, sama 1MH/Superior-tyyppi, samat kuvat, oma huoneistokortti, ristilinkit, sitemap ja Moder-varauslinkki `https://app.moder.fi/levillenet/11960?step=1`.

## Muutokset

**1. `src/data/properties.ts`** — uusi entry 209/210:n mallin mukaan:
- `id: "310"`, `slug: "skistar-310"`, `name: "Levi Centre Superior 310"`
- `address: Postintie 3, 99130 Sirkka`, `location: "Levi Center"`, `type: "1-bedroom"`
- `bookingUrl: https://app.moder.fi/levillenet/11960?step=1`
- 16 kuvaa samasta `/skistar/kaksio/`-galleriasta kuin 209/210
- `heroImage: /skistar/kaksio/03.jpg` (eri kuin 209=05 ja 210=02, ettei kortit näytä identtisiltä)
- `sqm 43`, `bedrooms 1`, `beds 2`, `extraBeds 2`, `maxGuests 4`, `guestRange "1-4"`
- `sauna: true`, `fireplace: false`, `petsAllowed: false`
- `accessible: false` (310 on 3. kerroksessa, ei ole askeleeton — poikkeaa 209/210:sta)
- Samat `highlights` ja `Built 2020`

**2. `src/data/propertyTranslationsFi.ts` ja `propertyTranslationsEn.ts`** — kopioidaan 209:n käännökset uudelle `"skistar-310"`-avaimelle, päivitetään huoneiston numero tekstiin, poistetaan mahdolliset "esteetön kulku" -maininnat (310 on 3. kerroksessa).

**3. `src/data/propertyTranslationStatus.ts`** — lisätään `"skistar-310": ["fi", "en"]`.

**4. `src/data/street-hubs.ts`** — Postintie-hubin `propertySlugs`-listaan `"skistar-310"`, päivitetään intron "9 huoneistoa" → "10 huoneistoa" ja `facts`-blokin määrä 9→10.

**5. `src/pages/Majoitukset.tsx`** — Skistar-ryhmän id-listaan (rivit 391 ja 418) lisätään `"310"`, subtitle "9 kohdetta"/"9 properties" → "10".

**6. `src/pages/PropertyDetail.tsx`** — rivin 317 skistar-id-listaan lisätään `"310"`.

**7. `src/pages/LevinKeskustahuoneistot.tsx`** — 209/210-maininnat säilyvät esteettöminä (310 ei ole), mutta 310 lisätään yleisiin Skistar-listauksiin luonnollisissa kohdissa.

**8. `src/pages/en/apartments/ApartmentsFor4.tsx` ja `LeviCenterApartments.tsx`** — 310 mainitaan 209/210:n rinnalla samankokoisena vaihtoehtona, mutta EI esteettömien joukossa.

**9. `src/data/propertyDetails.ts`** — uusi rivi:
```
{ id: "TBD-310", name: "Skistar 310 Superior Apartment", cleaningFee: 60, bookingUrl: "https://app.moder.fi/levillenet/11960?step=1", linenFee: 19, maxGuests: 4, ..., category: 'skistar', ... }
```
Kentän `id` (= Beds24 roomId) tarkka arvo ei ole vielä tiedossa. Käytetään placeholderiä `"TBD-310"`, jonka voit vaihtaa yhdellä muokkauksella heti kun Beds24 antaa oikean roomId:n. Ilman oikeaa Beds24 ID:tä admin-hintaoverridet eivät kohdistu 310:een, mutta muut toiminnot toimivat.

**10. `public/sitemap.xml`** — lisätään `/majoitukset/skistar-310` ja `/en/accommodations/skistar-310` FI+EN hreflang-pareina 210:n mallin mukaan.

## Beds24 / Äkkilähdöt

`supabase/functions/beds24-availability` hakee huoneet **suoraan Beds24 API:sta** ilman staattista mappingia (`src/pages/Akkilahdot.tsx:69` kutsuu funktiota, joka lukee kaikki Beds24-huoneet dynaamisesti). Kun 310 on lisätty Beds24-tilillesi, se ilmestyy automaattisesti äkkilähtöihin — ei koodimuutoksia tarvita.

## Mitä EI muuteta

- Ei uusia reittejä eikä komponentteja — `/majoitukset/skistar-310` ja `/en/accommodations/skistar-310` toimivat heti olemassa olevan `PropertyDetail`-reitin kautta.
- Ei muuteta JSON-LD-rakennetta, muiden huoneistojen sisältöjä, hintalupauksia tai admin-puolta.
