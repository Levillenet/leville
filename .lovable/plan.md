# Fix seo_pages race condition (no "not found" flash)

No text, headings or data are changed. Only `src/App.tsx` changes (plus one tiny new helper component in the same area).

## Current behaviour (verified in code)
- `App` fetches `manage-seo-pages` once, on browser idle (up to 1 s delay), and stores the rows in `dynamicRoutes`.
- Dynamic rows are rendered as `<Route>`s; the catch-all `<Route path="*">` renders `NotFound` immediately.
- So a URL that only exists in `seo_pages` shows `NotFound` (title "Page not found", `noindex`, `prerender-status-code 404`) until the idle fetch returns.
- Today all 143 published `seo_pages` paths also exist as static routes, so the race is latent. It affects any future DB-only page.

## Changes (src/App.tsx)

1. Single lookup state, replacing `dynamicRoutes`:
   `{ routes: SeoPageRoute[], resolved: boolean }` in one `useState`, so routes and `resolved` update in the same render. A matching dynamic route therefore replaces the catch-all with no intermediate NotFound render.

2. One shared, de-duplicated `startLookup()` (in a ref, so it only ever fires one request):
   - Same plain `fetch` to `manage-seo-pages` (`get_published`) as now.
   - Always sets `resolved: true` when finished, including on `!res.ok`, network error or an 8 s abort timeout. This prevents an endless blank page, and NotFound then shows as it does today.

3. Timing:
   - Static route matched: the existing idle schedule stays (`requestIdleCallback`, 1000 ms timeout; 500 ms setTimeout fallback).
   - Unmatched URL: the catch-all calls `startLookup()` in an effect when it mounts. That is the first commit after load, with no idle delay. If the idle schedule already started the lookup, the same in-flight promise is reused.

4. New catch-all element `CatchAll` replacing `<NotFound />` on `path="*"`:
   - `resolved === false`: neutral loading state, which is `Header` + empty `<main className="flex-1" />` + `Footer` in the same `min-h-screen flex flex-col bg-background` wrapper as NotFound. It has no `Helmet`, no robots meta, no 404 title, no "not found" text, and no `prerender-status-code`.
   - `resolved === true`: render the existing lazy `NotFound`, unchanged. This is only reached after the lookup completed and no dynamic route matched.
   - `Footer` gets `lang` from the path (`/en` prefix gives `en`, otherwise `fi`), the same rule NotFound uses.
   - `CatchAll` uses a non-lazy `Header`/`Footer`, which are already in the always-loaded `layout` chunk.

5. Notes:
   - The page `<title>` during loading is the default one from `index.html` (no 404 title).
   - `index.html` has no robots meta, so none is present during loading.

## Verification (Playwright, after implementation)
Currently every DB page is also static, so the test uses an intercepted request:
- Route `manage-seo-pages` to answer after 2 s with a fake row `{path:"/qa/seo-race", component_name:"WhereToSeeNorthernLightsLevi", lang:"en"}`.
- Load `/qa/seo-race` directly with CPU throttle 4x and a MutationObserver (init script) that records any moment where the DOM text contains "404", "not found", "Sivua ei löytynyt" or where a `meta[name=robots]` / `meta[name=prerender-status-code]` / 404 title exists.
- Pass criteria:
  - The observer logs nothing during the whole load.
  - The loading state (Header + Footer, empty main) is visible before the response.
  - The dynamic page then renders.
- Second check: a truly unknown URL with the same 2 s delay. Expect the neutral state first, then NotFound only after the response, and NotFound still carries noindex and 404.
- Third check: a normal static route (e.g. `/majoitukset`) still starts the lookup on idle, not immediately (request start time observed).
- Re-run the existing route validation script and read the build log.

## Technical details
- Files: `src/App.tsx` only. `NotFound.tsx`, the seo component map and the edge function are untouched.
- Add a one-line rule to `AGENTS.md`: the catch-all must not render NotFound before the seo_pages lookup resolves, so crawlers never snapshot a transient 404.
