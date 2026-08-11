# Soft 404 -korjaus: 12 uudelleenohjausreittiä + hosting-vastaus

## Osa 1 — Vastaus hosting-kysymykseen (tarkistettu projektista)

1. **Hosting**: projekti on julkaistu Lovable-hostingiin (published URL `leville.net`, alkuperäinen `leville.lovable.app`). Projektissa ei ole `netlify.toml`, `vercel.json` eikä `_headers` -tiedostoa — pelkkä Vite-build, joka tarjoillaan Lovablen staattisesta hostingista.
2. **Oikea mekanismi**: Lovable-hosting ei prosessoi `_redirects`-tiedostoa (se on Netlify-konventio). Lovablessa on sisäänrakennettu SPA-fallback, ja uudelleenohjaukset tehdään sovelluskoodissa Reactin routerilla (`<Navigate to="..." replace />`). Aitoa 301-vastausta HTTP-tasolla ei voi konfiguroida; client-side-ohjaus riittää Googlelle soft 404:n poistamiseen, koska vanha URL ohjaa välittömästi oikeaan osoitteeseen.
3. **Onko `public/_redirects` kuollutta konfiguraatiota?** Kyllä — sitä ei sovelleta lainkaan, ja se tarjoillaan sellaisenaan tekstitiedostona osoitteessa `/_redirects`. Se ei ole väärin deployattu, vaan väärän alustan formaatti.

**Tärkeä huomio**: samassa tiedostossa on `/sitemap.xml` → generate-sitemap -edge-funktion 200-rewrite. Sekään ei siis toimi, eli `leville.net/sitemap.xml` tarjoilee edelleen staattisen tiedoston (tai 404:n, jos vanha tiedosto on nimetty uudelleen). Tämä pitää ratkaista erikseen — en tee sille mitään tässä tehtävässä, mutta kerro jos haluat korjauksen (esim. dynaamisen sitemapin generointi build-aikaan `public/sitemap.xml`-tiedostoon).

En poista `public/_redirects`-tiedostoa tässä tehtävässä, koska ohje kieltää muut muutokset kuin reittien lisäyksen.

## Osa 2 — Lisättävät reitit `src/App.tsx`:ään

Kaikki 11 kohdepolkua on **varmistettu olemassa oleviksi** App.tsx:ssä. Lisätään "Old WordPress redirects" -lohkon yhteyteen:

| Lähde | Kohde |
|---|---|
| /es/guia/clima-en-levi | /es/levi/clima-en-levi |
| /fr/guide/meteo-a-levi | /fr/levi/meteo-a-levi |
| /sv/guide/vader-i-levi | /sv/levi/vader-i-levi |
| /es/guia/como-llegar-a-levi | /es/viaje/como-llegar-a-levi |
| /es/guia/auroras-boreales-levi | /es/auroras-boreales |
| /de/ratgeber/nordlichter-levi | /de/nordlichter |
| /nl/gids/vervoer-levi | /nl/gids/vervoer-in-levi |
| /fr/guide/photographie-aurores-boreales-levi | /fr/guide/photographier-aurores-boreales-levi |
| /es/alojamiento | /es/alojamientos |
| /latukartta | /latuinfo |
| /hiihtajankuja-5-b-2 (+ trailing slash) | /hiihtajankuja |

Jokainen muodossa `<Route path="..." element={<Navigate to="..." replace />} />`.

## Rajaukset

- Ei muutoksia sivukomponentteihin, käännöksiin, sisältöön tai olemassa oleviin reitteihin.
- Ei lisäyksiä sitemapiin eikä muutoksia `supabase/functions/_shared/sitemapRoutes.ts`-tiedostoon.
- Lopuksi tyyppitarkistus, että reitit kääntyvät virheettä.
