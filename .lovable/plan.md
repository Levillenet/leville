# Näkemys: /majoitukset vs /opas/majoitus-levilla -kannibalisointi

Tarkistin jokaisen kohdan koodista. Alla vastaukset (a) onko turvallinen, (b) tarkka vanha → uusi, (c) muut viittaukset — sekä kolme faktavirhettä ehdotuksessa, jotka pitää korjata ennen toteutusta.

## 1. Meta title (/majoitukset)

(a) Turvallinen. HUOM: dynaaminen vuosi on aiemmin ollut tietoinen SEO-strategia (muistissa "Dynamic Year Strategy") — staattiseen siirtyminen on OK, mutta vuosi katoaa samalla.

(b) `src/translations/fi.ts:59`:
- VANHA: `` `Majoitus Levillä ${new Date().getFullYear()} – Vuokramökit ja huoneistot Levin keskustassa | Leville.net` `` (75 merkkiä, liian pitkä)
- UUSI: `"Majoitus Levi – huoneistot ja hirsihuvila suoraan omistajalta"` (tasan 60 merkkiä ✓)

(c) `getFullYear()` näyttää käytössä vain tässä ja en.ts:n vastaavassa meta-titlessä (jota ei nyt muuteta). Ei muita riippuvuuksia. `src/data/searchIndex.ts:31` ("Majoitukset", kuvaus "Huoneistot ja mökit Levin keskustassa") ja `HomeSeoBlock.tsx:16` ("Kaikki vuokramökit ja huoneistot Leviltä") käyttävät vanhaa mökki-painotusta — eivät riko mitään, mutta suosittelen päivitystä samassa yhteydessä (esim. "Huoneistot ja hirsihuvila Levin keskustassa"). llms.txt ja llms-full.txt linkittävät vain URL:iin, ei tekstimuutosta.

## 2. Meta description — KAKSI FAKTAVIRHETTÄ

(a) Ehdotus ei ole sellaisenaan turvallinen:

- **Virhe 1:** "26 saunallista huoneistoa" — Studio 102:ssa EI ole saunaa (properties.ts + StudioApartments.tsx: "the only one without a sauna"). Oikein: 25 saunallista + 1 saunaton studio.
- **Virhe 2:** "200–700 m rinteille" — tätä väliä ei voi todentaa. Varmennetut etäisyydet: Skistar ~700 m, Moonlight ~400 m, Glacier/Platinum/Hiihtäjänkuja "rinteen juurella" (eli reilusti alle 200 m). Karhupirtin etäisyyttä ei ole verifioitu mihinkään lukemaan. Turvallinen muoto: "rinteiden juurelta 700 m:iin".
- **Lisäksi:** ehdotus on ~181 merkkiä — yli 160 merkin suosituksen, leikkautuu hakutuloksissa.

(b) Ehdotettu korjattu versio (155 merkkiä):
- VANHA: "Majoitus Levillä suoraan omistajalta: vuokramökit, mökkivuokraus ja modernit huoneistot Levin keskustassa. Saunallisia mökkejä ja huoneistoja kävelymatkan päässä rinteistä – ilman välityspalkkioita." (~194 m)
- UUSI: "26 huoneistoa ja hirsihuvila Levin keskustassa, rinteiden juurelta 700 m:iin. Mökkilomatunnelmaa ilman välityspalkkiota – varaa suoraan omistajalta."

## 3. Meta keywords poisto

(a) Turvallinen. `keywords`-kenttää lukee AINOA paikka: `Majoitukset.tsx:176`. Tyyppi `Translations = typeof fi` on johdettu, ei erillistä rajapintaa — poisto ei riko käännöksiä. sv/nl/de/es/fr-tiedostoissa on omia keywords-kenttiä, mutta niitä ei käytä /majoitukset-sivulla (komponentti on yhteinen), joten niitä ei tarvitse koskea.

(b) Poistetaan:
- `fi.ts:61` koko `keywords:`-rivi
- `en.ts:61` koko `keywords:`-rivi
- `Majoitukset.tsx:176` `<meta name="keywords" ... />`

## 4. H1 + subtitle

(b) H1, `fi.ts:64`:
- VANHA: "Majoitus Levillä – vuokramökit ja huoneistot Levin keskustassa"
- UUSI: "Majoitus Levillä – huoneistot ja hirsihuvila Levin keskustassa"

Subtitle, `fi.ts:65` — ehdotukseni (huoneisto-painotteinen, säilyttää "suoraan omistajalta ilman välityspalkkioita", "mökki" vain mökkiloma-ilmaisussa):
- VANHA: "Saunalliset vuokramökit ja modernit huoneistot Levin ydinkeskustassa – kävelymatkan päässä rinteistä, ravintoloista ja palveluista. Mökkivuokraus suoraan omistajalta ilman välityspalkkioita."
- UUSI: "Modernit huoneistot ja tunnelmallinen hirsihuvila Levin ydinkeskustassa – kävelymatkan päässä rinteistä, ravintoloista ja palveluista. Mökkiloman rauha keskustan tuntumassa, suoraan omistajalta ilman välityspalkkioita."

