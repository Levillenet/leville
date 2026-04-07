

# Oletussähköpostin näyttäminen tiketin luontilomakkeessa

## Ongelma

"Ohjaa tiketti sähköpostiin" -kenttä on tyhjä eikä näytä oletussähköpostia. Oletussähköposti näkyy vain pienellä tekstillä alla, ja sekin vain kun 1 huoneisto on valittu JA "Lähetä sähköposti-ilmoitus" on päällä. Käyttäjä ei näe mihin tiketti oletuksena ohjautuu.

## Ratkaisu

1. **Haetaan oletussähköposti aina** kun huoneisto valitaan – riippumatta siitä onko `send_email` päällä vai ei. Muutetaan `useEffect` (rivi 506-512) niin, ettei se vaadi `send_email`-ehtoa.

2. **Näytetään oletussähköposti kentän placeholder-tekstinä**: Kun `email_override` on tyhjä ja oletussähköposti on tiedossa, asetetaan se Input-kentän `placeholder`-arvoksi (esim. `placeholder="huolto@yritys.fi"`). Näin käyttäjä näkee suoraan kentässä mihin viesti menee.

3. **Useamman huoneiston tilanne**: Kun valittu >1 huoneisto, näytetään kentän alla teksti "Oletussähköposti määräytyy huoneiston mukaan" placeholder-tekstin sijaan.

4. **Käyttäjä voi kirjoittaa päälle**: Kenttä pysyy `type="text"` ja vapaasti muokattavana – kirjoitettu arvo ohittaa oletuksen.

## Muutokset

| Kohde | Muutos |
|---|---|
| `TicketAdmin.tsx` rivi 506-512 | Poistetaan `send_email`-ehto `checkEmail`-kutsusta |
| `TicketAdmin.tsx` rivi 2132 | Asetetaan `placeholder={emailPreview?.email \|\| "sähköpostiosoite"}` |
| `TicketAdmin.tsx` rivi 2133-2135 | Poistetaan erillinen "Oletus:"-teksti (koska placeholder hoitaa sen) |

