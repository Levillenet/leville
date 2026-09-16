# "Levi accommodation with hot tub" — EN-näkyvyyden korjaus

## Nykytila (varmistettu)

Haku "levi accommodation with hot tub": 320 näyttöä, pos 20, 0 klikkiä.

- Karhupirtissä ON ulkoporeallas (`hotTub: true` properties.ts:ssa).
- EN-kohdesivun meta description sisältää jo "outdoor hot tub" (lyhennetty shortDescription), mutta **title/H1 eivät mainitse sitä**: "Karhupirtti — The Bear Lodge in Levi Center".
- EN-opassivu `/guide/outdoor-hot-tub-levi-cabin` käsittelee porealtaita yleisesti, mutta **ei mainitse Karhupirttiä eikä linkitä siihen** — se ei siis ohjaa hakulikennettä kaupalliseen sivuun.
- Bearlodge-vierasopas (`/accommodations/guides/bearlodge`) mainitsee jacuzzin runsaasti, mutta se on vierasohje, ei majoitushakuun sopiva laskeutumissivu.

Eli sisältöä on, mutta se on hajallaan eikä mikään yksittäinen EN-sivu vastaa selkeästi hakuun "accommodation with hot tub".

## Muutokset (vain EN, FI-sivuihin ei kosketa)

### 1. Karhupirtin EN-title ja H1 vahvistetaan — `src/data/propertyTranslationsEn.ts`
- `name`: "Karhupirtti — The Bear Lodge in Levi Center" → "Karhupirtti — Log Villa with Outdoor Hot Tub in Levi Center"
- Nimi syöttää kohdesivun `<title>`:n ja H1:n automaattisesti (PropertyDetail rakentaa ne nimestä), joten yksi muutos riittää — ei erillistä meta-käsittelyä.
- Mukana pysyvät aiemmat avainsanat: log villa, Levi Center.

### 2. Hot tub -opas linkittää Karhupirttiin — `src/pages/guide/OutdoorHotTubLevi.tsx`
- EN-versioon yksi lyhyt kappale: Leville.netin Bear Lodge (Karhupirtti) on ainoa kohde, jossa on yksityinen ulkoporeallas omalla pihalla — linkki `/en/accommodations/karhupirtti`.
- Lisätään "Bear Lodge with private outdoor hot tub" EN `relatedLinks`-listaan.
- EN meta description täsmennetään mainitsemaan, että opas kertoo myös mistä löytyy majoitus poreallaalla ("…and where to find Levi accommodation with a private outdoor hot tub").
- FI-versioon ei sisältömuutoksia (käännösobjekti jakaa rakenteen — vain en-avaimet muuttuvat; tarkistetaan että fi-avaimet säilyvät ennallaan).

### Ei tehdä
- Ei euromääräisiä hintoja.
- Ei muutoksia FI-sivuihin, `/majoitukset`-sivuun tai muihin kohteisiin (niillä ei ole poreallasta).
- Ei uusia sivuja.

## Tekniset tiedot
- Tiedostot: `src/data/propertyTranslationsEn.ts`, `src/pages/guide/OutdoorHotTubLevi.tsx`
- PropertyDetail.tsx rakentaa title = `{name} — {suffix} | Leville.net` ja description = lyhennetty shortDescription — molemmat sisältävät hot tub -maininnan muutoksen jälkeen.
- Varmistus: `npx tsgo --noEmit` ja build-loki.

## Odotettu vaikutus
Hakuun "levi accommodation with hot tub" (320 näyttöä/kk, pos 20) tulee kaksi selvää vastausta: vahvistettu kohdesivu (title+H1+description) ja opassivu, joka ohjaa liikenteen sille. Realistinen tavoite: pos 20 → sivu 1 ja ensimmäiset klikit muutamassa viikossa indeksoinnin jälkeen.
