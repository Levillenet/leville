## Ongelma

`/vuokramokit/skimbaajankuja-levi` -sivun sisältö tulee `src/data/street-hubs.ts`:n Skimbaajankuja-objektista. Sen kentissä sanotaan Karhupirtin sijaitsevan Etelärinteellä:

- rivi 68 `h1`: "... 14 hengen hirsihuvila **Etelärinteellä**"
- rivi 71 `metaDescription`: "... sauna ja takka **Etelärinteellä**"
- rivi 73 `locationLabel`: "**Etelärinne**, keskusta"

Kävin läpi koko repon (`src`, `public`) hakusanoilla "Etelärinne / south slope / Skimbaajankuja / Karhupirtti / Bear Lodge": muualla Karhupirtti kuvataan jo oikein Levin keskustaksi (esim. `propertyTranslationsFi.ts`, `llms.txt`, `Majoitukset.tsx`). Muut osumat "Etelärinteeseen" koskevat muita kohteita tai yleisiä rinneoppaita, joihin ei kosketa.

## Korjaus

Muokataan vain nämä kolme kenttää `src/data/street-hubs.ts`:ssa:

1. `h1` → "Bear Lodge / Karhupirtti Levi – 14 hengen hirsihuvila Levin keskustassa"
2. `metaDescription` → "...oma ulkoporeallas, sauna ja takka Levin keskustassa päärinteen tuntumassa. 7 makuuhuonetta – varaa suoraan ilman välityspalkkioita." (alle 160 merkkiä)
3. `locationLabel` → "Levin keskusta, päärinteen alue"

Lisäksi tarkistetaan intro-tekstin (rivit 78–79) ja fakta-listan (84–87) johdonmukaisuus: ne puhuvat jo keskustasta ja Front Slope -rinteistä, joten ne jäävät ennalleen.

Muuta sisältöä, rakennetta tai layoutia ei muuteta.