# Semrush-vertailu: leville.net vs. 4 kilpailijaa + toimenpidesuunnitelma

Lähde: Semrush, tietokanta FI (elokuu 2026). Luvut ovat arvioita orgaanisesta Google-näkyvyydestä.

## Vertailu

| Domain | Avainsanoja | Arvioitu liikenne/kk | Liikenteen arvo | Authority Score | Viittaavia domaineja |
|---|---|---|---|---|---|
| leville.net | 769 | ~3 021 | $219 | 11 | 127 |
| levillas.fi | 432 | ~1 864 | $733 | 11 | 51 |
| levisuites.fi | 376 | ~1 522 | $786 | – | – |
| levinalppitalot.fi | 119 | ~1 015 | $446 | – | – |
| holidayinlapland.fi | 311 | ~327 | $84 | – | – |

Olemme selvästi suurin liikenteeltä ja avainsanamäärältä. Ongelma: liikenteemme kaupallinen arvo on murto-osa kilpailijoista ($219 vs $733–786). Liikenne tulee opassivuilta (hissiliput, ravintolat, ladut, sää), ei majoituksen ostohakusanoista.

## Keskeiset havainnot

1. **Rahahakusanat hukassa.** "majoitus levi" (12 100/kk): me sija 15, levillas sija 4 — heille yksin 32 % koko liikenteestä. "levi majoitus" (6 600/kk): me emme top-25:ssä, levillas sija 4.
2. **Mökkiklusteri puuttuu kokonaan.** levillas rankkaa top-5:ssä sanoilla levi mökit, levi mökkimajoitus, vuokramökit levi, mökki levi, nettimökki levi, levin mökkivuokraus. Meillä ei näy yhtään näistä.
3. **Osoite- ja kohdenimihaut ovat kilpailijoiden kultakaivos.** levillas: martinmutka, kuppimaantie 3, skimbaajankuja, tunturinlaita d2. levinalppitalot: "hissitie 15", "hissitie levi" (720/kk, sija 3). levisuites: mariankuja 6 levi, torikuja 3 levi. Meillä on street-hubit olemassa mutta ne eivät rankkaa.
4. **Brändinimet ovat pieniä mutta 100 % konvertoivia.** levisuites ja levinalppitalot elävät lähes kokonaan omalla brändillään — sama logiikka pätee Glacier Apartments / Bearlodge / Skistar -nimiin.
5. **holidayinlapland ei ole majoituskilpailija hakukoneessa** — sen liikenne tulee vaellusreittisisällöstä ja verkkokaupasta. Sen "Levin 5 upeaa ulkoilureittiä" -sivu voittaa kuitenkin meidät kesäreittihauissa (levi vaellus, levi retkeily, levi kävelyreitit, jääkausipolku).
6. **Linkkiprofiili on heikko ja osin roskainen.** 1 069 / 1 287 linkkiä tulee moder.fi:stä, ja anchor-teksteissä näkyy PBN-spämmiä. Authority 11 = sama kuin levillasilla, eli kukaan ei voita linkeillä — sisältö ratkaisee.

## Mitä tehdään

### Vaihe 1 — Majoituksen rahahakusanat (suurin vaikutus)
- Rakennetaan `/majoitukset` oikeaksi laskeutumissivuksi hakusanalle "majoitus Levillä": H1, ingressi, 300–500 sanaa uniikkia tekstiä, kohdeluettelo suodattimin, FAQ-schema.
- Etusivu jää brändisivuksi ja linkittää `/majoitukset`-sivulle vahvalla ankkurilla — nyt etusivu yrittää rankata "majoitus levi" -sanalla sijalla 15 ilman aihekeskittymää.
- Sisäinen linkitys: kaikki opassivujen booking-nostot osoittamaan `/majoitukset`-sivulle Moderin sijaan siellä, missä tavoite on SEO-arvo (Moder-linkit jäävät konversiokohtiin).

### Vaihe 2 — Mökkiklusteri (kokonaan puuttuva segmentti)
- Vahvistetaan `/vuokramokit`-tyyppinen hubi kattamaan: levi mökit, mökkimajoitus, vuokramökit, mökkivuokraus (yhteensä ~7 000 hakua/kk, KD matala).
- Rehellinen kulma: meillä on huoneistoja ja chalet-tyyppisiä kohteita — sisältö kertoo eron mökin ja huoneiston välillä ja ohjaa oikeaan kohteeseen (olemassa oleva vertailusisältö linkitetään).

### Vaihe 3 — Osoite- ja rakennushubit rankkaamaan
- Jokaiselle street-hubille (Hissitie, Skimbaajankuja, Postintie, Glacier/Eturinteen Alppikylä) title + H1 muotoon "Osoite, Levi – majoitus" ja 250+ sanaa aitoa sijaintitietoa (etäisyydet hisseille, ladulle, palveluihin).
- Jokainen kohdesivu saa osoitteen näkyviin H1:een tai alaotsikkoon ja `LodgingBusiness`-schemaan.

### Vaihe 4 — Brändinimien haltuunotto
- Varmistetaan että Glacier Apartments, Bearlodge, Bears Watch, Moonlight Studio, Skistar Superior rankkaavat #1 omilla nimillään: oma sivu, nimi title/H1:ssä, `alternateName`-schema.

### Vaihe 5 — Kesäreitit takaisin (holidayinlapland-gap)
- Täydennetään olemassa oleva vaellus/pyöräily-opas kattamaan Jääkausipolku, Kätkätunturin reitti, Huippupolku, Levin ympärystie omina osioinaan reittikuvauksin ja pituuksin.

### Vaihe 6 — Linkkiprofiilin siivous
- Käydään läpi roskalinkit ja harkitaan disavow-tiedostoa; varmistetaan ettei moder.fi-riippuvuus tuota duplikaattisisältöä.

## Tekniset yksityiskohdat

- Muokattavat tiedostot: `src/pages/Majoitukset.tsx`, `src/data/street-hubs.ts`, `src/data/properties.ts`, `src/pages/StreetHub.tsx`, `src/pages/opas/VuokraMokitLevi.tsx`, `src/pages/guide/*` (kesäreitit), `src/data/sitemapRoutes.ts` + `supabase/functions/_shared/sitemapRoutes.ts` (pidettävä synkassa).
- Kaikki uudet sivut: `SeoMeta` + `HreflangTags` + JSON-LD (`LodgingBusiness` / `FAQPage` / `BreadcrumbList`).
- Ei hintoja sisältösivuille, ei hintalupauksia (price parity -sääntö), ulkoiset linkit `target="_blank"`.
- Sitemap regeneroidaan build-skriptillä muutosten jälkeen.

## Ehdotus järjestykseksi

Vaiheet 1 ja 2 ensin — ne kattavat noin 25 000 kuukausihakua, joista emme tällä hetkellä saa käytännössä mitään. Vaiheet 3–4 sen jälkeen, 5–6 viimeisenä.
