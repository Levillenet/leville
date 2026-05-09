## Ongelma

**1. Käännös ei toimi** — `manage-promo-banners` edge function kutsuu väärää AI-gateway URLia: `https://ai.gateway.lovable.dev/chat/completions` (puuttuu `/v1/`). Toimiva versio (esim. `translate-booking-terms`) käyttää `https://ai.gateway.lovable.dev/v1/chat/completions`.

**2. Napille ei voi antaa linkkiä** — Admin-lomakkeessa voi valita vain valmiin "Kohdesivu"-pudotusvalikon (`route_key` → asettaa `target_url`). Vapaata URL-kenttää (esim. ulkoiseen tarjoussivuun tai mihin tahansa polkuun) ei ole näkyvissä, vaikka tietokannassa kenttä `target_url` on olemassa.

## Korjaukset

### 1. `supabase/functions/manage-promo-banners/index.ts`
- Vaihda fetch-URL `https://ai.gateway.lovable.dev/chat/completions` → `https://ai.gateway.lovable.dev/v1/chat/completions`.
- Lisää 429/402-virheille selvät viestit (sama tyyli kuin `translate-booking-terms`), jotta admin näkee jos rate limit / krediitit lopussa.

### 2. `src/components/admin/PromoBannerAdmin.tsx` — Linkki napille
Lisää "Kohdesivu"-valitsimen alle uusi tekstikenttä **"Linkki (URL tai polku)"**, joka:
- näyttää ja muokkaa suoraan `editing.target_url`-arvoa
- toimii sekä ulkoisille linkeille (`https://...`) että sisäisille poluille (`/majoitukset`)
- pudotusvalikon valinta täyttää sen edelleen automaattisesti (nykyinen käytös), mutta käyttäjä voi yliajaa
- Lisätään pieni ohje: "Voit myös tyhjentää sivuvalinnan ja kirjoittaa oman linkin tähän."
- Jos URL on ulkoinen (`http`-alkuinen), `redirect_localized`-kytkin disabloituu/piilotetaan koska kielitettyjä versioita ei silloin ole.

Hero-badge ja "Iso banneri" lukevat jo `getTargetUrl()`-funktiosta `target_url`-arvon, joten frontend-renderöinti toimii sellaisenaan.

## Mitä EI muuteta
- Tietokantaskeema (kentät ovat jo olemassa).
- `usePromoBanner`-hookki tai julkiset komponentit.
- Muut admin-lomakkeen kentät.