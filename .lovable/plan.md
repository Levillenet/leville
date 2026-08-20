# Vaihe 3 — Semrush-havainnot ja mitä kilpailijoilta kannattaa kopioida

Semrush (FI-tietokanta) näyttää nykytilan: 769 avainsanaa, ~3 021 käyntiä/kk. Liikenne tulee lähes kokonaan opassivuilta, ei majoituksesta. Suurin yksittäinen mahdollisuus on, että "majoitus levi" (12 100 hakua/kk, vaikeus 32 = realistinen) osuu tällä hetkellä etusivulle sijalle 15 — eli sivun 2 alkuun.

## Havainnot

1. **Rahahakusanat ovat sivulla 2.** Etusivu sijoittuu 15. sijalle hakusanalla "majoitus levi". Meillä ei ole omaa, vahvaa laskeutumissivua tälle — etusivu yrittää palvella sekä opasta että majoitusta.
2. **Klusteri on iso ja pirstoutunut:** levi majoitus 6 600, levi mökkimajoitus 2 400, levi mökit 1 900, vuokramökit levi 1 300, mökki levi 1 000, nettimökki levi 1 000. Vaihe 2:n mökkihubit kattavat osan, mutta "mökkimajoitus"- ja "nettimökki"-muotoja ei käytetä missään.
3. **Oppaat vetävät, mutta eivät ohjaa varaukseen.** hinnat-levilla (35 % liikenteestä), hiihtoladut, ravintolat, sää — nämä ovat sijoilla 2–8 ja tuovat valtaosan kävijöistä. Näiltä puuttuu systemaattinen majoitus-CTA.
4. **Kilpailijoiden voittava malli (levinyt.fi):** yksi laaja, jatkuvasti päivitettävä listaussivu per aihe (ravintolalistaus = 14 % heidän liikenteestään, tapahtumat = 11 %). Meillä on samat sivut, mutta ohuemmalla listauksella.
5. **Selkeät sisältöaukot** (kilpailijat rankkaavat, me emme): levi kylpylä / levi spa (3 600 + 2 400), levi hotel/hotelli (2 400), levi apteekki (1 300), palvelut kuten K-Rauta, baarit ja pubit -listaus, uimarannat, Immeljärvi. Nämä ovat "palvelut Levillä" -tyyppisiä hakuja, joihin meidän Ravintolat ja palvelut -sivu on jo lähellä.
6. **Poissuljetaan tarkoituksella:** yksittäisten kilpailijayritysten brändihaut (Ihku, Hullu Poro, Colorado, Tuikku, Levilehto). Niihin ei kannata tehdä sivuja, mutta ne voi mainita listaussivuilla luonnollisena osana sisältöä.

## Mitä tehdään

### 1. "Majoitus Levillä" -laskeutumissivu kuntoon (tärkein)
Vahvistetaan `/majoitukset` selkeäksi rahasivuksi ja nostetaan etusivun sisäistä linkitystä siihen: H1 sisältää päähakusanan, kohteet ryhmiteltyinä henkilömäärän ja tyypin mukaan, hintahaarukat, sijaintikartta, FAQ-osio. Etusivu jatkaa oppaan roolissa mutta linkittää yhdellä selkeällä nostolla majoitussivulle.

### 2. Klusterin sanaston laajennus
Lisätään luonnollisesti "mökkimajoitus Levi", "vuokramökit", "mökki Levillä" -muodot mökkihubien otsikoihin, ingresseihin ja FAQ-kysymyksiin — ei avainsanatäytettä, vaan omat alaotsikot joiden alla on oikeaa sisältöä (esim. "Mökkimajoitus vs. huoneisto", "Mitä mökkivuokraus sisältää").

### 3. Palvelut Levillä -sivun laajennus (kopioidaan levinyt.fi:n malli)
Laajennetaan `/opas/ravintolat-ja-palvelut-levilla` tai eriytetään siitä oma **Palvelut ja kaupat Levillä** -sivu, joka kattaa: apteekki, kaupat (K-Market, S-Market, K-Rauta), pankkiautomaatit, terveysasema, huoltoasemat, pesula, aukioloajat. Tämä on suoraan puuttuva sisältöalue jolla on hakuvolyymia eikä kilpailua.

### 4. Kylpylä ja hyvinvointi Levillä
Uusi opassivu (FI + EN): Levin kylpylät ja saunamaailmat, hinnat, aukioloajat, kenelle sopii. Kohdistuu "levi kylpylä" / "levi spa" -hakuihin (yhteensä ~6 000/kk) ja linkittää saunasisältöihin sekä majoitukseen, jossa on oma sauna.

### 5. Baarit ja yöelämä Levillä
Listaussivu après-ski -sisällön rinnalle: baarit, pubit, karaoke, aukioloajat, hintataso. Kattaa "baarit ja pubit" -tyyppiset haut ja täydentää ravintolaoppaan aukon.

### 6. Konversiopolku oppaista majoitukseen
Lisätään vakioitu majoitusnosto (sama komponentti) top-liikennesivuille: hinnat-levilla, hiihtoladut-levi, ravintolat-ja-palvelut, saatieto-levilta, tapahtumat-levilla, laskettelu-levi. Näin nykyinen 3 000 kävijää/kk alkaa tuottaa varauksia.

## Tekninen toteutus

- Uudet sivut: `src/pages/guide/SpaAndWellnessLevi.tsx`, `src/pages/guide/BarsAndNightlifeLevi.tsx`, `src/pages/guide/ServicesInLevi.tsx` — noudattavat olemassa olevaa opassivurakennetta (SeoMeta/Helmet, Breadcrumbs, JsonLd, ReadNextSection, PageCTA).
- Reitit `src/App.tsx`:ään FI- ja EN-poluille, hreflang vain käännetyille versioille (ei haamu-URLeja).
- Sitemap: lisäykset `src/data/sitemapRoutes.ts` + `supabase/functions/_shared/sitemapRoutes.ts`, generointi ajetaan uudelleen.
- Majoitusnosto: käytetään olemassa olevaa `MajoitusCallout`-komponenttia ja lisätään se puuttuville opassivuille.
- JSON-LD: uusille listaussivuille `CollectionPage` + `FAQPage`, kuten muillakin hub-sivuilla.
- Kaikki faktat (aukioloajat, hinnat) merkitään tarkistettaviksi ennen julkaisua — ei keksittyjä hintoja tai arvosteluja.

## Järjestys

1. Majoitussivun vahvistus + konversiopolku oppaista (suurin vaikutus, vähiten työtä)
2. Palvelut Levillä -sivu
3. Kylpylä ja hyvinvointi
4. Baarit ja yöelämä
5. Mökkiklusterin sanaston laajennus
