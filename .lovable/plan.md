

# Ajankohtaiset ilmoitukset — admin-hallittava järjestelmä

## Yhteenveto
Luodaan tietokantapohjainen järjestelmä ajastettujen ilmoitusten hallintaan. Admin-paneelissa voi luoda ilmoituksia, valita kohdesivut ja asettaa ajanjakson. Ilmoitukset näkyvät ja poistuvat automaattisesti päivämäärien perusteella.

## Tietokantamuutokset

### Uusi taulu: `timed_notices`
| Sarake | Tyyppi | Kuvaus |
|--------|--------|--------|
| id | uuid | PK |
| title | text | Admin-tunniste (esim. "Rinteet auki toukokuulle") |
| content_fi | text | Ilmoitusteksti suomeksi |
| content_en | text | Englanniksi |
| content_de | text | Saksaksi |
| content_sv | text | Ruotsiksi |
| content_fr | text | Ranskaksi |
| content_es | text | Espanjaksi |
| content_nl | text | Hollanniksi |
| target_pages | text[] | Lista sivutunnisteita, esim. `['skiingInLevi', 'skiHolidayLevi']` |
| starts_at | timestamptz | Milloin ilmoitus alkaa näkyä |
| expires_at | timestamptz | Milloin ilmoitus poistuu |
| is_active | boolean | Manuaalinen on/off |
| style | text | Tyyli: 'info', 'highlight', 'warning' |
| created_at | timestamptz | |

RLS: SELECT public (aktiiviset + voimassa olevat), write vain backend.

## Koodimuutokset

### 1. Edge Function: `manage-timed-notices`
CRUD-operaatiot ilmoituksille, admin-salasanasuojattu.

### 2. Uusi hook: `src/hooks/useTimedNotices.ts`
- Hakee `timed_notices` taulusta aktiiviset ilmoitukset joissa `starts_at <= now() <= expires_at`
- Suodattaa `target_pages` perusteella sivukohtaisesti
- Cachettaa 5 min

### 3. Uusi komponentti: `src/components/TimedNotice.tsx`
- Ottaa propin `pageId` (esim. `"skiingInLevi"`)
- Näyttää kaikki kyseiselle sivulle kohdennetut voimassaolevat ilmoitukset
- Tyyliteltynä info-bannerina sivun yläosassa (ennen sisältöä)
- Tukee kielen mukaan oikeaa sisältöä

### 4. Admin-paneeli: `src/components/admin/TimedNoticesAdmin.tsx`
- Listaa kaikki ilmoitukset (aktiiviset, tulevat, vanhat)
- Lomake uuden luomiseen: teksti per kieli, alkupäivä, loppupäivä, kohdesivut (multi-select)
- Sivuvalinnan pudotusvalikko sisältää avainnimet kuten "Lasketteluopas (skiingInLevi)", "Rinteet (skiHolidayLevi)" jne.
- Muokkaus ja poisto

### 5. Integrointi sivuihin
- Lisätään `<TimedNotice pageId="skiingInLevi" />` halutuille sivuille
- Aluksi lisätään lasketteluaiheisiin sivuihin: SkiingInLevi, SkiHolidayLevi, CrossCountrySkiingInLevi, SpringSkiingLevi

## Toimintalogiikka
```text
Admin luo ilmoituksen:
  "Rinteet auki 15.5. saakka!"
  Kohde: [skiingInLevi, skiHolidayLevi]
  Alkaa: 2026-03-01
  Päättyy: 2026-05-15

Käyttäjä avaa /opas/laskettelu-levilla:
  → useTimedNotices('skiingInLevi')
  → Tarkistaa: now() >= starts_at && now() <= expires_at?
  → Kyllä → Näyttää bannerin
  → 16.5. → Ei näytä mitään
```

