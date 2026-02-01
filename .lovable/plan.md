

## Suunnitelma: Korjaa vieraiden hakusuodatus

### Ongelma

Edge function `get-current-guests` ei palauta yhtään vierasta, koska suodatuslogiikka on liian tiukka.

**Lokeista havaitut ongelmat:**

| Syy | Määrä |
|-----|-------|
| Status "new" (ei hyväksytä) | 14 varausta |
| Lähtee tänään | 8 varausta |
| Saapuu tänään ennen klo 17 | 8 varausta |
| Ei puhelinnumeroa | 6 varausta |
| **Yhteensä suodatettu pois** | **33/33** |

### Juurisyy

Beds24 API:n `status`-kenttä ei vastaa oletettua:
- Koodi hyväksyy: `confirmed` tai `1`
- API palauttaa: `new`, joka voi tarkoittaa uutta mutta vahvistettua varausta

### Korjaus

**Tiedosto:** `supabase/functions/get-current-guests/index.ts`

**Muutos rivit 82-86:**

```typescript
// ENNEN (liian tiukka):
if (booking.status && booking.status !== 'confirmed' && booking.status !== '1') {
  console.log(`Booking ${booking.id}: Status ${booking.status}, skipping`);
  return false;
}

// JÄLKEEN (hyväksy myös new ja 0):
const rejectedStatuses = ['cancelled', 'canceled', 'no-show', 'declined'];
if (booking.status && rejectedStatuses.includes(booking.status.toLowerCase())) {
  console.log(`Booking ${booking.id}: Status ${booking.status}, skipping`);
  return false;
}
```

### Logiikan muutos

**Vanha lähestymistapa:** Whitelist - hyväksy vain tietyt statukset
**Uusi lähestymistapa:** Blacklist - hylkää vain peruutetut/no-show varaukset

Tämä on turvallisempaa koska:
- Beds24 voi käyttää eri status-arvoja eri tilanteissa
- Uudet varaukset (`new`) ovat yleensä valideja
- Näytetään mieluummin liikaa kuin liian vähän (admin voi itse arvioida)

### Lisäparannus: Näytä suodatuksen syyt käyttöliittymässä

Lisätään API-vastaukseen debug-tietoa:

```typescript
return new Response(
  JSON.stringify({ 
    success: true, 
    guests: filteredGuests,
    fetchedAt: new Date().toISOString(),
    currentHour,
    today,
    debug: {
      totalBookings: bookings.length,
      filteredOut: {
        noPhone: noPhoneCount,
        departingToday: departingCount,
        arrivingBeforeFive: arrivingCount,
        rejectedStatus: rejectedCount
      }
    }
  }),
  { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
);
```

### Yhteenveto

| Tiedosto | Muutos |
|----------|--------|
| `supabase/functions/get-current-guests/index.ts` | Muuta status-suodatus blacklist-pohjaiseksi |

Korjauksen jälkeen ne 14 varausta joiden status on "new" tulevat näkyviin (jos niillä on puhelinnumero ja ne eivät ole tänään lähteviä/saapuvia ennen klo 17).

