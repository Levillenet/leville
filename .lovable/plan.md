

## Fix broken links identified by site crawler audit

The CSV audit (~1930 rows) reveals several categories of issues. Here's what needs fixing vs. what's already resolved.

### Issues already resolved (no action needed)
- **Most hreflang 404s**: ~80% of the hreflang errors point to routes that already exist in App.tsx (Northern Lights cluster, activities, guides in sv/de/es/fr/nl). These will resolve once the current codebase is deployed.
- **Sitemap 404s**: Same — sitemap references pages that now have routes.
- **Monthly guide 404s**: Routes for all 12 months x 7 languages already exist in App.tsx.
- **Image/JS 404s on /latuinfo**: This page redirects externally; stale cached assets from old builds.

### Fix 1: Broken internal href links in accommodation guides
**Files**: `src/pages/accommodations/SkistarGuide.tsx`, `src/pages/accommodations/FrontslopeGuide.tsx`

Both files have 2 wrong links in their Read Next sections:
- `/travel/how-to-get-to-levi` → `/travel/how-to-get-to-levi-from-helsinki-and-abroad`
- `/guide/restaurants-and-dining` → `/guide/restaurants-and-services-in-levi`

### Fix 2: `/en/accommodation` → `/en/accommodations` (missing "s")
**Files**: `src/pages/guide/BestTimeNorthernLightsLevi.tsx`, `src/pages/guide/HowNorthernLightsForm.tsx`, `src/pages/guide/NorthernLightsSeasonLevi.tsx`, `src/pages/guide/NorthernLightsForecastLevi.tsx`, `src/pages/guide/WhereToSeeNorthernLightsLevi.tsx`, `src/pages/guide/NorthernLightsPhotographyLevi.tsx`, `src/pages/guide/NorthernLightsColorsExplained.tsx`

Multiple Northern Lights pages link to `/en/accommodation` (without "s") in Read Next and CTA buttons. All should be `/en/accommodations`.

### Fix 3: Wrong href in DayTripsFromLevi
**File**: `src/pages/guide/DayTripsFromLevi.tsx`

Link `/travel/how-to-get-to-levi-from-helsinki` is missing `-and-abroad` suffix.

### Fix 4: Wrong hreflang URL in ComparisonHub
**File**: `src/pages/guide/ComparisonHub.tsx`

The ES hreflang is set to `/es/guide/why-choose-levi` but the actual route is `/es/guia/why-choose-levi`. Fix the customUrls object.

### Fix 5: Add redirect for `/en/accommodation` → `/en/accommodations`
**File**: `src/App.tsx`

Add a `<Navigate>` redirect as a safety net for any other pages or external links using the wrong URL.

### Fix 6: Add redirect for `/travel/how-to-get-to-levi` → correct path
**File**: `src/App.tsx`

Safety net redirect.

### Summary
- **~10 files** with broken internal href links to fix
- **1 file** with wrong hreflang URL
- **2 new redirects** in App.tsx as safety nets
- Total: straightforward find-and-replace across known files

