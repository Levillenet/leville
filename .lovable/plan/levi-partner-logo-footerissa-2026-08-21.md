# Levi Partner -logo footerissa

## Tavoite

Korjata footerin Levi Partner -merkki ammattimaisemmaksi:
1. Logo saa olla tupla nykyiseen verrattuna.
2. Merkin alla ei enää lue erillistä "Levi Partner" -tekstiä — pelkkä logo riittää.

## Muutokset

Tiedosto: `src/components/Footer.tsx` (Levi Partner -lohko, rivit ~269–277)

- Poistetaan tekstirivi `<span className="text-sm text-muted-foreground font-medium">Levi Partner</span>`.
- Kasvatetaan logon korkeusluokkaa nykyisestä `h-12` → `h-24` (tupla).
- Säädetään logon taustalaatikon korkeutta (`h-14` → `h-28`) tai korvataan kiinteä korkeus pystysuuntaisella paddingilla, jotta suurempi logo mahtuu ja pysyy keskitettynä.
- Varmistetaan, että kortin muut osat (padding, reunat, tasautus) pysyvät samoina kuin muissa trust-korteissa.

## Tarkistus

- Rakennetaan projekti (`bun run build`) ja ajetaan mukana tuleva reittivalidointi.
- Tarkistetaan visuaalisesti previewissä, että logo on selvästi suurempi ja tekstiä ei enää ole.
