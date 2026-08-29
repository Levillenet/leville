# Sivuhaun parantaminen

## Ongelma
Haku etsii vain sivulistan otsikoista, kuvauksista ja avainsanoista (`src/data/searchIndex.ts`). Vain 9 sivulla 200:sta on avainsanoja, eikä ladattavia PDF-tiedostoja (esim. joulupukin tervetulokirje) ole indeksissä lainkaan. Siksi hakusanat "letter", "welcome" tai "tervetulokirje" eivät tuota tuloksia. Lisäksi haku näyttää vain nykyisen kielen sivuja, ja osumat vaativat tarkan osajonon (ei kirjoitusvirhesietoa).

## Mitä tehdään

### 1. Ladattavat tiedostot mukaan hakuun
Uusi tyyppi hakuindeksiin ladattaville dokumenteille (`public/docs`-PDF:t), esim.:
- Joulupukin tervetulokirje lapsille (FI + EN + ES) — avainsanat: tervetulokirje, joulupukki, kirje, tulostettava, PDF, letter, welcome letter, Santa, printable
- Saunan lämmitysohjeet (PDF + sivu)
- Varausehdot-PDF

Tulokset avautuvat joko suoraan PDF:ään tai sivulle, jolla lataus on, ja näkyvät hakutuloksissa omalla "Lataukset / Downloads" -merkinnällä.

### 2. Avainsanojen laaja täydennys
Lisätään avainsanat kaikille keskeisille sivuille (majoitus, oppaat, aktiviteetit, revontulet, matkustaminen, seuratuki, äkkilähdöt, kohdesivut) sekä suomeksi että englanniksi, mukaan lukien yleisimmät ristikieliset termit (esim. "sauna/sauna", "mökki/cabin", "joulupukki/santa").

### 3. Hakulogiikan parannukset (`src/components/SiteSearch.tsx`)
- Skandien normalisointi (ä→a, ö→o) niin että "makit" löytää "mökit".
- Sanan alkuosumat: "welc" löytää "welcome".
- Kevyt kirjoitusvirhesieto (1 merkin ero yli 5-kirjaimisissa sanoissa).
- Toissijaiset tulokset toisesta kielestä, kun omalla kielellä ei löydy mitään ("Also in English / Myös suomeksi").
- Tulokset ryhmitellään kategorian mukaan olemassa olevilla `categoryLabels`-otsikoilla.

### 4. Validointi
Testataan hakusanoilla: letter, welcome, tervetulokirje, joulupukki, santa, sauna, makit, revontulet — ja varmistetaan että tervetulokirje löytyy sekä FI- että EN-haulla.

## Rajaus
- Ei muuteta sivujen sisältöä, ulkoasua eikä SEO-metatageja.
- Hakulokitus (`page_views`-tapahtumat) säilyy nykyisellään.
