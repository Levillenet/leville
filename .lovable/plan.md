## Fixes for Karhupirtti EN translation + truncate utility

### 1. Fix renovation year (2023 → 2022) in `src/data/propertyTranslationsEn.ts`

In the `karhupirtti.longDescription`, replace the heading and the first sentence of the renovation paragraph:

- `**Fully renovated in 2023 with quality materials**` → `**Fully renovated in 2022 with quality materials**`
- `Karhupirtti went through a full renovation in 2023:` → `Karhupirtti went through a full renovation in 2022:`

No other text in that paragraph or anywhere else in the file changes.

### 2. Confirm "geothermal" is absent

Run `rg -ni "geothermal|ground.?source" src/data/propertyTranslationsEn.ts` (and the FI file for completeness) and report the result. Based on the verification report just produced, the term does not appear — expected to be a no-op confirmation. No edits unless a hit is found. "Air conditioning and heat pump" stays as-is.

### 3. Replace `truncate` in `src/pages/PropertyDetail.tsx`

Replace the one-line `truncate` (around line 259) with the word-boundary-aware version from the prompt:

```ts
const truncate = (s: string, max = 155) => {
  if (s.length <= max) return s;
  const hard = s.slice(0, max - 1);
  const lastSpace = hard.lastIndexOf(" ");
  const safe = lastSpace > max * 0.6 ? hard.slice(0, lastSpace) : hard;
  return safe.trimEnd() + "…";
};
```

Pure utility change; affects all meta descriptions for FI/EN/future languages. No call sites change.

### 4. Verification report (no further code changes)

1. Paste the corrected Karhupirtti EN `longDescription` in full, so both `2023→2022` swaps are visible and nothing else moved.
2. Explicit confirmation of `rg` search for `geothermal` — appeared / did not appear, removed / no-op.
3. Recompute and quote the rendered `<meta name="description">` for both `/en/accommodations/karhupirtti` and `/majoitukset/karhupirtti` using the new `truncate`. Verify neither ends mid-word.
4. Re-run `npx tsc --noEmit` and confirm exit 0.

### Out of scope (explicitly not touched)

- Other 25 stub slugs in `propertyTranslationsEn.ts`
- `propertyTranslationsFi.ts`, `properties.ts`
- `uiStrings`, JSON-LD, hreflang, sitemap, routing
- Tone/structure of Karhupirtti EN copy beyond the year fix
