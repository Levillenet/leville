# Remove duplicate-content comparison routes and non-canonical sitemap URLs

No page text, headings or data are touched. Only routing and sitemap lists change.

## Findings (verified in the code)

- `src/App.tsx` lines 496-504 hold the 8 routes (NL/DE/FR/ES x two comparisons). Each renders the English comparison component.
- The sitemap is built from two mirrored route lists, which feed the `generate-sitemap` function. `scripts/generate-sitemap.mjs` downloads the result into `public/sitemap.xml` at build time:
  - `src/data/sitemapRoutes.ts` (lines ~234-241 for the 8 URLs, lines 45-46 for `/joulu` and `/xmas`)
  - `supabase/functions/_shared/sitemapRoutes.ts` (lines ~235-242 and 46-47)
- The 8 URLs also appear in the live `public/sitemap.xml`, both as their own entries and as hreflang alternates on the FI/EN comparison pages. These alternates disappear on regeneration, because they come from the shared `altGroup` entries.
- No other source file links to or references the 8 URLs. `travelHubContent.ts` already points NL/DE/FR/ES hubs to the English `/guide/...-comparison` pages.
- `/joulu` and `/xmas` stay as routes (App.tsx lines 265-266 untouched).
- `scripts/validate-routes.mjs` already has `STRICT = true` hard-coded. It compares sitemap URLs against the routes, so it would fail if the routes were removed but the sitemap still listed them.

## Steps

1. `src/App.tsx`: delete the 8 `<Route>` lines and replace the existing "Comparison pages - NL/DE/FR/ES" comment with the requested one:
   `// NL/ES/FR/DE comparison routes removed 10/2026 until translations exist – re-add under /de/ratgeber/ for German`
2. `src/data/sitemapRoutes.ts` and `supabase/functions/_shared/sitemapRoutes.ts`: remove the 8 entries. Also remove the `/joulu` and `/xmas` entries (the canonical `/levi/joulu-lapissa` and `/en/levi/christmas-in-lapland` stay).
3. Regenerate `public/sitemap.xml` by running `node scripts/generate-sitemap.mjs` once the updated `generate-sitemap` function is live. Check that it contains none of the 10 URLs and that no `hreflang` links to the removed URLs remain.
4. Run `node scripts/validate-routes.mjs` (STRICT is already on) and confirm 0 errors. Fix any error the removal causes.
5. Confirm the build log shows OK.

## Notes

- The 8 removed URLs will fall through to the site's not-found page. If Google already has them indexed, they will drop out over time. A redirect to the English pages could be added later if you prefer, but you did not ask for one, so none is added.
- The `lang` prop on the two English comparison components becomes unused. It is left in place to avoid touching component code.
- `public/sitemap-static-backup.xml` is an unused backup and is not touched.
