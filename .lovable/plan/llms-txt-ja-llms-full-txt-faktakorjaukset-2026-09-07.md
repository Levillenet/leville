# llms.txt ja llms-full.txt: faktakorjaukset

Toteutan pyynnön sellaisenaan: muokataan vain `public/llms.txt` ja `public/llms-full.txt`. Rakenne ja tyyli säilyvät.

## Kolme tarkennusta ehdotettuihin osoitteisiin

Tarkistin kaikki ehdotetut osoitteet reittitaulusta. Kolme niistä on uudelleenohjauksia, ei lopullisia sivuja — käytän suoraan kohdeosoitetta, jotta tekoälyt eivät päädy ohjausketjuun:

- `/opas/miten-paasee-leville` ohjaa → käytetään `https://leville.net/matka/miten-paasee-leville-helsingista`
- `/travel/how-to-get-to-levi` ohjaa → käytetään `https://leville.net/travel/how-to-get-to-levi-from-helsinki-and-abroad`
- `/latest-news` ohjaa Levi-sivulle, ei uutisiin → käytetään `https://leville.net/ajankohtaista`

Muut ehdotetut osoitteet (`/opas/aktiviteetit-levi`, `/en/northern-lights`, `/guide/restaurants-and-services-in-levi`, `/opas/lapin-sanasto`, `/opas/sauna-levilla`, `/opas/paivaretket-levilla`, `/guide/how-to-dress-for-winter-in-levi-lapland`) ovat oikeita ja toimivia.

## Faktat tarkistettu kohdetiedoista

- Sauna: kaikissa paitsi Skistar-studio 102 — pitää paikkansa.
- 5B5: 9 hengelle — pitää paikkansa.
- Glacier: kaikilla 10 yksiköllä sauna, ei takkaa — pitää paikkansa.
- Karhunvartija 3 (4 h, takka, lemmikit ok), Levi Platinum A2 (4 h), Moonlight 415 (4 h) — pitävät paikkansa.

## llms.txt

Toteutetaan kohdat A1–A12: rikkinäiset osoitteet, "26 huoneistoa + yksi hirsihuvila", 5B5-rivi, Skistar-listaus ryhmiteltynä, Glacier-saunat, uusi osio "Other Apartments in Levi Center", rinnetiedot (43 rinnettä, 28 hissiä, 17 valaistua, ~230 km latuja), sauna-poikkeus 102, revontuliparhaat kuukaudet, esteettömyysosio (vain Skistar 209/210/211/212), "1,300+ line reference", päiväys syyskuu 2026. Hinta- ja alennusosio jätetään koskematta.

## llms-full.txt

Toteutetaan B1–B6: Glacier-taulukosta esteettömyysmerkinnät pois, "B5. Other Properties" korvataan kolmen kohteen tarkoilla tiedoilla, Skistar 209/210/211/212 esteettömiksi ja 310 mukaan (3. krs, ei esteetön), sauna-poikkeus 102 kaikkiin kohtiin, 5B5 "Renovated 2024" ja sleeps 9, päiväykset syyskuuksi.

Lisäksi: tiedoston esteettömyysluku (H1) listaa esteettömät kohteet erikseen. Yhtenäistän senkin samaan listaan (209, 210, 211, 212), muuten tiedosto olisi ristiriidassa itsensä kanssa.

## Lopuksi

Listaan vastauksessa jokaisen muutetun rivin vanha → uusi -muodossa tarkistusta varten.
