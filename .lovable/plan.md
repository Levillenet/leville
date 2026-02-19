
# Moonlight 415 (roomId 645946) puuttuu kohdelistasta

## Ongelma

Beds24-jarjestelmassa Moonlight 415 -huoneisto on kahdella eri roomId:lla:
- `625005` (Room 5) -- taalta loytyy property_settings-taulusta siivousmaksu 59 EUR, mutta talla roomId:lla ei ole vapaita jaksoja
- `645946` (Moonlight 415) -- tama nakkyy akkilahdoissa vapaana, mutta sita EI ole lisatty propertyDetails.ts-tiedostoon eika property_settings-tauluun

Koska roomId 645946 puuttuu kokonaan, siivousmaksu on 0 EUR ja hinta naytetaan pelkkana API-hintana (130 EUR).

## Ratkaisu

### 1. Lisataan roomId 645946 propertyDetails.ts-tiedostoon

Lisataan uusi rivi `defaultPropertyDetails`-taulukkoon:

```
{ id: "645946", name: "Moonlight 415", cleaningFee: 59, bookingUrl: "", linenFee: 19, maxGuests: 2, whatsappNumber: "+35844131313", ... }
```

Siivousmaksu asetetaan 59 EUR (sama kuin kayttaja on halunnut). Muu data (maxGuests, bookingUrl jne.) periytyy Room 5 -kohteen tiedoista.

### 2. Lisataan roomId 645946 property_settings-tauluun

Lisataan tietokantaan rivi `property_id = '645946'` siivousmaksulla 59 EUR ja marketing_name "Moonlight 415", jotta admin-asetukset toimivat myos talle roomId:lle.

### 3. Tarkistetaan myos vanha 625005

Room 5 (625005) nayttaa olevan samaa kohdetta -- sen available days on 0, eli silla ei ole vapaita jaksoja. Se voi jaada ennalleen.

## Vaikutus

Korjauksen jalkeen Moonlight 415:n hinta akkilahdoissa olisi:
- API-hinta (130 EUR) + siivousmaksu (59 EUR) = **189 EUR**
- Jos alennuksia on asetettu, ne lasketaan API-hinnan paalle ennen siivouksen lisaamista

## Muutettavat tiedostot

| Tiedosto | Muutos |
|---|---|
| `src/data/propertyDetails.ts` | Lisataan roomId 645946 uutena rivina |
| Tietokanta (property_settings) | Lisataan rivi property_id 645946, cleaning_fee 59 |
