## Karhupirtin kylpyhuonetietojen korjaus

Käyttäjän tarkennus: **2 erillistä WC:tä** + **3 ensuite-makuuhuonetta** (oma WC ja suihku).

Nykytilanne `src/data/properties.ts` (rivit 174–175):
- `bathrooms: "5"` (epäselvä – ei vastaa muiden kohteiden konventiota, joissa `bathrooms` = suihkulliset kylpyhuoneet ja `wc` = erilliset WC:t)
- `wc: "1"` (väärä)

### Muutokset

**1. `src/data/properties.ts` (Karhupirtti, rivit 174–175)**
- `bathrooms: "3"` (3 ensuite-suihkukylpyhuonetta)
- `wc: "2"` (2 erillistä WC:tä)

**2. `src/data/propertyTranslationsFi.ts` – Karhupirtin `longDescription` (rivi 79)**
Päivitetään "Tilaa jopa 14 vieraalle 7 makuuhuoneessa" -kappale niin, että se mainitsee selkeästi:
- Alakerrassa 3 ensuite-makuuhuonetta (oma suihku + WC kussakin)
- **Lisäksi 2 erillistä WC:tä** yhteiskäyttöön (yksi yläkerrassa, toinen alakerrassa – tarkka sijainti tarvittaessa)
- Yhteensä siis 3 suihkukylpyhuonetta + 2 erillistä WC:tä

**3. `src/data/properties.ts` – `shortDescription` (rivi 188, EN)**
Tarkennetaan: "...3 ensuite bedrooms downstairs **plus 2 separate WCs**..."

**4. `src/data/propertyTranslationsFi.ts` – `shortDescription` (rivi 74, FI)**
Tarkennetaan vastaavasti: "...3 ensuite-makuuhuonetta alakerrassa **ja 2 erillistä WC:tä**..."

### Mitä EI muuteta
- Hinnoittelu, kuvat, slug, varauslinkki – ei muutoksia.
- Muiden kielten käännöstiedostoja ei vielä ole Karhupirtille (samaa rakennetta kuin muissa property-käännöksissä), joten odottavat erillistä käännösvaihetta.

### Vahvistus tarvitaan
1. Tulkitsenko `bathrooms`/`wc` -kentät oikein (bathrooms = suihkulliset kph, wc = erilliset WC:t)? Voin tarkistaa muiden kohteiden datasta jos haluat.
2. Onko 2 erillisen WC:n sijainnit tärkeää mainita tekstissä, vai riittääkö yleinen maininta?
