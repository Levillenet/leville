

## Suunnitelma: Korjaa kalenterin tausta poistamalla overflow-säännöt

### Ongelma
Äsken lisätty `overflow: visible !important` -sääntö rikkoi kalenterin sisäisen taustan - taustan sisältö näkyy läpi kalenteririvien välillä.

### Juurisyy
Moder-kalenterin sisäinen CSS käyttää normaaleja overflow-sääntöjä taustan hallintaan. Kun pakotimme `overflow: visible` kaikkiin lapsi-elementteihin, kalenterin oma taustaväri ei enää kata koko aluetta.

### Ratkaisu
Poistetaan ongelmalliset overflow-säännöt ja pidetään vain yksinkertaiset z-index-korjaukset.

---

### Muutokset

#### 1. Tiedosto: `src/index.css`

**Poistetaan** nämä säännöt (rivit 421-426):
```css
/* POISTA - rikkoo kalenterin sisäisen layoutin */
#moder-embed,
#moder-embed > *,
#moder-embed > * > * {
  overflow: visible !important;
}
```

**Poistetaan** myös nämä liian aggressiiviset säännöt (rivit 410-419 ja 428-445):
- Kaikki `[class*="dropdown"]`, `[class*="calendar"]` jne. sisäiset z-index-pakotukset
- "Nuclear option" -säännöt

**Pidetään** yksinkertaistettu versio:
```css
/* Fix Moder booking widget z-index - SIMPLE VERSION */
#moder-embed {
  position: relative;
  z-index: 9999;
}

/* The calendar dropdown itself needs high z-index but NOT overflow changes */
body > [class*="moder"],
body > [id*="moder"]:not(#moder-embed),
[data-moder] {
  z-index: 99999 !important;
}

/* Moder portal layers - applied dynamically via JS MutationObserver (backup) */
.moder-portal-layer {
  z-index: 2147483647 !important;
}
```

#### 2. Tiedosto: `src/components/Hero.tsx`

**Muutetaan** `#moder-embed` div yksinkertaisemmaksi (noin rivi 221-225):

Nykyinen:
```tsx
<div 
  id="moder-embed"
  className="relative mx-auto max-w-3xl rounded-2xl shadow-2xl"
  style={{
    overflow: 'visible',
    zIndex: 9999,
    position: 'relative',
    isolation: 'isolate'
  }}
/>
```

Uusi:
```tsx
<div 
  id="moder-embed"
  className="relative mx-auto max-w-3xl rounded-2xl shadow-2xl"
/>
```

Poistetaan inline style kokonaan - CSS hoitaa z-indexin.

---

### Yhteenveto

| Tiedosto | Muutos |
|----------|--------|
| `src/index.css` | Poistetaan overflow-pakotukset ja ylimääräiset z-index-säännöt, jätetään vain yksinkertainen z-index-korjaus |
| `src/components/Hero.tsx` | Poistetaan inline styles `#moder-embed` divistä |

### Periaate
**Vain z-index, ei overflow** - kalenterin sisäinen tyylitys hoitaa itse taustat ja layoutin, meidän tarvitsee vain varmistaa että se näkyy muiden elementtien päällä.

