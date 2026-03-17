

# Korjaus: Esteettömyys-sivu ei toimi tuotannossa

## Ongelma
`travelHubContent.ts` viittaa polkuun `/opas/esteetomyys-levilla`, mutta `App.tsx`:ssä reitti on `/opas/esteetton-levi`. Polut eivät täsmää → 404.

## Ratkaisu

Kaksi muutosta:

1. **`src/data/travelHubContent.ts`** — Korjataan linkki oikeaan polkuun:
   - `/opas/esteetomyys-levilla` → `/opas/esteetton-levi`

2. **`public/_redirects`** — Lisätään 301-uudelleenohjaus vanhasta polusta uuteen, jotta mahdolliset indeksoidut/jaetut linkit toimivat:
   - `/opas/esteetomyys-levilla` → `/opas/esteetton-levi` (301)

Tämä korjaa sekä sivuston sisäiset linkit että ulkoiset/hakukoneiden mahdollisesti indeksoimat vanhat polut.

