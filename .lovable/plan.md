

# Uusi ravintolaesittelysivu

## Mitä tehdään

Luodaan uusi sivu, joka esittelee 10 ravintolaa annoskuvineen. Käytetään **vain** kuvia, joissa ravintolan nimi on tunnistettavissa tiedostonimestä. "Levi"- ja "Tuntematon"-kuvat jätetään pois.

## Tiedostot

### 1. `src/pages/guide/LeviRestaurantGuide.tsx` (uusi)

Sivukomponentti, joka sisältää:
- SeoMeta, Header, Footer, Breadcrumbs, WhatsAppChat, StickyBookingBar, GuideDisclaimer, ReadNextSection
- 10 ravintolaosioita käyttäjän antamilla suomenkielisillä teksteillä + EN-käännökset
- Jokaisen ravintolan alla kuvaruudukko (2 col mobiili, 3 col desktop) OptimizedImage-komponentilla
- Alt-tekstit tiedostonimistä

**Ravintolat ja kuvat (vain tunnistetut):**

| Ravintola | Kuvat |
|-----------|-------|
| Restaurant Asia | 7 kuvaa (wokki, lohi wasabi, grillattu lohi, tempura, katkaravut, sticky pork, pihvi tataki) |
| Ravintola Ämmilä | 5 kuvaa (hampurilainen, siika, poronkäristys x2, makkaralautanen) |
| Ravintola Niliporo | 5 kuvaa (poromakkara, lihapullat, liha-makkaralautanen, poronmaksa, porohampurilainen) |
| Colorado Bar & Grill | 4 kuvaa (ribsit, kana fajitas x2, nachot) |
| Pannukakkutalo | 3 kuvaa (mansikka, mustikka, marja) |
| Myllyn Äijä | 3 kuvaa (leike, pippuripihvi x2) |
| Ravintola Renna | 3 kuvaa (pizza x3) |
| Salteriet | 2 kuvaa (leike x2) |
| Ravintola Hook | 1 kuva (wings) |
| Ravintola Pihvipirtti | 1 kuva (kalapöytä) |

### 2. `src/App.tsx` — kaksi uutta reittiä
- `/opas/levin-ravintolat-ja-annokset`
- `/guide/levi-restaurants-and-dishes`

### 3. `src/pages/guide/RestaurantsAndServices.tsx` — linkki uudelle sivulle
Lisätään ravintolaosion jälkeen painike/linkki: "Katso ravintolaesittelyt ja annoskuvat →"

## Ei mukana
- "Levi"-, "Tuntematon"- ja nimettömät kuvat jätetään kokonaan pois tältä sivulta

