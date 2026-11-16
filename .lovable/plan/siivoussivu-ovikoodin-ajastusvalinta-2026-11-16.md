# Siivoussivu: ovikoodin ajastusvalinta

Muutetaan vain tiedostoa `public/siivous.html`. Muu sivu pysyy ennallaan.

## Muutokset

1. **Kuittauspyyntö (`confirm`)**: pyyntöön lisätään aina `ask: true`. Jos käyttäjä on valinnut lähetystavan, mukaan tulee myös `mode: 'now'` tai `mode: 'later'`. Tämä koskee sekä "Kaikki kunnossa – Lähetä koodi"- että "Siivous tehty" -painiketta. Lähetystavan valinta tehdään uusilla painikkeilla (kohta 2).

2. **Uusi tila `askTime`** (`r.at`, esim. "12:00"):
   - Näytetään teksti: "Siivous valmis ennen klo 12. Lähetetäänkö ovikoodi vieraalle nyt vai ajastetaanko klo " + r.at + "?"
   - Kaksi isoa painiketta samalla tyylillä kuin nykyinen Valmis-painike (`button.go`):
     - "Lähetä koodi nyt" lähettää `confirm`-pyynnön samalla huoneistolla ja PINillä sekä `mode: 'now'`.
     - "Ajasta klo " + r.at lähettää vastaavan pyynnön, jossa on `mode: 'later'`.
   - Klikattu painike muuttuu harmaaksi ja näyttää "Odota…", kuten nykyiset painikkeet. Molemmat painikkeet poistetaan käytöstä, jottei koodia lähetetä kahdesti. Vastaus käsitellään samalla onConfirm-toiminnolla.

3. **Uusi tila `scheduled`**: näytetään vihreä ok-laatikko, otsikkona "Ajastettu · Scheduled" ja tekstinä "Siivous kirjattu. Ovikoodi lähtee vieraalle automaattisesti klo " + r.at + "."

4. **Tila `sent` ja muut nykyiset tilat** säilyvät täysin ennallaan.

## Tekniset yksityiskohdat
- `run()` saa valinnaisen neljännen argumentin `mode`. `confirm`-kutsun data on `{ slug, pin, ask: true }`, ja siihen lisätään `mode`, kun se on annettu.
- `askTime`-näkymä rakennetaan dynaamisesti `#status`-laatikon alle omaan säiliöönsä (`.stack`), joka tyhjennetään, kun seuraava vastaus tulee.
- Apps Script -puoli (`ask`/`mode`-käsittely, ajastus) ei kuulu tähän muutokseen.
