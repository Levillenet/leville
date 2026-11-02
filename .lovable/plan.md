# Tyhjän haun pelastus

Kun hakupalkin päiville ja henkilömäärälle ei ole yhtään vapaata kohdetta, asiakas jää leville.netiin ja näkee tarjouspyyntönäkymän (WhatsApp / sähköposti / lähimmät vapaat päivät). Kun vapaita on tai tarkistus ei onnistu, käytös on täsmälleen nykyinen. Moderin widgetin koodia, ulkoasua ja hakulogiikkaa ei muuteta.

## 1. Taustapalvelu check-availability (uusi)
- Syöte start/end (YYYY-MM-DD), adults, children; tarkistetaan (päivät järkeviä, end > start, henkilöt 1–30).
- Hakee palvelimelta Moderin api_query-osoitteen (X-Requested-With: XMLHttpRequest), aikakatkaisu 3 s.
- Laskee "Saatavilla"-esiintymät; jos vastauksessa ei ole kumpaakaan "Saatavilla"/"Kohde on varattu" eikä tunnistettavaa tulosrakennetta → null.
- Palauttaa `{ available: N | null }`, aina HTTP 200 + CORS (yhteiset authGuard-CORS-apurit, julkinen kutsu).
- Muistivälimuisti 5 min hakuyhdistelmäkohtaisesti + kevyt IP-rajoitus.
- Laskentafunktio erillisessä tiedostossa, Deno-testit esimerkkivastauksilla (0 ja >0, ei-tulos → null).

## 2. Ennakkotarkistus selaimessa (uusi moduuli src/lib/availabilityPrecheck.ts)
- Lukee widgetin arvot samalla tavalla kuin nykyinen majoitushaku-tapahtuma (searchEventParams / widgetin tila), tarkkailee #moder-embed-kenttiä MutationObserverilla + input/change-tapahtumilla.
- Kun molemmat päivät valittu: tarkistus 500 ms debouncella; jokaisella pyynnöllä järjestysnumero, vanhat vastaukset hylätään; tulos tallennetaan avaimella start|end|adults|children.
- Kutsu tehdään getSupabase()-dynaamisella latauksella (ei startup-polkuun).

## 3. Hae-painallus
- Kytketään olemassa olevaan hakukäsittelijään (adClickParams.ts:n Moder-hakuhandleri) ennen trackSearchThenNavigatea:
  - tulos > 0 tai null → nykyinen siirto heti.
  - ei valmis → odotetaan enintään 1000 ms, sitten nykyinen siirto.
  - 0 → ei siirtoa, ei majoitushaku-tapahtumaa siirtona; lähetetään haku_ei_tuloksia samoilla parametreilla ja avataan näkymä.
  - kenttiä ei saada luettua / mikä tahansa poikkeus → nykyinen käytös (try/catch-suoja).
- majoitushaku lähtee edelleen kerran per haku (dedup säilyy).
  Avoin kysymys alla: lähteekö majoitushaku myös tyhjässä haussa.

## 4. Tyhjän haun näkymä (uusi komponentti, lazy)
- Paneeli/modaali hakupalkin alla, sivun kielen mukaan (FI / EN), tekstit täsmälleen briefin mukaiset.
- Valmis viesti FI/EN, lapset "(joista X lasta)" / "(including X children)", päivät pp.kk.vvvv / d Month yyyy.
- WhatsApp wa.me/35844131313 uuteen välilehteen; mailto info@leville.net aiheella ja rungolla.
- "Näytä lähimmät vapaat päivät": Moder-URL samoilla päivillä/henkilöillä + widgetin ±3 pv -parametri (selvitetään widgetin tuottamasta osoitteesta toteutuksessa), siirto väliaikaisella data-lv-nav-ankkurilla (mousedown + click) → utm ja _gl säilyvät.
- Sulje-painike, Esc, fokus palaa hakupalkkiin.
- GA: tarjous_whatsapp_click, tarjous_email_click, lahimmat_paivat_click — vain suostumuksella (trackGoogleEvent laajennetaan uusilla nimillä).

## 5. Testit
- Yksikkö: Saatavilla-laskenta, debounce + vanhan hylkäys, 1000 ms aikaraja, null → normaali siirto, viestin muodostus (FI/EN, lapset, URL-koodaus).
- Selain (Playwright): a) 28.12.2026–4.1.2027 / 8 aik. → näkymä, haku_ei_tuloksia, WhatsApp-linkki oikein; b) 10.–16.1.2027 / 4 aik. → siirto, utm + _gl; c) taustapalvelu estetty/hidas → siirto. majoitushaku täsmälleen kerran.
- AGENTS.md: yksi sääntö (tyhjän haun tarkistus ei saa koskaan estää siirtoa muulloin kuin available === 0).

## Avoin kysymys
Lähteekö majoitushaku-tapahtuma myös silloin, kun haku jää tyhjäksi? Oletus: kyllä (haku tehtiin), lisäksi haku_ei_tuloksia — näin hakumäärät pysyvät vertailukelpoisina.
