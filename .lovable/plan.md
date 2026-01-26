
# Levi Holiday Planner - Interaktiivinen Lomasuunnittelija

## Yleiskatsaus

Rakennetaan kaksivaiheinen interaktiivinen lomasuunnittelija Leville.net-sivustolle:
1. **Wizard-vaihe**: Kerätään käyttäjän tiedot ja luodaan automaattinen perusohjelma
2. **Planner-vaihe**: Täysin muokattava visuaalinen näkymä, jossa käyttäjä voi räätälöidä ohjelmansa

---

## Tekninen arkkitehtuuri

### Uudet tiedostot

| Tiedosto | Kuvaus |
|----------|--------|
| `src/pages/HolidayPlanner.tsx` | Pääsivu, joka hallinnoi wizard/planner -tilaa |
| `src/components/planner/PlannerWizard.tsx` | Vaiheittainen wizard käyttäjätietojen keräämiseen |
| `src/components/planner/PlannerView.tsx` | Visuaalinen drag-and-drop -suunnittelunäkymä |
| `src/components/planner/ActivityCard.tsx` | Yksittäinen aktiviteettikortti |
| `src/components/planner/DayColumn.tsx` | Päiväsarake aikaväleineen |
| `src/components/planner/TimeSlot.tsx` | Aikavälipaikka (Aamu/Iltapäivä/Ilta) |
| `src/components/planner/AddActivityDialog.tsx` | Dialogi omien aktiviteettien lisäämiseen |
| `src/components/planner/DayNotes.tsx` | Päiväkohtaiset muistiinpanot |
| `src/components/planner/PrintView.tsx` | Tulostusystävällinen näkymä |
| `src/data/leviActivities.ts` | Levi-aktiviteettitietokanta |
| `src/lib/planGenerator.ts` | Algoritmit ohjelman generointiin |
| `src/types/planner.ts` | TypeScript-tyypit |

### Muutettavat tiedostot

| Tiedosto | Muutos |
|----------|--------|
| `src/App.tsx` | Uudet reitit: `/lomasuunnittelija` (FI) ja `/en/holiday-planner` (EN) |
| `src/translations/index.ts` | routeConfig-päivitys |

---

## Vaihe 1: Wizard-työnkulku

### Wizard-askeleet

