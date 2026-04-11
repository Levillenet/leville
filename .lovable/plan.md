

# Tikettiraportin päivämäärävalinnan korjaus

## Ongelma
`<Input type="date">` ei toimi Radix Dialog -komponentin sisällä (pointer events -ongelma). Lisäksi päivämääräväli on pakollinen, vaikka käyttäjä haluaisi kaikki tiketit.

## Ratkaisu

### 1. Vaihdetaan `<Input type="date">` → Shadcn Calendar/Popover -datepickeriin
- Korvataan molemmat päivämääräkentät (Alkaen, Saakka) Popover + Calendar -komponenteilla
- Lisätään `pointer-events-auto` Calendariin (Radix Dialog -yhteensopivuus)
- Muutetaan `reportFilters.dateFrom` ja `dateTo` tyypiksi `string` (säilytetään sama formaatti) tai `Date | null`

### 2. Tehdään päivämääristä valinnaisia
- Poistetaan `*`-merkintä pakollisesta kentästä
- Lisätään "Tyhjennä" -nappi kumpaankin päivämääräkenttään
- Muutetaan `generateReportPdf`: jos dateFrom/dateTo puuttuu, ei suodateta päivämäärän mukaan
- PDF:n otsikossa näytetään "Kaikki ajat" jos päivämääriä ei ole valittu

### Muutettavat tiedostot

| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Rivit 3097–3099: Input→Popover+Calendar datepicker; rivit 1055–1063: päivämääräsuodatus valinnainen; rivi 1087/1293: PDF-otsikon fallback |

