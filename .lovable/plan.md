# Suunnitelma: lisää `lang`-prop komponenttitaggeihin

## Tavoite
Lisätä `lang`-prop komponenteille, jotka renderöivät suomenkielisen UI:n ilman propia. Tämä varmistaa, että alatunnisteet (`Footer`), varauspalkki (`StickyBookingBar`), WhatsApp-widget ja CTA (`PageCTA`) käyttävät oikeaa kieltä.

## Muutokset
Muutetaan vain listattuja komponenttitaggeja. Ei kosketa teksteihin, otsikkoihin, käännöksiin, layoutiin, tyylihin eikä komponenttilogiikkaan.

### Tiedostot, joissa `lang`-muuttuja on olemassa
| Tiedosto | Muuttuja | Rivi | Muutos |
|---|---|---|---|
| `src/pages/opas/VappuLevilla.tsx` | `const lang = "fi";` (rivi 284) | 741 | `<WhatsAppChat />` → `<WhatsAppChat lang={lang} />` |

### Tiedostot, joissa ei ole `lang`-propia scopessa — käytetään literaalia `lang="fi"`
| Tiedosto | Rivit | Muutokset |
|---|---|---|
| `src/pages/opas/MajoitusLevilla.tsx` | 392–395 | `<PageCTA />` → `<PageCTA lang="fi" />`, `<Footer />` → `<Footer lang="fi" />`, `<WhatsAppChat />` → `<WhatsAppChat lang="fi" />`, `<StickyBookingBar />` → `<StickyBookingBar lang="fi" />` |
| `src/pages/opas/LeviVsRovaniemi.tsx` | 547–549 | `<Footer />` → `<Footer lang="fi" />`, `<WhatsAppChat />` → `<WhatsAppChat lang="fi" />`, `<StickyBookingBar />` → `<StickyBookingBar lang="fi" />` |
| `src/pages/opas/LeviVsSaariselka.tsx` | 444–446 | `<Footer />` → `<Footer lang="fi" />`, `<WhatsAppChat />` → `<WhatsAppChat lang="fi" />`, `<StickyBookingBar />` → `<StickyBookingBar lang="fi" />` |
| `src/pages/opas/SaunaLevilla.tsx` | 447–449 | `<Footer />` → `<Footer lang="fi" />`, `<WhatsAppChat />` → `<WhatsAppChat lang="fi" />`, `<StickyBookingBar />` → `<StickyBookingBar lang="fi" />` |
| `src/pages/guide/LeviVsYllasVsRuka.tsx` | 480–482 | `<Footer />` → `<Footer lang="fi" />`, `<WhatsAppChat />` → `<WhatsAppChat lang="fi" />`, `<StickyBookingBar />` → `<StickyBookingBar lang="fi" />` |
| `src/pages/guide/LeviInteractiveMap.tsx` | 533 | `<Footer />` → `<Footer lang="fi" />` |
| `src/pages/StreetHub.tsx` | 219 | `<Footer />` → `<Footer lang="fi" />` |

## Huomio scopessa olevasta kielestä
Vain `VappuLevilla.tsx`:ssä on `lang`-muuttuja scopessa (`const lang = "fi";`). Muissa tiedostoissa komponentti ei ota `lang`-propia, joten lisätään literaali `lang="fi"`.

## Validointi
- Ajoitan TypeScript-tarkistuksen (`tsgo`) ja tuotantobuildin.
- Tarkistan, että muutetut sivut renderöityvät ilman virheitä.
