# Levin alueet -opassivu (vaihe 1/2)

Uusi suomenkielinen opassivu, joka esittelee Levin 14 majoitusaluetta korttimuodossa: etäisyys keskustaan, liikkumistapa, majoituskanta ja kenelle alue sopii. Vaiheessa 1 tehdään vain runko ja aluekortit — vertailutaulukko, FAQ ja Read Next tulevat vaiheessa 2.

## Mitä syntyy

**Uusi tiedosto:** `src/pages/opas/LeviAreasGuide.tsx`

Sivun rakenne järjestyksessä:

```text
SeoMeta → HreflangTags → JsonLd → Header → SubpageBackground → Breadcrumbs
→ <main>
     H1: Levin alueet – missä kannattaa majoittua?
     Johdantokappale (~120 sanaa)
     H2: Miksi keskusta voittaa lähes aina (~200 sanaa + varauslinkki)
     H2: Levin alueet yksitellen → 14 aluekorttia
   </main>
→ PageCTA → Footer → WhatsAppChat → StickyBookingBar
```

Komponentti ottaa propin `{ lang = "fi" }: { lang?: Language }` ja välittää `lang`-arvon Footerille, PageCTA:lle, StickyBookingBarille ja WhatsAppChatille — nämä kaikki tukevat jo `lang`-propia.

**Muokataan:** `src/App.tsx` — lisätään lazy-import ja reitti `/opas/levin-alueet` samalla tavalla kuin muut `/opas/*`-sivut (esim. `SaunaLevilla`).

## Aluedata

Alueet tallennetaan tyypitettynä `Area[]`-taulukkona tiedoston alkuun (slug, nimi, etäisyys, liikkuminen, majoituskanta, kenelle sopii, kuvaus, karttahaku, korostus). Järjestys ja sisältö tulevat annetusta datasta sellaisenaan:

Keskusta (korostettu) · Eturinteet · Kelorakka · Rakkavaara · Isorakka ja Keskirakka · Etelärinne/South Point · Länsirinne/West Point · Immeljärvi · Utsuvaara · Kätkä ja Kätkäjärvi · Levi Golf · Taalo · Köngäs · Levin huippu.

Jokainen kortti näyttää: H3-otsikon, ikonirivin (etäisyys MapPin-ikonilla + liikkuminen Footprints/Car/Bus-ikonilla sen mukaan onko alueella kävelymatka, skibussi vai auto), kuvauskappaleen, kaksi pientä laatikkoa ("Majoituskanta" ja "Sopii parhaiten") sekä alalaidan linkin "Näytä kartalla" Google Mapsiin. Keskustan kortti saa korostetun reunuksen, eri taustan ja "Suositelluin"-merkin Star-ikonilla.

## Tekniset yksityiskohdat

- **SEO:** title "Levin alueet – missä kannattaa majoittua? | Leville.net", kuvaus alueiden vertailusta, canonical `https://leville.net/opas/levin-alueet`.
- **HreflangTags:** vain `fi` ja `x-default`, molemmat samaan FI-URLiin (`customUrls`-propilla, jolloin muita kieliä ei tulosteta).
- **JsonLd:** Article (headline "Levin alueet ja mökkialueet", author Organization "Leville.net", inLanguage "fi", about Place "Levi, Kittilä, Finland") + BreadcrumbList.
- **Breadcrumbs:** Etusivu › Opas › Levin alueet, annetaan `items`-propina.
- **Ikonit:** MapPin, Footprints, Car, Bus, Home, Mountain, Waves, Snowflake, ExternalLink, Star lucide-reactista.
- **Ulkoiset linkit:** kaikki `app.moder.fi/levillenet`- ja Google Maps -linkit `target="_blank" rel="noopener noreferrer"`.
- **Tyylit:** Tailwind, mobile-first, olemassa olevat semanttiset värit (ei kovakoodattuja värejä).

Sivulle ei tule hintoja eikä sää-/lumitilannesisältöä.

## Ei tässä vaiheessa

Vertailutaulukko, FAQ-osio ja ReadNextSection jäävät vaiheeseen 2. Sivua ei lisätä vielä sitemapiin, hakuindeksiin eikä oppaan navigaatioon — ne kannattaa tehdä samalla kun sisältö on valmis.
