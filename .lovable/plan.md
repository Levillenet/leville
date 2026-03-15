

# Zoom in default map view to show only center markers

## Change

In `src/pages/guide/LeviInteractiveMap.tsx`, increase the default zoom from `12.5` to `14` in both:
1. Initial map creation (line 261)
2. Reset view function (line 183)

This will show only the central Levi area (Centre Chalets, Bearlodge, K-Market, Zero Point, Levi Center, etc.) on load, requiring users to zoom out to see distant markers like Skistar or Utsuvaara.

## Files changed
- `src/pages/guide/LeviInteractiveMap.tsx` — two zoom value changes

