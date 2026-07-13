
# Semrush-analyysi: leville.net vs levillas.fi (FI-tietokanta)

## Tilannekuva

| Mittari | leville.net | levillas.fi |
|---|---|---|
| Orgaaniset hakusanat | 731 | 396 |
| Arvioitu liikenne | 2 578 / kk | 2 052 / kk |
| Arvioitu liikenteen arvo | $315 / kk | **$846 / kk** |

Sinulla on **enemmän avainsanoja ja liikennettä**, mutta levillas.fi:n liikenteen kaupallinen arvo on 2,7× suurempi. Syy: he ovat vallanneet Levin **isoimmat majoitushaut**.

## Missä levillas.fi voittaa – top-majoitushaut

Nämä 5 hakua tuovat heille ~70 % kaikesta liikenteestä. leville.net ei näy näiden top 20:ssä.

| Hakusana | Volyymi/kk | Levillas.fi | Vaikeus |
|---|---|---|---|
| majoitus levi | 12 100 | #4 | 31 (mahdollinen) |
| levi majoitus | 6 600 | #4 | 24 (helppo) |
| levi mökkimajoitus | 2 400 | #4 | 21 (helppo) |
| levi mökit | 2 400 (yht.) | #4 | 23 (helppo) |
| vuokramökit levi | 1 300 | #4 | **14 (erittäin helppo)** |
| mökki levi | 1 000 | #5 | 26 (helppo) |
| levin mökkivuokraus | 320 | #5 | – |

**Yhteensä ~26 000 hakua/kk**, joista leville.net saa käytännössä 0.

Nämä ovat kaikki **KD < 32** eli täysin realistisia meille. Emme näy koska sivustolla ei ole yhtä vahvaa, näihin täsmähakuihin optimoitua laskeutumissivua.

## Juurisyy – miksi häviämme

1. **`/majoitukset`-sivu ei rankkaa yhdellekään näistä hauista.** Sivun `<title>` ja `<h1>` eivät sisällä täsmätermejä "majoitus Levi" / "vuokramökit Levi" alkupäässä.
2. **Levillas.fi:llä on yksi vahva pääsivu** (etusivu) 81 % liikenteestä. Meillä liikenne on hajautunut opas-sivuille jotka eivät konvertoi majoitushakuja.
3. **Puuttuvat täsmäsivut**: ei omaa `/vuokramokit-levi` / `/mokit-levi` -laskeutumissivua joka olisi kaupallinen (kuten opas-sivut).
4. **Kotisivun `<title>` ja meta ei aja "majoitus Levi" -päähakua.** Se on brändipainotteinen.

## Levillas.fi:n voittava rakenne

- Etusivu = "Majoitus Levillä – vuokramökit ja huoneistot" (koko ryyti näissä sanoissa)
- `/majoitus/[kohde-slug]/` -sivut rankkaavat myös kohdenimillä (operonmukka, martinmutka, kuppimaantie 3, tunturinlaita d2 – #1 sijoja)
- Selkeä flat-hierarkia: 1 klikkaus etusivulta jokaiseen kohteeseen

## Toimenpiteet – mitä muutetaan

### 1. Kotisivu (`src/pages/Index.tsx` + HomeSeoBlock)
- `<title>` → **"Majoitus Levillä – Vuokramökit ja huoneistot keskustassa | Leville.net"**
- meta description alkaen sanoilla "Majoitus Levillä"
- H1 sisältää "Majoitus Levillä" ja "vuokramökit" alkuun

### 2. `/majoitukset`-sivun uudistus (Majoitukset.tsx)
- `<title>` → **"Majoitus Levillä – Kaikki vuokramökit ja huoneistot | Leville.net"**
- H1: "Majoitus Levillä – vuokramökit ja huoneistot Levin keskustassa"
- Intro-kappale 150–200 sanaa, jossa luonnollisesti: majoitus levi, levi majoitus, vuokramökit levi, mökki levi, levin mökit, mökkivuokraus levi, levi mökkimajoitus
- Sisäiset linkit kaikkiin kohdesivuihin selkeästi (jo osittain on)

### 3. Uusi hub-sivu `/vuokramokit-levi` (tai vahvista olemassa oleva `/opas/vuokra-mokit-levi`)
- Muuta oppaasta **kaupalliseksi hubiksi**: title "Vuokramökit Levillä – varaa suoraan omistajalta"
- Listaa mökit (ei studioita) → linkki jokaiseen kohteeseen
- KD 14 → helpoin isoista hauista

### 4. Uusi hub-sivu `/mokit-levi` (tai 301 → /vuokramokit-levi)
- Sama sisältörunko, eri kulma "Mökit Levillä"

### 5. Kohdesivujen (`/vuokramokit/[hub]`, `/majoitukset/[slug]`) title-optimointi
- Jokaisen kohteen title muotoon "**{Kohteen nimi} – vuokramökki/huoneisto Levin keskustassa**"
- Näin nappaamme myös long-tail brändihaut (kuten levillas tekee: "skimbaajankuja 7", "operonmukka" jne.)

### 6. Sisäinen linkitys
- HomeSeoBlock + footer: ankkurit "vuokramökit Levillä", "mökki Levillä", "majoitus Levillä" osoittavat uusiin hub-sivuihin (ei oppaisiin)
- Erota selkeästi **kaupalliset** hubit (`/vuokramokit-levi`, `/majoitukset`) ja **informatiiviset** oppaat (`/opas/majoitus-levilla`)

### 7. Sitemap + hreflang
- Uudet/päivitetyt URLit sitemapiin
- FI-versiot ensin, EN myöhemmin

## Realistinen tavoite

Näihin KD-tasoihin (14–31) ja sivustosi Authority-tasoon nähden **top 10 -sijoitukset 3–6 kk sisällä** ovat realistisia täsmähauille "vuokramökit levi" (KD 14), "levin mökit" (KD 10), "levi mökkimajoitus" (KD 21), "levi majoitus" (KD 24). Isoin haku "majoitus levi" (12 100/kk, KD 31) vaatii pisimmän ajan mutta on tavoitettavissa.

## Mitä EI muuteta

- Sivujen sisältö/rakenne opas-sivuilla
- Kohteiden omat kuvat, kuvaukset, ominaisuudet
- Booking-widget tai varauslogiikka
- Backend / Beds24-integraatio

## Seuraava askel

Vahvista, että lähden toteuttamaan yllä olevat 7 kohtaa. Voin myös tehdä vain kohdat 1–2 ensin (nopein voitto: kotisivun ja /majoitukset-sivun meta+H1+intro) ja arvioida vaikutuksen 4–6 viikossa ennen laajempaa hub-työtä.
