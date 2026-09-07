# AI-liikenteen mittaus: puuttuvat ChatGPT-kävijät takaisin näkyviin

## Mitä data kertoo (tarkistettu juuri nyt)

Kävijöitä tulee ChatGPT:stä joka päivä — myös 6.9. ja 7.9. Ne eivät vain kelpaa nykyiselle laskennalle.

- Tunnistus katsoo tällä hetkellä **vain viittaavaa osoitetta** (referrer). Viimeinen ChatGPT-referrer on 5.9. (7 istuntoa).
- ChatGPT merkitsee nykyään kävijät linkin **osoiteparametrilla** `utm_source=chatgpt.com` ja jättää viittaavan osoitteen tyhjäksi. Näitä on tallessa runsaasti:
  - 5.9.: 20 istuntoa, 6.9.: **21 istuntoa**, 7.9. (klo 11 mennessä): 2 istuntoa
  - 30.8.: 20 istuntoa, yhteensä 232 sivukatselua 20 päivän ajalta
- Suurimmalla osalla näistä referrer on tyhjä, joten ne näkyvät nyt "suorana liikenteenä".

Kyse ei siis ole kävijäkadosta eikä kirjauksen rikkoutumisesta, vaan siitä että AI-tunnistus katsoo väärää kenttää.

## Korjaus

1. **Tunnistus katsoo myös osoiteparametria.** AI-lähde päätellään järjestyksessä: referrer ensin, ja jos se ei osu, `utm_source` (chatgpt.com, perplexity.ai, gemini/google-gemini, copilot, claude.ai, muut AI-arvot). Sama sääntö sekä JSON-vastaukseen että CSV-vientiin.
2. **Istuntotaso ennallaan:** istunnon ensimmäinen sivukatselu määrää lähteen, ja istunto lasketaan konvertoivaksi, jos siinä on varausklikkaus. Muutos koskee vain sitä, mistä lähde luetaan.
3. **Historia korjautuu itsestään** — laskenta tehdään joka kerta uudelleen tallennetusta datasta, joten myös elo–syyskuun ChatGPT-istunnot ilmestyvät kortille takautuvasti.
4. **Admin-kortti:** ei ulkoasumuutoksia. Vain huomiotekstiä täydennetään: lähde tunnistetaan joko viittaavasta osoitteesta tai linkin merkinnästä, joten luku on edelleen alaraja.

Mitään muuta analytiikkaa, sisältöä tai varauslogiikkaa ei kosketa.

## Tekniset yksityiskohdat

- `supabase/functions/get-page-view-stats/index.ts`: `classifyAiReferrer(referrer)` → `classifyAiSource(referrer, utmSource)`; `AI_REFERRER_MAP`:in rinnalle `AI_UTM_MAP`. `utm_source` on jo mukana taulussa; varmistetaan että se on select-listalla molemmissa haaroissa (JSON + CSV).
- Dev/preview-referrerien suodatus säilyy; utm-pohjaisessa tunnistuksessa suodatetaan sama joukko referrerin perusteella.
- `src/components/admin/PageViewsAdmin.tsx`: vain kortin selitetekstin päivitys.
- Varmistus: funktion kutsu ja tarkistus, että 6.9. näyttää ~21 ChatGPT-istuntoa ja 7.9. ei ole enää nolla.
