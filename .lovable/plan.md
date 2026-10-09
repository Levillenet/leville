# Fix the mobile LCP problem (LCP over 4 s on 198 pages)

## What the report says

Google Search Console lists "LCP issue: longer than 4 s (mobile)" for 198 pages. The example is `/opas/hinnat-levilla` at 4.7 s. The number of affected pages has grown from 119 to 198 since July, so this affects the whole site, not one page.

## What I measured on the live site

I loaded the live site as a throttled mobile phone (slow 4G, 4x slower processor).

- The slowest element on the page is plain text, not an image. On the price page, FCP was 5.4 s and LCP 6.6 s.
- Real visitors get an empty page shell (the pre-rendered copy only goes to search engines). Text appears only after the JavaScript has downloaded and run.
- The waterfall looks like this:

```text
0.3 s  HTML (4.7 KB, empty)
0.6-3.5 s  JS: react + supabase + "ui-vendor" (186 KB gzip) + icons + index
           + hero-chalet.webp (130 KB, downloaded on EVERY page)
3.5-4.8 s  page JS runs, then ~25 smaller chunks are fetched
           (Footer, WhatsAppChat, StickyBookingBar, ...)
4.8 s      the actual page chunk is requested
5.4 s      first paint
```

Three causes follow from this:

1. **`ui-vendor` is a 186 KB bundle that every page waits for.** It mixes framer-motion, recharts (charts, only used in admin and snow charts) and Radix, because `vite.config.ts` groups them into one file. It is also preloaded on every page.
2. **The home-page hero image is preloaded on every page.** `index.html` preloads `/hero-chalet.webp` (130 KB), but only `Hero.tsx` on the front page uses it. On other pages it competes with the JavaScript for bandwidth.
3. **The page waits for non-essential components.** `WhatsAppChat` (pulls in framer-motion), the weather widget and the site search (38 KB search index) are loaded with the page. The page chunk cannot render until they have loaded.

The `manage-seo-pages` request also fires on every page and does a cross-origin preflight. It does not block rendering but takes up connection time.

## Changes

No text, headings, data or booking links change. Everything is loading order and bundle splitting.

1. **`vite.config.ts`**: split `ui-vendor` into `radix` (needed at start), `motion` (framer-motion) and `charts` (recharts). Pages that need motion or charts still load them, but the front page and normal guide pages do not wait for recharts.
2. **`index.html`**: replace the unconditional hero-image preload with a small inline script that adds it only on the front-page paths (`/`, `/en`, and the other language front pages that use `Hero`). Other pages stop downloading the hero.
3. **`src/components/WhatsAppChat.tsx`**: turn it into a thin wrapper that loads the real chat widget after the page is idle. About 109 pages import it, so they need no edits, and framer-motion leaves the critical path.
4. **`src/components/Header.tsx`**: load the search box (`SiteSearch` and its search index) lazily, and delay the weather widget's two API calls until after first paint.
5. **`src/App.tsx`**: delay the `manage-seo-pages` request until the browser is idle. If the current URL is not matched by a static route, fetch it immediately so dynamic pages still work.
6. **Verify**: re-run the same throttled mobile measurement on `/`, `/opas/hinnat-levilla`, `/majoitukset` and one guide page. Check the build log and confirm that `validate-routes.mjs` still passes.

## Expectations

- The aim is to take 1-2 s off the loading path on slow mobile. I will report the measured before and after numbers.
- Google's report uses 28 days of real-user data, so the page count falls gradually over 3-4 weeks after publishing. Pages may stay above 2.5 s ("needs improvement") while dropping below 4 s ("poor").
- If it is still too slow after these changes, the next step is the larger one. It would be to serve a pre-rendered page to real mobile visitors, or to move to the SSR template that the project could migrate to.
- Publishing is needed for the changes to reach real users.

## Technical details

- Files: `vite.config.ts`, `index.html`, `src/App.tsx`, `src/components/WhatsAppChat.tsx` (plus a new implementation file), `src/components/Header.tsx`.
- Measuring: Playwright with CDP throttling (network 1.6 Mbps and 150 ms latency, CPU 4x), reading the `largest-contentful-paint` entry and the resource waterfall.
- Constraint: the project keeps an empty `#root` div and explicit image dimensions (project memory). Both stay as they are.
