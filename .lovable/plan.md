

## Suunnitelma: Moder-widgetin kalenteri-dropdown z-index korjaus

### Ongelma
Moder-varauswidgetin kalenteri/datepicker-dropdown näkyy muiden sivuelementtien takana eikä sitä voi klikata. Nykyinen ratkaisu (MutationObserver + `.moder-portal-layer`) ei tunnista kaikkia Moder-elementtejä riittävän hyvin.

### Juurisyy
1. **Moder-elementit voivat renderöityä `#moder-embed`:n sisälle** eivätkä pelkästään body-tasolle portaaleina
2. **Nykyinen z-index (100)** on liian matala suhteessa muihin sivuelementteihin
3. **Overflow-säännöt** eivät kata kaikkia sisäkkäisiä elementtejä

### Ratkaisu

Lisätään kattavat CSS-säännöt `src/index.css` -tiedostoon, jotka:
1. Nostavat `#moder-embed` containerin z-indexin arvoon 9999
2. Pakottavat kaikki Moder-dropdownit, kalenterit ja popupit näkymään kaiken päällä (z-index: 99999)
3. Varmistavat, ettei mikään parent-elementti leikkaa dropdowneja
4. Kattavat myös body-tasolle suoraan renderöityvät Moder-elementit

---

### Toteutettavat muutokset

#### Tiedosto: `src/index.css`

Korvataan nykyinen Moder-osio (rivit 398-408) laajemmalla CSS-säännöstöllä:

```css
/* ================================================
   Moder Booking Widget - Complete z-index fix
   ================================================ */

/* 1. Base container - high z-index and overflow visible */
#moder-embed {
  position: relative;
  z-index: 9999;
}

/* 2. Force all Moder dropdowns, calendars, and popups to appear on top */
#moder-embed [class*="dropdown"],
#moder-embed [class*="calendar"],
#moder-embed [class*="picker"],
#moder-embed [class*="popup"],
#moder-embed [class*="modal"],
#moder-embed [class*="menu"],
#moder-embed [class*="popover"],
#moder-embed [role="listbox"],
#moder-embed [role="dialog"] {
  z-index: 99999 !important;
  position: relative !important;
}

/* 3. Ensure no parent clips the dropdown */
#moder-embed,
#moder-embed > *,
#moder-embed > * > * {
  overflow: visible !important;
}

/* 4. Catch any Moder elements that render outside the embed container (body-level portals) */
body > [class*="moder"],
body > [id*="moder"],
[data-moder],
.moder-calendar,
.moder-dropdown,
.moder-datepicker {
  z-index: 99999 !important;
}

/* 5. Nuclear option: ensure any fixed/absolute positioned element from Moder is on top */
[class*="moder"][style*="position: fixed"],
[class*="moder"][style*="position: absolute"],
[id*="moder"] [style*="position: fixed"],
[id*="moder"] [style*="position: absolute"] {
  z-index: 99999 !important;
}

/* 6. Moder portal layers - applied dynamically via JS MutationObserver (backup) */
.moder-portal-layer {
  z-index: 2147483647 !important;
}
```

---

### Hero.tsx tarkistus

Nykyinen `Hero.tsx` on jo kunnossa:
- `<section>` - `overflow: visible` ✅
- Container div (rivi 169) - `overflow: visible` ✅  
- Max-w-4xl div (rivi 170) - `overflow: visible` ✅
- Animate wrapper (rivi 217-220) - ei overflow-rajoitusta ✅

**Ei muutoksia tarvita Hero.tsx:ään.**

---

### Yhteenveto

| Tiedosto | Muutos |
|----------|--------|
| `src/index.css` | Korvataan minimaalinen Moder-CSS laajalla säännöstöllä (6 eri sääntöryhmää) |

### Testaus

1. Avaa etusivu ja klikkaa "Tulopäivä"-kenttää
2. Kalenterin pitäisi avautua kaiken päällä (myös Headerin yläpuolelle)
3. Klikkaa päivämäärää - valinnan pitäisi rekisteröityä
4. Testaa myös "Lähtöpäivä" ja vierasmäärä-valitsin

