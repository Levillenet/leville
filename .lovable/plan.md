## Toteutus: vaiheet 1 ja 2

Tehdään pelkkiä on-page-tekstimuutoksia (otsikot, meta, title, H1) suomenkieliseen versioon. Ei uusia sivuja, ei reittimuutoksia, ei uusia komponentteja.

### Muutos 1 — `/majoitukset` (FI) `src/translations/fi.ts` rivit 57–66

- **Meta title** lyhennetään alle 60 merkkiin ja kohdistetaan rahaa tuovaan hakuun: `"Majoitus Levillä {vuosi} | Mökit & huoneistot keskustassa"`
- **Meta description** alkaa "Majoitus Levillä —" ja sisältää saunalliset, vuokramökit, keskusta, ilman välityspalkkioita
- **Keywords** lisätään "levi huoneistot" ja "levi hotelli vaihtoehto"
- **H1 (title)**: `"Majoitus Levillä — mökit ja huoneistot Levin keskustassa"` (lyhyempi, money keyword alussa, ei "27" jonka pitää päivittää käsin)
- **Subtitle**: vahvistetaan mainitsemaan saunalliset + ravintolat/palvelut
- Sivun olemassa oleva 300 sanan intro (Majoitukset.tsx rivit 150–174) on jo hyvä — säilytetään

### Muutos 2 — Etusivu (FI)

**`src/translations/fi.ts` rivit 2–14** (Hero):
- title: `"Majoitus Levillä —"` (oli "Huoneistot Levin")
- titleHighlight: `"mökit ja huoneistot keskustassa"` (oli "parhailla paikoilla")
- subtitle: vahvistetaan mainitsemaan "vuokramökit" ja "huoneistot" eksplisiittisesti

**`src/pages/Index.tsx` rivit 34–40** (FI SEO-meta):
- title: `"Majoitus Levillä — mökit & huoneistot keskustassa | Leville"` (alle 60 merkkiä, money keyword alussa)
- description: alkaa "Majoitus Levillä suoraan omistajalta", sisältää saunalliset, vuokramökit, ilman välityspalkkioita
- keywords: laajennetaan: levi mökit, mökki Levi, vuokramökit Levi, levi huoneisto, levi hotelli, levin keskusta majoitus

### Mitä EI muuteta

- Muut kielet (en/sv/de/es/fr/nl) — niissä volyymit ovat pieniä, fokus FI:hen ensin
- Sivustorakenne, reitit, komponentit, kuvat
- /majoitukset-sivun intro-kappale (jo riittävän vahva)
- Hero-kuvat, animaatiot, varauswidget

### Odotettu vaikutus

- Etusivu rankkaa jo #10 haulla "majoitus levi" (12 100/kk). H1- ja title-muutos kohdistaa sivun selkeämmin tähän hakuun → odotettavissa siirtymä top 5:een 4–8 viikon sisällä uudelleenindeksoinnin jälkeen.
- /majoitukset (joka ei tällä hetkellä rankkaa mistään) saa selkeän kohdistuksen ja alkaa kerätä pitkän hännän hakuja kuten "vuokramökit Levi", "levi mökit", "huoneisto Levin keskusta".

### Jatkotoimet (eivät kuulu tähän vaiheeseen)

Vaihe 3 (suomenkieliset majoitustyyppi-hubit) ja vaihe 6 (sisäinen linkitys oppaista majoitukseen) ovat seuraavat tehokkaimmat liikkeet. Tehdään, kun vaiheen 1+2 vaikutus on nähty SEO-skannissa.
