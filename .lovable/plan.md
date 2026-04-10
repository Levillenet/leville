

# Kiinteistöraportin multi-apartment-tikettien suodatus

## Ongelma

Kun tiketti (esim. "Saunan kivien vaihto") koskee 14 huoneistoa kolmesta kiinteistöstä, raportti:
1. Luo jokaiselle huoneistolle oman osion → 10 erillistä "Useita kohteita" -osiota Glacier-kiinteistön alle
2. Jokaisen osion kuvauksessa listataan KAIKKI 14 huoneistoa, ei vain kyseisen kiinteistön huoneistoja

## Ratkaisu

Muutetaan `createPropertyReportPdf`-funktion ryhmittelylogiikka niin, että multi-apartment-tiketit:
- Näytetään **kerran per kiinteistö** (ei kerran per huoneisto)
- Kuvauksessa listataan vain kyseisen kiinteistön huoneistot (intersection/leikkaus)
- Tikettien lukumäärä lasketaan uniikkien tikettien mukaan (ei huoneisto × tiketti)

## Muutokset — `TicketAdmin.tsx`, `createPropertyReportPdf` (~rivit 1378–1510)

### 1. Uusi tietorakenne
Nykyinen: `propGroups[propKey].aptGroups[aptId] = Ticket[]`
Uusi: lisätään `propGroups[propKey].multiAptTickets` — map tiketti-id → { ticket, aptIds[] }

Multi-apartment-tiketit menevät `multiAptTickets`-mappiin (yksi entry per tiketti per kiinteistö, sisältäen vain kyseisen kiinteistön huoneistot). Yksittäisen huoneiston tiketit menevät `aptGroups`-mappiin kuten ennenkin.

### 2. Renderöinti
- Ensin tulostetaan huoneistokohtaiset tiketit (aptGroups) kuten nykyään
- Sitten tulostetaan multi-apartment-tiketit omana "Useita kohteita" -osiona, jossa kuvauksessa näkyy vain kyseisen kiinteistön huoneistonimet

### 3. Tikettien lukumäärä
`totalCount` lasketaan uniikkien tiketti-id:iden mukaan, ei rivien mukaan.

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | `createPropertyReportPdf` — ryhmittely ja renderöinti |

