# Levi 3 päivässä / Levi in 3 Days — itinerary page (FI + EN)

## Validation results

**1. No existing itinerary page.** Searches for `3-paivassa`, `3-days`, `itinerary`, `paivaohjelma` return nothing in `src/` or `public/`. The routes are free.

**2. Page pattern confirmed.** `src/pages/guide/KaamosLevi.tsx` is the current reference: `lang?: Language` prop (fi default), a `translations = { fi: {...}, en: {...} }` object, Helmet meta, `HreflangTags`, `JsonLd` with `getArticleSchema` / `getFAQSchema` / `getBreadcrumbSchema`, `Header`, `Breadcrumbs`, `SubpageBackground`, `ReadNextSection`, `PageCTA`, `Footer`, `StickyBookingBar`, `WhatsAppChat`. Sitemap entries live in `src/data/sitemapRoutes.ts` with a shared `altGroup`.

**3. Link validation — 3 substitutions needed.** Everything else in the brief checks out as a live route.

| Requested | Status | Use instead |
|---|---|---|
| FI `/opas/miten-paasee-leville` | redirect only | `/matka/miten-paasee-leville-helsingista` |
| EN `/travel/how-to-get-to-levi` | redirect only | `/travel/how-to-get-to-levi-from-helsinki-and-abroad` |
| EN `/guide/winter-clothing-guide-levi` | redirect only | `/guide/how-to-dress-for-winter-in-levi-lapland` |

Verified as live: `/opas/kesa-levi`, `/guide/summer-in-levi`, `/opas/laskettelu-levi`, `/opas/hiihtoladut-levi`, `/guide/skiing-in-levi`, `/opas/ravintolat-ja-palvelut-levilla`, `/guide/restaurants-and-services-in-levi`, `/opas/missa-nahda-revontulet-levi`, `/guide/where-to-see-northern-lights-levi`, `/aktiviteetit/koiravaljakkoajelu-levi`, `/aktiviteetit/porosafari-levi`, `/activities/husky-safari-levi`, `/activities/reindeer-safari-levi`, `/aktiviteetit/moottorikelkkasafari-vinkit-levi`, `/aktiviteetit/lumikenkaily-levi`, `/activities/snowshoeing-in-levi`, `/opas/sauna-levilla`, `/aktiviteetit/avantouinti-levi`, `/guide/finnish-sauna-in-levi`, `/revontulet`, `/en/northern-lights`, `/opas/hinnat-levilla`, `/guide/prices-in-levi`, `/opas/talvivarusteet-leville`, `/majoitukset`, `/en/accommodations`, `/opas/talvi-levi`, `/guide/winter-in-levi`.

EN has no snowmobile-tips or ice-swimming page, so on the EN side Day 2 afternoon links only to snowshoeing and Day 2 evening only to the sauna guide (no avanto link).

## What gets built

New page `src/pages/guide/LeviIn3Days.tsx`, one component serving both languages via the `lang` prop.

- Routes in `src/App.tsx`, lazy-loaded: `/opas/levi-3-paivassa` (FI) and `/guide/levi-in-3-days` (EN).
- Meta titles/descriptions exactly as specified; canonical self-referencing per language.
- Hreflang: fi = x-default, en alternate.
- JSON-LD: Article + FAQPage + BreadcrumbList.

Content sections, written in an honest local tone, no prices and no invented business names:

- Winter-season note at the top linking to `/opas/kesa-levi` (FI) / `/guide/summer-in-levi` (EN).
- Intro ("who this is for") with booking link #1 to `https://app.moder.fi/levillenet`.
- Day 1 — arrival and slopes; Day 2 — safari day, with the honest "book ahead, sells out in season" note and booking link #2 around private saunas; Day 3 — gondola, free afternoon, serious aurora hunting.
- Practical tips: budget, clothing, getting around without a car.
- FAQ accordion with the four specified questions, mirrored into FAQPage schema.
- Closing "Majoitus / Where to stay" section with booking link #3 plus `/majoitukset` / `/en/accommodations`.
- Read next: FI `/opas/talvi-levi`, `/opas/hinnat-levilla`, `/revontulet`, `/opas/ravintolat-ja-palvelut-levilla`, `/majoitukset`; EN `/guide/winter-in-levi`, `/guide/prices-in-levi`, `/en/northern-lights`, `/guide/restaurants-and-services-in-levi`, `/en/accommodations`.
- 2–3 existing images reused from `src/assets` (winter/seasons/activities), no new files, per-language alt texts.
- `lang` passed to `Footer`, `PageCTA`, `StickyBookingBar`, `WhatsAppChat`.

Also updated:
- `src/data/sitemapRoutes.ts` — both URLs with a shared `altGroup: "levi-3-days"`.
- `public/llms-full.txt` — a 2–3 line entry matching the existing format.

## Technical notes

Booking links use `target="_blank" rel="noopener noreferrer"` and a `data-booking-source="levi-3-days-*"` attribute so the existing conversion tracking picks them up. After implementation the sitemap generator runs so `public/sitemap.xml` includes both new URLs, and a typecheck confirms the build is clean.
