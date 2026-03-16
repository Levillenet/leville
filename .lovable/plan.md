

# Kuukausioppaat linkitettyyn SeasonsHub-sivulle + SEO-sivujen tilan tarkistus

## SEO-sivujen julkaisutila
Kaikki SEO-sivut (310 kpl, 31 ryhmää) ovat jo julkaistuja (`is_published = true`). Yhtään luonnosta ei ole.

## Ongelma: kuukausioppaat ovat orpoja

24 kuukausiopasta (FI + EN, 12 kuukautta) ovat linkitetty **vain** BestTimeToVisitLevi-sivulta ja MonthlyGuideLevi-sivun sisäisestä navigaatiosta. Ne puuttuvat kokonaan SeasonsHub-sivulta ja vuodenaika-sivuilta (Talvi, Kevät, Kesä, Syksy).

## Suunnitelma

### 1. SeasonsHub — lisää "Levi kuukausi kuukaudelta" -osio
**Tiedosto:** `src/pages/guide/SeasonsHub.tsx`

Vuodenaikakorttien jälkeen lisätään uusi osio, jossa on 12 kuukausikorttia (3×4 grid). Jokainen kortti sisältää kuukauden nimen, tyypillisen lämpötilan ja linkin kuukausioppaaseen. FI/EN-versiot.

```text
┌─────────────────────────────────────┐
│  Levin vuodenajat (otsikko)         │
│  [Talvi] [Kevät] [Kesä] [Syksy]    │  ← nykyiset kortit
│                                      │
│  ── Levi kuukausi kuukaudelta ──     │  ← UUSI osio
│  [Tammi] [Helmi] [Maalis] [Huhti]  │
│  [Touko] [Kesä]  [Heinä]  [Elo]    │
│  [Syys]  [Loka]  [Marras] [Joulu]  │
└─────────────────────────────────────┘
```

### 2. Vuodenaika-sivut — lisää kunkin kauden kuukaudet ReadNext-linkkeihin
**Tiedostot:** `WinterInLevi.tsx`, `SpringInLevi.tsx`, `SummerInLevi.tsx`, `AutumnRuskaInLevi.tsx`

Jokaiselle vuodenaika-sivulle lisätään "Lue myös" -osioon linkit kyseisen kauden kuukausiin:
- Talvi: marras, joulu, tammi, helmi, maalis
- Kevät: maalis, huhti
- Kesä: touko, kesä, heinä, elo
- Syksy: syys, loka

## Muutettavat tiedostot
- `src/pages/guide/SeasonsHub.tsx` — uusi kuukausigrid-osio
- `src/pages/guide/WinterInLevi.tsx` — kuukausilinkit ReadNext-osioon
- `src/pages/guide/SpringInLevi.tsx` — kuukausilinkit ReadNext-osioon
- `src/pages/guide/SummerInLevi.tsx` — kuukausilinkit ReadNext-osioon
- `src/pages/guide/AutumnRuskaInLevi.tsx` — kuukausilinkit ReadNext-osioon

## Vaikutus
Kaikki 24 kuukausiopasta saavat vahvan sisäisen linkityksen SeasonsHub-sivulta ja relevanteista vuodenaika-sivuilta, mikä parantaa crawl-prioriteettia merkittävästi.

