

## Konversioseuranta ja admin-näkymän parantaminen

### Nykytilanne

Varaustapahtumien seuranta toimii jo: klikkaukset tallennetaan `page_views`-tauluun polkuina `/event/booking-search-widget`, `/event/booking-sticky-bar`, `/event/booking-page-cta` ja `/event/booking-link`. Referrer-kenttään tallennetaan sivu jolta klikattiin. Nämä tapahtumat näkyvät nyt kuitenkin sekaisin "Suosituimmat sivut" -listassa eikä niitä näytetä erikseen.

Seuranta toimii kaikilta kieliversioilta, koska `PageViewTracker` on globaalissa `App.tsx`:ssä ja kuuntelee kaikkia klikkauksia `document`-tasolla.

### Muutokset

**1. Edge function `get-page-view-stats` — erota tapahtumat sivukatseluista**

- Aggregoinnissa erotetaan `/event/`-alkuiset polut omaan `conversionEvents`-objektiin
- `topPages` sisältää vain oikeat sivukatselut (ei `/event/`-alkuisia)
- Uusi palautuskenttä `conversionEvents`: array jossa tyyppi, määrä ja suosituimmat lähtösivut

**2. Admin-näkymä `PageViewsAdmin.tsx` — uusi "Konversiot"-osio**

Lisätään suosituimpien sivujen yläpuolelle selkeä konversio-osio:

- Yhteenvetokorttien riville lisätään "Varaukset"-kortti (kaikki booking-tapahtumat yhteensä)
- Oma taulukko/lista joka näyttää:
  - Hakuwidget-haut (search-widget)
  - Sticky bar -klikkaukset
  - PageCTA-klikkaukset  
  - Muut varauslinkit
  - Kunkin tapahtuman kokonaismäärä ja top 5 lähtösivua
- Selkeät suomenkieliset otsikot: "Hakuwidgetin haut", "Varaa tästä (alareunan palkki)", "Sivun CTA-painike", "Muut varauslinkit"

**3. Top pages -lista — suodata pois tapahtumat**

Suosituimmat sivut -taulukossa ei näytetä `/event/`-alkuisia rivejä lainkaan.

### Tiedostot

| Tiedosto | Muutos |
|---|---|
| `supabase/functions/get-page-view-stats/index.ts` | Erota `/event/`-polut omaan aggregaattiin, palauta `conversionEvents` |
| `src/components/admin/PageViewsAdmin.tsx` | Lisää Konversiot-osio korteilla ja taulukolla |

