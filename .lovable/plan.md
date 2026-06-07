# Suunnitelma: Levillas.fi:n ohitus orgaanisessa haussa

**Tilanne tänään (Semrush, FI-tietokanta):**
- levillas.fi: 239 avainsanaa, ~2 344 käyntiä/kk — 87 % yhdeltä sivulta (etusivu)
- leville.net: 591 avainsanaa, ~2 814 käyntiä/kk — liikenne pirstaloitunut oppaisiin

Olet jo edellä liikenteessä, mutta **häviät 5 kategorian ydintermissä** (~25 000 hakua/kk yhteensä):

| Termi | Volyymi | Levillas | Leville |
|---|---:|---:|---:|
| majoitus levi | 12 100 | #3 | ei top 10 |
| levi majoitus | 6 600 | #4 | ei top 10 |
| levi mökit | 2 400 | #4 | ei top 10 |
| levi mökkimajoitus | 2 400 | #4 | ei top 10 |
| vuokramökit levi | 1 300 | #5 | ei top 10 |

Suunnitelma on rakennettu näiden valloittamiseen ilman, että menetämme nykyistä pitkän hännän etua.

---

## Vaihe 1 — Etusivun "ydintermien valtaus" (viikko 1)

Tavoite: nostaa leville.net etusivu top 5:een termeillä "majoitus levi" ja "levi majoitus".

**Mitä tehdään:**
- Kirjoitetaan `index.html` title + meta description uudelleen niin, että "majoitus Levi" on ensimmäisten 60 merkin sisällä
- Etusivun H1 muutetaan muotoon, joka sisältää "Majoitus Levi" + brändi (esim. *"Majoitus Levillä — premium-huoneistot ja mökit Levin keskustassa"*)
- Lisätään etusivulle 200–300 sanan SEO-tekstiosio (näkyvä, ei piilotettu): kattaa termit *majoitus levi, levi mökit, levi mökkimajoitus, vuokramökit levi, levi huoneistot, levi suites*
- Sisäisten linkkien ankkuritekstit kotisivulta huoneistoihin: vaihdetaan "Katso lisää" → "majoitus Levillä – {kiinteistön nimi}"
- LodgingBusiness JSON-LD etusivulle (aggregateRating + areaServed: Levi)

**Mittari:** seuranta `serp_analysis`-työkalulla 2 viikon välein 5 ydintermille.

---

## Vaihe 2 — Kiinteistösivujen osoitepohjainen optimointi (viikko 1–2)

Tavoite: napata kaikki "{katuosoite}" + "{rakennusnimi}" -haut, joissa levillas rankkaa #1.

Sinulla on jo `properties.ts`:ssä `address: { street, postalCode, city }` joka kiinteistölle. Tämä on raakamateriaali — pitää vain saada title-tageihin ja H1:iin.

**Mitä tehdään huoneistosivuille (`/majoitus/{slug}`):**
- Title-tag template: `{Huoneiston nimi} – {katuosoite}, Levi | Leville`
- H1 sisältää katuosoitteen näkyvänä tekstinä
- Slug-tarkistus: jos slugissa ei ole katuosoitetta, lisätään 301-aliakset (esim. `/majoitus/hissitie-15-a4` → kanoninen sivu). 200-Alias-strategia on jo käytössä projektissa.
- Meta description sisältää osoitteen, makuuhuoneiden määrän ja etäisyyden Zero Pointiin
- LodgingBusiness JSON-LD per kiinteistö (address + geo + numberOfRooms)
- Lisätään kiinteistösivun loppuun "Lähistöllä myös" -gridi → linkit muihin saman rakennuksen huoneistoihin

**Mittari:** kuukauden päästä `top_pages(leville.net)` — onko huoneistosivuja noussut top 10:een?

---

## Vaihe 3 — Rakennusklusteri-hubit (viikko 2–3)

Tavoite: dominoida rakennusten brändinimi-hakuja (Skistar, Zero Point, Hissitie, Tunturinlaita-tyyliin).

