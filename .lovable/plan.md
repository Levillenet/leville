

## SEO-sivujen hallintajärjestelmä

### Ongelma
Haluat luoda SEO-sivuja valmiiksi "varastoon" ja julkaista ne myöhemmin admin-paneelista. Tällä hetkellä kaikki sivut ovat joko koodissa reititettyinä (julkaistu) tai eivät ole olemassa.

### Ratkaisu

Tietokantapohjainen sivurekisteri, jossa jokainen SEO-sivu on rivi taulussa. Admin-paneelissa näet kaikki sivut ja voit kytkeä ne päälle/pois. App.tsx:ssä reitit renderöidään dynaamisesti tietokannan perusteella.

### Toteutus

**1. Uusi tietokantataulu `seo_pages`**

| Sarake | Tyyppi | Kuvaus |
|--------|--------|--------|
| id | uuid | PK |
| path | text | URL-polku, esim. `/guide/new-page` |
| title | text | Sivun nimi adminissa |
| component_name | text | React-komponentin nimi (vastaa tiedostoa) |
| lang | text | Kieli (fi/en/nl jne.) |
| is_published | boolean | Julkaistu vai ei |
| sort_order | integer | Järjestys |
| created_at, updated_at | timestamp | Aikaleimat |

RLS: SELECT kaikille (julkaistut), kirjoitus vain backendille.

**2. Admin-komponentti `SeoPageAdmin.tsx`**

- Uusi välilehti admin-paneeliin: "SEO-sivut" (Globe-ikoni)
- Listaa kaikki sivut taulukossa: nimi, polku, kieli, tila (julkaistu/piilossa)
- Toggle-kytkin julkaisemiseen/piilottamiseen
- Ei muokkaa itse sivujen sisältöä (se on koodissa) -- tämä on vain "reitityksen hallinta"

**3. Dynaaminen reititys App.tsx:ssä**

Koska React-komponentit ovat staattisia kooditiedostoja, käytännöllisin tapa on:
- Pidä kaikki sivukomponentit koodissa kuten ennenkin
- Lisää `seo_pages`-taulusta haettu `is_published`-tieto määräämään, renderöidäänkö reitti vai ei
- Käytetään komponenttikarttaa (Record<string, React.ComponentType>) joka yhdistää `component_name` → komponentti

**4. Edge function `manage-seo-pages`**

- `get_all`: Hakee kaikki sivut (admin)
- `get_published`: Hakee julkaistut (frontend-reititys)
- `toggle_publish`: Vaihtaa julkaisutilan
- `create_page`: Lisää uuden sivun rekisteriin
- `delete_page`: Poistaa rekisteristä
- Salasanasuojaus kirjoitusoperaatioille (sama ADMIN_PASSWORD-malli)

### Työnkulku

1. Luot uuden sivukomponentin koodissa (esim. `src/pages/guide/NewPage.tsx`)
2. Lisäät sen komponenttikarttaan App.tsx:ssä
3. Admin-paneelista lisäät rivin: polku, komponentin nimi, kieli
4. Kun haluat julkaista, klikkaat "Julkaise" -- sivu ilmestyy sivustolle
5. Voit piilottaa milloin tahansa

### Tiedostot

- **Uusi taulu**: `seo_pages` (migraatio)
- **Uusi edge function**: `supabase/functions/manage-seo-pages/index.ts`
- **Uusi komponentti**: `src/components/admin/SeoPageAdmin.tsx`
- **Muokataan**: `src/pages/Admin.tsx` (uusi välilehti)
- **Muokataan**: `src/App.tsx` (dynaaminen reititys komponenttikartan + tietokannan perusteella)

