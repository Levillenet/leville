

# Huoltoyhtiöt – kohteiden liitoslogiikan korjaus

## Ongelma

Nykyinen `apartment_maintenance`-taulu linkittää huoneiston yritykseen **yhdellä rivillä** ilman tietoa roolista (kiinteistöhuolto / siivous). Kun yritys näkyy molemmissa kategorioissa, sama rivi näkyy kummassakin. Poistaminen yhdestä poistaa koko rivin → häviää molemmista.

Lisäksi ei ole estettä sille, että sama huoneisto olisi kahdella eri yrityksellä samassa roolissa.

## Ratkaisu

### 1. Tietokantamuutos (migraatio)

Lisätään `apartment_maintenance`-tauluun `assignment_type`-sarake:
- Tyyppi: `text`, oletusarvo `'kiinteistohuolto'`
- Nykyiset rivit saavat oletusarvon
- Lisätään UNIQUE-rajoite: `(apartment_id, assignment_type)` → sama huoneisto voi olla vain yhdellä yrityksellä per rooli

Kun yrityksellä on molemmat tyypit ja huoneisto liitetään, luodaan **erilliset rivit** molemmille rooleille.

### 2. Edge Function (`manage-tickets/index.ts`)

**`assign_apartment`**: Vastaanottaa uuden `assignment_type`-kentän ja tallentaa sen.

**`unassign_apartment`**: Pysyy ennallaan (poistaa ID:n perusteella – nyt poistaa vain yhden roolin rivin).

### 3. UI (`TicketAdmin.tsx`)

Huoltoyhtiöt-välilehden renderöinti muuttuu:
- Kun yritys näkyy "Kiinteistöhuolto"-osion alla, näytetään ja hallitaan vain `assignment_type = 'kiinteistohuolto'` rivejä
- Kun sama yritys näkyy "Siivous"-osion alla, hallitaan vain `assignment_type = 'siivous'` rivejä
- Checkbox-klikkaus luo/poistaa rivin oikealla `assignment_type`-arvolla
- Jos huoneisto on **jo liitetty toiselle yritykselle samassa roolissa**, checkbox on disabloitu ja näyttää kenen alla se on

### Yhteenveto muutoksista

| Tiedosto | Muutos |
|---|---|
| Migraatio (SQL) | Lisää `assignment_type` sarake + UNIQUE constraint |
| `manage-tickets/index.ts` | `assign_apartment` tallentaa `assignment_type` |
| `TicketAdmin.tsx` | Suodattaa assignments `assignment_type`:n mukaan per osio, estää duplikaatit |

