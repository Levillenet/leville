# Siivoojien työlistaan lisäpalvelut ja varauksen merkinnät

## Missä ominaisuus on nyt

Ylläpito → **Huolto**-välilehti. Siellä on "Työlistan lähetys": päälle/pois -kytkin, lähetysaika (oletus 19:00 Helsingin aikaa), "Esikatsele" ja "Lähetä nyt" sekä tieto viimeisimmästä lähetyksestä.

Lista lähtee joka ilta seuraavan päivän saapumisista ja lähdöistä sille sähköpostille, joka on merkitty kohteen siivoojaksi. Mukana on kohteen nimi, henkilömäärä ja varauskanava — asiakkaan nimeä, sähköpostia tai puhelinta ei lähetetä eikä tallenneta.

Tiedot haetaan tällä hetkellä Beds24:stä. Lisäpalveluja ja varauksen merkintöjä siinä ei ole.

## Mitä tehdään

Laajennetaan nykyistä iltalistaa — ei uutta viestiä eikä uutta ajastusta.

1. **Varmistetaan ensin, mitä Moderista oikeasti saa.** Kokeillaan nykyisellä Moder-tunnuksella varaus-/saapumisrajapintaa ja katsotaan, sisältääkö vastaus lisäpalvelut (liinavaatteet, loppusiivous, lisävuode yms.) ja varauksen sisäiset merkinnät. Tulos raportoidaan ennen kuin mitään muuta muutetaan. Jos kenttiä ei ole saatavilla, kerrotaan se suoraan eikä arvata.
2. **Yhdistetään tiedot kohteeseen** olemassa olevan Moder–Beds24 -kohdevastaavuuden kautta, jotta rivit osuvat samaan huoneistoon kuin nykyisessä listassa.
3. **Lisätään riville kaksi uutta tietoa:** "Lisäpalvelut" ja "Merkinnät". Jos tietoa ei ole, kohta jätetään pois rivin sekavoittamisen sijaan.
4. **Muut kanavat mukaan ennallaan.** Booking.com- ja Airbnb-saapumiset näkyvät kuten ennenkin (kohde, henkilömäärä, kanava); niille ei ole lisäpalveluita eikä merkintöjä.
5. **Tietosuoja säilyy.** Vain operatiiviset merkinnät välitetään. Asiakkaan nimeä, yhteystietoja tai vapaata asiakasviestiä ei oteta mukaan, eikä tietoja tallenneta tietokantaan.
6. **Esikatselu** Huolto-välilehdellä näyttää uuden sisällön ennen oikeaa lähetystä.

## Oletukset, joita voi muuttaa

- Merkinnöistä näytetään vain omat/operatiiviset merkinnät, ei asiakkaan lähettämää viestiä.
- OTA-varaukset pysyvät listassa ilman lisätietoja.

## Tekniset yksityiskohdat

- Moder-kutsu toteutetaan `supabase/functions/send-worklist/index.ts`:ään erillisenä hakuna kohdepäivälle; epäonnistuminen ei estä listan lähtemistä (lista lähtee silloin nykyisillä tiedoilla).
- Kohdevastaavuus luetaan taulusta `moder_property_mapping` (`beds24_room_id` ↔ `moder_room_type_id`).
- Sähköpostin HTML-rivipohjaan lisätään kaksi valinnaista kenttää; ryhmittely siivoojan sähköpostin mukaan säilyy ennallaan.
- Ajastus, deduplikointi ja päälle/pois-logiikka pysyvät koskemattomina.
- Ei tietokantamuutoksia.
