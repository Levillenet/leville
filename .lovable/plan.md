# Cloud-kulujen lähteet ja niiden pienentäminen (Leville.net)

## Mitä mittauksista löytyi

Tämä projekti on ainoa, jonka backendin sisällön näen. Kolme asiaa kerryttää Cloud-kulua:

1. **Tietokannan koko: 829 MB** (public-skeema 267 MB, loput järjestelmä/WAL/indeksit).
   Suurin yksittäinen taulu on `heat_pump_history`: **842 209 riviä / 163 MB** ja se kasvaa jatkuvasti, koska mitään vanhenemissääntöä ei ole.
2. **Ajastetut työt (pg_cron), 9 kpl aktiivisena.** Kaksi niistä ajetaan **joka minuutti**:
   - `autoresponder-poll-every-min` (* * * * *) → ~43 200 ajoa/kk
   - `send-worklist-check` (* * * * *) → ~43 200 ajoa/kk
   - `melcloud-cron-job` (*/5) → ~8 600 ajoa/kk
   Yhteensä ~95 000 taustakutsua kuukaudessa, vaikka suurin osa niistä ei löydä mitään tekemistä.
3. **Instanssin jatkuva käynnissäolo** — kiinteä osuus, jota ei voi poistaa, mutta jonka kokoluokka riippuu kuormasta (ks. yllä).

Loki näyttää, että käyttäjäliikenteen aiheuttamia edge-funktiokutsuja oli vain ~40 vuorokaudessa — **sivuston kävijät eivät ole kulun syy, vaan taustaprosessit ja datan kertyminen.**

## Ehdotettu toimenpidelista

### 1. Lämpöpumppuhistorian siivous ja säilytysraja
- Poistetaan `heat_pump_history` -rivit, jotka ovat yli 90 päivää vanhoja.
- Lisätään päivittäinen siivousajo, joka pitää taulun tuossa rajassa.
- Ajetaan siivouksen jälkeen tilan palautus, jotta levytila oikeasti vapautuu.
- Arvioitu vaikutus: 163 MB → alle 30 MB, koko tietokanta noin 700 MB:iin.

### 2. Minuuttiajastusten harventaminen
- `autoresponder-poll-every-min`: joka minuutti → **joka 5. minuutti** (viesteihin vastataan yhä alle 5 min viiveellä).
- `send-worklist-check`: joka minuutti → **joka 15. minuutti** (työlista ei ole reaaliaikakriittinen).
- `melcloud-cron-job`: säilyy 5 minuutin välein, koska lämmityksen turvalogiikka nojaa siihen.
- Arvioitu vaikutus: ~95 000 → ~23 000 taustakutsua/kk (−75 %).

### 3. Yöllisten ajojen keventäminen
- `check-booking-changes-hourly` ajaa nyt 15 kertaa päivässä (5–19). Jätetään ennalleen, ellet halua sitä 2 tunnin välein.
- `ticket-reminders-hourly` ajaa 24 kertaa päivässä; rajataan **klo 6–20**, koska muistutuksia ei lähetetä yöllä.

### 4. Seuranta
- Lisätään ylläpitonäkymään pieni "tietokannan koko ja suurimmat taulut" -lukema, jotta kasvun näkee ilman minua. (Valinnainen — kerro jos haluat tämän mukaan.)

## Mitä EI muuteta
- Sivuston sisältöön, ulkoasuun tai SEO:hon ei kosketa.
- `page_views` (12 MB) säilytetään toistaiseksi rajoituksetta, kuten aiemmin on sovittu.
- Yhtään edge-funktiota ei poisteta.

## Tekniset yksityiskohdat
- Migraatio: `DELETE FROM public.heat_pump_history WHERE created_at < now() - interval '90 days'` erissä + uusi cron-työ `heat-pump-history-cleanup` (0 3 * * *).
- Cron-muutokset tehdään `cron.unschedule` + `cron.schedule` -pareilla samassa migraatiossa; funktioiden koodiin ei kosketa.
- Indeksi `heat_pump_history(created_at)` varmistetaan, jotta siivous on nopea.

## Huomio kulujen seurannasta
En näe Cloud-saldon euromääräistä erittelyä työkaluista, enkä muiden projektiesi backendejä. Jos 20 $/kk toistuu näiden muutosten jälkeenkin, kulu tulee todennäköisesti toisesta projektista — se pitää tarkistaa kohdasta Settings → Cloud & AI balance projektikohtaisesti.
