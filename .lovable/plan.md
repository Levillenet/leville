

# Tikettiluonnin ja huoltoyhtiövälilehden yksinkertaistaminen

## Muutokset

### 1. Info-ikoni (ℹ) tiketin tyyppi -valintaan
Lisätään `Tooltip`-komponentti (Shadcn) Tyyppi-labeliin, jossa selitetään:
- **Kausihuolto**: Tehdään kauden vaihtuessa, ei muistutuksia
- **Hoidettava heti**: Muistutus joka aamu kunnes kuitattu
- **Vaihdon yhteydessä**: Muistutus asiakkaan lähtöpäivän aamusta eteenpäin, joka tyhjän päivän aamu ennen uuden asiakkaan saapumista

### 2. Poista "Ohjaa" (Korjaus/Siivous) -radionapit tikettiluonnista
Rivit 2613–2619: Poistetaan kokonaan assignment_type RadioGroup. Suorittajan alasvetovalikko näyttää kaikki yritykset ilman suodatusta.

### 3. Suorittajan dropdown näyttää kaikki yritykset
Rivi 2640: Poistetaan `.filter(c => ...)` joka suodattaa company_types mukaan. Näytetään kaikki yritykset ilman 🧹/🔧-ikonia (tai säilytetään molemmat ikonit jos yrityksellä on tyyppejä).

### 4. Poista Siivous/Korjaus -välilehdet tikettilistasta
Rivit 1615, 1627–1635, 2778–2794: Yhdistetään siivous ja korjaus yhdeksi "Avoimet"-välilehdeksi. Välilehdet: **Avoimet**, **Kausihuolto**, **Ratkaistut**.

### 5. Yksinkertaista Huoltoyhtiöt-välilehti
Rivit 2907–2923: Poistetaan Tyyppi-checkboxit (kiinteistöhuolto/siivous) yrityslomakkeesta.
Rivit 2938–2976: Poistetaan tyyppiryhmittely – näytetään kaikki yritykset yhdessä flat-listassa.

## Muutettavat tiedostot

| Tiedosto | Muutos |
|---|---|
| `src/components/admin/TicketAdmin.tsx` | Info-tooltip tyyppivalintaan; poistetaan Ohjaa-radiot ja company_type-suodatus; yhdistetään välilehdet; yksinkertaistetaan companies-tab |

