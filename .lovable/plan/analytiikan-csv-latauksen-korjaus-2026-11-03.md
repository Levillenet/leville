# Analytiikan CSV-latauksen korjaus

## Mitä tiedetään nyt
- Admin > Analytiikka > "Lataa CSV" näyttää "CSV-lataus epäonnistui".
- Tilastopalvelun lokeissa tältä aamulta (05.13–05.19) jokaista onnistunutta pyyntöä seuraa heti hylätty pyyntö ("ei oikeutta", 401). Pitkiä tai kaatuneita CSV-ajoja ei näy lainkaan, joten CSV-pyyntö ei todennäköisesti edes pääse tiedonhakuun asti.
- Varmaa syytä ei ole vielä vahvistettu: hylätyt pyynnöt voivat olla CSV-latauksia tai hakukysyntä-näkymän pyyntöjä.

## Toteutus
1. **Toista vika** kirjautuneena adminina selaimessa ja katso, mikä pyyntö palauttaa 401 ja millä tunnisteella. Vahvista, onko syy CSV-pyynnössä, istuntotunnuksessa vai palvelun tunnistuksessa.
2. **Korjaa varmistettu syy**, todennäköisimmät:
   - CSV-pyyntö lähettää vanhentuneen/väärän tunnuksen tai tunnistus ei hyväksy sitä → yhtenäistetään CSV-pyyntö samaksi kuin toimiva tilastopyyntö.
   - Jos vastaus kuitenkin tulee perille, mutta selain ei osaa käsitellä sitä (iso tiedosto, tulkinta tekstinä) → luetaan vastaus luotettavasti tekstinä ja ladataan tiedostona.
   - Jos rivimäärä on kasvanut (hakutapahtumat kirjataan nyt aina) ja haku hidastuu → rajataan CSV:hen haettavat rivit tehokkaammin.
3. **Selkeämpi virheilmoitus**: kun syy on vanhentunut kirjautuminen, näytetään "Kirjaudu uudelleen" eikä yleistä virhettä.
4. **Varmistus**: lataa CSV 7 pv, 30 pv ja 90 pv jaksoilta; tiedosto aukeaa ja sisältää rivit sekä loppuyhteenvedot.

## Tekniset yksityiskohdat
- Asiakas: `src/components/admin/PageViewsAdmin.tsx` (`downloadCsv`), `src/lib/adminFunctionAuth.ts`.
- Palvelu: `supabase/functions/get-page-view-stats/index.ts` (CSV-haara), `_shared/authGuard.ts` (`isAdminRequest`).
- Ei tietokanta- eikä sisältömuutoksia.
