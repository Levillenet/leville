# Rahahakujen nosto: "majoitus levi" sijalta 26 sivulle 1

Semrush-datan perusteella opas- ja säätermit vetävät hyvin, mutta kaupalliset majoitushaut jäävät sivun 1 ulkopuolelle. Paras signaali on, että *levi huoneisto* on jo sijalla 6 ja *hiihtäjänkuja* top 10:ssä — eli huoneisto- ja osoitepohjainen sisältö toimii. Laajennetaan sama malli varsinaisiin majoitushakuihin.

## Mitä tehdään

### 1. Osoite-/kohdehubien laajennus (paras tuotto)
Nykyiset seitsemän hubia toimivat. Lisätään loput todelliset osoitteet ja kohdealueet, joilla on oikeaa hakukysyntää, samalla rakenteella kuin nykyiset — oma title, H1, sijaintikuvaus, kohteet ja linkit takaisin `/majoitukset`-sivulle. Vain osoitteet, joilla meillä on oikeasti kohteita; ei keksittyjä hubeja.

### 2. Sisäinen linkkivoima /majoitukset-sivulle
Sivu on sisällöltään vahva mutta saa liian vähän sisäisiä linkkejä. Lisätään ankkuritekstillinen linkitys ("majoitus Levillä", "Levin majoitus") sivuston eniten liikennettä saavista opassivuista — revontuliennuste, latukartta, hissiliput, sää, ravintolat — leipätekstiin, ei pelkkiin kortteihin. Nykyiset `MajoitusCallout`-nostot säilyvät.

### 3. Majoitustyyppien alasivut
`/majoitukset` yrittää nyt kattaa kaiken. Erotetaan omat, kohdennetut laskeutumissivut niille tyypeille, joilla on oma hakukysyntä (huoneisto, mökki, isot ryhmät). Mökkisivut ovat jo olemassa (`/mokit-levilla`), joten täydennetään puuttuvat ja varmistetaan, ettei synny kanibalisointia: yksi sivu per hakuintentio, selkeät kanoniset osoitteet ja ristiinlinkitys.

### 4. Kohdesivujen sisäinen rakenne
Jokaiselle kohteelle varmistetaan, että sivulla on osoite tekstinä, etäisyydet (rinne, keskusta, hissi), varustelu ja henkilömäärä leipätekstissä — nämä ovat ne termit, joilla osoitehaut osuvat.

## Mitä EI tehdä
- Etusivun hakubanneriin (Hero + Moder-widget) ei kosketa millään tavalla.
- Ei ostettuja linkkejä, linkkiverkostoja eikä keinotekoisia ankkureita.
- Ei uusia kieliversioita tässä vaiheessa.
- Ei keksittyjä väitteitä, arvosteluja tai tilastoja.

## Tekniset yksityiskohdat
- Uudet hubit: `src/data/street-hubs.ts` + dynaaminen `/vuokramokit/:streetSlug` -reitti (olemassa).
- Sitemap: lisäykset sekä `src/data/sitemapRoutes.ts` että `supabase/functions/_shared/sitemapRoutes.ts`, edge-funktion uudelleenjulkaisu ja `sitemap.xml`-generointi.
- Uudet staattiset reitit `src/App.tsx`:ään lazy-importilla, hakuindeksiin ja footeriin.
- Kanoniset osoitteet absoluuttisina ilman trailing slashia; hreflang vain käännetylle sisällölle.
- Lopuksi `bun run build` + reittivalidointi ja selaintarkistus.

## Huomio Site Auditista
Semrushin sivustoauditointi on 12.1.2026 ja kattaa vain 63 sivua 460+:sta. Sen 110 virhettä eivät kuvaa nykytilaa. Kannattaa ajaa tuore skannaus Semrushissa ennen kuin niistä tehdään korjauslistaa — se ei kuulu tähän toteutukseen.
