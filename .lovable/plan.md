# Admin-kirjautumisen korjaus

## Mitä on vahvistettu

- Kirjautumisen tarkistus tapahtuu taustafunktiossa `verify-admin`. Se laskee muistissa olevalla rajoittimella **jokaisen** kirjautumispyynnön (myös onnistuneen) ja estää pyynnöt, kun niitä on ollut 5 kappaletta 15 minuutissa samasta IP:stä. Koodin kommentti väittää rajoittavansa vain epäonnistuneita yrityksiä, mutta näin ei ole. Kun raja on täynnä, myös oikea salasana palauttaa virheen "liian monta pyyntöä", eikä onnistunut kirjautuminen ehdi nollata laskuria.
- Kirjautumissivu näyttää tämän tilanteen vain yleisenä tekstinä "Kirjautuminen epäonnistui", joten se näyttää väärältä salasanalta.
- Tietokantaan tallennettu pysyvä rajoitin (vain epäonnistuneet yritykset) ei estä sinua: IP:llesi on 2 vanhaa yritystä 25.9., ja aikaikkuna on jo umpeutunut.
- Funktion lokeissa ei ole sinun yrityksiäsi, joten en voi vielä varmistaa, että juuri tämä esti kirjautumisen. Varmistetaan se ensimmäisenä.

## Työjärjestys

1. Kutsutaan `verify-admin`-funktiota testipyynnöillä ja varmistetaan, palauttaako se rajoitusvirheen (429) vai väärän salasanan virheen (401).
2. Korjataan rajoitin niin, että vain epäonnistuneet yritykset kasvattavat laskuria (5 väärää yritystä / 15 min). Oikea salasana pääsee aina läpi, jos ei ole jo lukittu väärillä yrityksillä.
3. Kirjautumissivu näyttää selkeän viestin, kun pääsy on tilapäisesti estetty ("Liian monta yritystä, yritä uudelleen X minuutin kuluttua"), ja erillisen viestin väärästä salasanasta.
4. Salasanavertailussa ohitetaan tahattomat välilyönnit ja rivinvaihdot tallennetun salasanan päässä, koska kentän sisältö leikataan jo kirjoitettaessa (`trim`). Tämä poistaa mahdollisen epäsuhdan.
5. Julkaistaan `verify-admin` uudelleen, joka nollaa muistissa olevan laskurin, ja testataan kirjautuminen selaimella sekä admin- että katselusalasanalla.

## Tekniset tiedot

- Muutettavat tiedostot: `supabase/functions/verify-admin/index.ts` (rajoittimen kutsu siirretään epäonnistumisen jälkeen, käytetään vain lukevaa tarkistusta ennen vertailua), `src/pages/Admin.tsx` (virheviestin erottelu 429 / 401).
- `_shared/rateLimit.ts` saa pelkän lukevan tarkistuksen, jotta laskuri kasvaa vain `recordFailure`-kohdassa.
- Ei tietokantamuutoksia. Sivuston muut osat eivät muutu.

## Jos syy onkin muu

Jos testi osoittaa 401 (väärä salasana) eikä 429, syy on salasanan arvossa. Silloin sinun pitää asettaa uusi admin-salasana, koska tallennettua arvoa ei voi lukea. Kerron tämän ennen muutoksia.
