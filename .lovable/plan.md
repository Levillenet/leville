# Piilota 85 käännösmatkasivua SEO-rekisteristä

## Yhteenveto
Tarkistettiin julkaistujen SEO-sivujen määrä tietyillä ehdoilla. Tulos oli odotettu 85 kappaletta. Päivitys merkitsee nämä sivut luonnoksiksi.

## Mitä tehdään
- Ajetaan päivitys `seo_pages`-tauluun
- Asetetaan `is_published = false` ja `updated_at = now()` niille 85 riville, jotka täyttävät ehdot
- Ehdot: kieli on saksa, ruotsi, ranska, espanja tai hollanti JA komponentin nimi on yksi listatuista 17 matkailuteemasta

## Vaikutus
Kyseiset kieliversiot eivät enää näy sivuston reitityksessä eivätkä sitemapissa, kunnes ne mahdollisesti julkaistaan uudelleen.
