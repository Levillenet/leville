

# Korjaa lumiukkokuvan asemointi ja lisää lumiukko-sisältöä

## Ongelma
`OptimizedImage`-komponentti käyttää `object-cover`-luokkaa sisäisessä `<img>`-elementissä, mutta ei tue `object-position`-arvon muuttamista. Oletuksena `object-position: center`, joka rajaa lumiukon pois kuvasta.

## Muutokset

### 1. OptimizedImage — lisää `objectPosition`-prop
**Tiedosto:** `src/components/OptimizedImage.tsx`

Lisätään valinnainen `objectPosition`-prop (esim. `"top"`, `"center bottom"`) joka välitetään img-elementin tyyliin. Oletus pysyy `center`.

### 2. LeviForKids — korjaa lumiukon asemointi
**Tiedosto:** `src/pages/activities/LeviForKids.tsx`

Lumiukkokuvalle (rivi 336) lisätään `objectPosition="top"` (tai sopiva arvo), jotta lumiukko näkyy kuvassa.

### 3. LeviForKids — lisää lumiukko/lumileikki-sisältö
**Tiedosto:** `src/pages/activities/LeviForKids.tsx`

Lumiukkokuvan kuvatekstiin lisätään tieto: kun lämpötila on 0 °C tai plussan puolella, lumesta voi muotoilla melkein mitä vaan — lumiukkoja, lumilinnoja, eläinhahmoja. Kannattaa kokeilla! Sama FI/EN.

Lisäksi päivitetään `other`-osion items-listaan maininta lumileikeistä ja lumiukkojen tekemisestä suojakeleillä.

## Muutettavat tiedostot
- `src/components/OptimizedImage.tsx`
- `src/pages/activities/LeviForKids.tsx`

