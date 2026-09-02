# Korjaus: "Näytä äkkilähtöjä X päivää eteenpäin" ei vaikuta tuotannossa

## Mistä ongelma johtuu

Asetus tallentuu kyllä kantaan, mutta näytettävä aikaikkuna luetaan välimuistista:

- Taustapalvelu `moder-availability` tallentaa `daysAhead`-arvon osaksi välimuistiriviä (`beds24_cache`), ja välimuisti tarjoillaan 1–2 tunnin ajan. Uusi asetusarvo ei siis päädy vastaukseen ennen kuin välimuisti vanhenee.
- Sivu `/akkilahdot` käyttää ensisijaisesti taustapalvelun palauttamaa (vanhentunutta) arvoa ja vasta toissijaisesti kannasta luettua asetusta.
- Lisäksi selain pitää saatavuusvastauksen 1 tunnin ajan omassa välimuistissaan.

Yhdistelmänä muutos näkyy vasta 1–2 tunnin kuluttua, mikä näyttää siltä ettei asetus toimi lainkaan.

## Mitä tehdään

1. Taustapalvelu lukee `deals_days_ahead` -asetuksen aina tuoreena kannasta ja palauttaa sen vastauksessa myös silloin kun itse saatavuusdata tulee välimuistista (välimuistin oma `daysAhead` ohitetaan).
2. Sivu `/akkilahdot` käyttää ensisijaisesti admin-asetuksen arvoa ja taustapalvelun arvoa vain varalla, jolloin muutos näkyy heti kun asetukset on ladattu.
3. Kun aikaikkuna vaihdetaan adminissa, äkkilähtöjen saatavuusvälimuisti tyhjennetään/päivitetään, jotta lista haetaan uudella ikkunalla heti.
4. Nykyinen 1 tunnin selainvälimuisti säilyy hintadatalle, mutta aikaikkunan muutos ei enää jää sen taakse.

## Tekniset yksityiskohdat

- `supabase/functions/moder-availability/index.ts`: siirretään `deals_days_ahead` -haku välimuistitarkistuksen edelle ja lisätään cache-hit-vastaukseen `daysAhead: dealsDaysAhead` (ylikirjoittaa `cache.data`-arvon). Haku rajataan edelleen samalla arvolla, ja kun arvo poikkeaa välimuistiin tallennetusta, data rakennetaan uudelleen välimuistin iästä riippumatta.
- `src/pages/Akkilahdot.tsx`: `const daysAhead = daysAheadSetting ?? availability?.daysAhead ?? 21;`
- `src/components/admin/SiteSettingsAdmin.tsx`: `handleQuickSelect`-tallennuksen jälkeen kutsutaan `moder-availability?force_refresh=true` ja mitätöidään `['moder-availability']`-kysely.
- Deployataan edge-funktio muutoksen jälkeen ja varmistetaan, että 7 pv / 28 pv -valinta muuttaa hakuikkunan välittömästi.
