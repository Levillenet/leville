

# Fix: 2026 data missing from snow depth charts

## Root cause

In the edge function `fmi-snow-data`, lines 53-56 skip any date range where the **end date** is in the future. Today is March 15, 2026. When the function requests Jan 1 – May 31, 2026 data, the end date (May 31) is in the future, so the **entire range is skipped** — even though Jan–Mar 2026 data already exists at FMI.

```typescript
// Current logic — skips ALL of 2026 Jan-May
if (endDateObj > new Date()) {
  console.log(`Skipping future date range`);
  continue;
}
```

## Fix

Instead of skipping the range entirely, **clamp the end date to today** when it's in the future. This way the function fetches whatever data is available up to today.

```typescript
// Replace skip logic with clamping
const now = new Date();
let effectiveEndDate = endDate;
if (endDateObj > now) {
  effectiveEndDate = now.toISOString();
}
```

Then use `effectiveEndDate` in the FMI URL construction. Also skip only if the **start date** is in the future (truly no data possible).

## Files changed
- `supabase/functions/fmi-snow-data/index.ts` — clamp future end dates to today instead of skipping

