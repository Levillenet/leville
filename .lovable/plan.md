# Hakutilaston "Yhteydenotot"-sarake: selkeämmäksi

## Mitä tapahtui (tarkistettu tiedoista)
- Yhteydenottoja ei ole kadonnut. Tilastossa on vain **yksi** tapahtuma: Sähköposti-napin painallus tänään klo 11.39 (Suomen aikaa).
- Se näkyy kahdesti (vko 48 ja vko 49), koska haettu 9 yön jakso osuu molemmille viikoille.
- Sarake laskee **napin painalluksia** pelastusikkunassa, ei lähetettyjä viestejä. Napin painallus vain avaa sähköpostin tai WhatsAppin valmiilla viestillä. Jos lähettäjä ei paina "Lähetä", viestiä ei tule. Siksi sinulle ei tullut viestiä.

## Muutokset
1. Sarakkeen nimeksi "Napin painallukset" ja ohjeteksti: "Painoi WhatsApp- tai sähköpostinappia. Ei tarkoita, että viesti lähetettiin."
2. Yhteenvetoon kokonaismäärä kerran (ei tuplalaskentaa viikoille).
3. Uusi pieni lista viikkotaulukon alle: viimeisimmät painallukset (aika, kanava WhatsApp/sähköposti, haetut päivät, henkilömäärä), jotta voit verrata saapuneisiin viesteihin.

## Tekninen
- `src/lib/searchDemand.ts`: lisätään `recentContacts()`-apufunktio ja testi; viikkokohtainen laskenta pysyy.
- Admin-hakutilaston näkymä: sarakkeen nimi, ohje, lista.
- Ei muutoksia tietokantaan eikä julkiseen sivustoon.
