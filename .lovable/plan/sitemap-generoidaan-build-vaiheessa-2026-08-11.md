# Sitemap generoidaan build-vaiheessa

## Ongelma

`/sitemap.xml`-rewrite tiedostossa `public/_redirects` ei toimi Lovable-hostingissa, joten dynaamisen edge-funktion tuottama sitemap ei koskaan päädy Googlelle. Nykytila tarkistettu: `public/sitemap.xml` **ei ole olemassa** — se nimettiin aiemmin `public/sitemap-static-backup.xml`:ksi. `public/robots.txt` osoittaa oikein osoitteeseen `https://leville.net/sitemap.xml`, joten sitä ei muuteta.

## Toteutus

1. **Uusi tiedosto `scripts/generate-sitemap.mjs`**
   - Hakee natiivilla `fetch`illä sitemapin generate-sitemap-reunafunktiosta (ei uusia npm-riippuvuuksia).
   - Validoi ennen kirjoitusta: HTTP 200, runko alkaa `<?xml`, sisältää vähintään 500 `<loc>`-esiintymää.
   - Kaikki validoinnit läpi → kirjoittaa rungon tiedostoon `public/sitemap.xml` ja lokittaa `<loc>`-määrän.
   - Mikä tahansa validointi epäonnistuu (tai verkkovirhe) → selkeä virheloki, olemassa olevaa tiedostoa ei kosketa, poistuu koodilla 0 jotta build ei kaadu.

2. **`package.json`**: `"build": "node scripts/generate-sitemap.mjs && vite build"`. `build:dev`, `dev`, `lint` ja `preview` jäävät ennalleen.

3. **Verifiointi**: ajetaan skripti kerran ja raportoidaan kirjoitettujen `<loc>`-rivien määrä.

## Rajaukset

- Ei muutoksia `supabase/functions/generate-sitemap/index.ts`- tai `_shared/sitemapRoutes.ts`-tiedostoihin.
- Ei muutoksia `public/_redirects`-tiedostoon eikä yhteenkään sivuun, komponenttiin tai reittiin.
- `robots.txt` jätetään ennalleen (osoittaa jo oikeaan URLiin).

## Huomio lastmod-arvoista

Sitemapin `<lastmod>`-arvot tulevat reunafunktiosta. Jos ne johdetaan generointihetken päivämäärästä eivätkä sivukohtaisesta muokkausajasta, ne kannattaa poistaa — mutta se vaatisi reunafunktion muokkaamista, jonka tämä tehtävä kieltää. Kerro jos haluat sen erillisenä korjauksena.
