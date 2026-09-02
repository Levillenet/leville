# Äkkilähdöt: esimerkkit täysinä tarjouskortteina hintoineen

## Tavoite
"Esimerkkejä vapaista jaksoista" -nosto näytetään samanlaisina täysinä tarjouskortteina kuin varsinaiset hakutulokset: ÄKKILÄHTÖ TARJOUS -merkki, päivämäärät, markkinointinimi, yöt ja henkilömäärä, yliviivattu alkuperäishinta, alennettu hinta ja alennusprosentti, siivousteksti sekä Varaa WhatsAppilla -painike. Tämä tekee etusivunäkymästä kaupallisemman.

## Mitä muutetaan (vain `src/pages/Akkilahdot.tsx`)

1. **Korttimarkupin uudelleenkäyttö**
   - Nykyinen hakutulosten korttirenderöinti (Deals Grid, rivit ~1090–1320) irrotetaan yhdeksi `renderDealCard(deal, stayCheckIn, displayNights, quoted, index)` -apufunktioksi komponentin sisällä.
   - Samaa funktiota käyttävät sekä hakutulosten gridi että esimerkkinosto — ei kaksinkertaista korttikoodia, ulkoasu pysyy aina synkassa.

2. **Esimerkkinoston renderöinti täysinä kortteina**
   - Nykyinen pieni tekstikorttiruudukko (rivit ~989–1008) korvataan samalla `grid md:grid-cols-2 lg:grid-cols-3 gap-6` -asettelulla, jossa jokainen esimerkki renderöidään `renderDealCard(w.deal, w.checkIn, w.nights, undefined)` -kutsulla.
   - Hinnat tulevat valmiista `pricesByNights`-datasta (listauksen yhteydessä haettu Moder-hinta per yömäärä): esimerkin `checkIn` on aina jakson alku ja `nights` ≤ 7, joten `getModerPrice` ja `getTotalPrice` palauttavat oikeat alennetut hinnat ilman uusia rajapintakutsuja. Jos hintaa ei jostain jaksossa ole, kortti näyttää nykyisen "kysy hintaa" -varalogiikan kuten hakutuloksissakin.
   - Otsikko ja alateksti (`ex.heading` / `ex.note`) säilyvät korttiruudukon yläpuolella. Pienen kortin klikkaus-toiminto (kalenterin esitäyttö) poistuu, koska kortissa on nyt oikea varauspainike — sama kuin hakutuloksissa.

3. **Ei muita muutoksia**
   - Edge-funktioon, asetuksiin, admin-näkymiin tai käännöksiin ei kosketa. Esimerkkien valintalogiikka (max 2/kohde, 10 kpl, aikajärjestys) pysyy ennallaan.

## Varmistus
- `npx tsgo --noEmit` puhtaana.
- Playwright-tarkistus `/akkilahdot`: esimerkkinäkymä näyttää täydet kortit hintoineen, ja kalenterihaun tuloskortit toimivat edelleen samoin.
