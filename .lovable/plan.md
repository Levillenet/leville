

## Suunnitelma: Lisää sähköpostivaihtoehto WhatsAppin rinnalle

Lisätään viestintävälilehteen valinta, jolla voi valita lähetetäänkö viesti WhatsAppilla vai sähköpostilla. Sähköposti lähetetään Gmail web -sovelluksessa, jossa kaikki valitut vieraat ovat BCC-kentässä ja vastaanottajana on info@leville.net.

---

### Yleiskatsaus

```
┌──────────────────────────────────────────────────────────────────────────┐
│  LÄHETYSTAPA                                                             │
│  ┌────────────────────┐    ┌────────────────────┐                        │
│  │ 📱 WhatsApp        │    │ 📧 Sähköposti      │   ← Toggle-valinta     │
│  │    (valittu)       │    │                    │                        │
│  └────────────────────┘    └────────────────────┘                        │
│                                                                          │
│  WhatsApp: Yksittäiset wa.me-linkit jokaiselle vieraalle                │
│  Sähköposti: Yksi Gmail-linkki, vieraat BCC:ssä, info@leville.net TO:ssa│
└──────────────────────────────────────────────────────────────────────────┘
```

---

### Toteutettavat muutokset

#### 1. Edge Function: Lisää sähköpostiosoite vierashakuun

**Tiedosto:** `supabase/functions/get-current-guests/index.ts`

Beds24 API palauttaa varauksissa myös `email`-kentän. Lisätään se palautettaviin tietoihin:

```typescript
// Muutetaan map-funktio (rivit 102-110)
}).map((booking: any) => ({
  bookingId: booking.id,
  firstName: booking.firstName || '',
  lastName: booking.lastName || '',
  phone: booking.mobile || booking.phone || '',
  email: booking.email || '',  // <-- LISÄTÄÄN
  apartmentId: String(booking.roomId || booking.propertyId || ''),
  arrival: booking.arrival,
  departure: booking.departure,
}));
```

---

#### 2. Frontend: Lisää lähetystavan valinta

**Tiedosto:** `src/components/admin/MessagingAdmin.tsx`

##### A) Uusi state lähetystavalle

```typescript
type SendMethod = 'whatsapp' | 'email';
const [sendMethod, setSendMethod] = useState<SendMethod>('whatsapp');
```

##### B) Päivitä GuestForMessaging-interface

```typescript
interface GuestForMessaging {
  bookingId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;  // <-- LISÄTÄÄN
  apartmentName: string;
  apartmentId: string;
  arrival: string;
  departure: string;
  selected: boolean;
}
```

##### C) Lisää Toggle-valitsin UI:hin

Lisätään viestitemplate-kortin yläpuolelle lähetystavan valinta:

```typescript
<Card>
  <CardHeader>
    <CardTitle className="text-base flex items-center gap-2">
      <Mail className="w-5 h-5" />
      Lähetystapa
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex gap-3">
      <Button
        variant={sendMethod === 'whatsapp' ? 'default' : 'outline'}
        onClick={() => setSendMethod('whatsapp')}
        className={sendMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#128C7E]' : ''}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        WhatsApp
      </Button>
      <Button
        variant={sendMethod === 'email' ? 'default' : 'outline'}
        onClick={() => setSendMethod('email')}
        className={sendMethod === 'email' ? 'bg-blue-600 hover:bg-blue-700' : ''}
      >
        <Mail className="w-4 h-4 mr-2" />
        Sähköposti
      </Button>
    </div>
    {sendMethod === 'email' && (
      <p className="mt-3 text-sm text-muted-foreground">
        Avaa Gmail valittujen vieraiden sähköpostiosoitteilla BCC:ssä. 
        Vastaanottaja: info@leville.net
      </p>
    )}
  </CardContent>
</Card>
```

##### D) Gmail-linkin luontifunktio

