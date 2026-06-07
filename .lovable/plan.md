## Tilanne

Inline-linkit (esim. `summer_page_inline_intro/activities/hiking/footer`) kirjaavat klikit **kahteen paikkaan**:

1. **`promo_banner_clicks`-tauluun** `logPromoClick`-kutsulla, jossa `placement`-kenttä erottelee sijoittelut tarkasti.
2. **`page_views`-tauluun** `/event/booking-link`-tapahtumana (PageViewTracker:n globaali klikkikuuntelija nappaa kaikki `app.moder.fi`-linkit).

Nykyinen `get-page-view-stats`-CSV lukee vain `page_views`-taulua, joten inline-klikit putoavat siellä **"other_link"-sarakkeeseen** ilman omaa nimeä. Inline-linkkidata on kyllä tietokannassa `promo_banner_clicks`-taulussa, mutta **se ei näy CSV:ssä lainkaan** eikä Analytics-CSV erittele inline-sijoitteluja toisistaan.

## Tavoite

Lisää CSV:hen oma lohko, joka näyttää inline-linkkien (ja muiden promo-/banneriklikkien) klikkaukset sijoittelukohtaisesti ja merkitsee selkeästi, että nämä ovat inline-linkkejä.

## Muutokset

### 1) `supabase/functions/get-page-view-stats/index.ts`

CSV-haarassa (ennen vastauksen palautusta):
- Lue `promo_banner_clicks`-taulu samalta aikaväliltä (sama `since`).
- Aggregoi rivit kentällä `placement` + `language`, laske totaalit.
- Erota inline-linkit muista: rivit, joissa `placement LIKE '%_inline_%'` saavat `link_type = "inline"`, muut `link_type = "banner"`.
- Lisää CSV:n loppuun uusi lohko:

```
INLINE & PROMO BANNER -KLIKKAUKSET (promo_banner_clicks)
placement,link_type,total,fi,en,nl,sv,de,fr,es,target_url,last_click_at
summer_page_inline_intro,inline,42,30,10,2,...,https://app.moder.fi/levillenet,2026-06-07T12:00:00Z
summer_page_inline_footer,inline,18,...
summer_page,banner,55,...
```

- Lajittele `link_type` (inline ensin) ja sitten `total` desc.
- Päivitä CSV:n alkupään selitysteksti (rivit 80–160 PageViewsAdmin:ssa) kuvaamaan uutta lohkoa.

JSON-haarassa:
- Lisää `inlinePromoClicks: Array<{placement, link_type, total, by_language, target_url, last_click_at}>` vastaukseen, jotta admin-UI saa saman datan.

### 2) `src/components/admin/PageViewsAdmin.tsx`

- Päivitä CSV-kuvausteksti mainitsemaan uusi "INLINE & PROMO BANNER -KLIKKAUKSET" -lohko ja että inline-linkit erottuvat `link_type=inline`.
- Lisää uusi kortti "Inline-linkkien klikkaukset" taulukolla: `Sijoittelu | Tyyppi | Yhteensä | Kielet`.
- Säilytä nykyinen "Varauslinkit lähtösivuittain" -taulu (näyttää yhä `page_views`-pohjaisen kokonaiskuvan).

## Tekniset huomiot

- `promo_banner_clicks`-taulu on jo olemassa ja sinne kirjautuu dataa. RLS-policyt eivät vaikuta, koska edge-funktio käyttää `service_role`-avainta.
- Sama klikki voi näkyä molemmissa tauluissa (sekä `page_views/event/booking-link` että `promo_banner_clicks`) — tämä on tarkoituksellista: page_views kertoo "mistä lähtösivulta" ja promo_banner_clicks kertoo "minkä sijoittelun kautta". CSV-kuvauksessa mainitaan tämä.
- Ei muutoksia tracking-koodiin (`logPromoClick`, `PageViewTracker`) — data on jo tallessa.

## Out of scope

- Inline-linkkien lisääminen muille sivuille.
- Promo_banner_clicks-taulun skeemamuutokset.
