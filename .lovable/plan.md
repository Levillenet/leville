

# Promobannerin kehitys: kohde-URL pudotusvalikko, kieliversio-ohjaus ja automaattikäännökset

## Yhteenveto
Korvataan vapaamuotoinen kohde-URL-kenttä pudotusvalikolla joka listaa sivut routeConfigista. Lisätään valinta ohjataanko käyttäjä kielen mukaiseen URL-versioon. Lisätään "Käännä automaattisesti" -nappi joka kääntää suomenkieliset tekstit kaikille kielille AI:lla.

## Muutokset

### 1. PromoBannerAdmin.tsx — Kohde-URL pudotusvalikko + kieliohjaus
- Korvataan `target_url` Input-kenttä Select-pudotusvalikolla joka listaa routeConfigin sivut (näytetään FI-polku + selkokielinen nimi)
- Lisätään `redirect_localized` (boolean) -toggle: "Ohjaa kieliversioon" — kun päällä, bannerin linkki ohjaa käyttäjän kielen mukaiseen URL:iin routeConfigin avulla
- Lisätään "Käännä suomesta" -nappi joka kutsuu uutta edge function -käännöstoimintoa ja täyttää heading/subtext/button_text kaikille kielille automaattisesti

### 2. Tietokantamuutos: `promo_banners`-tauluun 2 uutta saraketta
- `route_key` (text, nullable) — routeConfig-avain (esim. "skiing", "vappuLevilla")
- `redirect_localized` (boolean, default true) — ohjataanko kielen mukaiseen versioon

### 3. Edge Function: `manage-promo-banners` — lisätään `translate`-action
- Uusi action `translate`: ottaa heading_fi, subtext_fi, button_text_fi → kutsuu Lovable AI Gatewayta (Gemini 2.5 Flash) → palauttaa käännökset EN, DE, SV, FR, ES, NL
- Käyttää samaa patternea kuin `translate-booking-terms`

### 4. usePromoBanner.ts — kieliversio-URL:n ratkaisu
- Jos `redirect_localized` on true ja `route_key` on asetettu, käytetään routeConfigia palauttamaan oikea URL käyttäjän kielen perusteella
- Fallback: `target_url` sellaisenaan

### 5. PromoBanner.tsx — käytetään lokalisoitua URL:ia
- Luetaan `route_key` ja `redirect_localized` bannerista
- Jos lokalisointi päällä, haetaan routeConfigista kielen mukainen polku

### 6. routeConfig — lisätään puuttuva `vappuLevilla`-avain
- `vappuLevilla: { fi: "/opas/vappu-levilla" }` (vain FI toistaiseksi)

### 7. PromoBanner näkyviin kaikille kieliversioiden etusivuille
- Lisätään `<PromoBanner lang="en" />` tiedostoon `src/pages/en/Index.tsx` (ja vastaavasti muille kielille jos niillä on omat Index-sivut)

## Tekninen yksityiskohta: sivulista adminissa

Generoidaan PAGE_OPTIONS-lista routeConfigista automaattisesti:
```typescript
const PAGE_OPTIONS = Object.entries(routeConfig).map(([key, routes]) => ({
  key,
  label: routes.fi, // näytetään FI-polku
  langs: Object.keys(routes).filter(l => !routes[l].startsWith(routes.fi)) // kielet joilla oma versio
}));
```

Adminissa näytetään pudotusvalikossa esim.:
- `/opas/laskettelu-levi` (fi, en, sv, de, es, fr, nl)
- `/opas/vappu-levilla` (fi)
- `/majoitukset` (fi, en, sv, de, es, fr, nl)

## Käännöstoiminnon flow
```text
Admin kirjoittaa suomeksi heading, subtext, button_text
  → Painaa "Käännä suomesta"
  → Frontend kutsuu manage-promo-banners { action: "translate", ... }
  → Edge function kutsuu Lovable AI Gateway
  → Palauttaa JSON: { en: {...}, de: {...}, ... }
  → Frontend täyttää kentät automaattisesti
  → Admin voi muokata ja tallentaa
```

