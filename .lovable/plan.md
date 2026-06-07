# Miksi sivut eivät ole indeksoituneet

## Diagnoosi

Google Search Console -raportin syy on **"Alternative page with proper canonical tag"** (Vaihtoehtoinen sivu, jolla on oikea canonical-tagi). Tämä tarkoittaa, että Google löysi sivun, mutta jätti sen indeksoimatta, koska sivu itse osoittaa canonical-tagilla **toiseen URL-osoitteeseen** — Google kunnioittaa tätä signaalia ja indeksoi vain "alkuperäisen".

81 raportoidusta URL-osoitteesta **80 on käännettyjä sivuja** (de / es / fr / nl / sv). Syy löytyy heti koodista: monikieliset opas- ja vertailusivut sisältävät **kovakoodatun canonical-tagin**, joka osoittaa aina suomen- tai englanninkieliseen versioon kielestä riippumatta.

Esimerkkejä (sama tiedosto renderöi 5–7 kielen sivut):

```text
src/pages/guide/LeviVsRovaniemiComparison.tsx:90
  <link rel="canonical" href="https://leville.net/guide/levi-vs-rovaniemi-comparison" />

src/pages/guide/LeviVsSaariselkaComparison.tsx:83
  <link rel="canonical" href="https://leville.net/guide/levi-vs-saariselka-comparison" />

src/pages/guide/LeviVsYllasVsRuka.tsx:73
  <link rel="canonical" href="https://leville.net/opas/levi-vs-yllas-vs-ruka" />

src/pages/guide/LeviVsYllasVsRukaEN.tsx:87
  <link rel="canonical" href="https://leville.net/guide/levi-vs-yllas-vs-ruka-comparison" />

src/pages/guide/FinnishSaunaLevi.tsx:186
  <link rel="canonical" href="https://leville.net/guide/finnish-sauna-in-levi" />
```

Esim. käyttäjä menee osoitteeseen `https://leville.net/de/guide/levi-vs-rovaniemi` → sivu lähettää `<link rel="canonical" href="https://leville.net/guide/levi-vs-rovaniemi-comparison">` → Google: "OK, saksankielinen versio on duplikaatti EN-sivusta, en indeksoi sitä." Sama logiikka selittää kaikki 80 käännettyä URL-osoitetta raportissa.

Hreflang-tagit ovat itse asiassa kunnossa (`HreflangTags`-komponentti tuottaa oikeat per-kieli alternate-linkit), mutta canonical voittaa hreflangin indeksointipäätöksessä.

## Korjaussuunnitelma

Jokaisen monikielisen sivun canonical-tagi pitää tehdä **per-kieli itseviittaavaksi** (canonical osoittaa juuri siihen URL-osoitteeseen, jossa käyttäjä on). Käytännössä rakennetaan canonical samasta `customUrls`-objektista / kielikartasta, jota `HreflangTags` jo käyttää.

### Tiedostot, joissa kovakoodattu canonical pitää muuttaa per-kieliseksi

1. `src/pages/guide/LeviVsRovaniemiComparison.tsx`
2. `src/pages/guide/LeviVsSaariselkaComparison.tsx`
3. `src/pages/guide/LeviVsYllasVsRuka.tsx`
4. `src/pages/guide/LeviVsYllasVsRukaEN.tsx`
5. `src/pages/guide/FinnishSaunaLevi.tsx`

Lisäksi käyn läpi `src/pages/guide/`, `src/pages/activities/` ja `src/pages/travel/` ja varmistan, että kaikki tiedostot, jotka renderöivät usean kielen (saavat `lang`-propin tai useita reittejä `App.tsx`:ssä) käyttävät kielisidonnaista canonicalia. Käytän raportin URL-listaa (de/es/fr/nl/sv) ohjenuorana siitä, mitkä komponentit ovat osallisia.

### Muutosmalli (esimerkki LeviVsRovaniemiComparison)

```tsx
// Käytetään samaa customUrls-karttaa, joka jo annetaan HreflangTagsille
const canonicalPath = customUrls[lang] ?? customUrls.en;
const canonicalUrl = canonicalPath.startsWith("http")
  ? canonicalPath
  : `https://leville.net${canonicalPath}`;

// Helmetissä:
<link rel="canonical" href={canonicalUrl} />
```

Jos sivulla ei ole `customUrls`-objektia (esim. `FinnishSaunaLevi`), rakennetaan vastaava kartta tai johdetaan canonical `getRouteForLanguage(currentPath, lang)` -apurista, jota `HreflangTags` jo käyttää.

### Mitä EI muuteta

- `HreflangTags`-komponentti — toimii oikein.
- Sitemap / robots.txt — ei liity tähän virheeseen.
- Yksikielisten sivujen canonicalit (esim. `ChristmasDinnerLeviFI.tsx`, joka palvelee vain FI-reittiä) ovat OK ja jätetään ennalleen.

## Aikataulu indeksointiin

Kun korjaus on julkaistu, Google tarvitsee uuden indeksoinnin (yleensä 1–4 viikkoa). Voit nopeuttaa pyytämällä uudelleen­indeksointia Search Consolen URL Inspection -työkalulla muutamalle avain­sivulle per kieli.
