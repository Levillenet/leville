

# Sitemap XML-muotoilukorjaus: yksiriviset entryt moniriviksi

## Ongelma
Rivit 3302–3598 (297 riviä) sisältävät ~200 URL-entryä joissa koko `<url>...</url>` on yhdellä rivillä. XML on teknisesti validia mutta huonosti luettavaa ja epäyhtenäistä vanhojen entryjen kanssa (rivit 2491–3299 ovat oikein muotoiltuja).

## Vaikuttavat komponenttiryhmät (kaikki yksirivisinä)
FatbikeLevi, GolfLevi, HorseRidingLevi, HowNorthernLightsForm, IceFishingLevi, IceSwimmingLevi, LeviForKids, MonthlyGuideLevi (tammi–joulu, 84 URL:ia), NewYearsEveLevi, NorthernLightsColorsExplained, NorthernLightsForecastLevi, NorthernLightsPhotographyLevi, NorthernLightsSeasonLevi, PackingListLapland, RomanticLeviGetaway, SamiCultureLevi, SantaClausLevi, SkiHolidayLevi, SnowshoeingLevi, SpringSkiingLevi, WhereToSeeNorthernLightsLevi

## Korjaus
Korvaa rivit 3302–3598 uudelleenmuotoilluilla entryillä joissa:
1. `<url>` omalla rivillään
2. `<loc>URL</loc>` omalla rivillään (4 välilyönnin sisennys)
3. Jokainen `<xhtml:link>` omalla rivillään
4. `<lastmod>`, `<changefreq>`, `<priority>` omilla riveillään
5. `</url>` omalla rivillään (2 välilyönnin sisennys)

Sisältö pysyy täysin samana — vain muotoilu muuttuu.

## Tekninen toteutus
- Tiedosto: `public/sitemap.xml`
- Alue: rivit 3302–3598 (korvataan ~3500 rivillä oikein muotoiltua XML:ää)
- Vanhat entryt (rivit 1–3299) eivät muutu
- `</urlset>` säilyy lopussa

## Riskit
- Ei sisällöllisiä muutoksia, pelkkä whitespace-reformatointi
- XML-validius säilyy (teknisesti jo validi, mutta yhtenäinen muotoilu)

