# Julkaisun läpivienti

## Tilanne (tarkistettu juuri)

- Turvaskannauksessa **ei ole yhtään kriittistä (error) havaintoa** — vain 4 varoitusta ja 2 info-tason huomiota. Ne eivät estä julkaisua.
- Tuotantobuild menee paikallisesti läpi virheittä (`✓ built in 36s`, sisältää reitti- ja käännösvalidoinnit).
- Julkaisupaketti on 561 tiedostoa / 48 MB — reilusti alle julkaisurajojen (50 000 tiedostoa / 3 GiB).
- Edellinen julkaisuyritys päättyi siihen, että julkaisupyyntö hylättiin hyväksyntävaiheessa — siksi mitään ei mennyt livenä.

Eli koodi on julkaisukunnossa; kyse on itse julkaisupyynnön läpiviennistä.

## Mitä tehdään

1. Käynnistetään julkaisu uudelleen ja hyväksytään pyyntö.
2. Odotetaan noin minuutti ja varmistetaan livenä `https://leville.net/`:
   - vanha virheellinen `VacationRental`-schema on poissa etusivun HTML:stä,
   - etusivun otsikko on majoituspainotteinen versio.
3. Jos julkaisu edelleen epäonnistuu, luetaan julkaisun palauttama virheteksti ja korjataan sen osoittama syy (esim. estävä havainto tai alustavirhe) — ei arvailla etukäteen.
4. Onnistumisen jälkeen ohje: pyydä Google Search Consolessa etusivun uudelleenindeksointi, jotta rakenteinen data päivittyy.

## Ei muuteta

Sivuston sisältöä, ulkoasua, metatageja tai skeemakoodia ei muuteta tässä vaiheessa — ne on jo korjattu ja verifioitu paikallisesti.
