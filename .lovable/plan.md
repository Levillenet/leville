## Tavoite

Poistetaan kaikki muut talvivaatevuokraamomaininnat sivustolta ja nostetaan **Winterent (winterent.fi)** ainoaksi suositelluksi vaatevuokraajaksi: alan ensimmäinen ja Suomen suurin, vaatteet voi vuokrata Rovaniemeltä ja palauttaa Levillä tai päinvastoin. Kaikki kieliversiot varmistetaan.

## Muutokset

### 1. Winterent-logo assetiksi
Ladattu logo (`Winterent_musta_teksti_pelkistetty…png`) viedään Lovable Assets -CDN:ään ja tallennetaan osoittimena `src/assets/winterent-logo.png.asset.json`. Käytetään `<img>`-elementtinä, jolla on eksplisiittiset width/height (CLS-sääntö).

### 2. `src/pages/guide/WinterClothingGuide.tsx` (fi, en, nl)
Sivulla on tällä hetkellä kolme kieliobjektia (fi, en, nl) — muut kielet käyttävät EN-sisältöä reittikartan mukaan, joten kaikki 7 kieliversiota kattuvat näillä.

Osiossa **"Mistä varusteet Levillä?" / "Where to Get Gear in Levi" / "Wat kun je huren in Levi?"**:
- Poistetaan "Lappset Rental", "vuokraamot rinteillä/keskustassa" ja muut nimeämättömät vaatevuokraamomaininnat.
- Jäljelle jää: **Winterent** (talvivaatteet) + Levi Ski Resort (vain lasketteluvälineet) + safari-operaattorit (haalarit safarin hintaan).
- Lisätään Winterentille oma korostettu vuokrauskortti osioon: logo, otsikko, myyntipointit (Suomen suurin ja alan ensimmäinen vaatevuokraaja; nouto Rovaniemeltä ja palautus Levillä tai toisinpäin) ja nappi/linkki `https://winterent.fi` `target="_blank" rel="noopener noreferrer"`.
- Vinkkiteksti (`tip`) muotoillaan uudelleen: vuokraa päällysvaatteet Winterentiltä, tuo aluskerrokset kotoa.

FAQ-vastaukset kolmella kielellä:
- "Voiko Levillä vuokrata talvivaatteita?" → vastaus nimeää Winterentin ja Rovaniemi–Levi-ristiinpalautuksen; poistetaan "useita vuokraamoja".
- NL: `Kan ik ski-uitrusting huren in Levi?` ja `Moet ik winterkleding kopen…` -vastauksista poistetaan yleiset "verhuurwinkels"-vaatemaininnat, tilalle Winterent.
- NL-jalkinekohta ("snowboots huren bij Levi Ski Resort verhuurwinkels") → Winterent.

### 3. `src/pages/guide/EquipmentRentalLevi.tsx` (välineiluopas)
- Rivi "Talvivaatteita (haalari, hanskat, kengät) osasta vuokraamoista" → korvataan Winterent-maininnalla ja ulkoisella linkillä; muu välinevuokraussisältö (sukset, laudat, monot) jätetään ennalleen.
- Lisätään lyhyt Winterent-rivi/linkki "Mistä varusteet"-osioon.

### 4. Ristiviittaukset
Talvivaateoppaan Winterent-kortista linkki myös välineiluoppaaseen ja päinvastoin, jotta vaatevuokraus löytyy molemmista suunnista.

## Ei muutoksia
- Sivujen rakenne, otsikot, meta-tiedot tai layout eivät muutu — vain vuokraussisällön tekstit ja uusi Winterent-kortti.
- Kuivauskaappi-/kiinteistötekstit (propertyTranslations) eivät liity vaatevuokraukseen, ne jäävät koskematta.
- Sitemap ja reitit ennallaan.

## Tekniset huomiot
- Winterent on ulkoinen kumppani → kaikki linkit `target="_blank"` (muistisääntö).
- Logokortissa käytetään semanttisia design-tokeneita (`bg-card`, `border-border`), ei kovakoodattuja värejä.
