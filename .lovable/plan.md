## Tavoite

Vaihdetaan huoneiston 310 placeholder Beds24 roomId oikeaan arvoon, jotta admin-hintaoverridet ja muut Beds24-riippuvaiset toiminnot kohdistuvat oikein.

## Vahvistus Beds24:sta

Availability-endpoint palauttaa huoneen:
- `roomId: 699582`
- `roomName: "310 Skistar"`

Äkkilähdöt (`beds24-availability`) lukevat huoneet dynaamisesti, joten 310 näkyy siellä jo ilman koodimuutoksia.

## Muutos

**`src/data/propertyDetails.ts`** — vaihdetaan 310:n rivin `id: "TBD-310"` → `id: "699582"`. Muut kentät (name, cleaningFee, bookingUrl, linenFee, maxGuests, category) pysyvät ennallaan.

## Mitä ei muuteta

- Ei muita tiedostoja.
- Moder-varauslinkki (`11960`) pysyy ennallaan — se on eri järjestelmän ID kuin Beds24 roomId.
