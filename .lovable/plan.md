

## Hakutulosten parantaminen

### Ongelma
cmdk:n oletushaku käyttää fuzzy-matchingia, joka tuottaa epäloogisia osumia (esim. "sauna" → Last Minute). Lisäksi kategoriaryhmittely häiritsee tulosten järjestystä.

### Ratkaisu

**Tiedosto: `src/components/SiteSearch.tsx`**

1. **Poista kategoriaryhmittely** — näytetään tulokset yksinkertaisena listana ilman CommandGroup-jakoa
2. **Lisää oma filter-funktio** Command-komponenttiin, joka:
   - Tekee substring-haun (ei fuzzy) otsikosta ja kuvauksesta
   - Pisteyttää: otsikon osuma saa korkeamman pisteen kuin kuvauksen osuma
   - Otsikon alusta alkava osuma saa korkeimman pisteen
3. Tulokset järjestyvät automaattisesti relevanssin mukaan (cmdk käyttää filter-funktion palauttamaa pistemäärää)

### Tekninen toteutus

```tsx
// Custom filter: exact substring match, title > description
<Command filter={(value, search) => {
  const s = search.toLowerCase();
  const v = value.toLowerCase();
  // title is before the | separator
  const [title, desc] = v.split('|');
  if (title.startsWith(s)) return 1;      // title starts with search
  if (title.includes(s)) return 0.8;      // title contains search  
  if (desc?.includes(s)) return 0.5;      // description contains search
  return 0;                                // no match
}}>
```

- CommandItem value muutetaan muotoon `title|description` jotta filter voi erottaa ne
- Poistetaan CommandGroup, käytetään yhtä listaa

