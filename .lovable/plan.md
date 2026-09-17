# Talokohtaiset esittelysivut ryhmätarjouksia varten – aloitus Glacierista

Lyhyt, jaettava myyntisivu osoitteessa **leville.net/glacier** (ja **/en/glacier**), jonka voi lähettää suoraan seuralle, yritykselle tai sukujuhlaporukalle. Pohja rakennetaan niin, että samalla mallilla syntyvät myöhemmin Skistar-, Zero Point- ja Bear Lodge -sivut pelkän sisältötiedoston lisäyksellä.

## Mitä sivulla on

1. **Kansiosio** – talon nimi, yhden lauseen lupaus ("Kaksi alppitaloa aivan eturinteen kupeessa"), avainluvut heti näkyvissä: huoneistojen määrä, makuupaikat yhteensä, matka rinteelle ja ladulle.
2. **Esittelyteksti** – kaksi alppitaloa (A- ja B-talo), kaikki perhehuoneistoja, jokaisessa oma sauna, parveke ja keittiö.
3. **Ryhmille-osio** – juuri ne asiat joita tarjouksissa tarvitaan: lasten pelihuone, erinomaiset suksien huoltotilat hiihto- ja slalomjoukkueille, lämmin välinevarasto, mahdollisuus varata koko talo yksityiskäyttöön.
4. **Huoneistotaulukko** – jokainen huoneisto riveinä: nimi, koko, makuuhuoneet, makuupaikat, ja suora varauslinkki. Nopea tapa näyttää asiakkaalle mistä kokonaisuus koostuu.
5. **Kuvat** – olemassa olevat Glacier-kuvat (julkisivut A ja B, sisäkuvat).
6. **Sijainti ja etäisyydet** – ladulle n. 20 m, päärinteelle n. 150 m, keskustan palvelut kävelymatkan päässä.
7. **Tarjouspyyntölomake** – sivun päätoiminto (ks. alla).
8. **Suorat yhteystiedot** lomakkeen vieressä varmuuden vuoksi (WhatsApp, sähköposti, puhelin).

Tekstit tehdään suomeksi ja englanniksi. Sisältö kirjoitetaan ensin rungoksi ja täydennetään antamillasi tarkennuksilla seuraavassa vaiheessa.

## Tarjouspyyntölomake

Kentät: nimi, sähköposti, puhelin, ryhmän tyyppi (urheiluseura / yritys / perhe tai suku / muu), henkilömäärä, saapumis- ja lähtöpäivä, vapaa viesti.

Lähetys menee sähköpostiisi (info@leville.net) samalla tavalla kuin nykyinen "Myy loma-asuntosi" -lomake, ja tarjouspyyntö tallennetaan myös tietokantaan, jotta mikään pyyntö ei katoa sähköpostiin. Lähettäjä saa ruudulle kiitosviestin. Lomake on roskapostisuojattu (piilokenttä + lähetysrajoitus).

## Näkyvyys hakukoneissa

Sivu on julkinen ja indeksoitava: oma otsikko ja kuvaus molemmilla kielillä, kielilinkitys FI↔EN, rakenteinen data (majoituskokonaisuus + sijainti), lisäys sivukarttaan ja linkitys Majoitukset-sivulta sekä olemassa olevalta Glacier-katusivulta.

## Tekniset yksityiskohdat

- Uusi sisältötiedosto `src/data/building-pages.ts`: talokohtainen sisältö (avainluvut, kappaleet FI/EN, ryhmäedut, kuvat, kohdelistaus `properties.ts`:n id:illä) – tästä uudet talot syntyvät lisäämällä yksi olio.
- Uusi sivukomponentti `src/pages/BuildingPage.tsx`, reitit `/:buildingSlug` -tyylin sijaan eksplisiittisesti `App.tsx`:ään: `/glacier` ja `/en/glacier` (myöhemmät talot lisätään samalla tavalla, jotta 404-logiikka ei riko muita reittejä).
- Metat `SeoMeta`-komponentilla, `HreflangTags`, `JsonLd` (`ApartmentComplex` + `BreadcrumbList`), lisäys `scripts/generate-sitemap.mjs` / sitemap-funktion reittilistaan.
- Huoneistotiedot luetaan suoraan `src/data/properties.ts`:stä (`tags` sisältää `glacier`), joten kapasiteetit ja varauslinkit pysyvät synkassa. Ei takkamainintoja – Glacierissa `fireplace: false`.
- Uusi edge-funktio `send-group-inquiry` (Resend, malli `send-property-inquiry`), CORS rajattu sallituille origineille, yksinkertainen IP-pohjainen lähetysrajoitus.
- Uusi taulu `group_inquiries` (RLS päällä, ei julkista lukua; kirjoitus vain edge-funktiosta service-rolella, luku ylläpidolle). GRANTit migraatiossa.
- Ei euromääräisiä hintoja sivulle; hintataso sanallisesti ja linkki varausjärjestelmään.

## Vaiheet

1. Sisältötiedosto + sivupohja + reitit + Glacierin runkosisältö FI/EN.
2. Tarjouspyyntölomake, taulu ja sähköpostifunktio.
3. SEO: metat, hreflang, rakenteinen data, sitemap ja sisäiset linkit.
4. Tekstien viimeistely antamillasi lisätiedoilla.
