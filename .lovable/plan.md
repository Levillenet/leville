# Footerin logojen siistiminen

Tavoite: alareunan logot näyttävät yhtenäisiltä ja ammattimaisilta — sama koko, sama suoja-alue, sama tausta.

## Mikä nyt on pielessä (mitattu tiedostoista)

- **Leville.net-logo**: näytetään 160–192 px korkeana (`h-40 md:h-48`). Kuvatiedosto on 1417x591 ja siinä on itsessään valkoista reunusta, joten logo näyttää liian isolta ja korkealta suhteessa muuhun footeriin.
- **Booking.com-logo**: tiedosto on 300x168, mutta itse merkki on vain rivien 61–107 välissä eli n. 27 % kuvan korkeudesta. Kun kuva skaalataan 32 px korkeaksi, näkyvä logo on vain ~9 px → siksi se näyttää pieneltä.
- **Airbnb-logo**: 402x125 ilman minkäänlaista reunusta — valkoinen tausta menee kiinni logon reunoihin, toisin kuin Bookingissa. Siksi valkoiset laatikot ovat eri kokoisia.
- **Levi Partner**: 1024x1024 neliö, näytetään 80 px korkeana → eri optinen koko kuin muut.

## Mitä tehdään

1. **Normalisoidaan logotiedostot**
   - Rajataan Booking-logo tyhjästä reunuksesta ja lisätään sille sama suhteellinen suoja-alue kuin muillekin.
   - Lisätään Airbnb-logolle vastaava valkoinen suoja-alue, sama padding-suhde kuin Bookingilla.
   - Molemmat asetellaan samalle kuvasuhteelle (esim. 320x100), jolloin valkoiset laatikot ovat identtiset.
   - Levi Partner -logo kevennetään (nyt 585 kt) ja tuodaan samaan optiseen kokoon.

2. **Yhtenäistetään footerin trust-korttien asettelu** (`src/components/Footer.tsx`)
   - Jokaiselle logolle sama kiinteä korkeuslaatikko (esim. 40 px logo, `object-contain`), sama kortin padding ja sama valkoinen, pyöristetty logopohja.
   - Arvostelurivit (9.0 Fabulous / tähdet Exceptional) linjataan samalle riville ja samaan tyyliin.
   - Levi Partner saa saman kortin ja saman logokorkeuden kuin muut.

3. **Korjataan brändilogo**
   - Leville.net-logo pienennetään footerissa `h-40 md:h-48` → n. `h-20 md:h-24`, säilyttäen oikea kuvasuhde ja `width`/`height`-attribuutit (CLS).
   - Ympärille pehmeä valkoinen, pyöristetty pohja samalla padding-logiikalla kuin trust-korteissa, jotta valkoinen laatikko ei näytä irralliselta.

## Tekniset yksityiskohdat

- Kuvien rajaus/paddaus tehdään kertaluontoisesti Pillow-skriptillä sandboxissa; tulokset korvaavat nykyiset tiedostot `src/assets/`-kansiossa (`booking-logo.png`, `airbnb-logo.png`, `levi-partner-logo.png`).
- `width`/`height`-attribuutit päivitetään vastaamaan uusia mittoja, muistisäännön mukaisesti (CLS-esto).
- Ei muutoksia footerin linkkeihin, käännöksiin tai logiikkaan — pelkkä visuaalinen korjaus.
- Lopputulos tarkistetaan Playwrightilla työpöytä- ja mobiilileveydellä.
