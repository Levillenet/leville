# Äkkilähdöt: Moder-huonetunnusten korjaus

## Mikä oli vialla

Kyse ei ollut käyttöoikeuksista vaan **vääristä huonetunnuksista**. `moder_property_mapping`-taulussa oli vanhentunut tunnusjoukko (308–333), joka ei vastaa nykyistä kohdekantaa — siksi Moder vastasi "Access denied".

Testasin antamasi 28 tunnusta suoraan rajapintaan: **kaikki palauttavat 200**, ja myös yhdistetty haku kaikilla 28 tunnuksella toimii. Token on siis kunnossa koko ajan ollut.

## Mistä oikea vastaavuus saadaan

Oikea Beds24 ↔ Moder -vastaavuus löytyy jo koodista: `src/data/propertyDetails.ts` sisältää jokaisen kohteen Moder-varauslinkin (esim. `app.moder.fi/levillenet/306`). Tästä saadaan 26 paria automaattisesti, ja kaksi puuttuvaa täydennetään listastasi:

- Moonlight 415 → Beds24 `645946`, Moder `2215`
- Levi Platinum Superior 2MH → Beds24 `547818`, Moder `5415`

Näin tunnuksia ei tarvitse arvata.

## Mitä tehdään

1. **Päivitetään mappaustaulu** vastaamaan nykyistä 28 kohteen kantaa:
   - 7 olemassa olevaa riviä saa oikean Moder-tunnuksen
   - 21 puuttuvaa kohdetta lisätään (Glacier A1–A6 ja B1–B4, studiot, Karhupirtti, Hiihtäjä, Moonlight, Platinum, Karhunvartija 3, Skistar 209/210/310)
   - Siivousmaksu ja henkilömäärä otetaan `propertyDetails.ts`:stä
2. **Vieraat rivit pois äkkilähdöistä:** Taulussa on 19 riviä, jotka eivät ole koskaan kuuluneet nykyiseen kantaanne (Tunturi, Immelrinne, Immelkartano, Riekontie, Rantatähti, Karhunvartija A7/A8/C21/C22, Glacier A8/B8, Skistar 422/521/522/321/322). Ne ovat peräisin tammikuun 2026 alkuperäisestä migraatiosta, joka syötti tauluun vanhan testilistauksen tunnuksilla 308–333. Näiltä nollataan Moder-tunnus, mutta **rivit jätetään paikoilleen**, koska tiketöinti hakee niistä kohteen nimen mahdollisille vanhoille tiketeille. Jos haluat, että myös tiketöinti näyttää raakatunnuksen näille, voidaan rivit poistaa kokonaan — kerro valintasi.
3. **Ristiriidan korjaus:** Karhupirtin Beds24-tunnus on taulussa `419423`, mutta koodissa `353045`. Käytetään koodin arvoa, jotta siivousmaksut ja WhatsApp-numero osuvat oikein.

## Varmistus

- Kutsutaan `moder-availability?force_refresh=true` ja tarkistetaan, että jaksoja tulee usealta kohteelta.
- `/akkilahdot` selaimessa: kortteja usealta kohteelta, suodattimet 2 / 3 / 4+ yötä toimivat, hinnat ja WhatsApp-linkki oikein.
- Varmistetaan, ettei tiketöinnin kohdenimien haku rikkoudu.

## Tekniset yksityiskohdat

- Muutos on pelkkää datapäivitystä `moder_property_mapping`-tauluun (UPDATE + INSERT), ei skeemamuutosta.
- `supabase/functions/moder-availability/index.ts` ei vaadi muutoksia — sen vikasietoinen kohdekohtainen varahaku jää paikalleen turvaverkoksi.
- Tiketöinnin funktiot (`manage-tickets`, `ticket-reminders`, `check-booking-changes`) lukevat taulusta vain `property_name`-kentän `beds24_room_id`-avaimella; niihin ei kosketa.

## Huomio

Perusalennus (`deals_base_discount`) on edelleen 0 %. Aseta se adminissa, niin korteissa näkyy yliviivattu Moder-hinta ja alennettu hinta suunnitellusti.
