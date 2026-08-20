# Englanninkielinen majoitusklusteri — mitä Semrush kertoo ja mitä tehdään

Lähde: Semrush, UK-tietokanta (brittihaut ovat suurin englanninkielinen Levi-markkina) + FI-tietokanta vertailuksi.

## Miksi englanti kannattaa: raha näkyy datassa

| Hakusana | Volyymi (UK) | CPC | Vaikeus |
|---|---|---|---|
| levi accommodation | 590/kk | $1,36 | 18 (helppo) |
| levi hotels | 590/kk | $1,39 | 15 (helppo) |
| hotels in levi | 390/kk | $0,97 | — |
| levi cabins | 320/kk | $1,21 | 23 (helppo) |
| levi log cabins | 320/kk | $0,85 | — |
| hotels in levi finland | 320/kk | $1,41 | — |
| levi finland accommodation | 260/kk | $1,36 | 17 (helppo) |
| levi cottages | 260/kk | $1,39 | matala kilpailu |
| levi finland log cabins | 260/kk | $1,21 | — |
| levi log cabins finland | 260/kk | $1,21 | — |
| accommodation in levi | 110/kk | $1,36 | 16 (helppo) |

Klusteri on yhteensä noin **3 500 hakua/kk** ja vaikeusaste 15–23 = uusikin sivu voi rankata.

**CPC on ratkaiseva havainto:** englanninkielisistä majoitushauista maksetaan $0,85–1,61 per klikki, suomenkielisistä $0,19–0,55. Sama kävijämäärä on englanniksi noin **3x arvokkaampi**, ja se vahvistaa arvion suomalaisen asiakkaan maksukyvystä. Volyymi on pienempi (3 500 vs 25 000), mutta vaikeus on murto-osa ja arvo per kävijä moninkertainen.

## Missä olemme nyt englanniksi

UK-tietokannassa: 88 avainsanaa, ~96 käyntiä/kk (FI: 769 sanaa, 3 021 käyntiä/kk). Kaikki UK-näkyvyys tulee opassivuilta — `guide/skiing-in-levi`, `guide/santa-claus-in-levi`, `guide/northern-lights-season-levi`.

**Yksikään majoitussivumme ei rankkaa englanniksi.** Etusivu näkyy vain sijalla 49 kilpailijan brändinimellä. Meillä ei siis ole englanninkielistä majoituslaskeutumissivua, joka kilpailisi näistä sanoista.

## Kuka rankkaa nyt — pääseekö väliin

SERP "levi accommodation" (UK):
1. levi.fi/en/stay 2. Booking.com **3. levisuites.fi/en/accommodation** 4. holidayhomes.co.uk 5. Airbnb 6. Trivago 7. HomeToGo 8. Tripadvisor 9. Agoda 10. Expedia

Kahdeksan kymmenestä on OTA-jättiläisiä, joita vastaan ei kannata taistella. Mutta **levisuites.fi on sijalla 3 yhdellä majoituslistaussivulla** — se on meidän kokoluokkamme toimija (376 avainsanaa, auktoriteetti samaa tasoa). Tämä todistaa, että paikallinen suoravuokraaja pääsee top 3:een omalla sivullaan. Siihen tähdätään.

## Mitä tehdään

### 1. `/en/accommodation` — englanninkielinen päälaskeutumissivu
Rakennetaan sama vahvistus kuin `/majoitukset`-sivulle tehtiin, mutta englanninkielisen klusterin sanastolla:
- H1 "Accommodation in Levi, Finland" ja title, joka kattaa sekä *levi accommodation* että *levi finland accommodation*
- Kohteet ryhmiteltynä: **apartments**, **log cabins / cottages**, **large groups** — sanat "cabin", "log cabin" ja "cottage" ovat omat hakuklusterinsa (yhteensä ~1 100/kk) ja ne pitää esiintyä omina otsikoituina osioinaan, ei synonyymeinä
- Jokaisesta kohteesta: makuuhuoneet, henkilömäärä, etäisyys rinteeseen ja keskustaan, sauna
- 400–600 sanaa uniikkia tekstiä: mitä eroa on huoneistolla ja mökillä, missä päin Leviä kannattaa yöpyä, milloin varata
- FAQ + `FAQPage`, `ItemList`, `BreadcrumbList`, `LodgingBusiness` -schemat

### 2. `/en/log-cabins-levi` — oma mökkisivu
"levi cabins", "levi log cabins", "levi finland log cabins", "levi log cabins finland", "levi cottages" = noin 1 400 hakua/kk yhdessä klusterissa, matala kilpailu. Nykyinen `/en/cabins` laajennetaan tähän: mitä hirsimökki Lapissa tarkoittaa, saunat, takat, mökki vs. huoneisto, meidän mökkikohteemme.

### 3. Ero OTA-jättiläisiin näkyville
Booking, Airbnb ja Expedia hallitsevat SERPiä. Sivun pitää tarjota se, mitä ne eivät: omistajan tiedot, tarkat sijainnit ja etäisyydet metreinä, oikeat pohjakuvat, suora yhteys ilman välikäsiä, paikallinen neuvonta. Ei hintalupauksia (hintapariteetti).

### 4. Englanninkielisten opassivujen ohjaus majoitukseen
UK-liikenteemme tulee jo oppaista: skiing-in-levi, santa-claus-in-levi, northern-lights-season-levi, prices-in-levi, how-to-get-to-levi. Näihin lisätään sama majoitusnosto kuin FI-puolelle, mutta linkki osoittaa `/en/accommodation`-sivulle. Nämä ovat matkaa suunnittelevia briteiltä — täsmälleen oikea yleisö.

### 5. Tukevat englanninkieliset sanat, jotka kannattaa ottaa mukaan samalla
- **levi ski holiday** (140/kk, vaikeus 9) ja **levi lapland** (1 900/kk, vaikeus 28) — molemmat majoitussivun luontevia sisäisiä linkkikohteita
- **levi northern lights** (170/kk, vaikeus 14) — meillä on jo sivu sijalla 18, se nousee helposti
- **christmas in lapland** (590/kk, vaikeus 25) — kausisisältö, joka ohjaa suoraan majoitukseen

## Tekninen toteutus

- Uusi/vahvistettava: `/en/accommodation` (englanninkielinen vastine `Majoitukset`-sivulle) ja `/en/log-cabins-levi` (nykyisen `/en/cabins`-reitin laajennus, vanha polku ohjataan uuteen)
- Reitit `src/App.tsx`:ään; hreflang fi↔en `HreflangTags`-komponentilla, vain käännetyille sivuille
- Schemat `src/utils/structuredData.ts`:n helpereillä + `ItemList`
- Majoitusnosto: `MajoitusCallout` saa kielitietoisen kohdelinkin ja lisätään englanninkielisille opassivuille
- Sitemap: `src/data/sitemapRoutes.ts` + `supabase/functions/_shared/sitemapRoutes.ts`, generointi uudelleen
- `src/data/searchIndex.ts` päivitetään

## Järjestys

1. `/en/accommodation` vahvistus (suurin ja arvokkain klusteri)
2. Englanninkielisten opassivujen majoitusnostot (liikenne on jo olemassa)
3. `/en/log-cabins-levi` mökkiklusteri
4. Tukisanojen sisällöt ja sisäinen linkitys
