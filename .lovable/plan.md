
## Suunnitelma: Viestintä-välilehti Admin-paneeliin

Lisätään admin-paneeliin uusi "Viestintä" -välilehti, joka mahdollistaa WhatsApp-viestien lähettämisen tällä hetkellä majoittuville vieraille.

---

### Yleiskatsaus

```
┌─────────────────────────────────────────────────────────────────────┐
│  ADMIN PANEL - Viestintä-välilehti                                  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐                           │
│  │ [Hae majoittuvat vieraat] 🔄        │                           │
│  │ "5 vierasta löytyi"                 │                           │
│  └──────────────────────────────────────┘                           │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ ☐ Matti Meikäläinen | Glacier A1 | 1.2.-5.2. | +358401234567 │   │
│  │   [WhatsApp 📱]                                               │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │ ☐ John Smith | Skistar 321 | 31.1.-3.2. | +447891234567      │   │
│  │   [WhatsApp 📱]                                               │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ VIESTITEMPLATE                                               │    │
│  │ ○ Revontulet 🌌                                              │    │
│  │ ○ Sähkökatko ⚡                                               │    │
│  │ ○ Yleinen tiedote 📢                                         │    │
│  │ ○ Vapaa viesti                                               │    │
│  │                                                               │    │
│  │ [Muokkaa templateja] [Lisää uusi]                            │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  [Lähetä valituille (2)]                                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Toteutettavat muutokset

#### 1. Tietokanta: Uudet taulut

**Taulu: `message_templates`**
```sql
CREATE TABLE message_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: vain backend voi muokata
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read templates" ON message_templates FOR SELECT USING (true);
CREATE POLICY "Only backend can insert" ON message_templates FOR INSERT WITH CHECK (false);
CREATE POLICY "Only backend can update" ON message_templates FOR UPDATE USING (false);
CREATE POLICY "Only backend can delete" ON message_templates FOR DELETE USING (false);

-- Oletustemplatit
INSERT INTO message_templates (name, message, is_default) VALUES
  ('Revontulet', 'Hei [NIMI]! 🌌 Tänään on ennustettu revontulia alueella. Hyviä katseluhetkiä! - Leville', true),
  ('Sähkökatko', 'Hei [NIMI]. Alueella on sähkökatko. Pahoittelemme häiriötä. Ilmoitamme kun tilanne korjaantuu. - Leville', true),
  ('Yleinen tiedote', 'Hei [NIMI]. [VIESTI] - Leville', true);
```

**Taulu: `message_logs`** (valinnainen viestiloki)
```sql
CREATE TABLE message_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  apartment_name TEXT,
  template_name TEXT,
  message_content TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  sent_by TEXT -- 'admin' tai tulevaisuudessa user id
);

-- RLS: vain adminit voivat lukea
ALTER TABLE message_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read logs" ON message_logs FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Only backend can insert" ON message_logs FOR INSERT WITH CHECK (false);
```

---

#### 2. Edge Function: `get-current-guests`

**Tiedosto:** `supabase/functions/get-current-guests/index.ts`

Hakee Beds24 API:sta nykyiset majoittujat:
- Parametrit: `arrivalTo=today`, `departureFrom=today` (varaukset joissa saapuminen <= tänään JA lähtö >= tänään)
- Suodattaa:
  - EI tänään lähteviä
  - EI tänään saapuvia ennen klo 17
  - VAIN vieraat joilla on phone/mobile
- Palauttaa: lista vieraista nimi, huoneisto, puhelinnumero, saapumis/lähtöpäivät

```typescript
// Pseudokoodi
const today = new Date().toISOString().split('T')[0];
const currentHour = new Date().getHours();

// Hae varaukset joissa check-in <= today JA check-out >= today
const bookingsUrl = `https://beds24.com/api/v2/bookings?arrivalTo=${today}&departureFrom=${today}`;

