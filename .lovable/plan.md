# Korjaus: tyhjät hehkulamppu-vinkit oppaissa

## Mistä ilmiö johtuu

Vinkkilaatikot (💡 + nuoli, ei tekstiä) tulevat yhteisestä `InlineBookingLink`-komponentista, jota käytetään variantilla `tip`. Selaintarkistus sivulla `/guide/northern-lights-season-levi` osoittaa, että laatikko renderöityy näin:

```text
💡 <linkki ilman tekstiä, href = nykyinen sivu> .
```

Syy on `src/components/InlineBookingLink.tsx` -tiedoston `resolveCopy`-funktiossa: valmis kielikohtainen teksti yhdistetään käyttäjän antamiin ylikirjoituksiin objektilevityksellä, ja koska sivut eivät anna `text`/`linkText`/`href`/`emoji`-propseja, ne välittyvät arvolla `undefined` ja **ylikirjoittavat** valmiin tekstin tyhjäksi. Tulos: teksti katoaa, linkin osoite tyhjenee (selain tulkitsee nykyiseksi sivuksi) ja emoji putoaa oletukseen 💡 riippumatta siitä, mikä preset oli valittu.

Koska vika on yhteisessä komponentissa, se koskee kaikkia sivuja, joilla `tip`-varianttia käytetään presetin kanssa — mm. revontulisivut, ravintolaoppaat, hiihto-, kesä-, lapsiperhe- ja hintasivut (18 tiedostoa).

## Mitä tehdään

1. **Korjaa `resolveCopy`** niin, että vain määritellyt (ei-`undefined`) ylikirjoitukset yhdistetään presetiin. Tämä palauttaa oikean tekstin, linkkitekstin, oikean kohdeosoitteen ja oikean emojin (🏔️, 🌌, ⛷️ jne.) kaikilla sivuilla kerralla.
2. **Varmistus selaimella**: käydään läpi otos sivuja (revontulikausi FI/EN, ravintolaopas, hiihto, kesä, hinnat) ja tarkistetaan, että jokainen `role="note"` -laatikko sisältää tekstin ja toimivan linkin, joka ei osoita samalle sivulle.
3. **Regressiosuoja**: lisätään komponenttiin tarkistus, että jos presetiä ei löydy kyseiselle kielelle eikä teksti ole saatavilla, laatikkoa ei renderöidä lainkaan (mieluummin ei mitään kuin tyhjä 💡-rivi).

## Tekniset yksityiskohdat

- Muutettava tiedosto: `src/components/InlineBookingLink.tsx` (funktio `resolveCopy` sekä `tip`-haaran renderöinti).
- Ei muutoksia sivukohtaisiin tiedostoihin — kaikki 18 käyttökohdetta korjaantuvat komponenttikorjauksella.
- Ei vaikutusta `variant="inline"`-käyttöön eikä SEO-metoihin.
