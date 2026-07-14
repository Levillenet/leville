
# Vaihe 1 – Toteutussuunnitelma (nopeat voitot)

Kaksi työtä samaan pushiin. Ei sisältö-/layout-muutoksia.

## A) Katuosoitesivujen `<title>` -optimointi

Muutokset yksinomaan `src/data/street-hubs.ts` -tiedoston `metaTitle`-kenttiin. Katunimi/osoite alkuun, sitten kuvaava aihe + brändi. Kaikki 55–75 merkkiä.

| Slug | Uusi title |
|---|---|
| `hiihtajankuja-levi` | Hiihtäjänkuja Levi – vuokrahuoneistot Eturinteellä \| Leville.net |
| `skimbaajankuja-levi` | Skimbaajankuja Levi – Karhupirtti hirsihuvila 14 hengelle \| Leville.net |
| `ratsastajankuja-levi` | Ratsastajankuja 2 Levi – Glacier-alppihuoneistot Alppikylässä \| Leville.net |
| `glacier-apartments-levi` | Glacier Apartments Levi – 10 saunallista alppihuoneistoa \| Leville.net |
| `postintie-levi` | Postintie 3 Levi – Skistar-talon vuokrahuoneistot keskustassa \| Leville.net |

**Miksi:** Levillas ja LevinAlppitalot rankkaavat #1–#3 sijoilla juuri katuosoitteilla ("hissitie levi", "operonmukka", "martinmutka" jne.). Meillä on samat brändit/osoitteet mutta niitä ei ole titlessä alkupäässä.

## B) MajoitusCallout kolmelle top-oppaalle

Lisätään olemassa oleva `MajoitusCallout`-komponentti (variant `compact`) juuri ennen `GuideDisclaimer`iä 3 sivulla, jotka tuovat yhteensä ~60 % opas-liikenteestämme mutta eivät ohjaa varauksiin:

1. **`src/pages/guide/WeatherInLevi.tsx`** (`/levi/saatieto-levilta`, 32,7 % liikenteestä) – tuo import + `<MajoitusCallout lang={lang} variant="compact" />` rivi 703 kohtaan
2. **`src/pages/guide/CrossCountrySkiingInLevi.tsx`** (`/opas/hiihtoladut-levi`, 15,1 %) – sama import + insertio rivi 269
3. **`src/pages/guide/LevinHinnatPage.tsx`** (`/opas/hinnat-levilla`, 5,6 %) – räätälöity teksti "Loman hinta pienemmäksi – varaa suoraan" hintateeman mukaan

`RestaurantsAndServices.tsx`illa on jo callout, se skipataan.

## Muutettavat tiedostot (yht. 4)

- `src/data/street-hubs.ts` – 5 title-riviä
- `src/pages/guide/WeatherInLevi.tsx` – 1 import + 1 rivi JSX
- `src/pages/guide/CrossCountrySkiingInLevi.tsx` – 1 import + 1 rivi JSX
- `src/pages/guide/LevinHinnatPage.tsx` – 1 import + 6 riviä JSX (custom copy)

## Mitä EI muuteta
- Muut opas-/kohdesivut, H1:t, kuvat, layout, käännökset, sitemap, hreflang.

Vahvista niin toteutan (siirtymä build-tilaan).
