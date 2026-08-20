# Kaamos-sivu Levillä (FI + EN)

## Validointi (tehty)

1. **Ei olemassa olevaa kaamos-/polar night -sivua tai reittiä.** Kaamos mainitaan vain olemassa olevissa oppaissa (WinterInLevi, LaplandGlossary, WeatherInLevi, revontulisivut ym.) — omaa sivua ei ole.
2. **Sivupohja vahvistettu** (`src/pages/guide/*`): Helmet, Header, Breadcrumbs, SubpageBackground, HreflangTags (customUrls), JsonLd + `src/utils/structuredData` (Article/FAQ/Breadcrumb), ReadNextSection, GuideDisclaimer, PageCTA, MajoitusCallout, Footer, WhatsAppChat, StickyBookingBar — käännösobjekti tiedoston sisällä, `lang`-prop.
3. **Linkkitarkistus:**
   - OK: `/opas/paras-aika-revontulet-levi`, `/opas/revontulisesonki-levi`, `/opas/revontulien-valokuvaus-levi`, `/opas/levi-joulukuussa`, `/opas/levi-tammikuussa`, `/revontulet`, `/majoitukset`, `/opas/laskettelu-levi`
   - EN-vastineet OK: `/guide/best-time-to-see-northern-lights-levi`, `/guide/northern-lights-season-levi`, `/guide/northern-lights-photography-levi`, `/guide/levi-in-december`, `/guide/levi-in-january`, `/en/northern-lights`, `/guide/skiing-in-levi`, `/en/accommodation`
   - **Talvivaateopas FI: `/opas/talvivarusteet-leville`** (löytyi, joten linkki tulee myös FI-versioon).
   - **Korjaus:** EN-osoite `/guide/winter-clothing-guide-levi` on redirect → käytän lopullista `/guide/how-to-dress-for-winter-in-levi-lapland`.

### Kaksi faktakorjausta ennen kirjoittamista

- **Etäisyys napapiirille:** Levi (~67,8° N) on noin **140 km** napapiiristä pohjoiseen, ei 170 km. Käytän muotoilua "noin 140 km napapiirin pohjoispuolella".
- **Kesto:** pidetään pyöreänä ("noin kolmisen viikkoa joulukuun puolivälin molemmin puolin", aurinko palaa vuodenvaihteen tienoilla) — ei keksittyjä tarkkoja päiviä.

### Kuvat

`src/assets`-kansiossa ei ole revontulikuvia, mutta sopivia kaamos-/hämäräkuvia löytyy — käytän kolmea olemassa olevaa (ei uusia tiedostoja):
- `src/assets/seasons/tykky-kaamos.jpg` (kaamosvalo tunturissa)
- `src/assets/seasons/night-trail-tykky.jpg` (valaistu latu/polku pimeässä)
- `src/assets/seasons/winter-sunset.jpg` (sininen hetki / hämärä)

## Mitä rakennetaan

**Uusi sivu:** `src/pages/guide/KaamosLevi.tsx` (`lang`-prop, fi default + en)

**Reitit** (`src/App.tsx`, lazy): `/opas/kaamos-levi` (FI), `/guide/polar-night-levi` (EN)

**SEO:** pyydetyt FI/EN title + description, kanoninen per kieli, HreflangTags customUrls fi (x-default) + en.

**Structured data:** Article + FAQPage + BreadcrumbList.

**Sisältö molemmilla kielillä:**
- Intro: mitä kaamos on, Levin sijainti (~140 km napapiirin pohjoispuolella), kesto pyöreästi, heti kärkeen se että kaamos ei ole mustaa pimeää — keskipäivällä useita tunteja hämärää ja sininen hetki. Varauslinkki (Moder, uusi välilehti, `data-booking-source`).
- H2 Milloin kaamos on Levillä — arvioitu ajoitus, vertailu Utsjokeen (pidempi) ja Rovaniemeen (käytännössä ei kaamosta), 3–5 tuntia hämärää keskipäivällä joulukuussa.
- H2 Sininen hetki — miltä näyttää, miksi valokuvaajat rakastavat, paras kellonaika.
- H2 Kaamos ja revontulet — enemmän pimeitä tunteja = enemmän mahdollisuuksia; linkit kolmeen revontuli-oppaaseen (kielikohtaisesti).
- H2 Mitä kaamosaikana tehdään — valaistut rinteet, ladut, safarit, saunat, joulutunnelma; linkit laskettelu- ja joulukuu-oppaisiin; rehellinen huomio ettei kaamos ole lomailijalle masentavaa.
- H2 Miten pukeutua ja jaksaa — kerrospukeutuminen, kevyt D-vitamiinimaininta, heijastimet; linkki talvivaateoppaaseen (FI `/opas/talvivarusteet-leville`, EN `/guide/how-to-dress-for-winter-in-levi-lapland`).
- H2 FAQ — 5 kysymystä pyynnön mukaan (kesto, onko täysin pimeää, revontulet, rinteet auki, milloin aurinko palaa).
- H2 Majoitus kaamosaikaan — toinen varauslinkki + `/majoitukset` (EN `/en/accommodation`).

**Read next:** joulukuu, tammikuu, revontulet-sivu, laskettelu, majoitukset (kielikohtaiset URLit).

**Sitemap:** molemmat URLit `src/data/sitemapRoutes.ts`:iin yhteisellä `altGroup`-avaimella → build-skripti generoi hreflang-parit.

**llms-full.txt:** lyhyt 2–3 rivin merkintä kaamossivusta revontuliosion yhteyteen, samassa muodossa kuin nykyiset merkinnät (linkki molempiin kieliversioihin).

## Tekniset huomiot

- `lang` välitetään Footerille, PageCTA:lle, StickyBookingBarille ja WhatsAppChatille.
- Kuvat `loading="lazy"`, sisältöleveä esitys, kielikohtaiset alt-tekstit.
- Ei hintoja, ei keksittyjä päivämääriä, ulkoiset linkit `target="_blank" rel="noopener noreferrer"`.
- Lopuksi type-check ja selaintarkistus molemmille reiteille.
