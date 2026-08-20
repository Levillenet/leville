# World Cup -tapahtumakortin korjaus

## Mitä tarkistin

**1. "Lue lisää" -linkki**
Koodissa linkki osoittaa jo omalle sivullemme. Ajoin tapahtumasivun (`/opas/tapahtumat-levilla`) esikatselussa ja tarkistin kaikki korttien linkit — World Cup -kortti vie osoitteeseen `/opas/world-cup-levi` (EN-puolella `/guide/levi-world-cup`), ei ulkoiselle sivustolle. Koko koodikannassa ei ole yhtään linkkiä `worldcuplevi.com`-osoitteeseen paitsi World Cup -sivullamme itsellään, jossa se kuuluu olla (viralliset lipputiedot).

Eli julkaistulla sivustolla näkyy vielä vanha versio: muutos on tehty, mutta sitä ei ole viety tuotantoon. Korjaus on julkaisu, ei koodimuutos.

**2. "Ilmainen"-leima**
Tämä on aito virhe. World Cup -tapahtuma on merkitty tapahtumadatassa kokonaan ilmaiseksi (`free: true`), jolloin kortissa näkyy vihreä 🎟 Ilmainen -leima. Todellisuudessa vain osa on ilmaista.

## Mitä teen

Muokkaan tiedostoa `src/components/guide/EventTimeline.tsx`:

1. Lisään tapahtumatyyppiin uuden vapaaehtoisen kentän osittaiselle maksuttomuudelle (esim. `partlyFree`).
2. Vaihdan World Cup -tapahtuman merkinnän: ei enää täysin ilmainen, vaan osittain.
3. Kortti näyttää tällöin vihreän "Ilmainen"-leiman sijaan neutraalimman leiman:
   - FI: "Osin ilmainen"
   - EN: "Partly free"
4. Täsmennän World Cupin kuvaustekstiä molemmilla kielillä niin, että se kertoo suoraan mikä on ilmaista ja mikä ei: rinteen laidalta seuraaminen on ilmaista, katsomo- ja VIP-paikat sekä oheistapahtumat ovat maksullisia.

Muut tapahtumat säilyvät ennallaan.

## Julkaisu

Muutoksen jälkeen sivusto pitää julkaista, jotta sekä linkkikorjaus että leiman muutos näkyvät osoitteessa leville.net.

## Tekniset yksityiskohdat

- Tiedosto: `src/components/guide/EventTimeline.tsx` (tapahtumataulukko rivit ~44–58, leimojen renderöinti rivit ~596–601, käännösnimikkeet rivit ~325 ja ~337).
- Ei muutoksia sivun rakenteeseen, muihin komponentteihin eikä World Cup -sivuun itseensä.
