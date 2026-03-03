

## Plan: Bearlodge Guide Refactoring

### Changes needed

**1. Route restructuring** (`src/App.tsx`)
- Change route from `/accommodations/bearlodge/guide` to `/accommodations/guides/bearlodge`
- Add redirect from old path to new path for SEO continuity
- Add Finnish route: `/majoitukset/oppaat/bearlodge` rendering `<BearlodgeGuide lang="fi" />`

**2. Content fixes in `BearlodgeGuide.tsx`**
- Add `lang` prop support (fi/en) — this is a larger structural change since all text content needs translation
- Update canonical URL and all schema URLs to `/accommodations/guides/bearlodge`
- Remove the "Download PDF Guide" button from the hero section
- Fix "Extras" card text: change "outdoor BBQ area" → "charcoal grill in the yard available for use"
- Fix highlights: change "Geothermal heating + heat pump" → "Water-circulated radiator heating + heat pump"
- Fix amenities Heating card: change "geothermal heating" → "water-circulated radiator heating"
- Fix lodgingSchema amenityFeature: change "BBQ Grill" → "Charcoal Grill"
- Add hreflang tags for both `/accommodations/guides/bearlodge` (en) and `/majoitukset/oppaat/bearlodge` (fi)

**3. Sitemap** (`public/sitemap.xml`)
- Update the existing bearlodge URL from `/accommodations/bearlodge/guide` to `/accommodations/guides/bearlodge`
- Add Finnish version `/majoitukset/oppaat/bearlodge`

### Language support approach

The component will accept `lang?: "fi" | "en"` prop (default "en"). All text strings will be organized in an `i18n` object at the top of the file with `fi` and `en` keys, following the project's existing pattern. This prepares the structure for future property guides that will follow the same template.

### Technical details

- Route pattern `/accommodations/guides/:slug` is forward-compatible for future property guides
- Old route `/accommodations/bearlodge/guide` gets a `<Navigate>` redirect to preserve any existing links
- Finnish content will be a full translation of all sections

