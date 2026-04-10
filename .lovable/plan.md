

# Huoneistojen allokointi kiinteistöille + kiinteistöittäin ryhmitelty raportti

## Nykytila
- `apartment_maintenance`-taulu on olemassa ja siinä on `property_id`-kenttä, mutta se ei ole käytössä
- `getPropertyForApt()` palauttaa aina `null` → kiinteistöraportti laittaa kaiken "Määrittelemätön kiinteistö" alle
- Kiinteistöt-välilehti näyttää vain kiinteistöjen tiedot, mutta huoneistojen allokointia ei ole

## Muutokset

### 1. Kiinteistöt-välilehti: huoneistoallokointi-UI
- Jokaisen kiinteistökortin alle lisätään lista allokoiduista huoneistoista
- Lisätään "Lisää huoneisto" -painike, joka avaa valikon vapaista (ei vielä allokoiduista) huoneistoista
- Huoneiston voi poistaa kiinteistöltä roskakorikuvakkeella
- Ladataan `apartment_maintenance`-taulun data frontendiin

### 2. Edge function: apartment_maintenance CRUD
`manage-tickets`-funktioon lisätään kaksi uutta actionia:
- `assign_apartment_to_property`: upsert `apartment_maintenance`-tauluun (apartment_id + property_id)
- `unassign_apartment_from_property`: poistaa property_id:n apartment_maintenance-riviltä

### 3. getPropertyForApt() -funktio
- Päivitetään käyttämään ladattua `apartment_maintenance`-dataa → palauttaa oikean kiinteistön
- Tämä korjaa automaattisesti kiinteistöraportin ryhmittelyn

### 4. Kausihuoltoraportti kiinteistöittäin
- `createPropertyReportPdf` toimii jo nyt oikein rakenteeltaan (ryhmittelee kiinteistö → huoneisto → kategoria)
- Kun `getPropertyForApt` alkaa palauttaa oikeita arvoja, multi-apartment-tiketit jakautuvat kiinteistöittäin oikein
- **Lisämuutos**: multi-apartment-tiketeissä (esim. IV-koneiden puhdistus) raportti näyttää kunkin huoneiston oman kiinteistön alla, ei koko tikettiä yhtenä ryhmänä
  - Luetaan `ticket_apartments`-data ja jaetaan tiketti kiinteistöittäin niin, että Glacier-huoneistot näkyvät Glacierin alla ja Skistar-huoneistot Skistarin alla

### 5. Kausihuoltoraportin PDF-suodatin
- Lisätään kiinteistösuodatin kausihuoltoraportin dialogiin (valitse kiinteistö → tulostaa vain sen kiinteistön huoneistojen tiketit)

## Muutettavat tiedostot
| Tiedosto | Muutos |
|---|---|
| `supabase/functions/manage-tickets/index.ts` | Uudet actionit: assign/unassign apartment to property + list_apartment_assignments |
| `src/components/admin/TicketAdmin.tsx` | Kiinteistöt-tab: allokointiUI, fetchApartmentAssignments, getPropertyForApt korjaus, kausihuolto-PDF ryhmittely multi-apartment-tiketeille |

