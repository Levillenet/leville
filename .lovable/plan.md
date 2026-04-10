

# Yksinkertaista sähköpostin reititys: käytä aina tiketin suorittajaa

## Ongelma
Nykyään sähköpostin vastaanottaja haetaan `apartment_maintenance`-taulusta (huoneiston oletusallokointi), mutta käyttäjä valitsee aina suorittajan alasvetovalikosta tiketille. Oletusallokoinnit aiheuttavat hämmennystä ja virheitä (esim. Fnffn-maili meni väärälle).

## Muutokset

### 1. Edge Functionien email-logiikan yksinkertaistaminen
Kaikissa kolmessa Edge Functionissa (`manage-tickets`, `check-booking-changes`, `ticket-reminders`):
- Poistetaan `resolveRecipientEmail`-funktio kokonaan
- Sähköposti haetaan aina tiketin `maintenance_company_id` → `maintenance_companies.email`
- Fallback: tiketin `email_override` (jos asetettu)
- Jos kumpaakaan ei ole → ei lähetetä

### 2. Admin-UI: Poista huoneistoallokoinnit
`src/components/admin/TicketAdmin.tsx`:
- Poistetaan "Huoltoyhtiöt"-välilehdeltä huoneistojen allokointi-osio (assign/unassign apartment)
- Jätetään vain yhtiöiden CRUD (nimi, email, puhelin, tyyppi)
- Poistetaan `assignments`-state ja siihen liittyvä koodi
- Poistetaan `handleAssignApartment`, `handleUnassignApartment`, `handleAssignApartmentToProperty` -funktiot

### 3. Backend: Poista allokointi-endpointit
`supabase/functions/manage-tickets/index.ts`:
- Poistetaan `assign_apartment`, `unassign_apartment`, `assign_apartment_to_property` -actionit
- Poistetaan `resolve_email`-action (ei enää tarvita erillistä resolveria)

### Tiedostot

| Tiedosto | Muutos |
|---|---|
| `supabase/functions/check-booking-changes/index.ts` | Korvaa `resolveRecipientEmail` → hae suoraan `ticket.maintenance_company_id` |
| `supabase/functions/ticket-reminders/index.ts` | Sama muutos |
| `supabase/functions/manage-tickets/index.ts` | Sama muutos + poista allokointi-endpointit |
| `src/components/admin/TicketAdmin.tsx` | Poista huoneistoallokointi-UI, pidä yhtiöiden CRUD |

**Huom:** `apartment_maintenance`-taulua ei poisteta tietokannasta tässä vaiheessa (voidaan tehdä myöhemmin), mutta sitä ei enää käytetä missään.

