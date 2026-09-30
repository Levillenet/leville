# Admin-paneelin tilastojen latauksen korjaus

## Mitä on vahvistettu

- Oikea salasana hyväksytään ja siitä luodaan admin-istunto. Virheilmoitus **"Tilastoja ei voitu ladata. Varmista admin-salasana"** tulee vasta tilastonäkymästä, ei kirjautumisesta.
- Vahvistettu syy on otsaketarkistus: kirjautumisen jälkeen sovellus lisää kaikkiin taustapyyntöihin `x-admin-password`-otsakkeen, mutta `get-page-view-stats` ei salli tätä otsaketta selaimen CORS-tarkistuksessa. Selain pysäyttää tilastopyynnön ennen kuin se pääsee funktiolle. Tämä selittää saman virheen kaikilla laitteilla ja sen, ettei varsinaisia tilastopyyntöjä näy funktion lokeissa.
- `get-page-view-stats` saa tunnisteen jo pyynnön sisällössä, mutta automaattisesti lisätty otsake laukaisee silti selaimen ennakkotarkistuksen.
- Kirjautumisrajoittimessa on lisäksi erillinen virhe: muistissa oleva rajoitin laskee myös onnistuneet kirjautumispyynnöt. Se ei selitä nyt ilmoittamaasi tilastovirhettä, mutta voi estää oikean salasanan viidennen yrityksen jälkeen.

## Työjärjestys

1. Vaihdetaan `get-page-view-stats` käyttämään yhteistä admin-tarkistusta ja CORS-sääntöä, joka sallii admin-istunnon otsakkeen kaikilta jo hyväksytyiltä Leville- ja esikatseluosoitteilta.
2. Luetaan admin-tunniste sekä otsakkeesta että pyynnön sisällöstä, jotta nykyiset ja tulevat kutsut toimivat samalla tavalla.
3. Korjataan kirjautumisrajoitin niin, että vain epäonnistuneet yritykset kasvattavat laskuria (5 väärää yritystä / 15 min).
4. Kirjautumissivu näyttää erikseen tilapäisen lukituksen ja väärän salasanan, eikä tilastonäkymä enää väitä kaikkia latausvirheitä salasanaongelmaksi.
5. Julkaistaan korjatut taustafunktiot ja testataan selaimella koko ketju: kirjautuminen, tilastot ja lämpöpumppunäkymä.

## Tekniset tiedot

- Muutettavat kohteet: `supabase/functions/get-page-view-stats/index.ts`, `supabase/functions/verify-admin/index.ts`, yhteinen rajoitin sekä admin-sivun virheviestit.
- Tilastofunktio käyttää olemassa olevaa `_shared/authGuard.ts`-tarkistusta, jolloin sallittu otsake ja hyväksytyt osoitteet pysyvät yhdenmukaisina muiden suojattujen toimintojen kanssa.
- Ei tietokantamuutoksia. Sivuston muut osat eivät muutu.

## Rajaus

Salasanaa ei vaihdeta, koska ilmoittamasi virhe syntyy vasta onnistuneen kirjautumisen jälkeisessä tilastopyynnössä.
