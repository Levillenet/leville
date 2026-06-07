## Plan A: Majoitus-sivun SEO-optimointi

### Osoitteet (vahvistettu)

| # | Rakennus | Osoite | Huoneistot |
|---|---|---|---|
| 1 | Zero Point | Hiihtäjänkuja 5, 99130 Sirkka | 5A2, 5B2, 5B5 penthouse |
| 2 | Karhupirtti | Skimbaajankuja 3, 99130 Sirkka | karhupirtti |
| 3 | Skistar Levi Centre | Postintie 3, 99130 Sirkka | 102, 104, 209, 210, 211, 212, 319, 320, 321 |
| 4 | Karhunvartija 3 | Skimbaajankuja 4, 99130 Sirkka | karhunvartija-3 |
| 5 | Levi Platinum A2 | Hiihtäjänkuja 2, 99130 Sirkka | levi-platinum-a2 |
| 6 | Moonlight 415 | Leviraitti ?, 99130 Sirkka | moonlight-415 |
| 7 | Glacier A-talo | Ratsastajankuja 2, 99130 Sirkka | A1–A6 |
| 8 | Glacier B-talo | Ratsastajankuja 2, 99130 Sirkka | B1–B4 |

Huom: Leviraitin katunumero puuttuu — käytän pelkkää "Leviraitti, 99130 Sirkka" ellei toimiteta tarkennusta.

### Toteutettavat muutokset

**1. `src/data/properties.ts`**
- Lisää `Property`-tyyppiin valinnainen `address?: { street: string; postalCode: string; city: string }` -kenttä.
- Täytä osoite jokaiseen 27 huoneistoon yllä olevan taulukon mukaisesti.

**2. `src/pages/Accommodation.tsx` (tai vastaava majoituslistaussivu)**
- **Meta-tagit** (Helmet):
  - `<title>`: "Majoitus Levillä – 27 huoneistoa ski-in/ski-out | Leville.net" (62 merkkiä)
  - `<meta description>`: "Vuokraa loma-asunto Levin keskustasta: 27 huoneistoa Zero Pointissa, Skistarissa, Glacierissa, Karhupirtissä. Suora varaus ilman välikäsiä." (158 merkkiä)
  - `<link rel="canonical">` → `https://leville.net/majoitus`
  - `og:title`, `og:description`, `og:url`, `og:type=website`
  - Hreflang: fi/en/sv/de/no/ru/x-default
- **JSON-LD `ItemList`**: 27 huoneistoa, jokainen `ListItem` osoittaa kohteen URL:iin
- **JSON-LD `LodgingBusiness`** × 8: yksi per rakennus, sisältäen:
  - `name`, `address` (PostalAddress: streetAddress, postalCode, addressLocality=Sirkka, addressRegion=Lappi, addressCountry=FI)
  - `geo` (lat/lon, lisätään myöhemmin tarvittaessa)
  - `url` rakennuksen ankkuriin
  - `containsPlace` viittaa huoneistoihin
- **SEO-tekstilohko (~350 sanaa)** sivun alaosaan:
  - H2: "Majoitus Levillä – kaikki 27 huoneistoamme"
  - Lyhyt esittely Levin keskustasta + ski-in/ski-out
  - 8 alaotsikkoa (H3) per rakennus, jokaisessa osoite, etäisyys rinteille/keskustaan, lyhyt kuvaus, linkit huoneistoihin
  - Sisäiset linkit: vertailusivu, alueoppaat (Sirkka, Levi-keskusta)

**3. 200-alias URL:t (rewrite App.tsx:ssä)**
Lisää seuraavat aliakset jotka palvelevat samaa `Accommodation`-komponenttia (parantaa long-tail-näkyvyyttä):
- `/majoitus-levi`
- `/loma-asunto-levi`
- `/huoneisto-levi`
- `/vuokra-asunto-levi`
- `/levi-majoitus-keskusta`
- (englanniksi) `/levi-accommodation`, `/apartment-levi`, `/ski-in-ski-out-levi`

Jokaiselle canonical osoittaa pää-URLiin `/majoitus` → ei ghost-URL-ongelmaa, ei sitemap-merkintää.

**4. Sitemap**
- Lisätään vain pää-URL `/majoitus` (jos puuttuu). Aliakset EIVÄT mene sitemappiin (memory: ghost-URL-prevention).

### Tekniset yksityiskohdat

- Helmet-tagit dynamic year: `${new Date().getFullYear()}` titlessä jos relevanttia
- JSON-LD generoidaan loopilla `properties`-arraysta → ylläpidettävä
- Kaikki ulkoiset linkit `target="_blank"` (memory)
- Ei hintalupauksia (price parity policy)
- Domain `leville.net` ilman trailing slashia

### Plan D (callout-laajennus oppaisiin) — toteutetaan tämän jälkeen
Lisätään `<AccommodationCallout />`-komponentti seuraaviin oppaisiin: Levi-opas-hub, Sirkka-opas, ravintolaopas, aktiviteettihub, kausioppaat. Komponentti linkittää `/majoitus`-sivulle ja näyttää "27 huoneistoa keskustassa".

### Vahvistuspyyntö
- OK osoitelistaukseen? (erityisesti Leviraitin numero puuttuu — käytetäänkö ilman vai onko numero?)
- OK title-ehdotus "27 huoneistoa ski-in/ski-out"?
- OK 200-alias-listaan vai haluatko lisätä/poistaa joitain?
