# Korjaus: siivousmaksu hintatarkistus-työkaluun

## Tilanne

Asiakassivu `/akkilahdot` laskee jo oikein: Moderin jaksohinta + siivousmaksu (siivous lisätään täysimääräisenä alennusten jälkeen, alennukset koskevat vain majoitusosuutta).

Adminin hintatarkistus-työkalu sen sijaan asettaa siivousmaksuksi kovakoodatun nollan ja näyttää tekstin "Siivousmaksu sisältyy Moderin hintaan (ei lisätä erikseen)". Se on väärin: Moder palauttaa vain majoitushinnan, ja siivous lisätään aina päälle. Siksi työkalu näyttää eri (liian matalan) hinnan kuin asiakassivu.

## Korjaus

1. Työkalu käyttää kohteen oikeaa siivousmaksua (Moder-mappauksen `cleaning_fee`, joka tulee jo mukana tarkistuksen debug-datassa) nollan sijaan.
2. Virheellinen teksti korvataan laskelmarivillä: "Siivousmaksu +X €" osana erittelyä, ja alaviite kertoo että Moderin hinta on pelkkä majoitus ja siivous lisätään päälle.
3. Erittelystä näkee jatkossa: Moderin jaksohinta → perusalennus → superalennus → jaksoalennus → + siivousmaksu → loppusumma. Sama kuin asiakassivulla.

Tämän jälkeen työkalun luku täsmää asiakkaan näkemään hintaan.

## Tekniset yksityiskohdat

- `src/components/admin/DealsPriceCheck.tsx`: rivin 127 `const cleaningFee = 0` tilalle `debug?.cleaningFee ?? 0`; rivin 298 selite korvataan siivousmaksurivillä erittelyssä (`breakdown.cleaningFee`).
- `src/lib/dealPricing.ts` ja `src/pages/Akkilahdot.tsx` eivät muutu — laskenta on niissä jo oikein.
