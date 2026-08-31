# Holiday rental -rikastetuloksen korjaus: julkaisu ja varmistus

Koodipuoli on valmis (virheellinen sivustonlaajuinen VacationRental poistettu,
kohdesivujen schema täydennetty identifier/geo/containsPlace/kuvilla).
Aiemmin julkaisu estyi tietoturvahavaintoihin, jotka on jo merkitty korjatuiksi.

## Vaiheet

1. Julkaistaan sivusto.
2. Varmistetaan livenä kevyesti `curl`-komennoilla (ei selainta, ei jumituksia):
   - `https://leville.net/` ei sisällä enää `"@type":"VacationRental"`-lohkoa.
   - Yksi kohdesivu (esim. `/majoitukset/zero-point-5a2`) sisältää VacationRental-
     scheman, jossa on `identifier`, `geo`, `containsPlace` ja `image`-lista.
   - Yksi katuhubi sisältää ApartmentComplex-scheman identifierillä ja geolla.
3. Kerrotaan käyttäjälle, että hän pyytää Search Consolessa uudelleenindeksoinnin
   etusivulle (ja halutessaan yhdelle kohdesivulle). Rikastuloksen tila päivittyy
   yleensä muutamassa päivässä.

## Mitä EI tehdä
- Ei koodi- tai tietokantamuutoksia.
- Ei kosketa otsikoihin, kuvauksiin, canonicaleihin eikä ulkoasuun.
