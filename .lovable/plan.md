## Tavoite

Lisätä top 10 katsotuimpaan opas-/guide-sivuun **inline-tyyliset varauslinkit** prosan sisään niin, että ne tuntuvat luonnolliselta osalta sisältöä ja ohjaavat lukijaa oikealla hetkellä Levillen majoituksiin (ei vain alaosan CTA-blokkiin).

## Top 10 sivut (viim. 60 pv katselut)

| # | Polku | Komponentti | Konteksti / kärki |
|---|---|---|---|
| 1 | /opas/kesa-levi (3165) | `SummerInLevi.tsx` | Kesän aktiviteetit → "majoitus keskustassa kesällä" |
| 2 | /guide/levi-restaurants-and-dishes (333) | `LeviRestaurantGuide.tsx` (en) | Ravintolat → "stay walking distance" |
| 3 | /opas/ravintolat-ja-palvelut-levilla (286) | `RestaurantsAndServices.tsx` | Palvelut → "majoitus kävelymatkan päässä" |
| 4 | /opas/hiihtoladut-levi (191) | `CrossCountrySkiingInLevi.tsx` | Ladut → "huoneisto latujen vieressä" |
| 5 | /opas/laskettelu-levi (151) | `SkiingInLevi.tsx` | Rinteet → "ski-in/out-tyyppinen majoitus" |
| 6 | /opas/lapsiperheet-levilla (111) | `LeviWithChildren.tsx` | Lapsiperheille → "tilavat huoneistot 4–8 hengelle" |
| 7 | /guide/prices-in-levi (109) | `PricesInLeviPage.tsx` (en) | Hinnat → "book direct, no fees" |
| 8 | /guide/levi-vs-yllas-vs-ruka-comparison (102) | `LeviVsYllasVsRukaEN.tsx` | Vertailu → "where to stay in Levi" |
| 9 | /guide/levi-vs-rovaniemi-comparison (101) | `LeviVsRovaniemiComparison.tsx` | Vertailu → "stay in Levi centre" |
| 10 | /opas/vuodenajat-levi (87) | `SeasonsHub.tsx` (fi) | Vuodenajat → "majoitus joka kaudelle" |

## Toteutusperiaate

Käytetään kahta keinoa rinnakkain — ei pelkkää isoa CTA-blokkia, vaan **kevyttä inline-painotusta**:

1. **Inline-linkki proosassa** — luonnollinen lause, jossa hubi/majoituslinkki on osana virkettä. Esim.:
   > "…hiihtolomalla majoittuminen [keskustan huoneistossa hissien vieressä](/levi-keskusta-huoneistot) tarkoittaa, että pääset rinteille kävellen."

2. **Pull-quote / "varaa suoraan" -rivi** — pieni, väriltään brändin turkoosi rivi (ei laatikko), jossa 1 lause + linkki. Esim.:
   > "💡 Vinkki: [Varaa majoitus suoraan omistajalta](/majoitukset) — ei välityskuluja, vapaa peruutus 14 vrk asti."

Sivua kohti **2–3 inline-linkkiä** + **1 pull-quote** strategisissa kohdissa (esim. ensimmäisen luvun jälkeen, kesken sisällön, juuri ennen FAQ:ta). Vältetään spam-tuntua: aina aiheen mukainen ankkuriteksti ja relevantein hubi (mökit / huoneistot / keskusta / iso ryhmä / penthouse).

## Uusi komponentti

`src/components/InlineBookingLink.tsx`
- Kaksi varianttia: `inline` (pelkkä `<Link>` brändivärillä, alleviivaus hoverissa) ja `tip` (pull-quote-rivi: vasen reuna 2px turkoosi border, pieni 💡, kursivoitu lause + linkki).
- Props: `lang`, `variant`, `href`, `children` (ankkuriteksti tip-variantissa) tai `text` + `linkText`.
- Käyttää brändin `--primary` (turkoosi) tokeneita — ei custom-värejä.

## Ankkuriteksti-strategia (per sivu)

Inline-linkit kohdistuvat siihen hubiin, joka sopii lukijan intentiin — ei aina samaan `/majoitukset`-juureen.

- **Kesä Levi** → `/mokit-levilla` ("mökki keskiyön auringossa"), `/majoitukset` ("kesämajoitus Levin keskustassa").
- **Ravintolat (fi/en)** → `/levi-keskusta-huoneistot` / `/en/apartments/levi-center-apartments` ("walking distance to restaurants").
- **Hiihtoladut** → `/kadut/hiihtajankuja` ("majoitus latujen vieressä").
- **Laskettelu** → `/kadut/skistar-postintie-3` ("rinteiden vieressä Skistar-huoneistot").
- **Lapsiperheet** → `/majoitukset` + suodatin-vinkki ("tilavat 4–8 hengen huoneistot saunalla").
- **Prices in Levi** → `/en/accommodations` ("direct from owner, no booking fees").
- **Levi vs Ylläs/Ruka, Levi vs Rovaniemi** → `/en/apartments/levi-center-apartments` ("stay in Levi centre, walking distance to lifts").
- **Vuodenajat** → `/majoitukset` ("majoitus joka kaudelle").

## Hintaneutraalius

Otsikoissa ja teksteissä **ei** "halvin hinta" / "best price guarantee" -lupauksia (memo: price parity). Sallittu: "ei välityskuluja", "varaa suoraan omistajalta", "henkilökohtainen palvelu", "vapaa peruutus 14 vrk".

## Kielet

Inline-linkit lisätään sivun nykyisellä kielellä. EN-sivuilla EN-copy, FI-sivuilla FI-copy. Vertailusivujen monikieliversiot (nl/de/fr/es) saavat saman `InlineBookingLink`-komponentin EN-fallbackilla (komponentti tukee `lang`-propia, mutta kopioteksti vain fi/en — muut kielet käyttävät en-versiota kuten `MajoitusCallout`).

## Tekninen toteutus

1. Luo `src/components/InlineBookingLink.tsx` (kaksi varianttia).
2. 10 sivun muokkaus: 2–3 inline-linkkiä proosaan + 1 `tip`-pull-quote per sivu.
3. Ei muutoksia reitityksiin, dataan, taustaan eikä SEO-metoihin — pelkkä presentation-tason lisäys.
4. Olemassa olevia `MajoitusCallout`-laatikoita ei poisteta; uudet linkit täydentävät niitä prosan sisällä.

## Mittari

Linkit ohjautuvat olemassa oleviin hubsiin, joiden klikkauksia voi seurata olemassa olevasta `page_views`-taulusta (referrer-polku). Ei tarvitse erillistä event-loggia tähän iteraatioon.
