# Holiday rental -rikastetuloksen korjaus (Google Search Console)

Search Console raportoi etusivulta virheellisen "Holiday rental" -kohteen nimeltä
"Levi Apartments by Leville.net": puuttuu `identifier`, `containsPlace`, `geo` ja `image`.

## Syy (varmistettu koodista)

`src/components/StructuredData.tsx` lisää jokaiselle sivulle (paitsi kohde- ja katuhub-sivuille)
geneerisen `VacationRental`-schemaan, jossa on vain nimi, alternateName-lista, osoite ilman katua
ja kolme amenity-riviä. Se ei kuvaa yhtä oikeaa vuokrakohdetta, joten Google merkitsee sen
virheelliseksi. Oikeat kohdekohtaiset schemat ovat `src/components/PropertySchema.tsx`:ssä.

## Muutokset

### 1. Poista virheellinen sivustonlaajuinen VacationRental
- `StructuredData.tsx`: poistetaan `getVacationRental()` ja sen käyttö.
- Jäljelle jäävät `WebSite` ja `LodgingBusiness`, jotka ovat oikeat sivustotason tyypit.
- Etusivun brändinimet (Glacier, Bearlodge, Skistar jne.) siirretään `LodgingBusiness`-schemaan
  `alternateName`-kenttään, jottei brändisignaalia menetetä.

### 2. Lisää koordinaatit rakennuksittain
- Haetaan koordinaatit Google Maps -geokoodauksella seitsemälle osoitteelle:
  Hiihtäjänkuja 2 ja 5, Ratsastajankuja 2, Skimbaajankuja 3 ja 4, Postintie 3, Leviraitti.
- Tallennetaan kiinteinä arvoina uuteen taulukkoon `src/data/buildingGeo.ts` (ei ajonaikaisia
  API-kutsuja, ei kuluja).
- `PropertyDetail.tsx` ja `StreetHub.tsx` välittävät koordinaatit schemaan osoitteen perusteella.

### 3. Täydennä kohdesivujen VacationRental
- `identifier`: kohteen slug (esim. `zero-point-5a2`) — vaadittu kenttä.
- `image`: nostetaan 3 → enintään 12 kuvaa absoluuttisina URL-osoitteina.
- `containsPlace`: on jo mukana; varmistetaan että se tulee myös silloin kun vuodetietoja puuttuu.
- `description`: varmistetaan että kentässä on aina sivun oma kuvaus.
- Ei lisätä `offers`- tai `aggregateRating`-kenttiä (ei todennettua hinta- tai arvosteludataa).

### 4. Katuhub-sivut
- `ApartmentComplex`-schemaan lisätään `identifier` (hubin slug) ja rakennuksen `geo`.

## Mitä EI tehdä
- Ei kosketa otsikoihin, kuvauksiin, canonicaleihin eikä näkyvään ulkoasuun.
- Ei keksitä hintoja, arvosteluja eikä koordinaatteja ilman geokoodausta.

## Varmistus
- Typecheck + build.
- Playwright: luetaan JSON-LD reiteiltä `/`, `/majoitukset/zero-point-5a2` ja yhdeltä katuhubilta,
  ja tarkistetaan että vaaditut kentät ovat mukana ja ettei etusivulla ole enää VacationRentalia.
- Julkaisun jälkeen: Search Consolen URL-tarkastus → "Pyydä indeksointia" etusivulle ja yhdelle
  kohdesivulle. Rikastetulostilan päivittyminen kestää yleensä muutamia päiviä.
