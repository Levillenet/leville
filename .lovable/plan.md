

## Suunnitelma: Korjaa Moder-widgetin päivämäärävalinta

### Ongelma

Moder-varauswidgetin kalenteri-popup ei reagoi klikkauksiin. Widget latautuu oikein (API palauttaa 200), mutta päivämäärää ei voi valita.

### Juurisyy

1. **Widgetin sijainti syvällä DOM-hierarkiassa**: `#moder-embed` on sisällä useissa kerroksissa, joiden CSS voi häiritä kalenteria
2. **Kalenteriportaali**: Moder-widget todennäköisesti renderöi kalenterin `<body>`-elementtiin portaalina, jolloin Hero-osion elementit voivat peittää sen
3. **Overflow ja stacking context**: Vaikka widgetillä on `z-index: 9999`, se on sisällä konttainerissa jolla on `z-10`, mikä rajaa sen kerrostumiskontekstin

---

### Ratkaisu

#### 1. Siirrä `#moder-embed` pois Hero-osion sisältä

Paras ratkaisu on siirtää Moder-widget **Hero-section ulkopuolelle** omana kiinteänä elementtinään tai erilliseen kontekstiinsa, jotta sen kalenteriportaalit eivät ole muiden elementtien takana.

**Tiedosto:** `src/components/Hero.tsx`

Muutetaan widgetin konttainerien z-index ja varmistetaan, ettei mikään elementti ole sen päällä:

```typescript
// Rivi 169: Nosta pääkonttainerin z-index huomattavasti
<div className="container mx-auto px-4 relative z-[100]" style={{ overflow: 'visible' }}>

// Rivi 216-230: Varmista widgetin isolation
<div 
  className="animate-slide-up" 
  style={{ animationDelay: '0.4s', overflow: 'visible' }}
>
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
</div>
```

#### 2. Poista `pointer-events-none` mahdollisilta estäviltä elementeiltä

Scroll-indikaattori (rivi 235) voi olla ongelmallinen jos se on päällekkäin kalenterin kanssa:

```typescript
// Rivi 235: Lisää pointer-events-none scroll-indikaattoriin
<div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
```

#### 3. Päivitä CSS varmistamaan kalenteriportaalit toimivat

**Tiedosto:** `src/index.css`

Lisätään aggressiivisemmat säännöt body-tason elementeille:

```css
/* Moder calendar portals - force highest z-index */
body > div:not(#root) {
  /* Oletus kaikille portaaleille */
}

/* Explicitly target Moder elements */
div[class*="calendar"],
div[class*="datepicker"],
div[class*="dropdown"][style*="position: absolute"],
div[class*="dropdown"][style*="position: fixed"] {
  z-index: 999999 !important;
  pointer-events: auto !important;
}

/* Ensure #moder-embed container allows overflow */
#moder-embed {
  position: relative;
  z-index: 9999 !important;
  overflow: visible !important;
  isolation: isolate;
}

#moder-embed *,
#moder-embed *::before,
#moder-embed *::after {
  pointer-events: auto !important;
}
```

#### 4. Section-tason overflow-korjaus

**Tiedosto:** `src/components/Hero.tsx`

Section-elementin `overflow: visible` on jo paikallaan, mutta varmistetaan ettei mikään lapsi-elementti estä kalenteria:

```typescript
// Rivi 91-94: Varmista section sallii overflown
<section
  className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-20 pb-24 sm:pb-32"
  style={{ overflow: "visible", isolation: "isolate" }}
>
```

---

### Yhteenveto muutoksista

| Tiedosto | Muutos |
|----------|--------|
| `src/components/Hero.tsx` | Nosta sisältökonttainerin z-index (`z-10` → `z-[100]`), lisää `isolation: isolate` widgetiin ja sectioniin, lisää `pointer-events-none` scroll-indikaattoriin |
| `src/index.css` | Lisää aggressiivisemmat portaali-CSS-säännöt kalentereille ja dropdowneille |

---

### Vaihtoehtoinen ratkaisu (jos yllä oleva ei toimi)

Jos kalenteri ei vieläkään toimi, widgetin sijoittaminen **body-tasolle** (esim. fixed-positioned komponenttina hero-sectionin ulkopuolelle) on varmempi ratkaisu:

```typescript
// Index.tsx - widget kokonaan erillään Hero-komponentista
<Hero lang={lang} />
<div 
  id="moder-embed" 
  className="fixed bottom-0 left-0 right-0 z-[99999] bg-card border-t"
/>
```

