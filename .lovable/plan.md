
# Moottorikelkkailuopas – kaksi uutta sivua

Luodaan uusi moottorikelkkailuopas-sivu (FI + EN) ja lisataan reitit App.tsx:iin. Mitaan olemassa olevia sivuja ei muuteta.

## Luotavat tiedostot

### 1. `src/pages/guide/SnowmobileSafariLevi.tsx`

Uusi komponentti, joka sisaltaa molemmat kieliversiot (FI/EN) samassa tiedostossa `lang`-propilla, samalla tavalla kuin `SkiingInLevi.tsx` ja `SummerInLevi.tsx`.

Sivun rakenne noudattaa tarkalleen muiden opas-sivujen layoutia:
- `SubpageBackground`, `Header`, `Breadcrumbs` (Etusivu > Levi > Moottorikelkkailu Levilla)
- `HreflangTags` customUrls-propilla (FI/EN-pari)
- `Helmet` SEO-metatiedoilla, OG-tageilla ja JSON-LD-skeemoilla (Article, FAQPage, BreadcrumbList)
- Sisalto-osiot: Hero, Opastetut safarit (korttien gridi hintoineen), Vapaat reitit (lista), Kaytannon tietoa (korttien gridi), Vinkit (lista), Tokka Safaris -suositus (korostettu kortti), FAQ (Accordion, 4 kysymysta), Lue myos -linkitysosio, CTA-painikkeet
- `Footer`, `WhatsAppChat`, `StickyBookingBar`

Komponentit ja tyylit ovat samoja kuin muissa opas-sivuissa: `glass-card`, `border-border/30`, `text-primary`, Lucide-ikonit.

### 2. Muutokset tiedostoon `src/App.tsx`

Lisataan kaksi uutta Route-maarittelya:
- FI: `<Route path="/opas/moottorikelkkailu-levilla" element={<SnowmobileSafariLevi />} />`
- EN: `<Route path="/en/guide/snowmobile-safari-levi" element={<SnowmobileSafariLevi lang="en" />} />`

Nayma lisataan olemassa olevien SEO Landing Pages -lohkojen jalkeen (FI-reitit FI-lohkoon, EN-reitit EN-lohkoon). Lisataan myos import-rivi tiedoston alkuun.

## Sisaltotiivistys

**FI-sivu** sisaltaa: opastetut safarit (4 tyyppia hintoineen), vapaat reitit, kaytannon tietoa (ajokortti, ikaraja, pukeutuminen, vakuutus, turvallisuus), vinkit kelkkailijalle, Tokka Safaris -suositus, FAQ (4 kysymysta) ja "Lue myos" -linkit.

**EN-sivu** sisaltaa saman sisallon englanniksi.

Molemmat versiot linkittavat toisiinsa hreflang-tageilla. Sivuja ei lisata navigaatiovalikkoon (muutkaan opas-alasivut eivat nay siella).

## Muita tiedostoja EI muuteta

Ei muutoksia Header-, Footer-, tai muihin komponentteihin.
