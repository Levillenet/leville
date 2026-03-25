

## Plan: Fix routeConfig for Language Switching

**Single file**: `src/translations/index.ts` — rewrite the `routeConfig` object.

### What's wrong (summary)

| Issue type | Count |
|-----------|-------|
| Wrong FI/EN slugs (don't match App.tsx) | 7 entries |
| Missing localized NL/DE/SV/ES/FR slugs | ~20 entries |
| Missing route groups entirely | ~19 new entries |

### Fixes to existing entries

| Key | What's wrong | Correct value (from App.tsx) |
|-----|-------------|------------------------------|
| `weatherInLevi` | NL → `/nl/levi` | `/nl/levi/weer-in-levi` |
| `winterInLevi` | NL → `/guide/winter-in-levi` | `/nl/gids/winter-in-levi` |
| `springInLevi` | NL → `/guide/spring-in-levi` | `/nl/gids/lente-in-levi` |
| `summerInLevi` | NL → `/guide/summer-in-levi` | `/nl/gids/zomer-in-levi` |
| `autumnInLevi` | NL → `/guide/autumn-ruska-in-levi` | `/nl/gids/herfst-ruska-in-levi` |
| `accessible` | FI → `esteetonloma-levi` | `esteetton-levi` + add all localized |
| `apresSkiLevi` | FI/EN wrong slugs | FI: `afterski-ja-yoelama-levilla`, EN: `apres-ski-and-nightlife-in-levi` + DE/ES |
| `dayTrips` | FI → `paivaretkia-levilla` | `paivaretket-levilla` + all localized |
| `equipmentRental` | FI/EN wrong | FI: `valinevuokraus-levilla`, EN: `equipment-rental-in-levi` + all localized |
| `newYearsEve` | FI wrong | `uusivuosi-levilla` + all localized |
| `cabinVsApartment` | EN → `cabin-vs-apartment-levi` | `cabin-vs-apartment-in-levi` |
| `romanticGetaway` | EN → `romantic-levi-getaway` | `romantic-getaway-in-levi` + all localized |
| `gettingAround` | NL missing | `/nl/gids/vervoer-in-levi` |
| `snowmobileSafari` | NL missing | `/nl/activiteiten/sneeuwscooter-safari-levi` |
| All activities (fatbike, golf, etc.) | Missing DE/SV/ES/FR/NL | Add from App.tsx routes |
| Guide pages (packingList, santaClaus, etc.) | Missing DE/SV/ES/FR/NL | Add from App.tsx routes |

### New route groups to add (19 entries)

- `comparisonHub` (7 languages)
- `leviRestaurantGuide` (fi + en)
- `leviVsSaariselka` (fi + en)
- `outdoorHotTub` (fi + en)
- `christmasDinnerFI` (fi only)
- `guideFrontslope` (en only)
- `leviMap` (fi/en same path)
- `fireplace` (fi + en)
- 12 monthly guides (jan–dec, each with 7 languages)

### Final entry count

**Current**: 46 entries
**After update**: ~65 entries

All paths taken directly from App.tsx `<Route path="...">` definitions. No changes to any other files.

### Technical detail

The `getRouteForLanguage` function and `detectLanguageFromPath` stay unchanged — the fix is purely data completeness in `routeConfig`.

