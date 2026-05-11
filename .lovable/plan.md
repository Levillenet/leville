## Mitä tutkimus paljasti

Tein analyysin tuotantodatasta. Tilanne ei ole niin paha kuin pyynnössä oletettiin, mutta **luokittelu on rikki** ja siksi `booking-link` näyttää tyhjältä.

**Viimeisen 2 kk klikit (yhteensä 721, ei 347):**
- `/event/booking-link`: 381
- `/event/booking-search-widget`: 240 (Moder-widgetin hakupainike)
- `/event/booking-sticky-bar`: 69
- `/event/booking-page-cta`: 31

**Miksi /opas/kesa-levi (635 näyttöä) ja /revontulet (410 näyttöä) eivät tuota `booking-link`-eventtejä:**
Niiltä TULEE klikkejä – mutta ne menevät bucketeihin `booking-page-cta` ja `booking-sticky-bar`, koska `PageViewTracker.tsx`-globaalihandler luokittelee linkin ankkurin DOM-puun mukaan:

```text
jos anchor inside .fixed.bottom-0     → booking-sticky-bar
jos anchor inside <section> + .rounded-2xl → booking-page-cta
muuten                                 → booking-link
```

Lähes kaikki sisältösivujen CTA:t ovat `<section class="...rounded-2xl">` -wrapperin sisällä → luokitellaan `booking-page-cta`:ksi, eivät `booking-link`. Logiikka on hauras: jos Tailwind-luokat vaihtuvat tai joku kääre poistetaan, koko luokittelu liukuu.

**Itse tracking-mekanismi toimii** – globaali capture-vaiheen click-listener nappaa kaikki `app.moder.fi` -linkit eikä ole rikki. `window.trackEvent`-funktiota ei ole olemassa, eikä sitä kannata luoda.

## Mitä tehdään

1. **Yksinkertaista PageViewTracker-handler** – yksi yhteinen `/event/booking-link` kaikille app.moder.fi-klikeille (käyttäjän vastaus: "Yksi 'booking-link' kaikille"). Säilytetään `booking-search-widget` erillään (eri elementti, ei `<a>`).

2. **Säilytä erottelu sticky-bar / muut** kevyemmällä logiikalla: tarkista anchorin `data-booking-source`-attribuutti. Jos puuttuu, oletus = `booking-link`. StickyBookingBar saa `data-booking-source="sticky-bar"`. (Valinnainen pieni lisä, mahdollistaa tulevan eriyttämisen ilman luokkamatchausta.)

3. **Lisää keepalive-fallback** – nykyinen `supabase.from('page_views').insert()` ei käytä `keepalive`-flagia. Korvataan booking-konversion lähetys kevyellä `fetch(... , { keepalive: true })` -kutsulla suoraan REST-endpointiin (kuten engagement-flush jo tekee). Tämä parantaa luotettavuutta erityisesti mobiilissa kun selain vaihtaa tabia tai uusi tab nappaa fokuksen.

4. **Älä koske komponenttitiedostoihin** – ei tarvita onClickeja 20 tiedostoon. Globaali handler tekee saman, ja vähemmillä virheillä.

5. **Migraatio päivätietoon** ei tarvita – `page_views`-taulu ja eventti-poludet pysyvät samoina. Vanhat `booking-page-cta` / `booking-sticky-bar` -rivit säilyvät historiassa; uudet menevät `booking-link`-bucketiin.

## Muutettavat tiedostot

- `src/components/PageViewTracker.tsx` – yksinkertaista `handleClick`, käytä `keepalive: true` fetchiä booking-konversiolle.
- `src/components/StickyBookingBar.tsx` – lisää `data-booking-source="sticky-bar"` (valinnainen tulevaa varten; ei pakollinen tämän taskin onnistumiselle).
- `src/components/admin/PageViewsAdmin.tsx` – varmistetaan että UI näyttää `booking-link` yhtenä summana (mahdollisesti jo näkyy; tarkistetaan koodi).

## Mitä odottaa toteutuksen jälkeen

- `/event/booking-link` -määrä **kasvaa heti** ~3–5× nykyisestä (381 → ~700–900 per 2 kk), koska entiset `booking-page-cta`-rivit (31) ja vastaavat ohjautuvat samaan bucketiin sekä keepalive korjaa hävinneet kirjaukset.
- Pyynnössä mainittu "3 000–6 000 / kk" -odotus on epärealistinen nykyisellä liikenteellä (~30 000 näyttöä / 2 kk → 1–2 % CTR booking-linkeissä on tyypillistä). Realistinen tavoite ~400–600 / kk.

## Tekniset huomiot

- Click-handler on jo `addEventListener("click", handler, true)` (capture) – ei tarvitse muutosta.
- `target="_blank"`-linkit eivät keskeytä nykyistä tabia → fetch ehtii palvelimelle ilman keepalivea, mutta keepalive lisää varmuutta jos käyttäjä esim. sulkee mobiilissa tabin.
- Ad-blockerit (uBlock + EasyPrivacy) blokkaavat `*.supabase.co/rest/v1/page_views` -POST:ia ~10–15 %:lla käyttäjistä. Tähän ei voi puuttua ilman omaa proxy-edge-funktiota – se on erillinen mahdollinen jatkotehtävä.
