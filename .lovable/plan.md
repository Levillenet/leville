

# Tikettien kohteiden lisääminen jälkikäteen

## Nykytila
Tiketin kohteita (huoneistoja) voi valita vain luontivaiheessa. Tiketin yksityiskohtanäkymässä kohdelista on pelkkä teksti ilman muokkausmahdollisuutta.

## Ratkaisu

### 1. Edge function — uusi `add_ticket_apartments` action (`manage-tickets/index.ts`)
- Vastaanottaa `ticket_id` ja `apartment_ids` (lista lisättävistä)
- Tarkistaa ettei duplikaatteja (ohittaa jo olemassa olevat)
- Lisää rivit `ticket_apartments`-tauluun
- Päivittää parent-tiketin `apartment_id`-kentän kuvausta tarvittaessa
- Kirjaa historian ("Lisätty kohteet: X, Y")

### 2. UI — "Lisää kohteita" -nappi tikettinäkymään (`TicketAdmin.tsx`)
- Lisätään "Huoneisto"-rivin (rivi ~1729) viereen/alle pieni "+" -nappi
- Nappi avaa Popover/Dialog jossa on sama huoneistolista (apartmentList) checkboxeina
- Jo tiketissä olevat kohteet näkyvät harmaina/disabloituina
- "Lisää" -nappi tallentaa ja päivittää ticketApartments-listan

## Muutettavat tiedostot

| Tiedosto | Muutos |
|---|---|
| `supabase/functions/manage-tickets/index.ts` | Uusi `add_ticket_apartments` action |
| `src/components/admin/TicketAdmin.tsx` | "Lisää kohteita" -UI tikettinäkymässä |

