

# Korjaussuunnitelma: 10 korjausta opas-sivuille

## Yhteenveto korjauksista

### 1 & 3. Laskettelukausi alkaa lokakuussa (ei marraskuussa)
Levi avaa rinteet ja ensilumen ladun tyypillisesti lokakuun alkupäivinä. Päivitetään:
- **SkiingInLevi.tsx** rivi 38 (FI intro): "marraskuusta" → "lokakuusta toukokuuhun"
- **SkiingInLevi.tsx** rivi 126 (EN intro): "November to May" → "October to May"
- Vertailusivut **LeviVsYllasVsRuka.tsx**, **LeviVsYllasVsRukaEN.tsx**, **LeviVsRovaniemiComparison.tsx** — nämä sanovat jo "Lokakuu/October" → pidetään ennallaan

### 4. Revontulikausi syyskuusta maaliskuuhun — vahvistettu oikeaksi, ei muutosta

### 5. Ski Bus on MAKSULLINEN
- **GettingAroundLevi.tsx** rivi 48 (FI): "Ilmainen Ski Bus" → "Ski Bus kiertää Levin keskustan ja rinteet (maksullinen, hissilipun yhteydessä tai erikseen)"
- **GettingAroundLevi.tsx** rivi 137 (EN): "Free Ski Bus" → "Ski Bus runs around Levi center and slopes (paid, available with lift pass or separately)"

### 6. Tarkenna revontuliteksti (FI)
- **BestTimeToVisitLevi.tsx** rivi 165: lisätään tarkentava tieto parhaasta havaintoajasta

### 7. Korjaa kirjoitusvirhe "säa"
- **BestTimeToVisitLevi.tsx** rivi 175: "säa voi olla" → "sää voi olla"

### 8. Korjaa rikkinäinen lause "valosaastekirkkaat"
- **BestTimeToVisitLevi.tsx** rivi 165: "Levin vähäinen valosaastekirkkaat yötaivas tekevät siitä" → "Levin vähäinen valosaaste ja kirkas yötaivas tekevät siitä"

### 9. Korjaa FAQ laskettelukausi (FI)
- **BestTimeToVisitLevi.tsx** rivi 188: "marraskuun alussa" → "lokakuun alussa (tykkilumella)"

### 10. Korjaa FAQ laskettelukausi (EN)
- **BestTimeToVisitLevi.tsx** rivi 304: "early November" → "early October (with machine-made snow)"

## Muutettavat tiedostot (3 kpl)

| Tiedosto | Muutokset |
|---|---|
| `BestTimeToVisitLevi.tsx` | Rivit 165, 175, 188, 304 — typo, rikkinäinen lause, FAQ-vastaukset |
| `SkiingInLevi.tsx` | Rivit 38, 126 — kauden alku lokakuu |
| `GettingAroundLevi.tsx` | Rivit 48, 137 — ski bus maksullinen |

