# Lovable Cloud -kulutuksen pienentäminen koko workspacessa

## Tavoite
Selvitetään kaikkien Cloudia kuluttavien projektien todellinen käyttötarve ja vähennetään noin 45–47 krediitin kuukausittaista runtime-kulutusta vaarantamatta käytössä olevia palveluita.

## Nykyinen vahvistettu tilanne
Tämän laskutusjakson Cloud-kulutus on 44,47 krediittiä. Lovable AI -runtime-kulutus on 0,00 krediittiä.

- Race Day Assist: 17,62 — pääosin micro-compute
- Leville.net: 9,29 — pääosin pico-compute, lisäksi 0,67 funktioihin
- AinaHoiva Care: 8,91 — pääosin pico-compute, lisäksi 0,87 funktioihin
- Unna Mannu Room control: 8,37 — pääosin pico-compute
- Muut projektit yhteensä: noin 0,29

## Toteutus

1. **Projektien käyttötarpeen kartoitus**
   - Tarkistetaan Race Day Assist, Leville.net, AinaHoiva Care ja Unna Mannu Room control erikseen.
   - Selvitetään, mitkä ovat aktiivisia tuotantopalveluita, mitkä testi- tai lepääviä projekteja ja mitkä tarvitsevat ympärivuorokautisen backendin.

2. **Jatkuvan compute-kulun arviointi**
   - Selvitetään erityisesti, tarvitseeko Race Day Assist micro-kokoluokkaa vai riittäisikö pico.
   - Arvioidaan, voidaanko käyttämättömiä backend-palveluita tauottaa kokonaan.
   - Tauotus pysäyttää kyseisen projektin tietokannan, kirjautumisen, tallennuksen ja funktiot, joten mitään ei tauoteta ilman erillistä hyväksyntää.

3. **Ajastettujen töiden tarkistus**
   - Tarkistetaan aktiivisten projektien Cloud Jobs -näkymästä, estävätkö liian tiheät ajot backendin siirtymistä lepotilaan.
   - Nimetään täsmällisesti ne jobit, joiden ajoa kannattaa harventaa tai poistaa käytöstä.
   - Leville.netissä huomioidaan erityisesti jatkuvat automaatio- ja integraatioajot; niitä ei muuteta, ellei niiden käyttötarkoitus ja vaikutus ole varmistettu.

4. **Projektikohtainen päätöslista**
   - Jokaiselle projektille annetaan yksi suositus: pidä ennallaan, pienennä compute-kokoa, harvenna jobeja tai tauota backend.
   - Raportoidaan nykyinen kulutus, muutoksen vaikutus palveluun ja realistinen säästösuunta ilman perusteettomia euromääräisiä lupauksia.

5. **Muutokset vasta hyväksynnän jälkeen**
   - Esitetään ensin yhteenveto ja pyydetään hyväksyntä projektikohtaisesti.
   - Tauotus, koon pienennys tai jobien muuttaminen tehdään vain niihin projekteihin, jotka hyväksyt erikseen.

## Rajaus
Tämä työ koskee vain Lovable Cloud- ja Lovable AI -runtime-kuluja. Tavallisia build-/chat-krediittejä tai sovellusten sisältöä ei muuteta.
