# Ajankohtaista-sivun uusi artikkeli 27.8.2026

Päivitetään suomenkielinen Ajankohtaista-sivu uudella ajankohtaisella artikkelilla, joka linkittää seuratuen ja talvikauden varaustilanteeseen.

## Muutokset

1. **Lisää uusi artikkeli `src/translations/fi.ts`** `ajankohtaista.items`-taulukon alkuun (uusin ensin):
   - Päivämäärä: **27.8.2026**
   - Badge: "🍂 Ruska & talvi 2026"
   - Otsikko: "Levin kesäkausi vaihtuu ruskaan ja talven treenikausiin"
   - Teksti: käyttäjän antama teksti sellaisenaan (sisältää Ruska-maratonin, ensilumen ladun, treeniryhmät, Seuratuki-linkin leville.net/seuratuki ja talven varaustilanteen)
   - Highlight: tiivis yhteenveto, esim. "Seuratuki tuo seuralle 10 % jokaisesta seuran kautta tulleesta majoitusvarauksesta – katso lisää osoitteesta leville.net/seuratuki."

2. **Päivitä meta-kuvaus** `ajankohtaista.meta.description` vastaamaan uusinta sisältöä (ruska, talvikausi, Seuratuki, varaustilanne).

3. **Rakenne säilyy ennallaan**: ei muutoksia komponentteihin, reitteihin eikä ulkoasuun.

## Validointi

- `bun run build` + reittivalidointi
- Playwright-tarkistus: `/ajankohtaista` avautuu, uusi artikkeli näkyy ensimmäisenä, päivämäärä ja otsikko vastaavat annettua tekstiä.
