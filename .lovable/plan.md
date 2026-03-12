

## Poista evästesuostumusbanneri ja GA4/Clarity-seuranta

Sivuston oma analytiikka (page_views-taulu) toimii ilman GA4:ää. Poistetaan kaikki Google Analytics-, Microsoft Clarity- ja evästesuostumuskomponentit.

### Muutokset

| Tiedosto | Muutos |
|---|---|
| `src/App.tsx` | Poista `CookieConsent`-import ja `<CookieConsent />` |
| `src/components/CookieConsent.tsx` | Poista koko tiedosto |
| `index.html` | Poista rivit 13–29 (GA4 outbound click listener + kommentit) |
| `src/components/ModerBookingWidget.tsx` | Poista `showLoadingOverlay`-funktion GA4 gtag-kutsu (jos sellainen on lisätty) |

### Mitä säilyy

- `PageViewTracker` ja `page_views`-taulu — oma analytiikka jatkaa toimintaansa normaalisti
- Konversioseuranta (booking-tapahtumat) — tallentuu edelleen tietokantaan
- CSV-vienti ja admin-näkymän analytiikka — ei muutoksia

### Huomioita

- `localStorage`-avain `cookie_consent` jää vanhoille kävijöille mutta ei haittaa
- GA4-property (G-6BR1JFF2Q8) ja Clarity (utrphfjqd1) eivät enää saa dataa

