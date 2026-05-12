## Tavoite

Admin voi kytkeä äkkilähdöt päälle/pois yhdellä togglella. Kun pois, /akkilahdot näyttää selkeän infoviestin ja suoran varauslinkin.

## Muutokset

### 1) Tietokanta
Lisää uusi rivi `site_settings`-tauluun:
- `id = 'deals_enabled'`, `value = true` (oletus päällä)

Käytetään olemassa olevaa `update_site_setting`-actionia `admin-settings`-edge functionissa — ei muutoksia backendiin.

### 2) Admin UI — `src/components/admin/SiteSettingsAdmin.tsx`
Lisää uusi Card "Äkkilähtöjen näkyvyys" toggle-kytkimellä (shadcn `Switch`):
- Otsikko: "Näytä äkkilähdöt sivustolla"
- Apuviesti: kun pois, asiakkaille näytetään pääsesonki-info + varauslinkki
- Lukee arvon `settings.siteSettings` joukosta (`id === 'deals_enabled'`), oletus `true`
- Tallennus `updateSiteSetting({ settingId: 'deals_enabled', value })`

### 3) Etusivun käyttäytyminen — `src/pages/Akkilahdot.tsx`
- Hae `deals_enabled` jo importatusta `useAdminSettings()`-hookista
- Kun arvo on `false`:
  - Piilota deal-kortit (manuaaliset + Beds24-haku)
  - Näytä korostettu info-banneri kaikilla 7 kielellä:
    - FI: "Tällä hetkellä ei ole erillisiä äkkilähtötarjouksia. Äkkilähtöjä julkaistaan tyypillisesti pääsesongin aikana. Voit varata majoituksesi suoraan Leville.netistä."
    - EN/SV/DE/FR/ES/NL vastaavat käännökset
    - Painike "Varaa majoitus" → `https://app.moder.fi/levillenet` (`target="_blank"`, `rel="noopener noreferrer"`) — globaali click-handler hoitaa trackingin
  - Säilytä Hero, SEO-metadata ja Sticky bar ennallaan
- Kun `true`: nykyinen toiminta säilyy.

### Tekninen tarkennus

`site_settings.value` on jsonb. Toggle tallentaa booleanin suoraan. Frontissa luetaan `setting?.value !== false` (oletus päällä jos riviä ei ole). Ei muutoksia `beds24-availability`-edge functioniin — UI piilottaa tulokset.
