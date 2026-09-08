# Kolme korjausta: etusivu vs. /majoitukset, mökkiklusteri, /majoitukset-teksti

Perusta: Search Console 10.6.–6.9.2026. "levi majoitus" — etusivu 3 131 näyttöä
(sij. 12,5), /majoitukset 373 näyttöä (sij. 16,8). Mökkihaut (levi vuokramökit,
vuokramökit levi, vuokramökki levi, levi mökkivuokraus jne.) yhteensä n. 610
näyttöä, 2 klikkiä, sijainnit 22–33 — niissä näkyvät etusivu ja
/opas/vuokramokit-levi.

Reunaehdot: ei euromääräisiä hintoja mihinkään, hintataso vain sanallisesti +
linkki varausjärjestelmään. Sana "mökki" vapaasti vuokramökkioppaassa, ei
/majoitukset-sivun titleen eikä H1:een.

---

## 1. Etusivu → brändi, /majoitukset → majoitushaku

### Etusivu (`src/translations`-riippumaton `src/pages/Index.tsx`, fi)

Nykyinen title: "Leville.net – Majoitus Levin keskustassa suoraan omistajalta"

**Uusi title:**
`Leville.net – 27 kohdetta Levin keskustassa, varaa suoraan omistajalta`

**Uusi description:**
`Paikallinen perheyritys vuodesta 2012. 27 saunallista kohdetta Levin keskustassa – varaa suoraan omistajalta ilman välityspalkkioita. Katso kaikki kohteet ja saatavuus.`

Muut kielet jätetään ennalleen. Etusivun hero, hakubanneri ja Moder-widget eivät
muutu.

### /majoitukset (`src/translations/fi.ts`, `majoitukset.meta` + `title`)

Nykyinen title: "Majoitus Levi – huoneistot ja hirsihuvila suoraan omistajalta"

**Uusi title:**
`Majoitus Levillä – 27 huoneistoa ja huvilaa Levin keskustassa | Leville.net`

**Uusi description:**
`Majoitus Levillä suoraan omistajalta: 27 saunallista kohdetta keskustassa, rinteiden juurelta enintään 700 metrin päässä. Ei välityspalkkioita – katso saatavuus ja hinnat varauskalenterista.`

**Uusi H1:**
`Majoitus Levillä – huoneistot ja hirsihuvila Levin keskustassa` (pysyy)

EN-vastine `/en/accommodations` säilyy nykyisellään.

## 2. Mökkiklusteri: /opas/vuokramokit-levi vahvistetaan

Sivun title, description ja H1 ovat jo kohdillaan – ne pidetään. Lisätään sivulle
kaksi kappaletta ja etusivun/majoitukset-sivun linkitys tänne.

**Uusi kappale 1 (heti H1:n alle):**

> Vuokramökki Levillä tarkoittaa käytännössä kahta asiaa: perinteistä hirsimökkiä
> omalla pihalla tai mökkitunnelmaista huoneistoa, jossa on oma sauna. Meiltä saa
> molempia, ja kaikki kohteet ovat Levin keskustassa tai eturinteen tuntumassa –
> autoa ei tarvita.

**Uusi kappale 2 (Hirsimökit ja chaletit -osioon):**

> Karhupirtti Skimbaajankujalla on ainoa varsinainen hirsihuvilamme: seitsemän
> makuuhuonetta, oma sauna, takka ja ulkoporeallas, tilaa 14 hengelle. Se on
> tarkoitettu isolle porukalle – suvun jouluun, kaveriporukan hiihtoviikkoon tai
> yrityksen retriittiin. Muut mökkihenkiset vaihtoehtomme ovat saunallisia
> huoneistoja, joissa on 1–5 makuuhuonetta.

**Uusi kappale 3 (hintataso, sanallinen, ei euroja):**

> Mökkivuokrauksen hinta Levillä vaihtelee sesongin ja seurueen koon mukaan:
> edullisimmillaan ollaan kevättalvella ja syksyllä pidemmillä varauksilla,
> kalleimmillaan jouluna, hiihtolomaviikoilla ja pääsiäisenä. Näet ajantasaisen
> hinnan aina varauskalenterista, kun valitset päivät.
> [Katso vapaat mökit ja hinnat](https://app.moder.fi/levillenet)

## 3. /majoitukset: vastausteksti hakuun

Lisätään ryhmälistauksen alle uusi osio otsikolla
**"Miten valita majoitus Levillä"**, kolme kappaletta. Sana "mökki" ei esiinny
otsikossa eikä H1:ssä; leipätekstissä ohjataan mökkioppaaseen.

> **Sijainti.** Kaikki kohteemme ovat kävelymatkan päässä Levin keskustasta.
> Eturinteen alppihuoneistot (Zero Point ja Glacier) ovat noin 150–200 metriä
> lähimmältä hissiltä, Skistar-talon huoneistot Postintiellä ovat keskellä
> palveluita ja noin 700 metriä rinteille. Kumpikin toimii ilman autoa.

> **Seurueen koko.** Studiot sopivat kahdelle tai kolmelle, yhden ja kahden
> makuuhuoneen huoneistot perheelle, ja isoille ryhmille on 3–5 makuuhuoneen
> huoneistoja sekä 14 hengen hirsihuvila Karhupirtti. Jos etsit nimenomaan
> hirsirakennusta, katso [vuokramökit Levillä](/opas/vuokramokit-levi).

> **Ajankohta ja hinta.** Hinta määräytyy sesongin ja yöpymisen pituuden mukaan:
> joulu, hiihtolomaviikot ja pääsiäinen ovat kysytyimpiä ja kalleimpia, kun taas
> alkutalvi ja kevät ovat rauhallisempia ja edullisempia. Pidempi varaus on aina
> yöltä edullisempi. Ajantasainen hinta näkyy varauskalenterista, kun valitset
> päivät.

Lisäksi etusivulle ja /majoitukset-sivulle sisäinen linkki mökkioppaaseen
ankkurilla "vuokramökit Levillä".

## Tekniset kohdat

- `src/pages/Index.tsx` — fi-title ja -description (vain metatiedot).
- `src/translations/fi.ts` — `majoitukset.meta.title` ja `.description`.
- `src/pages/Majoitukset.tsx` — uusi tekstiosio "Miten valita majoitus Levillä"
  + linkki mökkioppaaseen (fi; en-versioon vastaava englanninkielinen teksti).
- `src/pages/opas/VuokraMokitLevi.tsx` — kolme uutta kappaletta fi + en.
- Ei uusia reittejä, ei sitemap-muutoksia, ei kohdetietojen muutoksia.

Huomio erikseen: /majoitukset-sivulla on yhä otsikko "Varaa suoraan meiltä –
paras hinta taattu". Se on hintatakuulupaus, jota emme halua antaa – voin
vaihtaa sen muotoon "Varaa suoraan omistajalta", jos hyväksyt.
