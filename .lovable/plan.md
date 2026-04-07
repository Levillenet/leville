

# Tikettien ohjaus siivoukselle / kiinteistöhuollolle

## Yhteenveto

Lisätään tikettiin `assignment_type`-kenttä (siivous / kiinteistöhuolto), joka ohjaa sähköpostin oikealle yritykselle per huoneisto. Samalla vaihdetaan "Kiireellinen" → "Hoidettava mahdollisimman pian".

## 1. Tietokantamuutos

Lisätään `tickets`-tauluun uusi sarake:
```sql
ALTER TABLE public.tickets 
ADD COLUMN assignment_type text NOT NULL DEFAULT 'kiinteistohuolto';
```

## 2. UI-muutokset (`TicketAdmin.tsx`)

**Tiketin luontilomake:**
- Lisätään uusi radio-valinta **"Ohjaa"**: `Kiinteistöhuolto` / `Siivous` (oletus: kiinteistöhuolto)
- Valinnan perusteella näytetään oletussähköposti. Haetaan `apartment_maintenance`-taulusta oikean `assignment_type`-rivin perusteella huoltoyhtiön email ja näytetään se "Oletussähköposti: xxx@yritys.fi" -tekstinä kentän alla
- Jos tikettiin ei anneta manuaalista email_override -osoitetta, käytetään automaattisesti oikean tyypin (siivous/kiinteistöhuolto) yrityksen sähköpostia
- Monelle huoneistolle luotaessa: jokaisen huoneiston kohdalla käytetään sen oman assignment_type-mukaisen yrityksen sähköpostia

**Nimikkeen muutos:**
- Kaikki "Kiireellinen"-tekstit → "Hoidettava mahdollisimman pian"
- Koskee: radio-valintaa, badge-komponenttia, suodattimia, PDF-raportteja, sähköpostipohjia

**`newTicket` state:**
- Lisätään kenttä `assignment_type: "kiinteistohuolto"` oletusarvolla

## 3. Edge Function: `manage-tickets/index.ts`

**`resolveRecipientEmail`**: Vastaanottaa uuden parametrin `assignmentType` ja suodattaa `apartment_maintenance`-haun sen mukaan:
```typescript
async function resolveRecipientEmail(supabase, apartmentId, assignmentType = "kiinteistohuolto") {
  const { data: assignment } = await supabase
    .from("apartment_maintenance")
    .select("contact_email_override, maintenance_company_id")
    .eq("apartment_id", apartmentId)
    .eq("assignment_type", assignmentType)
    .maybeSingle();
  // ... sama logiikka
}
```

**`resolve_email` action**: Vastaanottaa `assignment_type`-parametrin ja välittää sen `resolveRecipientEmail`-funktiolle.

**`create_ticket`**: Tallentaa `assignment_type`-kentän tikettiin.

**`sendTicketEmail`**: Lukee `assignment_type`-kentän tiketistä ja välittää sen `resolveRecipientEmail`-funktiolle.

**Toistuva tiketti**: Perii `assignment_type`-kentän edellisestä tiketistä.

## 4. Edge Function: `ticket-reminders/index.ts`

**`resolveRecipientEmail`**: Sama muutos – lukee tiketin `assignment_type`-kentän ja käyttää sitä suodattimena `apartment_maintenance`-haussa.

## Muutosten yhteenveto

| Kohde | Muutos |
|---|---|
| Migraatio | Lisää `assignment_type` sarake `tickets`-tauluun |
| `TicketAdmin.tsx` | Lisää "Ohjaa" radio-valinta, näytä oletussähköposti, vaihda "Kiireellinen" → "Hoidettava mahdollisimman pian" |
| `manage-tickets/index.ts` | `resolveRecipientEmail` suodattaa `assignment_type`:n mukaan, `create_ticket` tallentaa kentän |
| `ticket-reminders/index.ts` | Sama `resolveRecipientEmail`-muutos |

