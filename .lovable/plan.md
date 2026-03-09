

# Puhelinmallien poisto revontulivalokuvaussivulta

## Ongelma
Sivulla mainitaan spesifejä puhelinmalleja (iPhone 15+, Samsung S24+, Pixel 8+, Google Pixel) useissa kohdissa. Nämä vanhenevat nopeasti ja halutaan yleisluontoisempi teksti.

## Muutettavat kohdat (kaikki tiedostossa `src/pages/guide/NorthernLightsPhotographyLevi.tsx`)

### 1. Ensimmäinen osio ("Tarvitsetko kameran") — 7 kieltä
Poistetaan puhelinmalliviittaukset alkutekstistä:
- **FI** (rivi 33): `"Moderni puhelin (iPhone 15+...)"` → `"Moderni puhelin kuvaa revontulia yllättävän hyvin yötilassa ja usein ihan automaatillakin."`
- **EN** (rivi 134): Vastaava englanniksi
- **NL** (rivi 168): Hollanniksi
- **SV** (rivi 202): Ruotsiksi
- **DE** (rivi 236): Saksaksi
- **ES** (rivi 270): Espanjaksi
- **FR** (rivi 304): Ranskaksi

### 2. Puhelimella kuvaaminen -osio — 7 kieltä
Poistetaan iPhone/Samsung/Pixel-kohtaiset ohjeet ja korvataan yleisluontoisemmalla ohjeistuksella:
- **FI** (rivi 77): Poistetaan `**iPhone (15 ja uudemmat):**` ja `**Android (Samsung, Pixel, jne.):**` -kappaleet, korvataan yleisohjeella
- **EN** (rivi 138): Vastaavasti
- **NL** (rivi 172): Vastaavasti
- **SV** (rivi 206): Vastaavasti
- **DE** (rivi 240): Vastaavasti
- **ES** (rivi 274): Vastaavasti
- **FR** (rivi 308): Vastaavasti

### 3. UKK/FAQ — 7 kieltä
Poistetaan "iPhone" ja "Android" maininnat vastauksista:
- **FI** (rivi 111): `"uusimmat iPhone- ja Android-puhelimet"` → `"modernit puhelimet"`
- **EN** (rivi 145): Vastaavasti
- **NL** (rivi 179): Vastaavasti
- **SV** (rivi 213): Ei malleja mainittuna, OK
- **DE** (rivi 247): Ei malleja, OK
- **ES** (rivi 281): Ei malleja, OK
- **FR** (rivi 315): Ei malleja, OK

## Yhteensä
Yksi tiedosto, noin 20 tekstimuutosta kaikissa 7 kielessä.

