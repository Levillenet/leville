# Seuraava vaihe — konkreettiset toimet Semrush-datan pohjalta

Majoitussivu on nyt vahvistettu. Seuraavaksi tehdään kaksi asiaa: ohjataan nykyinen opasliikenne majoitukseen ja täytetään kolme selkeää sisältöaukkoa, joissa on hakuvolyymia mutta heikko kilpailu.

## Mitä Semrush näyttää nyt

- leville.net: 769 avainsanaa, ~3 021 käyntiä/kk. Liikenne tulee lähes kokonaan oppaista: hinnat-levilla 35 %, hiihtoladut 12 %, ravintolat 8 %, sää 7 %. Etusivu tuo vain 1,2 %.
- "majoitus levi" (12 100/kk, vaikeus 32) on sijalla 15. Sivun 2 alalaidasta ei tule klikkejä — tämä on lähin iso voitto.
- Puuttuvat aiheet, joilla kilpailijat rankkaavat: levi kylpylä / levi spa (~6 000/kk yhteensä), levi apteekki ja kaupat (~1 300/kk), baarit ja pubit -listaus.

## holidayinlapland.fi — tarkistus

Pieni toimija: 311 avainsanaa, ~327 käyntiä/kk, auktoriteetti 9/100 (meillä 11/100, 3 021 käyntiä/kk). Emme häviä heille kokonaisuutena — mutta heillä on **yksi sivu joka toimii poikkeuksellisen hyvin** ja se kannattaa kopioida:

`/levin-5-upeaa-ulkoilureittia-lumettomaan-aikaan/` rankkaa yksin noin 15 hakusanalla sijoilla 3–9:
jääkausipolku, levi vaellus, levi retkeily, levin patikointi reitit, levi kävelyreitit, kätkätunturin reitti, levi tunturit, levi reitit, levi vaellusreitit kartta, levi huippupolku, levin ympärystie.

Meidän `/opas/vaellus-ja-maastopyoraily-levilla` käsittelee vaellusta yleisesti mutta **ei nimeä yhtään reittiä**. Siksi emme rankkaa näillä lainkaan. Nimetyt reitit ovat se, mitä ihmiset hakevat.

Lisäksi he rankkaavat ykkösenä hakusanalla "loma lapissa" (1 300/kk) melko ohuella etusivulla — sekin on tavoiteltavissa.

## Konkreettiset toimet

### 1. Levin vaellusreitit -sivu (kopioidaan holidayinlaplandin voittaja, tehdään paremmin)
Uusi opassivu `/opas/vaellusreitit-levi` (+ EN). Jokainen reitti omana osionaan: **Jääkausipolku, Kätkätunturin reitti, Levin huippupolku, Levin ympärystie, Immeljärven kierros, Kotimaisema-polku**. Jokaisesta: pituus km, kesto, vaativuus, lähtöpaikka, mitä näet, sopiiko lapsille/rattaille, kausi. Yhteenvetotaulukko kärkeen ja linkki Levin karttasivullemme. Tämä yksi sivu tavoittelee ~15 hakusanaa, joita meillä ei nyt ole.

### 2. Konversiopolku oppaista majoitukseen
Lisätään sama majoitusnosto (`MajoitusCallout`) kuuteen eniten liikennettä tuovaan opassivuun, joista se puuttuu: hinnat-levilla, hiihtoladut-levi, ravintolat-ja-palvelut-levilla, saatieto-levilta, tapahtumat-levilla, laskettelu-levi. Nosto sijoitetaan sisällön puoliväliin, ei vain loppuun, ja se linkittää vahvistetulle majoitussivulle. Nykyiset ~3 000 kävijää/kk alkavat tuottaa varauksia.

### 3. Palvelut ja kaupat Levillä
Uusi sivu `/opas/palvelut-levilla` (+ EN): apteekki, K-Market ja S-Market, K-Rauta, Alko, pankkiautomaatit, terveysasema, huoltoasemat, pesula — sijainnit, etäisyys keskustasta, aukiolot. Käytännön sivu, jota kukaan ei ole tehnyt kunnolla, ja se palvelee myös omia majoittujiamme.

### 4. Kylpylä ja hyvinvointi Levillä
Uusi sivu `/opas/kylpyla-levi` (+ EN): Levin kylpylät ja hyvinvointipalvelut, hintataso, aukioloajat, kenelle sopii, sekä linkki saunasisältöihimme ja omiin saunallisiin kohteisiin. Kohdistuu hakuihin "levi kylpylä" ja "levi spa".

### 5. Sisäinen linkitys
Uudet sivut liitetään Levi-oppaan hub-rakenteeseen ja `ReadNextSection`-ristiinlinkityksiin. Vaellusreitit-sivu linkitetään kesä-, ruska- ja vaellus/maastopyöräilysivuilta.

## Tekninen toteutus

- Uudet sivut: `src/pages/guide/HikingTrailsLevi.tsx`, `src/pages/guide/ServicesInLevi.tsx`, `src/pages/guide/SpaAndWellnessLevi.tsx` — olemassa oleva opassivurakenne (Helmet/SeoMeta, Breadcrumbs, JsonLd, ReadNextSection, PageCTA, StickyBookingBar).
- Reitit `src/App.tsx`:ään FI- ja EN-poluille; hreflang vain käännetyille versioille.
- Sitemap: lisäykset `src/data/sitemapRoutes.ts` ja `supabase/functions/_shared/sitemapRoutes.ts`, generointi ajetaan uudelleen.
- JSON-LD: vaellusreitit-sivulle `ItemList` + `FAQPage`, palvelut- ja kylpyläsivulle `CollectionPage` + `FAQPage`.
- Hakuindeksi `src/data/searchIndex.ts` päivitetään uusilla sivuilla.
- Faktat (reittien pituudet, aukioloajat, hinnat) merkitään tarkistettaviksi ennen julkaisua — ei keksittyjä lukuja eikä arvosteluja.

## Järjestys

1. Konversiopolku oppaista majoitukseen (nopein tuotto, ei uutta sisältöä)
2. Vaellusreitit-sivu (suurin uusi hakupotentiaali)
3. Palvelut Levillä
4. Kylpylä ja hyvinvointi
