## Korjaa buildivirheet + aja SEO review

### 1. Laajenna MajoitusCallout `Lang`-tyyppi
`src/components/MajoitusCallout.tsx` hyväksyy vain `"fi" | "en"`, mutta sivut välittävät `Language`-tyypin (fi/en/sv/de/es/fr/nl). Tämä aiheuttaa 23 TS2322-virhettä.

Korjaus: laajennetaan `Lang` kattamaan kaikki 7 kieltä. COPY-mapissa vain fi ja en käännökset – muut kielet fallbackataan englantiin (käytännössä yleisin valinta ulkomaisille kävijöille, ja kohderyhmien hreflang on jo paikoillaan).

```ts
type Lang = "fi" | "en" | "sv" | "de" | "es" | "fr" | "nl";
// resolver
const t = COPY[lang === "fi" ? "fi" : "en"];
const primaryHref = href ?? (lang === "fi" ? "/majoitukset" : lang === "en" ? "/en/accommodations" : ...);
```

Käytetään olemassa olevia per-kielen reittejä `/sv/boende`, `/de/unterkuenfte`, `/es/alojamientos`, `/fr/hebergements`, `/nl/accommodaties` primary-CTA:n kohteena, jotta kävijä päätyy oman kielen majoitussivulle.

### 2. Korjaa `ChristmasDinnerLeviFI.tsx` puuttuva `lang`
TS2304: `lang` ei ole määritelty (sivu on Finnish-only). Poistetaan `lang={lang}`-propi – komponentti defaultaa fi:hen.

### 3. SEO review
Kun buildi on puhdas, listataan olemassaolevat findingit ja käynnistetään uusi skannaus.

### Tekniset yksityiskohdat
- `MajoitusCallout.tsx`: laajennetaan `Lang`-union, lisätään primaryHref-mappi 7 kielelle, COPY pidetään fi/en
- `ChristmasDinnerLeviFI.tsx`: muutetaan `<MajoitusCallout lang={lang} />` → `<MajoitusCallout />`
- Ei muutoksia 23 muuhun sivuun – ne lähettävät Languagen, joka nyt validi

### Vahvistus
OK aloittaa? Skannaus vie n. 1 minuutin ja vaatii käyttäjän hyväksynnän.
