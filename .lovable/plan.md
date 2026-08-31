# Holiday rental -virhe: korjaus on koodissa, mutta ei vielä livenä

## Tilanne (tarkistettu juuri)

Hain `https://leville.net/` sekä normaalina että Googlebot-agenttina. Livenä olevassa
HTML:ssä on edelleen vanha, virheellinen lohko:

```text
"@type": "VacationRental",
"name": "Levi Apartments by Leville.net"
```

Projektin koodissa tätä ei enää ole — `src/components/StructuredData.tsx` rivillä 50 on
kommentti "Sivustonlaajuinen VacationRental poistettu", eikä tiedosto enää tuota sitä.

Eli syy ei ole koodissa: **korjausta ei ole vielä julkaistu**, joten Googlen tänään
crawlaama versio on edelleen vanha.

## Mitä tehdään

1. Julkaistaan sivusto (ei koodimuutoksia).
2. Julkaisun jälkeen haetaan `https://leville.net/` uudelleen ja varmistetaan, että
   `VacationRental` ei enää esiinny etusivun HTML:ssä ja että etusivulla on vain
   `WebSite` + `LodgingBusiness`.
3. Tarkistetaan samalla yksi kohdesivu (esim. `/majoitukset/zero-point-5a2`), että sen
   oma `VacationRental` sisältää `identifier`, `geo`, `containsPlace` ja kuvat.
4. Sinä pyydät Search Consolessa uudelleenindeksoinnin etusivulle (URL-tarkastus →
   "Pyydä indeksointia"). Rikastetulostilan päivittyminen kestää yleensä muutamia päiviä.

## Mitä EI tehdä

- Ei muuteta otsikoita, kuvauksia, canonicaleja eikä ulkoasua.
- Ei lisätä keksittyjä hintoja, arvosteluja tai koordinaatteja.
