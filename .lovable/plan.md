

# Korjaus: Uudelleenaktivoinnin muistutusajastus ja loki

## Ongelma
Kun tiketti aktivoidaan uudelleen, historiassa ei näy uudelleen ajastettuja muistutuksia eikä sähköpostilokissa näy uutta ajastettua viestiä. Syitä on kaksi:

1. **Edellinen testi ajoi vanhaa koodia** — muistutusajastuslogiikka lisättiin edge functioniin, mutta se deployattiin vasta testin jälkeen
2. **UI ei päivitä sähköpostilokia** — `fetchEmailLog` puuttuu reactivation-käsittelijästä
3. **`changed_by` puuttuu** — kutsusta ei lähetetä tekijätietoa

## Muutokset

### 1. TicketAdmin.tsx — reactivation-käsittelijä (rivi ~1752)
- Lisää `fetchEmailLog(selectedTicket.id)` kutsun jälkeen
- Lisää `changed_by: "admin"` API-kutsuun

### 2. Edge function: lisää console.log debuggausta (manage-tickets/index.ts, reactivate_ticket case)
- Lisää lokit jotta nähdään menikö muistutusajastus läpi vai ei
- Varmistetaan logiikan oikeellisuus: aikavyöhykekorjaus `scheduledFor`-laskennassa (Deno käyttää UTC:tä, mutta `guest_departure_date + "T18:00:00"` parsitaan UTC:nä → OK tässä tapauksessa)

### 3. Redeploy edge function
- Varmistetaan uusin koodi on ajossa

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Lisää `fetchEmailLog` + `changed_by` reactivation-kutsuun |
| `supabase/functions/manage-tickets/index.ts` | Lisää debug-logit reactivate_ticket-haaraan |

