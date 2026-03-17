

# Matkaopas-sivun uudelleenjärjestely kolmeen kategoriaan

## Kaikki sivuston oppaat koottuna ja jaoteltuna

Alla kaikki olemassa olevat opas-/guide-sivut jaoteltuna kolmeen uuteen kategoriaan. Nykyinen TravelHub listaa 11 sivua tasaisessa gridissä. Uusi rakenne ryhmittelee **kaikki** oppaan alasivut (myös vertailu-, majoitus- ja aktiviteettisivut jotka nyt ovat ComparisonHubissa tai puuttuvat kokonaan).

---

### Kategoria 1: Lapin matkan suunnittelu
*"Suunnittele matkasi Leville – kaikki mitä tarvitset ennen lähtöä"*

| Sivu | Polku (FI) |
|------|-----------|
| Miten pääsee Leville | `/matka/miten-paasee-leville-helsingista` |
| Paras aika matkustaa Leville | `/opas/paras-aika-matkustaa-leville` |
| Talvivarusteet / pukeutuminen | `/opas/talvivarusteet-leville` |
| Pakkauslista Lapin lomalle | `/opas/pakkauslista-lapin-lomalle` |
| Levi ilman autoa | `/opas/levi-ilman-autoa` |
| Hinnat Levillä | `/opas/hinnat-levilla` |
| Lapsiperheet Levillä | `/opas/lapsiperheet-levilla` |
| Sää ja lämpötilat | `/levi/saatieto-levilta` |
| Esteettömyys Levillä | (dynaaminen reitti) |

### Kategoria 2: Perillä Levillä
*"Kun olet saapunut – näin nautit lomastasi"*

| Sivu | Polku (FI) |
|------|-----------|
| Liikkuminen Levillä | `/opas/liikkuminen-levilla` |
| Ravintolat ja palvelut | `/opas/ravintolat-ja-palvelut-levilla` |
| Afterski ja yöelämä | `/opas/afterski-ja-yoelama-levilla` |
| Välinevuokraus | (dynaaminen reitti) |
| Tapahtumat Levillä | (dynaaminen reitti) |
| Päiväretket Leviltä | (dynaaminen reitti) |
| Joulupukki Levillä | `/opas/joulupukki-levilla` |
| Lapin sanasto | `/opas/lapin-sanasto` |
| Saamelaisuus Levillä | (dynaaminen reitti) |
| Romanttinen Levi | (dynaaminen reitti) |
| Levin interaktiivinen kartta | (dynaaminen reitti) |

### Kategoria 3: Majoitusvinkit ja vertailut
*"Valitse oikea majoitus ja opi käyttämään sen varusteet"*

| Sivu | Polku (FI) |
|------|-----------|
| Mökki vai huoneisto? | `/opas/mokki-vai-huoneisto-levi` |
| Levi vs Ylläs vs Ruka | `/opas/levi-vs-yllas-vs-ruka` |
| Levi vs Rovaniemi | `/opas/levi-vs-rovaniemi` |
| Levi vs Saariselkä | `/opas/levi-vs-saariselka` |
| Lämmitysjärjestelmät | `/opas/lammitysjarjestelmat-levi` |
| Saunaopas | `/opas/sauna-levilla` |
| Ulkoporeallas | `/opas/ulkoporeallas-levilla` |

---

## Tekniset muutokset

### `src/pages/guide/TravelHub.tsx`
1. **Uusi data-rakenne**: Korvataan yksittäinen `guides`-taulukko kolmella ryhmällä: `planning`, `onsite`, `accommodation`. Jokainen ryhmä saa oman otsikon, alaotsikon ja ikonin.

2. **Lisätään puuttuvat sivut** kortteihin (pakkauslista, afterski, joulupukki, välinevuokraus, esteettömyys, tapahtumat, päiväretket, saamelaisuus, romanttinen Levi, kartta, mökki vai huoneisto, vertailut).

3. **Poistetaan ComparisonHub-redundanssi**: Vertailu- ja majoitussivut tuodaan TravelHubin kategoriaan 3, jolloin ComparisonHub-sivu voi jäädä ennalleen (se toimii omana SEO-hubinaan), mutta TravelHub kattaa kaiken.

4. **UI-toteutus**: 3 erillistä `<section>`-lohkoa, kukin omalla otsikolla ja kuvailevalla alaotsikolla. Käytetään olemassa olevaa `GuideHubCard`-komponenttia korteissa. Lisätään uusia ikoneita (Compass, Ticket, Heart, Map jne.) `iconMap`-objektiin.

5. **Kaikki 7 kieltä** (FI, EN, SV, DE, ES, FR, NL) päivitetään vastaavasti. SV/DE/ES/FR-kielillä linkit osoittavat EN-sivuihin tai kieliversioihin kuten nykyäänkin.

6. **JSON-LD CollectionPage** päivitetään sisältämään kaikki uudet ItemList-entryt.

### Ei muutoksia
- `ComparisonHub.tsx` säilyy ennallaan (oma SEO-sivu)
- Reittejä `App.tsx`:ssä ei tarvitse muuttaa
- Yksittäiset opas-sivut eivät muutu

