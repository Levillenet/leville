

## Plan: Add Booking.com Property Names for SEO

### Goal
Include exact Booking.com property names on the FI and EN accommodation pages so Google associates brand searches with leville.net instead of Booking.com. Also add `alternateName` to structured data.

### Changes

**1. `src/pages/Majoitukset.tsx`** — Add a new "Book direct" section between the Booking & Payment section and the FAQ section (~line 286).

- Language-aware heading: FI "Varaa suoraan — paras hinta" / EN "Book direct — best price guaranteed"
- Intro paragraph explaining direct booking advantage
- Bulleted list of all 9 Booking.com property names (same in both languages since they're brand names)
- Wrapped in `ScrollReveal` with existing glass-card styling

**2. `src/components/StructuredData.tsx`** — Expand the `getVacationRental()` function to include an `alternateName` array with all 9 Booking.com property names. This lets Google connect these brand names to leville.net in structured data.

```
alternateName: [
  "Levillenet Glacier Alpine Chalets at Levi Centre",
  "Levillenet Levi centre chalets",
  "Levillenet Bearlodge at Levi city centre",
  "Levillenet Bears Watch Apartments",
  "Levillenet Skistar Superior Studios",
  "Levillenet Skistar Superior 1-bedroom apartments",
  "Levillenet Skistar Superior 2 bedroom apartments",
  "Levi Platinum Superior Apartments",
  "Levi Centre Moonlight Studio with Sauna 415"
]
```

### Files to edit
- `src/pages/Majoitukset.tsx` — new section with property names
- `src/components/StructuredData.tsx` — add `alternateName` array to VacationRental schema

