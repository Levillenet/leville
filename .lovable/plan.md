## Meta-only updates (no content/layout changes)

Edit only the `title` / `description` fields listed below. All other page content, headings, hero, sections, and JSON-LD stay untouched.

### 1. `src/pages/guide/SkiingInLevi.tsx` (FI, line 41–42)
- `title` → `Laskettelu Levillä ${new Date().getFullYear()} – 43 rinnettä, rinnekartta ja vinkit`
- `description` → `Levin hiihtokeskuksen opas: 43 rinnettä, 28 hissiä, rinnekartta, hissilippuhinnat ja parhaat rinteet aloittelijoille ja kokeneille. Suunnittele laskettelupäiväsi.`

### 2. `src/pages/guide/SkiingInLevi.tsx` (EN, line 135–136) — critical bug fix
- `title` → `Skiing in Levi ${new Date().getFullYear()} – 43 Slopes, Trail Map & Local Tips`
- `description` → `Complete guide to Levi ski resort: 43 slopes, 28 lifts, trail map, lift pass prices and tips for all levels. Plan your ski day in Finnish Lapland.`
(The user-reported "Laskettelu Levillä" appearing on the EN page comes from a client-side rendering issue, but the EN meta object here already has an English title. We'll still refresh it to the new copy so both languages match spec.)

### 3. `src/pages/guide/LeviVsRovaniemiComparison.tsx` (EN Helmet, lines 89–104)
Current: `Levi vs. Rovaniemi – Which Lapland Destination Is Right for You? | Leville.net`
- `<title>` → `Levi vs Rovaniemi – Which Lapland Destination Is Better?`
- `<meta name="description">` → `Honest comparison: skiing, northern lights, activities, prices and accommodation. Which Finnish Lapland resort suits your trip — Levi or Rovaniemi?`
- Also update the mirrored `og:title`, `og:description`, `twitter:title`, `twitter:description`, and the JSON-LD `description` on line 112 to match, so tags stay consistent. (No visible content changes.)

### 4. `src/pages/travel/HowToGetToLevi.tsx` (FI, line 44)
- `title` → `Miten pääsee Leville? Lennot, juna, auto – kaikki reitit`
- description unchanged

### 5. `src/pages/guide/PricesInLeviPage.tsx` (EN, lines 148–149)
- `title` → `Prices in Levi – Food, Ski Pass, Activities & Budget Tips`
- `description` → `How much does a Levi holiday cost? Real prices for restaurants, lift passes, equipment rental and activities. Budget tips from a local.`

### 6. `src/pages/guide/NorthernLightsColorsExplained.tsx` (EN, line 114)
- `title` → `Northern Lights Colors – Why Green, Red, Purple & Blue?`
- description unchanged

### 7. `src/pages/guide/WeatherInLevi.tsx` (EN, line 202)
- `title` → `Levi Weather – Live Temperature, Snow Depth & Forecast`
- description unchanged

### 8. `src/pages/travel/HowToGetToLevi.tsx` (EN, line 206)
- `title` → `How to Get to Levi – Flights, Trains, Car & Bus Routes`
- description unchanged

### 9. `src/pages/opas/VappuLevilla.tsx` (FI, SeoMeta at lines 370–372)
- `title` → `Vappu Levillä – Tapahtumat, rinteet ja vappumajoitus`
- `description` → `Vietä vappu Levin tunturissa! MayDay-tapahtumat, vappukulkue, vesihiihto ja rinteet auki. Varaa vappumajoitus edullisesti.`

### 10. `src/pages/guide/GettingAroundLevi.tsx` (FI, lines 29–30)
- `title` → `Liikkuminen Levillä – Bussit, taksit ja vuokra-autot`
- `description` → `Näin liikut Levillä ilman omaa autoa. Hiihtobussa, skibussi, taksit, autonvuokraus ja kaikki reitit yhdessä paikassa.`

### Out of scope
No changes to headings, hero copy, images, sections, links, breadcrumbs, or other language variants beyond what's listed. No sitemap/hreflang changes.
