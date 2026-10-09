# Project conventions
- Privileged browser-callable edge functions use the shared authGuard CORS and credential helpers so admin session headers stay consistent.
- Restaurant guide additions belong in the existing bilingual restaurant-guide data and use optimized WebP CDN asset pointers, because both language pages share the same gallery and raw camera images should not be served.

- Startup path must not statically import the backend client, recharts or framer-motion; use `getSupabase()` (src/lib/getSupabase.ts) in code that runs on public pages, because these chunks were hurting mobile LCP.
- Shared layout components are grouped into a `layout` chunk in vite.config.ts manualChunks; keep new always-used layout components there.
