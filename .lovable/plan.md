# Äkkilähdöt: esimerkkijaksot ja 1 yön hinnoittelu

## 1. "Esimerkkejä vapaista jaksoista" -nosto

Sivulla ei edelleenkään ole varsinaista listausta (hinnat haetaan vain kalenterihaulla), mutta kalenterin alle lisätään markkinoinnillinen nosto:

- Näytetään **10 seuraavaa vapaata jaksoa** eri kohteissa (taustapalvelun jo palauttamat vapaat ikkunat, järjestys saapumispäivän mukaan, korkeintaan 1–2 jaksoa per kohde jotta lista on monipuolinen).
- Jokainen kortti: kohteen markkinointinimi, päivämäärät, yömäärä. **Ei hintaa** — hinta saadaan vasta oikealla Moder-kyselyllä.
- Otsikko ja selite selvästi: "Esimerkkejä vapaista jaksoista — tee haku ja löydä omasi!" (käännökset kaikille 7 kielelle).
- Kortin klikkaus **täyttää kalenterivalinnan** kyseisellä jaksolla ja käynnistää haun, jolloin oikeat hinnat ja alennukset haetaan Moderista.
- Nosto näkyy vain kun hakua ei ole tehty (`!searchActive`) ja korvaa nykyisen "Valitse ajanjakso" -tekstin.

## 2. 1 yön hinta = Moderin 2 yön hinta

Moderissa yhdelle yölle ei yleensä ole omaa hintaa, joten yhden yön kyselyn palauttama arvo on epäluotettava.

- Kun haettu jakso on **tasan 1 yö**, hintalähteeksi otetaan Moderin **2 yön hinta** samalle saapumispäivälle.
- Tämä tehdään taustapalvelussa (`mode=prices`), jotta sekä julkinen sivu että adminin esikatselu saavat saman hinnan.
- Alennukset ja siivousmaksu lasketaan normaalisti tästä hinnasta; nykyinen asetus "Anna alennus myös 1 yön varauksille" toimii ennallaan.

## Tekniset yksityiskohdat

- `supabase/functions/moder-availability/index.ts`: `mode=prices` -haarassa jos `daysBetween(from,to) === 1`, kysytään hinnat välille `from … from+2` ja palautetaan ne (`nightsUsed: 2` vastaukseen lokitusta/varmistusta varten). Sama sääntö listauksen `pricesByNights["1"] = pricesByNights["2"]`.
- `src/pages/Akkilahdot.tsx`: uusi `exampleWindows`-memo (`allDeals` → suodatus `checkIn <= maxCheckInIso`, lajittelu, dedupe roomId:n mukaan, `slice(0, 10)`), uusi esimerkkikorttien grid ja klikkaus, joka asettaa `searchCheckIn` / `searchCheckOut`.
- Uudet käännösavaimet `extraLabels`-objektiin (otsikko, selite, "Tee haku").
- Varmistus: `tsgo --noEmit` puhtaana ja Playwright-tarkistus `/akkilahdot` (esimerkkikortti → haku → hinta näkyy).
