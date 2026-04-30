## Goal
Shorten and optimize meta title + description for the FI and EN accommodations page to target "majoitus levi" / "levi majoitus" / "Levi accommodation" searches. No on-page content changes.

## Findings
- The page `src/pages/Majoitukset.tsx` reads meta from translation files via `t.meta.title` / `t.meta.description`.
- FI meta lives in `src/translations/fi.ts` (lines 58–62), under `majoitukset.meta`.
- EN meta lives in `src/translations/en.ts` (lines 58–62), under `majoitukset.meta`.
- The on-page H1 (`title:` at line 64 in both files) is a separate field and will NOT be touched.
- Title needs a dynamic year — translation files are static TS objects, so I'll use a template literal with `new Date().getFullYear()` (works fine in TS object literals; evaluated at module load).

## Changes

### `src/translations/fi.ts` (lines 59–60)
- title → `` `Majoitus Levillä ${new Date().getFullYear()} — huoneistot ja mökit keskustassa` ``
- description → `"27 huoneistoa ja mökkiä Levin keskustassa rinteiden vieressä. Varaa suoraan meiltä paras hinta — samat kohteet kuin Booking.comissa."`
- keywords + canonical: unchanged
- `title:` field at line 64 (H1): unchanged

### `src/translations/en.ts` (lines 59–60)
- title → `` `Levi Accommodation ${new Date().getFullYear()} — Apartments & Cabins in Levi Centre` ``
- description → `"27 apartments and cabins in Levi centre next to slopes. Book directly for the best price — same properties as on Booking.com."`
- keywords + canonical: unchanged
- `title:` field at line 64 (H1): unchanged

## Out of scope
- No changes to `Majoitukset.tsx` rendering logic, headings, images, or copy.
- No changes to other languages (sv/de/fr/es/nl) unless requested.
- No changes to `MajoitusLevilla.tsx` guide page (separate URL).

## Verification
After build, the FI page (`/majoitukset`) and EN page (`/en/accommodations`) `<title>` and `<meta name="description">` will reflect the new strings with the current year auto-injected.
