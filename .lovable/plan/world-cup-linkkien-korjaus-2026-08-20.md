# World Cup -linkkien korjaus

## Tavoite
1. Event-kalenterin "Lue lisää" -linkki ohjaa nyt Leville.netin omalle World Cup Levi -oppaalle (ei levi.fi:n ulkoiselle sivulle).
2. Uudelle World Cup Levi -oppaalle lisätään linkki Levin viralliselle World Cup -sivulle.

## Muutokset

### 1. `src/components/guide/EventTimeline.tsx`
- Muuta World Cup -tapahtuman `url` kielitietoiseksi: `/opas/world-cup-levi` (FI) ja `/guide/levi-world-cup` (EN).
- Päivitä `LeviEvent`-rajapinta ja `EventCard` tukemaan kielikohtaista URL:ää, jotta muutkin tapahtumat toimivat oikein eri kielillä.

### 2. `src/pages/guide/WorldCupLevi.tsx`
- Lisää lause/tekstilinkki, joka vie Levin viralliselle World Cup -sivulle: `https://www.levi.fi/en/events/fis-ski-alpine-world-cup-levi/`.
- Linkki sijoitetaan esimerkiksi ohjelma- tai lippuosioon, jotta se löytyy helposti.

## Tarkistus
- Käännetään TypeScript-virheettömästi (`bunx tsc --noEmit`).
- Varmistetaan, että FI- ja EN-reitit ovat olemassa `src/App.tsx`:ssä.
