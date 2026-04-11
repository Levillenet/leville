

# Tekijä-sarake: näytä email_override kun huoltoyhtiötä ei ole

## Muutos
Rivillä 2877 Tekijä-sarake näyttää tällä hetkellä vain `companies.find(...)?.name || "–"`. Muutetaan logiikka niin, että jos `maintenance_company_id` löytyy, näytetään yhtiön nimi. Muussa tapauksessa näytetään `email_override` (manuaalinen sähköpostiosoitus), ja jos sekään ei ole, näytetään "–".

## Toteutus — `TicketAdmin.tsx`, rivi 2877

Nykyinen:
```tsx
{companies.find(c => c.id === ticket.maintenance_company_id)?.name || "–"}
```

Uusi:
```tsx
{companies.find(c => c.id === ticket.maintenance_company_id)?.name || ticket.email_override || "–"}
```

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Rivi 2877: lisätään `email_override` fallback Tekijä-sarakkeeseen |

