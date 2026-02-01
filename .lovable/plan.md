

## Suunnitelma: Asiakastietojen automaattinen tyhjennys

### Nykytilanne

| Data | Tallennus | Riski |
|------|-----------|-------|
| Vieraat (nimet, puhelimet) | React state | ✅ Ei riskiä - tyhjenee automaattisesti |
| Viestiloki (`message_logs`) | Tietokanta | ⚠️ Sisältää nimet ja puhelimet |

### Toteutettavat muutokset

#### 1. React-komponentin automaattinen tyhjennys (5 min timeout)

**Tiedosto:** `src/components/admin/MessagingAdmin.tsx`

Lisätään:
- **5 minuutin ajastin**: Kun vieraat haetaan, käynnistetään ajastin
- **Automaattinen tyhjennys**: 5 min jälkeen guests-state tyhjenee
- **Komponentin unmount**: Kun välilehti vaihdetaan tai sivu suljetaan, tiedot poistetaan välittömästi
- **Käyttäjälle ilmoitus**: Näytetään jäljellä oleva aika

```typescript
// Lisätään useEffect joka tyhjentää datan
useEffect(() => {
  if (guests.length === 0) return;
  
  const timer = setTimeout(() => {
    setGuests([]);
    toast({
      title: "Tiedot tyhjennetty",
      description: "Vierastiedot poistettu 5 min kuluttua tietosuojasyistä"
    });
  }, 5 * 60 * 1000); // 5 minuuttia
  
  return () => clearTimeout(timer);
}, [guests.length > 0]);

// Komponentin unmount tyhjentää datan
useEffect(() => {
  return () => setGuests([]);
}, []);
```

#### 2. Viestilokin automaattinen siivous

**Vaihtoehto A: Älä tallenna puhelinnumeroa lokiin**

Muokataan `log-message` edge functionia niin, että puhelinnumero korvataan osittaisella numerolla (esim. `+358*****567`).

**Vaihtoehto B: Automaattinen poisto 24h jälkeen**

Luodaan cron-job joka poistaa vanhat lokit:

```sql
-- Poista yli 24h vanhat lokit
DELETE FROM message_logs WHERE sent_at < NOW() - INTERVAL '24 hours';
```

#### 3. Käyttöliittymän indikaattori

Näytetään käyttäjälle:
- Jäljellä oleva aika ennen datan tyhjennystä
- Varoitus tietosuojasta
- "Tyhjennä nyt" -nappi manuaaliseen tyhjennykseen

```
┌────────────────────────────────────────────┐
│ 🔒 Vierastiedot poistetaan: 4:32 jäljellä  │
│    [Tyhjennä nyt]                          │
└────────────────────────────────────────────┘
```

---

### Yhteenveto muutoksista

| Tiedosto | Muutos |
|----------|--------|
| `src/components/admin/MessagingAdmin.tsx` | Lisää 5 min timeout, unmount-tyhjennys, countdown-näyttö |
| `supabase/functions/log-message/index.ts` | Maskaa puhelinnumero lokissa |
| Tietokantamigraatio (valinnainen) | Luo cron-job vanhojen lokien poistoon |

### Tietosuojahyödyt

- ✅ Vierastiedot eivät jää roikkumaan selaimeen
- ✅ Puhelinnumerot eivät tallennu selkokielisinä lokiin
- ✅ Vanhat lokit poistetaan automaattisesti
- ✅ Käyttäjä näkee selkeästi milloin tiedot poistetaan