```text
┌─────────────────────────────────────────────────────────┐
│  ASKEL 1: Matkaseurue                                   │
├─────────────────────────────────────────────────────────┤
│  ○ Aikuisten määrä: [1] [2] [3] [4+]                   │
│  ○ Lasten määrä: [0] [1] [2] [3+]                      │
│  (Jos lapsia) → Lasten iät: [alle 4] [4-7] [8-12] [13+]│
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ASKEL 2: Loman pituus                                  │
├─────────────────────────────────────────────────────────┤
│  ○ Päivien määrä Levillä: [3] [4] [5] [6] [7+]         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ASKEL 3: Lomatyyli                                     │
├─────────────────────────────────────────────────────────┤
│  ○ Aktiivinen - Paljon aktiviteetteja                  │
│  ○ Tasapainoinen - Sekoitus toimintaa ja lepoa         │
│  ○ Rento - Rauhallinen tahti, paljon vapaata aikaa     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ASKEL 4: Toiveaktiviteetit (valinnainen)              │
├─────────────────────────────────────────────────────────┤
│  ☐ Laskettelu / lumilautailu                           │
│  ☐ Huskysafari                                         │
│  ☐ Porofarmi                                           │
│  ☐ Revontulet                                          │
│  ☐ Jääkarting                                          │
│  ☐ Kylpylä / rentoutuminen                             │
│  ○ Ei erityistoiveita - ehdota vapaasti                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ASKEL 5: Liikkuminen                                   │
├─────────────────────────────────────────────────────────┤
│  ○ Autolla                                             │
│  ○ Ilman autoa                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Vaihe 2: Suunnittelunäkymä

### Visuaalinen layout

```text
┌──────────────────────────────────────────────────────────────────────┐
│  LEVI-LOMASUUNNITELMA                           [Tulosta] [Aloita alusta]
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│  │   PÄIVÄ 1   │ │   PÄIVÄ 2   │ │   PÄIVÄ 3   │ │   PÄIVÄ 4   │     │
│  ├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤     │
│  │  AAMU       │ │  AAMU       │ │  AAMU       │ │  AAMU       │     │
│  │ ┌─────────┐ │ │ ┌─────────┐ │ │             │ │ ┌─────────┐ │     │
│  │ │Laskettelu│ │ │ │Huskysafari│ │ ☐ Vapaa     │ │ │Porofarmi│ │     │
│  │ │ ⭐ Ehdotus│ │ │ ⭐ Ehdotus│ │             │ │ │ ⭐ Ehdotus│ │     │
│  │ └─────────┘ │ │ └─────────┘ │ │             │ │ └─────────┘ │     │
│  ├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤     │
│  │  ILTAPÄIVÄ  │ │  ILTAPÄIVÄ  │ │  ILTAPÄIVÄ  │ │  ILTAPÄIVÄ  │     │
│  │ ┌─────────┐ │ │             │ │ ┌─────────┐ │ │ ┌─────────┐ │     │
│  │ │Vapaa aika│ │ │ ☐ Vapaa    │ │ │Kylpylä  │ │ │ │Hiihto   │ │     │
│  │ │          │ │ │             │ │ │ 🧑 Lisätty│ │ │ ⭐ Ehdotus│ │     │
│  │ └─────────┘ │ │             │ │ └─────────┘ │ │ └─────────┘ │     │
│  ├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤     │
│  │  ILTA       │ │  ILTA       │ │  ILTA       │ │  ILTA       │     │
│  │ ┌─────────┐ │ │ ┌─────────┐ │ │             │ │ ┌─────────┐ │     │
│  │ │Revontuli-│ │ │ │Ravintola-│ │ ☐ Vapaa     │ │ │Lähtöilta│ │     │
│  │ │retki     │ │ │ │varaus   │ │             │ │ │          │ │     │
│  │ │ ⭐ Ehdotus│ │ │ 🧑 Lisätty│ │             │ │ │ 🧑 Lisätty│ │     │
│  │ └─────────┘ │ │ └─────────┘ │ │             │ │ └─────────┘ │     │
│  ├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤     │
│  │ 📝 Muistio  │ │ 📝 Muistio  │ │ 📝 Muistio  │ │ 📝 Muistio  │     │
│  │ Saapuminen │ │             │ │ Lepopaiva   │ │ Lähtö klo 11│     │
│  │ klo 15     │ │             │ │             │ │             │     │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘     │
│                                                                       │
│  [+ Lisää oma aktiviteetti]  [+ Lisää aikväli]                       │
└──────────────────────────────────────────────────────────────────────┘
```

### Aktiviteettikortin ominaisuudet

- Raahattava (drag-and-drop Framer Motion -kirjastolla)
- Muokattava (otsikko + vapaamuotoinen muistiinpano)
- Poistettava (X-painike hover-tilassa)
- Visuaalinen erottelu:
  - `⭐ Ehdottama` = Suunnittelijan ehdotus (sininen reunus)
  - `🧑 Lisätty` = Käyttäjän lisäämä (vihreä reunus)

---

## Levi-aktiviteettitietokanta

### Aktiviteettikategoriat

```typescript
// src/data/leviActivities.ts

export interface LeviActivity {
  id: string;
  name: { fi: string; en: string };
  category: 'outdoor' | 'safari' | 'relaxation' | 'dining' | 'culture' | 'family';
  duration: 'short' | 'half-day' | 'full-day'; // 1-2h, 3-4h, 5-8h
  physicalDemand: 'low' | 'medium' | 'high';
  minAge: number;
  requiresCar: boolean;
  timeOfDay: ('morning' | 'afternoon' | 'evening')[];
  seasonAvailable: ('winter' | 'spring' | 'summer' | 'autumn')[];
  icon: string; // lucide-react icon name
  description: { fi: string; en: string };
}

