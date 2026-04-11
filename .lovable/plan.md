

# Tikettilistauksen sarakkeiden päivitys

## Muutos
Poistetaan "Tyyppi"-sarake (redundantti koska välilehdet suodattavat jo tyypin mukaan) ja lisätään "Tekijä"-sarake joka näyttää tiketille osoitetun huoltoyhtiön nimen.

## Toteutus — `TicketAdmin.tsx`

### Taulun otsikkorivi (~rivit 2838–2844)
Nykyinen: Huoneisto | Otsikko | Kategoria | **Tyyppi** | Tila | Luotu | Toiminnot
Uusi: Huoneisto | Otsikko | Kategoria | Tila | Luotu | **Tekijä** | Toiminnot

### Taulun datarivit (~rivit 2867–2880)
- Poistetaan `typeBadge(ticket.type)` -solu
- Lisätään uusi solu joka näyttää huoltoyhtiön nimen: `companies.find(c => c.id === ticket.maintenance_company_id)?.name || "–"`
- Päivitetään `colSpan` tyhjä-ilmoituksessa (rivi 2850) vastaamaan uutta sarakemäärää

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Sarakkeiden vaihto: Tyyppi pois, Tekijä tilalle |

