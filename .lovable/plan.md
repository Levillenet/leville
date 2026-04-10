

# Tiketin muokkaus ja "Useita"-näyttö korjaukset

## Muutokset

### 1. Tiketin otsikon ja kuvauksen muokkaus (TicketAdmin.tsx – tiketin tiedot -osio)
Tiketin tietonäkymässä (rivi ~1481–1506) otsikko ja kuvaus ovat nyt staattista tekstiä. Muutetaan ne muokattaviksi:
- **Otsikko**: Klikatessa muuttuu Input-kentäksi, tallennus blur/Enter-painalluksella → `callApi("update_ticket", { id, updates: { title } })`
- **Kuvaus**: Klikatessa muuttuu Textarea-kentäksi, tallennus blur-tapahtumalla → `callApi("update_ticket", { id, updates: { description } })`
- Muutokset päivitetään `selectedTicket`-tilaan ja `fetchTickets()` kutsutaan uudelleen

### 2. "Huoneisto"-kenttä näyttää "Useita" kun useita kohteita (TicketAdmin.tsx)
**Tiketin tiedot -osio** (rivi ~1494–1497): Jos `ticketApartments.length > 1`, näytetään "Useita (X)" yksittäisen huoneiston nimen sijaan.

**Tikettilista-taulukko** (rivi ~2512): Logiikka on jo osittain paikallaan (`description?.includes("Huoneistot (")`), mutta se on epäluotettava. Korjataan käyttämään `ticket_apartments`-dataa tai vähintään parannetaan nykyistä tarkistusta.

### 3. Raportti-PDF: "Useita" näyttö (rivi ~1233)
Tikettiraportissa (`createReportPdf`) näytetään `getApartmentName(t.apartment_id)` – tämä näyttää vain ensimmäisen huoneiston. Korjataan: jos kuvaus sisältää "Huoneistot (", näytetään "Useita kohteita" sen sijaan.

Sama korjaus kausihuoltoraportissa (`createTicketsPdf`) ja kiinteistöraportissa (`createPropertyReportPdf`).

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Lisää inline-muokkaus otsikkoon ja kuvaukseen, korjaa "Useita"-näyttö kolmessa kohdassa |

