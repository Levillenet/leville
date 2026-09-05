# Latausnopeuden jälkimittaus (julkaisu + PageSpeed)

Tähänastiset labramittaukset (mobiili, simuloitu puhelin):

| Mittari | Ennen (julkaistu) | Jälkeen (esikatselu) |
|---|---|---|
| FCP | 1,63 s | ~0,45 s (−72 %) |
| CLS | 0,063 | 0,000 |
| Hero-kuvan koko | ~430 kt (JPG) | ~7–50 kt (WebP 640/1024/1536) |
| Kuvapyynnöt | 5 kuvaa heti | 1 kuva heti, loput joutilaana |

Esikatselu palvelee kääntämätöntä kehitysversiota (6,9 Mt skriptejä, 214 pyyntöä), joten sen LCP-luku (1,8–3,8 s) ei kerro tuotannon todellista tilaa. Luotettava luku saadaan vain julkaistusta versiosta. PageSpeed Insightsin ilmainen päiväkiintiö oli tänään täynnä, joten mittaus tehdään paikallisesti Lighthouse/Playwright-labralla.

## Mitä tehdään

1. **Julkaistaan sivusto** nykyisine LCP-muutoksineen.
2. **Jälkimittaus julkaistulle versiolle** (`https://leville.lovable.app` ja `https://leville.net` jos ohjaa oikein): LCP, FCP, CLS, TBT, pyyntöjen määrä ja siirrettävä datamäärä mobiili- ja työpöytäprofiililla. Mittaus ajetaan kolme kertaa ja raportoidaan mediaani.
3. **Raportti chatissa** ennen/jälkeen-taulukkona: LCP, FCP, CLS, TBT ja datamäärät (kuvat, fontit, skriptit) sekä arvio PageSpeed-pisteiden muutoksesta.
4. Jos LCP jää yli 2,5 s:n, tunnistetaan jäljellä oleva suurin hidaste (esim. Moder-widget tai aloitusanimaatiot) ja ehdotetaan tarkkakorjausta erikseen.

## Tekniset yksityiskohdat
- Mittaus: Playwright + PerformanceObserver (largest-contentful-paint, paint, layout-shift, longtask) kuten tähänkin asti; verrataan samaan ennen-lukemaan (LCP 1,78 s, FCP 1,63 s, CLS 0,063, 2,5 Mt).
- PageSpeed Insights -uusinta tehdään kun kiintiö nollautuu, jos haluat Googlen viralliset pisteet.

Ei muutoksia sisältöön tai varauslogiikkaan — vain julkaisu ja mittaus.
