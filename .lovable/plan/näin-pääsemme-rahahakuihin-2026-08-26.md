# Näin pääsemme rahahakuihin

Kaikki alla oleva perustuu Semrushin FI-dataan ja koodin tarkistukseen, ei arvauksiin.

## Mitä data kertoo lähtötilanteesta

| Havainto | Todiste |
|---|---|
| "levi majoitus" (6 600/kk) rankkaa sijalla 9 — mutta rankkaava sivu on **etusivu**, ei `/majoitukset` | Semrush FI, URL `https://leville.net/` |
| `/majoitukset` ei rankkaa yhdelläkään majoituksen pääsanalla | Semrush page_analysis: parhaat sijat 16–77, kaikkien volyymi 30–210/kk, liikenneosuus 0,00 % |
| Vaikeus on saavutettavissa | "levi majoitus" KD 34/100 |
| Follow-linkkejä vain 166 / 1 296, ja 82 % kaikista linkeistä tulee moder.fi:stä | Semrush backlink-profiili |
| Ankkuritekstit ovat opasaiheisia ("northern lights", "skiing guide"), ei yhtään majoitusankkuria | Semrush anchor-lista |

**Juurisyy ei ole sisällön puute vaan kohdistus.** Sivustolla on 28 kohdetta ja laaja opasverkosto, mutta majoitusaihe on hajautunut etusivun, `/majoitukset`-sivun, `/mokit-levilla`-sivun ja neljän katuhubin kesken. Google ei tiedä, mikä sivu on Levin majoituksen vastaus, joten se valitsee etusivun ja jättää sen sijalle 9.

## Miten kilpailija voittaa

levillas.fi:n etusivu tuo **75 % koko sivuston liikenteestä** ja rankkaa sijalla 4 sanalla "majoitus levi". Loput top-sivuista ovat osoitesivuja (`/majoitus/kuppimaantie-3/`, `/majoitus/martinmutka-8a/`), jotka rankkaavat **sijalla 1** oman osoitteensa nimellä. Malli on yksinkertainen: yksi vahva rahasivu + osoitekohtaiset sivut, jotka ottavat kaikki nimihaut. Meillä on jo molemmat rakenteet, mutta ne eivät ole terävöitettyjä.

## Toimenpiteet

### 1. Ratkaistaan kannibalisointi: yksi rahasivu
`/majoitukset` nostetaan majoituksen kanoniseksi vastaukseksi ja etusivu palautetaan brändi- ja opassivuksi.

- `/majoitukset`: title ja H1 kohdistetaan pääsanoihin *levi majoitus* / *majoitus levi* (yhteensä 18 700/kk)
- Etusivun title ja description muutetaan brändi- ja opaspainotteiseksi, jotta se lakkaa kilpailemasta samasta hausta. **Muutos koskee vain metatietoja — etusivun hakubanneriin ei kosketa.**
- Etusivulta vahva, näkyvä linkki `/majoitukset`-sivulle ankkurilla "majoitus Levillä"
- Nykyiset `/mokit-levilla` ja `/majoitukset` erotetaan selvästi: mökit vs. huoneistot, ristiinlinkitys molempiin suuntiin

### Suojattu: etusivun hakubanneri
Etusivun varaus-/hakubanneri (`<Hero>` ja `<ModerBookingWidget>` tiedostossa `src/pages/Index.tsx`, rivit 130 ja 156) jätetään täysin koskematta: ei muutoksia komponentteihin, propseihin, järjestykseen, tyyleihin eikä Moder-integraatioon. Etusivulla tehdään vain `<Helmet>`-metatietomuutos ja majoituslinkin lisäys bannerin ulkopuolelle. Lopuksi varmistetaan selaimessa, että banneri renderöityy ja toimii normaalisti.


### 2. Rakennetaan `/majoitukset` oikeaksi hakusivuksi
Hakija haluaa valita majoituksen, ei lukea esittelytekstiä. Sivulle:

