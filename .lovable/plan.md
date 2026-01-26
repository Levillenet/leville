
## Suunnitelma: "Levi ilman autoa" Long-Tail SEO-sivu

### Nykytila

Sivua **ei ole vielä olemassa**. Luodaan uusi long-tail -sivu Travel HUB:n alle (`/opas/matkaopas-levi`), samalla rakenteella kuin muut Travel HUB:n lapsisivut (GettingAroundLevi, LeviWithChildren, RestaurantsAndServices).

---

### 1. Luotavat tiedostot

| Tiedosto | Kuvaus |
|----------|--------|
| `src/pages/guide/LeviWithoutCar.tsx` | Uusi long-tail sivu (FI + EN) |

---

### 2. Sivun rakenne ja sisältö

#### URL-rakenne
- FI: `/opas/levi-ilman-autoa`
- EN: `/guide/levi-without-a-car`

#### H1 (FI)
**Levi ilman autoa – näin liikut ja lomailet helposti**

#### H1 (EN)
**Levi Without a Car – How to Get Around Easily**

#### Intro (2-3 kappaletta)
Vastaa suoraan kysymykseen "Onko Levi mahdollista ilman omaa autoa?" ja kerro kenelle tämä sopii:
- Lentäen saapuvat
- Junalla Kolariin tulevat
- Perheet
- Pariskunnat

#### Sisältöosiot (H2)

| H2 | Sisältö |
|----|---------|
| Saapuminen Leville ilman autoa | Lento Kittilään + Airport Bus, juna Kolariin + kuljetus, aikataulujen toimivuus sesongissa |
| Liikkuminen Levillä | Ilmaiset skibussit, Levin keskustan kävelyetäisyydet (500m kompakti alue), taksit ja kuljetuspalvelut |
| Missä kannattaa majoittua ilman autoa | Levin keskusta, ski-in/ski-out -kohteet, miksi sijainti ratkaisee |
| Kenelle Levi ilman autoa ei ehkä sovi | Rehellinen osio: syrjäiset mökit, erämaakohteet, aktiviteetit kaukana keskustasta |

#### Yhteenveto + CTA
- "Katso majoitukset Levin keskustassa" -nappi

---

### 3. SEO-asetukset

#### Meta Title (< 60 merkkiä)
**FI:** `Levi ilman autoa – liikkuminen, majoitus ja vinkit | Leville.net`
**EN:** `Levi Without a Car – Getting Around, Accommodation | Leville.net`

#### Meta Description (140-160 merkkiä)
**FI:** `Onko Levi helppo ilman autoa? Katso miten saavut, liikut ja missä majoitut Levin keskustassa ilman omaa autoa.`
**EN:** `Is Levi easy without a car? See how to arrive, get around and where to stay in Levi center without your own car.`

#### OG/Twitter
- Sivukohtaiset title ja description (ei globaaleja arvoja)
- Canonical URL sivukohtainen
- BreadcrumbList JSON-LD schema

---

### 4. Tekninen toteutus

#### Komponenttirakenne
Seuraa olemassa olevien Travel HUB -lapsisivujen mallia (GettingAroundLevi.tsx, LeviWithChildren.tsx):
- Helmet (meta + schema)
- HreflangTags (customUrls FI/EN)
- Header
- SubpageBackground
- Breadcrumbs
- Main content (H1, intro, H2-osiot Card-komponenteilla)
- CTA-osio
- Footer (lang prop)
- WhatsAppChat + StickyBookingBar

#### Ikonit (lucide-react)
- Plane (saapuminen)
- Bus (skibussit)
- MapPin (majoitussijainti)
- AlertTriangle (kenelle ei sovi)

---

### 5. Muutokset olemassa oleviin tiedostoihin

#### `src/App.tsx`
Lisätään reitit:
```typescript
// Travel HUB Child Pages - Finnish
<Route path="/opas/levi-ilman-autoa" element={<LeviWithoutCar />} />

// Travel HUB Child Pages - English
<Route path="/guide/levi-without-a-car" element={<LeviWithoutCar lang="en" />} />
```

#### `src/pages/guide/TravelHub.tsx`
Lisätään uusi kortti guides-listaan (lapsiperheet-kortin jälkeen):

**FI:**
```javascript
{ 
  id: "car-free", 
  title: "Levi ilman autoa", 
  description: "Miten saavut ja liikut Levillä ilman omaa autoa. Skibussit, kävelyetäisyydet ja keskustamajoitus.", 
  href: "/opas/levi-ilman-autoa", 
  iconKey: "carOff" 
}
```

**EN:**
```javascript
{ 
  id: "car-free", 
  title: "Levi Without a Car", 
  description: "How to arrive and get around in Levi without your own car. Ski buses, walking distances and central accommodation.", 
  href: "/guide/levi-without-a-car", 
  iconKey: "carOff" 
}
```

Lisätään iconMap:iin:
```typescript
import { CarOff } from "lucide-react";
// ...
carOff: CarOff
```

---

