

# GA4-tapahtumaseuranta majoitushauille

## Muutos

Lisataan yksi GA4-tapahtuman lahetys `src/components/ModerBookingWidget.tsx` -tiedostoon.

## Toteutus

Tiedosto: `src/components/ModerBookingWidget.tsx`

`showLoadingOverlay`-funktion alkuun lisataan:

```typescript
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'accommodation_search', {
    event_category: 'booking',
    event_label: lang,
    page_location: window.location.pathname,
  });
}
```

Tama lahettaa `accommodation_search`-tapahtuman GA4:aan joka kerta kun kayttaja klikkaa hakupainiketta.

## Missa naet tulokset

Google Analytics 4 -hallintapaneelissa (analytics.google.com):
- **Reaaliaikainen testaus:** Reports > Realtime
- **Historiatiedot:** Reports > Engagement > Events > `accommodation_search`

## Ei muita muutoksia
- Ei uusia riippuvuuksia
- GA4-skripti on jo ladattu index.html:ssa
- Yksi tiedosto muuttuu, yksi rivi lisataan

