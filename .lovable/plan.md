## Tavoite

Parantaa SEO:ta luomalla jokaiselle 26 majoituskohteelle oma indeksoitava landing-sivu, ja korvata `/majoitukset`-sivun 4 kategoriakorttia 26 yksittäisellä kohdekortilla. Kuvat liitetään myöhemmin Google Drive -kansiosta (alikansio per kohde, kansion nimi = kohteen tunniste).

## Mitä rakennetaan

### 1. Slug + kuvakenttä `properties.ts`:ään

Lisätään jokaiselle kohteelle:
- `slug` — URL-pala (esim. `karhupirtti`, `front-slope-5a2`, `glacier-a3`, `skistar-studio-104`)
- `images: string[]` — placeholder-tyhjä lista nyt; täytetään Drive-integraation yhteydessä
- `heroImage: string | null` — ensimmäisen kuvan polku tai null (näytetään placeholder)

Slug-konventio vastaa Drive-alikansion nimeä, jotta automaattinen mappaus onnistuu.

### 2. Dynaaminen landing-page `/majoitukset/:slug`

Uusi tiedosto `src/pages/PropertyDetail.tsx` + reitti `App.tsx`:ssä. Sisältö per sivu:

- **Hero** — kohteen nimi (H1), sijainti, tagit, "Tarkista saatavuus" -CTA → `bookingUrl`
- **Kuvagalleria** — kaikki kuvat tai placeholder kunnes Drive on liitetty
- **Specs** — m², BR, sängyt, vieraat, kylpyhuoneet, rakennus-/remontti-vuosi
- **Ominaisuudet** — sauna, takka, lemmikit OK, esteetön, parkki, WiFi (badget)
- **Pitkä kuvaus** — `shortDescription` + sijaintiteksti (mitä ympärillä, etäisyys hisseille per ryhmä)
- **Sijainti-osio** — kartta-linkki, etäisyys Levin keskustaan, lähimmät palvelut
- **Booking-blokki** — Moder-deeplink + WhatsApp + puhelin
- **Read next** — 3 muuta saman ryhmän kohdetta + linkki `/majoitukset`-listalle
- **JSON-LD** — `LodgingBusiness` per kohde (nimi, sijainti, ominaisuudet, mainEntityOfPage)
- **Hreflang** — vain `fi` aluksi, laajennus myöhemmin
- **Canonical** — `https://leville.net/majoitukset/{slug}`
- **SEO meta** — title `"{Kohteen nimi} — Levi | Leville.net"`, description shortDescriptionista (rajaa 155 merkkiä)

### 3. `/majoitukset`-sivun listanäkymä

- Poistetaan nykyinen 4-kategoriakortin grid
- Korvataan ryhmitellyllä PropertyCard-listalla (FI-käännetyin teksti):
  - **Hiihtäjänkujan rinnerivitalot** (3 kohdetta)
  - **Skistar-keskustahuoneistot** (9 kohdetta)
  - **Karhupirtti — hirsihuvila** (1 kohde)
  - **Muut keskustakohteet** (Levi Platinum A2, Moonlight 415, Karhunvartija 3)
  - **Levi Glacier -alppihuoneistot** (10 kohdetta)
- Jokainen kortti linkittää `/majoitukset/{slug}`-sivulle (otsikko ja "Lue lisää")
- "Tarkista saatavuus" -CTA pysyy suorana Moder-linkkinä
- Säilytetään kartta-linkki, FAQ, info-kortit ja booking-kuvaukset alaosassa

### 4. PropertyCard-päivitys

- Lisätään valinnainen `heroImage` (tai placeholder gradientti kunnes kuvia)
- Otsikko ja "Lue lisää" -linkki sisäiselle `/majoitukset/{slug}`-reitille
- "Tarkista saatavuus" -nappi pysyy ulkoisena Moder-linkkinä (`target="_blank"`)
- Pidetään spec-grid ja badget

### 5. Sitemap + sisäinen linkitys

- Lisätään 26 uutta `/majoitukset/{slug}`-URL:ää sitemap-generaattoriin
- Lisätään footer-linkki "Kaikki majoitukset" → `/majoitukset`
- Olemassa olevat ryhmäoppaat (Karhupirtti, Skistar, Frontslope) saavat "Tutustu kohteisiin"-linkin → suodatettu `/majoitukset`

### 6. Google Drive -kuvien tuonti (myöhemmin, valmistellaan)

Kun annat Drive-kansion linkin:
- Yhdistetään Google Drive -konnektori
- Edge function `import-property-images` listaa alikansiot, mätsää nimet `slug`-kenttään, lataa kuvat ja tallentaa ne **Lovable Cloud Storage** -bucketiin `property-images/{slug}/{n}.jpg` (julkinen)
- Päivittää `properties.ts`:n `images`- ja `heroImage`-kentät
- Optimointi: WebP-konversio + leveyden cap 1600px (tehdään selaimessa kun ladataan, käyttää OptimizedImagea)

Tätä vaihetta ei tehdä nyt — placeholdereilla mennään julkaisuun ja lisätään kuvat heti kun linkki tulee.

## Ulkopuolelle jätetään

- Käännökset muille kuin suomeksi (lisätään myöhemmin pyydettäessä — hreflang ei toistaiseksi)
- Live-saatavuuskalenteri kortille (vaatisi Beds24-integraation jokaiselle kohteelle)
- Hintatieto kortille (price parity -säännön mukaisesti emme näytä hintaa)

## Tekninen sivu

```text
Tiedostot:
  src/data/properties.ts          (laajennetaan: slug, images, heroImage)
  src/components/PropertyCard.tsx (heroImage, sisäinen Lue lisää -linkki)
  src/pages/PropertyDetail.tsx    (UUSI, dynaaminen :slug-route)
  src/pages/Majoitukset.tsx       (korvaa 4 kategoriakorttia 26 PropertyCardilla)
  src/App.tsx                     (lisää reitti /majoitukset/:slug)
  public/sitemap.xml-generaattori (lisää 26 URL)
  src/components/Footer.tsx       (lisää "Kaikki majoitukset" -linkki tarvittaessa)

Ei muutoksia DB:hen tässä vaiheessa — kuvabucket luodaan vasta kun Drive-linkki tulee.
```

Onko OK aloittaa tällä? Kun Drive-linkki on valmis, jatkan kuvien tuonnilla erillisenä askeleena.