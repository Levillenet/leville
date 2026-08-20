# Metatagien listaus validointia varten

Tavoite: koostaa taulukko kaikkien julkaistujen sivujen voimassa olevista metatageista, jotta ne voi validoida kerralla (duplikaatit, pituudet, canonical- ja hreflang-virheet).

## Miten listaus tehdään

Metatagit renderöityvät ajonaikaisesti (react-helmet-async + SeoMeta-komponentti), joten pelkkä koodihaku ei kerro lopputulosta. Listaus kerätään ajamalla jokainen sitemapin URL (558 kpl) läpi paikallisessa esikatselussa Playwrightilla ja lukemalla renderöity `<head>`.

Jokaisesta URL:sta talteen:

- `title` ja sen merkkimäärä
- `meta description` ja merkkimäärä
- `link rel=canonical`
- `meta robots` (noindex/nofollow)
- `og:title`, `og:description`, `og:url`, `og:type`, `og:image`
- `twitter:card`, `twitter:title`
- kaikki `hreflang`-linkit (kielet + URL:t)
- JSON-LD-skeemojen `@type`-listat
- H1-otsikot (määrä ja teksti)
- HTTP-tila / renderöityykö 404

## Automaattinen virheiden merkintä

Raporttiin merkitään rivikohtaiset varoitukset:

- title puuttuu, yli 60 merkkiä tai alle 20
- description puuttuu, yli 160 merkkiä tai alle 70
- canonical puuttuu, ei absoluuttinen tai osoittaa eri URL:iin kuin sivu itse
- og:url ei vastaa canonicalia
- duplikaatti-title tai duplikaatti-description usealla sivulla
- hreflang-joukko epäsymmetrinen (sivu listaa kielen, jonka sivu ei listaa takaisin) tai puuttuva `x-default`
- H1 puuttuu tai niitä on useampi kuin yksi

## Tulostiedostot

- `/mnt/documents/metatags-<pvm>.csv` — koko taulukko, avattavissa Exceliin
- `/mnt/documents/metatags-<pvm>.md` — tiivistelmä: kokonaismäärät, virhelistat kategorioittain, top-duplikaatit

## Tekniset huomiot

- Ei muutoksia projektin koodiin, reitteihin eikä sisältöön — pelkkä luku ja raportointi.
- URL-lähde on `public/sitemap.xml` (558 URL:ia), joka kattaa myös tietokannasta tulevat seo_pages-sivut.
- Ajo tehdään paikallista dev-palvelinta vasten (`http://localhost:8080`), rinnakkain muutamalla sivulla kerrallaan; kesto muutamia minuutteja.
