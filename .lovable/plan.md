# Google-hakutuloksen favicon: tilanne ja korjaus

## Tilanne nyt

Sydän on jo poistettu tiedostoista: julkaistu `https://leville.net/favicon.ico` (21,6 kt) on identtinen projektin uuden mökkilogo-iconin kanssa, eli palvelin tarjoilee jo oikeaa kuvaketta. Googlen hakutuloksissa näkyvä sydän on Googlen oma välimuisti — se päivittyy vasta seuraavalla uudelleenindeksoinnilla, tyypillisesti päivistä muutamaan viikkoon.

Yksi asia kuitenkin heikentää päivitysnopeutta: `index.html` ei viittaa lainkaan `/favicon.ico`-tiedostoon. Siellä on vain kaksi PNG-viittausta (16x16 ja 32x32), jotka molemmat osoittavat samaan 1024x1024 px, 165 kt kokoiseen `favicon.png`-tiedostoon. Google suosii selkeää `rel="icon"`-viittausta ja vähintään 48x48 px neliökuvaketta; virheelliset kokoilmoitukset voivat saada Googlen jättämään ilmoitetun kuvakkeen huomiotta ja käyttämään vanhaa välimuistiversiota.

## Mitä tehdään

1. **Lisätään `/favicon.ico`-viittaus** `index.html`:n headeriin ensimmäiseksi ikoniviittaukseksi (Google lukee sen luotettavimmin).
2. **Korjataan PNG-viittaukset**: poistetaan väärät `sizes="16x16"` / `sizes="32x32"` -merkinnät, jotka eivät vastaa tiedoston todellista kokoa. Tilalle yksi viittaus oikealla koolla.
3. **Kevennetään favicon.png** kohtuulliseen kokoon (esim. 192x192, muutama kilotavu) — nykyinen 165 kt / 1024 px on turhan raskas jokaisella sivulatauksella.
4. **Tarkistus**: haetaan julkaistu sivu Googlebotin user-agentilla ja varmistetaan, että ikoniviittaukset osoittavat oikeisiin tiedostoihin ja palauttavat 200 OK.

## Huomio

Koodimuutos ei pakota Googlea päivittämään kuvaketta heti. Nopein tapa vauhdittaa: julkaisu ja sen jälkeen etusivun uudelleenindeksointipyyntö Search Consolen URL-tarkastuksesta. Sydän voi näkyä hakutuloksissa vielä sen jälkeenkin jonkin aikaa.
