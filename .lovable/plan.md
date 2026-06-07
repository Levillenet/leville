## Vastaus: ei vielä täysin

Etusivu (`/`) on **hyvällä tasolla** (title, description, keywords, H1, JSON-LD LodgingBusiness/VacationRental/WebSite, hreflang, Hero + About + GuideLinks + Activities), mutta **muutama kärkihakusana ja tekninen vipu puuttuu** vielä — eli "kaikkia mahdollisia hakusanoja" se ei vielä tarjoile. Alla mitä on jäljellä.

## Mitä etusivulta puuttuu hakukoneen näkökulmasta

**1. Avainsanaklusterit, joita H1/teksti ei vielä mainitse näkyvänä tekstinä**
Title/keywords-meta sisältää ne, mutta Google painottaa **näkyvää H1- ja leipätekstiä**:
- "loma-asunto Levi" / "lomahuoneisto Levi" (n. 1 500 hakua/kk)
- "majoitus Levin keskusta" (eksakti fraasi puuttuu H1:stä)
- "mökkivuokraus Levi" / "levin mökkivuokraus" (vain metassa)
- "huoneisto Levi keskusta" (vain alaotsikossa hajallaan)
- "Levi Booking.com vaihtoehto" / "Levi suoraan omistajalta"
- "Levi majoitus edullisesti" / "halpa majoitus Levi"
- "Levi sauna mökki" / "saunamökki Levi"
- Ryhmäkokoa kuvaavat: "majoitus Levi 4 hengelle / 6 / 8 / 10 / 14"

**2. Sisäisten linkkien ankkureista puuttuu hub-/tyyppikohtaisia avainsanoja etusivulla**
Tällä hetkellä etusivulla linkit menevät pääosin oppaisiin ja aktiviteetteihin. Pitäisi olla **näkyvä hub-grid tai SEO-tekstipalkki**, jossa ankkurit:
- "Skistar-huoneistot Postintie 3:lla" → `/vuokramokit/postintie-levi`
- "Glacier-alppihuoneistot keskustassa" → `/vuokramokit/glacier-apartments-levi`
- "Bearlodge — hirsihuvilat Levin keskustassa" → kohde
- "Hiihtäjänkujan mökit" / "Ratsastajankujan mökit" → hubit
- "Mökit Leviltä 10 hengelle" / "...14 hengelle" → tyyppisivut
- "Studiohuoneistot Leviltä" / "Penthouse-huoneistot Leviltä"

**3. FAQPage-skeema puuttuu etusivulta**
`Majoitukset.tsx`-sivun FAQ:t (8 kpl) ovat olemassa mutta etusivulla ei ole FAQ-sektiota eikä FAQPage JSON-LD:tä. 3–5 huolella valittua kysymystä etusivulle tuo SERP-rich-resulteja avainsanoille "majoitus levi hinta", "mikä on paras majoitus Levillä", "Levi mökki vai huoneisto".

**4. BreadcrumbList puuttuu etusivulta** (kuuluu kotisivulle vain triviaalisti, mutta hreflang x-default ok). Tämä on pieni.

**5. Vertailu-/päätösankkurit puuttuvat**
- "Levi vs Rovaniemi" / "Levi vs Saariselkä" -kortit on /opas-puolella, mutta etusivulla ei ole linkkiä → menetetään "missä yöpyä Lapissa" -tyyppinen liikenne.

**6. Hintainformaatio puuttuu näkyvästä tekstistä**
Google nostaa "majoitus Levi hinta"-hakuihin sivuja, joissa on hintahaarukka näkyvissä. FAQ:ssa Majoitukset-sivulla on, mutta etusivulla ei.

**7. Tekninen pikku-asia**
`<meta name="keywords">` on edelleen mukana — Google ei käytä sitä, ei haittaa, mutta päällekkäisiä avainsanoja kannattaa siirtää pikemminkin **näkyvään leipätekstiin** kuin keywordsiin.

**8. `index.html` `<title>` on edelleen pelkkä "Leville.net"**
React-Helmet kirjoittaa sen yli, mutta **prerender/social crawlers** näkevät hetken raakaversion. Pitäisi olla heti suomenkielinen brändi+kärki: `"Majoitus Levillä — mökit & huoneistot keskustassa | Leville.net"`.

## Ehdotettu paketti (1 iteraatio)

**Vaihe A — index.html-fallback (5 min)**
- Päivitä `<title>` ja lisää staattinen `<meta name="description">` index.html:ään fallbackiksi.

**Vaihe B — Etusivun SEO-tekstipalkki (uusi komponentti)**
- Luodaan `src/components/HomeSeoBlock.tsx`: 250–400 sanaa näkyvää tekstiä, joka kattaa:
  - "majoitus Levillä", "vuokramökit Levi", "lomahuoneisto Levi", "mökkivuokraus Levi", "huoneisto Levin keskustassa", "saunamökki Levi", hintahaarukat, ryhmäkoot 2–14.
  - H2: "Majoitus Levillä — kaikki vaihtoehdot keskustassa".
- Sijoitetaan `Index.tsx`-sivulle About:n ja GuideLinks:n väliin.
- Sisältää **6–10 hub-linkkiä** ankkuriteksteillä (Skistar Postintie 3, Glacier, Bearlodge, Hiihtäjänkuja, Ratsastajankuja, Studiot, Penthouset, 10 hengelle, 14 hengelle, vertailu Saariselkä/Rovaniemi).

**Vaihe C — FAQ-sektio etusivulle + FAQPage JSON-LD**
- Lisätään `HomeFaq.tsx`, 4 kysymystä (hinta, paras sijainti, mökki vs huoneisto, suoraan omistajalta -säästö).
- Vastaava `FAQPage` schema `JsonLd`-komponentin kautta.

**Vaihe D — Localized fallback muille kielille**
- Sama HomeSeoBlock tekee kielikohtaisen tekstin `getTranslations(lang)`-kautta (vain FI-teksti ensin, muut käännetään jälkikäteen, jotta ei syntyy ghost-sisältöä englanniksi käännösten odottaessa).

**Tekniset tiedostot, joita muutos koskee:**
- `index.html` (title + description fallback)
- `src/pages/Index.tsx` (lisää HomeSeoBlock + HomeFaq + FAQPage JSON-LD)
- `src/pages/en/Index.tsx` (vastaavasti EN — vain jos tekstit ovat käännetty; muuten skipataan)
- `src/components/HomeSeoBlock.tsx` (uusi)
- `src/components/HomeFaq.tsx` (uusi)
- `src/translations/fi.ts` (uudet avaimet `home.seoBlock`, `home.faq`)

## Realistinen vaikutus

- 5 puuttuvaa core-klusteria etusivulla → odotettavissa +10–25 % orgaanista liikennettä etusivulle 4–8 viikossa.
- FAQ-rich-resultit → CTR-nousu n. +10–15 % näytöistä.
- Sisäisten ankkurien parannus → hub-sivut (Postintie, Glacier) saavat lisää linkkivoimaa etusivulta = nopeampi nousu Skistar/Glacier-hauissa.

## Mitä **ei** tehdä tässä

- Ei muuteta `Hero`-komponenttia tai sen kuvaa (LCP-riski).
- Ei lisätä `<meta name="keywords">`-kenttiä lisää.
- Ei muiden kielten käännöksiä samassa iteraatiossa (vältetään puolivalmis sisältö → ghost-URL-riski).

Hyväksytkö, niin toteutan A–D?
