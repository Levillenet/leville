

## Tilanne

`llms.txt` ja `llms-full.txt` eivät vielä ole olemassa. Edellinen suunnitelma oli yleisluontoinen. Sivustolla on paljon yksityiskohtaista sisältöä, joka pitäisi sisällyttää:

**Sisältö joka puuttui edellisestä suunnitelmasta:**
- Saunan käyttöohjeet (ajastin, alueet A/B, lämpötilat)
- Takan sytytys- ja turvallisuusohjeet (video + vaiheet + häkävaroitus)
- Laitekohtaiset ohjeet (Candy Trio astianpesukone/uuni/liesi)
- Lämmitysjärjestelmät (lattialämmitys, ilmalämpöpumppu, termostaatti)
- Aktiviteettitietokanta (17 aktiviteettia: husky, poro, kelkka, hiihto, jne.)
- Majoituskohteiden yksityiskohtaiset tiedot (Front Slope, Skistar, Bearlodge, Karhupirtti, Glacier)
- FAQ-tietopohja (check-in/out, liinavaatteet, WiFi, pysäköinti, avaimet, jne.)
- Kaikkien sivujen reittikartta (fi, en, sv, de, es, fr, nl — yli 100 reittiä)

## Suunnitelma: Luo kattavat llms.txt ja llms-full.txt

### 1. `public/llms.txt` — Tiivistelmä (~50 riviä)
- Sivuston nimi, kuvaus, yhteystiedot
- Pääkieli fi, tuetut kielet: en, sv, de, es, fr, nl
- Lista pääosioista ja linkit
- Viittaus llms-full.txt:iin kattavampaa tietoa varten

### 2. `public/llms-full.txt` — Kaikki sivuston tieto (~500+ riviä)

Sisältää nämä osiot:

**A. Yritystiedot**
- Leville.net, majoitusvälitys Levillä, yhteystiedot (+358 44 131 3131, info@leville.net)

**B. Majoituskohteet (yksityiskohtaiset)**
- Skistar: modernit huoneistot, 2–6 hlö, Candy Trio, sähkökiuas
- Front Slope / Hiihtäjänkuja: 65–100 m², 2–4 makuuhuonetta, varaava takka, sauna maisemalla
- Bearlodge / Karhupirtti: tilava mökki, jopa 14 henkilölle
- Glacier: modernit, jopa 10 hlö, ryhmävaraukset
- Perheasunnot: tilavat, 4–10 hlö

**C. Laitekohtaiset ohjeet**
- Candy Trio astianpesukone (ohjelmat P1–P5, hanan avaus, ei yhtäaikaa uunin kanssa)
- Candy Trio uuni (lämpötilat, esilämmitys, ajastin)
- Candy Trio liesi (highlight/halolight, turvallisuus)
- Saunan ajastin (alue A = välitön, alue B = viive, lämmitysaika 30–45 min)
- Termostaatti ja lämpötilan säätö

**D. Takan sytytys ja turvallisuus**
- 3-vaiheinen prosessi (video → ohjeet → koodi)
- Savuhormin avaus, max 2 täyttöä, häkämyrkytysvaaroitus
- Varaava takka vs avotakka ero

**E. Lämmitysjärjestelmät**
- Vesikiertoinen lattialämmitys, sähköinen lattialämmitys
- Ilmalämpöpumppu, vesipatterit, sähköpatterit
- Termostaatin käyttö

**F. Saunaopas**
- Sähkökiukaan käyttö, ajastin A/B, lämpötilan säätö
- Löylynheitto-ohjeet (max 0,2l)
- Saunakulttuuri ja etiketti

**G. Aktiviteetit Levillä (kaikki 17)**
- Laskettelu, murtomaahiihto, huskysafari, porofarmi, moottorikelkka, revontuliretki
- Kylpylä, sauna-ilta, pulkkailu, lasten hiihtokoulu, jääkarting, pilkkiminen
- Lumikenkäily, vapaa-aika, kylän tutkiminen, ravintolaillallinen
- Kunkin kesto, vaativuus, ikäraja, tarvitseeko auton

**H. FAQ — Usein kysytyt kysymykset (kaikki 20+)**
- Check-in/out ajat, aikainen check-in, matkatavarasäilytys
- Liinavaatteet, keittiö, WiFi, TV, avaimet, pysäköinti
- Sauna, takka, lämmitys, pesula, pulkat
- Ruokaostokset, ravintolat, varauksen peruuntuminen, hinnat

**I. Oppaat ja artikkelit**
- Talvivarusteet, laskettelu, hiihto, talvi/kevät/kesä/ruska
- Ravintolat ja palvelut, liikkuminen, levi ilman autoa, lapsiperheet
- Levi vs Ylläs vs Ruka, Levi vs Rovaniemi, Lapin sanasto
- Hintataso, jouluillallinen, revontulet

**J. Kaikki reitit (täydellinen sitemap)**
- FI: /, /majoitukset, /levi, /revontulet, /ukk, /varausehdot, /opas/...
- EN: /en, /en/accommodations, /guide/..., /activities/..., /travel/...
- SV, DE, ES, FR, NL: kaikki kielireitit
- Piilotetut: /accommodations/guides/bearlodge, /skistar-apartments, /frontslope-apartments, /takka-ohje

### 3. `public/robots.txt` — Päivitys
- Lisää rivi: `# AI Crawlers` + `Sitemap: https://leville.net/llms.txt`

### Muutettavat tiedostot
1. `public/llms.txt` — uusi
2. `public/llms-full.txt` — uusi
3. `public/robots.txt` — lisää llms.txt-viittaus

