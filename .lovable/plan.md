

## Suunnitelma: Lisää Moder-varauswidget etusivulle StickyBookingBarin tilalle

### Yleiskatsaus

Korvataan nykyinen "Varaa heti tästä" -banneri (StickyBookingBar) interaktiivisella Moder-varauswidgetillä, joka näyttää saatavuuden ja avaa varausjärjestelmän uuteen ikkunaan.

---

### Muutokset

#### 1. Luo uusi ModerBookingWidget-komponentti

**Tiedosto:** `src/components/ModerBookingWidget.tsx` (UUSI)

React-komponentti, joka:
- Lataa Moder-embed scriptin dynaamisesti useEffectin avulla
- Asettaa `ModerSettings.property = 'levillenet'`
- Varmistaa että widget on kaikkien muiden elementtien päällä (z-index: 9999)
- Käsittelee kieliparametrin välittämisen widgetille

```typescript
import { useEffect, useRef } from "react";
import { Language } from "@/translations";

interface ModerBookingWidgetProps {
  lang?: Language;
}

const ModerBookingWidget = ({ lang = "fi" }: ModerBookingWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Aseta globaalit asetukset ennen scriptin latausta
    (window as any).ModerSettings = {
      property: 'levillenet',
      lang: lang === 'fi' ? undefined : (lang === 'sv' ? 'sv' : 'en')
    };

    // Lataa scripti vain kerran
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js';
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    }

    return () => {
      // Cleanup jos tarpeen
    };
  }, [lang]);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
      style={{ 
        isolation: 'isolate',
        pointerEvents: 'auto'
      }}
    >
      {/* Moder widget latautuu tähän */}
      <div 
        id="moder-embed" 
        ref={containerRef}
        className="relative"
        style={{
          position: 'relative',
          zIndex: 9999
        }}
      />
    </div>
  );
};

export default ModerBookingWidget;
```

---

#### 2. Päivitä Index.tsx käyttämään uutta widgetiä

**Tiedosto:** `src/pages/Index.tsx`

```typescript
// Vaihda import
import ModerBookingWidget from "@/components/ModerBookingWidget";

// Korvaa StickyBookingBar
<ModerBookingWidget lang={lang} />
```

---

#### 3. CSS-tyylit widgetin toimivuuden varmistamiseksi

**Tiedosto:** `src/index.css` (lisäykset)

```css
/* Moder Booking Widget - varmista että se on kaikkien elementtien päällä */
#moder-embed {
  position: relative;
  z-index: 9999 !important;
}

#moder-embed * {
  pointer-events: auto !important;
}

/* Estä muut elementit peittämästä widgetiä */
#moder-embed iframe,
#moder-embed [class*="moder"] {
  position: relative;
  z-index: 9999 !important;
}
```

---

#### 4. Päivitä WhatsApp-chatin sijainti

Koska varauswidget vie enemmän tilaa kuin vanha banneri, WhatsApp-nappi pitää siirtää ylemmäs.

**Tiedosto:** `src/components/WhatsAppChat.tsx`

```typescript
// Muuta rivi 89
<div className="fixed bottom-24 md:bottom-20 right-4 z-[9990]">
```

---

#### 5. Muut sivut - säilytä StickyBookingBar

StickyBookingBar säilytetään muilla sivuilla (36 sivua käyttää sitä). Vain etusivulla (Index.tsx ja en/Index.tsx) käytetään uutta ModerBookingWidget-komponenttia.

---

### Tekninen toteutus

| Komponentti | Z-index | Tarkoitus |
|-------------|---------|-----------|
| **ModerBookingWidget** | 9999 | Varauswidget - kaikkein ylimpänä |
| **WhatsAppChat** | 9990 | Asiakaspalvelu - widgetin yläpuolella |
| **Header** | 50 | Navigaatio |
| **StickyBookingBar** (muut sivut) | 9980 | Varabanneri muilla sivuilla |

---

### Visuaalinen rakenne

```
┌─────────────────────────────────────────────────────────┐
│                      [SIVUN SISÄLTÖ]                    │
│                                                         │
│                                                 ┌─────┐ │
│                                                 │ 💬  │ │ ← WhatsApp (z: 9990)
│                                                 └─────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐  │
│  │         [MODER VARAUSWIDGET]                      │  │ ← z: 9999
│  │   📅 Saapuminen    📅 Lähtö    👥 Vieraat  [Hae]  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

### Yhteenveto muutoksista

| Tiedosto | Toimenpide |
|----------|------------|
| `src/components/ModerBookingWidget.tsx` | **UUSI** - Moder-embed widgetin React-wrapper |
| `src/pages/Index.tsx` | Korvaa StickyBookingBar → ModerBookingWidget |
| `src/pages/en/Index.tsx` | Korvaa StickyBookingBar → ModerBookingWidget |
| `src/index.css` | Lisää CSS z-index ja pointer-events säännöt |
| `src/components/WhatsAppChat.tsx` | Nosta sijainti ylemmäs (bottom-24) |

---

### Huomioita

1. **Ulkoinen scripti**: Moder-embed latautuu ulkoiselta palvelimelta (`moder-embeds-dev.s3.eu-north-1.amazonaws.com`). React-ympäristössä tämä vaatii dynaamisesti lataamista `useEffect`-hookissa.

2. **Uusi ikkuna**: Widget toimii oman logiikkansa mukaan - varauksen yhteydessä se avaa app.moder.fi-sivuston uuteen ikkunaan.

3. **Kielen välitys**: `ModerSettings.lang`-parametri välittää käyttöliittymäkielen widgetille.

4. **StickyBookingBar säilyy**: Muilla sivuilla säilyy nykyinen yksinkertainen banneri, koska widget on tarkoitettu lähinnä etusivulle.

