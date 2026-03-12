

## Evästeetön sivukatseluseuranta

Rakennetaan oma kevyt analytiikka, joka ei vaadi evästeitä eikä GDPR-suostumusta.

### 1. Tietokantataulu `page_views`

```sql
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  device_type text DEFAULT 'desktop',
  language text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Kaikki voivat insertoida (anonyymi seuranta)
CREATE POLICY "Anyone can insert page views"
  ON public.page_views FOR INSERT TO public
  WITH CHECK (true);

-- Vain backend voi lukea
CREATE POLICY "Only backend can read page views"
  ON public.page_views FOR SELECT TO public
  USING (false);

CREATE POLICY "No updates on page views"
  ON public.page_views FOR UPDATE TO public
  USING (false);

CREATE POLICY "No deletes on page views"
  ON public.page_views FOR DELETE TO public
  USING (false);
```

### 2. Tracker-komponentti `src/components/PageViewTracker.tsx`

- Käyttää `useLocation()` reittimuutosten kuunteluun
- Supabase INSERT `page_views`-tauluun jokaisella sivunvaihdolla
- Tunnistaa `device_type` viewport-leveydestä (mobile < 768, tablet < 1024, desktop)
- Lähettää `navigator.language` ja ulkoisen `document.referrer`
- Ei evästeitä, ei session-tunnisteita
- Debounce/guard estää saman sivun duplikaatti-insertin

### 3. Integrointi `src/App.tsx`

`<PageViewTracker />` lisätään `<BrowserRouter>`-lohkon sisälle `<ScrollToTop />`-komponentin jälkeen.

### 4. Admin-näkymä `src/components/admin/PageViewsAdmin.tsx`

Edge function `get-page-view-stats` hakee tilastot service-role-avaimella:
- Sivukatselut per päivä (30 pv, viivakaavio)
- Top 20 suosituimmat sivut (pylväskaavio)
- Referrer-jakauma (piirakkakaavio)
- Laitejakauma (mobile/tablet/desktop)
- Kielijakauma

Uusi välilehti "Analytiikka" admin-paneeliin.

### 5. Edge function `supabase/functions/get-page-view-stats/index.ts`

- Vaatii admin-salasanan (sama pattern kuin muut admin-endpointit)
- Palauttaa aggregoidut tilastot viimeiseltä 30 päivältä
- Suosituimmat sivut, päivittäiset katselut, referrer/device/language-jakaumat

### Tiedostot

| Tiedosto | Toimenpide |
|---|---|
| Migraatio: `page_views`-taulu | Uusi |
| `src/components/PageViewTracker.tsx` | Uusi |
| `src/App.tsx` | Lisätään PageViewTracker |
| `supabase/functions/get-page-view-stats/index.ts` | Uusi |
| `supabase/config.toml` | Lisätään uusi funktio |
| `src/components/admin/PageViewsAdmin.tsx` | Uusi |
| `src/pages/Admin.tsx` | Lisätään Analytiikka-välilehti |

