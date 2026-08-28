# Cloudflaren AI-eston poisto ja robots.txt:n korjaus

## Mitä varmistin juuri nyt

- `https://leville.net/robots.txt` (200, `server: cloudflare`) alkaa lohkolla `# BEGIN Cloudflare Managed content` … `# END Cloudflare Managed Content`, jossa on `Content-Signal: search=yes,ai-train=no,use=reference` sekä `Disallow: /` seuraaville: Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, CloudflareBrowserRenderingCrawler, Google-Extended, GPTBot, meta-externalagent. Oma tiedostomme alkaa vasta tämän jälkeen.
- `https://leville.lovable.app/robots.txt` palauttaa **vain** oman tiedostomme ilman Cloudflare-lohkoa.

Johtopäätös: lohkoa ei injektoi Lovable eikä se ole repossa. Se tulee **leville.net-verkkotunnuksen omasta Cloudflare-zonesta**, jossa on päällä "AI Crawl Control / Managed robots.txt (Content Signals Policy)". Tätä ei voi korjata koodista — se on kytkettävä pois Cloudflare-hallinnasta.

## Vaihe 1 — Cloudflare-asetus pois (ainoa oikea korjaus, tehtävä käsin)

Cloudflare-dashboard → valitse zone `leville.net`:
- **AI Crawl Control** (aiemmin "AI Audit") → *robots.txt management* / *Managed robots.txt* → pois päältä
- Jos näkyvissä on erillinen **Content Signals Policy** -kytkin (Security → Settings, tai AI Crawl Control -sivulla) → pois päältä
- Tarkista myös Security → Bots, ettei "Block AI bots / Block AI scrapers and crawlers" ole päällä (se estää botit HTTP-tasolla, jolloin robots.txt:llä ei ole väliä)

Tämä on ainoa asetus, joka poistaa `ai-train=no`- ja `Disallow: /` -rivit. Autan tulkitsemaan näkymän, jos lähetät kuvakaappauksen.

## Vaihe 2 — Oman robots.txt:n siivous ja modernisointi

Nykyisessä `public/robots.txt`-tiedostossa on vanhentuneita/olemattomia agenttinimiä. Korjataan:

- Poistetaan toimimattomat: `Claude-Web`, `anthropic-ai`, `Gemini-Web`, `OpenAI-SearchBot` (väärä nimi), `AdsBot-Google-ER`
- Lisätään oikeat nykyiset:
  - OpenAI: `GPTBot` (koulutus), `OAI-SearchBot` (ChatGPT-haun indeksi), `ChatGPT-User` (live-haku)
  - Anthropic: `ClaudeBot`, `Claude-User`, `Claude-SearchBot`
  - Google: `Google-Extended` (Gemini/AI Overviews -grounding)
  - Perplexity: `PerplexityBot`, `Perplexity-User`
  - Muut: `Applebot`, `Applebot-Extended`, `Amazonbot`, `meta-externalagent`, `DuckAssistBot`, `MistralAI-User`, `YouBot`, `CCBot`
- Lisätään omat vastasignaalit heti tiedoston alkuun, jotta ne ovat mahdollisimman lähellä Cloudflaren lohkoa:
  `Content-Signal: search=yes,ai-input=yes,ai-train=yes,use=full` `User-agent: *` -ryhmään
- Poistetaan `Crawl-delay`-rivit AI-agenteilta (osa crawlereista hidastaa turhaan; Googlebot ohittaa sen joka tapauksessa)
- Nostetaan `llms.txt` / `llms-full.txt` -viittaukset tiedoston alkuun `Sitemap:`-rivin viereen

Huom: niin kauan kuin Cloudflaren lohko on tiedostossa, sama agentti (esim. GPTBot) esiintyy kahdessa ryhmässä. RFC 9309:n mukaan ryhmät yhdistetään ja `Allow: /` voittaa `Disallow: /`:n Googlen toteutuksessa, mutta tulkinta vaihtelee crawlereittain. Siksi vaihe 1 on pakollinen, eikä vaihe 2 yksin riitä.

## Vaihe 3 — Varmistus

Kun Cloudflare-asetus on pois:
- Haen uudelleen `https://leville.net/robots.txt` ja varmistan, että `BEGIN Cloudflare Managed content` -lohko on kadonnut ja `ai-train=no` ei enää esiinny
- Tarkistan että `llms.txt`, `llms-full.txt` ja `sitemap.xml` palautuvat 200:lla apex-domainilta
- Testaan yhden sivun haun ChatGPT-User- ja OAI-SearchBot-user-agentilla, että edge ei palauta 403:a

## Tekniset yksityiskohdat

- Muutokset koodissa rajoittuvat tiedostoon `public/robots.txt`. Ei muutoksia sitemapiin, reitteihin, metatageihin eikä sisältöön.
- Vaihe 1 tapahtuu Cloudflaren hallinnassa, ei repossa — teen sen jälkeen vain varmistukset.
