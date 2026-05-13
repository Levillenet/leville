// Finnish translations for property landing pages (/majoitukset/:slug).
// Keyed by property slug. properties.ts itself stays in English for other consumers.

export interface PropertyFiTranslation {
  name?: string;
  shortDescription: string;
  /** Optional long-form description (Markdown-lite: paragraphs separated by blank lines, **bold**, bullets with "- "). */
  longDescription?: string;
}

export const propertyFi: Record<string, PropertyFiTranslation> = {
  "front-slope-5a2": {
    name: "Alppihuoneisto 5A2 – Hiihtäjänkuja",
    shortDescription:
      "Täysin remontoitu (kesäkuu 2024) kahden makuuhuoneen alppityylinen huoneisto Levin keskustassa Zero Point -alueella, n. 200 m Eturinteeltä. Varaava takka, kaksi uusittua kylpyhuonetta, kuivaushuone ja parveke. Ilmalämpöpumppu. Lemmikit sallittu.",
    longDescription: `**Tilava ja tyylikäs huoneisto Levin sydämessä – Täydellinen kuudelle vieraalle**

Tervetuloa unelmiesi lomanviettopaikkaan Leville! Tämä **täysin remontoitu 2 makuuhuoneen huoneisto** sijaitsee aivan Levin keskustassa, vain muutaman askeleen päässä laskettelurinteistä, hiihtoladuista, ravintoloista ja kaupoista. Täydellinen tukikohta stressittömälle Lapin lomalle.

**Mukava pohjaratkaisu ja modernit mukavuudet**
Huoneistossa on kaksi makuuhuonetta, kummassakin kaksi erillistä sänkyä, sekä laadukas vuodesohva alakerran oleskelutilassa – majoittaen mukavasti jopa kuusi vierasta. Olohuoneesta pääsee suoraan parvekkeelle nauttimaan raikkaasta ulkoilmasta.

Kesäkuussa 2024 tehty suuri remontti on antanut huoneistolle raikkaan ja modernin ilmeen. **Molemmat kylpyhuoneet** on uusittu täysin, ja lähes kaikki pinnat on uusittu, varmistaen korkean laadun lomallesi.

**Oma sauna, kuivaushuone ja takka**
Päivän rinteillä vietetyn päivän jälkeen rentoudu omassa saunassa. Erillinen kuivaushuone tekee talvivarusteiden hoidosta vaivatonta – voit tulla sisään alakerran sisäänkäynnistä, jättää sukset ja märät vaatteet kuivumaan ja siirtyä suoraan saunaan. Olohuoneen **varaava takka** luo lämpimän, kodikkaan tunnelman ja pitää asunnon miellyttävästi lämpimänä tuntikausia.

Ilmalämpöpumppu tasaiseen lämpöön talvella ja viilennykseen kesällä.

**Erinomainen sijainti Levillä**
Kun kaikki on lähellä, lomastasi tulee helpompi ja nautinnollisempi. Laskettelurinteet, hiihtoladut, kaupat ja ravintolat ovat kaikki kävelyetäisyydellä. Saapuminen on myös helppoa – huoneistoon pääsee vain yhden matalan portaan kautta.`,
  },
  "front-slope-5b2": {
    name: "Alppihuoneisto 5B2 – Hiihtäjänkuja",
    shortDescription:
      "65 m² alppityylinen huoneisto Levin keskustassa Zero Point -alueella, n. 200 m Eturinteeltä. Täysin remontoitu 2024. Alakerran olohuoneessa PlayStation ja 150 cm vuodesohva. Oma sauna, kuivaushuone ja varaava takka. Lemmikit sallittu.",
    longDescription: `**Viehättävä alppihuoneisto Levin sydämessä – 2 makuuhuonetta + alakerran oleskelutila**

Harvinainen löytö Levin keskustasta: tämä tilava 65 m²:n alppityylinen huoneisto tarjoaa kaksi makuuhuonetta sekä erillisen alakerran oleskelutilan, majoittaen mukavasti jopa 6 vierasta. Sijainti vain 200 metrin päässä eturinteiltä ja Zero Pointista tekee tästä ihanteellisen tukikohdan perheille, ystäväporukoille tai kenelle tahansa, joka etsii aitoa Levin lomakokemusta.

**Kaksi kerrosta mukavaa asumista** Yläkerrassa on avoin keittiö-olohuone ja kaksi makuuhuonetta, joissa kummassakin on kaksi erillistä sänkyä. Alakerrasta löydät erillisen oleskelutilan, jossa on suuri TV ja mukava 150 cm vuodesohva – täydellinen oleskelutila lapsille tai yksityinen pakopaikka lisävieraille.

**Oma sauna, takka ja kuivaushuone** Huoneistossa on oma sähkösauna ja viihtyisä takka, joka luo oikean tunnelman ulkoilupäivän jälkeen. Erillinen kuivaushuone alakerrassa on käytännöllinen lisä: tule sisään ulkoa, jätä sukset ja märät varusteet kuivumaan ja suuntaa suoraan saunaan.

**Erinomainen sijainti rinteiden vieressä** Vain 200 metriä eturinteille ja Zero Pointiin – olet käytännössä hiihtotoiminnan kynnyksellä. Ravintolat, kaupat ja after ski -paikat ovat kaikki lyhyen kävelymatkan päässä. Hiihtoladut alkavat lähistöltä. Ilmainen pysäköinti sähköpistokkeella on saatavilla paikan päällä.

**Kaikki mukavan oleskelun takaamiseksi sisältyy hintaan** Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja jääpalakone. Oma sauna ja takka. Oma kuivaushuone ja kuivauskaappi. Parveke. Ilmainen WiFi ja TV. Syöttötuoli ja vauvan turvaportit saatavilla perheille.`,
  
  },
  "front-slope-5b5-penthouse": {
    name: "Penthouse 5B5 – Hiihtäjänkuja",
    shortDescription:
      "100 m² penthouse alppityylisessä talossa Levin keskustassa Zero Point -alueella, n. 200 m Eturinteeltä. 4 makuuhuonetta, 3 parveketta ja sauna. Varaava takka, 10 hengen ruokapöytä. Remontoitu 2021. Lemmikit sallittu.",
    longDescription: `**Upea alppihuvila eturinneteemalla – 100 m², 4 makuuhuonetta**

Tämä 100 m²:n kattohuoneisto sijaitsee Levin sydämessä, vain 200 metrin päässä eturinteistä ja Zero Pointista. Neljän makuuhuoneen, kolmen parvekkeen ja jopa 8 hengen tilojensa ansiosta tämä on yksi Levin keskustan upeimmista loma-asunnoista.

**Tilavat asuintilat jopa 8 vieraalle** Neljä makuuhuonetta, joissa on yhteensä 9 vuodepaikkaa, sekä vuodesohva olohuoneessa tarjoavat joustavat nukkumisjärjestelyt perheille tai suuremmille ryhmille. Suuressa ruokapöydässä on tilaa 10 henkilölle – ihanteellinen yhteisille aterioille ja iltatilaisuuksille. Avoimessa olohuoneessa on mukava sohva, suuri televisio ja äänentoistojärjestelmä.

**Eturinneteemat kolmelta parvekkeelta** Olohuoneesta ja yhdestä makuuhuoneesta avautuvat parvekkeet näkymillä Levin eturinteelle. Katsele illan rinnevalaistusta sisätiloista käsin.

**Yksityinen sauna rinneteemoin ja takka** Saunasta on ikkuna eturinteen suuntaan – nauti näkymistä rentoutuessasi päivän rinteillä vietetyn päivän jälkeen. Olohuoneen varaava takka luo lämpimän, kodikkaan tunnelman talvi-iltoina. Polttopuut sisältyvät hintaan.

**Remontoitu ja hyvin varusteltu** Huoneisto remontoitiin perusteellisesti vuonna 2021 kaikki uusine kalusteineen ja moderneine sisustuksineen. Ilmastointi ja lämpöpumppu pitävät asunnon miellyttävänä kaikkina vuodenaikoina. Rakennuksessa on yksityinen pysäköinti, suksivarasto ja suksienhuoltotila kellarissa.

**Erinomainen sijainti rinteiden äärellä** Vain 200 metrin päässä Levin eturinteistä ja Zero Pointista. Ravintolat, kaupat ja kaikki palvelut ovat kävelyetäisyydellä. Ladut alkavat läheltä. Kaikki, mitä tarvitset täydelliseen Levin lomaan, on aivan ovellasi.

**Kaikki sisältyy mukavaan oleskeluun** Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni ja kahvinkeitin. Yksityinen sauna rinnetemoin. Takka polttopuineen sisältyy hintaan. 3 parveketta. Ilmastointi. Ilmainen WiFi, TV ja äänentoistojärjestelmä. Pinnasänky, syöttötuoli, lastenkirjoja ja -leluja sekä lasten turvaportit saatavilla.`,
  
  },
  "karhupirtti": {
    name: "Karhupirtti – hirsihuvila Levin keskustassa",
    shortDescription:
      "220 m² perinteinen hirsihuvila Levin keskustassa: 7 makuuhuonetta, ulkoporeallas, oma piha ja takka. 3 ensuite-makuuhuonetta alakerrassa. Täysin remontoitu 2022. Takkapuut ja loppusiivous sisältyvät. Lemmikit sallittu.",
    longDescription: `**Karhupirtti – Ainutlaatuinen 220 m² hirsihuvila Levin sydämessä**

Levin majoitusvaihtoehdoista Karhupirtti on vertaansa vailla. Tämä perinteinen pyöröhirsihuvila sijaitsee aivan Levin keskustassa, vain kolmen minuutin kävelymatkan päässä eturinteistä, ravintoloista ja kaupoista. Sen 220 m² asuintilalla, seitsemällä makuuhuoneella ja ulkoporeammeella, se majoittaa jopa 14 vierasta, mikä tekee siitä täydellisen tukikohdan ryhmämatkailuun Lapissa. Lemmikit ovat tervetulleita.

**Tilaa jopa 14 vieraalle 7 makuuhuoneessa** Alakerrassa on kolme omalla kylpyhuoneella varustettua makuuhuonetta, jokaisessa oma suihku ja WC – täydellistä yksityisyyttä arvostaville. Yläkerrassa on neljä makuuhuonetta väliovilla, ihanteellinen lapsiperheille. Tilava olohuone ja ruokailutila istuttavat koko ryhmän mukavasti, tehden yhteisistä aterioista ja illoista loman kohokohtia.

**Ulkoporeamme** Astu ulkoporeammeeseen omalla suurella yksityisellä pihallasi. Selkeinä iltoina voit jopa bongata revontulet poreammeesta käsin. Pihalla on myös grillipaikka iltoja varten avotulen äärellä.

**Täysin saneerattu 2023 laadukkailla materiaaleilla** Karhupirtti on kokenut mittavan remontin vuonna 2023, jossa on käytetty huippulaadukkaita materiaaleja: Pukkilan laatat, Kährsin lattiat, pähkinäpuiset katot, näyttävä musta keittiö ja Mielen kodinkoneet. Lopputuloksena on perinteisen hirsihuvilan tunnelman ja modernin mukavuuden täydellinen yhdistelmä. Design-takka luo lämpöä ja tunnelmaa.

**Lyömätön keskeinen sijainti** Levin aivan keskeisellä paikalla kaikki on lyhyen kävelymatkan päässä: eturinteet, Lastenmaa, supermarket, matkamuistomyymälät, ravintolat ja after-ski-paikat. Lähin moottorikelkkareitti on noin 250 metrin päässä. Paikan päällä on runsaasti parkkipaikkoja. Huvilassa on suksivarasto ja -huoltotila sekä kodinhoitohuone pyykinpesutiloineen.

**Kaikki mitä tarvitset ikimuistoiseen ryhmälomaan** Täysin varusteltu keittiö astianpesukoneella, uunilla, mikroaaltouunilla, kahvinkeittimellä, pakastimella. Sähkösauna. Design-takka. Ulkoporeamme ja grilli. Ilmastointi ja lämpöpumppu. Ilmainen WiFi, TV ja äänentoistojärjestelmä. Vauvansänky ja turvaportit saatavilla.`,
  
  },
  "skistar-211": {
    name: "Superior Suite 211 – Postintie",
    shortDescription:
      "54 m² Superior-huoneisto kahdella makuuhuoneella, saunalla ja parvekkeella. Päätyhuoneisto metsänäkymin. Esteetön. Suksivarasto telineellä ja ilmastoinnilla. Ei lemmikkejä.",
    longDescription: `**Tilava ja moderni 2 makuuhuoneen huoneisto Levin keskustassa – SkiStar-rakennus**

Tervetuloa viihtyisään lomakodin tunnelmaan Levin sydämeen! Tämä moderni 54 m²:n huoneisto suositussa SkiStar-rakennuksessa majoittaa jopa 6 vierasta ja sopii ihanteellisesti perheille tai ystäväporukoille. Ravintolat, kaupat ja palvelut ovat kävelyetäisyydellä, ja päärinteet ovat noin 700 metrin päässä.

**Viihtyisää asumista jopa 6 vieraalle** Huoneistossa on kaksi makuuhuonetta, joissa kummassakin on kaksi erillistä sänkyä, sekä vuodesohva oleskelutilassa lisämajoitusta varten. Avoimen pohjaratkaisun keittiö-olohuone tarjoaa viihtyisän tilan yhdessä kokkailuun ja rentoutumiseen laskupäivän jälkeen. Päätyhuoneistot tarjoavat metsänäkymiä ja lisää yksityisyyttä.

**Oma sauna ja käytännölliset mukavuudet** Rentoudu omassa sähkösaunassa hiihtopäivän jälkeen. Jokaisessa huoneistossa on oma kuivauskaappi, joten märät lasketteluvarusteet ja ulkoiluvaatteet ovat kuivia ja lämpimiä seuraavana aamuna. Rakennuksessa on myös jaettu pesutupa ja erillinen suksivarasto huoltotelineellä ja tuuletuksella – kaikki mitä tarvitset huolettomaan talvilomaan.

**SkiStar-rakennus — keskeinen sijainti Levillä** SkiStar-rakennus sijaitsee Levin keskustassa. Päärinteet ja eturinteen hissit ovat noin 700 metrin päässä – helppo kävelymatka tai nopea hiihto latua pitkin. Murtomaahiihdon ladut alkavat läheltä, ja kaikki ravintolat, kaupat ja after-ski-paikat ovat lyhyen kävelymatkan päässä. Paikan päällä on ilmainen pysäköinti sähköpistokkeella. Huoneistossa on esteetön kulku, mutta sitä ei ole sertifioitu täysin esteettömäksi.

**Kaikki mukana mukavaan oleskeluun** Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni ja kahvinkeitin. Oma sauna ja kylpyhuone. Oma kuivauskaappi. Parveke. Ilmainen WiFi ja TV. Vauvansänky ja syöttötuoli saatavilla perheille.`,
  
  },
  "skistar-212": {
    name: "Superior Suite 212 – Postintie",
    shortDescription:
      "54 m² Superior-huoneisto: kaksi makuuhuonetta, sauna, parveke ja lattialämmitys. Kävelymatka kaikkiin Levin palveluihin. Ei lemmikkejä.",
    longDescription: `**Tilava ja moderni 2 makuuhuoneen huoneisto Levin keskustassa – SkiStar-rakennus**

Tervetuloa viihtyisään loma-asuntoon Levin sydämessä! Tämä moderni 54 m²:n huoneisto suositussa SkiStar-rakennuksessa majoittaa jopa 6 vierasta ja on ihanteellinen perheille tai kaveriporukoille. Ravintolat, kaupat ja palvelut ovat kävelyetäisyydellä, ja päärinteet sijaitsevat noin 700 metrin päässä.

**Mukavaa asumista jopa 6 vieraalle** Huoneistossa on kaksi makuuhuonetta, joissa kummassakin on kaksi erillistä sänkyä, sekä vuodesohva oleskelutilassa lisämajoitusta varten. Avara keittiö-olohuone tarjoaa viihtyisän tilan yhdessä kokkailuun ja rentoutumiseen rinteessä vietetyn päivän jälkeen. Päätyhuoneistot tarjoavat metsänäkymän ja lisäyksityisyyttä.

**Oma sauna ja käytännölliset mukavuudet** Rentoudu omassa sähkösaunassasi laskettelupäivän jälkeen. Jokaisessa huoneistossa on oma kuivauskaappi, joten märät lasketteluvarusteet ja ulkoiluvaatteet ovat kuivia ja lämpimiä seuraavana aamuna. Rakennuksessa on myös yhteinen pyykkitupa ja erillinen suksivarasto huoltotelineineen ja ilmanvaihtoineen – kaikki mitä tarvitset vaivattomaan talvilomaan.

**SkiStar-rakennus – keskeinen sijainti Levillä** SkiStar-rakennus sijaitsee keskeisellä paikalla Levillä. Päärinteet ja eturinteiden hissit ovat noin 700 metrin päässä – helppo kävelymatka tai nopea hiihtomatka latua pitkin. Latukävelyreitit alkavat lähistöltä, ja kaikki ravintolat, kaupat ja after ski -paikat ovat lyhyen kävelymatkan päässä. Paikan päällä on ilmainen pysäköinti sähköpistokkeellä. Huoneistossa on esteetön kulku, vaikka sitä ei olekaan sertifioitu täysin esteettömäksi.

**Kaikki mukana mukavaan oleskeluun** Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni ja kahvinkeitin. Oma sauna ja kylpyhuone. Oma kuivauskaappi. Parveke. Ilmainen WiFi ja TV. Vauvansänky ja syöttötuoli saatavilla perheille.`,
  
  },
  "skistar-209": {
    name: "Levin keskusta Superior 209",
    shortDescription:
      "43 m² remontoitu yhden makuuhuoneen Superior-huoneisto saunalla. Esteetön (ei portaita). Huolellisesti suunniteltu sisustus. Ei lemmikkejä.",
    longDescription: `**Viihtyisä yhden makuuhuoneen huoneisto Levin keskustassa – SkiStar-rakennus**

Mukava ja kompakti tukikohta Levin-lomallesi. Tämä 43 m²:n huoneisto suositussa SkiStar-rakennuksessa sopii erinomaisesti pariskunnille tai pienille perheille, majoittaen jopa 4 vierasta. Sijaitsee Levin keskustassa, päähiihtorinteet ovat noin 700 metrin päässä ja kaikki palvelut kävelyetäisyydellä.

**Nykyaikainen pohjaratkaisu jopa 4 vieraalle** Tilavassa makuuhuoneessa on kaksi erillistä sänkyä, ja olohuoneessa on mukava vuodesohva 1–2 lisävieraalle. Avokeittiö-olohuone on valoisa ja kutsuva – loistava tila ruoanlaittoon, rentoutumiseen ja seuraavan päivän seikkailujen suunnitteluun.

**Oma sauna ja käytännölliset mukavuudet** Rentoudu omassa sähkösaunassa rinteillä vietetyn päivän jälkeen. Rakennuksessa on jaettu pyykkitupa ja erillinen suksivarasto huoltotelineellä ja tuuletuksella. Asunnossa on oma kuivauskaappi. Huoneistoon on esteetön kulku, vaikka sitä ei ole sertifioitu täysin esteettömäksi.

**SkiStar-rakennus – keskeinen sijainti Levillä** SkiStar-rakennus sijaitsee Levin keskustassa. Päähiihtorinteet ovat noin 700 metrin päässä – helppo kävely tai nopea hiihto latua pitkin. Murtomaahiihtoladut, ravintolat, kaupat ja after ski -paikat ovat kaikki lähistöllä. Ilmainen pysäköinti sähköpistokkeella on saatavilla paikan päällä.

**Kaikki sisältyy mukavaan oleskeluun** Täysin varusteltu keittiö astianpesukoneella, uunilla, mikroaaltouunilla, kahvinkeittimellä ja leivänpaahtimella. Oma sauna ja kylpyhuone. Parveke. Ilmainen WiFi ja televisio HDMI-liitännällä. Syöttötuoli saatavilla perheille.`,
  
  },
  "skistar-210": {
    name: "Levin keskusta Superior 210",
    shortDescription:
      "44 m² remontoitu yhden makuuhuoneen Superior-huoneisto saunalla. Esteetön (ei portaita). Matkatavaroiden jättömahdollisuus. Ei lemmikkejä.",
    longDescription: `**Viihtyisä yhden makuuhuoneen huoneisto Levin keskustassa – SkiStar-rakennus**

Mukava ja kompakti tukikohta Levillä lomailuun. Tämä 43 m²:n huoneisto suositussa SkiStar-rakennuksessa sopii mainiosti pariskunnille tai pienille perheille, majoittaen jopa 4 vierasta. Huoneisto sijaitsee Levin keskustassa, noin 700 metrin päässä päärinteistä ja kaikki palvelut ovat kävelyetäisyydellä.

**Nykyaikainen pohjaratkaisu jopa 4 hengelle** Tilavassa makuuhuoneessa on kaksi erillistä sänkyä, ja olohuoneessa on mukava vuodesohva 1–2 lisävieraalle. Avokeittiö-olohuone on valoisa ja kutsuva – loistava tila ruoanlaittoon, rentoutumiseen ja seuraavan päivän seikkailujen suunnitteluun.

**Oma sauna ja käytännölliset mukavuudet** Rentoudu omassa sähkösaunassasi päivän rinteillä vietetyn päivän jälkeen. Rakennuksessa on jaettu pesutupa ja erillinen lukollinen suksivarasto, josta löytyy myös huoltoteline ja ilmastointi. Huoneistossa on oma kuivauskaappi. Huoneistoon on esteetön kulku, vaikka se ei olekaan sertifioitu täysin esteettömäksi.

**SkiStar-rakennus – keskeinen sijainti Levillä** SkiStar-rakennus sijaitsee Levin keskustassa. Päärinteet ovat noin 700 metrin päässä – helppo kävelymatka tai nopea hiihto latua pitkin. Murtomaahiihdon reitit, ravintolat, kaupat ja après-ski-paikat ovat kaikki lähistöllä. Ilmainen pysäköinti pistorasialla on saatavilla paikan päällä.

**Kaikki mukavan oleskelun takaamiseksi** Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Oma sauna ja kylpyhuone. Parveke. Ilmainen WiFi ja televisio HDMI-liitännällä. Syöttötuoli saatavilla perheille.`,
  
  },
  "skistar-studio-102": {
    name: "Levin keskusta Studio 102 – Postintie",
    shortDescription:
      "24 m² studio Postintiellä Levin keskustassa. Rakennettu 2020. Kompaktein vaihtoehto – ei saunaa, mutta edullinen ja esteetön (ei portaita). Askelten päässä K-Marketista. Ei lemmikkejä.",
    longDescription: `**Moderni studiohuoneisto Levin keskustassa – SkiStar-rakennus**

Näppärä, tyylikäs ja täydellisellä sijainnilla. Tämä moderni 24 m²:n studio SkiStar-rakennuksessa valmistui vuonna 2020 ja tarjoaa kaiken, mitä tarvitset mukavaan Levin lomaan. Studioon majoittuu mukavasti jopa 3 aikuista tai 2 aikuisen ja 2 lapsen perhe – tehden siitä erinomaisen valinnan niin pariskunnille kuin pienille perheillekin. Päärinteet ovat noin 700 metrin päässä ja kaikki palvelut kävelyetäisyydellä.

**Kompakti ja ovelasti suunniteltu** Studiossa on kaksi sänkyä ja vuodesohva. Vuodesohva toimii hyvin nukkumapaikkana lapsille tai kolmannelle aikuiselle. 2 aikuisen ja 2 lapsen perheelle pohjaratkaisu on ihanteellinen – lapset vuodesohvalla, vanhemmat pääsängyissä. Täysin varustellussa keittiössä on kaikki kotityyliseen ruoanlaittoon: astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Huolellisesti valittu sisustus upeine laatoitettuine tehosteseinineen tuo ripauksen Lapin tunnelmaa lomaanne.

**Kuivauskaappi ja käytännölliset tilat** Huoneistossa on oma kuivauskaappi talvivaatteita ja suksivarusteita varten – kaikki on kuivaa ja lämmintä aamuun mennessä. Rakennuksessa on myös jaettu pesutupa kuivausrummulla sekä erillinen suksivarasto huoltotelineineen ja ilmanvaihdolla. Huoneistoon on esteetön kulku, vaikka sitä ei ole sertifioitu täysin esteettömäksi.

**SkiStar-rakennus – keskeinen sijainti Levillä** SkiStar-rakennus sijaitsee Levin keskustassa. Päärinteet ovat noin 700 metrin päässä – helppo kävelymatka tai nopea hiihto latua pitkin. Murtomaahiihdon ladut, ravintolat, kaupat ja afterski-paikat ovat kaikki lähistöllä. Ilmainen pysäköinti sähköpistokkeella on saatavilla paikan päällä.

**Kaikki mukavaan oleskeluun sisältyy** Täysin varusteltu keittiö astianpesukoneella, uunilla, mikroaaltouunilla, kahvinkeittimellä ja leivänpaahtimella. Oma kuivauskaappi. Suihku ja kylpyhuone. Ilmainen WiFi ja TV. Tarjolla shampoo ja vartalosaippua. Pinnasänky saatavilla pyynnöstä.

**Huomaathan:** Tässä huoneistossa ei ole omaa saunaa. Jos oma sauna on tärkeä lomallesi, tutustu 28 m²:n studiohuoneistoihimme, joissa on sauna – esimerkiksi Studio 104 saunalla.

Useat rakennuksen studiohuoneistoista ovat samankaltaisia ​​pienin sisustuseroin. Joissakin huoneistoissa on pyykinpesukone.`,
  
  },
  "skistar-studio-104": {
    name: "Skistar Superior Studio 104 saunalla",
    shortDescription:
      "28 m² Superior-studio omalla saunalla Postintiellä. Rakennettu 2020. Laatoitettu tehosteseinä, lattialämmitys. Täysin varusteltu keittiö astianpesukoneella. Esteetön. Ei lemmikkejä.",
    longDescription: `**Moderni yksiö saunalla Levin keskustassa – SkiStar-rakennus**

Fiksu, tyylikäs ja täydellisellä sijainnilla. Tämä moderni, vuonna 2020 valmistunut 28 m²:n yksiö SkiStar-rakennuksessa tarjoaa kaiken, mitä tarvitset mukavaan Levin-lomaan. Yksiöön majoittuu mukavasti jopa 3 aikuista tai 2 aikuisen ja 2 lapsen perhe – erinomainen valinta niin pariskunnille kuin pienille perheillekin. Päärinteet ovat noin 700 metrin päässä, ja kaikki palvelut ovat kävelyetäisyydellä.

**Kompakti ja nerokkaasti suunniteltu** Yksiössä on kaksi sänkyä ja vuodesohva. Vuodesohva sopii hyvin lasten tai kolmannen aikuisen nukkumapaikaksi. Kahden aikuisen ja kahden lapsen perheelle pohjaratkaisu on ihanteellinen — lapset vuodesohvalla, vanhemmat pääsängyissä. Täysin varustellussa keittiössä on kaikki kodinomaiseen ruoanlaittoon: astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Huolellisesti valittu sisustus upeine laatoitettuine tehosteseinineen tuo ripauksen Lapin tunnelmaa lomaasi.

**Oma sauna, kuivauskaappi ja käytännölliset tilat** Oman sähkösaunan lämmössä on täydellistä rentoutua päivän päätteeksi rinteiden tai reittien jälkeen. Asunnossa on oma kuivauskaappi talvivaatteita ja suksivarusteita varten — kaikki on kuivaa ja lämmintä aamuksi. Rakennuksessa on myös jaettu pesutupa kuivausrummun kera sekä erillinen suksivarasto huoltotelineineen ja ilmanvaihdolla.

**SkiStar-rakennus – keskeinen sijainti Levillä** SkiStar-rakennus sijaitsee keskeisellä paikalla Levillä. Päärinteet ovat noin 700 metrin päässä — helppo lyhyt kävelymatka tai nopea hiihto reittiä pitkin. Murtomaahiihtoladut, ravintolat, kaupat ja after ski -paikat ovat kaikki lähistöllä. Ilmainen pysäköinti sähköpistokkeella on saatavilla paikan päällä.

**Kaikki sisältyy mukavaan oleskeluun** Täysin varusteltu keittiö astianpesukoneella, uunilla, mikroaaltouunilla, kahvinkeittimellä ja leivänpaahtimella. Oma sauna. Oma kuivauskaappi. Ilmainen WiFi ja TV. Shampoo ja vartalosaippua sisältyvät. Lastensänky saatavilla pyynnöstä.

**Huomaa:** Rakennuksessa on useita samanlaisia yksiöitä, joissa on pieniä eroja sisustuksessa. Joissakin huoneistoissa on pyykinpesukone.`,
  
  },
  "skistar-studio-319": {
    name: "Levin keskusta Superior Studio 319",
    shortDescription:
      "28 m² Superior-studio omalla saunalla Skistar-rakennuksessa Postintiellä. Pesukone huoneistossa, kuivauskaappi. Askelten päässä K-Marketista. Noin 600 m rinteille. Ei lemmikkejä.",
    longDescription: `**Majoitus ja pohjaratkaisu**
Jokaisessa studiossa on yhdistetty oleskelu- ja makuutila:

**Varustelu ja mukavuudet**
Huoneistot on täysin varustettu huoletonta lomaa varten: keittiö kodinkoneineen ja astioineen, peitot ja tyynyt kaikille asukkaille sekä tietysti oma sauna – Lapin loman kohokohta.

**Sisustus ja tunnelma**
Sisustus on suunniteltu mukavuutta ja käytännöllisyyttä silmällä pitäen. Valaistus ja materiaalit luovat lämpimän ja kodikkaan tunnelman – täydellinen rentouttavaan iltaan toiminnantäyteisen päivän jälkeen.

**Paras sijainti Levin keskustassa**
Kaikki Levin ravintolat, kahvilat, kaupat, laskettelurinteet ja hiihtoladut ovat kävelyetäisyydellä. Keskeisestä sijainnista huolimatta huoneistot tarjoavat rauhallisen ja mukavan ympäristön.

**Tervetuloa Skistar Studiosiin** – täydellinen valinta pariskunnille tai pienille ryhmille, jotka haluavat kaikki tarvittavat palvelut sekä oman saunan Levin parhaalla paikalla.`,
  
  },
  "skistar-studio-320": {
    name: "Levin keskusta Studio 320",
    shortDescription:
      "28 m² studio saunalla Skistar-rakennuksessa Postintiellä. Lattialämmitys. Askelten päässä K-Marketista. Ei lemmikkejä.",
    longDescription: `**Moderni yksiö saunalla Levin keskustassa – SkiStar-rakennus**

Näppärä, tyylikäs ja täydellisellä sijainnilla. Tämä moderni 28 m²:n yksiö SkiStar-talossa on valmistunut vuonna 2020 ja tarjoaa kaiken, mitä tarvitset mukavaan Levin-lomaan. Yksiöön mahtuu mukavasti jopa 3 aikuista tai 2 aikuisen ja 2 lapsen perhe – tehden siitä erinomaisen valinnan niin pariskunnille kuin pienille perheillekin. Päärinteet ovat noin 700 metrin päässä ja kaikki palvelut ovat kävelyetäisyydellä.

**Kompakti ja älykkäästi suunniteltu** Yksiössä on kaksi sänkyä ja vuodesohva. Vuodesohva toimii hyvin nukkumispaikkana lapsille tai kolmannelle aikuiselle. 2 aikuisen ja 2 lapsen perheelle pohjaratkaisu on ihanteellinen – lapset vuodesohvalla, vanhemmat parisängyissä. Täysin varustellussa keittiössä on kaikki kotityyliseen ruoanlaittoon: astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Huolellisesti valittu sisustus upealla laattaseinällä tuo ripauksen Lapin tunnelmaa lomaanne.

**Oma sauna, kuivauskaappi ja käytännölliset mukavuudet** Oma sähkösauna on täydellinen tapa päättää päivä rinteillä tai laduilla. Huoneistossa on oma kuivauskaappi talvivaatteille ja suksivarusteille – kaikki on kuivaa ja lämmintä aamuun mennessä. Rakennuksessa on myös jaettu pesutupa kuivausrummulla sekä erillinen suksivarasto huoltotelineellä ja tuuletuksella.

**SkiStar-rakennus – keskeinen sijainti Levillä** SkiStar-rakennus sijaitsee keskeisellä paikalla Levillä. Päärinteet ovat noin 700 metrin päässä – helppo kävelymatka tai nopea hiihto ladun varrella. Hiihtoladut, ravintolat, kaupat ja after ski -paikat ovat kaikki lähistöllä. Ilmainen pysäköinti sähköpistokkeella on saatavilla paikan päällä.

**Kaikki mukavan loman takaamiseksi** Täysin varusteltu keittiö astianpesukoneella, uunilla, mikroaaltouunilla, kahvinkeittimellä ja leivänpaahtimella. Oma sauna. Oma kuivauskaappi. Ilmainen WiFi ja TV. Shampoo ja vartalosaippua tarjolla. Pinnasänky saatavilla pyynnöstä.

**Huom:** Rakennuksessa on useita samanlaisia studiohuoneistoja pienin sisustuksellisin eroavaisuuksin. Joidenkin huoneistojen varustukseen kuuluu myös pesukone.`,
  
  },
  "skistar-studio-321": {
    name: "Levin keskusta Studio 321",
    shortDescription:
      "28 m² studio saunalla Skistar-rakennuksessa Postintiellä. Lattialämmitys. Askelten päässä K-Marketista. Noin 600 m rinteille. Ei lemmikkejä.",
    longDescription: `**Moderni yksiö saunalla Levin keskustassa – SkiStar-rakennus**

Älykäs, tyylikäs ja täydellisellä sijainnilla. Tämä moderni 28 m²:n yksiö SkiStar-rakennuksessa valmistui vuonna 2020 ja tarjoaa kaiken, mitä tarvitset mukavaan Levin lomaan. Yksiöön mahtuu mukavasti jopa 3 aikuista tai perhe, jossa on 2 aikuista ja 2 lasta – mikä tekee siitä erinomaisen valinnan niin pariskunnille kuin pienille perheillekin. Päärinteet ovat noin 700 metrin päässä ja kaikki palvelut kävelyetäisyydellä.

**Kompakti ja nerokkaasti suunniteltu** Yksiössä on kaksi sänkyä ja vuodesohva. Vuodesohva toimii hyvin lasten tai kolmannen aikuisen nukkumapaikkana. 2 aikuisen ja 2 lapsen perheelle pohjaratkaisu on ihanteellinen – lapset vuodesohvalla, vanhemmat parisängyissä. Täysin varustellussa keittiössä on kaikki kotikokkaamiseen: astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Huolella valittu sisustus upeine laatoitettuine tehosteseinäineen tuo ripaus Lapin tunnelmaa lomaanne.

**Oma sauna, kuivauskaappi ja käytännölliset tilat** Oman sähkösaunan löylyt ovat täydellinen tapa päättää päivä rinteillä tai poluilla. Asunnossa on oma kuivauskaappi talvivaatteita ja suksivarusteita varten – kaikki on kuivaa ja lämmintä aamuun mennessä. Rakennuksessa on myös jaettu pesutupa kuivausrummulla sekä erillinen suksivarasto huoltotelineineen ja ilmanvaihdolla.

**SkiStar-rakennus – keskeinen sijainti Levillä** SkiStar-rakennus sijaitsee keskeisellä paikalla Levillä. Päärinteet ovat noin 700 metrin päässä – helppo kävely tai nopea hiihto latua pitkin. Murtomaahiihtoladut, ravintolat, kaupat ja after ski -paikat ovat kaikki lähistöllä. Ilmainen pysäköinti sähköpistokkeella on saatavilla paikan päällä.

**Kaikki sisältyy mukavaan oleskeluun** Täysin varusteltu keittiö astianpesukoneella, uunilla, mikroaaltouunilla, kahvinkeittimellä ja leivänpaahtimella. Oma sauna. Oma kuivauskaappi. Ilmainen WiFi ja TV. Shampoo ja suihkusaippua tarjolla. Lastensänky saatavilla pyynnöstä.

**Huomaa:** Rakennuksessa on useita samanlaisia yksiöitä pienillä eroilla sisustuksessa. Joissakin asunnoissa on pesukone.`,
  
  },
  "karhunvartija-3": {
    name: "Karhunvartija 3 – keskustahuoneisto",
    shortDescription:
      "42 m² huoneisto kahdella makuuhuoneella, luonnonkivitakalla, omalla saunalla ja aidatulla pihalla. Oma sisäänkäynti Ratsastajankujalta. Takkapuut ja loppusiivous sisältyvät. Lemmikit sallittu.",
    longDescription: `Tämä viihtyisä ja hyvin varusteltu huoneisto sijaitsee aivan Levin keskustassa, arkkitehtonisesti vaikuttavan Karhunvartija-rakennuksen 2B puolella. Sijainti ei voisi olla parempi – kaikki Levin ravintolat, kaupat ja aktiviteetit ovat kävelyetäisyydellä, ja niin laskettelurinteet kuin hiihtoladutkin alkavat vain lyhyen kävelymatkan päästä ovelta.

42 m²:n huoneisto on yhdessä tasossa ja tarjoaa miellyttävät puitteet jopa neljälle vieraalle. Siinä on eteinen, avoin oleskelutila keittiöllä, kaksi makuuhuonetta (toisessa makuuhuoneessa vuodesohva kahdelle), kylpyhuone, erillinen wc ja oma sauna. Luonnonkivitakka luo lämpimän ja kutsuvan tunnelman, ja huoneistolla on oma sisäänkäynti Ratsastajankujalta.

Täällä majoittuminen on erityisen helppoa lasten kanssa – sisäänkäynti johtaa suoraan ulos, ja talolla on oma piha, jossa lapset voivat turvallisesti leikkiä lumessa. Kaikki on lähellä: laskettelurinteet, ladut, leikkikentät ja kaikki Levin keskustan palvelut. Autoa ei tarvita loman aikana, sillä koko perhe voi helposti kävellä kaikkialle, päiväsaikaan aktiviteeteista iltamenoon.

Tässä huoneistossa yhdistyvät Lapin tunnelma, Levin keskustan mukavuudet ja vaivaton viihtyisyys – täydellinen valinta rentoon lomaan Levin parhaalla paikalla.`,
  
  },
  "levi-platinum-a2": {
    name: "Levi Platinum Superior Studio A2",
    shortDescription:
      "37 m² Platinum-tason studio, avattu 2023 – uusin huoneistomme. Etelärinteen juurella. Pesukone, kuivauskaappi, lattialämmitys. Ei lemmikkejä.",
    longDescription: `Upea Levi Platinum Studio -huoneisto sijaitsee aivan Levin keskustassa, eturinteen juurella. Asunnosta on lyhyt matka kaikkialle Leville ja pihalla on oma pysäköintipaikka. Huoneisto on uusi (avattu 2023) ja hyvin varusteltu onnistunutta lomaanne varten.

Asunnossa on täysi kodinomainen varustus, ruoanlaitto ja oleskelu onnistuu aivan kuten kotonakin.`,
  
  },
  "moonlight-415": {
    name: "Moonlight 415 – studiohuoneisto",
    shortDescription:
      "28 m² loft-studio Hullu Poro -hotellin vieressä. Yläkerrassa 3 loft-vuodetta (jyrkät portaat) + vuodesohva. Oma sauna. Noin 400 m rinteille ja latuverkostolle. 150 m kauppaan. Ei lemmikkejä.",
    longDescription: `**Moonlight Studio saunalla ja parvilla – Hullu Poron vieressä Levin keskustassa**

Ainutlaatuinen yksiö yhdessä Levin parhaista sijainneista – aivan legendaarisen Hullu Poro -hotellin vieressä, kylän sydämessä. Tämä 28 m²:n huoneisto tarjoaa parven kolmelle pedille ja vuodesohvan alakerrassa, majoittaen jopa 4 vierasta. Täysin remontoitu ja uudelleen kalustettu vuonna 2026 näyttävällä hirsiseinällä, joka antaa asunnolle lämpimän, aidon lappilaisen luonteen. Laskettelurinteet, hiihtoladut ja pulkkamäki ovat kaikki vain muutaman askeleen päässä, ja lähin kauppa on vain 150 metrin päässä ovelta. Katso kuvat saadaksesi tarkemman kuvan sisustuksesta.

**Parvivuoteet ja viihtyisä oleskelutila** Asunnossa on nerokas pohjaratkaisu, jossa on makuuparvi kolmelle hengelle ja vuodesohva oleskelutilassa lisävierasta varten. Alakerrasta löydät ruokapöydän, sohvan ja hyvin varustellun minikeittiön, jossa on astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Vuoden 2026 remontti toi kaikki uudet huonekalut ja raikkaan, modernin ilmeen – täydennettynä kauniilla paljaalla hirsiseinällä, joka luo tunnelmaa. Huomaa, että portaat parvelle ovat jyrkät. Lapsille on asennettu turvaportti. Portaat voivat olla haastavat ikääntyneille vieraille.

**Oma sauna, pesukone ja kuivauskaappi** Asunnossa on oma sauna, pesukone ja kuivauskaappi – kaikki yhdessä kompaktissa paketissa. Päivän rinteillä vietetyn jälkeen kuivaa varusteesi yön yli ja pidä kaikki lämpimänä ja valmiina aamuksi. Rakennuksessa on myös suksivarasto ja huoltotila.

**Erinomainen sijainti Levin sydämessä** Et voisi olla keskeisemmällä paikalla. Hullu Poro, Levin tunnetuin viihdepaikka, on aivan vieressä. Laskettelurinteet ja hiihtoladut alkavat kävelymatkan päästä, ja pulkkamäki kulkee rakennuksen ohi. Kauppa on 150 metrin päässä. Yksi pysäköintipaikka lämmityspistokkeella sisältyy hintaan.

**Kaikki mukavan oleskelun edellytykset sisältyvät hintaan** Minikeittiö astianpesukoneella, uunilla, mikroaaltouunilla, kahvinkeittimellä ja leivänpaahtimella. Oma sauna. Oma pesukone ja kuivauskaappi. Ilmainen WiFi ja TV. Liinavaatteet ja pyyhkeet saatavilla lisäpalveluna, tai voit tuoda omasi.`,
  
  },
  "glacier-a1": {
    name: "Levi Glacier A1 – alppihuoneisto",
    shortDescription:
      "92 m² perinteinen alppihuoneisto Eturinteen juurella, Zero Point -alueella. 4 makuuhuonetta. Katutaso + kellari helpolla ulkoyhteydellä. Lämmin suksivarasto. Lasten leikkihuone rakennuksessa. Lemmikit sallittu.",
    longDescription: `**Tilava 92 m² tunturihuoneisto Levin eturinteellä – 4 makuuhuonetta**

Yksi kokoelmamme suurimmista ja rinteiden lähellä sijaitsevista huoneistoista. Tämä klassinen 92 m²:n tunturihuoneisto sijaitsee Levin eturinteen juurella, vain 200 m Glacier Express -tuolihissiltä. 4 makuuhuonetta jopa 8 hengelle – ihanteellinen perheille, kaveriporukoille tai urheilujoukkueille. Lemmikit ovat tervetulleita.

**Tilaa 8 vieraalle kahdessa kerroksessa** Neljä makuuhuonetta kahdeksalla vuoteella. Huoneisto jakautuu kahteen kerrokseen: pääasialliset asuintilat katutasossa, alakerta suoralla uloskäynnillä ja suksihuoltotilalla. Ovelle on vain yksi askelma. Tilava keittiö-olohuone yhteisiä aterioita ja iltoja varten.

**Sauna, suksivarasto ja täydelliset mukavuudet** Oma sauna, pesukone ja kuivauskaappi sisältyvät hintaan. Jokaisessa huoneistossa on oma suksivarasto etuoven vieressä sekä pääsy jaettuun lämmitettyyn suksihuoltotilaan. Täysin varusteltu keittiö kattaen kaiken mukavaan asumiseen.

**200 m rinteistä** Eturinne ja Glacier Express -hissi ovat aivan vieressäsi. Hiihtoladut kulkevat läheltä. Kaikki ravintolat, kaupat ja palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Tunturitunnelmaa edulliseen hintaan** Rakennettu vuonna 2000 ja päivitetty vuosien varrella. Perinteinen tunturihuoneisto Levin parhaalla paikalla ilman lisähintaa. Mainio pidempiin oleskeluihin.

**Mukavuudet:** Täysin varusteltu keittiö, pesukone, oma sauna, kuivauskaappi, suksisäilytys, WiFi, TV, radio. Lemmikit ovat tervetulleita.

**Lisää huoneistoja** **Leville.net** **-sivustolta** **:** 🏔 100 m² Penthouse – rinnesäkymät, 4 makuuhuonetta 🏔 65 m² Tunturihuoneisto – takka, kuivaushuone 🏢 54 m² SkiStar 2-h – moderni, keskeinen 🏢 28 m² Studio saunalla 🏡 220 m² Bear Lodge – hirsimökki, poreallas, 14 henkeä

Suunnittele lomasi: Hiihto | Reitit | Revontulet | Matkaopas`,
  
  },
  "glacier-a2": {
    name: "Levi Glacier A2 – alppihuoneisto",
    shortDescription:
      "67 m² huoneisto kolmella makuuhuoneella Eturinteen juurella, Zero Point -alueella. Koko huoneiston levyinen parveke. 5 vuodetta + vuodesohva. Lemmikit sallittu.",
    longDescription: `**Levi Glacier Apartments – Perinteinen 67 m²:n alppihuoneisto eturinteellä**

Klassista alppioloa aivan tapahtumien ytimessä. Tämä 67 m²:n huoneisto sijaitsee Levin eturinteen juurella, vain 200 metrin päässä Glacier Express -tuolihissistä. Kolmella makuuhuoneella ja tilalla jopa 6 hengelle se on loistava keskikokoinen vaihtoehto perheille tai ryhmille, jotka haluavat olla mahdollisimman lähellä rinteitä. Lemmikit ovat tervetulleita.

**3 makuuhuonetta kahdessa tasossa** Viisi vuodetta kolmessa makuuhuoneessa sekä vuodesohva, joka sopii yhdelle aikuiselle tai kahdelle lapselle. Huoneisto jakautuu kahteen tasoon: päätasolla asuintilat katutasolla, alakerrassa suora pääsy ulos ja reitti suksihuoltotilaan. Oven edessä on vain yksi askelma. Täysleveä parveke avautuu kadulle, tarjoten sinulle eturivin paikan Levin kylän elämään.

**Sauna, suksivarasto ja täydet mukavuudet** Oma sauna rentoutumiseen päivän laskettelun jälkeen. Jokaisessa huoneistossa on oma suksivarasto etuoven vieressä, sekä pääsy jaettuun lämpimään suksihuoltotilaan. Pesukone ja kuivauskaappi sisältyvät hintaan. Täysin varusteltu keittiö, jossa kaikki tarvittava mukavaan oleskeluun.

**200 m rinteiltä** Eturinne ja Glacier Express -hissi ovat käytännössä oven edessä. Latupolut kulkevat läheltä. Kaikki ravintolat, kaupat ja palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Alppitunnelmaa, edullinen hinta** Rakennettu vuonna 2000 ja vuosien varrella päivitetty. Perinteinen alppihuoneisto Levin parhaalla paikalla ilman korkeaa hintalappua. Täydellinen perheille ja ryhmille, jotka haluavat tilaa ja aidon hiihtolomailmapiirin.

**Mukavuudet:** Täysin varusteltu keittiö, pesukone, oma sauna, kuivauskaappi, suksivarasto, täysleveä parveke, WiFi, TV. Lemmikit ovat tervetulleita.

**Tarvitsetko lisää tilaa?** Tutustu 92 m²:n Glacier-huoneistoon, jossa on 4 makuuhuonetta 8 vieraalle samassa rakennuksessa.

**Lisää huoneistoja osoitteesta** **Leville.net** **:** 🏔 100 m² Penthouse — rinne näkymät, 4 makuuhuonetta 🏔 65 m² Alpine — takka, kuivaushuone 🏢 54 m² SkiStar 2 makuuhuonetta — moderni, keskeinen 🏢 28 m² Studio saunalla 🏡 220 m² Bear Lodge — hirsimökki, poreallas, 14 henkeä

Suunnittele lomasi: Laskettelu | Reitit | Revontulet | Matkaopas`,
  
  },
  "glacier-a3": {
    name: "Levi Glacier A3 – alppihuoneisto",
    shortDescription:
      "92 m² alppihuoneisto neljällä makuuhuoneella. Sama rakennus kuin A1. Katutaso + kellari. Askelten päässä tuolihissistä. Lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**Tilava 92 m² alppihuoneisto Levin eturinteessä – 4 makuuhuonetta**

Yksi kokoelmamme suurimmista ja rinteitä lähinnä sijaitsevista huoneistoista. Tämä klassinen 92 m² alppihuoneisto sijaitsee Levin eturinteen juurella, vain 200 metrin päässä Glacier Express -tuolihissistä. Neljä makuuhuonetta jopa kahdeksalle vieraalle – ihanteellinen perheille, kaveriporukoille tai urheilujoukkueille. Lemmikit ovat tervetulleita.

**Tilaa kahdeksalle hengelle kahdessa kerroksessa** Neljä makuuhuonetta kahdeksalla vuoteella. Huoneisto jakautuu kahteen tasoon: oleskelutilat katutasossa, alakerrassa suora uloskäynti ja suksihuoltotila. Vain yksi askel ovesta sisään. Tilava keittiö-olohuone yhteisille aterioille ja iltojenviettoon.

**Sauna, suksivarasto ja täydelliset mukavuudet** Huoneistoon kuuluu oma sauna, pesukone ja kuivauskaappi. Jokaisella huoneistolla on oma suksivarasto etuoven vieressä sekä pääsy jaettuun lämmitettyyn suksihuoltotilaan. Täysin varusteltu keittiö kaikella, mitä tarvitset mukavaan asumiseen.

**200 m rinteistä** Eturinne ja Glacier Express -hissi ovat aivan nurkan takana. Hiihtoladut kulkevat lähistöltä. Kaikki ravintolat, kaupat ja palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Alppitunnelmaa edulliseen hintaan** Rakennettu vuonna 2000 ja vuosien varrella päivitetty. Perinteinen alppihuoneisto Levin parhaalla paikalla ilman korkeampaa hintaa. Sopii erinomaisesti pidempiin oleskeluihin.

**Mukavuudet:** Täysin varusteltu keittiö, pesukone, oma sauna, kuivauskaappi, suksisäilytys, WiFi, TV, radio. Lemmikit ovat tervetulleita.

**Lisää huoneistoja osoitteesta ** **Leville.net** **:** 🏔 100 m² Penthouse – rinnesäkymät, 4 makuuhuonetta 🏔 65 m² Alppihuoneisto – takka, kuivaushuone 🏢 54 m² SkiStar 2 makuuhuonetta – moderni, keskeinen 🏢 28 m² Studio saunalla 🏡 220 m² Bear Lodge – hirsimökki, poreallas, 14 henkeä

Suunnittele lomasi: Hiihto | Reitit | Revontulet | Matkaopas`,
  
  },
  "glacier-a4": {
    name: "Levi Glacier A4 – alppihuoneisto",
    shortDescription:
      "72 m² toisen kerroksen huoneisto, 2 makuuhuonetta + 2 alkovipaikkaa yläkerrassa. Parveke Eturinteelle päin. Etelärinteen juurella. Lemmikit sallittu.",
    longDescription: `**Levi Glacier Apartments – 72 m² Alppihuoneisto parvellisilla makuualkoveilla ja areenanäköalalla**

Toisen kerroksen alppihuoneisto uniikilla pohjaratkaisulla ja näkymällä Hullu Poro Areenalle päin. Tässä 72 m² huoneistossa Levin eturinteen juurella on 2 makuuhuonetta sekä avonaiset parve-makuualkovit yläkerrassa, majoittaen jopa 6 vierasta. Vain 200 m Glacier Express -tuolihissiltä. Lemmikit ovat tervetulleita.

**2 makuuhuonetta + parve-makuualkovit 6 vieraalle** Kaksi makuuhuonetta alakerrassa neljällä sängyllä, plus kaksi lisäsänkyä avoimissa alkovipaikoissa yläkerrassa – pohjaratkaisu, josta perheet ja lapset pitävät. Täysleveä parveke avautuu kadulle ja Hullu Poro Areenalle, ja yläkerran makuuhuoneessa on oma parveke samaan suuntaan. Erinomainen paikka seurata Levin iltaelämää yläilmoista.

**Sauna, suksivarasto ja pelihuone** Oma sauna rentoutumiseen laskettelun jälkeen. Jokaisessa huoneistossa on oma suksikaappi oven vieressä, sekä pääsy jaettuun lämpimään suksenhuoltotilaan. Rakennuksessa on myös yhteiskäytössä oleva pelihuone ilmakiekkopöydällä – hitti perheille ja ryhmille lumisina iltoina.

**200 m rinteistä** Eturinne ja Glacier Express -hissi ovat käytännöllisesti katsoen kotiovella. Maastohiihtoladut kulkevat lähistöllä. Kaikki ravintolat, kaupat ja palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Alppitunnelmaa, edulliseen hintaan** Rakennettu vuonna 2000 ja päivitetty vuosien varrella. Perinteinen alppihuoneisto Levin parhaalla sijainnilla ilman korkeaa hintaa. Loppusiivous sisältyy varauksen hintaan.

**Mukavuudet:** Täysin varusteltu keittiö, oma sauna, suksivarasto, pelihuone ilmakiekolla, parvekkeet kahdessa tasossa, WiFi, TV. Lemmikit sallittuja.

67 m² ja 3 makuuhuonetta 6 vieraalle — samankokoinen, erilainen pohjaratkaisu

**Lisää huoneistoja osoitteesta ** **Leville.net** **:** 🏔 100 m² Kattohuoneisto — rinne-näkymät, 3 parveketta 🏢 54 m² SkiStar 2-makuuhuonetta — moderni, keskeisellä paikalla 🏡 220 m² Bear Lodge — hirsitalo, poreallas, 14 henkeä

Suunnittele lomasi: Laskettelu | Reitit | Revontulet | Matkaopas`,
  
  },
  "glacier-a5-penthouse": {
    name: "Levi Glacier Penthouse A5",
    shortDescription:
      "84 m² penthouse neljällä makuuhuoneella. Toinen kerros parvekkeella + yläkerran makuuhuoneen parveke. Etelärinteen juurella. Lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**Levi Glacier Penthouse – Tilava 84 m²:n kattohuoneisto**

Glacier-rakennuksen suurin kattohuoneisto. Tämä 84 m²:n penthouse sijaitsee ylimmässä kerroksessa ja sen parvekkeilta avautuu näkymä Hullu Poro Arenalle, vain 200 metrin päässä eturinteestä ja Glacier Express -tuolihissistä. Neljä makuuhuonetta kahdeksalla vuoteella tekevät siitä ihanteellisen suuremmille perheille, kahdelle perheelle tai ystäväporukoille. Myös lemmikit ovat tervetulleita.

**4 makuuhuonetta jopa 8 hengelle** Kaikissa neljässä makuuhuoneessa on kaksi vuodetta, jotka voidaan erottaa tai työntää yhteen tarpeidesi mukaan – joustavaa pariskunnille, perheille tai ryhmille. Ylemmän kerroksen sijainti antaa asunnolle tilavan, ilmavan tunteen. Kaksi parveketta avautuu kadulle ja Hullu Poro Arenan suuntaan, tarjoten näkymän Levin kylän vilkkaalle elämälle.

**Sauna, suksivarasto ja pelihuone** Oma sauna päättääksesi päivän täydellisesti. Jokaisella huoneistolla on oma suksivarasto oven vieressä, sekä pääsy jaetulle lämpimälle suksihuoltotilalle. Rakennuksessa on yhteinen pelihuone, jossa on ilmakiekko ja muita aktiviteetteja – loistavaa viihdettä perheille ja ryhmille talvi-iltana.

**200 m rinteistä** Eturinne ja Glacier Express -hissi ovat aivan kotiovellasi. Maastohiihtoladut ovat lähellä. Kaikki ravintolat, kaupat ja après-ski ovat kävelymatkan päässä. Ilmainen pysäköinti paikan päällä.

**Alppitunnelmaa, kohtuulliseen hintaan** Rakennettu vuonna 2000 ja vuosien mittaan päivitetty. Perinteistä alppielämää Levin parhaalla paikalla rehelliseen hintaan.

**Mukavuudet:** Täysin varusteltu keittiö, oma sauna, suksivarasto, pelihuone, parvekkeet kahdessa tasossa, WiFi, TV. Lemmikit ovat tervetulleita.

**Lisää asuntoja ** **Leville.net** **:** 🏔 100 m² Penthouse – rinnetärnäköala, 3 parveketta 🏢 54 m² SkiStar 2-h – moderni, 700 m rinteistä 🏡 220 m²

Suunnittele lomasi: Hiihto | Reitit | Revontulet | Matkaopas`,
  
  },
  "glacier-a6": {
    name: "Levi Glacier A6 – alppihuoneisto",
    shortDescription:
      "72 m² toisen kerroksen huoneisto, 2 makuuhuonetta + 2 alkovipaikkaa yläkerrassa. Parveke kadulle. Sama pohjaratkaisu kuin A4. Lemmikit sallittu.",
    longDescription: `**Levi Glacier Apartments – 72 m² alppiasunto parvellisilla alkovilla ja näkymillä Areenalle**

Toisen kerroksen alppiasunto ainutlaatuisella pohjaratkaisulla ja näkymällä Hullu Poro Areenalle päin. Tässä 72 m² asunnossa Levin eturinteen juurella on 2 makuuhuonetta ja avoimet parvelliset alkovit yläkerrassa, ja se sopii jopa 6 hengelle. Vain 200 m Glacier Express -tuolihissistä. Lemmikkieläimet ovat tervetulleita.

**2 makuuhuonetta + parvelliset alkovit 6 hengelle** Kaksi makuuhuonetta alakerrassa 4 vuoteella, sekä kaksi lisävuodetta avoimissa alkovissa yläkerrassa – pohjaratkaisu, josta lapset pitävät. Täyskorkea parveke avautuu kadulle ja Hullu Poro Areenalle, ja yläkerran makuuhuoneessa on oma parveke samaan suuntaan. Erinomainen paikka seurata Levin iltaelämää ylhäältä.

**Sauna, suksivarasto ja pelihuone** Yksityinen sauna rentoutumiseen hiihtopäivän jälkeen. Jokaisessa asunnossa on oma suksivarasto oven vieressä, sekä pääsy jaettuun lämmitettyyn suksihuoltotilaan. Rakennuksessa on myös yhteinen pelihuone ilmakiekkopöydällä – hitti perheiden ja ryhmien keskuudessa lumisina iltoina.

**200 m rinteistä** Eturinne ja Glacier Express -hissi ovat käytännössä oven edessä. Hiihtoladut kulkevat lähistöllä. Kaikki ravintolat, kaupat ja palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Alppitunnelmaa edulliseen hintaan** Rakennettu vuonna 2000 ja vuosien mittaan päivitetty. Perinteinen alppiasunto Levin parhaalla paikalla ilman premium-hintaa. Loppusiivous sisältyy varauksen hintaan.

**Mukavuudet:** Täysin varusteltu keittiö, oma sauna, suksivarasto, pelihuone ilmakiekkopöydällä, parvekkeet kahdessa kerroksessa, WiFi, TV. Lemmikkieläimet ovat tervetulleita.

67 m² ja 3 makuuhuonetta 6 hengelle – samankokoinen, erilainen pohjaratkaisu.

**Lisää asuntoja osoitteesta** **Leville.net** **:** 🏔 100 m² Kattohuoneisto – rinnekuvat, 3 parveketta 🏢 54 m² SkiStar 2 makuuhuonetta – moderni, keskeinen 🏡 220 m² Bear Lodge – hirsimökki, poreallas, 14 henkeä

Suunnittele lomasi: Hiihto | Reitit | Revontulet | Matkaopas`,
  
  },
  "glacier-b1": {
    name: "Levi Glacier B1 – alppihuoneisto",
    shortDescription:
      "105 m² ensimmäisen kerroksen huoneisto viidellä makuuhuoneella (kussakin 2 vuodetta). Koko huoneiston levyinen parveke Eturinteelle. Lasten leikkihuone. Liinavaatteet lisäpalveluna. Lemmikit sallittu.",
    longDescription: `**Levi Glacier Apartments B1 – 105 m², 5 makuuhuonetta 10 vieraalle Eturinteellä**

Suurin huoneisto Glacier-rakennuksessa ja yksi parhaista ryhmämajoituksista Levin rinteiden lähellä. Tässä 105 m²:n huoneistossa on 5 makuuhuonetta 10 vuoteella, täysleveä parveke, ja se sijaitsee vain 200 m Glacier Express -tuolihissiltä. Täydellinen suurille perheille, urheilujoukkueille tai kaveriporukoille, jotka haluavat tilaa, mukavuutta ja parhaan mahdollisen sijainnin. Lemmikit ovat tervetulleita.

**Huomaa:** Meillä on kaksi identtistä 105 m²:n huoneistoa (B1 ja B2) samassa rakennuksessa. Jos tämä on varattu, tarkista saatavuus huoneisto B2:lle – tai varaa molemmat jopa 20 hengen ryhmälle!

**5 makuuhuonetta jopa 10 vieraalle** Viisi erillistä makuuhuonetta, jokaisessa kaksi vuodetta – jokainen saa oman tilansa ja yksityisyytensä. Huoneisto sijaitsee ensimmäisessä kerroksessa ja siinä on täysleveä parveke sivukadun puolella, josta on selkeät näkymät Levin eturinteeseen. Tilava oleskelutila on ihanteellinen ryhmäruokailuihin, peli-iltoihin tai yksinkertaisesti rentoutumiseen päivän jälkeen rinteillä.

**Sauna, suksivarasto ja pelihuone** Yksityinen sauna koko ryhmälle. Jokaisella huoneistolla on oma suksivarasto oven vieressä sekä pääsy yhteiseen lämmitettyyn suksienhuoltotilaan. Rakennuksessa on yhteinen pelihuone, jossa on ilmakiekko ja aktiviteetteja – täydellinen lapsiperheille tai kaikille, jotka haluavat pitää hauskaa myös sisätiloissa.

**200 m rinteiltä** Eturinne ja Glacier Express -hissi ovat aivan ulkopuolella. Maastohiihtoladut lähellä. Ravintolat, kaupat ja kaikki palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Suuren ryhmän mukavuutta edulliseen hintaan** Rakennettu vuonna 2000 ja huollettu vuosien varrella. 10 vuodetta 5 huoneessa rinteiden juurella – vaikea löytää näin paljon tilaa tällä sijainnilla ja hinnalla mistään Levilta. Siivous sisältyy hintaan. Liinavaatteet saatavilla lisäpalveluna, tai voit tuoda omasi.

**Mukavuudet:** Täysin varusteltu keittiö, oma sauna, suksivarasto, pelihuone, täysleveä parveke rinne näkymin, WiFi, TV. Lemmikit ovat tervetulleita.

**Lisää kohteita Leville.net-sivustolta:** 🏡 220 m² Bear Lodge – 14 vierasta, poreallas 🏢 54 m² SkiStar – moderni, 700 m rinteiltä

Hiihto | Reitit | Revontulet | Kaikki huoneistot osoitteessa leville.net`,
  
  },
  "glacier-b2": {
    name: "Levi Glacier B2 – alppihuoneisto",
    shortDescription:
      "105 m² ensimmäisen kerroksen huoneisto viidellä makuuhuoneella. B1:n kaksonen – varaa molemmat jopa 20 hengelle. Koko huoneiston levyinen parveke, näkymä Eturinteelle. Lemmikit sallittu.",
    longDescription: `**Levi Glacier Apartments B2 – 105 m², 5 makuuhuonetta 10 vieraalle Eturinteessä**

Toinen kahdesta identtisestä suuresta huoneistosta Glacier-rakennuksessa – ja yksi parhaista ryhmämajoituksista Levin rinteiden lähellä. Tässä 105 m² huoneistossa on 5 makuuhuonetta 10 vuoteella, täysleveä parveke eturinteidenäkymillä, ja se on vain 200 metrin päässä Glacier Express -tuolihissiltä. Ihanteellinen suurille perheille, urheilujoukkueille tai kaveriporukoille. Lemmikit ovat tervetulleita.

**Huomaa:** Meillä on kaksi identtistä 105 m² huoneistoa (B1 ja B2) samassa rakennuksessa. Jos tämä on varattu, tarkista huoneiston B1 saatavuus – tai varaa molemmat jopa 20 hengen ryhmälle!

**5 makuuhuonetta jopa 10 vieraalle** Viisi erillistä makuuhuonetta, jokaisessa kaksi vuodetta. Huoneisto sijaitsee ensimmäisessä kerroksessa ja siinä on täysleveä parveke sivukadun puolella, josta on selkeät näkymät eturinteeseen. Tilava oleskelutila ryhmäaterioille ja yhdessäoloon.

**Sauna, suksivarasto ja pelihuone** Yksityinen sauna koko ryhmälle. Oma suksisäilö oven vieressä, sekä yhteinen lämmitetty suksienhuoltotila. Rakennuksessa yhteinen pelihuone, jossa on air hockey ja muita aktiviteetteja.

**200 m rinteistä** Eturinne ja Glacier Express -hissi aivan ulko-oven edessä. Hiihtoladut lähellä. Kaikki ravintolat, kaupat ja palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Suuren ryhmän mukavuutta edulliseen hintaan** Rakennettu vuonna 2000 ja ylläpidetty vuosien varrella. 10 vuodetta 5 huoneessa rinteiden juurella – poikkeuksellinen hinta-laatusuhde. Siivous sisältyy hintaan. Liinavaatteet saatavilla lisäpalveluna.

**Mukavuudet:** Täysin varusteltu keittiö, oma sauna, suksisäilö, pelihuone, täysleveä parveke rinne näkymillä, WiFi, TV. Lemmikit ovat tervetulleita.

**Lisää kohteita Leville.netistä:** 🏡 220 m² Bear Lodge – 14 vierasta, poreallas 🏢 54 m² SkiStar – moderni, 700 m rinteistä

Hiihto | Ladut | Revontulet | Kaikki huoneistot leville.netissä`,
  
  },
  "glacier-b3-penthouse": {
    name: "Levi Glacier Penthouse B3",
    shortDescription:
      "87 m² penthouse, 3 makuuhuonetta + 2 alkovipaikkaa yläkerrassa. Parveke molemmissa kerroksissa, ylempi Eturinteelle. Lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**Levi Glacier Penthouse B3 – 87 m², parven makuualkovit ja eturinteen parveke**

Tilava kattohuoneisto Glacier-rakennuksen ylimmässä kerroksessa, aivan Levin eturinteen juurella. Tämä 87 m²:n huoneisto tarjoaa kolme makuuhuonetta sekä avoimet parven makuualkovit kahdella lisävuoteella yläkerrassa, majoittaen mukavasti jopa kahdeksan vierasta. Yläkerran parvekkeelta avautuu näkymä eturinteeseen – voit katsella illan rinnevalaistusta omalta yksityiseltä näköalapaikaltasi. Vain 200 metrin päässä Glacier Express -tuolihissistä. Lemmikit ovat tervetulleita.

**Huomaa:** Meillä on kaksi identtistä 87 m²:n kattohuoneistoa (B3 ja B4) tässä rakennuksessa. Jos tämä on varattu, tarkista asunto B4 – tai varaa molemmat jopa 16 hengen ryhmälle!

**Kolme makuuhuonetta + parven alkovit kahdeksalle vieraalle** Kolme makuuhuonetta pääkerroksessa sekä kaksi vuodetta avoimissa parven alkovissa yläkerrassa – pohjaratkaisu, josta lapset pitävät. Pääkerroksen täysileveä parveke avautuu kadulle, kun taas yläkerran parveke avautuu eturinteelle upein näkymin.

**Sauna, suksivarasto ja pelihuone** Yksityinen sauna. Oma suksivarasto oven vieressä sekä jaettu lämmitetty huoltotila. Rakennuksessa yhteinen pelihuone, jossa ilmakiekko ja muita aktiviteetteja.

**200 m rinteistä** Eturinne ja Glacier Express -hissi aivan oven edessä. Latupolut lähistöllä. Kaikki palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Kattohuoneistoa edulliseen hintaan** Rakennettu vuonna 2000, huollettu vuosien varrella. Ylimmän kerroksen sijainti rinne-maisemapalkoineen, perinteisen Alppi-talon asunnon hintatasoa. Siivous sisältyy hintaan.

**Mukavuudet:** Täysin varusteltu keittiö, oma sauna, suksivarasto, pelihuone, parvekkeet kahdessa kerroksessa, WiFi, TV. Lemmikit ovat tervetulleita.

**Lisää kohteita Leville.net :istä:** 🏡 220 m² Bear Lodge – 14 vierasta, jacuzzi 🏢 54 m² SkiStar – moderni, 700 m rinteistä

Hiihto | Reitit | Revontulet | Kaikki asunnot osoitteessa leville.net`,
  
  },
  "glacier-b4-penthouse": {
    name: "Levi Glacier Penthouse B4",
    shortDescription:
      "87 m² penthouse – B3:n peilikuva. Parvekkeet molemmissa kerroksissa. Lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**Levi Glacier Penthouse B4 – 87 m², parvelliset alkovit ja parveke eturinteen puolelle**

Toinen kahdesta samanlaisesta kattohuoneistosta Glacier-rakennuksen yläkerrassa, aivan Levin eturinteen juurella. Tämä 87 m²:n huoneisto tarjoaa 3 makuuhuonetta sekä avoimet parvelliset alkovit, joissa on 2 lisävuodetta, majoittaen jopa 8 henkeä. Yläparveke on eturinteelle päin – nauti iltarinteen valaistuksesta omasta näköalapaikastasi. Vain 200 metrin päässä Glacier Express -tuolihissistä. Lemmikit tervetulleita.

**Huomaa:** Meillä on tässä rakennuksessa kaksi identtistä 87 m²:n kattohuoneistoa (B3 ja B4). Jos tämä on varattu, tarkista huoneisto B3 – tai varaa molemmat jopa 16 hengen ryhmälle!

**3 makuuhuonetta + parvelliset alkovit 8 hengelle** Kolme makuuhuonetta alakerrassa, sekä kaksi vuodetta yläkerran avoimissa parvellisissa alkovissa – pohjaratkaisu, josta perheen pienimmät pitävät. Koko huoneiston levyinen parveke alakerrassa on kadun puolelle, kun taas yläparveke avautuu eturinteelle.

**Sauna, suksivarasto ja pelihuone** Yksityinen sauna. Oma suksisäilytystila oven vieressä, sekä jaettu lämmitetty huoltotila. Rakennuksessa on yhteinen pelihuone, jossa on ilmakiekkoa ja muuta puuhaa.

**200 m rinteistä** Eturinne ja Glacier Express -hissi aivan ovesi edessä. Hiihtoladut lähellä. Kaikki palvelut kävelyetäisyydellä. Ilmainen pysäköinti paikan päällä.

**Kattohuoneistotasoinen asuminen edulliseen hintaan** Rakennettu vuonna 2000, huollettu vuosien varrella. Yläkerran sijainti rinteeseen päin avautuvalla parvekkeella, perinteisellä alppiasuntojen hinnoittelulla. Siivous sisältyy hintaan.

**Mukavuudet:** Täysin varusteltu keittiö, oma sauna, suksivarasto, pelihuone, parvekkeet kahdessa kerroksessa, WiFi, TV. Lemmikit tervetulleita.

**Lisää kohteita osoitteesta** **Leville.net** **:** 🏡 220 m² Bear Lodge – 14 henkeä, poreallas 🏢 54 m² SkiStar – moderni, 700 m rinteistä`,
  
  },
};

