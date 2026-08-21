# Miksi emme sijoitu "santa claus levi" -haulla — analyysi ja korjaus

## Mitä Semrush kertoo (UK-tietokanta)

Tarkka hakusana "santa claus levi" on pieni: **30 hakua/kk**, vaikeus 0/100 — Semrushilla ei ole sille edes SERP-dataa. Oikea kysyntä on hieman eri muodossa:

| Hakusana | Volyymi/kk | Meidän sijoitus |
|---|---|---|
| santa claus village levi | 210 | **25** |
| levi santa village | 140 | **27** |
| santa village levi | 110 | **33** |
| how far is santa claus village from levi | 20 | – |

Eli sivumme `/guide/santa-claus-in-levi` **sijoittuu jo näille termeille, mutta sivuille 3–4**. Emme siis ole näkymättömiä — olemme juuri kynnyksen alla.

## Miksi olemme sivun 1 ulkopuolella

Semrushin SERP "santa claus village levi" (vaikeus vain 14/100):

1. elvesvillage.fi (itse kohde)
2. levi-tours.com/santa-in-levi
3. santaclausvillage.info
4. levi.northernlightsvillage.com
5. scandinavian-travel-group.com
6. TripAdvisor · 7. Inghams · 9. Viator

Syyt järjestyksessä:

1. **Hakuintentio on "varaa tapaaminen", ei "lue opas".** Kärkitulokset ovat joko itse kohde tai varattavia tuotesivuja hinnalla, kestolla ja "Book now" -painikkeella. Meidän sivumme on yleisopas ilman konkreettisia hintoja, aukioloja tai varauspolkua.
2. **Sivumme ei vastaa käytettyyn sanamuotoon.** Otsikko, H1 ja meta puhuvat "Santa Claus in Levi" / "Santa's Cabin", mutta ihmiset hakevat sanalla **"Santa Claus Village Levi"** — ja tarkoittavat useimmiten Levin **Elves Village (Tonttula)** -kohdetta tai sekoittavat sen Rovaniemen Santa Claus Villageen. Sivullamme Elves Village mainitaan vain ohimennen kahdessa lauseessa.
3. **Puuttuu vertailu- ja etäisyysvastaus**, jota haetaan erikseen ("how far is santa claus village from levi" — Rovaniemen kylä on n. 170 km / ~2 h 15 min Leviltä). Tämä on juuri se sekaannus, joka ajaa hakua.
4. **Auktoriteetti**: kilpailijat ovat joko kohde itse tai isoja matkanjärjestäjiä (Inghams, Viator, TripAdvisor). Vaikeus on silti vain 14, joten tämä ei yksin selitä sijaa 25 — sisältövastaavuus on suurempi syy.

## Mitä tehdään

### 1. Kohdista olemassa oleva EN-sivu uudelleen (ei uutta URLia)
`src/pages/guide/SantaClausLevi.tsx`, vain `en`-käännösobjekti + tarvittaessa `fi`:
- Title: "Santa Claus Village in Levi — Where to Meet Santa (Elves Village) | Leville.net" (<60 merkkiä tavoite, mitataan)
- Meta description: mainitaan Elves Village, Levi-keskustan etäisyys ja ero Rovaniemeen
- H1 sisältää "Santa Claus Village" -muodon
- Uusi H2-osio **"Is there a Santa Claus Village in Levi?"** — suora vastaus heti kärkeen: Levin oma joulukohde on Elves Village (Tonttula); Rovaniemen Santa Claus Village on eri paikka, n. 170 km päässä.

### 2. Uusi etäisyys-/vertailuosio
H2 "Levi to Santa Claus Village (Rovaniemi): distance and travel time" — km, ajoaika, kulkutavat, linkki `/guide/travel-to-levi`-sivulle ja Levi vs Rovaniemi -vertailuun. Vastaa suoraan 20/kk kysymyshakuun ja vahvistaa pääaiheen.

### 3. FAQ-laajennus + FAQ JSON-LD
Lisätään kysymykset: "Is Santa Claus Village in Levi or Rovaniemi?", "How far is Santa Claus Village from Levi?", "Where can I meet Santa in Levi?" — olemassa olevaan `faqItems`-rakenteeseen, joka syötetään jo `getFAQSchema`-skeemaan.

### 4. Sisäiset linkit (auktoriteetin ohjaus)
Lisätään linkki tälle sivulle jouluaiheisilta sivuilta, jotka jo saavat liikennettä: `ChristmasDinnerLevi.tsx`, `JouluLapissa.tsx`, `LeviWithChildren`/`LeviForKids`, `MonthlyGuideLevi` (joulukuu). Ankkuriteksti englanniksi: "Santa Claus Village in Levi".

### 5. Majoituskytkös
Sivulle jo olemassa oleva `MajoitusCallout`/CTA säilyy; varmistetaan että EN-versio osoittaa `/en/accommodations`-sivulle — jouluhaku on korkean arvon liikennettä.

## Mitä EI tehdä
- Ei uutta URLia sanalle "santa claus levi" (30/kk, kannibalisoisi nykyisen sijoituksen 25 → nolla).
- Ei muuteta canonicalia, hreflangia eikä reittejä.
- Ei väitetä hintoja tai aukioloja, joita emme voi vahvistaa — viitataan Elves Villagen omaan sivuun.

## Tekniset yksityiskohdat
- Muokattava tiedosto: `src/pages/guide/SantaClausLevi.tsx` (446 riviä, `fi`/`en` -käännösobjektit rivistä 36 ja 119 alkaen). Reitit `/opas/joulupukki-levilla` ja `/guide/santa-claus-in-levi` pysyvät ennallaan.
- Sisäisten linkkien lisäykset: `ReadNextSection`-listat ja yksi tekstilinkki per lähdesivu.
- Sitemapiin ei tule muutoksia (URLit ennallaan).
- Lähde: Semrush, UK-tietokanta (20.–21.8.2026).

## Realistinen odotus
Vaikeus 14/100 ja nykysijoitus 25 → sisältövastaavuuden korjaus riittää tyypillisesti sijoille 8–15 muutamassa viikossa. Sivulle 1 pääsy vaatii lisäksi sisäiset linkit ja aikaa indeksoinnille.
