# Google Ads -seurantatunnisteet varauslinkkeihin (ilman evästeitä)

Ei teksti-, otsikko- tai datamuutoksia. Ei evästeitä, localStoragea eikä sessionStoragea.

## Tarkistus (tehty)
- PageViewTracker: app.moder.fi-klikkien käsittelijä capture-vaiheessa — sopii ohjeeseen.
- Interaktiivinen kartta avaa varauksen `window.open`-kutsulla — katetaan window.open-paikkauksella.
- ModerBookingWidget / PropertyBookingWidget lataavat Moderin oman upotuskoodin; siirtyminen tapahtuu Moderin koodin sisällä. Moderin koodia ei muuteta. Jos haku-painike siirtyy `window.location`-ohjauksella, siitä raportoidaan erikseen eikä sitä kierretä.

## Toteutus
1. Uusi `src/lib/adClickParams.ts`: lukee osoitteen kerran (gclid, gbraid, wbraid, utm_source/medium/campaign/term/content), pitää ne vain muistissa; `getAdParams()`, `appendAdParams(url)` (vain app.moder.fi, ei ylikirjoita olemassa olevia, säilyttää muut parametrit ja #hashin), `installWindowOpenPatch()`.
2. `src/main.tsx`: import heti ensimmäiseksi + `installWindowOpenPatch()`.
3. `PageViewTracker.tsx`: ennen trackConversionia `anchor.href = appendAdParams(anchor.href)` kun parametreja on. Seurantalogiikka ja tapahtumanimet ennallaan.
4. Testi `scripts/adClickParams.test.ts`: lisäys, ei ylikirjoitusta, muut domainit ja tyhjät parametrit tavu tavulta ennallaan.

## Varmistus
- Playwright: /en/accommodations?gclid=TEST123&utm_source=google&utm_campaign=uk → sisäinen siirtymä → varauslinkki sisältää parametrit + alkuperäiset.
- Ilman parametreja linkit ennallaan.
- Evästeet ja storage-avaimet ennen/jälkeen: ei uusia.
- Lista muutetuista tiedostoista.
