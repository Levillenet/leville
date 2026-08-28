# robots.txt:n modernisointi (Cloudflare-esto poistettu)

## Vahvistettu juuri nyt

Hain `https://leville.net/robots.txt` uudelleen: Cloudflaren `# BEGIN Cloudflare Managed content` -lohko on **kadonnut** kokonaan, samoin `Content-Signal: ai-train=no` ja `Disallow: /` -rivit GPTBotille, ClaudeBotille, Google-Extendedille ym. Live-tiedosto on nyt tarkalleen oma `public/robots.txt` (2 180 tavua). Esto on korjattu.

Cloudflaren AI Crawl Control -näkymän mukaan liikennettä tulee jo runsaasti: OpenAI (ChatGPT-User +2) 151 sallittua pyyntöä / 24 h, Apple 72 (+323 %), Microsoft 86, Google 66.

## Jäljellä: oman robots.txt:n siivous

Tiedostossa on vanhentuneita tai olemattomia agenttinimiä, jotka eivät tee mitään.

Poistetaan (eivät ole olemassa olevia crawlereita):
- `Claude-Web`, `anthropic-ai` — Anthropic vaihtoi nimet
- `Gemini-Web` — ei ole todellinen user-agent
- `OpenAI-SearchBot` — oikea nimi on `OAI-SearchBot`
- `AdsBot-Google-ER`, `cohere-ai` — ei merkitystä meille
- Duplikaatti `facebookexternalhit` (esiintyy kahdesti)

Lisätään oikeat nykyiset nimet:
- OpenAI: `GPTBot` (mallikoulutus), `OAI-SearchBot` (ChatGPT-haun indeksi), `ChatGPT-User` (live-haku käyttäjän kysyessä)
- Anthropic: `ClaudeBot`, `Claude-User`, `Claude-SearchBot`
- Google: `Google-Extended` (Gemini / AI Overviews -grounding)
- Perplexity: `PerplexityBot`, `Perplexity-User`
- Apple: `Applebot`, `Applebot-Extended`
- Muut: `Amazonbot`, `meta-externalagent`, `DuckAssistBot`, `MistralAI-User`, `YouBot`, `CCBot`, `Bytespider`

Lisätään positiiviset sisältösignaalit `User-agent: *` -ryhmään, jotta ne ovat julkinen vastapaino aiemmalle Cloudflare-lohkolle:
`Content-Signal: search=yes,ai-input=yes,ai-train=yes,use=full`

Muuta:
- Poistetaan `Crawl-delay`-rivit AI-agenteilta (hidastavat turhaan; Googlebot ohittaa ne joka tapauksessa)
- Säilytetään `Disallow: /admin`, `/.env`, `/.git` sekä `Sitemap:`-rivi ennallaan
- Nostetaan `llms.txt` ja `llms-full.txt` -viittaukset tiedoston alkuun `Sitemap:`-rivin viereen, jotta agentit löytävät ne heti

## Varmistus

Julkaisun jälkeen haen `https://leville.net/robots.txt` ja tarkistan, että uudet agentit näkyvät eikä Cloudflare-lohko ole palannut. Testaan lisäksi yhden sivun haun `ChatGPT-User`- ja `OAI-SearchBot`-user-agentilla, että edge palauttaa 200 eikä 403.

## Tekniset yksityiskohdat

Muutos koskee vain tiedostoa `public/robots.txt`. Ei muutoksia sitemapiin, reitteihin, metatageihin, llms-tiedostoihin eikä sisältöön.

## Seuraava askel tämän jälkeen (erillinen työ)

Kun robots on kunnossa, seuraava tekoälynäkyvyyden vahvistus on `llms.txt` / `llms-full.txt` -tiedostojen automaattinen generointi buildissa (nyt käsin ylläpidetty, päiväys "May 2026") sekä koneluettava `properties.json`. Teen niistä erillisen suunnitelman, jos haluat.
