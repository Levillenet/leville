

## Analytiikan CSV-viennin laajennus: 90 ja 180 päivää

### Nykytilanne
- Period-valinnat: tänään, viikko, kuukausi, 30 päivää
- Edge function tukee vain näitä neljää
- Query limit on 10 000 riviä (riittää ~30 päivälle)
- Data tallentuu `page_views`-tauluun ilman automaattista poistoa → data säilyy kyllä

### Muutokset

**1. Edge function (`supabase/functions/get-page-view-stats/index.ts`)**
- Lisätään `case "90days"` ja `case "180days"` period-switchiin
- Nostetaan query limit 10 000 → 50 000 pitkille ajanjaksoille (90/180 pv)

**2. Frontend (`src/components/admin/PageViewsAdmin.tsx`)**
- Laajennetaan `Period`-tyyppi: `"90days" | "180days"`
- Lisätään `PERIOD_LABELS`: `"90 päivää"`, `"180 päivää"`
- Lisätään painikkeet period-valitsimeen

### Datan säilyvyys
Data säilyy tietokannassa toistaiseksi ilman aikarajaa. Taulusta ei poisteta rivejä automaattisesti, joten 365 päivän ja pidemmänkin datan käyttö on mahdollista tulevaisuudessa.

