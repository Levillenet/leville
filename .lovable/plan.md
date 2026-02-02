

## Suunnitelma: Päivitä navigaatio ja siirrä Revontulet Levi-hubin alle

### Muutokset

| Kohde | Muutos |
|-------|--------|
| **Header** | "Levi" → "Levi-opas" (kaikilla kielillä vastaava) + poistetaan Revontulet-linkki |
| **Levi.tsx** | Lisätään Revontulet-linkki "Hyödyllistä tietoa" -osioon säätietojen viereen |

---

### 1. Header-navigaation muutokset

**Tiedosto:** `src/components/Header.tsx`

Muutetaan navigation links kaikilla kielillä:

| Kieli | Vanha | Uusi |
|-------|-------|------|
| FI | Levi, Revontulet | Levi-opas |
| EN | Levi, Northern Lights | Levi Guide |
| SV | Levi, Norrsken | Levi-guide |
| DE | Levi, Nordlichter | Levi-Reiseführer |
| ES | Levi, Auroras | Guía de Levi |
| FR | Levi, Aurores Boréales | Guide de Levi |

```typescript
// ENNEN (FI esimerkki):
return [
  { name: "Majoitukset", href: routeConfig.accommodations.fi },
  { name: "Äkkilähdöt", href: routeConfig.lastMinute.fi, highlight: true },
  { name: "Levi", href: routeConfig.levi.fi },
  { name: "Revontulet", href: routeConfig.northernLights.fi },
  { name: "Yhteystiedot", href: routeConfig.contact.fi },
];

// JÄLKEEN:
return [
  { name: "Majoitukset", href: routeConfig.accommodations.fi },
  { name: "Äkkilähdöt", href: routeConfig.lastMinute.fi, highlight: true },
  { name: "Levi-opas", href: routeConfig.levi.fi },
  { name: "Yhteystiedot", href: routeConfig.contact.fi },
];
```

---

### 2. Levi-hubin "Hyödyllistä tietoa" -osion laajentaminen

**Tiedosto:** `src/pages/Levi.tsx`

Muutetaan Quick Links -osio näyttämään kaksi linkkiä rinnakkain (grid):
1. **Säätietoa Leviltä** (nykyinen)
2. **Revontulet** (uusi)

#### A) Lisää monikielinen sisältö revontulille

```typescript
// Lisätään content-objektiin:
northernLightsTitle: string;
northernLightsDesc: string;

// FI:
northernLightsTitle: "Revontulet Levillä",
northernLightsDesc: "Opas revontulien katseluun ja ennusteet"

// EN:
northernLightsTitle: "Northern Lights in Levi",
northernLightsDesc: "Guide to aurora viewing and forecasts"

// jne. kaikille kielille
```

#### B) Päivitä Quick Links -layout

```
ENNEN:
┌──────────────────────────────────────────────┐
│  Hyödyllistä tietoa                          │
│  ┌──────────────────────────────────┐        │
│  │ ☀️ Säätietoa Leviltä              │        │
│  │    Lumensyvyys, lämpötilat...     │        │
│  └──────────────────────────────────┘        │
└──────────────────────────────────────────────┘

JÄLKEEN:
┌──────────────────────────────────────────────┐
│  Hyödyllistä tietoa                          │
│  ┌─────────────────┐  ┌─────────────────┐    │
│  │ ☀️ Säätietoa    │  │ ✨ Revontulet   │    │
│  │   Leviltä       │  │   Levillä       │    │
│  └─────────────────┘  └─────────────────┘    │
└──────────────────────────────────────────────┘
```

---

### Tekninen toteutus (Levi.tsx)

Muutetaan Quick Links -osio gridiksi:

```typescript
{/* Quick Links Section */}
<section className="mb-12 sm:mb-16">
  <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 text-center">
    {c.quickLinksTitle}
  </h2>
  <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
    {/* Weather Link */}
    <Link to={weatherLinks[lang]} className="...">
      <Card>...Säätietoa...</Card>
    </Link>
    
    {/* Northern Lights Link - UUSI */}
    <Link to={routeConfig.northernLights[lang]} className="...">
      <Card>
        <Sparkles className="w-6 h-6 text-emerald-400" />
        <h3>{c.northernLightsTitle}</h3>
        <p>{c.northernLightsDesc}</p>
      </Card>
    </Link>
  </div>
</section>
```

---

### Yhteenveto muutoksista

| Tiedosto | Muutos |
|----------|--------|
| `src/components/Header.tsx` | "Levi" → "Levi-opas" ja poista Revontulet headerista |
| `src/pages/Levi.tsx` | Lisää revontulet-linkki Quick Links -osioon säätietojen viereen |

### SEO-vaikutukset

- Revontulet-sivu säilyttää kaikki olemassa olevat reitit ja sisällön
- Header-linkin poistaminen ei vaikuta sivun löydettävyyteen (linkitetään nyt hubista)
- "Levi-opas" on SEO-ystävällisempi ja kuvailevampi kuin pelkkä "Levi"

