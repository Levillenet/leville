

# Add interactive map link to Majoitukset and HowToGetToLevi pages

## Changes

### 1. Majoitukset page (`src/pages/Majoitukset.tsx`)
Add a map link banner after the accommodations grid (after line 213, before Amenities). A styled card with MapPin icon linking to `/levi-map`, localized for fi/en.

### 2. HowToGetToLevi page (`src/pages/travel/HowToGetToLevi.tsx`)
Add a similar map link in the "Getting Around" section (around line 780, after the options grid). Links to the interactive map for visual orientation.

### Link style
Both use the same pattern: a compact, visually distinct banner with MapPin icon, text, and arrow — consistent with existing "Read Also" link cards.

### Translations
- FI: "Katso kohteet kartalla" → `/levi-map`
- EN: "View locations on the map" → `/levi-map`

## Files changed
- `src/pages/Majoitukset.tsx`
- `src/pages/travel/HowToGetToLevi.tsx`

