## Plan: Expand `JouluLapissa.tsx` into a comprehensive Christmas guide (FI + EN)

Modify `src/pages/JouluLapissa.tsx` only. Keep DE/SV/FR/ES/NL translations, shared components (Header, Footer, Breadcrumbs, SubpageBackground, HreflangTags, PageCTA, StickyBookingBar, WhatsAppChat, ReadNextSection, GuideDisclaimer), the hero, Santa image, dinner-guide card, existing experiences grid, why/tips/CTA and read-next sections intact.

### 1. Meta (FI + EN)
- FI title: `Joulu Levillä 2026 – Tapahtumat, illalliset ja joulumajoitus`
- FI desc: `Täydellinen opas jouluun Levillä: joulumarkkinat, jouluillalliset, Joulupukin mökki, rinteet, revontulet ja joulumajoitus. Varaa ajoissa!`
- EN title: `Christmas in Levi 2026 – Events, Dinners & Holiday Guide`
- EN desc: `Complete guide to Christmas in Levi, Finnish Lapland: Christmas market, dinners, Santa Claus, slopes, northern lights and holiday accommodation.`
- Update H1 (FI): `Joulu Levillä – Täydellinen opas Lapin jouluun` (EN: `Christmas in Levi – The Complete Guide to Lapland Christmas`). H1 stays evergreen (no year).

### 2. Structured data (in existing `<Helmet>` JSON-LD block)
Emit an array with three schemas:
- Existing `TouristDestination`
- `Event` — name "Joulu Levillä 2026" (EN: "Christmas in Levi 2026"), startDate `2026-12-20`, endDate `2026-12-27`, location = Levi, Sirkka FI, url = canonical
- `FAQPage` built from the new FAQ Q/A pairs (FI/EN respectively)

### 3. New content sections (FI + EN parity)
Insert a new `longContent` field in the `fi` and `en` translation objects containing all prose plus FAQ array, then render it as a new block placed between the existing "Tips" section and the "CTA" section (so hero/experiences/why remain untouched at top).

Sections rendered with Tailwind (`prose`-like typography using existing `text-foreground`, `text-muted-foreground`, `Card`, section spacing consistent with the file) and a Lucide icon next to each H2:
1. Intro paragraph (added below existing intro on hero)
2. `Levin joulumarkkinat` — `Calendar` icon, external link to `levi.fi/tapahtumat/`
3. `Jouluillalliset ja joulupöytä` — `Utensils` icon; internal link to `/opas/ravintolat-ja-palvelut-levilla`; external `levi.fi` restaurants link; **contextual booking link #1** to `https://app.moder.fi/levillenet`
4. `Joulupukki Levillä – Tonttulan elämyskylä` — `Gift` icon; bullet list; external `elvesvillage.fi`; internal `/opas/joulupukki-levilla`
5. `Joulurinteet ja talviurheilu` — `Mountain` icon; external `levi.fi/rinteet-ja-ladut/` + `levi.skiperformance.com`; internal `/opas/hiihtoladut-levi`, `/opas/laskettelu-levi`
6. `Revontulet jouluaikaan` — `Sparkles` icon; internal `/revontulet`, `/opas/revontuliennuste-levi`
7. `Joulusauna ja wellness` — `Home` icon; bullet list; internal `/opas/sauna-levilla`; **contextual booking link #2**
8. `Joulurauhan julistus` — `Music` icon; short paragraph
9. `Käytännön vinkit joululomalle Levillä` — `Thermometer` icon; internal links `/opas/talvipukeutuminen-lappi`, `/opas/miten-paasee-leville`, `/opas/hinnat-levilla`; **contextual booking link #3**
10. `Usein kysytyt kysymykset joulusta Levillä` — `Star` icon; 6-question FAQ (also feeds FAQPage JSON-LD)

All `app.moder.fi` and `levi.fi`/`elvesvillage.fi`/`skiperformance.com` links use `target="_blank" rel="noopener noreferrer"`. Internal links use `<Link>` from react-router.

### 4. Read-next (FI)
Update the FI `readNextData` links per spec (Revontulet, Laskettelu, Hiihtoladut, Joulupukki, Ravintolat, Sauna, Talvipukeutuminen, Hinnat, Miten pääsee, Joulukuu Levillä). EN read-next kept as-is (already covers most of the equivalents).

### 5. Icon imports
Add missing Lucide icons to the existing import: `Utensils`, `Mountain`, `Music`, `MapPin`, `Calendar`, `Users`, `Thermometer`, `Home` (Gift/Star/TreePine/Sparkles already imported).

### Out of scope
- No changes to DE/SV/FR/ES/NL translations, routing, sitemap, or any other file.
- No new images. No price/date/menu specifics beyond what the brief allows.
- No restructuring of hero, experiences grid, why/tips/CTA blocks.

### Technical notes
- The new long-form content lives inside `translations.fi.longContent` / `translations.en.longContent` as a typed object (sections: [{id, icon, heading, paragraphs, bullets?, links?}], faq: [{q, a}]) so JSON-LD generation and rendering share one source.
- FAQPage schema is emitted only when `t.longContent.faq` exists (so DE/SV/FR/ES/NL stay unchanged and don't break).
- Event schema always renders (dates are evergreen for 2026 season per brief).