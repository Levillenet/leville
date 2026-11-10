# Hakutrendit: miten kysyntä kehittyy ajan myötä

Nykyinen hakuraportti laskee yhteen kaikki haut valitulta ajalta. Lisätään sen rinnalle trendinäkymä, josta näkee, kasvaako tietyn majoitusviikon kysyntä vai hiipuu se.

## Mitä lisätään hallintapaneelin hakuraporttiin

1. **Trendisarake viikkotaulukkoon**
   - Jokaiselle haetulle viikolle (esim. vko 8) näytetään: haut viimeisen 7 päivän aikana vs. sitä edeltävät 7 päivää, ja muutos (esim. "12 → 19, +58 % ↑" vihreällä, laskeva punaisella).
   - Taulukon voi järjestää "nousijat ensin", jolloin kuumenevat viikot näkyvät heti.

2. **Viikon kehityskäyrä**
   - Kun klikkaat viikkoa (esim. vko 8), sen alle avautuu pieni pylväskaavio: montako hakua viikolle 8 tehtiin kunakin päivänä viimeisen 30/90 päivän aikana, sekä 7 päivän liukuva keskiarvo, joka tasoittaa päiväkohtaisen vaihtelun.

3. **Kokonaiskuva yläreunaan**
   - Kaikkien hakujen määrä päivittäin (käyrä), jotta näkee, johtuuko yksittäisen viikon nousu yleisestä liikenteen kasvusta vai juuri sen viikon kiinnostuksesta.

Nykyiset suodattimet (aikaväli, henkilömäärä) toimivat myös trendeissä. Yli 30 yön haut jätetään pois kuten nyt.

## Tekninen osuus
- `src/lib/searchDemand.ts`: uudet puhtaat funktiot `weekTrend(rows, now, guests)` (7 pv vs edelliset 7 pv per majoitusviikko) ja `dailySeries(rows, weekMonday|null, days)` (päiväkohtaiset luvut + 7 pv liukuva keskiarvo). Käyttää samaa `stayWeeks`-logiikkaa, jotta luvut täsmäävät taulukon kanssa.
- `SearchDemandAdmin.tsx`: trendisarake + lajittelu, klikattava rivi avaa kaavion. Kaavio kevyenä SVG:nä (ei rechartsia), eikä se vaikuta julkisiin sivuihin.
- Testit `scripts/`-kansioon: nousu/lasku-laskenta ja liukuva keskiarvo konkreettisilla luvuilla.
- Ei tietokantamuutoksia — data tallentuu jo.
