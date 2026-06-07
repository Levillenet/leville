## Tavoite

Kova "Varaa kesäloma" -nappi ei konvertoi kesäsivulla hyvin. Kokeillaan pehmeämpää, sisältöön sulautuvaa **inline-linkitystä**, joka kutsuu lukijaa tarkistamaan hinnat ja vapaat ajat luontevasti tekstin sisällä. Kampanjabanneri jätetään paikalleen (kausietu on hyvä pitää näkyvillä), mutta sen rinnalle lisätään 3 hillittyä inline-CTA:ta leipätekstiin.

## Mitä muutetaan

Tiedosto: `src/pages/guide/SummerInLevi.tsx`

### 1) Intro-kappaleen jatkoksi yksi rivi inline-linkkiä

Heti `t.intro` -kappaleen perään (hero-osio, n. rivi 385) lisätään pieni `<p>`, joka päättyy alleviivattuun linkkitekstiin. Esim.

- FI: "Suunnitteletko kesälomaa Levillä? **Tarkista vapaat majoitukset ja ajantasaiset hintamme tästä →**" (linkki → Moder, target=_blank, tracking `placement: "summer_page_inline_intro"`)
- EN: "Planning a summer trip to Levi? **Check live availability and our latest prices here →**"
- NL: vastaava käännös.

Linkki: `text-primary underline underline-offset-4 hover:text-primary/80`, ei nappia.

### 2) Aktiviteettien jälkeen pehmeä huomautus

`Activities`-osion (rivi 503–513) loppuun pieni harmaa rivi:

- FI: "Useimmat majoituksemme sijaitsevat askelten päässä näistä aktiviteeteista — **katso saatavuus ja hinnat**." 
- EN/NL: vastaava.

Sama Moder-linkki, tracking `placement: "summer_page_inline_activities"`.

### 3) Hiking trails -osion jälkeen vielä yksi

`Hiking Trails` -osion (n. rivi 539–551) jälkeen yksi virke ennen `Beach families` -kuvaa:

- FI: "Reittien lähtöpisteille pääsee kävellen useimmista huoneistoistamme. **Katso vapaat viikot ja hinnat tästä.**"

Tracking `placement: "summer_page_inline_hiking"`.

### 4) Read Next -osion alapuolelle softa lopetus

Korvataan nykyinen kova kahden napin CTA-rivi (rivit 622–636) **pehmeämmällä versiolla**:

- Säilytetään vasen "Takaisin Levi-oppaaseen" -outline-nappi.
- Korvataan oikea iso "Varaa kesämajoitus" -nappi tekstillä:
  - FI: "Kiinnostuitko? **Tarkista vapaat majoitukset ja hintamme** tai selaa kaikki [kesän huoneistot ja mökit](/majoitukset)."
  - vastaavat EN/NL.
- Tracking `placement: "summer_page_inline_footer"`.

## Tekniset yksityiskohdat

- Käytetään olemassa olevaa `logPromoClick`-funktiota (dynaaminen import kuten nykybannerissa rivillä 448), joten analytics tunnistaa eri sijoittelut omissa lähteissään.
- Moder-URL muodostetaan samalla logiikalla kuin bannerissa (FI → `levillenet`, muut → `?lang=en`).
- Inline-linkit `target="_blank" rel="noopener noreferrer"`.
- Ei muutoksia muihin sivuihin, ei uusia komponentteja — pidetään muutos pienenä ja kohdistettuna.
- Kampanjabanneri (rivit 388–468) säilyy ennallaan.
- `StickyBookingBar` ja `PageCTA` säilyvät ennallaan (eivät häiritse inline-kokeilua, mutta analytiikassa nähdään mistä klikit tulevat).

## Mittaaminen

Jokainen 4 sijoittelua saa oman `placement`-arvon (`summer_page_inline_intro|activities|hiking|footer`). Admin-analytiikan "Varauslinkit lähtösivuittain" -taulukko näyttää konversiot per sijoittelu vs. nykyinen kampanjabanneri (`placement: "summer_page"`).

## Out of scope

- Muiden opassivujen inline-linkit (tehdään myöhemmin jos kesäsivulla toimii).
- Tekstien A/B-testaus.
- Visuaalinen redesign.
