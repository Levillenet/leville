# SEO-vaihe 2: Majoitussivujen ja rakennus-hubien vahvistaminen

## Tavoite
Vahvistaa leville.netin kaupallisia majoitussivuja niin, että Google ymmärtää yksittäisten huoneistojen sijainnin, koon ja ryhmävarausmahdollisuuden, ja että hakijat löytävät meidät sekä yleisillä että rakennuskohtaisilla hakusanoilla.

## Mitä vaiheessa 2 tehdään

### 1. Rakennus-hubien laajennus ja yhdistäminen
- **Glacier Apartments**: yhdistetään olemassa olevat `/vuokramokit/ratsastajankuja-levi` ja `/vuokramokit/glacier-apartments-levi` niin, että vain yksi vahva hub jää eloon (todennäköisesti `/vuokramokit/glacier-apartments-levi`). Toinen uudelleenohjataan 301/Navigate-komennolla.
- **Skistar-talo (Postintie 3)**: laajennetaan olemassa olevaa hubia lisäämällä uusi asunto 310 ja varmistamalla, että kaikki 10 huoneistoa löytyvät hubin listauksesta.
- **Zero Point / Hiihtäjänkuja**: varmistetaan, että 5A2, 5B2 ja 5B5 Penthouse linkittyvät sekä osoitehubista että Eturinne-hubista.
- **Karhupirtti**: pidetään omana mökkihubinaan, mutta lisätään sille vahvempi "vuokramökit Levi" -sisältö ja linkitys päämökkisivulta.

### 2. Uusi "Vuokramökit Levi" -päähub
Luodaan uusi sivu `/vuokramokit` (FI) ja `/en/cabins` (EN), joka:
- kohdistuu avainsanoihin *vuokramökit Levi*, *mökit Levi*, *huvila Levi*, *iso mökki Levi*
- listaa Karhupirtin, Karhunvartija 3:n ja muut suuremmat kohteet
- erottelee selkeästi huoneistot ja mökit
- linkittää kunkin mökin omalle sivulleen ja osoitehubille

### 3. Yksittäisten majoitussivujen metadata-parannukset
Jokaiselle huoneistolle päivitetään:
- `<title>`: sisältää osoitteen, huoneistotyypin ja kapasiteetin, esim. "Glacier A1 Levi – 4 mh, 8 hlö, Ratsastajankuja 2 | Leville.net"
- `<meta name="description">`: sisältää sijainnin, etäisyydet ja varauskehotteen
- H1: osoite + huoneistotunnus + kapasiteetti
- JSON-LD `LodgingBusiness` / `Accommodation` -schema osoitteella ja hinta-alueella

### 4. Osoitteiden ja etäisyyksien standardisointi
- Varmistetaan, että jokaisella huoneistolla on `address`-kenttä `properties.ts`:ssä.
- Päivitetään etäisyystiedot yhtenäisiksi hubien ja yksittäisten sivujen välillä (esim. Glacier: 20 m ladulle, 150 m päärinteelle; Skistar: 700 m hisseille).
- Poistetaan kaikki epätarkat "ski-in/ski-out"-maininnat niiltä kohteilta, joilla se ei pidä paikkaansa.

### 5. Sisäinen linkitys hubien ja huoneistojen välillä
- Jokaiselta huoneistosivulta linkki takaisin omaan rakennus/hub-sivuun.
- Jokaiselta hub-sivulta linkki `/majoitukset`-pääsivulle ja vastaaviin aiheoppaisiin.
- Majoitussivun rakennusryhmästä linkki kunkin rakennuksen hub-sivulle.

## Miten tämä auttaa

| Ongelma nyt | Vaiheen 2 vaikutus |
|---|---|
| leville.net sijoittuu hakusanalla "majoitus levi" sijalle ~15, levillas.fi sijalle ~4 | Vahvempi osoite- ja rakennushakemisto nostaa kaupallisten sivujen kokonaisautoriteettia. |
| Glacierin 10 huoneistoa kilpailevat keskenään samoilla sanoilla | Yksi vahva Glacier-hub + eriytyneet huoneistosivut vähentävät hakusanakannibalisaatiota. |
| "Vuokramökit Levi" -hakua ei ole aktiivisesti haettu meidän sivuilta | Uusi mökkihubi avaa kokonaan uuden liikennevirran, jota levillas.fi ei vahvasti hallitse. |
| Google ei aina ymmärrä yksittäisten huoneistojen sijaintia | Osoitteellinen JSON-LD ja metadata parantavat paikallista hakua (local SEO) ja Google Maps -näkyvyyttä. |
| Sisäinen linkirakenne on heikko kaupallisilla sivuilla | Vahvempi hub→huoneisto→hub -linkitys jakaa linkkivirtaa paremmin ja nostaa konversiosivuja. |

## Arvioitu aikataulu
- **Toteutus**: 1 työpäivä
- **Googlen indeksointi**: 3–14 vuorokautta
- **Ensimmäiset sijoitushyppäykset**: 2–4 viikkoa
- **Vakaa vaikutus**: 2–4 kuukautta

## Mittarit onnistumiselle
- `/majoitukset`-sivun orgaaninen liikenne kasvaa ≥20 % seuraavan 60 pv aikana
- Vähintään yksi rakennushubi (Glacier / Skistar / Karhupirtti) nousee top 10 -hakutuloksiin omalla pääavainsanallaan
- Hakusanalla "vuokramökit Levi" saavutetaan sijoitus top 20:ssä 90 päivässä
