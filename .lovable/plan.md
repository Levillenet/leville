# Äkkilähtöjen Moder-oikeudet: odotus ja varmistus

## Tilanne

- Moder-integraatio on koodiltaan valmis ja sivu toimii: Skistar 211 (id 308) näyttää jaksot oikeilla hinnoilla.
- Tokenilla on Moderissa oikeus vain tähän yhteen huonetyyppiin — 23 muuta palauttavat 403 "Access denied" (varmistettu 06:41 UTC, myös minuutin odotuksen jälkeen).
- Funktio on jo vikasietoinen: se ohittaa estetyt kohteet, joten sivu näyttää ne kohteet, joihin oikeus on. Ei koodimuutoksia tarvita.

## Mitä tehdään

1. **Odotetaan oikeuksien voimaantuloa** Moderissa (saattaa viedä aikaa / vaatia tallennuksen eri paikassa kuin tehty). Mitään ei muuteta koodiin.
2. **Varmistus (vain luku):** kun käyttäjä kertoo oikeuksien olevan kunnossa, testataan suoraan Moder-rajapintaa: bulk-haku kaikilla 24 huonetyypillä pitää palauttaa HTTP 200. Jos edelleen 403, käyttäjä luo Moderissa uuden tokenin täysillä kohdeoikeuksilla ja liittää sen chattiin → päivitetään `MODER_API_TOKEN` ja deployataan funktio.
3. **Kun bulk-haku toimii:** kutsutaan `moder-availability?force_refresh=true` ja varmistetaan, että deals-listalla on useampia kohteita (Skistar-, Tunturi-, Karhunvartija-, Glacier-, Immel- ja Rantatähti-kohteet).
4. **Sivutesti:** `/akkilahdot` näyttää useamman kohteen kortit; testataan suodattimet 2 / 3 / 4+ yötä ja pitkän ikkunan huomautusteksti.

## Huomio

- Perusalennus-asetus (`deals_base_discount`) on vielä 0 % — kannattaa asettaa adminissa, jotta yliviivattu normaalihinta ja alennettu hinta näkyvät korteissa suunnitellusti.
