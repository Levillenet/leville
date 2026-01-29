
## Suunnitelma: Lämmitysjärjestelmät-opassivu (FI/EN)

Luodaan uusi pitkä SEO-informaatiosivu "Hyvä tietää majoittumisesta" -kategoriaan Travel Hub:n alle. Sivu kattaa lämmitysjärjestelmät Levin mökeissä ja huoneistoissa.

---

### Uuden sivun tiedot

| Kieli | URL | Otsikko |
|-------|-----|---------|
| FI | `/opas/lammitysjarjestelmat-levi` | Mökkien ja huoneistojen lämmitysjärjestelmät Levillä |
| EN | `/guide/heating-systems-in-levi` | Heating systems in cabins and apartments in Levi |

---

### Toteutettavat muutokset

#### 1. Uusi sivukomponentti
**Tiedosto:** `src/pages/guide/HeatingSystemsInLevi.tsx`

Sivu sisältää:
- **Meta/SEO**: Helmet-tagit, hreflang, canonical URL
- **BreadcrumbList schema**: Structured data hakukoneille
- **Sisältöosiot** (H2-tasolla):
  1. Intro (arktinen ympäristö, lämmitysjärjestelmien erot)
  2. Suora sähkölämmitys (sähköpatterit)
  3. Sähköinen lattialämmitys
  4. Vesikiertoinen lattialämmitys (hitain reagointi)
  5. Vesikiertoiset patterit
  6. Takat ja tulisijat (koriste- vs. varaava takka)
  7. Ilmalämpöpumppu
  8. Termostaattien käyttö (pienet säädöt)
  9. Milloin ottaa yhteyttä omistajaan

Visuaalinen tyyli:
- Käytetään samaa `Card`-pohjaista layoutia kuin GettingAroundLevi-sivulla
- Osioikoniksi Lucide-ikonit (Thermometer, Flame, AirVent, Gauge, Phone jne.)
- Kuvapaikat merkitään placeholder-teksteillä myöhempää lisäystä varten

---

#### 2. Reitit App.tsx:ään

```typescript
// Travel HUB Child Pages - Finnish
<Route path="/opas/lammitysjarjestelmat-levi" element={<HeatingSystemsInLevi />} />

// Travel HUB Child Pages - English
<Route path="/guide/heating-systems-in-levi" element={<HeatingSystemsInLevi lang="en" />} />
```

---

#### 3. Travel Hub -päivitys

Lisätään uusi kortti TravelHub.tsx:n guide-listaukseen:

**Suomi:**
```typescript
{ 
  id: "heating", 
  title: "Lämmitys mökeissä ja huoneistoissa", 
  description: "Näin toimivat lämmitysjärjestelmät Levillä. Sähköpatterit, lattialämmitys, takat ja ilmalämpöpumput.", 
  href: "/opas/lammitysjarjestelmat-levi", 
  iconKey: "thermometer" 
}
```

**Englanti:**
```typescript
{ 
  id: "heating", 
  title: "Heating Systems in Cabins", 
  description: "How heating systems work in Levi. Electric radiators, floor heating, fireplaces and heat pumps.", 
  href: "/guide/heating-systems-in-levi", 
  iconKey: "thermometer" 
}
```

---

### Sivun sisältörakenne

```
[Back to Travel Guide]

H1: Mökkien ja huoneistojen lämmitysjärjestelmät Levillä

Intro: Lyhyt selitys arktisista olosuhteista ja eri lämmitysjärjestelmistä

┌─────────────────────────────────────────────┐
│ 🌡️ Suora sähkölämmitys                      │
├─────────────────────────────────────────────┤
│ • Yleisin järjestelmä Levillä               │
│ • Seinään kiinnitetyt patterit termostaat.  │
│ • Reagoi nopeasti säätöihin                 │
│ • Rajoitus: vanhemmissa mökeissä eristys... │
│ [Kuva: sähköpatteri termostaatilla]         │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🔥 Sähköinen lattialämmitys                 │
├─────────────────────────────────────────────┤
│ • Lämmityskaapelit lattian alla             │
│ • Mukava ja luotettava                      │
│ • Hitaampi kuin patterit                    │
│ [Kuva: seinätermostaatti]                   │
└─────────────────────────────────────────────┘

... (muut osiot samalla mallilla)

┌─────────────────────────────────────────────┐
│ 📞 Milloin ottaa yhteyttä                   │
├─────────────────────────────────────────────┤
│ • Normaali sisälämpötila 20–22°C            │
│ • Kovalla pakkasella korkeampi ei aina mah. │
│ • Jos alle 15–17°C → ota yhteyttä           │
└─────────────────────────────────────────────┘

[CTA: Varaa majoitus Leviltä]
```

---

### SEO-optimointi

**Meta description (FI):**
"Lämmitysjärjestelmät Levin mökeissä ja huoneistoissa: sähköpatterit, lattialämmitys, vesikiertoinen lämmitys, ilmalämpöpumput ja takat. Käytännön vinkit lämpimään talvilomaan."

**Meta description (EN):**
"Heating systems in Levi cabins and apartments: electric radiators, floor heating, water-based heating, heat pumps and fireplaces. Practical tips for a warm winter holiday."

**Target keywords:**
- FI: Levi mökki lämmitys, huoneisto lämmitys Levi, talviloma Lappi lämpötila
- EN: Levi cabin heating, apartment heating Levi, how heating works in Finnish cabins

---

### Muokattavat/luotavat tiedostot

| Tiedosto | Muutos |
|----------|--------|
| `src/pages/guide/HeatingSystemsInLevi.tsx` | **UUSI** - Lämmitysopas-sivu (FI/EN) |
| `src/App.tsx` | Lisää reitit uudelle sivulle |
| `src/pages/guide/TravelHub.tsx` | Lisää uusi kortti guide-listaukseen + Thermometer-ikoni |

---

### Sivun sävy

- Rauhallinen ja informatiivinen
- Käytännönläheinen, ei tekninen manuaali
- Ei turvallisuusvaroituksia tai teknisiä ohjeita
- Vierasystävällinen lähestymistapa

