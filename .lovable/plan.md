# World Cup Levi -sivun korjaus: Zero Pointin rooli

## Mitä muutetaan

Tiedosto: `src/pages/guide/WorldCupLevi.tsx`

1. **Poista Zero Point "Parhaat katselupaikat" -listalta** molemmilla kielillä.
2. **Lisää Zero Pointin oikea rooli** erillisenä oheisohjelmatietona: siellä järjestetään esimerkiksi lasku-/kilpailunumeroiden arvonta ja muuta oheisohjelmaa perjantai- ja lauantai-iltana.

## Toteutus

### FI
- `spots.items`: poista kohde "Zero Point". Jäljelle jäävät: "Maalialue ja pääkatsomo" sekä "Lapland Avenue -tapahtuma-alue".
- Lisää uusi kortti/tekstikohta oheisohjelmaan (tai erillisenä tietolaatikkona), joka kertoo: "Zero Pointissa järjestetään esimerkiksi lasku- ja kilpailunumeroiden arvonta, johon liittyy yleensä muutakin oheisohjelmaa perjantai- ja lauantai-iltana."

### EN
- `spots.items`: poista "Zero Point". Jäljelle jäävät: "Finish area and main stand" ja "Lapland Avenue event area".
- Lisää vastaava teksti: "Zero Point hosts events such as the bib draw, usually with additional side programming on Friday and Saturday evening."

## Tekniset huomiot

- Ei muutoksia reitteihin, sitemapiin eikä skeemoihin.
- `stay`-osion tekstiin jätetään maininta "Our apartments sit next to Zero Point" / "Huoneistomme sijaitsevat Zero Pointin tuntumassa", koska se kuvaa sijaintia, ei katselupaikkaa.
- Typecheck ja build tarkistetaan muutoksen jälkeen.
