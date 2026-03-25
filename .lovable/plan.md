

## Plan: CORS Restriction + Rate Limiting for Edge Functions

### 1. CORS Restriction — Admin Edge Functions (23 files)

In each of the 23 admin/internal edge functions listed, change `'Access-Control-Allow-Origin': '*'` to `'Access-Control-Allow-Origin': 'https://leville.net'`.

**Files to update:**
`admin-auth`, `admin-settings`, `get-chatbot-stats`, `get-current-guests`, `get-download-stats`, `get-page-view-stats`, `log-message`, `manage-guide`, `manage-message-templates`, `manage-seo-pages`, `scrape-booking`, `send-admin-invite`, `send-worklist`, `translate-booking-terms`, `verify-admin`, `homey-api`, `homey-callback`, `melcloud-api`, `melcloud-cron`, `maintenance-settings`, `maintenance-bookings`, `mark-cleaned`, `floor-heating-cron`

**Keep `'*'` in these public functions (no changes):**
`update-page-engagement`, `log-download`, `send-property-inquiry`, `send-aurora-confirmation`, `unsubscribe-aurora`, `fmi-snow-data`, `beds24-availability`, `customer-service-chat`, `check-aurora-alerts`

### 2. DOMPurify Sanitization — Already Done

Both `CustomerServiceChat.tsx` and `InlineChat.tsx` already import DOMPurify and use `DOMPurify.sanitize()` around `dangerouslySetInnerHTML` content. No changes needed.

### 3. Rate Limiting — Public Edge Functions (2 files)

Add simple in-memory IP-based rate limiting to `update-page-engagement/index.ts` and `log-download/index.ts`:

- Use a `Map<string, number[]>` to track request timestamps per IP
- Extract IP from `req.headers.get('x-forwarded-for')` or `'unknown'`
- Reject with 429 if >100 requests in the last 60 seconds from the same IP
- Clean up old entries periodically

```typescript
const rateLimit = new Map<string, number[]>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimit.get(ip) || []).filter(t => now - t < 60000);
  if (timestamps.length >= 100) return false;
  timestamps.push(now);
  rateLimit.set(ip, timestamps);
  return true;
}
```

### Files Summary

| Files | Change |
|-------|--------|
| 23 admin edge functions | CORS origin → `https://leville.net` |
| `update-page-engagement/index.ts` | Add rate limiting |
| `log-download/index.ts` | Add rate limiting |
| Chat components | Already fixed — no changes |

