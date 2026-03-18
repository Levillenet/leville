

## Analytiikan laajennus: UTM, scroll depth, time on page

### 1. Tietokantamigraatio
Lisätään 5 uutta saraketta `page_views`-tauluun:
```sql
ALTER TABLE public.page_views
  ADD COLUMN utm_source text,
  ADD COLUMN utm_medium text,
  ADD COLUMN utm_campaign text,
  ADD COLUMN scroll_depth integer,
  ADD COLUMN time_on_page integer;
```

### 2. Uusi edge function: `update-page-engagement`
- Vastaanottaa `{page_view_id, session_id, scroll_depth, time_on_page}`
- Päivittää rivin service role -avaimella WHERE id = page_view_id AND session_id = session_id
- `verify_jwt = false`, ei vaadi autentikointia
- Kevyt endpoint jota `sendBeacon` kutsuu

### 3. PageViewTracker.tsx muutokset
- **UTM**: Luetaan `window.location.search` → tallennetaan `sessionStorage`iin → lähetetään insertissä
- **trackEvent** palauttaa insertin `id`:n → tallennetaan refiin (`currentPageViewId`)
- **Scroll depth**: `scroll`-kuuntelija, lasketaan max scroll-%, pyöristetään lähimpään 25
- **Time on page**: `Date.now()` sivulle tullessa, delta lähtiessä, cap 1800s
- **Sivulta poistuminen**: `visibilitychange` + navigaatio → yksi `sendBeacon`/`fetch` kutsu `update-page-engagement`iin scroll_depth + time_on_page
- Ei koske konversiotapahtumia (`/event/`-polut), vain sivukatseluja

### 4. CSV-viennin päivitys (`get-page-view-stats`)
- Select-kyselyyn lisätään: `utm_source, utm_medium, utm_campaign, scroll_depth, time_on_page`
- CSV-otsikkorivi: `date,time,path,type,referrer,device_type,language,session_id,utm_source,utm_medium,utm_campaign,scroll_depth,time_on_page`
- Jokainen rivi saa uudet sarakkeet mukaan

### 5. JSON-aggregaatio (get-page-view-stats)
- UTM-lähteet aggregoidaan `byUtmSource`, `byUtmMedium`, `byUtmCampaign` -objekteiksi
- Keskimääräinen scroll depth ja time on page kokonaismetriikoihin

### Tiedostot
1. **Migraatio** — 5 saraketta
2. **Luo** `supabase/functions/update-page-engagement/index.ts`
3. **Muokkaa** `supabase/config.toml` — `verify_jwt = false` uudelle funktiolle
4. **Muokkaa** `src/components/PageViewTracker.tsx`
5. **Muokkaa** `supabase/functions/get-page-view-stats/index.ts`

