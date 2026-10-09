# Project conventions
- Privileged browser-callable edge functions use the shared authGuard CORS and credential helpers so admin session headers stay consistent.
- Restaurant guide additions belong in the existing bilingual restaurant-guide data and use optimized WebP CDN asset pointers, because both language pages share the same gallery and raw camera images should not be served.

- Startup path must not statically import the backend client, recharts or framer-motion; use `getSupabase()` (src/lib/getSupabase.ts) in code that runs on public pages, because these chunks were hurting mobile LCP.
- Shared layout components are grouped into a `layout` chunk in vite.config.ts manualChunks; keep new always-used layout components there.
- Build runs scripts/generate-route-preloads.mjs after vite build to write per-route HTML with page-chunk modulepreloads; `#root` stays empty in those files because static shells caused CLS regressions.
- Toasters are mounted via DeferredToasters (idle) and `Tooltip` wraps its own provider, so neither belongs in the startup bundle.
- The catch-all route (SeoCatchAll) must render a neutral shell, never NotFound, until the seo_pages lookup has resolved, so crawlers never snapshot a transient 404; unmatched URLs start the lookup immediately, matched ones at idle.
- Property hero images in public/ have pre-generated `-480w`/`-800w` WebP siblings used via srcset in PropertyCard; regenerate them when a heroImage changes, so mobile cards stay under ~60 kB.
- Above-the-fold text on landing pages is not wrapped in ScrollReveal, because its opacity-0 start delayed LCP.
