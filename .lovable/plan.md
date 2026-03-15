

# 10 kuvaa sivustolle — kuvitus ja kuvatekstit

## Uudet kuvatiedostot (10 kpl)

| Tiedosto | Tallennuspolku |
|----------|---------------|
| `20250923_135539.jpg` | `src/assets/seasons/reindeer-village.jpg` |
| `IMG_20181121_144146.jpg` | `src/assets/seasons/winter-sunset.jpg` |
| `IMG_20200312_102412.jpg` | `src/assets/seasons/kids-snow-caves.jpg` |
| `IMG_20200827_204651.jpg` | `src/assets/summer/stored-snow.jpg` |
| `IMG_20201205_164324.jpg` | `src/assets/seasons/christmas-market.jpg` |
| `IMG_20201208_100531.jpg` | `src/assets/seasons/tykky-trees.jpg` |
| `IMG_20201210_155630.jpg` | `src/assets/seasons/kids-sledding-dark.jpg` |
| `IMG_20210324_114210.jpg` | `src/assets/seasons/laavu-outside.jpg` |
| `IMG_20210324_114239.jpg` | `src/assets/seasons/laavu-inside.jpg` |
| `IMG_20210324_160142.jpg` | `src/assets/seasons/fatbike-snow.jpg` |

## Muutokset sivuihin

### 1. WinterInLevi.tsx — 2 kuvaa
- **Auringonlasku** intron jälkeen: "Levin taivas voi näyttäytyä erityisen kauniina auringonlaskun aikaan talvella" / "The sky above Levi can look spectacular at sunset during winter"
- **Tykkylumipuut** kaamos- tai olosuhdeosioon: "Tykkylumisia puita Levin tunturissa — tykky tarkoittaa puihin jäätynyttä paksua lumikerrosta, jota esiintyy tyypillisesti joulukuusta helmikuuhun" / "Snow-laden 'tykky' trees on Levi fell — tykky refers to thick frozen snow coating on trees, typically seen from December to February"

### 2. JouluLapissa.tsx — 1 kuva
- **Joulumarkkinat** elämysosioon: "Joulumarkkinat Levin keskustassa — paikallista käsityötä ja jouluista tunnelmaa" / "Christmas market in Levi centre — local handicrafts and festive atmosphere"

### 3. FatbikeLevi.tsx — 1 kuva
- **Fatbike lumella** intron jälkeen: "Fatbike-pyöräilyä lumisella reitillä Levillä kevättalvella" / "Fatbiking on a snowy trail in Levi during late winter"

### 4. SpringInLevi.tsx — 2 kuvaa
- **Laavu ulkoa**: "Laavu on avoin tulentekopaikka retkeilijöille — niitä voi käyttää ilmaiseksi ympäri Levin retkeilyreitistöä" / "A laavu is an open-air shelter for hikers — they can be used for free across Levi's trail network"
- **Laavun sisällä**: "Nuotio laavussa kevätretkellä — eväsretki nuotion ääressä kuuluu Lapin retkeilykulttuuriin" / "Campfire in a laavu during a spring outing — a fireside snack break is an essential part of Lapland hiking culture"

### 5. LeviForKids.tsx — 2 kuvaa
- **Lumikuopat** lumileikkiosioon: "Majoitustemme piha-alueilla on usein isoja lumikasoja joissa lapset voivat leikkiä lumilinnaa ja kaivaa luolastoja" / "The yards of our accommodation properties often have large snow piles where kids can build snow forts and dig caves"
- **Pulkkamäki pimeässä** muihin suosikkeihin: "Pulkkailua joulukuun hämärässä — talvipimeäkin on seikkailua lasten mielestä" / "Sledding in December twilight — even the winter darkness is an adventure for kids"

### 6. SummerInLevi.tsx — 1 kuva
- **Säilötty lumi** lisätään olemassa olevien kesäkuvien yhteyteen: "Säilöttyä lunta Levin eturinteessä elokuussa — lunta varastoidaan sahanpurun alla kesän yli laskettelukauden aikaistamiseksi" / "Stored snow on Levi's front slope in August — snow is preserved under sawdust over summer to enable an early ski season start"

### 7. Porokuvalle (Levi-pääsivu tai AutumnRuskaInLevi.tsx) — 1 kuva
- **Porot kylässä**: "Poroja Levin kyläkeskuksessa — porot vierailevat kylässä erityisesti keväisin ja kesäisin" / "Reindeer in Levi village centre — reindeer visit the village especially in spring and summer"
- Sijoitetaan `AutumnRuskaInLevi.tsx`-sivulle tai Levi-pääsivulle.

## Tekninen toteutus

Jokaisella sivulla:
1. Importataan kuva ja `OptimizedImage`-komponentti
2. Lisätään kuvalohko sopivaan kohtaan sisällössä
3. Kuvateksti `<p className="text-xs text-muted-foreground mt-2 text-center italic">` kaksikielisesti `lang`-propilla

Sama rakenne kuin Kesä-sivulla jo käytetty — yhtenäinen tyyli koko sivustolla.

