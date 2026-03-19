

# Fix 2 URL mismatches in SpringSkiingLevi

## Changes

### File 1: `src/pages/guide/SpringSkiingLevi.tsx` (lines 55, 57)
- `nl: "/nl/gids/voorjaarsskien-levi"` → `"/nl/gids/lente-skieen-levi"`
- `de: "/de/ratgeber/fruehlingsskifahren-levi"` → `"/de/ratgeber/fruehlings-skifahren-levi"`

### File 2: `src/pages/guide/springSkiingTranslations.ts`
Update the canonical URLs in the NL and DE translation blocks to match:
- NL canonical (line 150): `"https://leville.net/nl/gids/voorjaarsskien-levi"` → `"https://leville.net/nl/gids/lente-skieen-levi"`
- DE canonical (line 294): `"https://leville.net/de/ratgeber/fruehlingsskifahren-levi"` → `"https://leville.net/de/ratgeber/fruehlings-skifahren-levi"`

Two files, four string replacements total.

