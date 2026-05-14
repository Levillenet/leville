## Yhteenveto

Lisätään `PropertyDetail`-sivun alaosaan kontekstuaalinen ristilinkkilohko, joka jakaa SEO-arvoa Levi-oppaaseen, aktiviteetteihin ja muihin majoituksiin. Tukee FI ja EN.

## Mitä rakennetaan

**Uusi komponentti:** `src/components/PropertyCrossLinks.tsx` — renderöityy `PropertyDetail.tsx`-sivun loppuun ennen footeria. Saa propsit `location` ja `currentPropertyId`.

### Lohko 1 — Suunnittele Levi-lomasi (4 linkkiä)
- Miten Leville pääsee
- Levi-opas / Levi Guide -hub
- Lomaplanneri
- Sää & lumitiedot

### Lohko 2 — Tekemistä Levillä (4 linkkiä)
- Top winter activities
- Husky safari -vinkit
- Moottorikelkkasafari -vinkit
- Hiihto- ja patikkareitit

### Lohko 3 — Samankaltaisia majoituksia (sekoitus, 3 linkkiä)
Jokaiseen huoneistoon **1 hub-linkki + 2 konkreettista huoneistoa**, jotka vaihtuvat `location`:n mukaan:

- **Front Slope -huoneisto** → hub: Apartments-hub · konkreetit: 1 Glacier + Karhupirtti
- **Glacier-huoneisto** → hub: Penthouse-hub · konkreetit: 1 Front Slope + 1 toinen Glacier
- **Levi Center -huoneisto** → hub: Large groups -hub · konkreetit: 1 Front Slope + 1 Glacier

Lisäksi nykyinen huoneisto (`currentPropertyId`) suodatetaan pois ettei linkki osoita itseensä.

## Tekniset yksityiskohdat

```text
UUSI:    src/components/PropertyCrossLinks.tsx   (~150 riviä, FI/EN, semantic tokenit)
MUOKKAA: src/pages/PropertyDetail.tsx            (1 import + 1 komponenttitag ennen Footeria)
```

- **i18n**: kielitunnistus samalla logiikalla kuin `PropertyDetail`-sivulla nyt (FI vs EN locale).
- **Linkit kunnioittavat hreflangia**: FI-sivulla FI-URLit, EN-sivulla EN-URLit. Ei ghost-URLeja.
- **Tyyli**: 3 saraketta desktopilla / 1 mobilella, samat semantic tokenit kuin `ReadNextSection`. Ei kovakoodattuja värejä.
- **Ei sitemap-, JSON-LD- eikä properties.ts-muutoksia.**
- **Ei ulkoisia linkkejä** → ei `target="_blank"`.

## Mihin EI kosketa

- `properties.ts` (datatasolla ei muutoksia)
- käännöstiedostot `src/translations/*` (komponentin sisäinen FI/EN)
- `sitemap.xml`, `robots.txt`
- JSON-LD-generointi
- muut sivut kuin `PropertyDetail.tsx`