- Suodatus/lajittelu: henkilömäärä, makuuhuoneet, sauna, etäisyys rinteeseen
- Jokaiseen korttiin näkyville henkilömäärä, makuuhuoneet, sauna ja metrit rinteelle
- Rinnakkaiset alaosiot omilla otsikoilla: **huoneistot**, **mökit**, **isot ryhmät** — nämä ovat omia hakuklustereitaan (*levi mökit* 1 900/kk, *levi mökkimajoitus* 2 400/kk, *hotelli levi* 2 900/kk)
- Uniikki, konkreettinen teksti: mihin Levin osaan kannattaa majoittua, mitä eroa huoneistolla ja mökillä on, milloin varata

### 3. Osoitesivut kattamaan kaikki kohteemme
Katuhubeja on nyt neljä (`hiihtajankuja-levi`, `skimbaajankuja-levi`, `glacier-apartments-levi`, `postintie-levi`), mutta kohteilla on osoitteita, joilla ei ole omaa hubia: Hiihtäjänkuja 2, Skimbaajankuja 4, Ratsastajankuja 2 ja Leviraitti. Nämä ovat juuri niitä hakuja, joilla levillas.fi on sijalla 1.

- Täydennetään katuhubit kattamaan kaikki kohteiden osoitteet
- Jokaisen kohdesivun title ja H1 sisältää sekä kohteen nimen että osoitteen
- Hubit linkitetään `/majoitukset`-sivulta ja kohdesivuilta takaisin hubiin

### 4. Käännetään opasliikenne majoitukseen
Meillä on jo se, mitä kilpailijoilla ei ole: hissiliput (sija 2, 5 400/kk), sää, ladut ja ravintolat tuovat tuhansia kävijöitä kuukaudessa. Ne eivät nyt ohjaa majoitukseen.

- Vahva majoitusnosto viidelle liikenteeltään suurimmalle opassivulle (hinnat, sää, ladut, ravintolat, tapahtumat), ankkurilla "majoitus Levillä"
- Nostot mittaroidaan olemassa olevalla konversioseurannalla, jotta näemme mikä opas tuottaa varauksia

### 5. Linkkiprofiilin korjaus
Follow-linkkejä on 166 ja niistä yksikään ei osoita majoitussivulle. Tämä on sivuston pahin yksittäinen kasvueste.

- Sisäinen linkitys korjataan ensin (kohdat 1–4) — se on ainoa osa, jonka voimme itse toteuttaa koodissa
- Ulkoisista linkeistä laaditaan erillinen konkreettinen kohdelista (Levi-alueen toimijat, seurat/yhteisöt seuratuen kautta, paikallismediat). Näitä ei osteta eikä hankita linkkiverkostoista.

## Tekninen toteutus

- `src/pages/Majoitukset.tsx`: metatiedot, H1, suodatinlogiikka, osiointi, uniikki teksti, `ItemList`-schema
- `src/pages/Index.tsx`: etusivun title/description brändipainotteiseksi, majoituslinkki näkyville
- `src/data/street-hubs.ts`: puuttuvat osoitehubit + `src/pages/StreetHub.tsx` -sisältö
- `src/data/properties.ts`: kohdesivujen title/H1 osoitteineen
- `src/components/MajoitusCallout.tsx`: lisätään opassivuille
- Reitit `src/App.tsx`, sitemapit `src/data/sitemapRoutes.ts` + `supabase/functions/_shared/sitemapRoutes.ts`, hakuindeksi `src/data/searchIndex.ts`
- Lopuksi `bun run build` + reittivalidointi

## Järjestys

1. Kannibalisoinnin poisto (etusivu vs. `/majoitukset`) — suurin ja nopein vaikutus
2. `/majoitukset` hakusivuksi
3. Opassivujen majoitusnostot (liikenne on jo olemassa)
4. Osoitehubien täydennys
5. Ulkoisten linkkien kohdelista

## Realistinen odotus

"levi majoitus" on KD 34 ja SERPin kärjessä on levi.fi, Lomarengas ja Nettimökki. Emme ohita levi.fi:tä, mutta levillas.fi on sijalla 4 samankokoisella auktoriteetilla — sinne on realistinen matka. Sijalta 9 sijalle 4–5 nouseminen tarkoittaa noin nelinkertaista klikkimäärää tästä yhdestä hausta. Aikajänne on kuukausia, ei viikkoja.
