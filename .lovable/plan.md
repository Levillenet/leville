# World Cup Levi -sivu (FI + EN)

## Validointi (tehty)

1. **Ei olemassa olevaa World Cup -sivua.** "world cup" mainitaan vain olemassa olevissa oppaissa (Levi.tsx, EventsInLevi.tsx, EventTimeline.tsx, kuukausioppaat, vertailusivut) — omaa reittiä tai sivua ei ole.
2. **Jaettu sivupohja vahvistettu** (esim. `src/pages/guide/SkiingInLevi.tsx`): Helmet, Header, Breadcrumbs, SubpageBackground, HreflangTags (tukee `customUrls`), JsonLd + `src/utils/structuredData`, ReadNextSection (`src/components/guide/ReadNextSection.tsx`), GuideDisclaimer, PageCTA, MajoitusCallout, Footer, WhatsAppChat, StickyBookingBar — kaikki `lang`-propilla, käännösobjekti tiedoston sisällä.
3. **vite-imagetools on käytössä** (`vite.config.ts`), joten `src/assets/worldcup/`-kuvat optimoidaan/WebP-muunnetaan buildissa automaattisesti.
4. **Sisäiset linkit:**
   - `/opas/laskettelu-levi` — OK
   - `/opas/levi-marraskuussa` — OK (varasivua ei tarvita)
   - `/opas/ravintolat-ja-palvelut-levilla` — OK
   - `/majoitukset` — OK
   - `/opas/miten-paasee-leville` — olemassa, mutta se on **redirect** kohteeseen `/matka/miten-paasee-leville-helsingista`. Linkitän suoraan lopulliseen osoitteeseen turhan hypyn välttämiseksi.
5. **Poikkeus kuviin:** latasit jo 4 kisakuvaa tässä viestissä. Käytän niitä suoraan placeholderien sijaan (nimeän ne pyytämiisi tiedostonimiin), joten sivu julkaistaan valmiilla kuvilla.

## Mitä rakennetaan

**Uusi sivu:** `src/pages/guide/WorldCupLevi.tsx` (`lang`-prop, fi default + en)

**Reitit** (`src/App.tsx`, lazy-loaded):
- `/opas/world-cup-levi` (FI)
- `/guide/levi-world-cup` (EN)

**Dynaaminen päivämäärälohko** tiedoston alussa, kommentti "PÄIVITÄ VUOSITTAIN: FIS vahvistaa päivät keväällä — vaihda vain tämä lohko, koko sivu päivittyy":

```text
WORLD_CUP = { year: 2026, dates: {fi:"14.–15.11.2026", en:"14–15 November 2026"},
              startDate:"2026-11-14", endDate:"2026-11-15", edition:22, confirmed:true }
```

Kaikki vuosi-/päivämäärämaininnat (H1, meta, schema, FAQ, leipäteksti) johdetaan tästä. Yksi päivämäärävertailu: jos tämä päivä > endDate, näytetään huomautus "Seuraavan vuoden päivämäärät vahvistetaan keväällä" / "Next year's dates are confirmed in spring". Jos `confirmed: false`, näytetään "FIS vahvistaa päivät".

**SEO:** pyydetyt FI/EN title + description (vuosi konstantista), HreflangTags customUrls fi (x-default) + en, kanoninen per kieli.

**Structured data:** SportsEvent (nimi, start/end konstantista, sijainti Levi Black, Levi, Suomi) + BreadcrumbList + FAQPage.

**Sisältö molemmilla kielillä:** intro + varauslinkki, kisaviikonlopun ohjelma (pe avajaiset, la naisten pujottelu, su miesten pujottelu; tarkat kellonajat worldcuplevi.com), liput (Tiketti, VIP — ei hintoja), parhaat katselupaikat (maalialue/päakatsomo, Zero Point, Lapland Avenue, pukeutumisvinkki -15 °C), majoitus (Zero Point -huoneistot kävelymatkan päässä + toinen varauslinkki + /majoitukset), oheisohjelma ja after ski (+ ravintolaopas-linkki), FAQ (5 kysymystä).

**Kuvat:** `src/assets/worldcup/` — worldcup-levi-slalom.jpg, worldcup-levi-yleiso.jpg, worldcup-levi-maalialue.jpg, worldcup-levi-tunnelma.jpg; normaali import, kielikohtainen alt-teksti, `loading="lazy"`, sisältöleveä esitys.

**Read next:** laskettelu, marraskuu, ravintolat, majoitukset, miten pääsee Leville.

**Sitemap:** molemmat URLit `src/data/sitemapRoutes.ts`:iin (yhteinen `altGroup`), jolloin build-skripti generoi ne sitemapiin hreflang-vastineineen.

## Tekniset huomiot

- Ulkoiset linkit (worldcuplevi.com, Moder) `target="_blank" rel="noopener noreferrer"`, varauslinkeissä `data-booking-source`-attribuutti seurantaa varten.
- `lang` välitetään Footerille, PageCTA:lle, StickyBookingBarille ja WhatsAppChatille.
- Ei hintoja, ei uusia ravintolanimiä.
- Lopuksi type-check + tarkistus, ettei tiedostossa esiinny kovakoodattua vuosilukua konstantin ulkopuolella.
