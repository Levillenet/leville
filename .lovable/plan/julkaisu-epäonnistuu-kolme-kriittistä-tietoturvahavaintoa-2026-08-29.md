# Julkaisu epäonnistuu: kolme kriittistä tietoturvahavaintoa

Buildi menee läpi virheittä (tuotantobuildi ajettu juuri, exit 0, 561 tiedostoa / 48 MB — reilusti julkaisurajojen alla). Julkaisu ei siis kaadu koodivirheeseen, vaan julkaisuportti estää sen: tietoturvaskannauksessa on kolme avointa **kriittistä (error)** havaintoa. Ne pitää korjata, sitten julkaisu menee läpi.

## Korjattavat kolme havaintoa

### 1. Vieraiden henkilötiedot vuotavat ilman tunnistautumista
`get-cleaning-status` -taustafunktio ottaa vastaan pelkän päivämäärän ja palauttaa siivoustaulun kaikki kentät ilman mitään salasanatarkistusta. Taulussa on vieraiden nimiä, sähköposteja ja puhelinnumeroita.

Korjaus: lisätään sama admin/viewer-salasanatarkistus kuin `get-current-guests`-funktiossa, ja vastauksesta karsitaan kentät joita siivousnäkymä ei tarvitse. Admin-puolen kutsu (`MaintenanceAdmin`) päivitetään lähettämään salasana mukana.

### 2. Kuka tahansa voi ladata ja poistaa kuvia guide-images-tallennustilasta
Tallennustilan säännöissä on adminille rajattujen sääntöjen lisäksi "kuka tahansa saa lisätä/muokata/poistaa" -säännöt. Sallivat säännöt yhdistyvät TAI-logiikalla, joten kuka tahansa netistä voi ylikirjoittaa tai poistaa opaskuvia.

Korjaus: poistetaan avoimet kirjoitussäännöt ja jätetään vain admin-rajatut. Julkinen luku säilyy ennallaan, jotta kuvat näkyvät sivustolla. Ennen poistoa varmistetaan, miten admin-paneelin kuvien lataus tunnistautuu: jos lataus ei kulje kirjautuneen admin-käyttäjän kautta, se siirretään menemään `manage-guide`-taustafunktion kautta, jottei kuvien lisäys admin-paneelista hajoa.

### 3. OAuth-tokenit luettavissa julkisesti
`site_settings`-taulussa on sääntö, joka sallii kenen tahansa lukea kaikki rivit, ja taulussa on Homey-integraation elävät access/refresh-tokenit.

Korjaus: julkinen luku poistetaan ja SELECT rajataan admineille + taustafunktioille. Tarkistin, ettei selainpuolen koodi lue `site_settings`-taulua suoraan lainkaan — vain taustafunktiot (jotka käyttävät palveluavainta), joten muutos ei riko toiminnallisuutta.

## Työjärjestys

1. Tarkistetaan nykyiset tallennustilan ja `site_settings`-taulun säännöt kannasta.
2. Ajetaan yksi tietokantamigraatio, joka korjaa kohdat 2 ja 3.
3. Korjataan `get-cleaning-status` + sen admin-kutsu (kohta 1).
4. Ajetaan tietoturvaskannaus uudelleen ja varmistetaan, ettei kriittisiä havaintoja ole.
5. Julkaistaan ja varmistetaan, että julkaisu menee läpi.

## Mitä ei koskettaisi

Sivuston näkyvä ulkoasu, sisältö, SEO-metatiedot tai muut toiminnot pysyvät ennallaan. Jäljelle jäävät warn/info-tason havainnot (admin-salasana localStoragessa, CORS, rate limiting, WiFi-salasanat opastauluissa) eivät estä julkaisua — ne voidaan käsitellä erikseen halutessasi.
