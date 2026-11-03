Pidempiä kuin 30 yön hakuja ei lasketa hakutilaston lukuihin

Taustaa: Tänään klo 11.37 tehtiin kaksi hakua, joissa tulo oli 11.1.2027 ja lähtö 19.4.2027. Väli on 98 yötä, joten luku on laskettu oikein. Kävijä oli luultavasti valinnut lähtöpäiväksi vahingossa huhtikuun eikä tammikuuta. Haku näkyy siksi jokaisella viikolla tammikuusta huhtikuuhun ja vääristää lukuja "Yleisin pituus" ja hakumäärät.

Muutokset:
- Yli 30 yön haut jätetään pois viikkotaulukosta (hakumäärä, yleisin pituus, keskimääräinen henkilömäärä).
- Taulukon alle tulee rivi: "Pois jätetty X epätodennäköisen pitkää hakua (yli 30 yötä)".
- Tallennettuja tietoja ei poisteta.
- Lisätään testi, joka varmistaa, että 98 yön haku ei näy viikkoluvuissa ja 7 yön haku näkyy.

Tekninen osuus: suodatus tehdään hakutilaston koostefunktiossa (searchDemand), ja testi lisätään sen omien testien viereen.
