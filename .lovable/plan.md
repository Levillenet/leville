

## CSV-raportin vienti ja tekninen selvitys

### Muutokset

**1. Edge function — CSV-vienti endpoint**

Lisätään `get-page-view-stats` -funktioon `format: "csv"` -parametri. Kun se on mukana, palautetaan raakarivit CSV-muodossa (ei aggregaatteja), sarakkeet:

```
date,time,path,type,referrer,device_type,language
```

- `type` = `pageview` tai `booking-search-widget` / `booking-sticky-bar` / `booking-page-cta` / `booking-link`
- Tapahtumariveillä `referrer` = sisäinen lähtösivu, sivukatseluissa = ulkoinen referrer tai tyhjä

**2. Admin-näkymä — "Lataa CSV" -painike**

Lisätään PageViewsAdmin-komponenttiin "Lataa CSV" -painike Päivitä-napin viereen. Painike kutsuu edge functionia `format: "csv"` ja lataa tiedoston selaimessa.

**3. Tekninen selvitys Claudelle**

Lisätään admin-näkymään "Kopioi raportin selite" -painike joka kopioi leikepöydälle valmiin teknisen kuvauksen CSV:n rakenteesta ja konversiotapahtumien merkityksestä.

### Tiedostot

| Tiedosto | Muutos |
|---|---|
| `supabase/functions/get-page-view-stats/index.ts` | Lisää `format: "csv"` tuki, palauttaa raakarivit CSV-muodossa |
| `src/components/admin/PageViewsAdmin.tsx` | Lisää "Lataa CSV" ja "Kopioi selite" -painikkeet |

### Tekninen selvitys (tämän voit kopioida Claudelle)

```text
LEVILLE.FI ANALYTIIKKARAPORTTI — TEKNINEN KUVAUS

Tämä CSV-raportti sisältää sivuston leville.fi kävijädataa 30 päivän ajalta.
Jokainen rivi on yksi tapahtuma (sivulataus tai klikkaus).

SARAKKEET:
- date: Päivämäärä (YYYY-MM-DD)
- time: Kellonaika UTC (HH:MM:SS)
- path: Sivun polku tai tapahtumatyyppi
- type: "pageview" tai konversiotapahtuman tyyppi (ks. alla)
- referrer: Ulkoinen lähde (sivukatseluilla) TAI sisäinen lähtösivu (konversiotapahtumilla)
- device_type: "mobile", "tablet" tai "desktop"
- language: Selaimen kieli (fi, en, de, sv, es, fr, nl jne.)

TAPAHTUMATYYPIT (type-sarake):

1. "pageview" — Tavallinen sivulataus. path = sivun URL-polku (esim. "/" = etusivu,
   "/majoitukset" = majoitussivu, "/en/levi" = englanninkielinen Levi-sivu).
   referrer = ulkoinen lähde (google.com, facebook.com) tai tyhjä (suora liikenne).

2. "booking-search-widget" — Käyttäjä painoi etusivun hero-osion majoitushakuwidgetin
   "Hae"-painiketta. Tämä ohjaa käyttäjän varausjärjestelmään (app.moder.fi).
   referrer = sivu jolta haku tehtiin (yleensä "/" eli etusivu).

3. "booking-sticky-bar" — Käyttäjä painoi alareunan kiinnitettyä "Varaa heti tästä"
   -palkkia. Tämä palkki näkyy kaikilla sivuilla näytön alareunassa.
   referrer = sivu jolta painettiin.

4. "booking-page-cta" — Käyttäjä painoi sivun lopussa olevaa "Katso vapaat majoitukset"
   -toimintakehotuspainiketta (CTA = Call to Action). Tämä painike on pyöristetyssä
   laatikossa sivun alaosassa monilla sisältösivuilla.
   referrer = sivu jolta painettiin.

5. "booking-link" — Käyttäjä painoi muuta linkkiä joka johtaa varausjärjestelmään
   (app.moder.fi). Esim. yksittäisen majoituskohteen varauslinkki.
   referrer = sivu jolta painettiin.

KONVERSIOANALYYSI:
- Konversioprosentti = (booking-tapahtumien määrä / pageview-tapahtumien määrä) × 100
- Vertaa eri konversiotyyppien tehokkuutta: kumpi tuottaa enemmän klikkauksia,
  sticky bar vai page CTA?
- Analysoi referrer-sarake konversiotapahtumissa: mitkä sivut tuottavat eniten
  varausklikkauksia?
- Kieliversioiden tehokkuus: vertaa fi vs en vs de kävijöiden konversiota

SIVUSTON RAKENNE:
- / = suomenkielinen etusivu
- /majoitukset = majoitussivu
- /levi = Levi-opas
- /en/ = englanninkieliset sivut (esim. /en/levi, /en/accommodations)
- /opas/ = oppaat ja artikkelit
- /guide/ = englanninkieliset oppaat
- /sauna, /revontulet, /latuinfo jne. = erikoissivut
```

