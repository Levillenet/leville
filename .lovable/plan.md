

# Lisää ~310 dynaamista SEO-sivua sitemapiin

## Tilanne
- Tietokanta: kaikki 310 SEO-sivua ovat **jo julkaistuja** (`is_published = true`)
- Reitit: toimivat App.tsx:n dynaamisen `seoComponentMap`-järjestelmän kautta
- Sitemap: **yksikään näistä 310 sivusta ei ole sitemapissa** — vain staattisesti määritellyt ~198 URL:ia

## Ratkaisu

Lisätään kaikki 31 komponenttiryhmää (310 URL:ia) `public/sitemap.xml`-tiedostoon hreflang-tageineen. Jokainen ryhmä saa yhden `<url>`-entryn per kieliversio, ja kaikki kieliversiot linkitetään toisiinsa hreflang-tageilla.

### Komponenttiryhmät ja URL-määrät (tietokannasta):

**7 kieliversiota (7 URL:ia/ryhmä):**
AccessibleLevi, ApresSkiLevi, BestTimeNorthernLightsLevi, CabinVsApartmentLevi, CanoeingAndSUPLevi, DayTripsFromLevi, EquipmentRentalLevi, EventsInLevi, FatbikeLevi, GolfLevi, HorseRidingLevi, HowNorthernLightsForm, IceFishingLevi, IceSwimmingLevi, LeviForKids, MonthlyGuideLevi (×12 kuukautta = 84 URL:ia), NewYearsEveLevi, NorthernLightsColorsExplained, NorthernLightsForecastLevi, NorthernLightsPhotographyLevi, NorthernLightsSeasonLevi, PackingListLapland, RomanticLeviGetaway, SamiCultureLevi, SantaClausLevi, SkiHolidayLevi, SnowshoeingLevi, SpringSkiingLevi, WhereToSeeNorthernLightsLevi

**1 kieliversio:**
ChristmasDinnerLeviFI (vain FI)

### Formaatti (kopioi olemassa olevista):
```xml
<url>
  <loc>https://leville.net/guide/accessible-levi</loc>
  <xhtml:link rel="alternate" hreflang="de" href="https://leville.net/de/ratgeber/barrierefreies-levi" />
  <xhtml:link rel="alternate" hreflang="en" href="https://leville.net/guide/accessible-levi" />
  <xhtml:link rel="alternate" hreflang="es" href="https://leville.net/es/guia/levi-accesible" />
  <xhtml:link rel="alternate" hreflang="fi" href="https://leville.net/opas/esteetton-levi" />
  <xhtml:link rel="alternate" hreflang="fr" href="https://leville.net/fr/guide/levi-accessible" />
  <xhtml:link rel="alternate" hreflang="nl" href="https://leville.net/nl/gids/toegankelijk-levi" />
  <xhtml:link rel="alternate" hreflang="sv" href="https://leville.net/sv/guide/tillgangligt-levi" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://leville.net/guide/accessible-levi" />
  <lastmod>2026-03-16</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### Toteutus
- Yksi tiedosto muuttuu: `public/sitemap.xml`
- Lisätään ~310 uutta `<url>`-entryä ennen `</urlset>`-sulkutagia
- Prioriteetti 0.7 kaikille (opas-sivut), MonthlyGuideLevi 0.6
- Kaikki URL:it tulevat suoraan tietokannasta (ei arvailua)

### MonthlyGuideLevi — erikoistapaus
Tietokannassa on 12 × 7 = 84 kuukausiopas-URL:ia (tammikuu–joulukuu, 7 kieltä). Nämä kaikki lisätään sitemapiin.

## Muutettavat tiedostot
- `public/sitemap.xml` — ~310 uutta URL-entryä

