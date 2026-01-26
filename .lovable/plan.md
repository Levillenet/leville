
## Suunnitelma: Aktiviteettikorttien info ja tyhjien slottien klikattavuus

### Tavoite
1. Lisätä **info-popover/-tooltip** jokaiseen ehdotettuun aktiviteettiin (näyttää kuvauksen)
2. Laajentaa aktiviteettikuvauksia (esim. laskettelussa rinneravintolat, kylän tutkimisessa kaupat/kahvilat)
3. Revontuliretken kohdalla **erikois-CTA**: WhatsApp-linkki tarjouspyyntöön (+358 440 666 766)
4. Tyhjät slotit ("Vapaa") **klikattavaksi** → avaa lisäysdialogi suoraan kyseiselle päivälle ja slotille

---

### Muutokset

#### 1. `src/data/leviActivities.ts` – Laajennetut kuvaukset

| Aktiviteetti | Uusi kuvaus (FI) |
|-------------|------------------|
| skiing | "Levin 43 rinnettä tarjoavat haastetta kaikentasoisille. Tutustu myös rinneravintoloihin kuten Tuikku ja Gondoli – taukopaikkoihin upeiden maisemien keskellä." |
| village-walk | "Tutustu Levin keskustan pieniin putiikkeihin, matkamuistomyymälöihin ja kahviloihin. Zero Point -alue ja kävelykatu tarjoavat monipuolista shoppailua ja rentoa tunnelmaa." |
| cross-country | "230 km huollettuja latuja tunturimaisemissa. Voit lähteä suoraan keskustasta. Latuinfon saat Levin sivulta." |
| restaurant-dinner | "Levillä on ravintoloita jokaiseen makuun: lappilaista ruokaa Hullu Porossa, fine diningtiä King Crabissa tai rentoa tunnelmaa Coloradossa." |
| spa | "Kylpylä & Spa -vierailun voit tehdä esim. Levi Hotel Spassa. Altaat, saunat ja hemmotteluhoidot rentouttavat aktiviteettipäivän jälkeen." |
| husky-safari | "Koiravaljakkoajelu lumisessa erämaassa on unohtumaton kokemus. Safarit kestävät 1–4 tuntia ja sisältävät kuljetuksen" |
| reindeer-farm | "Porofarmilla tapaat poroja, kuulet tarinoita poronhoitajien elämästä ja voit nauttia kupposen kuumaa mehua kodassa. Sopii kaikenikäisille." |
| northern-lights | "Revontuliretki vie sinut parhaalle katselupaikalle pois valosaasteen keskeltä. Retki sisältää kuljetuksen" |

---

#### 2. `src/components/planner/ActivityCard.tsx` – Info-popover

Lisätään:
- **Info-ikoni** (lucide `Info`) joka avaa **Popover**-komponentin
- Popover näyttää:
  - Aktiviteetin kuvauksen (`leviActivity.description`)
  - Revontuliretken kohdalla myös **WhatsApp-CTA** (+358 440 666 766)

```tsx
// Uudet importit
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info, MessageCircle } from 'lucide-react';

// Info-nappi kortin sisällä
<PopoverTrigger asChild>
  <button className="absolute top-1 right-12 opacity-0 group-hover:opacity-100 ...">
    <Info className="h-3 w-3" />
  </button>
</PopoverTrigger>
<PopoverContent>
  <p className="text-sm">{leviActivity?.description[lang]}</p>
  {activity.activityId === 'northern-lights' && (
    <a href="https://wa.me/358440666766?text=...">
      <MessageCircle /> Kysy tarjous WhatsAppissa
    </a>
  )}
</PopoverContent>
```

---

#### 3. `src/components/planner/TimeSlot.tsx` – Tyhjän slotin klikattavuus

Lisätään:
- `onAddActivity` callback propseihin
- Kun slot on tyhjä, "Vapaa"-teksti muutetaan **klikattavaksi napiksi** joka kutsuu `onAddActivity(dayIndex, slotIndex)`

```tsx
// Tyhjän slotin nappi
{slot.activities.length === 0 && (
  <button 
    onClick={() => onAddActivity(dayIndex, slotIndex)}
    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
  >
    <Plus className="h-3 w-3" /> 
    {lang === 'fi' ? 'Lisää aktiviteetti' : 'Add activity'}
  </button>
)}
```

---

#### 4. `src/components/planner/DayColumn.tsx` – Propsien välitys

Lisätään `onAddActivity` propsi ja välitetään TimeSlotille.

---

#### 5. `src/components/planner/PlannerView.tsx` – Dialogin avaaminen esitäytettynä

Lisätään:
- `preselectedDay` ja `preselectedSlot` -tilat
- Kun tyhjää slotia klikataan → asetetaan nämä ja avataan dialogi

---

#### 6. `src/components/planner/AddActivityDialog.tsx` – Esitäytetyt valinnat

Lisätään propseihin:
- `initialDayIndex?: number`
- `initialSlotIndex?: number`

Kun dialogi avataan näillä arvoilla → päivä ja slotti on valmiiksi valittu.

---

### Muokattavat tiedostot

| Tiedosto | Muutos |
|----------|--------|
| `src/data/leviActivities.ts` | Laajennetut kuvaukset |
| `src/components/planner/ActivityCard.tsx` | Info-popover + WhatsApp-CTA revontuliretkelle |
| `src/components/planner/TimeSlot.tsx` | Tyhjän slotin klikattavuus |
| `src/components/planner/DayColumn.tsx` | onAddActivity propsin välitys |
| `src/components/planner/PlannerView.tsx` | Esitäytetty dialogi |
| `src/components/planner/AddActivityDialog.tsx` | initialDayIndex/initialSlotIndex propsit |

---

### Käännökset

| Avain | FI | EN |
|-------|----|----|
| addActivityToSlot | Lisää aktiviteetti | Add activity |
| askQuote | Kysy tarjous Leville.net-hintaan | Ask for a quote at Leville.net price |
| whatsappCta | Lähetä viesti WhatsAppissa | Send a message on WhatsApp |

---

### Revontuliretken WhatsApp-linkki

```
https://wa.me/358440666766?text=Hei!%20Haluaisin%20kysyä%20revontuliretkeä%20Leville.net-hintaan.
```

---

### Lopputulos

1. Jokaisessa aktiviteettikortissa **info-ikoni** → popover näyttää kuvauksen
2. Kuvaukset ovat **laajennetut** ja sisältävät käytännön tietoa (ravintolat, kaupat, jne.)
3. **Revontuliretki** sisältää WhatsApp-CTA tarjouspyyntöön
4. Tyhjää slottia klikkaamalla **avautuu dialogi** suoraan oikeaan päivään ja slotiin
