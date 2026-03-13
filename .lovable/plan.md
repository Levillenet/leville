

## Aikajaksovalitsin analytiikkanäkymään

### Muutokset

**1. Edge function (`get-page-view-stats/index.ts`)**
- Lisätään `period`-parametri: `"today"`, `"week"`, `"month"`, `"30days"` (oletus)
- Lasketaan `since`-päivämäärä parametrin mukaan (tänään, 7 pv sitten, kuukauden alku, 30 pv sitten)
- Kaikki aggregoinnit (topPages, byReferrer, byDevice, byLanguage, conversionEvents) suodattuvat valitun jakson mukaan
- CSV-vienti käyttää samaa period-parametria

**2. Frontend (`PageViewsAdmin.tsx`)**
- Lisätään `period`-tila: `"today" | "week" | "month" | "30days"`
- Yläosaan 4 painikkeen rivi: "Tänään", "Tämä viikko", "Tämä kuukausi", "30 päivää"
- Otsikko päivittyy valinnan mukaan (esim. "Sivukatselut (tänään)")
- `fetchStats` lähettää `period`-arvon edge functionille
- Period-muutos triggeröi uuden haun
- Kaikki kortit, top 20 -taulukko, konversiot, pie/bar-kaaviot päivittyvät valitun jakson mukaan
- Päivittäiset katselut -viivakaavio näyttää aina päivätason datan riippumatta valinnasta

### Tiedostot

| Tiedosto | Muutos |
|---|---|
| `supabase/functions/get-page-view-stats/index.ts` | Lisää `period`-parametrin käsittely |
| `src/components/admin/PageViewsAdmin.tsx` | Lisää aikajaksovalitsin UI + period-parametrin lähetys |

