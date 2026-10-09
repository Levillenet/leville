# LCP alle 2,5 s: seuraavat keinot

Rajaus: ei sisältö-, otsikko- eikä datamuutoksia. Nykyiset LCP-muutokset (hero-preload vain etusivulle, raskaat kirjastot pois käynnistyksestä, WhatsApp/haku/sää viivästetty, SubpageBackground, layout-chunk, getSupabase) ovat esikatselussa mutta julkaisematta. Julkaisu ensin: pelkkä hero-kuvan (130 KB) poisto kaikilta alasivuilta vapauttaa kaistaa.

## Mitä julkaistusta sivusta mitattiin (hidastettu mobiili, /opas/hinnat-levilla)

```text
0,7 s   HTML valmis
4,2 s   index + react-vendor + supabase + ui-vendor (192 KB) ladattu
4,5 s   sivun oma chunk + ~25 pientä chunkia haetaan (toinen kierros)
6,2 s   LCP = tekstikappale (ei kuva)
```

LCP on teksti, joten ratkaisevaa on, kuinka nopeasti React saa piirrettyä sivun. Jäljellä olevat viiveet: (1) toinen latauskierros sivukohtaisille chunkeille, (2) turhan suuri käynnistys-JS, (3) fontit kilpailevat JS:n kanssa kaistasta.

## Vaihe 1 – turvalliset toimet (ei sisältömuutoksia)

1. Sivukohtaiset preloadit (poistaa toisen latauskierroksen, arvio -0,8...-1,2 s)
   - Build-tuloste: `build.manifest: true`.
   - `scripts/generate-route-preloads.mjs` (ajetaan build-skriptissä generate-social-pagesin tapaan) lukee App.tsx:n reitit + manifestin ja kirjoittaa jokaiselle reitille `dist/<reitti>/index.html`, jossa on vain `<link rel="modulepreload">` kyseisen sivun chunkille ja sen riippuvuuksille (layout, translations, radix). `#root` pysyy tyhjänä (muistissa: staattinen shell aiheutti CLS-regression 0,727).
   - Varmistus: validate-routes.mjs STRICT, sitemap ei muutu, `_redirects` ei riko reittejä.
2. Kielikohtainen käännösbundle (arvio -40...-50 KB gzip käynnistyksessä)
   - `translations`-chunk (59 KB) sisältää kaikki kielet. Jaetaan kieli kerrallaan (fi/en/sv/de/…) dynaamisella importilla; ladataan vain sivun kieli. Ei tekstimuutoksia.
3. Kevyempi käynnistys
   - Toaster, Sonner ja TooltipProvider lataukseen idlessä/ensimmäisellä käytöllä, jotta Radix ei ole kriittisellä polulla kaikilla sivuilla.
   - Tarkistetaan, mitä `index`-chunkissa (48 KB) on, ja siirretään pois kaikki, mitä ensimmäinen piirto ei tarvitse.
4. Fontit
   - Poistetaan Cormorant Garamond -preload (koriste, 38 KB kilpailee JS:n kanssa); DM Sans -preload jää. `font-display: swap` jo käytössä.
5. Mittaus
   - Tuotantobuild, hidastettu mobiili (1,6 Mbps, 150 ms, CPU 4x): /, /opas/hinnat-levilla, /majoitukset, /opas/levi-vs-rovaniemi. Ennen/jälkeen-taulukko ja LCP-elementin tunnistus.

Odotus: lab-LCP putoaa nykyisestä noin 6 s:sta arviolta 3–3,5 s:iin; todellisilla käyttäjillä (nopeampi verkko kuin labrassa) kenttä-LCP voi mennä alle 2,5 s. GSC käyttää 28 päivän kenttädataa, joten "Validate fix" -tulos näkyy viiveellä.

## Vaihe 2 – jos kenttädata on vielä yli 2,5 s (vaatii päätöksen)

Hidasta mobiiliverkkoa vasten alle 2,5 s edellyttää, että sivun teksti tulee valmiina HTML:ssä eikä vasta JS:n jälkeen. SPA-rakenteella lattia on noin 3 s. Vaihtoehdot:
- Päivitys Lovablen uusimpaan pohjaan (TanStack Start, palvelinrenderöinti): sivun sisältö tulee HTML:ssä, LCP tyypillisesti 1–2 s. Tämä on pysyvin ratkaisu; [mitä päivitys tuo](https://lovable.dev/blog/building-apps-using-tanstack-start). Ehdotan tätä vasta vaiheen 1 mittausten jälkeen.
- Esirenderöity HTML `#root`:in sisään: ei suositella, aiempi CLS-regressio.

## Tekniset yksityiskohdat

- Muokattavat: vite.config.ts (manifest, translations-jako), package.json build-skripti, uusi scripts/generate-route-preloads.mjs, src/translations/index.ts (lazy-lataus kielen mukaan), src/App.tsx (Toaster/Sonner/Tooltip lazy), index.html (Cormorant-preload pois), roadmap.md.
- Ei kosketa: src/integrations/supabase/client.ts, sisältöjä, Moder-linkkejä, sitemapia.
- Riski: kielikohtainen lataus vaatii, että kaikki `t`-käyttäjät saavat kielen synkronisesti sivun renderöinnissä; tarkistetaan ennen jakoa, ja jos riski on suuri, jätetään kohta 2 pois.
