# Karhupirtti hot tub text fixes (only the listed changes)

No other text, headings, meta titles, data or lang props change.

1. **Majoitukset.tsx, Karhupirtti group** (line 108): replace FI/EN descriptions with the given texts (outdoor hot tub, up to 14 guests).
2. **en.ts, "Bear Lodge" card** (line ~81): title "Karhupirtti log villa (Bear Lodge)", new description; features untouched.
3. **Majoitukset.tsx, EN only**: new section "Levi Villa Rental with Outdoor Hot Tub" right after "How to Choose Accommodation in Levi" (line ~806 section), same classes, two paragraphs, link to /en/accommodations/karhupirtti and Moder booking link (new tab, noopener). Wrapped in `isEnglish` so FI page is unchanged.
4. **OutdoorHotTubLevi.tsx**: EN metaTitle -> "Levi Accommodation with Outdoor Hot Tub – Guest Guide | Leville.net". New FI/EN keys boxTitle, boxText, boxLinkPage, boxLinkBook; highlighted box after the intro, before the hero image. Links: FI /majoitukset/karhupirtti (confirmed route /majoitukset/:slug), EN /en/accommodations/karhupirtti, booking https://app.moder.fi/levillenet/303?step=1 in a new tab.

Check afterwards: build clean, both pages render, booking links have target="_blank".
