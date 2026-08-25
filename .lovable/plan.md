# Seuratuki-sivu: "Tue omaa seuraasi – varaa Leville"

Uusi suomenkielinen sivu, joka esittelee Leville.netin seuratuen yhteistyömallin urheiluseuroille ja järjestöille. Sivu rakennetaan olemassa olevilla Leville.net-komponenteilla ja -tyyleillä, samalla tavalla kuin nykyinen `/myy-loma-asuntosi` -B2B-sivu.

## URL ja perusrakenne

- URL: `/seuratuki` (vain FI, ei kielivalitsinta, ei hreflangia)
- Sama sivupohja kuin muilla FI-alasivuilla: `SubpageBackground` + `Header` + `Breadcrumbs` + `ScrollReveal`-osiot + `PageCTA`/`Footer`
- Glass-card -osiot, serif-otsikot, nykyinen väripaletti ja Lucide-ikonit — ei uusia design-ratkaisuja

## Sisältö (osiot ylhäältä alas)

1. **Hero** – H1 "Tue omaa seuraasi – varaa majoitus Leviltä", alaotsikkona ydinlupaus: majoittuja maksaa normaalin hinnan, seura saa 10 % verottomasta hinnasta. Kaksi CTA:ta: "Varaa majoitus" (nykyinen Moder-varauspolku, uusi välilehti) ja "Ota seurasi mukaan" (mailto:info@leville.net).
2. **Laskuesimerkki** – korostettu kortti: 1 000 € veroton majoitushinta = 100 € seuralle. Selkeä, yksi luku, ei taulukkoviidakkoa.
3. **Kahden kohderyhmän jako** – kaksi rinnakkaista korttia:
   - *Majoittujalle*: varaa seurasi koodilla tai linkillä, normaali hinta, ei lisäkuluja → CTA varaukseen.
   - *Seuralle tai järjestölle*: lisätuloja ilman tuotemyyntiä tai tilausten keräämistä → CTA sähköpostiin.
4. **Näin se toimii** – numeroidut askeleet (sama askelkomponenttityyli kuin `/myy-loma-asuntosi`): seura ottaa yhteyttä → seura saa oman koodin ja varauslinkin → seura jakaa niitä kanavissaan → jäsen varaa normaalihintaan → Leville.net tilittää 10 % verottomasta hinnasta toteutuneista varauksista.
5. **Mitä seura saa** – lista: seurakoodi, varauslinkki, Leville.netin toimittama logo, varausohjeet ja tarvittaessa muu markkinointimateriaali.
6. **Mitä seuralta odotetaan** – markkinointi omissa kanavissa (esim. Facebook, Instagram) sekä logon, varausohjeiden ja varauslinkin lisääminen seuran verkkosivuille.
7. **UKK** – nykyinen Accordion-komponentti: saako majoittuja alennusta, mistä koodin saa, mitkä varaukset lasketaan, miten tuki maksetaan seuralle, kuka voi liittyä. Vastaukset vain promptin ja sivuston nykytietojen pohjalta.
8. **Loppu-CTA** – "Liitä seurasi mukaan" → `mailto:info@leville.net`, rinnalla varauslinkki. Ei yhteydenottolomaketta.

Kaikki tekstit kirjoitetaan Leville.netin nykyisellä äänensävyllä. Ei keksittyjä seuroja, euromääriä, tilastoja tai tulolupauksia.

## SEO

- SEO title ja meta description urheiluseuran varainhankinnan ympärille (esim. "Urheiluseuran varainhankinta ilman myyntiä | Leville.net")
- H2-rakenne kattaa hakutarkoitukset: seuran varainhankinta, varainhankinta ilman myyntiä, Levin majoitus seurakoodilla, oman seuran tukeminen
- Canonical `https://leville.net/seuratuki`, `robots: index, follow`, OG/Twitter-tagit samalla kaavalla kuin muilla FI-sivuilla
- Structured data: `BreadcrumbList` + `FAQPage` (UKK-osion pohjalta) + `Offer`/`Service`-tyyppinen kuvaus yhteistyömallista
- Sisäinen linkitys: linkit `/majoitukset`, `/yhteystiedot` ja `/mokit-levilla`; sivu lisätään footerin linkkilistaan ja sivuston hakuindeksiin

## Tekniset muutokset

- Uusi tiedosto `src/pages/Seuratuki.tsx`
- `src/App.tsx`: lazy import + reitti `/seuratuki`
- `src/data/sitemapRoutes.ts`: `{ path: "/seuratuki", lang: "fi", priority: 0.7, changefreq: "monthly" }`
- `src/data/searchIndex.ts`: hakuindeksimerkintä
- `src/components/Footer.tsx`: linkki seuratuki-sivulle olemassa olevaan linkkiryhmään
- Sitemap generoidaan uudelleen buildissa; `bun run build` + reittivalidointi ajetaan lopuksi
