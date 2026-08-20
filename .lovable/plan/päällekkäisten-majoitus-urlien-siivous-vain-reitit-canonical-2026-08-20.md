# Päällekkäisten majoitus-URLien siivous (vain reitit, canonical, sitemap)

Vahvistettu koodista. Sisältöön, käännöksiin, H1:iin tai schemaan ei kosketa.

## Todennettu nykytila

- `CANONICAL_FI = "https://leville.net/mokit-levilla"` (`src/pages/MokitLevilla.tsx:26`) → **`/mokit-levilla` jää voimaan**, `/vuokramokit` muuttuu redirectiksi.
- `/en/accommodation` (App.tsx:233) ja `/en/accommodations` (App.tsx:275) renderöivät molemmat `<Majoitukset lang="en" />`.
- Yksikkömuodon osumat: `src/App.tsx:233`, `src/data/sitemapRoutes.ts:25`, `supabase/functions/_shared/sitemapRoutes.ts:26`, `src/pages/guide/WorldCupLevi.tsx:220` (Read next -linkkitaulukko) ja `:224` (CTA-linkki `accommodationLink`), `src/pages/guide/KaamosLevi.tsx:240` (Read next -linkkitaulukko) ja `:243` (CTA-linkki).
- `src/data/searchIndex.ts:118` käyttää jo monikkoa — ei muutosta. HreflangTagsissa tai käännöstiedostoissa ei ole yksikkömuotoa.
- `/vuokramokit/:streetSlug` (App.tsx:246) on erillinen polku; exact-reitin muuttaminen ei riko sitä.

### Raportti kohtaan 2.3 (ei korjata nyt)
- StreetHub käyttää yleistä `<Breadcrumbs lang="fi" />` -komponenttia (`src/pages/StreetHub.tsx:102`), joka rakentaa polun URL-segmenteistä (`src/components/Breadcrumbs.tsx:83`). Katuhubin murupolku sisältää siis segmentin `/vuokramokit`, joka muuttuu redirectiksi.
- Muita sisäisiä linkkejä `/vuokramokit`-sivulle ei ole: ainoat muut osumat ovat `/vuokramokit/<slug>`-katuhubilinkkejä (StreetHub.tsx:184) tai eri sivu `/opas/vuokramokit-levi` (App.tsx:460, Majoitukset.tsx:245, VuokraMokitLevi.tsx:30,143). Footerissa tai navissa ei osumia.

## Muutokset

1. `src/App.tsx:233`: `/en/accommodation` → `<Navigate to="/en/accommodations" replace />` (reitti säilyy).
2. `src/App.tsx:249`: `/vuokramokit` → `<Navigate to="/mokit-levilla" replace />` (reitti säilyy).
3. `src/data/sitemapRoutes.ts`: rivi 25 monikkoon, rivi 29 `/vuokramokit` pois.
4. `supabase/functions/_shared/sitemapRoutes.ts`: sama (rivit 26 ja 30), tiedostot pysyvät identtisinä rivin 1 kommenttia lukuun ottamatta.
5. `src/pages/guide/WorldCupLevi.tsx:220,224` ja `src/pages/guide/KaamosLevi.tsx:240,243`: vain URL-merkkijono monikkoon, tekstejä ei muuteta.

## Verifiointi
- Playwright: `/en/accommodation` → `/en/accommodations`, `/vuokramokit` → `/mokit-levilla`, ja neljä katuhubia (`hiihtajankuja-levi`, `skimbaajankuja-levi`, `glacier-apartments-levi`, `postintie-levi`) latautuvat.
- Sitemapin URL-määrä ennen ja jälkeen, build + typecheck.
