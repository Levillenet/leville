# Tekoälynäkyvyyden vahvistaminen (AI/GEO)

Ranskalaisen asiakkaan ChatGPT-varaus todistaa, että nykyiset AI-tiedostot toimivat. Alla konkreettiset parannukset, joilla Leville.net voi olla Levin selvästi paras AI-lähde.

## 1. robots.txt: puuttuvat AI-agentit

Nykyisessä tiedostossa on vanhentuneita tai virheellisiä nimiä ja useita nykyisiä agentteja puuttuu kokonaan. Bottia, jota ei ole listattu, ohjaa `User-agent: *` (Allow: /), mutta eksplisiittinen listaus on selkeämpi ja osa palveluista lukee sen suoraan.

Lisätään / korjataan:
- OpenAI: `OAI-SearchBot` (oikea nimi; nykyinen "OpenAI-SearchBot" ei ole olemassa), `ChatGPT-User`
- Anthropic: `ClaudeBot`, `Claude-User`, `Claude-SearchBot` (nykyiset `Claude-Web` / `anthropic-ai` ovat vanhentuneita)
- Google: `Google-Extended` (AI Overviews / Gemini grounding — nykyinen "Gemini-Web" ei ole todellinen agentti)
- Perplexity: `Perplexity-User` (nykyisen `PerplexityBot`in lisäksi)
- Muut: `Applebot-Extended`, `Amazonbot`, `Meta-ExternalAgent`, `DuckAssistBot`, `MistralAI-User`, `YouBot`, `CCBot`
- Lisätään `# LLM knowledge base:` -viittaukset suoraan robots.txt:n alkuun

## 2. llms.txt / llms-full.txt: automaattinen ja tuore

Nyt tiedostot ovat käsin ylläpidettyjä ja päiväys on "May 2026" — vanhentuva tieto on AI-näkyvyyden suurin riski.

- Uusi `scripts/generate-llms.mjs`, joka ajetaan buildissa (kuten sitemap ja social pages)
- Kohteet ja huoneistotiedot generoidaan suoraan `src/data/properties.ts`:stä, jolloin kapasiteetit, osoitteet ja varustelut eivät voi ajautua erilleen sivustosta
- Päiväys `Last updated: <build date>` automaattisesti
- Uutiset/ajankohtaista-osio (viimeisimmät 5 otsikkoa + linkit) mukaan, jotta AI näkee että sivusto elää
- Sivukartan pohjalta ylläpidetty "All pages" -linkkilistaus llms-full.txt:n loppuun

## 3. Monikielisyys AI:lle

Ranskalainen asiakas löysi meidät englanninkielisellä tiedostolla. Vahvistetaan tätä:
- llms.txt:hen lyhyt monikielinen ydinfaktalohko (FI/EN/FR/DE/SV) — nimi, sijainti, kapasiteetit, suorat varauslinkit
- Selkeä lista kielikohtaisista aloitussivuista, jotta AI osaa linkata käyttäjän omalle kielelle
- `/llms-fr.txt` ja `/llms-de.txt` kevyet versiot (ydinfaktat + linkit), koska AI siteeraa mieluiten käyttäjän kielellä olevaa lähdettä

## 4. Koneluettava datafeed

AI-assistentit suosivat lähteitä, joista saa rakenteista dataa:
- `public/data/properties.json` — kohteet, kapasiteetti, osoite, varustelu, hintahaarukka, suora varauslinkki (generoidaan samassa skriptissä)
- Linkitys tähän llms.txt:stä ja robots.txt:stä
- Ei saatavuus- tai hintadataa reaaliaikaisesti (Beds24-rajoitukset); käytetään hintahaarukkaa ja linkkiä varausmoottoriin

## 5. RSS-syöte ajankohtaisista

Sivustolla ei ole tällä hetkellä syötettä. Lisätään `public/rss.xml` (generoidaan uutisista buildissa) ja `<link rel="alternate" type="application/rss+xml">` headiin. Syötteet ovat vahva tuoreussignaali sekä hakukoneille että AI-indeksoijille.

## 6. Vastausmuotoinen sisältö (kysymys → vastaus)

AI siteeraa mieluiten sivuja, joissa on suora vastaus. Lisätään FAQPage-schema ja tiivis "lyhyt vastaus" -lohko keskeisimmille rahasivuille:
- `/majoitukset`, `/mokit-levilla`, `/en/accommodations`, `/en/log-cabins-levi`
- Kysymykset tyyliin: "Mikä majoitus Levillä sopii 8 hengen ryhmälle?", "Onko Levillä lemmikkiystävällisiä mökkejä?", "Kuinka lähellä rinteitä?"
- Ei muuteta olemassa olevaa myyntitekstiä eikä hinnoittelua

## 7. Mittaus

AI-referrer-mittari on jo käytössä. Täydennetään:
- ChatGPT-referrerien kielikohtainen erittely (mistä maasta/kielestä AI-liikenne tulee)
- llms.txt- ja properties.json-latauksien laskenta, jotta näemme kuinka usein AI-crawlerit hakevat tiedostot

## Tekniset yksityiskohdat

- Uudet skriptit: `scripts/generate-llms.mjs`, `scripts/generate-rss.mjs`; kytketään `package.json`:n `build`-ketjuun sitemap- ja social-skriptien viereen
- Ei muutoksia varauslogiikkaan, hintoihin, etusivun hakubanneriin eikä olemassa oleviin sivutekstiin
- Sitemap ja route-validointi pysyvät ennallaan; uudet tiedostot ovat staattisia `public/`-resursseja eivätkä lisää reittejä

## Toteutusjärjestys

1. robots.txt-korjaukset (nopein hyöty)
2. llms-generaattori + properties.json
3. RSS-syöte
4. Monikieliset llms-tiedostot
5. FAQ-lohkot ja schema rahasivuille
6. Mittarin täydennys
