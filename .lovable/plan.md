# Nopeusero kilpailijaan (leville.net vs levillas.fi)

## Mistä ero tulee

Googlen kenttädata (viimeiset 28 päivää, mobiili):

| Mittari | leville.net | levillas.fi |
|---|---|---|
| LCP | 5,2 s (hylätty) | 1,8 s |
| FCP | 5,0 s | 1,7 s |
| TTFB | 1,6 s | 0,8 s |
| CLS | 0,06 | 0,04 |
| Tehokkuus (labra) | 87 | 75 |

Huomio: labratesti antaa meille jo paremman pistemäärän (87 vs 75), mutta kenttädata on 28 päivän liukuva keskiarvo oikeilta käyttäjiltä. Se ei sisällä vielä eilen tehtyjä korjauksia lainkaan.

Tarkistin julkaistun etusivun lähdekoodin juuri nyt. Se on yhä vanha versio:
- Fontit haetaan edelleen Google Fontsista (ulkoinen yhteys ennen tekstin näkymistä) — itse hostatut fontit eivät ole tuotannossa.
- Etusivun pääkuvalle ei ole esilatausta eikä puhelimen pienempää versiota; ladataan yhä täysikokoinen kuva.
- Kaikki viisi taustakuvaa ovat sivun koodissa heti.
- Palvelimen vasteaika (TTFB) 1,6 s on kaksinkertainen kilpailijaan nähden.

Eli eilen tehdyt korjaukset eivät ole vielä käytössä — siksi mitään ei ole parantunut.

## Mitä tehdään

1. **Julkaistaan sivusto**, jotta tehdyt korjaukset (WebP-kuvat, esilataus, itse hostatut fontit, viivästetty varauswidget) menevät oikeasti tuotantoon.
2. **Varmistetaan julkaisun jälkeen** suoraan julkaistusta HTML:stä, että Google Fonts -linkki on poissa, pääkuvan esilataus on paikallaan ja vain yksi taustakuva latautuu heti.
3. **Mitataan uudelleen** labratesti mobiilille (LCP, FCP, CLS, siirretty datamäärä) ennen/jälkeen-taulukkona.
4. **TTFB-korjaus (1,6 s → tavoite alle 0,8 s).** Tutkitaan miksi ensimmäinen vaste on hidas: Cloudflaren välimuistiasetukset ja esirenderöinnin välimuistin osumatarkkuus etusivulle. Säädetään välimuisti niin, että etusivu tulee reunapalvelimelta valmiina.
5. **Kenttädatan seuranta.** Kerrotaan selvästi, että Googlen luvut päivittyvät vasta 2–4 viikossa julkaisusta, joten hylätty-merkintä poistuu viiveellä vaikka sivu olisi jo nopea.

## Tekniset yksityiskohdat
- Julkaistu HTML sisältää yhä `fonts.googleapis.com`-tyylitiedoston ja viisi `<img>`-hero-elementtiä, eikä `<link rel="preload" as="image">`-riviä — todiste vanhasta buildista.
- Mittaus: Playwright + PerformanceObserver (LCP/FCP/CLS), mobiiliprofiili 390×844, kolme ajoa, mediaani. PageSpeed Insights -API:n päiväkiintiö oli täynnä; uusitaan kun kiintiö nollautuu.
- TTFB-tutkinta: `curl -w` aikaerittely julkaistulle etusivulle sekä `x-lovablehtml-render-cache`- ja `cf-cache-status`-otsakkeet.

Ei muutoksia sisältöön, hintoihin tai varauslogiikkaan.
