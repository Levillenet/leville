## Tavoite

Analytiikka jo tallentaa app.moder.fi -klikkaukset (DB:ssä 148 `booking-link`-tapahtumaa viim. 30 vrk, mm. `/opas/kesa-levi` = 47). Ongelma on **näkyvyys**: admin-UI näyttää vain top 5 lähtösivua per tapahtuma ja CSV sisältää vain raakarivit ilman koottua varauslinkki-yhteenvetoa. Korjataan molemmat.

### Mitä tehdään

**1. `supabase/functions/get-page-view-stats/index.ts`**
- Nosta `topSources`-raja varaustapahtumille (`/event/booking-*`) **5 → 50** lähtösivua per tapahtumatyyppi. Muut tapahtumat (esim. `site-search`) pysyvät 5:ssä.
- Lisää JSON-vastaukseen uusi koottu kenttä `bookingClicksBySource`: lista muotoa `{ source, total, bySearchWidget, byStickyBar, byPageCta, byLink }`, järjestettynä `total`-laskevasti, kaikki varauslähteet mukana. Tämä on yksi taulukko jossa näkyy heti, miltä sivulta on klikattu mihinkin varauspolkuun.
- CSV-haaraan (`format === "csv"`) lisää nykyisten raakarivien JÄLKEEN tyhjä rivi + toinen lohko `BOOKING CLICKS BY SOURCE`:
  ```
  source_page,total,search_widget,sticky_bar,page_cta,other_link
  /opas/kesa-levi,47,12,2,0,33
  ...
  ```
  Kaikki lähtösivut, joilla ≥1 varausklikkaus, järjestettynä laskevasti.

**2. `src/components/admin/PageViewsAdmin.tsx`**
- Nykyinen "Konversiot — lähtösivut" -ruutu: näyttää nyt 5 → näytetään kaikki palautetut (max 50) per tapahtuma, scroll-bar `max-h`-rajalla.
- Lisää uusi kortti **"Varauslinkit lähtösivuittain"** (`bookingClicksBySource`): taulukko sarakkeilla *Lähtösivu · Yhteensä · Hakuwidget · Sticky-palkki · Sivun CTA · Muu linkki*. Tämä on käyttäjän pyytämä päänäkymä — koostaa yhdellä silmäyksellä, miltä sivulta varauksia tulee.
- Päivitä CSV-kuvausteksti (`copyDescription` / `CSV_DESCRIPTION`-blokki) mainitsemaan uusi `BOOKING CLICKS BY SOURCE` -lohko ja sen sarakkeet.

### Mitä EI muuteta

- Tracking-logiikka (`PageViewTracker.tsx`): `app.moder.fi`-linkit ja `.moder-bar__search-button` napataan jo globaalisti, ei tarvitse koskea. Tracker toimii oikein — todistuksena Levi-kesäsivun 47 klikkausta kannassa.
- Sticky bar / PageCTA / Header eivät edelleenkään lähetä omia event-tyyppejään; ne menevät `booking-link`-yleisluokkaan. Tämä on tietoinen valinta nykyisessä koodissa, eikä user pyydä muutosta.
- Iframe-pohjaisia widget-klikkauksia ei voi domista napata — ei tämän tehtävän laajuudessa.

### Lopputulos käyttäjälle

- Admin-näkymässä uusi "Varauslinkit lähtösivuittain" -taulukko näyttää suoraan että esim. `/opas/kesa-levi` on tuottanut 47 app.moder.fi -klikkausta, eriteltynä reittien mukaan.
- CSV-tiedostossa sama tieto omana lohkonaan analyysiä varten.
