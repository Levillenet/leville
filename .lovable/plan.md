# Miksi 14.–16.9. näyttää vain osan kohteista

## Todennettu tilanne

Ajoin tuotannossa saman haun (14.9. → 16.9., 2 yötä). Sivu **näyttää 4 kohdetta**: Hiihtäjänkuja 5B2, Hiihtäjänkuja 5B5, Glacier A2 ja Glacier B3. Mikään ei ole rikki — hinnat tulevat Moderista normaalisti.

Taustapalvelu palauttaa kuitenkin **12 kohdetta, joilla 14.–16.9. on vapaana**. Kahdeksan niistä suodattuu pois kahdesta syystä:

1. **Kohteen minimiyömäärä on 3 (Moderista).** 2 yön haku hylätään automaattisesti.
   - Skistar 104, Skistar 102, Skistar 320, Skistar 321, Moonlight 415, Glacier B1, Glacier B2.
2. **Gap Fill -sääntö "ei vielä auki".** 3 yön aukoissa 2 yön myynti on sallittu vasta kun saapumiseen on ≤ 7 päivää. 14.9. on 12 päivän päässä, joten sääntö estää myynnin.
   - Glacier A1 (13.–16.9.), Hiihtäjänkuja 5A2 (13.–16.9.), Skistar 212 (14.–17.9.).

Lisäksi Skistar 210 ja 211 ovat vapaana vain 13.–15.9., eivät siis kata 16.9. asti.

## Ehdotettu korjaus

1. **Uusi äkkilähtöasetus: "Salli lyhyemmät yöt äkkilähdöissä"**
   - Adminiin kytkin + päiväraja: kun saapumiseen on enintään X päivää, kohteen oma minimiyömäärä ohitetaan äkkilähtöhaussa ja sallitaan vähintään 2 yötä.
   - Oletus esimerkiksi 21 päivää eli sama kuin näkyvyysikkuna, jolloin koko äkkilähtöikkuna myy 2 yön jaksoja.
2. **Gap Fill -päivärajojen nosto**
   - Nostetaan 3 yön aukkojen 2 yön sääntö 7 päivästä samalle tasolle kuin näkyvyysikkuna (säädettävissä administa kuten nyt).
3. **Läpinäkyvyys hakutulokseen**
   - Kun haku tuottaa vähemmän tuloksia kuin vapaita jaksoja on, näytetään lyhyt huomautus: osassa kohteista on pidempi minimiyömäärä valitulle ajalle.

## Tekniset yksityiskohdat

- `src/pages/Akkilahdot.tsx`: `evaluateStay` saa uuden ohituksen ennen `nights >= minNights` -tarkistusta: jos `minStayOverride.enabled && daysUntil <= minStayOverride.days && nights >= minStayOverride.minNights`, palautetaan sallittu.
- Uusi asetus `site_settings`-riville `deals_min_stay_override`, arvo `{ "enabled": true, "days": 21, "minNights": 2 }`; luetaan `useAdminSettings`-hookin kautta kuten `deals_gap_fill`.
- `src/components/admin/SkiPassAdmin.tsx` (äkkilähtöasetukset): kytkin, päivämäärä-liukuri ja minimiyöt-valinta; tallennus samalla `update_site_setting`-kutsulla kuin muut äkkilähtöasetukset.
- Gap Fill -oletusarvot päivitetään adminissa; itse logiikka pysyy ennallaan.
- Taustapalveluun (`moder-availability`) ei tarvita muutoksia — data on jo oikein.
