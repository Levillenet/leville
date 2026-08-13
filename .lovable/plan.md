# Poistetaan käännöksettömät DE/SV/FR/ES/NL-reitit

Google merkitsee 79 sivua "Alternative page with proper canonical tag", koska nämä reitit näyttävät suomenkielistä sisältöä ja kanoninen URL osoittaa FI-versioon. Poistetaan reitit ja ohjataan vanhat osoitteet olemassa olevaan kieliversioon.

## Mitä tehdään

**1. App.tsx — 66 reittiä pois, tilalle uudelleenohjaus**

- 60 kuukausiopasta (DE `/de/ratgeber/levi-im-*`, ES `/es/guia/levi-en-*`, FR `/fr/guide/levi-en-*`, NL `/nl/gids/levi-in-*`, SV `/sv/guide/levi-i-*`) → ohjataan vastaavaan englanninkieliseen kuukausioppaaseen (esim. `/de/ratgeber/levi-im-januar` → `/guide/levi-in-january`).
- `/de`, `/sv`, `/fr`, `/es`, `/nl` → ohjataan `/en`.
- `/en/levi/faq` → ohjataan `/levi/ukk`.

Ohjaukset toteutetaan `<Navigate to="..." replace />` -reitteinä (Lovable-hostaus ei tue `_redirects`-tiedostoa), joten vanhat linkit ja hakutulokset eivät päädy 404-sivulle. FI- ja EN-reitit säilyvät koskemattomina.

**2. Sitemap — samat URLit pois**

Sitemap generoidaan nykyisin build-vaiheessa reittilistoista, joten poisto tehdään kaikista kolmesta paikasta:
- `src/data/sitemapRoutes.ts`
- `supabase/functions/_shared/sitemapRoutes.ts` (edge-funktion peili) + funktion uudelleenjulkaisu
- `public/sitemap.xml` regeneroidaan skriptillä, jolloin poistetut URLit katoavat myös sieltä

Samalla poistetaan näiden sivujen `altGroup`-hreflang-viittaukset, jotta sitemap ei enää viittaa poistettuihin osoitteisiin.

**3. Hreflang-tagit sivuilla**

Kuukausioppaan ja etusivun hreflang-listat rajataan FI/EN:ään näiden poistettujen kieliversioiden osalta, jotta sivut eivät ilmoita Googlelle vaihtoehtoja, joita ei enää ole. Tämä on pelkkä meta-tason muutos — sisältöä, komponenttien ulkoasua tai käännöksiä ei kosketa.

## Ei muuteta

- Yhtään sivutiedostoa tai sisältöä
- FI- tai EN-reittejä
- Muita kielireittejä (esim. DE/SV/FR/ES/NL aktiviteettisivut), jotka eivät ole listalla

## Tekniset yksityiskohdat

- Uudelleenohjaukset sijoitetaan App.tsx:n olemassa olevaan redirect-lohkoon, jotta reittilista pysyy selkeänä.
- Sitemapin validointiskripti vaatii ≥500 `<loc>`-riviä; poiston jälkeen määrä laskee n. 618 → n. 552, eli raja pysyy ylitettynä.
- Muutos näkyy Googlelle vasta julkaisun jälkeen.
