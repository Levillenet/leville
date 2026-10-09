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
6. **Lighter background (your addition A)**: `src/components/SubpageBackground.tsx` currently draws 5 blurred aurora bands, a blurred glow and 18 animated snow crystals as one fixed full-screen layer on every guide page.
   - Under 768 px wide: render one static CSS gradient only, with no blur, animation or snowflakes. The gradient reuses the colours of the aurora so the look stays close.
   - On desktop: show the same static gradient first. Mount the animated layers after first paint with `requestIdleCallback`, falling back to a 1500 ms timer. The animated layers fade in over the gradient.
   - `prefers-reduced-motion: reduce`: a media query in `src/index.css` switches off the aurora, snow and twinkle animations (`animate-aurora-curtain-1..5`, `animate-subpage-twinkle`).
   - The snow crystals' random positions move into the post-paint mount, so the first render is cheap.
7. **One `layout` chunk (your addition B)**: in `vite.config.ts`, `manualChunks` puts Header, Footer, Breadcrumbs, SubpageBackground, HreflangTags, SeoMeta, JsonLd, PageCTA, StickyBookingBar, ReadNextSection, GuideDisclaimer, InlineBookingLink and `structuredData` into one chunk named `layout`.
   - Filenames are hashed (`assets/[hash]`), so `index.html` cannot name the chunk directly. A small Vite plugin (`transformIndexHtml`) finds the `layout` chunk in the build output and injects `<link rel="modulepreload">` for it and for the `translations` chunk it needs. Then one request replaces about 15.
   - `WhatsAppChat` stays out of this chunk on purpose, because step 3 defers it. The search box (step 4) is also left out, so the search index stays out of the startup path.
8. **Backend client loaded on first use (your addition C)**: `src/integrations/supabase/client.ts` is auto-generated and stays untouched. I add a small helper (`src/lib/getSupabase.ts`) that loads the client with a dynamic `import()` and caches it.
   - Switch the startup users to it: `App.tsx` (`manage-seo-pages`), `main.tsx` / `adminFunctionAuth.ts`, `SiteSearch`, `usePromoBanner`, `useTimedNotices` and `logPromoClick`. Page-view analytics already use plain `fetch`, so they need no change.
   - `adminFunctionAuth.ts` patches the function-call method used by the admin panel (see the earlier heat-pump fix). It must keep working: the patch is applied when the client first loads, and only if an admin token exists. I will re-test the admin login and the heat-pump list after the change.
   - Once nothing in the entry imports it, the `supabase` chunk drops out of the preload list. I check the built `index.html` to confirm.
   - Pages and admin tools that import the client directly keep doing so. They load it with their own page chunk, so it is not on the startup path of the other pages.
9. **Verify and measure (including A-C)**: re-run the same throttled mobile measurement on `/`, `/opas/hinnat-levilla`, `/majoitukset` and one guide page, and compare with the baseline below. Check the build log, confirm that `validate-routes.mjs` still passes, and test the admin login, the heat-pump list, the site search, the chat button and a booking link in a browser.
10. Record the three additions as tasks in `roadmap.md` when implementation starts, and tick them off when done.

## Baseline (live site, throttled mobile, before any change)

| Page | FCP | LCP |
| --- | --- | --- |
| `/opas/hinnat-levilla` | 5.45 s | 6.57 s |
| `/` | n/a | 5.88 s |
| `/majoitukset` | n/a | 7.72 s |
| `/opas/levi-vs-rovaniemi` | n/a | 5.72 s |

About 40 requests on the price page, 774 KB transferred. The after-numbers, request counts and transferred size go into the final report.

## Expectations

- The aim is to take 1-2 s off the loading path on slow mobile. I will report the measured before and after numbers.
- Google's report uses 28 days of real-user data, so the page count falls gradually over 3-4 weeks after publishing. Pages may stay above 2.5 s ("needs improvement") while dropping below 4 s ("poor").
- If it is still too slow after these changes, the next step is the larger one. It would be to serve a pre-rendered page to real mobile visitors, or to move to the SSR template that the project could migrate to.
- Publishing is needed for the changes to reach real users.

## Technical details

- Files: `vite.config.ts`, `index.html`, `src/App.tsx`, `src/components/WhatsAppChat.tsx` (plus a new implementation file), `src/components/Header.tsx`.
- Measuring: Playwright with CDP throttling (network 1.6 Mbps and 150 ms latency, CPU 4x), reading the `largest-contentful-paint` entry and the resource waterfall.
- Constraint: the project keeps an empty `#root` div and explicit image dimensions (project memory). Both stay as they are.
