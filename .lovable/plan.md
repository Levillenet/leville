

## Golf-sivun kuvapäivitys

Lisätään 4 golfikuvaa sivulle `src/pages/activities/GolfLevi.tsx`.

### Kuvat ja sijoittelu

1. `DJI_0390-2.JPG` → `src/assets/activities/golf-aerial-fells.jpg` — Hero-kuva intron jälkeen
2. `IMG_20200829_160212-2.jpg` → `src/assets/activities/golf-player-sun.jpg` — Club-osion jälkeen
3. `DJI_0384-2.JPG` → `src/assets/activities/golf-aerial-fairways.jpg` — Midnight sun -osion jälkeen
4. `IMG_20200829_174300-2.jpg` → `src/assets/activities/golf-green-close.jpg` — Course info -osion jälkeen

### Toteutus

**Tiedosto: `src/pages/activities/GolfLevi.tsx`**

1. Kopioidaan 4 kuvaa `src/assets/activities/`-kansioon
2. Importoidaan `OptimizedImage` ja 4 kuvatiedostoa
3. Lisätään `images`-avain käännösobjekteihin (FI/EN) alt-teksteillä ja kuvateksteillä
4. Lisätään 4 kuvaosio osioiden väliin tyylillä `rounded-xl overflow-hidden`, `aspect-video`, kuvateksti `text-sm text-muted-foreground italic text-center`