```typescript
const createGmailLink = (): string => {
  const selectedGuests = guests.filter(g => g.selected && g.email);
  
  if (selectedGuests.length === 0) return '';
  
  // BCC: kaikki valitut sähköpostit pilkulla erotettuina
  const bccEmails = selectedGuests
    .map(g => g.email)
    .filter(Boolean)
    .join(',');
  
  // Viestin sisältö (ei personointia koska massamaili)
  const messageContent = getMessageContent()
    .replace(/\[NIMI\]/g, '')  // Poista henkilökohtaiset muuttujat
    .replace(/\[HUONEISTO\]/g, '')
    .replace(/\[SAAPUMINEN\]/g, '')
    .replace(/\[LÄHTÖ\]/g, '')
    .trim();
  
  // Hae templaten nimi subjectiksi
  const templateName = selectedTemplateId === "free" 
    ? "Viesti Levilleltä" 
    : templates.find(t => t.id === selectedTemplateId)?.name || "Viesti Levilleltä";
  
  // Gmail compose URL
  const params = new URLSearchParams({
    to: 'info@leville.net',
    bcc: bccEmails,
    su: templateName,  // Subject
    body: messageContent,
    tf: 'cm'  // Compose mode
  });
  
  return `https://mail.google.com/mail/u/0/?${params.toString()}`;
};
```

##### E) Sähköpostin lähetysnappi

Päivitetään "Lähetä valituille" -nappi ottamaan huomioon lähetystapa:

```typescript
{guests.length > 0 && selectedCount > 0 && (
  sendMethod === 'whatsapp' ? (
    <Button
      onClick={openSelectedWhatsApps}
      disabled={isViewer || !getMessageContent()}
      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
    >
      <Send className="w-4 h-4 mr-2" />
      Lähetä WhatsApp valituille ({selectedCount})
    </Button>
  ) : (
    <Button
      onClick={openGmail}
      disabled={isViewer || !getMessageContent() || selectedEmailCount === 0}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Mail className="w-4 h-4 mr-2" />
      Avaa Gmail ({selectedEmailCount} vastaanottajaa)
    </Button>
  )
)}
```

##### F) Gmail-avausfunktio

```typescript
const openGmail = async () => {
  if (isViewer) {
    toast({
      title: "Katselutila",
      description: "Et voi lähettää viestejä katselutilassa",
      variant: "destructive"
    });
    return;
  }

  const selectedWithEmail = guests.filter(g => g.selected && g.email);
  
  if (selectedWithEmail.length === 0) {
    toast({
      title: "Ei sähköpostiosoitteita",
      description: "Valituilla vierailla ei ole sähköpostiosoitetta",
      variant: "destructive"
    });
    return;
  }

  const link = createGmailLink();
  
  // Kirjaa viesti lokiin
  try {
    await supabase.functions.invoke('log-message', {
      body: {
        password: getAdminPassword(),
        guestName: `${selectedWithEmail.length} vierasta (sähköposti)`,
        phone: '-',
        apartmentName: '-',
        templateName: selectedTemplateId === "free" ? "Vapaa viesti" : 
          templates.find(t => t.id === selectedTemplateId)?.name,
        messageContent: `Email BCC: ${selectedWithEmail.length} vastaanottajaa`
      }
    });
  } catch (error) {
    console.error('Error logging message:', error);
  }

  window.open(link, '_blank');
};
```

##### G) Näytä sähköpostiosoite vieraslistassa

Päivitetään vieraslistan tietorivillä näyttämään myös sähköposti (jos olemassa):

```typescript
<p className="text-xs text-muted-foreground">
  {formatDateRange(guest.arrival, guest.departure)} 
  {sendMethod === 'whatsapp' && guest.phone && ` • ${guest.phone}`}
  {sendMethod === 'email' && guest.email && ` • ${guest.email}`}
  {sendMethod === 'email' && !guest.email && (
    <span className="text-red-500"> • Ei sähköpostia</span>
  )}
</p>
```

---

### Käyttöliittymän flow

| Lähetystapa | Toiminto |
|-------------|----------|
| **WhatsApp** | Yksittäiset wa.me-linkit avautuvat viiveellä (nykyinen toiminta) |
| **Sähköposti** | Yksi Gmail-linkki, kaikki valitut BCC:ssä, TO: info@leville.net |

**Sähköpostin erityispiirteet:**
- Vastaanottajana (`to`) on aina `info@leville.net`
- Kaikki vieraiden sähköpostit menevät piilokopiona (`bcc`)
- Viestin personointimuuttujat ([NIMI] jne.) poistetaan koska massamaili
- Subjectiksi tulee templaten nimi

---

### Yhteenveto muutoksista

| Tiedosto | Muutos |
|----------|--------|
| `supabase/functions/get-current-guests/index.ts` | Lisää `email`-kenttä palautettaviin tietoihin |
| `src/components/admin/MessagingAdmin.tsx` | Lisää lähetystavan valinta, Gmail-linkin luonti, UI-muutokset |

---

### Tietosuoja

- Sähköpostiosoitteet käsitellään samalla tavalla kuin puhelinnumerot:
  - Eivät tallennu tietokantaan
  - Poistetaan automaattisesti 5 min kuluttua
  - Tyhjennetään komponentin unmountissa
- Viestilokiin ei tallenneta sähköpostiosoitteita, vain vastaanottajien lukumäärä

