# Äkkilähtöjen tarjousmerkintä ja perusalennus

## Tavoite

Jokainen äkkilähtökortti näyttää aina tarjousmerkinnän ja yliviivatun normaalihinnan. Admin-välilehdeltä poistetaan turhat kytkimet, ja perusalennus näkyy myös adminin hintarivissä.

## 1. Äkkilähtösivu (`src/pages/Akkilahdot.tsx`)

- Jokaiseen korttiin kiinteä kultainen badge **"ÄKKILÄHTÖ TARJOUS"** (käännetään kaikille 7 kielelle: Last minute offer, Sista minuten-erbjudande jne.).
- Hinta näytetään aina muodossa: yliviivattu normaalihinta + korostettu tarjoushinta.
  - Normaalihinta = Moder-hinta + siivous (nykyinen `getOriginalApiPrice`).
  - Tarjoushinta = perusalennus + mahdollinen jaksokohtainen alennus + siivous (nykyinen `getTotalPrice`).
- Jos alennusta ei jostain syystä ole (0 %), yliviivausta ei voi laskea → näytetään vain hinta, mutta badge säilyy. Tämä estää harhaanjohtavan "0 €:n säästön".
- Poistetaan riippuvuus `specialOffer`- ja `showDiscount`-asetuksista kortin ulkoasussa: korostettu tyyli on aina käytössä.
- Prosenttibadge (-X %) säilyy yliviivauksen vieressä.

## 2. Hissiliput ja erikoistarjoukset -välilehti (`src/components/admin/SkiPassAdmin.tsx`)

- Poistetaan **"Erikoistarjous"**-kytkin ja **"Näytä alennus"**-kytkin sekä niitä koskevat ohjetekstit.
- Tallennuksessa (`upsertPeriod`) nämä kentät kirjoitetaan jatkossa aina arvoon `true`, jotta vanha data ei jää ristiriitaiseksi eikä tietokantarakennetta tarvitse muuttaa.
- Jäljelle jäävät: Hissilippu-kytkin ja jaksokohtainen alennus (10/20/30 %).

## 3. Perusalennus näkyviin adminin hinnoissa

Adminin hintarivi laskee tällä hetkellä vain kiinteistökohtaiset alennukset, ei äkkilähtöasetusten perusalennusta. Korjataan:

- Luetaan `deals_base_discount` samasta asetusdatasta kuin äkkilähtösivulla.
- Hintarivi näyttää:
  - `API:` alkuperäinen hinta
  - `Nyt:` perusalennuksella laskettu hinta (ja perusalennuksen prosentti näkyviin)
  - `Erikoistarjous:` perusalennus + jaksokohtainen alennus, sama kaava kuin julkisella sivulla.
- Yhtenäistetään laskukaava adminin ja `/akkilahdot`-sivun välillä, jotta luvut täsmäävät.

## Tekniset huomiot

- Ei tietokantamuutoksia eikä edge-funktiomuutoksia; kaikki muutokset frontendissä.
- Sarakkeet `has_special_offer` ja `show_discount` jäävät tauluun, mutta niitä ei enää säädetä käyttöliittymästä.
