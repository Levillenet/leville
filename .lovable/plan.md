## Plan: fix Skistar Wi‑Fi answers

Auto-responder currently knows a generic Wi‑Fi topic, but it is not yet pulling the exact property-specific Wi‑Fi credentials from the backend when someone asks about Skistar. I confirmed the backend already has a published Skistar Studios property with Wi‑Fi name `Hotelli` and password `Vieras22`.

### What I will change

1. Add property detection for Skistar aliases
- Recognize messages that mention Skistar, Ski Star, studios, and the existing property aliases tied to that accommodation.
- Make property detection work alongside topic detection, so `wifi + skistar` is treated as a specific property Wi‑Fi question, not a generic Wi‑Fi question.

2. Load exact property facts from the backend during reply generation
- Read the matched property’s guest-guide data from the backend.
- Pull exact facts like Wi‑Fi name, Wi‑Fi password, and optionally check-in/check-out details for the same property.

3. Prioritize exact property answers over generic knowledge-base replies
- When the detected topic is Wi‑Fi and a property match exists, inject the property facts into the AI context with higher priority than the general Wi‑Fi fallback.
- Add a stronger instruction so the responder answers directly with the known credentials instead of saying only “see welcome letter” or other general text.

4. Use the same logic in both live mode and Lovable-only test mode
- Update both the real mailbox polling flow and the in-admin test flow.
- This ensures the preview/test result matches real production behavior.

5. Improve observability in the admin test response
- Return the detected property in the test result/routing info.
- This makes it easy to see whether the system understood `Skistar` correctly when testing.

### Expected result

Questions like:
- “Mikä on Skistar wifi?”
- “Skistar Wi‑Fi password?”
- “Hotelli / Vieras22?”

should produce a direct answer such as:
- Network: Hotelli
- Password: Vieras22

instead of a generic response.

### Technical details

- No database schema change is needed.
- Main files to update:
  - `supabase/functions/_shared/autoresponderKnowledge.ts`
  - `supabase/functions/_shared/autoresponderEngine.ts`
  - `supabase/functions/autoresponder-test/index.ts`
  - `supabase/functions/autoresponder-poll/index.ts`
- I will likely add a shared helper that:
  - detects the property from message text
  - loads the matching property guide record from the backend
  - builds a `PROPERTY-SPECIFIC FACTS` block for the AI prompt
- I’ll also include the project rule that Skistar should be treated as `Skistar` consistently.

### Verification

After implementation I will test at least these cases:
- `Skistar wifi`
- `What is the wifi password at Skistar?`
- `Hotelli / Vieras22`
- generic `wifi` without property mention
- non-Wi‑Fi Skistar question to ensure other Skistar guide info still works

If you approve, I’ll implement this next.