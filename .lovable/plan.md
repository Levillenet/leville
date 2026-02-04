
Tavoite: palauttaa Moder-widgetin toiminnallisuus (päivämäärien valinta) ja varmistaa, että avautuva kalenteri/overlay näkyy aina kaiken päällä, rikkomatta muuta sivuston UI:ta.

## Mitä on mennyt pieleen (todennäköinen juurisyy)
Nykyinen `src/index.css` sisältää hyvin aggressiivisia sääntöjä:

- `#moder-embed * { pointer-events: auto !important; }` pakottaa pointer-eventit kaikille widgetin sisäisille elementeille.
  - Moni kalenteri toteutetaan niin, että “päivän numero” on sisäelementti jolla on normaalisti `pointer-events: none`, ja klikkaus osuu parent-“day cell” -elementtiin (tai event-delegaatio odottaa tiettyä targettia).
  - Kun me pakotetaan `pointer-events: auto`, klikkaus kohdistuu eri elementtiin kuin widget odottaa -> valinta ei rekisteröidy, vaikka overlay näkyy.
- Lisäksi globaalit säännöt kuten `body > div[style*="position: fixed"] { z-index: 999999 !important; }` voivat nostaa aivan vääriä portaaleja/kerroksia ja “sekoittaa” koko sivun (käyttäjän “meni aivan pilalle” -kokemus).

Kuvassa overlay näkyy kyllä “päällä”, mutta klikkaukset päiviin eivät muuta Tulopäivä-kenttää -> tämä sopii erittäin hyvin juuri pointer-events -ylikirjoitukseen.

## Suunniteltu korjaus (minimoidaan CSS-hakkerointi, tehdään z-index oikein)
### 1) Siivotaan Moder-CSS “minimaaliseen, turvalliseen” muotoon
Tiedosto: `src/index.css`

Poistetaan / perutaan nämä nykyiset “liian laajat” säännöt:
- `#moder-embed *, #moder-embed *::before, #moder-embed *::after { pointer-events: auto !important; }`
- kaikki yleiset “calendar/datepicker/dropdown” -targetoinnit
- `body > div[style*="position: absolute|fixed"] { pointer-events: auto !important; z-index ... }`
- `[role="gridcell"] { pointer-events ... }` jne.

Jätetään vain:
- `#moder-embed` containerille: `overflow: visible` ja tarvittaessa kohtuullinen `z-index` (esim. 50–200) Hero-alueen sisällä.
  - Ei pakoteta widgetin sisäisiin elementteihin pointer-eventsejä.
  - Ei muuteta widgetin sisäisten portaali-elementtien `position`-arvoja.

Lisätään uusi “kohdistettu” luokka vain Moder-portaaleille:
- Esim. `.moder-portal-layer { z-index: 2147483647 !important; }` (maksimi-int tyyppinen varma kerros)
- Ei aseteta pointer-events, ei position, pelkkä z-index.

### 2) Nostetaan Moderin portaalit/overlayt päälle JS:llä (MutationObserver)
Tiedosto: `src/components/ModerBookingWidget.tsx`

Lisätään scriptin latauksen jälkeen “observer”, joka etsii Moderin lisäämiä body-tason overlay/portaali-elementtejä ja merkitsee ne luokalla `.moder-portal-layer`.

Periaate:
- Kun käyttäjä avaa kalenterin, Moder todennäköisesti lisää DOM:iin uuden elementin (usein suoraan `document.body`-tason lapseksi).
- Käytetään `MutationObserver`ia seuraamaan `document.body`-muutoksia.
- Kun uusi node lisätään:
  - Jos node (tai sen alipuusta) löytyy tunnisteita kuten:
    - elementti, jonka tekstisisältö sisältää “Specific days” / “Tarkat päivämäärät” / “± 1 day” / “Tulopäivä” / “Lähtöpäivä”
    - tai node sisältää iframe/script-elementtejä joiden src viittaa moder/app.moder
    - tai className sisältää “moder”
  - Lisätään luokka `moder-portal-layer` ja/tai asetetaan `node.style.zIndex = "2147483647"` jos se on järkevää.
- Observer disconnect unmountissa, jotta ei jää “roikkumaan”.

Tällä saadaan:
- Kalenteri varmasti aina päällimmäiseksi.
- Ei rikota widgetin omaa event-handlingia (koska emme koske sen sisäisiin pointer-eventseihin).
- Ei rikota Radix-dropdownpeja yms, koska emme enää pakota koko sivun portaaleja älyttömiin z-indexeihin.

### 3) Puhdistetaan Hero-widgetin animaatiokerros (varmistus)
Tiedosto: `src/components/Hero.tsx`

Varmistetaan, ettei Moder-widgetin wrapperissa ole transform-animaatiota, joka voi joskus tehdä oudosti overlayiden/positionoinnin kanssa.

Muutos:
- Poistetaan widgetin ympäriltä `animate-slide-up` (koska se käyttää `transform`-keyframeja).
- Vaihdetaan se esim. `animate-fade-in` (opacity-only), tai jätetään animaatio pois.
- Pidetään layout/tyylit muutoin samana.

### 4) (Bonus) Siivotaan ref-varoitus (jos edelleen näkyy)
Console-logissa näkyi: “Function components cannot be given refs… Check render method of Index… ModerBookingWidget…”
Vaikka nykykoodissa ei näy refiä, tarkistan toteutusvaiheessa:
- ettei `ModerBookingWidget`ille anneta refiä missään (myös mahdolliset wrapperit/anim-komponentit)
- ettei `ModerBookingWidget` yritä itse käyttää refiä väärin (nyt se ei käytä).

## Testaus (mitä sinun kannattaa kokeilla heti korjauksen jälkeen)
1) Avaa etusivu → klikkaa Tulopäivä → kalenterin pitäisi avautua ja olla kaiken päällä (header/hero/taustat eivät peitä sitä).
2) Klikkaa päivä, joka varmasti on “vapaa” (esim. API-datan perusteella 2026-02-05 oli vapaa) ja varmista että Tulopäivä muuttuu “Lisää päivämäärä” -> konkreettiseksi päiväksi.
3) Testaa myös Lähtöpäivä ja vieraat (plus-nappi), jotta nähdään ettei tapahtumankäsittely rikkoudu.
4) Varmista että sivuston muut dropdownit/dialogit eivät ole sekaisin (koska poistamme globaalit CSS-yliampumiset).

## Jos tämä ei vieläkään korjaa päivämääräklikkejä
Silloin ongelma ei ole enää “päällekkäiset kerrokset”, vaan Moder-embed ei hyväksy valintaa (esim. kaikki päivät disabled saatavuuden perusteella, tai embedin konfiguraatio tarvitsee lisäparametreja).
Seuraava askel olisi:
- tarkentaa, miltä “valittava” päivä näyttää (onko aktiiviset päivät erivärisiä / hoverilla muuttuvia)
- lisätä diagnostiikka: logittaa klikkauksen jälkeen muuttuuko DOM:ssa valintatila (esim. “selected” class) vai ei.

## Toteutettavat tiedostomuutokset
- `src/index.css` (siivous, vain minimi + `.moder-portal-layer` z-index)
- `src/components/ModerBookingWidget.tsx` (MutationObserver + luokan lisäys)
- `src/components/Hero.tsx` (poistetaan transform-animaatio widgetin wrapperista)

