# Äkkilähdöt: linkit omille majoitussivuille + 4 hengen huomautus

## 1. Kortin linkki ohjaa Moderiin — korjataan omalle sivulle

Nyt äkkilähtökortin otsikkolinkki käyttää kentästä `bookingUrl` tulevaa Moder-osoitetta (esim. `app.moder.fi/levillenet/3504?step=1`), mikä vie asiakkaan pois sivustolta kesken selailun.

Muutos:
- Kortin otsikko linkittää jatkossa oman sivuston kohdesivulle: `/majoitukset/<slug>` (englanniksi `/en/accommodations/<slug>`), esim. Glacier A1 → `/majoitukset/glacier-a1`.
- Linkki avautuu samassa välilehdessä (sisäinen linkki, ei `target="_blank"`), jolloin kävijä pysyy sivustolla.
- Varaus tapahtuu edelleen kortin WhatsApp-painikkeesta, joten Moder-linkkiä ei tarvita kortissa.
- Jos kohteelle ei löydy omaa sivua, otsikko näytetään tekstinä ilman linkkiä (kuten nytkin ilman `bookingUrl`:ia).

## 2. "Hinta sisältää 4 henkilöä" -huomautus

Tarkistin tuotannon: huomautus **näkyy** Glacier-korteilla (esim. Glacier A1 ja Glacier B3 haussa 14.–16.9.). Se ei kuitenkaan näy kaikissa tilanteissa, koska teksti on hintalaatikon sisällä ja renderöityy vain kun hinta on saatavilla — jos kortti näyttää "hinta ei saatavilla", huomautus katoaa.

Muutos:
- Siirretään huomautus hintalaatikon ulkopuolelle omaksi riviksi, jolloin se näkyy aina kyseisillä kohteilla hinnasta riippumatta.
- Kohdejoukko pysyy samana: kaikki Glacier-kohteet, Karhupirtti ja Hiihtäjänkuja 5B5.
- Jos huomautus ei silti näy selaimessa, kyse on vanhasta välimuistista — kovalatauksella (Ctrl/Cmd + Shift + R) uusin versio tulee näkyviin.

## Tekniset yksityiskohdat

- `src/data/propertyDetails.ts`: lisätään jokaiselle riville `siteSlug` (arvot `src/data/properties.ts`-tiedoston `slug`-kentistä, esim. `504843 → glacier-a1`, `350161 → zero-point-5b5-penthouse`, `353045 → karhupirtti`, `350156 → skistar-studio-104`).
- `src/pages/Akkilahdot.tsx`:
  - Uusi apufunktio `getPropertyPageUrl(roomId)` palauttaa `lang === 'en' ? /en/accommodations/${siteSlug} : /majoitukset/${siteSlug}`.
  - `renderDealCard`: otsikon `<a href={bookingUrl} target="_blank">` korvataan React Routerin `<Link to={propertyUrl}>` -linkillä; `ExternalLink`-ikoni vaihdetaan sisäiseen nuoli-ikoniin.
  - `showGuestPriceNote`-lohko siirretään `CardContent`-tasolle hintalaatikon alle omaksi `<p>`-elementiksi; käännökset säilyvät ennallaan.
- Muu logiikka (hinnat, alennukset, WhatsApp-viesti) pysyy koskemattomana.
