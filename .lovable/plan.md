

# Hero-kuvien korvaaminen JPG-versioilla

## Muutokset

### 1. Kopioi ladatut kuvat asset-kansioon
Korvataan 5 nykyistä hero-kuvaa ladatuilla JPG-tiedostoilla:
- `src/assets/hero-chalet.png` → `.jpg` (Adobe_Express_-_file.jpg)
- `src/assets/hero-village.png` → `.jpg` (Adobe_Express_-_file_1.jpg)
- `src/assets/hero-apartment.png` → `.jpg` (Adobe_Express_-_file_2.jpg)
- `src/assets/hero-lodge.png` → `.jpg` (Adobe_Express_-_file_3.jpg)
- `src/assets/hero-cabin.jpg` → uusi versio (173457-4.jpg)

### 2. Päivitä importit `src/components/Hero.tsx`
Muutetaan vain import-rivit 4–8 viittaamaan uusiin `.jpg`-tiedostoihin. Kaikki muu koodi (slideshow-logiikka, Ken Burns, overlay, booking widget, asettelut) pysyy täysin ennallaan.

### 3. Lisää preload `index.html`
Lisätään `<link rel="preload">` ensimmäiselle hero-kuvalle (hero-chalet.jpg) nopeuttamaan ensimmäisen kuvan latautumista.

Ei muita muutoksia — widget, animaatiot ja layout säilyvät identtisinä.

