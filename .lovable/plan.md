# Äkkilähdöt: Moder-rajapinta, aukkoyöt ja haku

## Lähtötilanne (varmistettu)

- Vika ei ollut käyttöoikeuksissa vaan **vääriä huonetunnuksia** tietokannassa. Testasin antamasi 28 tunnusta suoraan Moderiin: kaikki palauttavat 200, myös yhdistetty haku kaikilla 28 kerralla.
- Väärät tunnukset (308–333) ja vieraat nimet (Tunturi, Immelrinne, Riekontie, Rantatähti, Karhunvartija A7/A8/C21/C22, Glacier A8/B8, Skistar 422/521/522/321/322) tulivat tammikuun 2026 migraatiosta, joka syötti tauluun vanhan testilistauksen.
- Oikea Beds24 ↔ Moder -vastaavuus löytyy jo koodista: `propertyDetails.ts` sisältää jokaisen kohteen Moder-varauslinkin. Tästä saadaan 26 paria, ja Moonlight 415 (2215) sekä Platinum Superior 2MH (5415) täydennetään listastasi. Yhteensä 28 — tunnuksia ei tarvitse arvata.
- Moderin saatavuusvastaus sisältää jo `day_rate`-kentän (hinta senteissä per yö) sekä `min_nights`, `checkin_denied` ja `checkout_denied`.

## 1. Kohdemappauksen korjaus

- Nollataan Moder-tunnus kaikilta nykyisiltä riveiltä, mutta **rivit jätetään paikoilleen** — tiketöinti hakee niistä kohteen nimen vanhoille tiketeille.
- Kirjoitetaan 28 nykyisen kohteen rivit oikeilla tunnuksilla, nimillä, henkilömäärillä ja siivousmaksuilla (arvot `propertyDetails.ts`:stä).
- Karhupirtin Beds24-tunnukseksi tulee koodin arvo `353045` (taulussa oli virheellinen `419423`).

## 2. Aukkoyöt kahden varauksen välissä

Nykyinen logiikka pudottaa pois kaikki jaksot, joiden pituus alittaa Moderin minimiyömäärän. Muutetaan tämä pyyntösi mukaisesti:

- Jokaiselle vapaalle jaksolle katsotaan, onko **sekä sitä edeltävä että sitä seuraava päivä varattu**.
- Jos on ja jakso jää minimiyömäärän alle, jakso merkitään **aukoksi** ja se näytetään täsmälleen sen pituisena (1 tai 2 yötä) — minimiyömäärä ohitetaan, koska aukkoa ei voi muuten myydä.
- Muissa tapauksissa näytetään vain minimiyömäärän täyttävät pituudet, kuten ennenkin.
- Lisäksi huomioidaan Moderin `checkin_denied` / `checkout_denied` -päivät: jaksoa ei tarjota alkavaksi tai päättyväksi kielletylle päivälle.

Aukkojaksot saavat oman merkintänsä kortissa (esim. "Vain tämä aukko – 2 yötä").

## 3. Hinnoittelu suoraan saatavuusvastauksesta

Nykyinen toteutus tekee erillisen hintakyselyn jokaiselle jaksolle ja jokaiselle pituudelle — 28 kohteella se olisi satoja peräkkäisiä kutsuja ja aikakatkaisu.

Siirrytään käyttämään saatavuusvastauksen `day_rate`-arvoja: koko kausi haetaan **yhdellä kutsulla**, ja minkä tahansa jakson hinta lasketaan yösummana. Tämä on Moderin oma vuorokausihinta, ja se on edellytys myös kohdan 4 vapaalle päivämäärähaulle.

Hintalogiikka pysyy sovittuna:
- Normaalihinta = Moderin yösumma + siivousmaksu
- Alennettu hinta = perusalennus (`deals_base_discount`), ja jaksokohtainen alennus päälle jos adminissa annettu

## 4. Haku ja listaus

Äkkilähtösivulle tulee kaksi tilaa:

- **Haku (oletus):** käyttäjä valitsee aikavälin (alkaa / päättyy) ja henkilömäärän. Tulokset ovat kyseiselle välille osuvia jaksoja, halvimmat ensin. Aikaväli esitäytetään seuraavalle kahdelle viikolle, jotta tuloksia näkyy heti.
- **Listaus:** nykyinen 2 / 3 / 4+ yötä -suodatin säilyy sellaisenaan vaihtoehtona.

Aukkoyöt näkyvät molemmissa tiloissa.

Etusivun hakubanneriin ei kosketa.

## Tekniset yksityiskohdat

- `moder_property_mapping`: data-päivitys (UPDATE + DELETE + INSERT), ei skeemamuutosta.
- `supabase/functions/moder-availability/index.ts`:
  - `DayInfo` saa `dayRate`-kentän; `parseAvailabilities` lukee `day_rate`.
  - `buildWindows` palauttaa yhtenäiset vapaat jaksot ja tiedon reunapäivien varaustilanteesta → `isGap`.
  - Erilliset `/api/v1/prices`-kutsut poistuvat; jakso palauttaa `rates`-kartan (päivä → €) sekä `noCheckIn` / `noCheckOut` -päivälistat.
  - Vastaus säilyttää nykyiset kentät (`roomId`, `checkIn`, `nights`, `cleaningFee`, `maxPersons`), joten mikään muu sivu ei rikkoudu.
- `src/pages/Akkilahdot.tsx`: hakutila + listaustila, jaksojen laskenta `rates`-kartasta, aukkomerkintä. Käännökset kaikille 7 kielelle.
- Tiketöinnin funktioihin (`manage-tickets`, `ticket-reminders`, `check-booking-changes`) ei kosketa.

## Varmistus

- Kutsutaan funktio `force_refresh=true` -parametrilla ja tarkistetaan, että jaksoja tulee useilta kohteilta ja että ainakin yksi aukkojakso löytyy.
- `/akkilahdot` selaimessa: haku palauttaa tuloksia, listaus toimii, hinnat ja yliviivaus näkyvät oikein.

## Muistutus

Perusalennus (`deals_base_discount`) on edelleen 0 %. Aseta se adminissa, niin alennettu hinta ja yliviivaus näkyvät korteissa.
