# Korjaussuunnitelma: Äkkilähtöjen asetusten tallennus

## Vahvistettu syy

Kaikki kolme ilmoitettua toimintoa käyttävät samaa `admin-settings`-taustafunktiota:

- äkkilähtöjen perusalennus (`update_site_setting`)
- alennus-badge ja erikoistarjous (`upsert_period`)
- jaksokohtainen alennus (`upsert_period`)

Esikatselun lokissa jokainen pyyntö päättyy selaimen `Failed to fetch` -virheeseen. Funktio vastaa aina CORS-otsikolla `Access-Control-Allow-Origin: https://leville.net`, vaikka pyyntö tulee Lovable-esikatselusta. Selain estää vastauksen jo ennen kuin käyttöliittymä voi käsitellä sitä. Suoralla palvelinkutsulla funktio ja asetusten lukeminen toimivat, joten kyse ei ole näiden kolmen asetuksen tietokentistä.

## Toteutus

1. **Korjaa `admin-settings`-funktion CORS**
   - Ota käyttöön projektin olemassa oleva yhteinen turvallinen CORS-apuri.
   - Salli tuotantodomain, julkaistu Lovable-domain ja projektin esikatseludomainit.
   - Palauta pyynnön hyväksytty origin kaikissa vastauksissa: OPTIONS, onnistuminen, validointivirhe, valtuutusvirhe ja palvelinvirhe.
   - Muita ulkopuolisia origineja ei sallita.

2. **Säilytä nykyinen käyttöoikeustarkistus**
   - Kirjoitusoperaatiot vaativat edelleen admin-tunnistuksen.
   - Asetusten sisältöä tai hinnoittelulogiikkaa ei muuteta.

3. **Paranna virheen näkyvyyttä hallinnassa**
   - Näytä palvelimen palauttama virhe käyttöliittymän ilmoituksessa geneerisen tallennusvirheen sijaan silloin, kun vastaus saadaan.
   - Tämä helpottaa mahdollisten myöhempien tietokanta- tai validointivirheiden tunnistamista.

4. **Deploy ja toiminnallinen varmistus**
   - Deployaa päivitetty `admin-settings`-funktio.
   - Testaa esikatselussa asetusten luku sekä nämä kolme tallennusta: perusalennus, badge/erikoistarjous ja jaksokohtainen alennus.
   - Varmista uudelleenluvulla, että arvot todella tallentuivat tietokantaan.
   - Testaa lisäksi tuotanto-origin, jotta korjaus ei riko julkaistua hallintaa.
