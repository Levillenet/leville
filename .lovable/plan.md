

# Interactive Levi Map Page

## Overview
Create a new interactive map page at `/levi-map` using Mapbox GL JS with a two-click distance comparison system, accommodation booking links, and landmark markers.

## New Dependencies
- `mapbox-gl` and `@types/mapbox-gl` added to package.json

## Environment Variable
- `VITE_MAPBOX_TOKEN` — needs to be provided by the user before the map will work. Will be read via `import.meta.env.VITE_MAPBOX_TOKEN`.

## Files to Create/Modify

### 1. `src/pages/guide/LeviInteractiveMap.tsx` (NEW — ~600 lines)
The main page component containing:
- **SeoMeta** with the specified title/description
- **Header + Footer** from existing components
- **Mapbox map** initialized at `[24.8134, 67.8039]`, zoom 13, `outdoors-v12` style
- **Three marker categories**: Levi Center (blue pulsing dot), Accommodations (gold/amber with house icon), Landmarks (teal with contextual icons)
- **Two-click comparison model**: Click A → Click B → show dashed line + info panel with distance (Haversine), taxi fare (7.90 + 1.60/km), walking time (4 km/h). Third click resets.
- **Legend panel** (top-left, collapsible on mobile)
- **Reset View button** (top-right)
- **Info cards section** below map: "How It Works", "Taxi Fare Info", "Our Accommodations"
- **ReadNextSection** with links to travel, accommodations, and activities pages
- All monetary values in Finnish format (comma decimal, € suffix)

### 2. `src/App.tsx` (MODIFY)
- Add lazy import for `LeviInteractiveMap`
- Add route: `<Route path="/levi-map" element={<LeviInteractiveMap />} />`

## Key Technical Details

**Haversine distance calculation** — inline utility function, returns km rounded to 1 decimal.

**Marker rendering** — Custom HTML markers via `mapboxgl.Marker` with styled divs for each category. Accommodation markers include "Book Now →" link in popup.

**Animated dashed line** — GeoJSON source + line layer with `line-dasharray` animation between points A and B.

**Comparison panel** — Floating card at bottom-center (desktop) or bottom-sheet (mobile), slides up on second click. Shows distance, taxi fare, walking time, and distances to Levi Center for both points.

**Responsive** — Map height 75vh desktop / 60vh mobile. Legend collapses on mobile. Info cards stack vertically on mobile.

**Custom popup CSS** — Override Mapbox defaults to match site theme (white bg, rounded-lg, shadow-xl, no default close button styling).

## Accommodations Data
4 properties with coordinates and booking URLs as specified, rendered as gold markers with house icons.

## Landmarks Data  
8 landmarks with coordinates, icons, and descriptions as specified, rendered as teal markers with contextual lucide icons.

## Important Note
The Mapbox access token (`VITE_MAPBOX_TOKEN`) must be set as an environment variable. I will need to ask you for your Mapbox token before the map can render.

