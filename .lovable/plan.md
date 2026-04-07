

# Tiketin sähköpostikentän vapauttaminen ja tikettien ryhmittely yhtiöittäin

## Ongelma 1: Sähköpostikenttä ei hyväksy vapaata syöttöä
"Ohjaa tiketti sähköpostiin" -kenttä käyttää `type="email"` HTML5-validointia, joka estää vapaan sähköpostiosoitteen syöttämisen jos selain hylkää sen. Muutetaan `type="text"` ja lisätään vain kevyt visuaalinen validointi.

## Ongelma 2: Monelle huoneistolle luodaan erillisiä tikettejä
Nykyinen logiikka luo for-loopissa yhden tiketin per huoneisto. Muutetaan niin, että huoneistot **ryhmitellään** ensin vastaanottavan huolto-/siivousyhtiön mukaan, ja luodaan **1 tiketti per yhtiö**. Tiketin `apartment_id`-kenttään tallennetaan yhtiön ensimmäinen huoneisto, ja `description`-kenttään lisätään listaus kaikista ko. yhtiön huoneistoista.

## Muutokset

### 1. `TicketAdmin.tsx` – Sähköpostikenttä
- Rivi 2090: Muutetaan `type="email"` → `type="text"` ja lisätään `placeholder="mikä tahansa sähköpostiosoite"`
- Oletussähköposti näytetään kentän alla infotekstinä kun email_override on tyhjä

### 2. `TicketAdmin.tsx` – `handleCreateTicket` ryhmittely
Nykyinen logiikka (rivi 567):
```
for (const aptId of apartmentIdsToCreate) { ... create one ticket ... }
```

Uusi logiikka:
1. Käydään kaikki valitut huoneistot läpi
2. Jokaisen kohdalla haetaan oikea vastaanottajan sähköposti `apartment_maintenance` + `maintenance_companies` -taulusta `assignment_type`-kentän mukaan
3. Ryhmitellään huoneistot vastaanottajan (company email / email_override) mukaan
4. Jokaiselle ryhmälle (= eri yhtiö) luodaan **yksi tiketti**, jossa:
   - `apartment_id` = ryhmän ensimmäinen huoneisto (tiketin pääkohde)
   - `description` = alkuperäinen kuvaus + lista kaikista ryhmän huoneistoista
   - Sähköposti menee kyseiselle yhtiölle
5. Jos käyttäjä on antanut manuaalisen `email_override`, kaikki menevät samalle → 1 tiketti

### 3. `TicketAdmin.tsx` – Luontipainikkeen teksti
Päivitetään painikkeen teksti dynaamisesti: jos useita huoneistoja, näytetään ryhmitelty määrä, esim. "Luo tiketti (3 huoneistoa, 2 yhtiölle)".

### 4. Edge function `manage-tickets/index.ts`
Ei suuria muutoksia – `create_ticket` toimii ennallaan. Ryhmittely tapahtuu UI-puolella. Valinnainen: lisätään `apartment_ids`-kenttä tiketin kuvaukseen listatuiksi huoneistoiksi.

## Tietokanta
Ei tietokantamuutoksia tarvita.

## Yhteenveto

| Kohde | Muutos |
|---|---|
| `TicketAdmin.tsx` rivi 2090 | `type="email"` → `type="text"` |
| `TicketAdmin.tsx` handleCreateTicket | Ryhmittely yhtiöittäin ennen luontia |
| `TicketAdmin.tsx` painikkeen teksti | Dynaaminen "X huoneistoa, Y yhtiölle" |

