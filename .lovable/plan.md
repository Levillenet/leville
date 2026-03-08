

## SEO-sivujen ryhmittely komponenttitasolla

### Nykytila
- 50+ sivua listataan yksitellen, jokainen vaatii oman julkaisukytkimen
- MonthlyGuideLevi-sivuja on 24 kpl (12 kk x 2 kieltä), kaikilla sort_order=0
- Muut komponentit (esim. SnowshoeingLevi) ovat FI+EN-pareja

### Ratkaisu
Ryhmitellään sivut `component_name`-kentän mukaan. Yksi kytkin per komponentti julkaisee/piilottaa KAIKKI sen kieliversiot ja reitit kerralla.

```text
MonthlyGuideLevi          [FI×12] [EN×12]    ⟨ Switch ⟩
SnowshoeingLevi           [FI] [EN]          ⟨ Switch ⟩
ApresSkiLevi              [FI] [EN]          ⟨ Switch ⟩
ChristmasDinnerLeviFI     [FI]               ⟨ Switch ⟩
```

### Muutokset

**1. Edge function `manage-seo-pages/index.ts`**
- Uusi action `toggle_publish_group`: ottaa `component_name`, päivittää kaikkien vastaavien sivujen `is_published` kerralla

**2. Admin UI `SeoPageAdmin.tsx`**
- Ryhmittele sivut `component_name` mukaan
- Näytä yksi rivi per ryhmä: komponentin nimi, kielibadget (FI ×12, EN ×12 tai FI, EN), sivumäärä, yksi julkaisukytkin
- Ryhmä on laajennettavissa (Collapsible/Accordion) yksittäisten polkujen näkemiseksi
- Yksittäisten sivujen poisto/lisäys toimii edelleen rivi kerrallaan laajennettuna
- Julkaisukytkin vaikuttaa aina koko ryhmään

### Toteutus
- Edge function: 1 uusi action (~10 riviä SQL)
- Admin UI: refaktoroi taulukko ryhmiteltyyn näkymään, käytä olemassa olevaa Collapsible-komponenttia

