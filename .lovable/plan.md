# Vanhan VacationRental-virheen poistaminen Googlesta

## Varmistettu nykytila

- `https://leville.net/` palauttaa Googlebotille edelleen vanhan, puutteellisen `VacationRental`-kohteen nimellä **“Levi Apartments by Leville.net”**.
- Samalta URL:lta puuttuvat juuri Search Consolen ilmoittamat kentät: `image`, `identifier`, `containsPlace` ja `geo`.
- Nykyisessä lähdekoodissa tätä yleistä `VacationRental`-kohdetta ei enää luoda.
- Välimuistin ohittava `https://leville.net/?schema-check=...` ja `https://leville.lovable.app/` eivät sisällä virheellistä kohdetta.
- Vastauksen `x-lovablehtml-render-cache: edge-hit` osoittaa, että kanoninen etusivu tulee vanhasta HTML-renderöintivälimuistista. Kyse ei siis ole vain Search Consolen vanhasta raportista.

## Toteutus

1. Poistetaan myös vanha nimi **“Levi Apartments by Leville.net”** globaalin `LodgingBusiness`-scheman `alternateName`-listasta, jotta nimeä ei enää synny missään nykyisessä rakenteisessa datassa.
2. Lisätään käynnistyksen yhteyteen rajattu suojaus, joka poistaa DOM:sta vain sellaisen vanhan JSON-LD-kohteen, jossa yhdistyvät:
   - `@type: VacationRental`
   - `name: Levi Apartments by Leville.net`
   - puuttuvat vaaditut kohdetiedot.
   Oikeiden kohdesivujen uutta `VacationRental`-schemaa ei poisteta.
3. Julkaistaan uusi versio, jotta uusi HTML/JavaScript-versio pakottaa renderöintivälimuistin päivittymään.
4. Tarkistetaan ilman cache-busting-parametreja ja Googlebot-tunnisteella:
   - etusivulla vanhaa kohdetta on 0 kappaletta
   - Glacier Apartments -sivulla on vain oikea, täydennetty kohdekohtainen schema
   - `identifier`, `image`, `containsPlace` ja `geo` löytyvät Glacier Apartmentsin schemasta.
5. Kun live-tarkistus onnistuu, Search Consolessa vanhalle kohteelle voidaan käynnistää **Validate fix** / etusivun uudelleenindeksointi. Raportti ei poistu heti, vaan vasta Googlen uuden crawlauksen jälkeen.

## Rajaus

- Ei muutoksia näkyvään ulkoasuun, otsikoihin, kuvauksiin tai canonical-tageihin.
- Ei keksittyjä arvioita, hintoja tai saatavuustietoja.
- Oikeat majoituskohteiden JSON-LD-tiedot säilyvät.