export const leviActivities: LeviActivity[] = [
  // LASKETTELU & HIIHTO
  {
    id: 'skiing',
    name: { fi: 'Laskettelu', en: 'Skiing' },
    category: 'outdoor',
    duration: 'half-day',
    physicalDemand: 'high',
    minAge: 3,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Mountain',
    description: {
      fi: 'Levin 43 rinnettä tarjoavat laskettelijoille kaikentasoisia haasteita.',
      en: 'Levi\'s 43 slopes offer challenges for all skill levels.'
    }
  },
  {
    id: 'cross-country',
    name: { fi: 'Murtomaahiihto', en: 'Cross-Country Skiing' },
    category: 'outdoor',
    duration: 'half-day',
    physicalDemand: 'medium',
    minAge: 4,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'TreePine',
    description: {
      fi: '230 km huollettuja latuja tunturimaisemissa.',
      en: '230 km of groomed trails in fell landscapes.'
    }
  },
  
  // SAFARIT
  {
    id: 'husky-safari',
    name: { fi: 'Huskysafari', en: 'Husky Safari' },
    category: 'safari',
    duration: 'half-day',
    physicalDemand: 'low',
    minAge: 4,
    requiresCar: true,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Dog',
    description: {
      fi: 'Unohtumaton kokemus koiravaljakon kyydissä lumisessa erämaassa.',
      en: 'Unforgettable experience riding a dog sled through snowy wilderness.'
    }
  },
  {
    id: 'reindeer-farm',
    name: { fi: 'Porofarmivierailu', en: 'Reindeer Farm Visit' },
    category: 'safari',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: true,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Heart',
    description: {
      fi: 'Tapaa poroja läheltä ja opi poronhoitajan elämästä.',
      en: 'Meet reindeer up close and learn about herder life.'
    }
  },
  {
    id: 'snowmobile-safari',
    name: { fi: 'Moottorikelkkasafari', en: 'Snowmobile Safari' },
    category: 'safari',
    duration: 'half-day',
    physicalDemand: 'medium',
    minAge: 12,
    requiresCar: true,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Zap',
    description: {
      fi: 'Jännittävä ajelu tunturimaisemissa moottorikelkalla.',
      en: 'Exciting ride through fell landscapes by snowmobile.'
    }
  },
  {
    id: 'northern-lights',
    name: { fi: 'Revontuliretki', en: 'Northern Lights Tour' },
    category: 'safari',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 4,
    requiresCar: true,
    timeOfDay: ['evening'],
    seasonAvailable: ['winter', 'autumn'],
    icon: 'Sparkles',
    description: {
      fi: 'Opastettu retki parhaille revontulipaikoille.',
      en: 'Guided tour to the best aurora viewing spots.'
    }
  },
  
  // RENTOUTUMINEN
  {
    id: 'spa',
    name: { fi: 'Kylpylä & Spa', en: 'Spa & Wellness' },
    category: 'relaxation',
    duration: 'half-day',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon', 'evening'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Droplets',
    description: {
      fi: 'Rentoudu kylpylässä uima-altailla ja saunassa.',
      en: 'Relax in spa with pools and sauna.'
    }
  },
  {
    id: 'sauna-evening',
    name: { fi: 'Sauna-ilta majoituksessa', en: 'Sauna Evening' },
    category: 'relaxation',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['evening'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Flame',
    description: {
      fi: 'Nauti omasta saunasta aktiviteettipäivän jälkeen.',
      en: 'Enjoy private sauna after an activity-filled day.'
    }
  },
  
  // PERHEAKTIVITEETIT
  {
    id: 'sledding',
    name: { fi: 'Pulkkailu', en: 'Sledding' },
    category: 'family',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'ArrowDown',
    description: {
      fi: 'Ilmaisia pulkkamäkiä ympäri Leviä.',
      en: 'Free sledding hills around Levi.'
    }
  },
  {
    id: 'kids-ski-school',
    name: { fi: 'Lasten hiihtokoulu', en: 'Kids Ski School' },
    category: 'family',
    duration: 'half-day',
    physicalDemand: 'medium',
    minAge: 3,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Baby',
    description: {
      fi: 'Ammattitaitoinen hiihto-opetus lapsille.',
      en: 'Professional ski instruction for children.'
    }
  },
  
  // MUUT
  {
    id: 'ice-karting',
    name: { fi: 'Jääkarting', en: 'Ice Karting' },
    category: 'outdoor',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 7,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon', 'evening'],
    seasonAvailable: ['winter'],
    icon: 'Car',
    description: {
      fi: 'Vauhdikas jääkartingrata Levin keskustassa.',
      en: 'Exciting ice karting track in Levi center.'
    }
  },
  {
    id: 'ice-fishing',
    name: { fi: 'Pilkkiminen', en: 'Ice Fishing' },
    category: 'outdoor',
    duration: 'half-day',
    physicalDemand: 'low',
    minAge: 4,
    requiresCar: true,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Fish',
    description: {
      fi: 'Rauhallinen pilkkihetki jäällä.',
      en: 'Peaceful ice fishing moment.'
    }
  },
  {
    id: 'snowshoeing',
    name: { fi: 'Lumikenkäily', en: 'Snowshoeing' },
    category: 'outdoor',
    duration: 'short',
    physicalDemand: 'medium',
    minAge: 6,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Footprints',
    description: {
      fi: 'Kävely lumikengillä tunturipolulla.',
      en: 'Walking with snowshoes on fell trails.'
    }
  },
  {
    id: 'free-time',
    name: { fi: 'Vapaa-aika', en: 'Free Time' },
    category: 'relaxation',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon', 'evening'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Coffee',
    description: {
      fi: 'Rentoutumista, ostoksia tai kahvittelua.',
      en: 'Relaxation, shopping or coffee break.'
    }
  }
];
```

---

## Ohjelman generointilogiikka

### Säännöt (`src/lib/planGenerator.ts`)

```typescript
interface PlannerInput {
  adults: number;
  children: number;
  childAges: number[]; // [2, 7] = 2-vuotias ja 7-vuotias
  days: number;
  style: 'active' | 'balanced' | 'relaxed';
  mustHave: string[]; // aktiviteetti-id:t
  hasCar: boolean;
}

// SÄÄNNÖT:
// 1. Max 1 fyysisesti vaativa aktiviteetti/päivä
// 2. Joka päivä sisältää vapaata aikaa
// 3. Jos lapsia alle 7: ei 2 rankkaa päivää peräkkäin
// 4. Jos lapsia alle 4: ilta-aktiviteetit valinnaisia
// 5. Perheille vähintään 1 helppo päivä
// 6. Tyyliin sopiva aktiviteettitiheys
// 7. Ilman autoa: priorisoi kävelyetäisyys / skibussi
```

### Tyylikohtainen logiikka

| Tyyli | Aktiviteetteja/päivä | Vapaa-aika | Fyysisesti vaativat |
|-------|---------------------|------------|---------------------|
| Aktiivinen | 2-3 | 1 slot | Joka päivä sallittu |
| Tasapainoinen | 1-2 | 1-2 slottia | Joka toinen päivä |
| Rento | 0-1 | 2-3 slottia | Max 2 koko lomalla |

---

## Käyttäjätoiminnot suunnittelunäkymässä

### Drag-and-drop
- Aktiviteettikortit raahattavissa aikavälien ja päivien välillä
- Framer Motion `drag` + `onDragEnd` -toteutus
- Visuaalinen palaute (korostus pudotuskohteessa)

### Muokkaus
- Klikkaa korttia → Muokkaa otsikkoa ja muistiinpanoa
- Inline-muokkaus tai dialogi

### Lisäys
- "+ Lisää oma aktiviteetti" -nappi avaa dialogin
- Valitse päivä + aikaslo + vapaa teksti

### Päivämuistiinpanot
- Jokaisessa päiväsarakkeessa vapaamuotoinen tekstialue
- Esimerkkejä: "Ravintola Hullu Poro klo 19", "Saapuminen klo 15"

### Tulostus/vienti
- "Tulosta" -nappi avaa siistin printview-näkymän
- CSS @media print -tuki

---

## Tekninen toteutus

### Tilarakenne

```typescript
// src/types/planner.ts

export interface PlannerActivity {
  id: string;
  activityId: string | null; // null = custom
  title: string;
  note?: string;
  source: 'suggested' | 'user';
}

export interface TimeSlot {
  id: string;
  type: 'morning' | 'afternoon' | 'evening' | 'custom';
  label: string;
  activities: PlannerActivity[];
}

export interface PlanDay {
  dayNumber: number;
  slots: TimeSlot[];
  note: string;
}

export interface PlannerState {
  step: 'wizard' | 'planner';
  wizardData: WizardData | null;
  days: PlanDay[];
}
```

### Komponenttihierarkia

```text
HolidayPlanner
├── PlannerWizard (step === 'wizard')
│   ├── WizardStep1_Group
│   ├── WizardStep2_Duration
│   ├── WizardStep3_Style
│   ├── WizardStep4_Activities
│   └── WizardStep5_Transport
│
└── PlannerView (step === 'planner')
    ├── PlannerHeader (otsikko + toiminnot)
    ├── PlannerGrid
    │   └── DayColumn (per päivä)
    │       ├── TimeSlot (aamu/iltapäivä/ilta)
    │       │   └── ActivityCard (raahattava)
    │       └── DayNotes
    ├── AddActivityDialog
    └── PrintView (tulostusnäkymä)
```

---

## SEO & Metatiedot

### Meta Title (FI)
`Levi Lomasuunnittelija – Suunnittele täydellinen Lapin-lomasi | Leville.net`

### Meta Description (FI)
`Suunnittele oma Levi-lomasi interaktiivisella työkalulla. Valitse aktiviteetit, luo ohjelma ja muokkaa sitä vapaasti.`

### URL-rakenne
- FI: `/lomasuunnittelija`
- EN: `/en/holiday-planner`

---

## Käyttöliittymäsuunnittelu

### Wizard-vaihe
- Puhdas, vaiheittainen UI
- Edistymispalkki yläreunassa
- Animoidut siirtymät (Framer Motion)
- Mobiilikeskeinen suunnittelu

### Planner-vaihe
- Horisontaalinen scrollaus mobiililla (päivät vierekkäin)
- Kortit skaalautuvat näyttökoon mukaan
- Selkeät värikoodit (ehdotus vs. käyttäjän lisäämä)
- Rauhallinen, luotettava tunnelma (Leville-brändi)

---

## Tiedostorakenne yhteenveto

```text
src/
├── pages/
│   └── HolidayPlanner.tsx          # Pääsivu
├── components/
│   └── planner/
│       ├── PlannerWizard.tsx       # Wizard-päänäkymä
│       ├── WizardSteps.tsx         # Yksittäiset wizard-askeleet
│       ├── PlannerView.tsx         # Suunnittelunäkymä
│       ├── PlannerGrid.tsx         # Päiväruudukko
│       ├── DayColumn.tsx           # Yksittäinen päivä
│       ├── TimeSlot.tsx            # Aikavälipaikka
│       ├── ActivityCard.tsx        # Aktiviteettikortti
│       ├── AddActivityDialog.tsx   # Lisäysdialogi
│       ├── DayNotes.tsx            # Päivämuistiinpanot
│       └── PrintView.tsx           # Tulostusnäkymä
├── data/
│   └── leviActivities.ts           # Aktiviteettitietokanta
├── lib/
│   └── planGenerator.ts            # Generointilogiikka
└── types/
    └── planner.ts                  # TypeScript-tyypit
```

---

## Toteutusjärjestys

1. **Tyypit ja data**: `types/planner.ts`, `data/leviActivities.ts`
2. **Generointilogiikka**: `lib/planGenerator.ts`
3. **Wizard-komponentit**: `PlannerWizard.tsx`, `WizardSteps.tsx`
4. **Planner-perusnäkymä**: `PlannerView.tsx`, `PlannerGrid.tsx`, `DayColumn.tsx`
5. **Aktiviteettikortit**: `ActivityCard.tsx`, `TimeSlot.tsx`
6. **Käyttäjätoiminnot**: Drag-and-drop, `AddActivityDialog.tsx`, `DayNotes.tsx`
7. **Tulostus**: `PrintView.tsx`
8. **Pääsivu ja reititys**: `HolidayPlanner.tsx`, `App.tsx`-päivitykset
9. **SEO ja viimeistely**: Meta, sitemap, testaus

---

## Ei toteuteta (rajaukset)

- Ei ulkoista datan tallennusta (local state only)
- Ei varauslinkityksiä suoraan aktiviteetteihin
- Ei kieliversioita aluksi muille kuin FI/EN
- Ei strukturoitua dataa (JSON-LD) tässä vaiheessa
