# Korjaus: GSC "Alternative page with proper canonical tag" -ongelma

## Diagnoosi

18 opas-/aktiviteettisivua on rekisteröity App.tsx:ssä reiteille `/sv/...`, `/de/...`, `/es/...`, `/fr/...` ja `/nl/...`, mutta niiden `translations`-objekti sisältää vain `fi` ja `en`. Käyttäjän käydessä esim. `/de/aktivitaeten/golf-levi`-osoitteessa renderöityy suomenkielinen sisältö ja canonical osoittaa suomeen — Google näkee duplikaatin ja jättää sivun indeksoimatta.

Sisältö on jo tarkistettu: hreflang näillä sivuilla on rajattu oikein (`customUrls = { fi, en }`), eikä sitemap sisällä rikkinäisiä URL:eja. Ongelma on vain App.tsx-reiteissä ja `translations/index.ts`-kartassa.

## Korjattavat sivut (vain fi/en olemassa)

Aktiviteetit: GolfLevi, LeviForKids, HorseRidingLevi, IceFishingLevi, CanoeingAndSUPLevi, HikingAndBikingLevi.

Oppaat: DayTripsFromLevi, ApresSkiLevi, EquipmentRentalLevi, EventsInLevi, SamiCultureLevi, AccessibleLevi, CabinVsApartmentLevi, NewYearsEveLevi, PackingListLapland, RomanticLeviGetaway, SkiHolidayLevi, SantaClausLevi.

Yhteensä noin 80–90 poistettavaa reittiä App.tsx:stä (HikingAndBikingLevi ja CabinVsApartmentLevi näyttävät jo nyt olevan ilman käännösreittejä — varmistetaan kartoituksen yhteydessä).

## Toimenpiteet

### 1. Poista käännösreitit `src/App.tsx`:stä
Poistetaan kaikki `<Route path="/{sv|de|es|fr|nl}/..." element={<X lang="..." />}>` -rivit yllä listatuille 18 komponentille.

### 2. Päivitä `src/translations/index.ts` -reittikartta
Näiden 18 sivun osalta `sv`, `de`, `es`, `fr` ja `nl` -arvot vaihdetaan osoittamaan englanninkieliseen vastineeseen (esim. `sv: "/en/activities/golf-in-levi"`), jotta:
- Kielenvaihtaja ohjaa muut kielet englantilaiseen versioon (paras saatavilla oleva sisältö).
- Mahdolliset sisäiset linkit eivät päädy poistettuihin reitteihin.

### 3. Pidä koskemattomina (näillä on aidot käännökset)
- Hub-sivut: SeasonsHub, ActivitiesHub, ComparisonHub, TravelHub
- Vertailut: LeviVsRovaniemiComparison, LeviVsYllasVsRukaEN (kaikki kielet)
- Revontuli-sivut: BestTimeNorthernLightsLevi, NorthernLightsSeasonLevi, NorthernLightsForecastLevi, WhereToSeeNorthernLightsLevi, NorthernLightsPhotographyLevi, HowNorthernLightsForm, NorthernLightsColorsExplained
- Aktiviteetit ulkoisilla käännöstiedostoilla: FatbikeLevi, HuskySafariTips, SnowmobileSafariTips, ReindeerSafariLevi, IceSwimmingLevi, SnowshoeingLevi, CrossCountrySkiingInLevi, TopWinterActivities
- Päämajoitus-/info-sivut (Majoitukset, Yritys, FAQ, Akkilahdot, jne.)

### 4. Ei muutoksia
- HreflangTags-komponenttiin (toimii jo oikein)
- public/sitemap.xml (ei sisällä rikkinäisiä URL:eja)
- robots.txt
- Kanonisten tagien logiikkaan (jo aiemmin korjattu)

## Vaikutus

- Poistuneet reitit alkavat palauttaa 404 → Google poistaa "Alternative page" -merkinnät indeksin terveydestä raporteissa.
- Hreflang ja canonical pysyvät yhtenäisinä jäljellä olevien sivujen osalta.
- Käyttäjäkokemus muiden kielten käyttäjille paranee: he päätyvät oikeasti englantilaiseen sivuun "rikkonaisen suomenkielisen" sijaan.

## Ei tämän suunnitelman piirissä

- Aitojen käännösten lisääminen kyseisille 18 sivulle (erillinen, paljon laajempi työ).
- A/B-testit, visuaaliset muutokset tai muut SEO-säädöt.
