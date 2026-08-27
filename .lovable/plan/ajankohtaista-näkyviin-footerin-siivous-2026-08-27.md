# Ajankohtaista näkyviin — footerin siivous

## Tilanne (varmennettu koodista)

- Ylänavigaatio (`src/components/Header.tsx`) on tasainen linkkirivi ilman avautuvia alavalikoita: FI-linkit ovat Majoitukset, Äkkilähdöt, Levi-opas, Yhteystiedot.
- Footerin (`src/components/Footer.tsx`) FI-sarake toistaa samat: Majoitukset, Äkkilähdöt, Levi-opas + Tarinamme, Yhteystiedot, UKK, Myy loma-asuntosi, Seuratuki.
- `/ajankohtaista` on olemassa (reitti `src/App.tsx`, sitemapissa, `routeConfig.news`), mutta siihen ei osoita yhtään navigaatiolinkkiä.

## Mitä tehdään

1. **Header**: lisätään "Ajankohtaista" (EN "News" jne. `routeConfig.news` mukaan) navigaation loppupäähän, ennen Yhteystiedot. Ei uutta dropdown-rakennetta — pidetään nykyinen tasainen valikko ehjänä.
2. **Footer**: poistetaan FI-sarakkeesta päänavigaation kanssa päällekkäiset Majoitukset, Äkkilähdöt ja Levi-opas. Tilalle Ajankohtaista. FI-sarakkeeksi jää: Tarinamme, Ajankohtaista, Seuratuki, Myy loma-asuntosi, UKK, Yhteystiedot.
3. Sama linjaus muille kielille: footerista pois header-duplikaatit (Accommodations/Last Minute/Levi Guide jne.), tilalle kielikohtainen News-linkki. EN-sarakkeen huoneistolinkit (Apartments, Studio, For 6, For 8+, Penthouses) säilytetään — ne eivät ole headerissa ja ovat SEO:n kannalta arvokkaita sisäisiä linkkejä.
4. Ei muutoksia etusivun hakubanneriin, Hero/Moder-widgetiin eikä muihin komponentteihin.

## Suositus sijainnista

Molempiin: headeriin näkyvyyden takia (ihmiset löytävät sen) ja footeriin, koska footerilinkki on sivustonlaajuinen sisäinen linkki, joka ohjaa crawlerin uusimpaan sisältöön joka sivulta.

## Vastaus SEO-kysymykseen

Kyllä, säännöllisesti päivitetty Ajankohtaista auttaa, mutta ei "tuoreuden" itsensä takia:

- Google ei palkitse päivittämistä sinänsä. Hyöty tulee siitä, että sivulle syntyy oikeaa, ajankohtaista sisältöä (ruska, ensilumi, varaustilanne, tapahtumat), johon liittyy aitoa hakukysyntää.
- Sivulle pitää päästä linkkiä pitkin, muuten Google käy siellä harvoin. Tämä on juuri nyt puuttuva pala.
- Suurin arvo Levillelle on sisäinen linkitys: jokainen artikkeli voi ohjata rahasivuille (`/majoitukset`, `/seuratuki`, `/akkilahdot`) tuoreella, kontekstuaalisella ankkuritekstillä.
- Realistinen odotus: Ajankohtaista ei itse rankkaa merkittävästi, mutta se tukee sivuston kokonaisuutta ja nopeuttaa uusien kampanjasivujen indeksointia. Yksi laadukas kirjoitus kuussa riittää; tyhjä päivitys tyhjän vuoksi ei tuo mitään.

## Tekniset yksityiskohdat

- `Header.tsx`: uusi linkki kaikkiin seitsemään kieliobjektiin `routeConfig.news[lang]`-osoitteella.
- `Footer.tsx`: FI/EN/SV/DE/ES/FR/NL-sarakkeiden `links`-listojen muokkaus; ei rakenteellisia tai tyylimuutoksia.
- Ei muutoksia reitteihin, sitemapiin eikä käännöstiedostoihin (`routeConfig.news` on jo olemassa).
