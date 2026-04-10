

# Plan: Fix Resolution Links + Recurrence + Per-Apartment Guest Schedules

## Problems Found

1. **Resolution links broken**: The `TicketResolved` page receives `token` and `apt` params from emails, but when redirecting to the edge function, it only passes `token` — the `apt=1` param is lost. This causes multi-apartment tokens to fail lookup (edge function looks in `tickets` table instead of `ticket_apartments`).

2. **Recurrence only fires on resolution**: Currently new recurring tickets are created only when the previous ticket is marked resolved. User wants them created automatically on schedule regardless.

3. **Per-apartment guest schedule missing**: Changeover tickets only store departure/arrival on the parent ticket (for the first apartment). Multi-apartment tickets need individual schedules per unit.

4. **Email links use preview URL**: The `siteBase` in email templates points to the preview URL, which may not match production.

---

## Changes

### 1. Fix TicketResolved redirect (src/pages/TicketResolved.tsx)
- Pass ALL search params (`apt`, `token`) through to the edge function URL
- Fix: `const apt = searchParams.get("apt"); if (apt) url += "&apt=1";`

### 2. Database Migration
- Add `guest_departure_date` (date) and `next_guest_arrival_date` (date) to `ticket_apartments`
- Add `next_recurrence_at` (timestamptz) to `tickets` — stores when the next recurring instance should be created

### 3. manage-tickets Edge Function
- **Per-apartment Beds24 fetch**: When creating a changeover ticket with multiple apartments, loop through each `apartment_id` and call `getNextGuestChangeover()` individually, storing results in `ticket_apartments` rows
- **Set `next_recurrence_at`**: On ticket creation with `recurrence_months > 0`, calculate and store the next fire date
- **Remove recurrence-on-resolve logic**: Stop creating new tickets when status changes to resolved

### 4. ticket-reminders Edge Function
- **New section: Auto-recurrence check**: Query tickets where `next_recurrence_at <= now()`, create a new ticket copy with fresh Beds24 data for each apartment, set new `next_recurrence_at` on the new ticket
- **Changeover reminders**: Include per-apartment guest info from `ticket_apartments` (departure/arrival) in reminder emails
- **Remove priority references**: Use ticket `type` instead

### 5. check-booking-changes Edge Function
- Update to also sync `ticket_apartments.guest_departure_date` and `next_guest_arrival_date` for each apartment row

### 6. resolve-ticket-public Edge Function
- Use `SITE_URL` env or default to published URL (`https://leville.lovable.app`) instead of preview URL

### 7. Email template (manage-tickets doSendEmail)
- For multi-apartment changeover tickets, show per-apartment guest schedule in the email body (each unit's departure/arrival)
- Use `SITE_URL` env for email links instead of hardcoded preview URL

---

## Files Modified

| File | Change |
|---|---|
| `src/pages/TicketResolved.tsx` | Pass `apt` param to edge function redirect |
| Migration SQL | Add columns to `ticket_apartments`, add `next_recurrence_at` to `tickets` |
| `supabase/functions/manage-tickets/index.ts` | Per-apartment Beds24, set `next_recurrence_at`, remove resolve-triggered recurrence, per-apartment changeover in emails, fix siteBase |
| `supabase/functions/ticket-reminders/index.ts` | Auto-recurrence cron, per-apartment guest info in reminders, remove priority |
| `supabase/functions/check-booking-changes/index.ts` | Update per-apartment rows |
| `supabase/functions/resolve-ticket-public/index.ts` | Fix redirect URL |

