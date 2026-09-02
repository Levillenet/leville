# Äkkilähdöt: asiakas valitsee esimerkkijaksojen alkupäivän

## Mitä tehdään

"Esimerkkejä vapaista jaksoista" -osion yhteyteen lisätään pieni päivävalitsin: **"Näytä vapaita jaksoja alkaen"**.

- Oletuksena esimerkit näytetään kuten nyt (tästä päivästä eteenpäin).
- Asiakas voi valita kalenterista päivän, jolloin esimerkkikortit suodatetaan näyttämään vain jaksot, joiden **saapumispäivä on valittuna päivänä tai sen jälkeen**.
- Valinnan voi tyhjentää (paluu oletukseen) pienellä "Tyhjennä" / x-painikkeella.
- Valitsin näkyy vain kun hakua ei ole tehty ja esimerkkejä on näkyvissä (sama ehto kuin nykyisellä osiolla).
- Valittu päivä rajoitetaan: ei menneitä päiviä, ei myöhemmin kuin `maxCheckInIso` (deals_days_ahead -raja), koska sen jälkeen ei ole jaksoja näytettävissä.
- Tekstit käännetään kaikille 7 kielelle (fi/en/sv/de/es/fr/nl): label "Näytä jaksoja alkaen" tms.

## Tekniset yksityiskohdat

- `src/pages/Akkilahdot.tsx`:
  - Uusi tila `exampleStartIso: string | null`.
  - `exampleWindows`-memoon lisätään suodatus `deal.checkIn >= exampleStartIso` kun valittu; dedupe/leikkauslogiikka ennallaan.
  - Esimerkkiosion otsikon viereen/alle pieni Popover + yhden kuukauden `mode="single"` Calendar (`weekStartsOn={1}`, `disabled`: päivät < tänään tai > maxCheckInIso), nappi näyttää valitun päivän tai label-tekstin. Tyhjennys-painike nollaa tilan.
  - Uudet käännösavaimet `exampleLabels`-objektiin: `fromLabel`, `clear`.

## Varmistus

- `tsgo --noEmit` puhtaana.
- Playwright-tarkistus `/akkilahdot`: valitaan alkupäivä tulevaisuuteen → esimerkkikortit päivittyvät (kaikki saapumispäivät ≥ valinta), tyhjennys palauttaa oletuksen.