export const locationFi: Record<string, string> = {
  "Levi Center": "Levin keskusta",
  "Front Slope": "Levin Eturinne, Zero Point -alue",
  "Glacier": "Eturinteen juurella, Zero Point -alue",
};

// Per-slug location overrides (Finnish), used when the generic location label is misleading.
export const locationFiBySlug: Record<string, string> = {
  "front-slope-5a2": "Levin Eturinne, Zero Point -alue",
  "front-slope-5b2": "Levin Eturinne, Zero Point -alue",
  "front-slope-5b5-penthouse": "Levin Eturinne, Zero Point -alue",
};

export const translateYearFi = (s: string): string => {
  if (!s) return "";
  return s
    .replace(/Fully renovated/gi, "Täysin remontoitu")
    .replace(/Largely renovated/gi, "Pääosin remontoitu")
    .replace(/Renovated/gi, "Remontoitu")
    .replace(/Built/gi, "Rakennettu")
    .replace(/Opened/gi, "Avattu")
    .replace(/January/gi, "tammikuu")
    .replace(/February/gi, "helmikuu")
    .replace(/March/gi, "maaliskuu")
    .replace(/April/gi, "huhtikuu")
    .replace(/May/gi, "toukokuu")
    .replace(/June/gi, "kesäkuu")
    .replace(/July/gi, "heinäkuu")
    .replace(/August/gi, "elokuu")
    .replace(/September/gi, "syyskuu")
    .replace(/October/gi, "lokakuu")
    .replace(/November/gi, "marraskuu")
    .replace(/December/gi, "joulukuu");
};
