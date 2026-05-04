## Tavoite
Luoda uusi opassivu **"Autolla ajaminen Lapissa — talvivinkit"** ja näyttää se kortina Matkaopas-hubin "Perillä Levillä" -kategoriassa.

## Reitti & sivu
- Uusi tiedosto: `src/pages/guide/DrivingInLapland.tsx` (vain FI tässä vaiheessa, kuten muut "perillä Levillä" -oppaat)
- Reitti `App.tsx`: `<Route path="/opas/autolla-ajaminen-lapissa" element={<DrivingInLapland />} />` (lazy import)
- Lisätään sitemap.xml: vain FI-URL (ei hreflangia, koska ei käännetä)
- Lisätään `searchIndex.ts`-merkintä

## Sisältö (FI, käytännönläheinen, paikallisten tieto)
H1: "Autolla ajaminen Lapissa — talvivinkit ja turvallisuus {vuosi}"

Osiot (jump-nav stickyllä):
1. **Tien kunto talvella** — lumi, polanne, mustajää, valaistuksettomat tiet
2. **Renkaat ja varusteet** — talvirengaspakko (1.11.–31.3.), nastat suositus, lumiketjut harvoin tarvitaan
3. **Porot ja muut eläimet tiellä** — yleisin onnettomuussyy: poroja kymmeniä tuhansia. Hidasta hämärässä, ilmoitusvelvollisuus 112 jos osuu
4. **Pakkasvinkit autolle** — lohkolämmitin (käyttöaika), sisätilanlämmitin, polttoaineen jäätyminen (talvidiesel/bensa), akku
5. **Etäisyydet & ajoajat Levillä** — Kittilä→Levi 15 min, Rovaniemi→Levi 2 h, Helsinki→Levi 12+ h, tankkausvälit
6. **Hätätilanteet** — 112, päivystys, pelastuslaitos, tieinfo (Fintraffic 0200 2100)
7. **Vuokra-auton vinkit** — Kittilän lentoasema, talvirenkaat sisältyvät, lisävakuutus poro-kolarille
8. **FAQ** — 5–6 kysymystä (FAQPage JSON-LD): "Tarvitsenko nelivetoa?", "Kannattaako vuokrata auto Leville?", "Mitä teen jos osun poroon?", "Voinko ajaa pakkasella ilman lohkolämmitintä?", "Onko teillä lumiketjupakko?"

## Komponentit (uusiokäyttö)
- `Header`, `Footer`, `Breadcrumbs`, `JsonLd`, `HreflangTags` (vain `fi` + `x-default`), `ReadNextSection`, `GuideDisclaimer`, `WhatsAppChat`, `StickyBookingBar`
- Lucide-ikonit: `Car`, `Snowflake`, `AlertTriangle`, `Phone`, `MapPin`, `Fuel`
- JSON-LD: `Article` + `FAQPage` + `BreadcrumbList`

## Meta
- Title: `` `Autolla ajaminen Lapissa ${new Date().getFullYear()} — talvivinkit & turvallisuus` ``
- Description: "Talvirenkaat, porot tiellä, lohkolämmitin ja etäisyydet — käytännön opas autoiluun Lapissa ja Leville. Paikallisten vinkit pakkasajoon."
- Canonical: `https://leville.net/opas/autolla-ajaminen-lapissa`

## Kortti Matkaopas-hubiin
`src/data/travelHubContent.ts` — lisätään uusi guide `onsite.guides`-listaan (FI):
```ts
{ id: "driving-lapland", title: "Autolla ajaminen Lapissa", description: "Talvirenkaat, porot tiellä, pakkasvinkit ja etäisyydet — turvallinen autoilu Lapissa.", href: "/opas/autolla-ajaminen-lapissa", iconKey: "car" }
```
- `TravelHub.tsx`: importoidaan `Car` lucidesta ja lisätään `iconMap`-mappaukseen `car: Car`

## Read Next -linkit uudella sivulla
- `/matka/miten-paasee-leville-helsingista` (Miten pääset Leville)
- `/opas/liikkuminen-levilla` (Liikkuminen Levillä)
- `/opas/levi-ilman-autoa` (vaihtoehtoinen näkökulma)
- `/opas/talvivarusteet-leville` (Pukeutuminen)
- `/levi/saatieto-levilta` (Sää)
- `/opas/paivaretket-levilla` (Päiväretket — tarvitsee autoa)

## Rajaus
- Vain suomi tässä vaiheessa (kuten muut paikalliset onsite-oppaat). Ei ghost-URLeja sitemappiin.
- Ei muuteta olemassa olevaa sisältöä; vain uusi sivu + yksi kortti hubiin + ikonimappaus + reitti + sitemap + searchIndex.

## Muutetut tiedostot
- **Uusi:** `src/pages/guide/DrivingInLapland.tsx`
- **Muokattu:** `src/App.tsx`, `src/data/travelHubContent.ts`, `src/pages/guide/TravelHub.tsx`, `public/sitemap.xml`, `src/data/searchIndex.ts`