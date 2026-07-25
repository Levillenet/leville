## Tavoite

Nostaa Joulu Lapissa -kortti näyttävämmäksi Levi-oppaan pääsivulla (`/levi`) punaisella joulutunnelmalla ja hienovaraisilla revontulilla, sekä lisätä lyhyet jako-URL:t `/joulu` ja `/xmas`.

## Muutokset

### 1. `src/pages/Levi.tsx` — Christmas-kortti (rivit 698–725)
Nykyinen kortti on olemassa mutta pieni ja hillitty. Muokataan visuaalisesti näyttävämmäksi säilyttäen kortin sijainti ja käännösavaimet (`christmasTitle`, `christmasDesc`, `christmasButton`, `christmasLinks`):

- Vahvempi punainen gradient-tausta (esim. `from-red-700 via-red-900 to-red-950`) valkoisella tekstillä paremman kontrastin ja jouluisen tunnelman vuoksi
- Hienovarainen revontuli-efekti kortin yläreunaan: kaksi päällekkäistä pehmeää `blur-3xl` gradient-läiskää vihreällä ja violetilla (`from-emerald-400/30 to-purple-500/20`), animoitu hitaalla pulssilla
- Lumihiutaleiden tiheyttä lisätään (4–5 kpl eri kokoisia ja animaatioviiveitä), tähti ja liekki säilytetään
- Otsikko isommaksi (`text-2xl sm:text-3xl`), lisäksi pieni "🎄" tai koristeellinen alaotsikkoteksti (uusi käännösavain `christmasBadge`, esim. "Joulu 2026" / "Christmas 2026" 7 kielelle)
- Nappi valkoisella pohjalla + punainen teksti (parempi kontrasti punaisella kortilla) hover-tilalla käänteinen
- `Gift`-ikonin ympyrä isommaksi ja hehkuvammaksi (`shadow-lg shadow-red-500/50`)
- Kortti spannataan koko leveydelle omalla rivillään sen sijaan että se on sisar-Card quiz-kortin kanssa samassa grid-solussa — nykyinen `<section>` sisältää sekä quiz- että christmas-kortin; erotetaan Christmas-kortti omaan sectioniin quizin jälkeen jotta se saa täyden näkyvyyden (leveä hero-tyylinen kortti)

Kaikki 7 kielen `christmasBadge`-avainta lisätään olemassa olevaan `content`-objektiin `Levi.tsx`:ssä.

### 2. `src/App.tsx` — Alias-reitit
Lisätään `JouluLapissa`-import-lohkon lähelle kaksi uutta reittiä olemassa olevien lang-versioiden viereen:

```tsx
<Route path="/joulu" element={<JouluLapissa />} />
<Route path="/xmas" element={<JouluLapissa lang="en" />} />
```

Molemmat renderöivät saman `JouluLapissa`-komponentin (200-alias-strategia — ei redirectejä). `/joulu` palvelee suomenkielisen version, `/xmas` englanninkielisen. Kanoninen URL säilyy `/levi/joulu-lapissa` ja `/en/levi/christmas-in-lapland` — komponentin `SeoMeta` asettaa canonicalin, joten aliakset eivät luo duplikaattisisältöä hakukoneille.

### 3. Sitemap
Ei muutoksia — aliakset ovat vain jakoa varten, kanoninen URL on jo sitemapissa. Näin vältetään ghost URL / duplikaattiongelmat (memory: ghost-url-prevention).

## Ei muutoksia
- `JouluLapissa.tsx` sisältöön tai käännöksiin
- Muihin kortteihin `/levi`-sivulla
- Muihin kieliin `christmasLinks`-mapissä
