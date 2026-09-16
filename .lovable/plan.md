# Joulupukin mökki -optimointi (SantaClausLevi)

Validointi tehty: sivulta löytyy H2 "Joulupukin mökki Levin tunturilla" / "Santa's Cabin on Levi Fell", sekä fi- että en-käännökset, FAQPage-schema (getFAQSchema) ja reitti `/levi-map` on olemassa. Sivulla on jo yksi varauslinkki (bookingNudge → Moder). Olemassa olevaa sisältöä ei kirjoiteta uusiksi.

## 1. Metatiedot
- FI title: "Joulupukin mökki Levillä – Tapaaminen, sijainti ja vinkit"
- EN title: "Santa's Cabin in Levi – Meeting Santa, Location & Tips"
- FI description: mainitsee mökin, miten sinne pääsee ja milloin joulupukin voi tavata, päättyy "ja vinkit perheille". Ei hintoja.
- EN description vastaavasti.

## 2. Uusi H2-osio heti mökkiosion jälkeen
- FI: "Missä joulupukin mökki sijaitsee ja miten sinne pääsee"
- EN: "Where Santa's Cabin is and how to get there"
- Sisältö rakennetaan vain sivulla jo olevasta tiedosta: tunturin huippu, gondolihissi ja kävely rinnettä alas, kesällä patikointi Tuikulta, talvella suksilla. Ei keksittyjä osoitteita, aukioloja tai hintoja.
- Sisäinen linkki `/levi-map`, ankkuri "katso sijainti Levin kartalta" / "see it on the Levi map".
- Lopuksi rehellinen huomautus: kauden tarkat aukioloajat kannattaa tarkistaa Levin virallisilta kanavilta (ulkoinen linkki levi.fi, uusi välilehti).

## 3. FAQ-lisäykset (molemmat kielet, menevät myös FAQPage-schemaan)
- "Onko joulupukin mökki auki kesällä?" — pääsesonki on talvi, kesän kulku ja aukiolot vaihtelevat, tarkista virallisilta kanavilta. Ei väitetä auki/kiinni.
- "Missä joulupukin mökki on Levillä?" — lyhyt vastaus sivun tiedoista + karttalinkki.

## 4. Varauslinkki
Lisätään uuteen osioon yksi kontekstuaalinen varauslinkki (fi: "Joulun ajan majoitus täyttyy nopeasti — katso vapaat kohteemme", en vastaava) osoitteeseen https://app.moder.fi/levillenet, `target="_blank" rel="noopener noreferrer"`.

## Tekniset yksityiskohdat
- Muokataan vain `src/pages/guide/SantaClausLevi.tsx`: `translations.fi` ja `translations.en` (meta, uusi `sections.location`-objekti, faq-lisäykset) sekä yksi uusi `<section>` JSX:ään mökkiosion jälkeen.
- FAQ-schema päivittyy automaattisesti, koska se rakentuu `t.faq.items`-listasta.
- Muita tiedostoja ei muuteta.
