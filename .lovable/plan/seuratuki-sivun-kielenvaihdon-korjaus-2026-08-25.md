# Seuratuki-sivun kielenvaihdon korjaus

## Todettu syy

`src/App.tsx` sisältää oikeat sivureitit `/seuratuki` ja `/en/club-support`, ja molempien sivujen hreflang-määritykset ovat oikein. Kielivalitsin ei kuitenkaan käytä sivukohtaista hreflang-dataa, vaan `src/translations/index.ts`-tiedoston `routeConfig`-taulukkoa. Tästä taulukosta puuttuu seuratukisivujen FI–EN-reittipari, joten englanninkielisen URL:n vaihtaminen suomeksi ei löydä `/seuratuki`-vastinetta.

## Korjaus

1. Lisätään `routeConfig`-taulukkoon seuratukisivun kielireitti:
   - suomi: `/seuratuki`
   - englanti: `/en/club-support`
2. Muiden kielten kohdalla käytetään olemassa olevan sivuston käännöksettömien sivujen linjaa eikä luoda uusia, olemattomia kieli-URL:eja.
3. Sivujen nykyisiä canonical- ja hreflang-määrityksiä ei muuteta, koska ne osoittavat jo oikeisiin FI- ja EN-versioihin.

## Varmistus

- Testataan selaimessa `/en/club-support` → Suomi: lopputulos `/seuratuki`, ja suomenkielinen sisältö latautuu ilman 404-virhettä.
- Testataan `/seuratuki` → English: lopputulos `/en/club-support`.
- Ajetaan reitti- ja build-validointi, jotta muutos ei riko muita kielireittejä.
