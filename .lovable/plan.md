## Tavoite
Nostaa näkyvyyttä "mökki"-hauissa (mökki Levi, mökit Leviltä, vuokramökki Levi, hirsimökki Levi, loma-asunto Levi). Suomalaiset käyttävät "mökki"-termiä yleisesti tarkoittaen mitä tahansa loma-majoitusta, joten kohdellaan mökki-termiä rinnakkaisena synonyyminä huoneistoille — ei vain hirsimökeille.

## Nykytilanne
- `/majoitukset` käsittelee pääosin "huoneisto"- ja "majoitus"-termejä; mökki mainitaan ohimennen
- Ei omaa mökki-fokusoitua laskeutumissivua
- `/opas/mokki-vai-huoneisto-levi` olemassa (vertailusivu, ei pyri "mökki Levi" -hakuun)
- `searchIndex` ja sitemap eivät sisällä mökki-pääsivua

## Toimenpiteet

### 1. Uusi laskeutumissivu: `/mokit-levilla` (ohjelmoitu SEO)
Uusi sivu `src/pages/MokitLevilla.tsx` joka kohdentaa "mökki Levi" -hakuihin.

**Sisältöstrategia (rehellinen, ei harhaanjohtava):**
- H1: "Mökit Leviltä — vuokramökit ja loma-asunnot keskustassa {vuosi}"
- Avausteksti selittää avoimesti: "Suomalaisille 'mökki' tarkoittaa usein mitä tahansa loma-asuntoa. Leville.net tarjoaa sekä perinteisiä hirsimökkejä että mökkimäisiä huoneistoja Levin keskustassa."
- 3 kategoriaa korteilla:
  1. **Perinteiset hirsimökit** — listaa oikeat hirsimökit (Bearlodge ym. `properties.ts`:stä jossa `type === "cabin"` tai vastaava)
  2. **Mökkimäiset huoneistot** — tilavat huoneistot omilla saunoilla (suositut "mökki"-hakijoille)
  3. **Suuret loma-asunnot ryhmille** — linkki `/large-group` -tyyppisiin
- FAQ-osio (FAQPage JSON-LD): "Onko Levillä vuokramökkejä?", "Mikä on mökin ja huoneiston ero?", "Onko mökeissä sauna?", "Mistä saa edullisen mökin Leviltä?"
- Meta title: `` `Mökit Leviltä ${new Date().getFullYear()} — vuokramökit ja loma-asunnot keskustassa` ``
- Meta description: "Vuokraa mökki Leviltä suoraan omistajalta. Hirsimökkejä ja tilavia loma-asuntoja Levin keskustassa, omat saunat ja kävelymatka rinteille."
- Canonical: `https://leville.net/mokit-levilla`
- Hreflang: vain `fi` + `x-default` (ei käännetä — "mökki" on suomenkielinen termi)
- Breadcrumbs + Read Next -osio (linkit `/opas/mokki-vai-huoneisto-levi`, `/majoitukset`, `/sauna`)

### 2. Reitti + sitemap
- `src/App.tsx`: lisää `<Route path="/mokit-levilla" element={<MokitLevilla />} />` (lazy import)
- `public/sitemap.xml`: lisää URL-merkintä (vain fi hreflang, x-default)
- `src/data/searchIndex.ts`: lisää uusi haku-entry "Mökit Leviltä"

### 3. Sisäiset linkit (boost)
Lisää linkki "Mökit Leviltä" -sivulle relevanteilta sivuilta:
- `Majoitukset.tsx` — Read Next / sisältöosio "Etsitkö mökkiä?"
- `CabinVsApartmentLevi.tsx` — CTA-linkki vertailun lopussa
- `Footer.tsx` — "Suosittu" -lista (jos sellainen on; muuten Majoitus-osio)
- `Index.tsx` (etusivu) — jokin olemassa oleva guide/aktiviteettilista

### 4. Olemassa olevien sivujen meta + sisältöoptimointi
- `/majoitukset` (FI): laajenna `keywords` sisältämään "mökki Levi, mökit Leviltä, vuokramökki Levi, hirsimökki Levi, loma-asunto Levi" (description ja title pidetään sellaisenaan — juuri optimoitu)
- Lisää lyhyt mökki-painotteinen kappale `Majoitukset.tsx` -sivulle (esim. "Etsitkö mökkiä Leviltä?" -lohko, joka linkittää uudelle sivulle ja selittää että useimmat 'mökki'-hakijat löytävät täydellisen majoituksen myös huoneistovalikoimasta)

### 5. Strukturoitu data
- Uudelle sivulle `CollectionPage` + `FAQPage` JSON-LD
- BreadcrumbList: Etusivu › Majoitus › Mökit Leviltä

## Tekniset yksityiskohdat
- Uusi tiedosto: `src/pages/MokitLevilla.tsx` (~250 riviä, samankaltainen rakenne kuin `Majoitukset.tsx`)
- Komponenttien uusiokäyttö: `Header`, `Footer`, `Breadcrumbs`, `JsonLd`, `HreflangTags`, `ReadNextSection`, `PropertyCard`
- Mökkikohteet poimitaan `src/data/properties.ts` -tiedostosta filtterillä (tarkistetaan ensin, mikä kenttä erottaa mökit huoneistoista)
- Vuosiluku: `${new Date().getFullYear()}` titlessa ja H1:ssä
- Memory-päivitys: lisätään `mem://features/mokit-levilla-seo-page` ja referenssi indexiin

## Sivun rakenne
```text
1. Hero: H1 + intro (avoin selitys mökki-termistä)
2. Kategorialohkot:
   - Hirsimökit (oikeat cabin-tyyppiset)
   - Mökkimäiset huoneistot
   - Ryhmämökit (8+ hlöä)
3. "Mikä on mökki?" -info-laatikko
4. FAQ (4-5 kysymystä)
5. Read Next -ruudukko
6. CTA varauskoneeseen (app.moder.fi/levillenet)
```

## Rajaus
- Ei käännetä muille kielille (mökki on suomalainen hakutermi)
- Ei muuteta hinnoittelua, kuvia eikä `properties.ts` -dataa
- Ei luvata "halvinta hintaa" — pidetään hintaneutraali (memory: price-parity)
