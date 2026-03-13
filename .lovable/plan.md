

## Konversioklikkausten debounce

### Ongelma
Hakuwidgetin klikkaus laukaisee `trackEvent`-kutsun joka kerta ilman rajoitusta — sama käyttäjä voi tuottaa kymmeniä duplikaatteja.

### Ratkaisu
Lisätään `PageViewTracker.tsx`:iin yksinkertainen debounce-mekanismi konversiotapahtumille (ei sivukatseluille):

- `lastEventRef` tallentaa viimeisimmän konversiotapahtuman polun + aikaleiman
- Jos sama event-polku on laukaistu alle 3 sekuntia sitten, ohitetaan
- Koskee kaikkia `/event/`-alkuisia tapahtumia (search-widget, sticky-bar, page-cta, booking-link)

### Tiedosto

| Tiedosto | Muutos |
|---|---|
| `src/components/PageViewTracker.tsx` | Lisää `lastEventRef` + 3s debounce `trackEvent`-kutsuihin click-handlerissa |

