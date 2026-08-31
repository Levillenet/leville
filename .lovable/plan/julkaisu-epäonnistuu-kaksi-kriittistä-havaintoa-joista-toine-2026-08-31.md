# Julkaisu epäonnistuu: kaksi kriittistä havaintoa, joista toinen jo korjattu

## Syy julkaisuporttiin (tarkistettu)

Julkaisun estää tietoturvaportti, jossa on 2 error-tason havaintoa. Kummatkin ovat
**vanhentuneita skannauksia** (up_to_date: false):

### 1. get-cleaning-status paljasti vieraiden tietoja (skannaus 12.3.2026)
**Jo korjattu.** Koodi sisältää nyt admin/viewer-salasanatarkistuksen ennen minkään
datan palautusta (varmistettu koodista rivit 21–29). Skannaus on vain vanha.

### 2. guide_properties: WiFi-salasanat julkisesti luettavissa (skannaus 29.8.2026)
**Jo korjattu.** Tarkistin saraketason oikeudet kannasta: `wifi_password`,
`contact_phone`, `contact_email`, `contact_whatsapp` -sarakkeille ei ole enää
anon/authenticated-oikeuksia (0 riviä). Arvot jaetaan vain `get-guide-wifi`
-taustafunktion kautta.

## Mitä tehdään

1. Merkitään molemmat havainnot korjatuksi (mark_as_fixed) — koska korjaukset on
   jo todistettavasti tehty ja scannerit ovat vanhentuneita.
2. Julkaistaan sivusto — tämän jälkeen Holiday rental -korjaus (poistettu
   virheellinen VacationRental) menee livenä leville.net-osoitteeseen.
3. Varmistetaan julkaisun jälkeen, että `https://leville.net/` ei enää sisällä
   `VacationRental`-lohkoa ja että kohdesivun schema sisältää `identifier`, `geo`,
   `containsPlace` ja kuvat.
4. Sinä pyydät Search Consolessa uudelleenindeksoinnin etusivulle.

## Mitä EI tehdä

- Ei koodimuutoksia, ei tietokantamuutoksia — vain havaintojen tilan päivitys ja julkaisu.
