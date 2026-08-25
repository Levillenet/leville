# WhatsApp-jaon korjaus seuratukisivuille

## Mikä on pielessä

WhatsAppin pitäisi näyttää juuri jaetun sivun aihe, mutta nyt näin ei tapahdu:

- `/en/club-support` sisältää oikean englanninkielisen otsikon ja kuvauksen Reactin `<Helmet>`-tageissa (`src/pages/en/ClubSupport.tsx:158–180`).
- Sivulta puuttuu kuitenkin oma `og:image`- ja `twitter:image`-määritys.
- WhatsApp ei suorita sivun JavaScriptiä. Julkaistun URL:n WhatsApp- ja Facebook-crawler-vastauksessa näkyy siksi etusivun suomenkielinen otsikko ja kuvaus, jotka tulevat `index.html`:n riveiltä 9–10, ei Club Support -sivun tiedoista.
- Palvelin lisää lisäksi yleisen pienen jakokuvan, minkä vuoksi kuvake näyttää irralliselta itse aiheeseen nähden.

## Korjaus

1. **Tehdään seuratukea kuvaava jakokuva**
   - 1200 × 630 px, kevyt ja WhatsApp-yhteensopiva.
   - Kuvan aihe yhdistää Levin majoituksen ja seuran/yhteisön tukemisen; ei geneeristä pikkulogoa.
   - Samaa visuaalista pohjaa voidaan käyttää FI- ja EN-versiossa ilman kuvaan upotettua tekstiä, jolloin kieli tulee otsikosta ja kuvauksesta.

2. **Täydennetään molempien sivujen sosiaalisen jaon metatiedot**
   - `/seuratuki`: suomenkielinen `og:title`, `og:description`, `og:url`, oma `og:image` sekä kuvan mitat ja alt-teksti.
   - `/en/club-support`: vastaavat englanninkieliset tiedot.
   - Twitter/X-kuvat ja kuvaukset pidetään samoina Open Graph -tietojen kanssa.

3. **Tuodaan metatiedot palvelimen HTML-vastaukseen**
   - Buildiin lisätään näille kahdelle reitille staattiset HTML-kuoret, joissa sivukohtaiset meta- ja Open Graph -tagit ovat valmiina jo ennen Reactin käynnistymistä.
   - Varsinainen sivu toimii edelleen normaalina React-sivuna; muutos koskee vain sitä, mitä WhatsApp, Facebook ja muut esikatselubotit näkevät ensimmäisessä HTML-vastauksessa.
   - Etusivun yleisiä metatietoja ei muuteta.

4. **Validointi**
   - Tarkistetaan julkaistavan buildin `/seuratuki`- ja `/en/club-support`-HTML suoraan ilman JavaScriptiä.
   - Varmistetaan crawler-user-agenteilla oikea kieli, otsikko, kuvaus, canonical URL ja 1200 × 630 -jakokuva.
   - Ajetaan nykyinen route-validointi ja build.

## Lopputulos

WhatsApp-jako kertoo linkin todellisen aiheen: englanninkielinen linkki näyttää Club Support -otsikon ja seuratukea kuvaavan ison kuvan, suomalainen linkki vastaavat suomenkieliset tiedot. Vanha esikatselu voi säilyä WhatsAppin välimuistissa hetken, mutta uusi HTML on oikein myös ensimmäistä kertaa linkkiä hakeville palveluille.
