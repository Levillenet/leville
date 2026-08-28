# AI-assistenttiliikenteen seuranta analytiikkaan

Lisätään uusi mittari: kuinka moni istunto tulee tekoälyassistenteista (ChatGPT, Perplexity, Copilot, Gemini, Claude, muut) ja kuinka moni niistä johtaa varausklikkaukseen. Mitään olemassa olevaa sisältöä, laskentaa tai ulkoasua ei muuteta.

## Mitä tehdään

1. **Backend (analytiikkafunktio)**
   - AI-lähteiden tunnistus referrer-osoitteesta (tarkka: tavallinen google.com-haku ei mene Geminiksi).
   - Istuntotason laskenta: istunnon ensimmäisen sivukatselun referrer määrittää lähteen; istunto merkitään konvertoivaksi, jos siinä on vähintään yksi varausklikkaus.
   - Uusi `aiTraffic`-osio JSON-vastaukseen: istunnot, konvertoivat istunnot, konversio-%, koko sivuston konversio-% vertailuksi, päiväkohtainen jakauma lähteittäin, lähdekohtainen taulukko ja top 10 sisääntulosivua.
   - CSV: uusi viimeinen sarake `ai_source` raakariveille sekä aivan tiedoston loppuun oma "AI ASSISTANT REFERRALS" -yhteenvetolohko (ai_source, sessions, converting, conversion_rate_pct, top_landing_page). Dev/preview-referrerit suodatetaan pois kuten muissakin aggregaateissa.
   - CSV:n selitetekstiin (REPORT_DESCRIPTION) lisäys uudesta sarakkeesta ja lohkosta.

2. **Admin-näkymä (PageViewsAdmin)**
   - Uusi kortti "Tekoälyohjaukset (AI-assistentit)" heti "Päivittäiset katselut" -kaavion jälkeen, ennen istunto-/sivukatselukoosteen ruudukkoa.
   - Kortissa: kolme tunnuslukua (AI-istunnot, varausklikkaus, konversio-%), koko sivuston konversio vertailuksi, pinottu pylväskaavio päivittäin lähteittäin ja lista sisääntulosivuista.
   - Kortti renderöityy vain jos AI-istuntoja on; muuten näkymä pysyy täysin ennallaan.
   - Huomautus käyttäjälle: referrer näkyy vain klikatuista linkeistä, joten luku on alaraja (kopioidut URL:t näkyvät suorana liikenteenä).

## Tekniset yksityiskohdat

- `supabase/functions/get-page-view-stats/index.ts`: `AI_REFERRER_MAP` + `classifyAiReferrer`, `sessionPages`-tyyppiin `firstReferrer` ja `hasBooking`, aggregaatti pääsilmukan jälkeen, `aiTraffic` lisätään olemassa olevaan JSON-objektiin. CSV-haara palaa ennen JSON-aggregointia, joten sillä on oma vastaava silmukka.
- `src/components/admin/PageViewsAdmin.tsx`: `Stats`-rajapintaan valinnainen `aiTraffic`, `AI_SOURCE_COLORS`-vakio, `aiSources`/`aiDateData` `dateData`-lohkon viereen. Importteihin lisätään `Bot` ja `TrendingUp` (lucide-react), `Legend` (recharts) ja `CardDescription` (ui/card) — `Bar`, `BarChart`, `Tooltip` ovat jo mukana. `SummaryCard` tukee jo `suffix`-proppia.
- Tarkistukset: `classifyAiReferrer("https://www.google.com/")` → null, `("https://chatgpt.com/")` → "ChatGPT"; nykyinen CSV-lataus ja kaikki kaaviot toimivat ennallaan.
