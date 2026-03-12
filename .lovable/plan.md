

## Varausklikkausten erittely näkyviin

### Ongelma

Yhteenvetorivillä näkyy vain yksi "Varausklikkaukset"-kortti kokonaisluvulla. Eritelty Konversiot-osio näkyy alempana vain jos dataa on, ja sekin voi jäädä huomaamatta.

### Ratkaisu

Muutetaan yhteenvetokorttien rivi näyttämään jokainen klikkaustyyppi erikseen:

| Kortti | Selite |
|---|---|
| Yhteensä (sivukatselut) | Pysyy |
| Hakuwidget-haut | `/event/booking-search-widget` |
| Varaa tästä -palkki | `/event/booking-sticky-bar` |
| Sivun CTA-painike | `/event/booking-page-cta` |
| Muut varauslinkit | `/event/booking-link` |
| Mobiili / Tietokone / Tabletti | Pysyy |

Lisäksi Konversiot-osio näytetään aina (myös 0 klikkauksilla), jotta lähtösivut näkyvät heti kun dataa kertyy.

### Tiedostot

| Tiedosto | Muutos |
|---|---|
| `src/components/admin/PageViewsAdmin.tsx` | Eriteltyjen korttien lisäys, Konversiot-osion näyttö aina |

