

# Kausihuoltoraportti kiinteistöittäin — tilanne

## Nykytila

Koodi toteuttaa jo halutun toiminnallisuuden:

1. **Kiinteistösuodatin** on raporttidialogissa (Select: "Kaikki kiinteistöt" / yksittäinen kiinteistö)
2. **Multi-apartment-tikettien jakaminen**: jos tiketti (esim. "saunan kivien vaihto") sisältää huoneistoja 2 eri kiinteistöstä, raportti näyttää sen **molempien** kiinteistöjen alla erikseen
3. **Ryhmittely**: Kiinteistön nimi → huoneistot → kategoriat → tiketit

## Mahdollinen ongelma

Vanhat tiketit (luotu ennen `ticket_apartments`-järjestelmää) eivät välttämättä sisällä rivejä `ticket_apartments`-taulussa. Tällöin multi-apartment-tiketti näkyy vain yhden huoneiston (`t.apartment_id`) alla eikä jakaudu kiinteistöittäin.

## Suositeltava korjaus

Lisätään backfill-logiikka: jos `allTicketApartments` ei sisällä rivejä tietyn tiketin osalta, mutta tiketin kuvauksessa on listattuna useita huoneistoja (esim. "Huoneistot (5): ..."), parsitaan huoneistonimet ja käytetään niitä ryhmittelyyn.

## Muutokset

### TicketAdmin.tsx — `createPropertyReportPdf`

Muutetaan rivi ~1394-1404:
- Jos `ta.length === 0` JA tiketti on tyyppiä "kausihuolto" JA `apartment_ids` löytyy, käytetään `apartment_ids`-listaa jakamiseen
- Varasuunnitelmana parsitaan tiketin kuvauksesta huoneistonimet

### Vaihtoehto: backfill ticket_apartments

Lisätään edge function -actio `backfill_ticket_apartments`, joka:
- Hakee kaikki tiketit joilla `apartment_ids` on useampi kuin 1
- Tarkistaa onko `ticket_apartments`-rivit jo olemassa
- Luo puuttuvat rivit

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Fallback-logiikka vanhoille tiketeille `createPropertyReportPdf`-funktiossa |
| `supabase/functions/manage-tickets/index.ts` | Uusi `backfill_ticket_apartments` action (valinnainen) |

