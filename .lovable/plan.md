# Äkkilähtöjen hintakorjaus: siivousmaksun tuplalisäys pois

## Ongelma
Moderin `/api/v1/prices`-rajapinnan palauttama jaksohinta sisältää siivouksen jo valmiiksi.
Sivu lisää siivousmaksun silti erikseen päälle, joten hinnat ovat liian korkeat:
- Glacier A5: näytetään 529 €, Moderissa 481 € (ero = 120 € siivous)
- Karhupirtti: näytetään 1062 €, Moderissa 990 € (ero = 220 € siivous)

Lisäksi alennukset lasketaan vain majoitusosasta ja siivous lisätään alentamattomana,
joten hinta ei vastaa Moderia millään laskutavalla.

## Nykyinen kaava (virheellinen)
```text
loppuhinta = pyöristys( ModerJaksohinta × (1 − perusalennus) × (1 − super%) × (1 − jakso%) + siivous )
alkuperäinen (yliviivattu) = ModerJaksohinta + siivous
```

## Uusi kaava (korjattu)
```text
loppuhinta = pyöristys( ModerJaksohinta × (1 − perusalennus) × (1 − super%) × (1 − jakso%) )
alkuperäinen (yliviivattu) = ModerJaksohinta
```

## Muutokset
1. **src/pages/Akkilahdot.tsx**
   - `getTotalPrice`: poistetaan `+ getCleaningFee(deal)` — Moder-hinta on lopullinen pohja.
   - `getOriginalApiPrice`: palauttaa pelkän Moder-jaksohinnan (ilman siivousta).
   - Hintaerittelyn tekstit: poistetaan/muutetaan siivoukseen viittaava rivi ("Price includes cleaning…") — hinta on nyt Moder-hinta miinus alennukset.
   - `getCleaningFee`-funktiota ei enää käytetä hinnassa; voidaan jättää poistamatta jos käytetään muualla, muuten poistetaan.
2. **src/components/admin/SkiPassAdmin.tsx** (äkkilähtöjen hintarivit adminissa)
   - `getCurrentDisplayPrice`: sama korjaus — siivousta ei lisätä Moder-hintaan.

## Ei muuteta
- Perusalennus 15 %, superäkkilähtö-portaat ja jaksoalennukset toimivat kuten ennen — ne lasketaan nyt koko Moder-jaksohinnasta (sis. siivouksen), mikä on haluttua.
- Moder-kyselyt, saatavuuslogiikka ja kalenteri pysyvät ennallaan.

## Tarkistus
- Selaintarkistus: A5 samalle jaksolle näyttää ~409 € (481 × 0,85) ja yliviivattuna 481 €; Karhupirtti ~842 € (990 × 0,85) ja yliviivattuna 990 €.
