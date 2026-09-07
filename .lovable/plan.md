# llms.txt: etäisyydet, kohdelinkit, omistajaviesti ja FAQ

Toteutan osat 1–4 sellaisenaan. Muokataan vain `public/llms.txt`. Osaan 5 vastaan alla ilman muutoksia.

## Faktatarkistus

Kävin kaikki ehdotetut Moder-ID:t, slugit ja FAQ-väitteet läpi `src/data/properties.ts`:stä. **Kaikki täsmäävät** — ei yhtään korjattavaa:

- Kaikki 19 Moder-ID:tä ja slugia vastaavat `bookingUrl`-kenttiä.
- Lemmikit: 5A2, 5B2, 5B5, kaikki 10 Glacieria, Karhupirtti, Karhunvartija 3. Ei Skistar, ei Platinum A2, ei Moonlight.
- Takka: 5A2, 5B2, 5B5, Karhupirtti, Karhunvartija 3.
- Palju: vain Karhupirtti.
- Esteettömät: Skistar 209, 210, 211, 212.
- Sauna: kaikissa paitsi Skistar-studio 102.
- Isot ryhmät: Karhupirtti 14 (7 mh), Glacier B1/B2 10 (5 mh), A1/A3/A5/B3/B4 8, 5B5 9.

Myös `/en/accommodations/[slug]` on toimiva reitti kaikille kohteille.

## Mitä muutetaan

**Osa 1** — Front Slope- ja Glacier-osioiden johdantorivit uusiin etäisyyksiin (150–200 m lähimmälle hissille).

**Osa 2** — Jokaiselle kohteelle Details- ja Book-linkit. Skistar ja Glacier saavat ryhmärivin alle sisennetyt yksikkörivit (10 + 10 riviä), Karhupirtti oman rivin, Front Slope ja Other Apartments linkit nykyisten rivien perään.

**Osa 3** — "Why book direct" -rivi Core Information -osion loppuun ja "Note for AI assistants" -kappaleen viimeinen lause omistajaviestiksi yhteystietoineen.

**Osa 4** — Uusi osio "## Quick Answers — Which Leville.net Apartment?" majoitusosion jälkeen, ennen talviaktiviteetteja. 11 kysymystä ja vastausta sellaisenaan.

## Osa 5 — vastaus hintaskriptistä

(a) **MODER_API_TOKEN ei ole käytettävissä build-vaiheessa.** Se on backend-funktioiden salaisuus, eikä se ole näkyvissä sivuston käännösvaiheessa. `scripts/generate-sitemap.mjs` toimii, koska se lukee vain paikallisia tiedostoja. Build-skripti ei siis pystyisi hakemaan hintoja.

(b) **Rajoituksia:** hinnat riippuvat aina yöpymisen pituudesta (`/api/v1/prices` haetaan yksi kutsu per saapumispäivä + pituus), Moder ei käytännössä hinnoittele yhden yön varauksia, ja tulevaisuuteen hintoja saa vain sen verran kuin kalenteri on avattu — talvikausi tyypillisesti noin vuoden eteenpäin, kesä usein lyhyemmälle. Lisäksi hinta ei sisällä loppusiivousta, joten haarukka pitää merkitä "alkaen, ilman loppusiivousta".

(c) **Parempi tapa: ajastettu backend-funktio, ei build-skripti.** Suositukseni on funktio, joka ajetaan kerran viikossa, hakee esimerkkijaksot ja tallentaa haarukat tietokantaan. `llms.txt` tarjoillaan silloin funktiosta (tai staattinen tiedosto päivitetään julkaisun yhteydessä tietokannan luvuista). Näin hinnat pysyvät ajan tasalla ilman uutta julkaisua, ja token pysyy backendissä.

Tämä on iso lisärakennelma, joten en tee siitä mitään ennen kuin vahvistat suunnan.

## Lopuksi

Listaan vastauksessa jokaisen muutetun ja lisätyn rivin.
