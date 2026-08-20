# Vaihe 1 — "Majoitus Levillä" -rahahakusanat haltuun

Lähde: Semrush (FI, elokuu 2026).

## Ongelma numeroina

| Hakusana | Volyymi/kk | Meidän sija | levillas.fi |
|---|---|---|---|
| majoitus levi | 12 100 | 15 (etusivu) | 4 |
| levi majoitus | 6 600 | ei top-25 | 4 |

levillas saa näistä kahdesta sanasta ~50 % koko orgaanisesta liikenteestään. Me saamme "majoitus levi" -sanasta 1,2 % liikenteestämme, vaikka meillä on 769 avainsanaa heidän 432:ta vastaan. Liikenteemme kaupallinen arvo on $219/kk, heidän $733/kk — eroa ei selitä määrä vaan se, että meidän liikenne tulee opassivuilta (hissiliput, ravintolat, ladut, sää) eikä ostoaikeisilta majoitussivuilta.

## Miksi olemme sijalla 15

Etusivu yrittää rankata "majoitus levi" -sanalla, mutta se on brändi- ja monikäyttösivu: hero, esittely, oppaat, aktiviteetit, uutiset. Googlelle se ei ole "majoituslistaus". levillas.fi:n etusivu on puhdas majoituslistaus. `/majoitukset` on meillä olemassa, mutta se ei ole vielä se sivu, jolle hakusanan signaalit ohjautuvat.

## Mitä tehdään

1. **`/majoitukset` nostetaan hakusanan viralliseksi kohdesivuksi**
   - H1 muotoon "Majoitus Levillä" (nyt kaupallinen mutta ei hakusanakohdennettu)
   - Title/description kohdennetaan samaan hakusanaklusteriin
   - 300–500 sanaa uniikkia tekstiä: mitä majoitustyyppejä, missä päin Leviä, kenelle, kausivinkit
   - Kohdelistaus ryhmiteltynä henkilömäärän ja alueen mukaan (Google arvostaa listaussivun rakennetta)
   - FAQ-osio + `FAQPage`-schema, `LodgingBusiness`- ja `BreadcrumbList`-schema
   - `ItemList`-schema kohdelistalle

2. **Etusivun rooli selkeytetään**
   - Etusivu jää brändisivuksi eikä enää kilpaile samasta hakusanasta
   - Etusivulta vahva, näkyvä linkki `/majoitukset`-sivulle ankkurilla "Majoitus Levillä"
   - `HomeSeoBlock`-lohkon painotus siirtyy hub-linkitykseen, ei samojen hakusanojen toistoon

3. **Sisäinen linkitys keskitetään**
   - Opassivujen majoitusnostoista (MajoitusCallout) SEO-tarkoituksessa olevat linkit osoittamaan `/majoitukset`-sivulle
   - Moder-linkit jäävät konversiokohtiin (sticky bar, CTA), niitä ei kosketa
   - Käytännössä ~25 opassivua alkaa siirtää sisäistä linkkivoimaa yhdelle kohdesivulle sen sijaan että se hajoaa

4. **EN-vastine `/en/accommodations`** samalla rakenteella hakusanoille "levi accommodation", "accommodation in levi"

## Miten tämä parantaa tilannetta

- Sijalta 15 sijalle 4–8 tarkoittaa "majoitus levi" -sanassa noin **300–800 klikkiä/kk lisää** — nyt saamme siitä muutamia kymmeniä. Nämä ovat ostoaikeisia kävijöitä, eivät opaslukijoita.
- Sama sivu kerää samalla pitkän hännän: levi majoitus, majoitus levillä, levin majoitus, levi accommodation (yhteensä yli 20 000 hakua/kk).
- Konversio: opasliikenne konvertoi heikosti, majoitushakuliikenne konvertoi suoraan varaukseksi. Siksi $219 → mahdollisuus moninkertaistaa liikenteen arvo ilman että liikenteen määrä kasvaa samassa suhteessa.

## Aikataulu

| Vaihe | Aika |
|---|---|
| Toteutus (sivu + schema + linkitys) | tässä istunnossa, ~1 työvaihe |
| Julkaisu + Google indeksoi uudelleen | 3–14 vrk |
| Ensimmäiset sijaliikkeet näkyvät | 2–4 viikkoa |
| Vakiintunut sijoitus (odote 4–8) | 2–4 kk |

Kausi auttaa: joulu- ja hiihtolomahaut kiihtyvät loka-marraskuussa, joten muutos ehtii vaikuttaa ennen huippusesonkia.

Emme ohita levillasia yhdellä sivulla — heillä on 4. sija ja aiheauktoriteetti tässä klusterissa. Vaihe 1 vie meidät kilpailemaan samaan sarjaan; vaiheet 2–4 (mökkiklusteri, osoitehubit, brändinimet) ovat ne, jotka menevät ohi.

## Tekniset yksityiskohdat

- Muokattavat tiedostot: `src/pages/Majoitukset.tsx`, `src/pages/en/...` (EN-vastine), `src/components/HomeSeoBlock.tsx`, `src/components/MajoitusCallout.tsx`, `src/pages/Index.tsx`.
- Schemat `src/utils/structuredData.ts`:n olemassa olevilla helpereillä (`getFAQSchema`, `getBreadcrumbSchema`, `getLodgingBusinessSchema`) + uusi `ItemList`.
- `SeoMeta` + `HreflangTags` fi/en.
- Ei hintalupauksia (price parity), ei uusia reittejä → sitemapia ei tarvitse muuttaa.
