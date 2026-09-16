# Julkaisun uudelleenyritys

## Tilanne (tarkistettu juuri)

- Tuotantobuild menee läpi virheittä (`build OK` 16.9. klo 05:02 UTC).
- Tietoturvaskannauksessa **ei ole yhtään kriittistä (error) havaintoa** — vain warn/info-tason huomioita, jotka eivät estä julkaisua.
- Julkaisun epäonnistumiseen ei siis ole näkyvää teknistä estettä koodissa tai turvaportissa; kyse on todennäköisesti ohimenevästä julkaisuvirheestä tai hylätystä hyväksynnästä.

## Mitä tehdään

1. Käynnistetään julkaisu uudelleen ja hyväksytään pyyntö.
2. Odotetaan noin minuutti ja varmistetaan livenä `https://leville.net/`:
   - sivu vastaa normaalisti,
   - Joulupukki-sivun (`/opas/joulupukki-levilla`) uudet metatiedot näkyvät livenä.
3. Jos julkaisu edelleen epäonnistuu, luetaan julkaisun palauttama virheteksti ja korjataan sen osoittama syy — ei arvailla etukäteen.

## Ei muuteta

Sivuston sisältöä, ulkoasua, metatageja tai koodia ei muuteta tässä vaiheessa.
