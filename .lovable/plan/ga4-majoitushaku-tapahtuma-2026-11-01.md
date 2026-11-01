# GA4 "majoitushaku" -tapahtuma

Hakulogiikka, linkkien osoitteet ja hakuwidgetin ulkoasu/koodi pysyvät ennallaan. Lisätään vain mittaus.

## Milloin tapahtuma lähtee
- Klikataan app.moder.fi-linkkiä, jonka osoitteessa on `start` ja `end` (esim. äkkilähtö- ja hakulinkit).
- Painetaan hakuwidgetin Hae-nappia, kun päivämäärät on valittu (arvot luetaan widgetin omasta tilasta, samasta kuin nykyinen kampanjatunnisteiden käsittely).
- Ei lähde: pelkkä Varaa-nappi ilman päivämääriä (varaa_click hoitaa), tai jos tilastointisuostumusta ei ole / gtag ei ladattu — silloin ohitetaan hiljaa ja siirtymä tapahtuu normaalisti heti.

## Parametrit
saapuminen, lahto (YYYY-MM-DD), oita (lahto − saapuminen), aikuiset, lapset, henkiloita, viikko (ISO, esim. "2027-W10"), kohde (kohdesivun tai linkin kohteen slug, muuten "kaikki"), lahde_sivu (nykyinen polku).

## Siirtymän viive
Kun tapahtuma lähetetään samassa välilehdessä avautuvalle siirtymälle: estetään oletussiirtymä, lähetetään `gtag('event','majoitushaku',{..., event_callback})` ja siirrytään täsmälleen samaan osoitteeseen callbackissa tai viimeistään 150 ms jälkeen (kumpi ensin, vain kerran). Uuteen välilehteen avautuvat linkit (`target="_blank"`, ctrl/cmd-klikkaus) eivät tarvitse viivettä — tapahtuma lähetetään ja selain toimii normaalisti.

## Tekninen toteutus
- `src/lib/googleAnalytics.ts`: puhdas `searchEventParams(url, path, properties)` (palauttaa null ilman start/end tai virheellisillä päivillä), `isoWeek()`, ja `trackSearchThenNavigate(params, go)` (event_callback + 150 ms fallback, palauttaa false jos ei suostumusta).
- `GoogleAnalyticsTracker.tsx`: nykyinen delegoitu klikkauskäsittelijä laajenee: Moder-linkki päivämäärillä → majoitushaku (varaa_click lähtee edelleen kuten nyt).
- `src/lib/adClickParams.ts` (ei widgetin koodi): Hae-napin olemassa oleva sieppaus kutsuu mittausta ennen `location.assign`-kutsua samalla jo muodostetulla URL:lla; kun mittaus on päällä, siirtymä tehdään viiveen jälkeen. Ilman suostumusta käytös identtinen nykyiseen.
- Testit `scripts/googleAnalytics.test.ts`: oiden laskenta, ISO-viikko vuodenvaihteessa (esim. 2027-01-01 → "2026-W53"), henkilömäärä, kohde/"kaikki", ei tapahtumaa ilman päiviä.
- Playwright: suostumuksella hakulinkki → majoitushaku oikeilla arvoilla ja siirtymä samaan URL:iin; ilman suostumusta ei tapahtumaa, siirtymä heti.
