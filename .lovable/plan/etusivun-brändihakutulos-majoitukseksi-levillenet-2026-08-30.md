# Etusivun brändihakutulos majoitukseksi ("levillenet")

## Ongelma
Haulla "levillenet" Google näyttää etusivun vanhalla opas-otsikolla: "Leville.net – paikallinen Levi-opas: lumitilanne, ladut ja rinteet". Brändihakijalla on ostointentti — hän etsii majoitusta, ei opasta. Otsikon ja kuvauksen pitää myydä majoitusta ja rakentaa luottamusta.

## Tausta (tarkistettu koodista)
- `src/pages/Index.tsx` FI-title on jo "Majoitus Levillä – Vuokramökit ja huoneistot keskustassa", mutta Google näyttää vanhaa välimuistissa olevaa versiota.
- FI-kuvaus mainitsee majoituksen, mutta ei korosta paikallisuutta, pitkää kokemusta tai luotettavuutta.
- Opas-sisältöä ei poisteta etusivulta — se on sivun SEO-vahvuus. Muutetaan vain viestintä: majoitus ensin, opas tukena.

## Muutokset

### 1. Etusivun FI-metat (src/pages/Index.tsx)
- Uusi title (max ~60 merkkiä): esim. **"Leville.net – Majoitus Levin keskustassa suoraan omistajalta"**
- Uusi description (140–158 merkkiä) joka sisältää:
  - majoitus Levin keskustassa (huoneistot ja mökit)
  - paikallinen, pitkän linjan majoitusyritys
  - suora varaus ilman välityspalkkioita
  - henkilökohtainen palvelu / hyvin palveleva
- Päivitetään samat tekstit og:title / og:description / twitter-kenttiin (jakokuvauksissa sama viesti).
- EN-title/description saman suuntaisiksi (brändihaku näyttää joskus EN-versiota).

### 2. H1 / Hero-tekstin tarkistus
- Varmistetaan, että etusivun H1 ja hero-alateksti sanovat majoituksen ensin (ei "Levi-opas" pääviestinä). Hero on muuten suojattu (äskettäinen ohje), joten tehdään vain minimaalinen tekstimuutos, ei rakenteellisia muutoksia.

### 3. Strukturoitu data (organisaatio)
- Tarkistetaan `getLodgingBusinessSchema` / WebSite-schema: description-kentät majoituspainotteisiksi ("Accommodation provider in Levi centre since 2012, direct booking").
- Lisätään Organization/LodgingBusiness-schemaan `foundingDate: 2012` jos puuttuu — vahvistaa "pitkän linjan toimija" -signaalia Googlelle.

### 4. Google saa indeksoida uudelleen
- Julkaisun jälkeen varmistetaan tuotantoversio: `document.title` ja meta description leville.net-etusivulla.
- Ohjeistetaan pyytämään GSC:ssä URL-tarkastus → "Pyydä indeksointia" etusivulle (nopeuttaa otsikon päivittymistä, yleensä muutama päivä).

### 5. Sitelinkit
- Googlen generoimat alalinkit ("Majoitukset", "Majoitus Levillä") ovat jo hyviä. Vahvistetaan ettei alalinkkien kuvaukset ole vanhoja opastekstejä.

## Mitä EI tehdä
- Ei kosketa opassivuihin, sivukarttaan, reitteihin tai näkyvään layouttiin.
- Ei poisteta opas-sisältöä etusivulta (HomeSeoBlock, GuideLinksSection pysyvät).
- Ei muuteta booking-banneria tai Hero-komponentin rakennetta.

## Varmistus
- Build + typecheck.
- Playwright: tarkista title/meta description reitillä `/` ja `/en`.
- Julkaisun jälkeen curl-tarkistus tuotannosta ja GSC-indeksointipyyntöohje käyttäjälle.