Levillas tekee tätä Skimbaajankujalla, Tunturinlaita -tyyliin — heillä on useita huoneistosivuja samasta rakennuksesta, jotka linkittävät toisiinsa. Sinulla on **enemmän** huoneistoja per rakennus (esim. 8 Skistar-yksikköä Postintie 3:ssa) mutta ei hub-sivua.

**Mitä tehdään:**
- Uusi reitti `/majoitus/rakennus/{rakennus-slug}` per rakennus, joissa ≥2 huoneistoa
  - skistar-postintie-3 (8 yksikköä)
  - zero-point-hiihtajankuja-5 (3 yksikköä)
  - mahdolliset muut, joita kerätään `properties.ts`:stä groupBy address.street
- Hub-sivu sisältää: rakennuksen esittely, sijaintikartta (jo olemassa Mapbox), kaikki huoneistot gridissä, FAQ rakennuksesta
- Title: `{Rakennuksen nimi} – Levi | Huoneistot ja varaus`
- CollectionPage + ItemList JSON-LD
- Linkitetään etusivun listausgridistä rakennushub-sivuille (uusi navigaatiotasaus)

---

## Vaihe 4 — Pitkän hännän vahvistus (jatkuva)

Tämä on jo käynnissä — oppaat ja kausi-hubit tuovat sinulle 591 avainsanaa vs. levillaksen 239. Älä hidasta.

**Pieni täsmälisäys:** sisäiset linkit oppaista huoneistosivuille kategoriaohjeen "Where to stay" -osiosta. Käytä ankkureita kuten *"majoitus Levin keskustassa"* → linkki etusivulle, ja *"huoneistot Zero Pointin vieressä"* → linkki Zero Point -klusterihubille.

---

## Tekninen kohta — toteutuksen sijainnit

```text
Vaihe 1:
  index.html                          // title, description, JSON-LD
  src/pages/Levi.tsx tai Index.tsx    // H1, SEO-tekstiosio, ankkuritekstit

Vaihe 2:
  src/pages/PropertyDetail.tsx        // title/H1/meta template
  src/data/properties.ts              // ei muutoksia, lukutiedot
  src/App.tsx                         // 301/200-aliakset osoiteslugeille

Vaihe 3:
  src/data/properties.ts              // groupBy address.street
  src/pages/BuildingHub.tsx (uusi)    // hub-sivun komponentti
  src/App.tsx                         // /majoitus/rakennus/:slug -reitti
  public/sitemap.xml                  // uudet hub-URLit
```

Hreflang-säännön mukaisesti: hub-sivut julkaistaan ensin **vain suomeksi**. Käännöksiä ei lisätä sitemappiin/hreflangiin ennen kuin sisältö on käännetty.

---

## Aikataulu ja tulosodotukset

| Viikko | Tehdään | Tulokset näkyvät |
|---|---|---|
| 1 | Vaihe 1 (etusivu) | 4–8 viikkoa |
| 1–2 | Vaihe 2 (kiinteistösivut) | 2–6 viikkoa (osoitehaut ovat helppoja) |
| 2–3 | Vaihe 3 (rakennushubit) | 6–12 viikkoa |
| jatkuva | Vaihe 4 | jo voitetut, ylläpito |

**Realistinen tavoite 3 kk:** leville.net top 5:ssä termille *majoitus levi*, top 3:ssa termille *levi mökkimajoitus*, ja kokonaisliikenne 4 500–6 000/kk (vs. levillaksen 2 344).

---

## Mitä **ei** tehdä

- Ei pirstaloida geneerisiä termejä useille laskeutumissivuille — yksi vahva etusivu voittaa
- Ei kopioida levillaksen sisältöä; tehdään parempi (oppaat + osoitepohjainen syvyys)
- Ei luvata "halvinta hintaa" (price parity -sääntö)
- Ei lisätä hreflang-aliaksia kääntämättömille sivuille

Hyväksy suunnitelma, niin aloitan Vaiheesta 1.
