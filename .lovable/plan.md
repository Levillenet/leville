
# Korjaus: Breadcrumbs structured data -virheet (Google Search Console)

## Havaitut ongelmat

Sivustolta loytyi **kolme erillist ongelmaa**, jotka aiheuttavat Googlen "Missing field 'item'" -virheen:

### Ongelma 1: Tyhjä `href` viimeisessa murupolkuelementissa (7 sivua)

Seitsemalla sivulla viimeisen breadcrumb-elementin `href` on tyhjä merkkijono `""`. Breadcrumbs-komponentti muuntaa taman osoitteeksi `https://leville.net`, joka on etusivun URL eika nykyisen sivun URL. Google tulkitsee taman puuttuvaksi tai virheelliseksi.

Sivut: SkiingInLevi, SpringInLevi, WinterInLevi, SummerInLevi, AutumnRuskaInLevi, WeatherInLevi, CrossCountrySkiingInLevi.

### Ongelma 2: Tuplaschema -- kaksi BreadcrumbList-schemaa samalla sivulla (11 sivua)

Nama sivut generoivat oman `breadcrumbSchema`-JSON-LD:n Helmetissa JA kayttavat `<Breadcrumbs items={...} />` -komponenttia, joka luo toisen JSON-LD-scheman. Kaksi ristiriitaista schemaa samalla sivulla hammentaa Googlen crawleria.

Sivut: HeatingSystemsInLevi, GettingAroundLevi, RestaurantsAndServices, LeviWithoutCar, LeviWithChildren, HowToGetToLevi, TopWinterActivities, HuskySafariTips, HikingAndBikingLevi, SnowmobileSafariTips, WinterClothingGuide.

### Ongelma 3: Koti-elementti tuplataan (kaikki `items`-propsilla kutsutut sivut)

Breadcrumbs-komponentti lisaa aina automaattisesti "Etusivu/Home"-elementin, mutta monet sivut sisallyttavat sen myos `items`-taulukossa. Tama tuottaa schemaan:
- Position 1: Etusivu -> `https://leville.net`
- Position 2: Etusivu -> `https://leville.net/`
- Position 3: varsinainen sisalto...

Tuplakoti-elementin hinta on ristiriitainen schema JA virheellinen visuaalinen esitys.

---

## Korjaussuunnitelma

### Vaihe 1: Korjaa Breadcrumbs.tsx-komponentti

Kaksi muutosta:
1. **Suodata pois koti-duplikaatti**: Jos `items[0].href` vastaa etusivua (`/`, `/en`, `/sv` jne.), ohita se, koska komponentti lisaa kodin automaattisesti.
2. **Korjaa tyhja `href`**: Jos viimeisen elementin `href` on tyhja `""`, kayta `location.pathname` arvoa tilalla, jotta schema saa oikean sivun URL:n.

### Vaihe 2: Poista tuplaschemat 11 sivulta

Poista sivukohtainen `breadcrumbSchema`-muuttuja ja siihen liittyva `<script type="application/ld+json">` 11 sivulta. Breadcrumbs-komponentti hoitaa scheman automaattisesti.

Tiedostot:
- `src/pages/guide/HeatingSystemsInLevi.tsx`
- `src/pages/guide/GettingAroundLevi.tsx`
- `src/pages/guide/RestaurantsAndServices.tsx`
- `src/pages/guide/LeviWithoutCar.tsx`
- `src/pages/guide/LeviWithChildren.tsx`
- `src/pages/guide/WinterClothingGuide.tsx`
- `src/pages/travel/HowToGetToLevi.tsx`
- `src/pages/activities/TopWinterActivities.tsx`
- `src/pages/activities/HuskySafariTips.tsx`
- `src/pages/activities/HikingAndBikingLevi.tsx`
- `src/pages/activities/SnowmobileSafariTips.tsx`

### Vaihe 3: Varmistus

Jokaisen sivun breadcrumb-schema tuottaa tarkalleen yhden BreadcrumbList-JSON-LD:n, jossa:
- Kaikilla `itemListElement`-elementeilla on `item`-kentta absoluuttisella URL:lla
- Ei duplikaatteja
- Viimeinen elementti osoittaa oikeaan sivun URL:iin

---

## Tekninen yksityiskohta

### Breadcrumbs.tsx -- korjattu logiikka

Komponenttiin lisataan kaksi suodatusoperaatiota:

```text
1. Suodata items-taulukosta pois elementit joiden href
   vastaa etusivun polkua (/, /en, /sv, /de, /es, /fr)

2. Jos viimeisen elementin href === "",
   korvaa se arvolla location.pathname
```

Scheman generointiin ei tule muita muutoksia -- `item`-kentta tuotetaan jokaiselle elementille kuten ennenkin, mutta nyt arvot ovat oikein.

### Sivukohtaiset muutokset (11 sivua)

Jokaisesta poistetaan:
- `const breadcrumbSchema = { ... }` -muuttuja
- `<script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>` Helmetista

Muu sisalto (articleSchema, faqSchema jne.) sailyy ennallaan.
