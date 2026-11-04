# Projektikatsaus: Leville.net (marraskuu 2026)

## Arkkitehtuuri lyhyesti
- React + Vite -sivusto, ~570 reittiä, 7 kieltä (pääpaino FI/EN). Ei palvelinrenderöintiä; hakukoneille esirenderöinti ja reittikohtaiset esilataus-HTML:t buildin jälkeen.
- Lovable Cloud: tietokanta (page_views, seo_pages, group_inquiries ym.), ~30 taustafunktiota (admin, Beds24, MELCloud/Homey, chatbot, saatavuustarkistus, vaihtoehtohaut).
- Varaukset Moderissa (vain saatavuus-/hakurajapinta), varausdata Beds24:ssä.
- Mittaus: GA4 suostumuksen takana (Consent Mode v2), oma evästeetön hakutilasto, kampanjatunnisteet Moder-linkkeihin yhdestä paikasta.
- Henkilökunnan työkalut: admin-paneeli (8 h istunto), /siivous.html + /s/-ohjauslinkit.

## Keskeiset periaatteet
- Nopeus ensin: raskaat kirjastot ja taustapalvelu pois aloituslatauksesta, tyhjä #root, kuvien mitat ja WebP-versiot.
- SEO: vain käännetty sisältö sivukarttaan/hreflangiin, canonical leville.net ilman www:tä, ei "haamuosoitteita".
- Hinnat: ei halvin hinta -lupauksia, ei euromääriä oppaissa; vain luotettavat kokonaishinnat (ei siivousmaksuja).
- Haku ei saa koskaan rikkoutua: pelastusikkuna pysäyttää vain, kun tulos on varmasti 0.
- Liiketoimintapainotus: englanninkieliset (UK/NL/DE) majoitushaut.

## Vanhentunutta tai ristiriitaista (muistissa)
1. WhatsApp-widget -muisti: widget on poistettu kaikilta sivuilta (omistajan päätös) — muisti pitäisi merkitä vanhentuneeksi tai poistaa.
2. "Cookie-less Analytics" -muisti: nyt rinnalla on GA4 suostumuksella; muistin pitäisi kertoa, että vain hakutilasto on evästeetön.
3. "Accommodation Names — 9 kohdetta" vs. etusivun "27 kohdetta": tarkennettava, että 9 on kiinteistö-/nimitaso, 27 yksiköt.
4. Core-sääntö "Netlify Prerendering": tarkistettava, onko yhä käytössä vai korvattu Lovablen esirenderöinnillä.
5. Muistissa on useita versioituja nimiä (v2–v29); sisällöt voivat olla osin päällekkäisiä (esim. kaksi hinta-pariteettimuistia, kaksi sivukarttamuistia).
6. Custom domain www.leville.net on tilassa "drifted" — ei ristiriita koodissa, mutta kannattaa tarkistaa julkaisuasetuksista.
7. Tehtävälistassa avoinna vain "kielikohtainen käännösten jako" (tietoisesti ohitettu).

## Kehitysprioriteetit (nykytila)
1. Englanninkielinen majoitusnäkyvyys ja konversio (pelastusikkuna, ryhmäyhdistelmät, ryhmäsivut).
2. Mobiilin LCP alle 2,5 s.
3. Mittauksen luotettavuus (GA4, hakutilasto, kampanjat).
4. Henkilökunnan työkalut (siivouslista, admin).

## Ehdotetut muistiin tallennettavat (ei arkaluonteisia)
- Englanninkieliset asiakkaat ensisijaisia; suomalaiset vähemmän maksukykyisiä.
- WhatsApp-widget poistettu pysyvästi — älä lisää takaisin.
- Karhupirtissä on ulkoporeallas; Glacier-huoneistoissa ei takkaa.
- Joulu–uusivuosi (19.12.–3.1.) erillinen sesonki, ei mukaan hintatasoihin.
- Admin-istunto 8 h on tarkoituksellinen.
- Hakutilasto jättää yli 30 yön haut viikkotaulukosta pois.

## Toteutus hyväksynnän jälkeen
- Päivitetään/poistetaan kohdat 1–3 muistissa, tarkistetaan kohta 4, yhdistetään päällekkäiset muistit (5) ja lisätään hyväksytyt uudet muistit. Ei koodimuutoksia.
- Kerro, mitkä ehdotukset hyväksyt tai jätät pois.
