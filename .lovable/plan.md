# Äkkilähtöjen päälle kytkeminen

## Tavoite
Näyttää äkkilähtötarjoukset sivustolla (`/akkilahdot` ja kieliversiot) asettamalla `deals_enabled = true`.

## Tausta
- Sivu `src/pages/Akkilahdot.tsx` tarkistaa `site_settings`-taulun rivin `deals_enabled`.
- Kun arvo on `false`, sivulla näkyy "pääsesongin ulkopuolella" -ilmoitus.
- Kun arvo on `true` (tai puuttuu, oletus), sivu hakee Beds24-saatavuuden ja näyttää tarjouskortit.

## Toimenpiteet
1. Tarkista nykyinen arvo suoraan tietokannasta: `select id, value from site_settings where id = 'deals_enabled'`.
2. Jos arvo on `false` tai rivi puuttuu:
   - Päivitä rivi arvoon `true` komennolla `update site_settings set value = true where id = 'deals_enabled'`.
   - Jos riviä ei ole, lisää se: `insert into site_settings (id, value) values ('deals_enabled', true)`.
3. Varmista, että `deals_days_ahead` on asetettu (oletus 14 päivää riittää).
4. Testaa previewissä, että `/akkilahdot` renderöi tarjouskortit eikä off-season-viestiä.

## Ei muuteta
- Etusivun hakubanneriin tai varauswidgettiin ei kosketa.
- `Akkilahdot.tsx`-komponentin logiikkaan ei tehdä koodimuutoksia; kyse on vain asetuksen käännöstä.
