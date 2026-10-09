# /majoitukset LCP fix

No changes to text, headings, property data or booking links on /majoitukset or /en/accommodations.

## Step 1 – Diagnose and report (no code changes)
- Production build + compressed local server, Playwright/CDP mobile throttling (same as earlier rounds), 390 px viewport.
- Report: LCP element (tag, class, src); FCP/LCP; request count; transferred bytes.
- Data source: the card list already comes from a static file bundled with the page (`src/data/properties.ts`, plus street hubs). The only network call on the page is the download log, which runs on click. Confirm no card data request runs before first paint. Also check whether the Moder widget or PropertyFilters fetch anything early.
- First 4 cards at 390 px: file size, intrinsic and rendered size, format, loading, fetchpriority, srcset/sizes. Also cover the 4 bundled JPGs (karhupirtti, skistar, perheasunnot, glacier) and anything OptimizedImage outputs.
- Flag every source image over 300 kB.
- Share the report in chat, then go on to Step 2, applying only the fixes the findings support.

## Step 2 – Fixes
1. Data: already static. Only move any early fetches out of the critical path, e.g. the Moder widget mounting at idle or when scrolled into view.
2. Images: responsive WebP versions (400/800/1200 w, q≈75) for the card images and the 4 group images, with srcset and sizes matched to the actual card width. Target: mobile version under 60 kB. Generate at build time for bundled images; use optimized CDN pointers where images are already on the CDN.
3. Priority: the first card image above the fold gets eager loading, fetchpriority="high" and a route-specific preload with imagesrcset/imagesizes. Add it only to the /majoitukset and /en/accommodations HTML files written by the route-preload step, never sitewide. Every other image gets lazy loading and async decoding. All images keep explicit width and height.
4. Fixed aspect-ratio placeholders, so the grid doesn't shift while images load. Check that ScrollReveal/TiltCard don't hide the LCP card at first paint (opacity 0). If they do, skip the reveal for the first row.
5. Background: SubpageBackground already shows a plain static gradient on mobile. Confirm it isn't the LCP element and that the intro has no large background image.

## Step 3 – Verify
- Re-measure both pages: FCP, LCP, LCP element, requests, bytes, before vs after.
- Diff check: card text, property data and Moder links unchanged (compare DOM text and hrefs before vs after).
- Run validate-routes.mjs (STRICT) with 0 errors. Check the build log and run existing tests.
- Update AGENTS.md with the responsive-image rule.

## Technical notes
- `#root` stays empty (CLS rule). Don't load the backend client, recharts or framer-motion at startup.
- If ScrollReveal turns out to be the main cause, the fix only changes the first row's animation, not content.
