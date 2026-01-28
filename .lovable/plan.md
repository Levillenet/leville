
## Suunnitelma: Lisää yrityksen viralliset tiedot Yritys-sivulle

### Tavoite
Lisätä Leville Oy:n viralliset tiedot selkeästi Yritys-sivulle.

---

### Lisättävät tiedot

| Tieto | Arvo |
|-------|------|
| Virallinen yritysnimi | Leville Oy |
| Y-tunnus | 3178413-5 |
| Markkinointinimi | Leville.net |
| Osoite | Ratsastajankuja 2, 99130 Levi |

---

### Toteutus

#### 1. Käännöstiedostot – Uusi `companyInfo` osio

Lisätään `yritys`-osioon uudet avaimet kaikille kielille:

**Suomi (`fi.ts`):**
```typescript
companyInfoTitle: "Yritystiedot",
officialName: "Virallinen nimi",
businessId: "Y-tunnus",
marketingName: "Markkinointinimi",
companyAddress: "Osoite",
companyNameValue: "Leville Oy",
businessIdValue: "3178413-5",
marketingNameValue: "Leville.net",
companyAddressValue: "Ratsastajankuja 2, 99130 Levi",
```

**Englanti (`en.ts`):**
```typescript
companyInfoTitle: "Company Information",
officialName: "Official name",
businessId: "Business ID",
marketingName: "Trading name",
companyAddress: "Address",
// Arvot samat kuin suomeksi
```

**Ruotsi (`sv.ts`):**
```typescript
companyInfoTitle: "Företagsinformation",
officialName: "Officiellt namn",
businessId: "Organisationsnummer",
marketingName: "Varumärke",
companyAddress: "Adress",
```

**Saksa (`de.ts`):**
```typescript
companyInfoTitle: "Unternehmensinformationen",
officialName: "Offizieller Name",
businessId: "Handelsregisternummer",
marketingName: "Markenname",
companyAddress: "Adresse",
```

**Espanja (`es.ts`):**
```typescript
companyInfoTitle: "Información de la empresa",
officialName: "Nombre oficial",
businessId: "CIF",
marketingName: "Nombre comercial",
companyAddress: "Dirección",
```

**Ranska (`fr.ts`):**
```typescript
companyInfoTitle: "Informations sur l'entreprise",
officialName: "Nom officiel",
businessId: "Numéro d'entreprise",
marketingName: "Nom commercial",
companyAddress: "Adresse",
```

---

#### 2. `src/pages/Yritys.tsx` – Uusi tietokortti

Lisätään uusi osio "Miksi valita Leville.net?" -osion ja CTA-osion väliin:

```
┌───────────────────────────────────────────────────────────────┐
│ 🏢 Yritystiedot                                               │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│   Virallinen nimi    Leville Oy                               │
│   Y-tunnus           3178413-5                                │
│   Markkinointinimi   Leville.net                              │
│   Osoite             Ratsastajankuja 2, 99130 Levi            │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

Käytetään samaa `glass-card` tyyliä kuin muissa osioissa.

---

#### 3. Organization Schema päivitys

Päivitetään myös `organizationSchema` -objekti tarkalla osoitteella:

```typescript
"address": {
  "@type": "PostalAddress",
  "streetAddress": "Ratsastajankuja 2",
  "addressLocality": "Levi",
  "postalCode": "99130",
  "addressCountry": "FI"
},
"legalName": "Leville Oy",
```

---

### Muokattavat tiedostot

| Tiedosto | Muutos |
|----------|--------|
| `src/translations/fi.ts` | Lisää yritystiedot-käännökset |
| `src/translations/en.ts` | Lisää yritystiedot-käännökset |
| `src/translations/sv.ts` | Lisää yritystiedot-käännökset |
| `src/translations/de.ts` | Lisää yritystiedot-käännökset |
| `src/translations/es.ts` | Lisää yritystiedot-käännökset |
| `src/translations/fr.ts` | Lisää yritystiedot-käännökset |
| `src/pages/Yritys.tsx` | Lisää yritystiedot-kortti + päivitä schema |

---

### Visuaalinen sijoittelu sivulla

```
[Animoidut tilastot]
[Esittely]
[Meiltä saat -palvelut]
[Räätälöidyt ratkaisut]
[Miksi valita Leville.net?]
[Asiakkaiden kokemuksia]
[Yritystiedot]        ← UUSI
[CTA: Tutustu kohteisiimme / Ota yhteyttä]
```

---

### Tulos

1. Viralliset yritystiedot näkyvät selkeästi sivulla
2. SEO-schema sisältää oikean osoitteen ja y-tunnuksen
3. Käännökset toimivat kaikilla kuudella kielellä
4. Tyyli on yhtenäinen muun sivun kanssa
