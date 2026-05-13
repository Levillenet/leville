## Tavoite

Parantaa /majoitukset-sivun sijoittumista hakuihin "majoitus Levi" ja "vuokramökit Levi", ja luoda katuosoite-pohjaiset SEO-sivut Hiihtäjänkujalle (Front Slope), Skimbaajankujalle (Karhupirtti) ja Ratsastajankujalle 2 (Glacier A & B).

---

## URL-muoto: päätös

**Suositus: `/vuokramokit/<katu>-levi`** (esim. `/vuokramokit/hiihtajankuja-levi`).

Perustelut:
- "vuokramökit" on iso transaktionaalinen hakusana – kilpailija `levillas.fi` rankkaa juuri tähän.
- Slug-keyword URL antaa relevanssisignaalin Googlelle ja näkyy SERPin URL-leivänmuruissa.
- "majoitus + Levi" jää H1:een ja meta-tekstiin, joten emme menetä toistakaan termiä.
- Ei törmäysriskiä olemassa olevien `/majoitukset/<slug>` -reittien kanssa.

---

## 1) /majoitukset – on-page SEO

`src/pages/Majoitukset.tsx`:

- **H1:** "Majoitus Levillä – vuokramökit ja huoneistot Levin keskustassa"
- **`<title>`:** "Majoitus Levillä – vuokramökit ja huoneistot keskustassa | Leville"
- **Meta description (≤155 mrk):** "Vuokraa majoitus Levin keskustasta: vuokramökit ja huoneistot Hiihtäjänkujalla, Skimbaajankujalla ja Ratsastajankujalla. Saunat, lähellä rinteitä – varaa suoraan."
- Intro-kappale (~150 sanaa) H1:n alle: termit *majoitus Levi*, *vuokramökit Levi*, *huoneisto Levin keskusta*. Linkit kolmelle uudelle katu-hubille.
- JSON-LD: `CollectionPage` + `BreadcrumbList`.
- Näkyvä "Selaa kaduittain" -osio (3 korttia).

---

## 2) Katu-pohjaiset hub-sivut

Yksi jaettu `src/pages/StreetHub.tsx` + dataobjekti `src/data/street-hubs.ts` (kadut → property-slugit + kuvausteksti). Sivu renderöi: H1, 200–300 sanaa paikallista kontekstia (etäisyys gondoliin, palvelut, kadun luonne), kohdegridin (linkit `/majoitukset/<slug>`), BreadcrumbList + ItemList JSON-LD, canonical itseensä.

| Uusi URL | Osoite | Kohteet |
|---|---|---|
| `/vuokramokit/hiihtajankuja-levi` | Hiihtäjänkuja | front-slope-5a2, front-slope-5b2, front-slope-5b5-penthouse |
| `/vuokramokit/skimbaajankuja-levi` | Skimbaajankuja | karhupirtti |
| `/vuokramokit/ratsastajankuja-levi` | Ratsastajankuja 2 | glacier-a1…a6, glacier-b1…b4 (11 kohdetta) |

Karhunvartija jätetään pois.

Reitit lisätään `src/App.tsx`:ään.

---

## 3) Yksittäisten kohteiden meta-päivitykset

`PropertyDetail`-Helmetiin katuosoite ja "Levi keskusta":

- Front Slope A2/B2/B5 → "… – Hiihtäjänkuja, Levi keskusta | Leville"
- Karhupirtti → "Karhupirtti – Skimbaajankuja, Levi | Leville"
- Glacier A1…B4 → "Glacier <X> – Ratsastajankuja 2, Levi | Leville"

Lyhyt katumainita näkyvään tekstiin jos puuttuu.

---

## 4) Sisäinen linkitys

- /majoitukset → 3 katuhubia + suosituimmat kohteet
- Katuhub → ko. kadun kohteet ja takaisin /majoitukset
- Property-sivu → "Muut huoneistot samalla kadulla" (max 3) + linkki katuhubille
- Footer "Suosittua majoitusta": 3 katuhub-linkkiä

---

## 5) Sitemap

`public/sitemap.xml`: lisätään 3 uutta hub-URL:ia (FI). Ei hreflangia (vain FI). Lastmod 2026-05-13.

---

## 6) Mittaaminen

GSC-seuranta: "majoitus levi", "vuokramökit levi", "huoneisto hiihtäjänkuja levi", "mökki ratsastajankuja levi", "karhupirtti skimbaajankuja". Tulokset näkyvät 2–6 viikossa.

---

## Tekniset huomiot

- Ei muuteta olemassa olevia `/majoitukset/<slug>`-reittejä.
- Yksi jaettu `StreetHub`-komponentti pitää koodin DRY:nä; uusi katu = yksi rivi `street-hubs.ts`:ään.
- Canonical-domain `https://leville.net`.
