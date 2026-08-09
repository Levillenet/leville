# Kielenvaihto pysyy sivulla + Levin huippu pois aluelistalta

## 1. Kielenvaihto ei enää heitä etusivulle

Nykytila (varmistettu koodista): `getRouteForLanguage` etsii polkua `routeConfig`-taulukosta täsmäosumalla. Jos osumaa ei löydy (esim. dynaamiset osoitteet kuten `/majoitukset/<slug>`, `/vuokramokit/<hub>`, kuukausioppaat), se palauttaa kohdekielen etusivun — tästä hyppy etusivulle tulee.

Korjaus `src/translations/index.ts`:n `getRouteForLanguage`-funktioon, kolmiportainen logiikka:

1. **Täsmäosuma** `routeConfig`-taulukosta (nykyinen toiminta, säilyy).
2. **Dynaamiset alipolut**: jos polku alkaa jollain routeConfig-polulla ja sen perässä on slug (esim. `/majoitukset/glacier-a1` tai `/en/accommodations/glacier-a1`), vaihdetaan vain etuliite ja säilytetään slug.
3. **Kieliprefiksin vaihto**: jos polku alkaa kieliprefiksillä (`/en/…`, `/sv/…` jne.), vaihdetaan pelkkä prefiksi kohdekieleen.
4. **Fallback = pysy sivulla**: jos mitään käännösvastinetta ei löydy, palautetaan nykyinen polku eikä etusivua.

`src/components/LanguageSelector.tsx`: jos laskettu uusi polku on sama kuin nykyinen, ei navigoida (ei turhaa reloadia). Muuten komponentti pysyy ennallaan.

Huom. hreflang: `HreflangTags` käyttää samaa funktiota. Jotta ei synny haamu-URLeja, hreflang-puolella käytetään edelleen vain aitoja käännösvastineita — fallback "pysy sivulla" rajataan koskemaan vain käyttäjän kielenvaihtoa, ei hreflang-tuotosta (erillinen parametri/apufunktio).

## 2. Levin huippu / Levi Summit poistetaan

`src/pages/opas/LeviAreasGuide.tsx`:
- Poistetaan aluekortti `slug: "huippu"` sekä suomen- (rivit ~251) että englanninkielisestä (~425) aluelistasta.
- Poistetaan sitä koskeva rivi etäisyystaulukosta (taulukko generoituu samasta listasta, joten poistuu automaattisesti) ja tarkistetaan, ettei "Näin valitset alueen" -osiossa, FAQ:ssa tai johdannossa viitata huippumajoitukseen tai aluemäärään "14" — mahdolliset maininnat päivitetään 13 alueeseen.

## Tekniset yksityiskohdat

- Muutettavat tiedostot: `src/translations/index.ts`, `src/components/LanguageSelector.tsx`, `src/pages/opas/LeviAreasGuide.tsx`.
- Ei muutoksia reititykseen, sivukarttaan tai sisältöön muilta osin.
- Tarkistus selaimella: siirrytään esim. `/guide/levi-areas`- ja `/majoitukset/<slug>`-sivuille ja vaihdetaan kieli — käyttäjän pitää pysyä vastaavalla sivulla.
