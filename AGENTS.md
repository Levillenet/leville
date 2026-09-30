# Project conventions
- Privileged browser-callable edge functions use the shared authGuard CORS and credential helpers so admin session headers stay consistent.
- Restaurant guide additions belong in the existing bilingual restaurant-guide data and use optimized WebP CDN asset pointers, because both language pages share the same gallery and raw camera images should not be served.
