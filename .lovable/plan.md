

## Suunnitelma: Mobiilin yläpalkin optimointi

### Ongelma
Mobiilissa yläpalkki on ahdas:
- Logo kutistuu liian pieneksi
- Säätiedot (lämpötila + kylmin 24h + lumensyvyys) vievät liikaa tilaa
- Kaikki elementit eivät mahdu siististi samalle riville

### Ratkaisu

#### 1. `src/components/WeatherWidget.tsx` – Mobiiliversio yksinkertaisemmaksi

Lisätään `compact` prop, joka piilottaa "kylmin 24h" -tiedon mobiilissa:

| Näyttö | Näytetään |
|--------|-----------|
| Desktop | Lämpötila + kylmin 24h + lumensyvyys |
| Mobiili | Lämpötila + lumensyvyys (ei "kylmin 24h") |

```tsx
interface WeatherWidgetProps {
  compact?: boolean; // true mobiilissa
}

const WeatherWidget = ({ compact = false }: WeatherWidgetProps) => {
  // ...
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 text-foreground">
      {getWeatherIcon(weather.weatherCode)}
      <span className="font-semibold text-sm sm:text-base">{weather.temperature}°C</span>
      
      {/* Kylmin 24h - piilossa mobiilissa */}
      {!compact && weather.minTemp24h !== null && (
        <>
          <span className="text-muted-foreground">|</span>
          <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-base text-cyan-400">{weather.minTemp24h}°C</span>
          <span className="text-xs opacity-70">{coldestLabel}</span>
        </>
      )}
      
      {/* Lumensyvyys - näkyy molemmissa, mutta pienempi mobiilissa */}
      {weather.snowDepth !== null && weather.snowDepth > 0 && (
        <>
          <span className="text-muted-foreground">|</span>
          <Snowflake className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300" />
          <span className="font-semibold text-sm sm:text-base">{weather.snowDepth} cm</span>
          {!compact && <span className="text-xs opacity-70">{snowLabel}</span>}
        </>
      )}
    </div>
  );
};
```

---

#### 2. `src/components/Header.tsx` – Mobiili-layout parannus

| Muutos | Kuvaus |
|--------|--------|
| Logo | Käytetään `min-w-0 flex-shrink` + `max-h-12` mobiilissa (skaalautuu paremmin) |
| WeatherWidget | Välitetään `compact={true}` mobiiliversiossa |
| Flex-layout | Käytetään `flex-shrink-0` hamburger-napille, jotta se ei kutistu |

```tsx
{/* Logo and Mobile Weather */}
<div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
  <Link to={homeHref} className="flex items-center flex-shrink-0">
    <img 
      src={levilleLogo} 
      alt="Leville.net" 
      className="h-10 sm:h-16 md:h-20 lg:h-24 w-auto"
    />
  </Link>
  {/* Mobile Weather Widget - compact */}
  <div className="md:hidden min-w-0">
    <WeatherWidget compact />
  </div>
</div>

{/* Mobile Menu Button - ei kutistu */}
<button className="md:hidden p-2 text-foreground flex-shrink-0">
  ...
</button>
```

---

### Visuaalinen muutos

**Ennen (mobiili):**
```
[pieni logo] [-10°C | -22°C kylmin 24h | 68cm lunta] [☰]
```

**Jälkeen (mobiili):**
```
[logo h-10] [-10°C | 68cm] [☰]
```

**Desktop pysyy ennallaan:**
```
[logo h-20+] [-10°C | -22°C kylmin 24h | 68cm lunta] [Navigaatio...] [Varaa nyt]
```

---

### Muokattavat tiedostot

| Tiedosto | Muutos |
|----------|--------|
| `src/components/WeatherWidget.tsx` | Lisää `compact` prop, piilota "kylmin 24h" kun compact=true |
| `src/components/Header.tsx` | Välitä `compact` mobiilissa, paranna flex-layout ja logon koko |

---

### Tulos

1. Mobiilissa näkyy vain oleellisimmat säätiedot (lämpötila + lumensyvyys)
2. Logo pysyy näkyvänä ja sopivan kokoisena
3. Hamburger-menu ei putoa seuraavalle riville
4. Desktop-näkymä säilyy entisellään täydellä säädatalla