// Suodata
const filtered = bookings.filter(booking => {
  const hasPhone = booking.phone || booking.mobile;
  const isDepartingToday = booking.departure === today;
  const isArrivingToday = booking.arrival === today;
  const isAfter5pm = currentHour >= 17;
  
  if (isDepartingToday) return false;
  if (isArrivingToday && !isAfter5pm) return false;
  return hasPhone;
});
```

---

#### 3. Edge Function: `manage-message-templates`

**Tiedosto:** `supabase/functions/manage-message-templates/index.ts`

Hallinnoi viestitemplateja:
- `action: 'list'` - Hae kaikki templateit
- `action: 'create'` - Luo uusi template
- `action: 'update'` - Muokkaa templateä
- `action: 'delete'` - Poista template

---

#### 4. Edge Function: `log-message`

**Tiedosto:** `supabase/functions/log-message/index.ts`

Tallentaa viestilokin:
- Vastaanottaa: guest_name, phone, apartment, template, message
- Tallentaa message_logs-tauluun

---

#### 5. Admin-komponentti: `MessagingAdmin.tsx`

**Tiedosto:** `src/components/admin/MessagingAdmin.tsx`

Sisältää:
- **Vieraiden haku**: Nappi joka kutsuu `get-current-guests` edge functionia
- **Vieraslista**: Taulukko/kortit valintaruuduilla
- **Template-valinta**: Radio-painikkeet + vapaa viesti -kenttä
- **Template-hallinta**: Dialog templatejen muokkaamiseen
- **WhatsApp-linkki**: Funktio joka luo `wa.me`-linkin

```typescript
interface GuestForMessaging {
  bookingId: number;
  firstName: string;
  lastName: string;
  phone: string;
  apartmentName: string;
  apartmentId: string;
  arrival: string;
  departure: string;
  selected: boolean;
}

const createWhatsAppLink = (phone: string, message: string) => {
  // Puhdista puhelinnumero
  let cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+358' + cleanPhone.replace(/^0/, '');
  }
  cleanPhone = cleanPhone.replace('+', '');
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};
```

---

#### 6. Admin.tsx-päivitys

Lisätään uusi välilehti navigaatioon:

```typescript
import { MessageSquare } from "lucide-react";
import MessagingAdmin from "@/components/admin/MessagingAdmin";

// TabsListiin:
<TabsTrigger value="messaging" className="flex items-center gap-2">
  <MessageSquare className="w-4 h-4" />
  Viestintä
</TabsTrigger>

// TabsContentiin:
<TabsContent value="messaging">
  <MessagingAdmin isViewer={isViewer} />
</TabsContent>
```

---

### Huoneistomappaus

Hyödynnetään olemassa olevaa logiikkaa:
1. `get_room_names` action maintenance-settings edge functionista → Beds24 API:n huoneistonimet
2. `propertyDetails.ts` → Master list huoneistojen oletusnimet
3. `property_settings` -taulu → marketing_name override

```typescript
const getApartmentName = (roomId: string) => {
  return propertyNames.get(roomId) 
    || beds24Names.get(roomId) 
    || defaultNames.get(roomId) 
    || `ID: ${roomId}`;
};
```

---

### UI/UX-suunnittelu

| Elementti | Tyyli |
|-----------|-------|
| WhatsApp-napit | Vihreä tausta (#25D366), valkoinen teksti |
| Vieraslistakortit | Card-komponentti, checkbox vasemmalla |
| Template-valinta | RadioGroup, aktiivinen korostettu |
| Vapaa viesti | Textarea, näkyy kun "Vapaa viesti" valittu |
| Latausanimaatio | Loader2 spinner |
| Virheviestit | Toast-notifikaatiot |

---

### Muokattavat/luotavat tiedostot

| Tiedosto | Muutos |
|----------|--------|
| `supabase/functions/get-current-guests/index.ts` | **UUSI** - Hae majoittuvat vieraat |
| `supabase/functions/manage-message-templates/index.ts` | **UUSI** - Template-hallinta |
| `supabase/functions/log-message/index.ts` | **UUSI** - Viestiloki |
| `src/components/admin/MessagingAdmin.tsx` | **UUSI** - Viestintä-komponentti |
| `src/pages/Admin.tsx` | Lisää Viestintä-välilehti |
| Tietokantamigraatio | Luo message_templates ja message_logs taulut |

---

### Käyttöliittymän flow

1. Admin avaa "Viestintä"-välilehden
2. Klikkaa "Hae majoittuvat vieraat"
3. Näkee listan vieraista puhelinnumeroineen
4. Valitsee templaten tai kirjoittaa vapaan viestin
5. Valitsee vieraat (yksittäin tai kaikki)
6. Klikkaa WhatsApp-nappia → avautuu WhatsApp esitäytetyllä viestillä
7. Admin lähettää viestin manuaalisesti WhatsAppissa
8. Viestiloki tallentuu taustalla

---

### Tekniset huomiot

- **Puhelinnumeroiden käsittely**: Poista välilyönnit, lisää +358 jos ei maakoodia
- **Beds24 API**: Käytetään olemassa olevaa `BEDS24_API_TOKEN` -secretia
- **Viewer-tila**: Näkee vieraat mutta ei voi lähettää viestejä
- **Responsiivisuus**: Mobile-friendly, kortit skaalautuvat

---

### Turvallisuus

- Edge functionit vaativat admin-salasanan (konsistentti muiden admin-functionien kanssa)
- Viestiloki ei tallenna arkaluontoista sisältöä (vain viestin tyyppi/template)
- Puhelinnumerot haetaan Beds24:sta, ei tallenneta pysyvästi
