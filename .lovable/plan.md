

## Analytiikan korjaussuunnitelma

### Löydetyt ongelmat

**1. Engagement-data (scroll_depth, time_on_page) ei tallennu koskaan**
Tietokannassa on 2295 riviä, ja yhdessäkään ei ole scroll_depth tai time_on_page -arvoa. Syy: `trackEvent` tekee `.select("id").single()` insertin jälkeen, mutta page_views-taulun SELECT-RLS estää lukemisen (`using: false`). Tulos: `currentPageViewId` on aina `null` → `flushEngagement` ei koskaan lähetä dataa.

**2. "Sivustolla nyt" näyttää aina 0**
Live-käyttäjien laskenta perustuu kaavaan `created_at + time_on_page`, mutta koska time_on_page on aina null (ongelma 1), se tulkitaan nollaksi. Käyttäjä näkyy aktiivisena vain 5 minuuttia sivulatauksesta.

**3. Bounce rate 100% ja kesto 0s**
Nämä ovat osittain oikeita (monet kävijät katsovat vain yhden sivun), mutta sinun oma selailu ei näy koska korjattu koodi ei ole vielä tuotannossa — ja vaikka olisi, ongelma 1 estää datan tallennuksen.

**4. "Tänään" käyttää UTC-aikaa eikä Suomen aikaa**
Haluat Suomen aikavyöhykettä.

### Korjaukset

**Korjaus 1: Generoi page_view ID selaimessa (PageViewTracker.tsx)**
Sen sijaan että yritetään lukea ID takaisin insertistä (jota RLS estää), generoidaan UUID selaimessa `crypto.randomUUID()` ja lähetetään se insertin mukana. Näin `currentPageViewId` saa aina arvon ja engagement-data lähtee perille.

```text
Nykyinen:
  insert → .select("id").single() → null (RLS estää)

Korjattu:
  const id = crypto.randomUUID()
  insert({ id, ... }) → id talteen heti
```

**Korjaus 2: Live-käyttäjien laskenta (get-page-view-stats edge function)**
Varmuuskorjaus: jos `time_on_page` on null, käytetään pelkkää `created_at`-aikaa (fallback nykyiseen 5 min ikkunaan). Tämä toimii kunnes engagement-data alkaa virrata.

**Korjaus 3: Suomen aikavyöhyke "Tänään"-rajaukseen (get-page-view-stats edge function)**
Muutetaan `today`-period käyttämään `Europe/Helsinki`-aikavyöhykettä päivän alun laskemiseen.

### Tiedostot jotka muuttuvat
1. `src/components/PageViewTracker.tsx` — client-side UUID generation
2. `supabase/functions/get-page-view-stats/index.ts` — timezone fix + live fallback

