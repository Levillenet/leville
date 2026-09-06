# Julkaisun jälkeinen mittaus ja seuraava hidaste

## Mitä juuri tapahtui

- Julkaisu meni läpi. Tuore HTML (kun pyydetään `?nocache=1`) sisältää nyt itse hostatut fontit ja hero-kuvan esilatauksen, eikä Google Fontsia ole enää.
- Mittasin julkaistun `https://leville.net/` mobiililla Playwrightilla (3 ajoa):

| Mittari | Ennen (kenttädata) | Julkaisun jälkeen (labra) |
|---|---|---|
| LCP | 5,2 s | 2,2–2,8 s (mediaani ~2,8 s) |
| FCP | 5,0 s | 2,2–2,8 s |
| CLS | 0,06 | 0,063 |
| TBT | – | ~435 ms |
| Pyyntöjä | – | 67 |
| Siirretty data | – | 2,58 Mt |

Ero on selvä: LCP putosi noin 5,2 s → 2,8 s. Mutta tavoite (alle 2,5 s, mieluiten kilpailijan 1,8 s) ei vielä täyty.

## Miksi LCP ei vielä riitä

LCP-elementti ei olekaan hero-kuva, vaan etusivun pääotsikko (`H1`), joka käyttää `Cormorant Garamond` -fonttia. Otsikolla on `animate-slide-up`-animaatio, joka alkaa `opacity: 0`. Selain ei siis merkitse tekstiä "näkyväksi" ennen kuin 0,8 s animaatio on valmis. Tämä selittää, miksi FCP ja LCP osuvat lähes samaan aikaan (~2 s) eikä kuvan optimointi auttanut enempää.

TTFB itse asiassa putosi hyväksi: ~326 ms (kenttädata 1,6 s oli vanhaa). Eli palvelinvaste ei ole enää pullonkaula.

## Mitä tehdään seuraavaksi

1. **Poista LCP-elementin piilotus.** Muutetaan hero-otsikon animaatio niin, että teksti on näkyvissä heti sivun avautuessa. Animaatio voi liikkua ylöspäin, mutta `opacity` ei saa alkaa nollasta. Vaihtoehtoisesti lisätään `prefers-reduced-motion`-tuki, joka poistaa animaation kokonaan.
2. **Julkaistaan korjaus ja mitataan uudelleen.** Tavoite: LCP ja FCP erkanevat — FCP alle 1 s ja LCP alle 1,5 s.
3. **Jos tavoite ei vielä täyty, tutkitaan CSS-koon purkamista.** Renderöitävä CSS on 154 kt, mikä voi hidastaa ensimmäistä maalausta. Tämä on seuraava epäilty, mutta sitä ei koske ennen kuin otsikon piilotus on korjattu.
4. **Kenttädatan päivitys.** Kerrotaan selvästi, että Googlen CrUX-luvut päivittyvät vasta 2–4 viikossa, joten PageSpeedin "Hyväksytty"-merkintä tulee viiveellä vaikka labramittarit olisivat jo kunnossa.

## Tekniset yksityiskohdat
- Muokattava: `src/components/Hero.tsx` — hero-otsikon animaatio (tai `src/index.css` `.animate-slide-up` / `@keyframes slideUp`).
- Mittaus: sama Playwright-ajo (mobiili 390×844, 3 toistoa, networkidle + 3 s odotus).
- Ei muutoksia sisältöön, hintoihin eikä varauslogiikkaan.
