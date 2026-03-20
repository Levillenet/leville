

## CLS-korjaus: Eksplisiittiset kuva- ja elementtikoot

### Analyysi (kuvakaappaus)

Kuvakaappauksesta näkyy CLS yhteensä **1.102**, suurimmat syyt:
1. **Logo-kuva ilman eksplisiittisiä mittoja** (0.679 + 0.421 + lisäosumia) — `<img>` ilman `width`/`height`-attribuutteja aiheuttaa shiftiä kun kuva latautuu
2. **Hero-sisältö** (0.080) — container overflow:visible
3. **Verkkofonttien lataus** — fonttien swap aiheuttaa pientä shiftiä

### Korjaukset

**1. `src/components/Header.tsx`** — Lisää logo-kuvaan eksplisiittiset `width` ja `height`
- Nykyinen: `className="h-10 sm:h-16 md:h-20 lg:h-24 w-auto"` ilman width/height attribuutteja
- Lisätään `width={240} height={96}` (logon luonnolliset mitat tai lähellä) → selain varaa tilan ennen latausta
- Tämä korjaa suurimman CLS-osuman (0.679 + 0.421)

**2. `src/components/Footer.tsx`** — Lisää footer-logoon `width` ja `height`
- Nykyinen: `className="h-40 md:h-48 w-auto"` ilman mittoja
- Lisätään `width={240} height={192}`

**3. `src/components/Hero.tsx`** — Hero-kuviin eksplisiittiset mitat
- Hero `<img>`-tageista puuttuu `width`/`height`
- Lisätään `width={1920} height={1080}` hero-kuviin

### Muutettavat tiedostot
- `src/components/Header.tsx` — logo width/height
- `src/components/Footer.tsx` — logo width/height  
- `src/components/Hero.tsx` — hero-kuvien width/height

