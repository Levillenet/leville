# Äkkilähtöjen hintaero: siivous lasketaan kahteen kertaan

## Mistä ero johtuu

Tarkistin taustapalvelun palauttamat oikeat Moder-hinnat ja asetukset.

- Perusalennus on 15 % (`deals_base_discount = 15`).
- Karhupirtti, 6 yötä: Moderin jaksohinta **990 €**, siivousmaksu tietokannassa **220 €**.
  990 × 0,85 = 841,50 → + 220 = **1061,50 ≈ 1062 €** (juuri se, mitä sivu näyttää).
- Glacier A5 Penthouse: Moderin jaksohinta **481 €**, siivousmaksu **120 €**.
  481 × 0,85 = 408,85 → + 120 = **528,85 ≈ 529 €** (juuri se, mitä sivu näyttää).

Molemmat erot selittyvät täsmälleen: **Moderin palauttama jaksohinta sisältää jo siivouksen, mutta sivu lisää siivousmaksun vielä erikseen päälle.** Lisäksi alennus lasketaan hinnasta ilman siivousta, jolloin loppusumma ei vastaa Moderin näyttämää hintaa millään laskutavalla.

## Mitä korjataan

1. **Siivousmaksua ei enää lisätä erikseen.** Moderin jaksohinta on lopullinen pohjahinta, josta alennukset lasketaan. Loppuhinta = Moder-hinta − perusalennus − superäkkilähtöalennus.
2. **Yliviivattu alkuperäinen hinta = Moderin jaksohinta sellaisenaan** (esim. A5: 481 €, Karhupirtti: 990 €), ei enää hinta + siivous.
3. Sama korjaus adminin hintariveille, jotta hallintanäkymä ja asiakassivu näyttävät saman summan.
4. Hintaerittelyn tekstistä poistetaan erillinen "siivous"-rivi, koska se sisältyy hintaan. Tarvittaessa lisätään huomautus "sisältää loppusiivouksen".

## Varmistus

Tarkistan korjauksen jälkeen samat kaksi tapausta:

```text
Glacier A5, sama jakso   Moder 481 €  → sivu näyttää yliviivattuna 481 € ja alennettuna 409 €
Karhupirtti, 6 yötä      Moder 990 €  → sivu näyttää yliviivattuna 990 € ja alennettuna 842 €
```

## Tekniset yksityiskohdat

- `src/pages/Akkilahdot.tsx`: `cleaningFee` poistetaan hintalaskennasta (alkuperäinen hinta, alennettu hinta ja erittely).
- `src/components/admin/SkiPassAdmin.tsx`: sama muutos hintarivien laskentaan.
- `supabase/functions/moder-availability/index.ts`: `cleaningFee` jätetään vastaukseen tiedoksi, mutta sitä ei enää käytetä summaukseen (tai poistetaan käytöstä kokonaan, jos mikään näkymä ei sitä tarvitse).
