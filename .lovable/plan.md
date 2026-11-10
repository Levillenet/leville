# Hakutrendit: miten kysyntä kehittyy ajan myötä

Nykyinen hakuraportti laskee yhteen kaikki haut valitulta ajalta. Lisätään sen rinnalle trendinäkymä, josta näkee, kasvaako tietyn majoitusviikon kysyntä vai hiipuu se.

## Mitä lisätään hallintapaneelin hakuraporttiin

1. **Trendisarake viikkotaulukkoon**
   - Trendi lasketaan päivätasolla: jokaiselle haetulle viikolle (esim. vko 8) näytetään haut tänään, eilen ja viimeisen 3 päivän keskiarvo verrattuna sitä edeltävien 7 päivän päiväkeskiarvoon (esim. "3,0/pv vs 1,4/pv, ↑ +114 %" vihreällä, laskeva punaisella).
   - Mukana pieni 14 päivän minikäyrä joka rivillä, josta näkee suunnan yhdellä silmäyksellä.
   - Taulukon voi järjestää "kuumenevat nyt" -järjestykseen, jotta hinnoittelua voi säätää heti. Hyvin pienillä määrillä (alle 3 hakua) nuolen sijaan näytetään "vähän dataa", ettei yksi haku näytä isolta nousulta.

2. **Viikon kehityskäyrä**
   - Kun klikkaat viikkoa (esim. vko 8), sen alle avautuu pieni pylväskaavio: montako hakua viikolle 8 tehtiin kunakin päivänä viimeisen 30/90 päivän aikana, sekä 7 päivän liukuva keskiarvo, joka tasoittaa päiväkohtaisen vaihtelun.

3. **Kokonaiskuva yläreunaan**
   - Kaikkien hakujen määrä päivittäin (käyrä), jotta näkee, johtuuko yksittäisen viikon nousu yleisestä liikenteen kasvusta vai juuri sen viikon kiinnostuksesta.

Nykyiset suodattimet (aikaväli, henkilömäärä) toimivat myös trendeissä. Yli 30 yön haut jätetään pois kuten nyt.

## Tekninen osuus
- `src/lib/searchDemand.ts`: uudet puhtaat funktiot `weekTrend(rows, now, guests)` (päiväkohtaiset luvut 14 pv; viimeiset 3 pv keskiarvo vs edeltävät 7 pv keskiarvo per majoitusviikko, Helsingin aikavyöhykkeen päivät) ja `dailySeries(rows, weekMonday|null, days)` (päiväkohtaiset luvut + 7 pv liukuva keskiarvo). Käyttää samaa `stayWeeks`-logiikkaa, jotta luvut täsmäävät taulukon kanssa.
- `SearchDemandAdmin.tsx`: trendisarake + lajittelu, klikattava rivi avaa kaavion. Kaavio kevyenä SVG:nä (ei rechartsia), eikä se vaikuta julkisiin sivuihin.
- Testit `scripts/`-kansioon: nousu/lasku-laskenta ja liukuva keskiarvo konkreettisilla luvuilla.
- Ei tietokantamuutoksia — data tallentuu jo.
