# Ajankohtaista-palstan päivämäärien korjaus

## Ongelma
`src/translations/fi.ts`:n uutislistassa on vanhentuneita päivämääriä:
- Ruska & talvi 2026 -artikkeli: `27.8.2026` (pitäisi olla 31.8.2026)
- Kolme vanhinta uutista päivätty `29.12.2024`, vaikka niiden sisältö ja merkinnät ("Kevät 2025", "Joulu 2026", "winter10 kevätkausi 2026") viittaavat myöhempään aikaan. Vanhat 2024-päiväykset näyttävät huonolta sekä kävijöille että Googlelle.

## Korjaukset (vain `src/translations/fi.ts`)

1. **Ruska-artikkeli**: päivämäärä `27.8.2026` → `31.8.2026`.
2. **"Loppukeväälle on vielä tilaa Levillä"** (badge Kevät 2025, mainitsee kevätkauden 2026): päivämäärä → `5.1.2026`, badge → "🎿 Kevät 2026".
3. **"Joulukuu 2026 on nyt avattu myyntiin"**: päivämäärä → `2.12.2025` (badge "Joulu 2026" säilyy, koska kyse on joulun 2026 myynnin avaamisesta).
4. **"Varaa suoraan meiltä"** (ikivihreä vinkki, ei ajansidonnaista sisältöä): päivämäärä → `15.11.2025`.

Muita muutoksia ei tehdä — tekstit, layout ja muut kielet pysyvät ennallaan (uutiset ovat vain suomeksi).

## Varmistus
- `bunx tsgo --noEmit` läpi.
- Tarkistetaan preview: `/ajankohtaista` näyttää uudet päivämäärät ja järjestys pysyy.
