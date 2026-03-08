

## Ongelma

Kaksi erillistä ongelmaa:

### 1. FI-polku ei täsmää tietokannassa
- `routeConfig` käyttää polkua `/opas/paras-aika-nahda-revontulet-levi` (sisältää "nahda")
- Tietokannassa julkaistu polku on `/opas/paras-aika-revontulet-levi` (ilman "nahda")
- Dynaaminen reititys lataa sivun tietokannan polulla → `/opas/paras-aika-nahda-revontulet-levi` palauttaa 404

### 2. Kielenvaihtaja ei toimi (kaikki kielet → EN)
- `routeConfig.bestTimeNorthernLights` ohjaa SV, DE, ES, FR, NL kaikki samaan EN-polkuun `/guide/best-time-to-see-northern-lights-levi`
- Tietokannassa on kuitenkin oikeat lokalisoidut polut jokaiselle kielelle (esim. NL → `/nl/gids/beste-tijd-noorderlicht-levi`)

Sama ongelma koskee **kaikkia 7 revontuli-alasivua** routeConfigissa (rivit 103–109).

## Korjaukset

### Tiedosto: `src/translations/index.ts`

Päivitä `routeConfig` riveillä 103–109 niin, että:
1. FI-polku `bestTimeNorthernLights` korjataan muotoon `/opas/paras-aika-revontulet-levi` (ilman "nahda") vastaamaan tietokantaa
2. Kaikki 7 revontuli-alasivua saavat oikeat lokalisoidut polut tietokannasta:

```typescript
bestTimeNorthernLights: { fi: "/opas/paras-aika-revontulet-levi", en: "/guide/best-time-to-see-northern-lights-levi", sv: "/sv/guide/basta-tiden-norrsken-levi", de: "/de/ratgeber/beste-zeit-nordlichter-levi", es: "/es/guia/mejor-momento-auroras-boreales-levi", fr: "/fr/guide/meilleur-moment-aurores-boreales-levi", nl: "/nl/gids/beste-tijd-noorderlicht-levi" },
northernLightsSeason: { fi: "/opas/revontulisesonki-levi", en: "/guide/northern-lights-season-levi", sv: "/sv/guide/norrsken-sasong-levi", de: "/de/ratgeber/nordlichter-saison-levi", es: "/es/guia/temporada-auroras-boreales-levi", fr: "/fr/guide/saison-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-seizoen-levi" },
northernLightsForecast: { fi: "/opas/revontuliennuste-levi", en: "/guide/northern-lights-forecast-levi", sv: "/sv/guide/norrsken-prognos-levi", de: "/de/ratgeber/nordlichter-vorhersage-levi", es: "/es/guia/prevision-auroras-boreales-levi", fr: "/fr/guide/prevision-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-verwachting-levi" },
whereToSeeNorthernLights: { fi: "/opas/missa-nahda-revontulet-levi", en: "/guide/where-to-see-northern-lights-levi", sv: "/sv/guide/var-se-norrsken-levi", de: "/de/ratgeber/wo-nordlichter-sehen-levi", es: "/es/guia/donde-ver-auroras-boreales-levi", fr: "/fr/guide/ou-voir-aurores-boreales-levi", nl: "/nl/gids/waar-noorderlicht-zien-levi" },
northernLightsPhotography: { fi: "/opas/revontulien-valokuvaus-levi", en: "/guide/northern-lights-photography-levi", sv: "/sv/guide/fotografera-norrsken-levi", de: "/de/ratgeber/nordlichter-fotografieren-levi", es: "/es/guia/fotografiar-auroras-boreales-levi", fr: "/fr/guide/photographier-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-fotograferen-levi" },
howNorthernLightsForm: { fi: "/opas/miten-revontulet-syntyvat", en: "/guide/how-northern-lights-form", sv: "/sv/guide/hur-uppstar-norrsken", de: "/de/ratgeber/wie-entstehen-nordlichter", es: "/es/guia/como-se-forman-auroras-boreales", fr: "/fr/guide/comment-se-forment-aurores-boreales", nl: "/nl/gids/hoe-ontstaat-noorderlicht" },
northernLightsColors: { fi: "/opas/revontulien-varit", en: "/guide/northern-lights-colors-explained", sv: "/sv/guide/norrskens-farger", de: "/de/ratgeber/farben-der-nordlichter", es: "/es/guia/colores-auroras-boreales", fr: "/fr/guide/couleurs-aurores-boreales", nl: "/nl/gids/kleuren-van-noorderlicht" },
```

### Tiedosto: `src/pages/guide/BestTimeNorthernLightsLevi.tsx`

Tarkistetaan, että komponentin canonical URL ja hreflang-tagit käyttävät oikeaa polkua `/opas/paras-aika-revontulet-levi`. (Rivi 33 näyttää jo oikean polun, joten tämä on ok.)

### Yhteenveto
- 1 tiedosto muokataan: `src/translations/index.ts` (rivit 103–109)
- Korjaa FI-sivun 404-ongelman tuotannossa
- Korjaa kielenvaihtajan kaikissa 7 revontuli-alasivussa kaikille 7 kielelle

