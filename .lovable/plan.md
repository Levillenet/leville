

# Korjaus: `/opas/hiihtoladut-levi` ei toimi

## Ongelma
`GuideLinksSection.tsx` linkittää polkuun `/opas/hiihtoladut-levi`, mutta `App.tsx`:ssä reitti on `/opas/hiihto-levi`. Polut eivät täsmää → 404.

## Ratkaisu

Kaksi vaihtoehtoa — suosittelen **vaihtoehto A** koska `/opas/hiihtoladut-levi` on kuvaavampi URL ja parempi SEO:lle:

### Vaihtoehto A: Päivitä reitti ja routeConfig vastaamaan linkkiä

1. **`src/App.tsx`** — Muuta FI-reitti `/opas/hiihto-levi` → `/opas/hiihtoladut-levi`

2. **`src/translations/index.ts`** — Päivitä `crossCountrySkiing.fi`: `/opas/hiihto-levi` → `/opas/hiihtoladut-levi`

3. **`public/_redirects`** — Lisää 301-redirect vanhasta polusta:
   ```
   /opas/hiihto-levi    /opas/hiihtoladut-levi    301
   ```

4. **`public/sitemap.xml`** — Päivitä URL jos siellä on vanha polku

## Vaikutusalue
- Yksi reittimuutos App.tsx:ssä
- Yksi routeConfig-päivitys translations/index.ts:ssä  
- Yksi redirect-rivi _redirects-tiedostoon
- Sitemap-tarkistus

