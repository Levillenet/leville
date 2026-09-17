# Talokohtaiset esittelysivut ryhmätarjouksia varten – aloitus Glacierista

Lyhyt, jaettava myyntisivu osoitteessa **leville.net/glacier** (ja **/en/glacier**), jonka voi lähettää suoraan seuralle, yritykselle tai sukujuhlaporukalle. Pohja rakennetaan niin, että samalla mallilla syntyvät myöhemmin Skistar-, Zero Point- ja Bear Lodge -sivut pelkän sisältötiedoston lisäyksellä.

Sivu ei näy navigaatiossa eikä siihen linkitetä muilta sivuilta – se löytyy joko suorasta linkistä tai Googlesta.

## Mitä sivulla on

1. **Kansiosio** – talon nimi, yhden lauseen lupaus ("Kaksi alppitaloa aivan eturinteen kupeessa"), avainluvut heti näkyvissä: 10 huoneistoa, makuupaikat yhteensä, matka rinteelle ja ladulle.
2. **Esittelyteksti yleisellä tasolla** – ei huoneistoluetteloa. Kerrotaan että A-talossa on kuusi huoneistoa 5–8 hengelle ja B-talossa neljä huoneistoa 8–10 hengelle, kaikki perhehuoneistoja omalla saunalla, parvekkeella ja keittiöllä.
3. **Ryhmille ja leireille** – kumman tahansa talon voi vuokrata kokonaan esimerkiksi treenileirille, lasten pelihuone, erinomaiset suksien huoltotilat hiihto- ja slalomjoukkueille, lämmin välinevarasto, majoitus samassa osoitteessa koko ryhmälle.
4. **Kuvat** – olemassa olevat Glacier-kuvat (julkisivut A ja B, sisäkuvat).
5. **Sijainti ja etäisyydet** – ladulle n. 20 m, päärinteelle n. 150 m, keskustan palvelut kävelymatkan päässä.
6. **Tarjouspyyntölomake** – sivun päätoiminto (ks. alla).
7. **Suorat yhteystiedot** lomakkeen vieressä (WhatsApp, sähköposti, puhelin).

Tekstit tehdään suomeksi ja englanniksi. Sisältö kirjoitetaan ensin rungoksi ja täydennetään antamillasi tarkennuksilla seuraavassa vaiheessa.

## Tarjouspyyntölomake

Kentät: nimi, sähköposti, puhelin, ryhmän tyyppi (urheiluseura tai treenileiri / yritys / perhe tai suku / muu), henkilömäärä, saapumis- ja lähtöpäivä, vapaa viesti.

Lähetys menee sähköpostiisi (info@leville.net) samalla tavalla kuin nykyinen "Myy loma-asuntosi" -lomake, ja tarjouspyyntö tallennetaan myös tietokantaan, jotta mikään pyyntö ei katoa. Lähettäjä saa ruudulle kiitosviestin. Lomake on roskapostisuojattu (piilokenttä + lähetysrajoitus).

## SEO: leiri- ja yritysryhmähaut

Koska sivu löydetään vain haun kautta, sisältö kirjoitetaan suoraan näihin hakuihin:

- **Suomi:** harjoitusleiri Levillä, treenileiri Levi, leirimajoitus Levi, urheiluseuran majoitus Levillä, hiihtoleiri / slalomleiri majoitus, ryhmämajoitus Levi, koko talo vuokralle Levi, yritysryhmän majoitus Levillä, työhyvinvointipäivät Levi.
- **Englanti:** training camp accommodation Levi, ski team accommodation Levi, group accommodation Levi, whole building rental Levi, corporate group accommodation Levi.

Toteutus: avainsanat luonnollisesti H1:ssä, H2-otsikoissa ja leipätekstissä (ei täytesanoja), etupainotteiset metaotsikko ja -kuvaus molemmilla kielillä, 4–6 kysymyksen FAQ juuri leiri- ja yritysasiakkaiden kysymyksiin (voiko koko talon vuokrata, suksien huoltotilat, ruokailu ja keittiöt, montako mahtuu, laskutus yritykselle), rakenteinen data (majoituskokonaisuus + sijainti + FAQ), hreflang FI↔EN ja lisäys sivukarttaan.

## Tekniset yksityiskohdat

- Uusi sisältötiedosto `src/data/building-pages.ts`: talokohtainen sisältö (avainluvut, kappaleet FI/EN, ryhmäedut, FAQ, kuvat) – uudet talot syntyvät lisäämällä yksi olio.
- Uusi sivukomponentti `src/pages/BuildingPage.tsx`, reitit eksplisiittisesti `App.tsx`:ään: `/glacier` ja `/en/glacier`.
- Metat `SeoMeta`-komponentilla, `HreflangTags`, `JsonLd` (`ApartmentComplex` + `FAQPage` + `BreadcrumbList`), lisäys sitemap-reittilistaan. Ei sisäisiä navigaatio- tai footer-linkkejä.
- Kapasiteettiluvut johdetaan `src/data/properties.ts`:n Glacier-kohteista, mutta esitetään vain yhteenvetona. Ei takkamainintoja – Glacierissa `fireplace: false`.
- Uusi edge-funktio `send-group-inquiry` (Resend, malli `send-property-inquiry`), CORS rajattu sallituille origineille, IP-pohjainen lähetysrajoitus.
- Uusi taulu `group_inquiries` (RLS päällä, ei julkista lukua; kirjoitus vain edge-funktiosta service-rolella, luku ylläpidolle). GRANTit migraatiossa.
- Ei euromääräisiä hintoja sivulle; hintataso sanallisesti ja tarjouspyyntö kanavana.

## Vaiheet

1. Sisältötiedosto + sivupohja + reitit + Glacierin runkosisältö FI/EN.
2. Tarjouspyyntölomake, taulu ja sähköpostifunktio.
3. SEO: metat, hreflang, FAQ ja rakenteinen data, sitemap.
4. Tekstien viimeistely antamillasi lisätiedoilla.