(c) H1 renderöityy `Majoitukset.tsx:208` suoraan `t.title`:stä — ei muita viittauksia.

## 5. Glacier "Uudet" -faktavirhe — EHDOTUKSESSA UUSI VIRHE

(a) Korjaus tarpeen (rakennus valmistunut 2000 — ApartmentsFor6/8.tsx sanovat oikein "built in 2000"). MUTTA ehdotettu korvausteksti sanoo "rinteen yläpäässä", mikä on ristiriidassa sivuston kanssa: kaikki muut lähteet (ApartmentsHub, ApartmentsFor8, ThreeBedroomApartments) sanovat Glacier sijaitsevan "eturinteen juurella" (foot of the front slope). "Yläpäässä" olisi uusi faktavirhe.

(b) `Majoitukset.tsx:113`:
- VANHA FI: "Uudet alppitalon huoneistot ja penthouse rinteen yläpäässä – sauna, takka ja näköalat."
- UUSI FI: "Alppitalon huoneistot ja penthouse eturinteen juurella – sauna, takka ja näköalat."
- VANHA EN: "New alpine apartments and a penthouse at the top of the front slope — sauna, fireplace and views."
- UUSI EN: "Alpine apartments and a penthouse at the foot of the front slope — sauna, fireplace and views."

(c) Muualla "uusi/newest" esiintyy vain Levi Platinum A2:sta (valm. 2023) — se on totta, ei kosketa. Sama Glacier-kuvaus menee myös LodgingBusiness JSON-LD:hen (`Majoitukset.tsx:143`), joten korjaus päivittyy sinne automaattisesti. Huom: A-talossa on vain yksi penthouse (A5), B-talossa kaksi — "penthouse" yksikkö on oikein A-talon kohdalla.

## 6. /opas/majoitus-levilla kilpailun poisto

(a) Turvallinen ja perusteltu. Sivulla EI ole vielä linkkiä ankkurilla "majoitus Levillä" — CTA-banneri (rivi 157) linkittää /majoitukset-sivulle tekstillä "Tutustu meidän huoneistoihimme...". ReadNextSection (rivi 353) osoittaa jo /majoitukset-sivulle ✓.

(b) `src/pages/opas/MajoitusLevilla.tsx`:
- SeoMeta title (122): "Majoitus Levillä – Huoneistot, mökit ja hotellit | Leville.net" → "Missä yöpyä Levillä? Alueet, etäisyydet ja vinkit | Leville.net"
- H1 (146): "Majoitus Levillä – Opas huoneistoihin, mökkeihin ja hotelleihin" → "Missä kannattaa yöpyä Levillä?"
  - Huom: sivulla on jo H2 "Levin alueet – missä kannattaa majoittua?" (rivi 199) — lähes sama sanamuoto, mutta ei konflikti.
- Introkappaleeseen (149–153) yksi kontekstuaalinen linkki: "...huoneistoista ja vuokramökeistä hotelleihin ja igluihin. Jos etsit [majoitusta Levillä](/majoitukset) suoraan omistajalta, tutustu omiin kohteisiimme." — leipäteksti muuten ennallaan.
- Body-teksti muuten koskemattomana.

(c) BreadcrumbList JSON-LD (rivi 105) ja Breadcrumbs-komponentti (138) käyttävät nimeä "Majoitus Levillä" — jätän ennalleen (URL ei muutu, breadcrumb kuvaa sijaintia). Halutessasi voidaan päivittää "Missä yöpyä Levillä?" — kerro kantasi.

## 7. fi.ts:6 "Kevään 2026 majoitukset nyt –10 % koodilla winter10"

Rendöröityy: `Hero.tsx:302` käyttää sitä `HeroPromoBadge`-komponentin `fallbackText`:nä — eli se näkyy etusivun hero-osiossa (kaikki kielet käyttävät omaa vastaavaansa), kun administa ei ole asetettu aktiivista promobanneria. Sitkeästi: kyseessä on kevään 2026 kampanja, joka on jo mennyt — raporttina vain, ei muutosta kuten pyysit. Suositus: harkitse fallback-tekstin päivittämistä myöhemmin (erillinen pyyntö).

## Toteutusjärjestys (kun vahvistat)

1. `src/translations/fi.ts` — meta title, description, keywords-poisto, title, subtitle
2. `src/translations/en.ts` — keywords-poisto (muu EN ennallaan)
3. `src/pages/Majoitukset.tsx` — meta keywords -tagi pois, Glacier-kuvaukset FI/EN
4. `src/pages/opas/MajoitusLevilla.tsx` — SeoMeta title, H1, intro-linkki
5. Valinnainen: `searchIndex.ts` + `HomeSeoBlock.tsx` mökki-painotuksen päivitys (kerro jos mukana)
6. Build-tarkistus, ei julkaisua ilman eri pyyntöä
