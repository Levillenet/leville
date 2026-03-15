

# 4 uutta kuvaa sivustolle

## Kuvien tunnistus ja sijoitus

| Kuva | Sisältö | Sivu | Tallennuspolku |
|------|---------|------|----------------|
| `IMG_20210323_102728.jpg` | Laskettelija Levin huipulla kädet ylhäällä, panoraamanakyma | `SkiingInLevi.tsx` | `src/assets/seasons/spring-slopes-wind.jpg` (korvaa nykyisen, joka on tuulinen rinteidenkuva — tai uusi nimi) |
| `20230111_194341.jpg` | Poronkäristys valurautapadoissa + perunamuusi | `ChristmasDinnerLevi.tsx` + `ChristmasDinnerLeviFI.tsx` | `src/assets/seasons/reindeer-stew-pots.jpg` |
| `20230111_194346.jpg` | Poronkäristys-illallinen kattaus: puolukat, suolakurkut, leipä, viini | `RestaurantsAndServices.tsx` | `src/assets/seasons/reindeer-dinner-spread.jpg` |
| `20231127_135546.jpg` | Kalatiskin tarjonta ruokakaupassa | `RestaurantsAndServices.tsx` | `src/assets/seasons/grocery-fish-counter.jpg` |

## Muutokset sivuihin

### 1. SkiingInLevi.tsx — laskettelijakuva
- Lisätään uusi kuva intron jälkeen tai nykyisten kuvien yhteyteen
- FI: "Laskettelija Levin tunturin huipulla — näkymät ulottuvat kymmenien kilometrien päähän Lapin erämaahan"
- EN: "A skier on top of Levi fell — views stretch tens of kilometres across the Lapland wilderness"

### 2. ChristmasDinnerLevi.tsx (EN) + ChristmasDinnerLeviFI.tsx (FI) — poronkäristys padoissa
- Lisätään kuva ruokaosioon
- FI: "Poronkäristystä valurautapadoissa perunamuusin kera — klassinen Lapin ateria jonka voi tilata valmiina majoitukseen usealta paikalliselta yritykseltä"
- EN: "Sautéed reindeer in cast iron pots with mashed potatoes — a classic Lapland meal that can be ordered ready-made to your accommodation from several local companies"

### 3. RestaurantsAndServices.tsx — kalatiskikuva + illalliskattaus
- **Kalatiskikuva** ruokakaupat-osioon: "Levin ruokakauppojen kalatiskit tarjoavat tuoretta lohta, siikaa ja muikkua — kala on Lapissa aina tuoretta"  / "The fish counter at Levi's grocery stores offers fresh salmon, whitefish and vendace — fish is always fresh in Lapland"
- **Illalliskattaus** ravintola/omatoiminen ruokailu -osioon: "Poronkäristys-illallinen majoituksessa — valurautapadoissa tarjoiltu käristys puolukkoineen, suolakurkkuineen ja tuoreen leivän kera on aito lappilaisateria" / "A reindeer dinner at the accommodation — sautéed reindeer served in cast iron pots with lingonberries, pickled cucumbers and fresh bread is an authentic Lappish meal"

## Tekninen toteutus

- 3 uutta kuvatiedostoa `src/assets/seasons/` -kansioon
- Importoidaan `OptimizedImage`-komponentti ja kuvat kullekin sivulle
- Kuvatekstit kaksikielisesti `lang`-propilla, sama tyyli kuin muilla sivuilla

