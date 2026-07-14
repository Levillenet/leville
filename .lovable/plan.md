
# SEO Vaihe 2 – brändinimet + kaupallinen /majoitukset-taulu (korjattu)

Korjaus: **Glacier Apartments on 4–5 makuuhuoneen perhehuoneistot Levin ydinkeskustassa Zero Point -alueella** (ei 2 mh Alppikylässä). Päivitetty alle.

## Mitä tehdään

### 1. Brändisivujen H1 + meta + JSON-LD (5 sivua)

| Sivu | H1 | Meta description (~155 mrk) |
|---|---|---|
| `/vuokramokit/glacier-apartments` | **Glacier Apartments Levi – 4–5 makuuhuoneen perhehuoneistot Zero Pointissa** | Glacier-huoneistot Levin ydinkeskustassa Zero Pointissa: 4–5 makuuhuoneen saunalliset perhehuoneistot, hissit ja rinteet vieressä. Varaa suoraan. |
| `/vuokramokit/skimbaajankuja-karhupirtti` | **Bear Lodge / Karhupirtti Levi – 14 hengen hirsihuvila Etelärinteellä** | Bear Lodge Karhupirtti: 14 hengen hirsihuvila oma poreallas ja sauna, Etelärinteellä Levillä. |
| `/vuokramokit/hiihtajankuja-eturinne` | **Front Slope Apartments Levi – vuokrahuoneistot Eturinteellä** | Front Slope -huoneistot Eturinteellä Levillä: rinne ja hissi 50 m, saunalliset kämpät 2–8 hengelle. |
| `/vuokramokit/postintie-3-skistar` | **Skistar-talon huoneistot Levi – Postintie 3 keskustassa** | Skistar-talon vuokrahuoneistot Levin keskustassa, kylpylän vieressä. Saunallisia kämppiä 2–6 hengelle. |
| `/vuokramokit/ratsastajankuja` | (nykyinen ok, vain JSON-LD `alternateName`) | – |

Jokainen sivu saa `LodgingBusiness` JSON-LD -skeeman `alternateName`-kentässä brändinimet + Glacierille `address.streetAddress` = Zero Point / ydinkeskusta. Vain `<Helmet>` + yksi `<script type="application/ld+json">` -blokki, ei sisältömuutoksia.

### 2. `/majoitukset` kaupalliseksi hubiksi

Uusi komponentti `AccommodationHubTable` intron alle:

```text
Kaikki majoituskohteemme Levillä
┌────────────────────────┬───────────────┬───────┬────────────────────┐
│ Kohde                  │ Sijainti      │ Hengil│ CTA                │
├────────────────────────┼───────────────┼───────┼────────────────────┤
│ Glacier Apartments     │ Zero Point,   │ 8–12  │ Katso saatavuus →  │
│                        │ ydinkeskusta  │ (4–5mh)│                   │
│ Bear Lodge (Karhupir…) │ Etelärinne    │ 14    │ Katso saatavuus →  │
│ Front Slope Apartments │ Eturinne      │ 2–8   │ Katso saatavuus →  │
│ Skistar-talo           │ Keskusta      │ 2–6   │ Katso saatavuus →  │
│ Ratsastajankuja        │ Alppikylä     │ 4–6   │ Katso saatavuus →  │
└────────────────────────┴───────────────┴───────┴────────────────────┘
```

- Data `src/data/street-hubs.ts` + `properties.ts` -yhdistelmästä
- Rivit linkkaavat katu-hubeihin (sisäinen linkkiverkko)
- CTA vie Moder-linkkiin, hintaneutraali per memoria

### 3. Sisäinen linkkiverkko

- **Etusivun `HomeSeoBlock`**: nosto "Katso kaikki majoituskohteet" → `/majoitukset` + 3 brändinostoa (Glacier / Bear Lodge / Skistar) suoraan katu-hubien URL-osoitteisiin.
- **Katu-hub-sivujen alalaitaan** "Muut kohteemme Levillä" -komponentti, joka listaa 3 sisarkohdetta.
- **Footerin "Suositut kohteet"** -sarake vaihtaa 3 vanhaa linkkiä brändinimiin.

## Kohdehakusanat

| Hakusana | Volyymi/kk | Sivu | Odotus |
|---|---|---|---|
| glacier levi / glacier apartments levi | ~90 | Glacier hub | #1–2 |
| perhemajoitus levi / iso huoneisto levi | ~60 | Glacier hub | #3–6 |
| bear lodge levi / karhupirtti levi | ~70 | Bear Lodge hub | #1–3 |
| skistar levi / skistar-talo levi | ~110 | Skistar hub | #1–3 |
| front slope levi | ~40 | Eturinne hub | #1–3 |
| levi huoneistot | 50 | /majoitukset + Glacier/Skistar | #3–5 |
| chalet levi | 210 | /majoitukset | #5–8 |

## Mitä EI kosketa

Oppaat, blogit, kausisivut, Moder-integraatio, hero-kuvat, layoutit, `properties.ts` hinta/kuvatieto, muut kielet kuin fi + en.

## Tekninen toteutus

Muokataan (6 tiedostoa):
- `src/data/street-hubs.ts` — Glacier-hubin metaTitle/description/location korjaus (Zero Point, 4–5 mh) + 3 muun hubin meta + `brandNames`-kenttä
- `src/pages/hubs/StreetHubPage.tsx` — H1 brandNamesista, JSON-LD `alternateName`, "Muut kohteemme" alalaitaan
- `src/pages/Majoitukset.tsx` — `<AccommodationHubTable />` intron alle
- `src/components/AccommodationHubTable.tsx` — UUSI, ~80 riviä
- `src/components/HomeSeoBlock.tsx` — 3 brändilinkkiä
- `src/components/SiteFooter.tsx` — "Suositut kohteet" brändinimiksi

Ennen koodausta luen `street-hubs.ts` läpi ja tarkistan että Glacier-hubin nykyinen sijainti/mh-tieto muualla (properties.ts, mahdolliset opastekstit) päivittyy samaan totuuteen — jos näissä on ristiriitaisuuksia listaan ne ja pyydän hyväksynnän ennen muutosta.

Kun hyväksyt, toteutan kaikki tiedostot samassa vaiheessa ja päivitän `.lovable/plan.md`-statuksen: Vaihe 2 = valmis. Vaihe 3 (`/vuokramokit-levi` uusi laskeutumissivu) jää seuraavaksi.
