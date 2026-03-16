

# Sitemap.xml ja _redirects SEO-korjaukset

## Yhteenveto
6 korjausta kahdessa tiedostossa. Kaikki ongelmat on paikannettu ja vahvistettu koodista.

## Korjaus 1: Lisää FI-etusivu sitemapiin
- Rivi 3 (tyhjä rivi `<urlset>`-tagin jälkeen): lisätään `https://leville.net` entry täysillä hreflang-tageilla (fi, en, sv, de, es, fr, nl + x-default→en), priority 1.0

## Korjaus 2: Korjaa olemassa olevat etusivut (rivit 632-699)
Ongelmat löydetty:
- `/de`, `/es`, `/fr`, `/nl`, `/sv`: puuttuvat `fi` ja `en` hreflang-tagit, x-default osoittaa väärin `/sv`:hen
- `/en`: puuttuvat kaikki hreflang-tagit kokonaan

Korjaus: korvaa rivit 632-699 uusilla entryillä joissa kaikilla 6 etusivulla on identtiset 7+1 hreflang-tagit (fi→/, en→/en, sv→/sv, de→/de, es→/es, fr→/fr, nl→/nl, x-default→/en)

## Korjaus 3: Poista duplikaatti-hreflang-rivit
Löydetty rivit joissa duplikaatit (yksirivimuotoinen hreflang-rivi juuri ennen `</url>`):
- Levi vs Rovaniemi: rivit 974, 987, 1000, 1013, 1026 (5 kpl)
- Levi vs Ylläs vs Ruka: rivit 1052, 1065, 1078, 1091, 1104 (5 kpl)  
- Hinnat/Prices: rivit 1168, 1178, 2384 (3 kpl)

Yhteensä 13 duplikaattiriviä poistetaan. Jokainen rivi on muotoa `<xhtml:link .../>...<xhtml:link .../></url>` ja korvataan pelkällä `</url>`.

## Korjaus 4: Lisää hreflang /en/apartments -sivuille
10 sivua (rivit 238, 246, 254, 262, 823, 939, 1310, 1584, 1612, 1884): lisätään self-referencing `hreflang="en"` + `x-default` jokaiseen. Hub (/en/apartments) priority 0.8, alasivut 0.7.

## Korjaus 5: Lisää hreflang yksittäisille sivuille
- `/en/guide/christmas-dinner-in-levi` (rivi 330): lisää en + x-default
- `/accommodations/guides/frontslope-apartments` (rivi 481): lisää en + x-default
- `/latuinfo` (rivi 831): lisää fi + x-default
- `/levi-map` (rivi 947): lisää fi + x-default (koska FI-sivu, karttasivu)
- `/myy-loma-asuntosi` (rivi 1282): lisää fi + x-default
- `/levi-pronounce` (rivi 955): lisää en + x-default

## Korjaus 6: _redirects virheelliset kohteet
Rivit 44-46 korjataan:
- `/en/majoitukset` → `/en/accommodations` (ei `/accommodations`)
- `/en/yhteystiedot` → `/en/contact` (ei `/contact`)
- `/en/terms` → `/en/booking-terms` (ei `/terms`)

## Muutettavat tiedostot
- `public/sitemap.xml` — kaikki 5 ensimmäistä korjausta
- `public/_redirects` — korjaus 6

