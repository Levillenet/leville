# Äkkilähdöt: yösuodatin 2–7 ja ajanjaksovalitsin yhdessä kalenterissa

## 1. Listauksen yösuodatin: 2, 3, 4, 5, 6, 7 yötä

Tiedosto: `src/pages/Akkilahdot.tsx`

- **Nykyinen bugi**: "4+ yötä" -valinta näyttää vain tasan 4 yön jaksot, koska `requiredNights`-logiikka ja ikkunoiden leikkaus (`windowNights` max 7) suodattavat pidemmät pois.
- **Uusi suodatin**: ToggleGroup-painikkeet 2, 3, 4, 5, 6, 7 (yötä). Semantiikka: **vähintään N yötä** — valinta "4" näyttää kaikki jaksot, joihin mahtuu vähintään 4 yötä (ikkunan pituus ≥ 4 JA Moderin minimiyöt ≤ 4). Varausten väliin jäävät aukkoikkunat (gap) näytetään aina kuten nykyisin.
- `NightFilter`-tyyppi laajennetaan arvoihin "2"–"7".
- Käännökset: korvataan `filter4plus` kentät `filterNights`-funktiolla/muodolla kaikissa 7 kielessä (fi: "4 yötä", en: "4 nights", sv/de/es/fr/nl vastaavat).

## 2. Hakuwidgetin kalenteri: yksi ikkuna, range-valinta

Tiedosto: `src/pages/Akkilahdot.tsx` (hakuwidget rivit ~859–928)

- Kaksi erillistä Popover-kalenteria korvataan **yhdellä painikkeella**, joka näyttää molemmat päivät (esim. "12.9. – 15.9." tai "Valitse ajanjakso").
- Painike avaa yhden Popoverin, jonka kalenteri on `mode="range"` (react-day-picker / shadcn Calendar):
  - 1. painallus = saapumispäivä
  - 2. painallus = lähtöpäivä (jakso korostuu visuaalisesti kalenterissa)
  - 3. painallus = aloittaa uuden jaksón (uusi saapumispäivä)
  - 4. painallus = uusi lähtöpäivä
- Menneet päivät estetään (`disabled`). Kalenterin wrapperiin `p-3 pointer-events-auto`.
- Kalenteri saattaa sulkeutua valinnan jälkeen automaattisesti — varmistetaan, että Popover pysyy auki kunnes jakso on valmis (ohjataan `open`-tilaa tarvittaessa).
- Tuloslaskuri (`searchResults (N)`) ja `searchItems`-logiikka pysyvät ennallaan; vain syöttötapa muuttuu.

## Varmistus

- `tsgo --noEmit` puhtaana.
- Playwright-tarkistus `/akkilahdot`: range-kalenteri toimii (alku → loppu → uusi alku), suodatin 2–7 näyttää oikeat määrät, "4" sisältää myös 5–7 yön jaksot.
