# Päällekkäisten majoitus-URLien siivous (vain reitit, canonical, sitemap)

Vahvistettu koodista ennen suunnitelmaa. Sisältöön, käännöksiin, H1:iin tai schemaan ei kosketa.

## Todennettu nykytila

- `CANONICAL_FI = "https://leville.net/mokit-levilla"` (`src/pages/MokitLevilla.tsx:26`). Eli **`/mokit-levilla` jää voimaan**, `/vuokramokit` muuttuu redirectiksi.
- `/en/accommodation` (App.tsx:233) ja `/en/accommodations` (App.tsx:275) renderöivät molemmat `<Majoitukset lang="en" />`.
- Yksikkömuoto `/en/accommodation` esiintyy näissä: `src/data/sitemapRoutes.ts:25`, `supabase/functions/_shared/sitemapRoutes.ts:26`, `src/App.tsx:233`, `src/pages/guide/WorldCupLevi.tsx:220,224`, `src/pages/guide/KaamosLevi.tsx:240,243`.
  - Huom: WorldCupLevi ja KaamosLevi ovat opassivuja, joihin ohje kieltää koskemasta. Katso kysymys alla.
- `src/data/searchIndex.ts:118` käyttää jo monikkoa — ei muutosta.
- Katuhubien reitti `/vuokramokit/:streetSlug` (App.tsx:246) on erillinen polku; exact-reitin `/vuokramokit` muuttaminen Navigateksi ei riko lapsireittejä.
- StreetHub käyttää canonicalina `/vuokramokit/<slug>` (StreetHub.tsx:35) — pysyy ennallaan.

## Muutokset

### Osa 1 — EN
1. `src/App.tsx:233`: `/en/accommodation` → `<Navigate to="/en/accommodations" replace />`. Reittiä ei poisteta.
2. `src/data/sitemapRoutes.ts:25`: `/en/accommodation` → `/en/accommodations`; varmistetaan ettei monikko esiinny kahdesti.
3. `supabase/functions/_shared/sitemapRoutes.ts:26`: sama korjaus, tiedostot pysyvät identtisinä rivin 1 kommenttia lukuun ottamatta.

### Osa 2 — FI
4. `src/App.tsx:249`: `/vuokramokit` → `<Navigate to="/mokit-levilla" replace />`.
5. `src/data/sitemapRoutes.ts:29` ja `supabase/functions/_shared/sitemapRoutes.ts:30`: poistetaan `/vuokramokit`-rivi. `/mokit-levilla` ja `/en/log-cabins-levi` jäävät samaan altGroupiin.

### Verifiointi
- Playwright: `/en/accommodation` ohjautuu monikkoon, `/mokit-levilla` renderöityy, ja kaikki neljä katuhubia (`hiihtajankuja-levi`, `skimbaajankuja-levi`, `glacier-apartments-levi`, `postintie-levi`) latautuvat.
- Sitemapin URL-määrä ennen/jälkeen raportoidaan.
- Build + typecheck.

## Avoin kysymys
`/en/accommodation`-osumat WorldCupLevi.tsx- ja KaamosLevi.tsx-sivuilla ovat opassivuilla, joihin ohje kieltää koskemasta, mutta kohta 1.4 käskee korjata kaikki esiintymät. Oletus tässä suunnitelmassa: **korjataan ne monikkoon**, koska muutos koskee vain linkin URLia eikä sisältöä. Sano jos ne pitää jättää rauhaan.
