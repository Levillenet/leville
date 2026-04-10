

# Huoneistojen massa-allokointi kiinteistöille (checkbox-valinta)

## Ongelma
Nykyinen Select-valikko sallii vain yhden huoneiston lisäämisen kerrallaan. Jokaisen valinnan jälkeen lista päivittyy ja käyttäjä joutuu avaamaan valikon uudelleen.

## Ratkaisu
Korvataan Select-valikko Popover + checkbox -listalla, jossa käyttäjä voi rastittaa useita huoneistoja kerralla ja tallentaa ne yhdellä painalluksella.

## Muutokset

### TicketAdmin.tsx — Kiinteistöt-välilehden allokointiUI (~rivit 2830–2844)

1. Korvataan `<Select>` komponentti `<Popover>` + `<Checkbox>`-listalla:
   - "Lisää huoneistoja" -painike avaa popoverin
   - Popoverissa listataan kaikki vapaat huoneistot checkboxeina, aakkosjärjestyksessä
   - Alaosassa "Tallenna" -painike, joka kutsuu `assign_apartment_to_property` jokaiselle valitulle huoneistolle
   - Valinnat nollataan ja lista päivitetään tallennuksen jälkeen

2. Edge function: ei muutoksia — nykyinen `assign_apartment_to_property` action toimii yksittäisille kutsuille, kutsutaan peräkkäin (tai lisätään bulk-action)

### Vaihtoehtoinen optimointi (suositeltu)
- Lisätään `manage-tickets` edge functioniin uusi action `bulk_assign_apartments_to_property` joka ottaa listan apartment_id:tä ja property_id:n
- Yksi API-kutsu usean huoneiston allokointiin kerralla

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Select → Popover+Checkbox multi-select UI |
| `supabase/functions/manage-tickets/index.ts` | Uusi `bulk_assign_apartments_to_property` action |

