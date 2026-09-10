# Majoitukset-sivun suomenkieliset tekstimuutokset

Kolme muutosta vain `src/pages/Majoitukset.tsx`:n suomenkielisiin teksteihin. Ulkoasu, kohdekortit, hakukenttä, UKK, rakenteinen data ja muut kielet säilyvät ennallaan. Muihin tiedostoihin ei kosketa.

## 1. Johdantokappale

Kolme ensimmäistä virkettä uusiksi (lihavoinnit säilyvät samalla tyylillä):

- "vuokramökkejä ja huoneistoja Levin keskustassa" → "27 huoneistoa ja yhden hirsihuvilan Levin keskustassa"
- "mökkejä Leviltä" → "huoneistoja Levin keskustasta"
- "Mökkivuokraus Levillä" → "Majoitus Levillä"

Kaikki kappaleen linkit ja teksti kohdasta "Neljä kohdetta Levin ytimessä" eteenpäin jäävät ennalleen.

## 2. Kohdelistan alaotsikko

"Valitse studiosta tilavaan hirsimökkiin — …" → "Valitse studiosta 14 hengen hirsihuvilaan — …". Muiden kielten versiot eivät muutu.

## 3. Uusi suomenkielinen osio

Lisätään uusi osio otsikolla "Majoitus Levin keskustassa – kaikki kohteemme kävelymatkan päässä" heti ennen nykyistä "Miten valita majoitus Levillä" -osiota (tiedoston rivi 701). Osio näkyy vain suomeksi ja käyttää samoja otsikko- ja osiotyylejä kuin viereinen osio.

Neljä kappaletta:
1. Kaikki 27 kohdetta ovat keskustassa neljässä osoitteessa, joten autoa ei tarvita; ero suuriin varaussivustoihin.
2. Front Slope Hiihtäjänkujalla ja Karhupirtti (220 m², 7 makuuhuonetta, 14 henkeä).
3. Skistar-talo Postintiellä ja Glacier Apartments Ratsastajankujalla.
4. Sauna lähes kaikissa; saatavuus ja hinnat hakukentästä tai varausjärjestelmästä.

Linkit kohtiin `/vuokramokit/hiihtajankuja-levi`, `/vuokramokit/skimbaajankuja-levi`, `/vuokramokit/postintie-levi`, `/vuokramokit/glacier-apartments-levi` sekä ulkoinen varausjärjestelmä (uusi välilehti).

## Tarkistus

- "mökk"-sanan esiintymät vähenevät: jäljelle jäävät vain tarkoitukselliset linkit `/opas/mokki-vai-huoneisto-levi` ja `/mokit-levilla` sekä "Mökki vai huoneisto?" -lukuvinkki.
- Muutoksia vain yhdessä tiedostossa; build tarkistetaan lopuksi.