### 6. Sisäinen linkitys

#### Sivulta pois
- Linkki takaisin Travel HUB:iin: "← Takaisin matkaoppaaseen"
- Linkki: "Liikkuminen Levillä" -sivulle (yksityiskohtaisempi opas)
- Linkki majoituksiin (CTA)

#### Sivulle sisään (Travel HUB:sta)
- Uusi kortti "Levi ilman autoa – käytännön vinkit"

---

### 7. Sitemap-päivitys

Lisätään `public/sitemap.xml`:ään:
```xml
<!-- Levi without car - FI/EN -->
<url>
  <loc>https://leville.net/opas/levi-ilman-autoa</loc>
  <xhtml:link rel="alternate" hreflang="fi" href="https://leville.net/opas/levi-ilman-autoa"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://leville.net/guide/levi-without-a-car"/>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>https://leville.net/guide/levi-without-a-car</loc>
  <xhtml:link rel="alternate" hreflang="fi" href="https://leville.net/opas/levi-ilman-autoa"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://leville.net/guide/levi-without-a-car"/>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

### 8. Sivun sisältö (FI)

```text
H1: Levi ilman autoa – näin liikut ja lomailet helposti

Intro:
Kyllä, Leville pääsee hyvin ilman omaa autoa! Lentokentältä kulkee bussi suoraan 
keskustaan, ja perillä liikut kätevästi hiihtobussilla tai jalkaisin.

Tämä opas sopii erityisesti:
• Lentäen tuleville, jotka haluavat välttää autonvuokrauksen
• Junalla saapuville
• Perheille, jotka haluavat helpon loman
• Pariskunnille, jotka arvostavat kävelyetäisyyksiä

---

H2: Saapuminen Leville ilman autoa

Lento Kittilään:
• Kittilän lentokenttä sijaitsee 15 km Levin keskustasta
• Airport Bus Levi odottaa lentojen saapumista – varaa etukäteen sesonkina
• Matka keskustaan noin 20 minuuttia

Juna Kolariin tai Rovaniemelle:
• Yöjuna Helsingistä (noin 12 tuntia)
• Jatkoyhteys bussilla Leville (noin 45 min Kolarista ja 2 tuntia Rovaniemeltä)


---

H2: Liikkuminen Levillä

 Ski Bus:
• Kiertää Levin keskustan, rinteet ja majoitusalueet
• Kulkee 15–30 min välein sesonkina
• Aikataulut: https://www.levi.fi/en/ski/levi-ski-resort-services/ski-bus/

Kävelyetäisyydet:
• Levin keskusta on kompakti 
• Rinteiden juurelle 5–15 min kävely keskustasta
• Ravintolat, kaupat ja palvelut kävelymatkan päässä

Taksit:
• Levin Taksi: 0600 300 72
• Varaa etukäteen ilta-aikaan ja viikonloppuisin
• Uber ja Bolt toimii Levillä sesonkiaikoina

---

H2: Missä kannattaa majoittua ilman autoa

Kun autoa ei ole, majoituksen sijainti on kaikkein tärkein valinta.

Suosittelemme:
• Levin keskusta – kaikki palvelut kävelyetäisyydellä
• Ski-in / ski-out -kohteet – suoraan rinteen juurelta
• South Point -alue – hissit ja skibussi lähellä

Vältä:
• Syrjäisiä mökkejä ilman hyviä bussiyhteyksiä
• Kaukana keskustasta ja Skibussi reitin ulkopuolella olevia majoituksia, jos et halua tilata taksia joka päivä

---

H2: Kenelle Levi ilman autoa ei ehkä sovi

Rehellisesti: kaikille tämä ei ole paras vaihtoehto.

Harkitse autonvuokrausta, jos:
• Haluat vierailla etäisemmillä kohteilla tai aktiviteeteissa 
• Majoitut syrjäisessä mökissä ilman bussiyhteyttä
• Matkustat pienten lasten kanssa ja tarvitset joustavuutta
• Suunnittelet paljon aktiviteetteja eri puolilla Leviä

---

Yhteenveto:
Levi toimii erinomaisesti ilman autoa, kun valitset keskustamajoituksen. 
Skibussit, kävelymatkat ja lentokenttäkuljetukset hoitavat loput.

[CTA: Katso majoitukset Levin keskustassa]
```

---

### 9. Muokattavat tiedostot yhteenveto

| Tiedosto | Toimenpide |
|----------|------------|
| `src/pages/guide/LeviWithoutCar.tsx` | **Luodaan** – uusi sivu |
| `src/App.tsx` | Lisätään 2 reittiä (FI + EN) |
| `src/pages/guide/TravelHub.tsx` | Lisätään kortti + CarOff-ikoni |
| `public/sitemap.xml` | Lisätään 2 URL-merkintää |

---

### 10. Hakukoneoptimointitavoitteet

Sivu optimoidaan seuraaville hauille:
- levi ilman autoa
- liikkuminen levillä ilman autoa
- levi without a car
- levi car free travel
- levi public transport
