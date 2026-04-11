

# Muistutuslogiikan uudistus

## Nykytila
Nykyinen logiikka perustuu "tyhjiin öihin" (Beds24 availability) ja lähettää yksittäisiä muistutuksia per tiketti. Ei kokoa samalle suorittajalle meneviä viestejä yhteen.

## Uusi logiikka

### Muistutussäännöt

1. **Hoidettava heti (urgent)**: Muistutus joka aamu klo ~07:00 kunnes kuitattu. Ei tarvitse tarkistaa tyhjiä öitä — muistutetaan aina.

2. **Vaihdon yhteydessä (changeover)**: Ensimmäinen muistutus samana aamuna kun asiakas lähtee (`guest_departure_date`). Sen jälkeen joka aamu (tyhjät päivät ennen seuraavan asiakkaan saapumista). Loppuu kun kuitattu tai uusi asiakas saapuu. Jatkuu uudelleen seuraavassa vaihdossa.

3. **Kausihuolto (seasonal)**: Ei muistutuksia (jo toteutettu).

### Viestien kokoaminen (digest)

Samalle vastaanottajalle (sama `maintenance_company_id` tai sama `email_override`) menevät tiketit kootaan yhteen sähköpostiin:

- Viestissä selkeä jako: **🔴 HOIDETTAVA HETI** -osio ja **🔄 VAIHDON YHTEYDESSÄ** -osio
- Jokaiselle tiketille näytetään: kohde, otsikko, kuvaus, kuittauslinkki
- Changeover-tiketeille: asiakkaan lähtöpäivä ja seuraavan saapumispäivä
- Urgent-tiketeille: korostettu "Hoidettava mahdollisimman pian"

### Toteutus — `ticket-reminders/index.ts`

**PART 2 kirjoitetaan kokonaan uusiksi:**

1. Hae kaikki avoimet `urgent` ja `changeover` -tiketit (ei seasonal)
2. Urgent: muistutetaan aina aamuajossa (ei Beds24-tarkistusta)
3. Changeover: tarkista onko tänään >= `guest_departure_date` JA tänään < `next_guest_arrival_date` (tai ei seuraavaa saapumista). Jos useita kohteita (`ticket_apartments`), tarkista per-apartment.
4. Ryhmittele muistutettavat tiketit vastaanottajan mukaan (`email` → tickets[])
5. Tarkista ettei samalle vastaanottajalle ole jo lähetetty tänään (yksi rivi per vastaanottaja riittää)
6. Lähetä yksi koostettu sähköposti per vastaanottaja
7. Sähköpostin rakenne:
   - Otsikko: `[Leville Muistutus] X avointa tehtävää`
   - 🔴 HOIDETTAVA HETI -osio (urgent-tiketit)
   - 🔄 VAIHDON YHTEYDESSÄ -osio (changeover-tiketit) + lähtö/saapumistiedot
   - Kuittauslinkit per tiketti/kohde

**PART 1 (scheduled reminders)**: Säilytetään manuaaliset ajastetut muistutukset ennallaan.

## Muutettavat tiedostot

| Tiedosto | Muutos |
|---|---|
| `supabase/functions/ticket-reminders/index.ts` | PART 2 uusiksi: urgent=joka aamu, changeover=vaihdon aamusta eteenpäin, digest per vastaanottaja |

