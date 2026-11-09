// Finnish translations for property landing pages (/majoitukset/:slug).
// Keyed by property slug. properties.ts itself stays in English for other consumers.
// Tekstisäännöt: ei ajatusviivoja (– tai —), ei emojeja, ei hintalupauksia kuten "edullinen hinta".

export interface PropertyFiTranslation {
  name?: string;
  shortDescription: string;
  /** Hakukoneen kuvaus (meta description), enintään 155 merkkiä. Jos puuttuu, käytetään lyhennettyä shortDescriptionia. */
  metaDescription?: string;
  /** Optional long-form description (Markdown-lite: paragraphs separated by blank lines, **bold**, bullets with "- "). */
  longDescription?: string;
}

/* ------------------------------------------------------------------ */
/* Yhteiset tekstilohkot                                               */
/* ------------------------------------------------------------------ */

const LEVIN_KYLA = `**Kaikki kävelymatkan päässä Levin kylässä**
Asut Levin kylässä, aivan Levi-keskuksen ytimessä. Rinteet, ladut, ravintolat, kaupat ja afterski-paikat ovat kävelymatkan päässä, joten autoa ei loman aikana tarvita. Myös aktiviteetteihin on helppo lähteä, sillä useimmat safari- ja retkikuljetukset lähtevät Levin keskustasta tai hakevat asiakkaat sieltä.`;

const GLACIER_SIJAINTI = `**Sijainti**
Eturinteen hissit ovat noin 200 metrin päässä, ja ladut kulkevat aivan talon vierestä. Pysäköinti on ilmainen.`;

const GLACIER_TALO = `**Talo**
Eturinteen Alppikylän talot on rakennettu vuonna 2000, ja niitä on kunnostettu vuosien varrella. Jokaisella huoneistolla on oma suksivarasto ulko-oven vieressä, ja talossa on yhteinen lämmin suksienhuoltotila sekä lasten leikki- ja pelihuone, jossa on muun muassa ilmakiekkopeli.`;

const SKISTAR_SIJAINTI = `**Sijainti**
SkiStar-talo on osoitteessa Postintie 3 Levin keskustassa, ja K-Market on aivan vieressä. Päärinteille ja Eturinteen hisseille on noin 700 metriä, jonka kävelee helposti. Ladut alkavat läheltä, ja ravintolat, kaupat ja afterski-paikat ovat lyhyen kävelyn päässä. Pysäköinti on ilmainen, ja paikalla on lämmitystolppa.`;

const SKISTAR_TALO = `Talossa on yhteinen pesutupa kuivausrumpuineen ja tuuletettu suksivarasto huoltotelineineen.`;

const SKISTAR_STUDIO_POHJA = `**Pohjaratkaisu**
Studiossa on kaksi sänkyä ja vuodesohva, joka sopii lapsille tai kolmannelle aikuiselle. Kahden aikuisen ja kahden lapsen perheelle ratkaisu toimii hyvin: lapset nukkuvat vuodesohvalla ja vanhemmat sängyissä. Keittiössä on kaikki tarvittava kotiruoan laittamiseen: astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Sisustus vaihtelee hieman studioittain.`;

const SKISTAR_1MH_POHJA = `**Pohjaratkaisu**
Makuuhuoneessa on kaksi erillistä sänkyä, ja olohuoneen vuodesohvalle mahtuu yksi tai kaksi lisävierasta. Avoin keittiö ja olohuone ovat valoisat, ja niissä on hyvä laittaa ruokaa, levätä ja suunnitella seuraavaa päivää.`;

const SKISTAR_1MH_VARUSTELU = `**Varustelu**
Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Oma sauna, kylpyhuone, kuivauskaappi, parveke, vesikiertoinen lattialämmitys, ilmainen WiFi ja TV (HDMI-liitäntä). Pinnasänky ja syöttötuoli saatavilla.`;

const SKISTAR_2MH_VARUSTELU = `**Varustelu**
Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni ja kahvinkeitin. Oma sauna, kylpyhuone, kuivauskaappi, parveke, vesikiertoinen lattialämmitys, ilmainen WiFi ja TV. Pinnasänky ja syöttötuoli saatavilla.`;

/* ------------------------------------------------------------------ */

const MATKATAVARAT_KELLARI = `**Matkatavarasäilytys**
Talon kellarissa on matkatavarasäilytys. Laukut voi jättää ja hakea milloin tahansa, joten loman voi aloittaa jo ennen sisäänkirjautumista ja jatkaa uloskirjautumisen jälkeen.`;

const MATKATAVARAT_GLACIER = `**Matkatavarasäilytys**
Glacierin B-talon kellarissa on matkatavarasäilytys. Laukut voi jättää ja hakea milloin tahansa, joten loman voi aloittaa jo ennen sisäänkirjautumista ja jatkaa uloskirjautumisen jälkeen.`;

const MATKATAVARAT_KYSY = `**Matkatavarasäilytys**
Kysy meiltä mahdollisuutta matkatavaroiden säilytykseen ennen sisäänkirjautumista tai uloskirjautumisen jälkeen.`;

export const propertyFi: Record<string, PropertyFiTranslation> = {
  "zero-point-5a2": {
    name: "Huoneisto 5A2, Hiihtäjänkuja",
    metaDescription:
      "Täysin remontoitu kahden makuuhuoneen huoneisto 6 hengelle, Hiihtäjänkuja 5, Levi. Oma sauna, takka ja kuivaushuone, Eturinteelle 200 m. Lemmikit sallittu.",
    shortDescription:
      "Kesäkuussa 2024 täysin remontoitu kahden makuuhuoneen huoneisto Levin keskustassa Zero Point -alueella, noin 200 metrin päässä Eturinteestä. Oma sauna, varaava takka, kaksi uutta kylpyhuonetta, kuivaushuone, parveke ja ilmalämpöpumppu. Lemmikit sallittu.",
    longDescription: `**Täysin remontoitu kahden makuuhuoneen huoneisto Levin keskustassa**

Huoneisto on osoitteessa Hiihtäjänkuja 5 Zero Point -alueella, noin 200 metrin päässä Eturinteestä. Huoneistoon mahtuu kuusi henkeä.

${LEVIN_KYLA}

**Pohjaratkaisu**
Molemmissa makuuhuoneissa on kaksi erillistä sänkyä, ja alakerran oleskelutilassa on laadukas vuodesohva. Olohuoneesta on käynti parvekkeelle.

**Remontti 2024**
Kesäkuussa 2024 huoneisto remontoitiin perusteellisesti. Molemmat kylpyhuoneet uusittiin kokonaan, ja lähes kaikki pinnat ovat uudet.

**Sauna, kuivaushuone ja takka**
Alakerran sisäänkäynnistä tullaan suoraan kuivaushuoneeseen: sukset ja märät vaatteet jäävät kuivumaan, ja saunaan pääsee saman tien. Olohuoneen varaava takka pitää asunnon lämpimänä pitkään. Ilmalämpöpumppu tasaa lämpöä talvella ja viilentää kesällä, ja huoneistossa on oma pesukone.

**Helppo saapua**
Ulko-ovelle on vain yksi matala porras.

${MATKATAVARAT_KELLARI}`,
  },
  "zero-point-5b2": {
    name: "Huoneisto 5B2, Hiihtäjänkuja",
    metaDescription:
      "65 m² huoneisto 6 hengelle, Hiihtäjänkuja 5, Levi. Täysin remontoitu 2024, oma sauna, takka ja kuivaushuone, Eturinteelle 200 m. Lemmikit sallittu.",
    shortDescription:
      "65 m² kahden makuuhuoneen huoneisto Levin keskustassa Zero Point -alueella, noin 200 metrin päässä Eturinteestä. Täysin remontoitu 2024. Oma sauna, varaava takka ja kuivaushuone. Alakerran oleskelutilassa PlayStation ja 140 cm vuodesohva. Lemmikit sallittu.",
    longDescription: `**65 m², kaksi makuuhuonetta ja alakerran oleskelutila**

Tilava kaksikerroksinen huoneisto osoitteessa Hiihtäjänkuja 5 Zero Point -alueella, noin 200 metrin päässä Eturinteestä. Huoneisto remontoitiin kokonaan vuonna 2024. Siihen mahtuu kuusi henkeä, ja se sopii hyvin perheille ja kaveriporukoille.

${LEVIN_KYLA}

**Kaksi kerrosta**
Yläkerrassa on avoin keittiö ja olohuone sekä kaksi makuuhuonetta, joissa kummassakin on kaksi erillistä sänkyä. Alakerran oleskelutilassa on iso televisio, PlayStation ja 140 cm leveä vuodesohva. Tila toimii lasten omana olohuoneena tai lisävieraiden makuupaikkana.

**Sauna, takka ja kuivaushuone**
Huoneistossa on oma sähkösauna ja takka. Alakerran kuivaushuoneeseen tullaan suoraan ulkoa: sukset ja märät varusteet jäävät kuivumaan, ja saunaan pääsee saman tien.

**Sijainti**
Eturinne ja Zero Point ovat noin 200 metrin päässä, ja ravintolat, kaupat ja afterski-paikat lyhyen kävelyn päässä. Ladut alkavat läheltä. Pysäköinti on ilmainen, ja paikalla on lämmitystolppa.

**Varustelu**
Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja jääpalakone. Oma sauna, takka, pesukone, kuivaushuone, kuivauskaappi, parveke, ilmainen WiFi ja TV. Lapsiperheille syöttötuoli ja turvaportit.

${MATKATAVARAT_KELLARI}`,
  },
  "zero-point-5b5-penthouse": {
    name: "Penthouse 5B5, Hiihtäjänkuja",
    metaDescription:
      "100 m² penthouse 9 hengelle, Hiihtäjänkuja 5, Levi. Neljä makuuhuonetta, kolme parveketta ja sauna rinnenäkymällä. Lemmikit sallittu.",
    shortDescription:
      "100 m² penthouse Levin keskustassa Zero Point -alueella, noin 200 metrin päässä Eturinteestä. Neljä makuuhuonetta yhdeksälle, kolme parveketta, sauna rinnenäkymällä ja varaava takka. Ruokapöytä kymmenelle. Täysin remontoitu 2024. Lemmikit sallittu.",
    longDescription: `**100 m² penthouse ja näkymä Eturinteeseen**

Hiihtäjänkuja 5:n talon ylin huoneisto on Zero Point -alueella, noin 200 metrin päässä Eturinteestä. Neljä makuuhuonetta ja kolme parveketta tekevät siitä yhden Levin keskustan tilavimmista loma-asunnoista. Huoneistoon mahtuu yhdeksän henkeä.

${LEVIN_KYLA}

**Tilaa isollekin porukalle**
Makuuhuoneissa on yhteensä yhdeksän vuodepaikkaa, ja olohuoneessa on lisäksi vuodesohva. Ruokapöydän ääreen mahtuu kymmenen henkeä. Olohuoneessa on sohva, iso televisio ja äänentoistojärjestelmä.

**Kolme parveketta**
Olohuoneen ja yhden makuuhuoneen parvekkeilta näkyy Eturinteeseen. Illalla valaistua rinnettä voi katsella myös sisältä.

**Sauna ja takka**
Saunan ikkunasta näkyy Eturinteen suuntaan. Olohuoneen varaava takka lämmittää talvi-illat, ja polttopuut sisältyvät hintaan.

**Täysin remontoitu 2024**
Huoneisto remontoitiin kokonaan vuonna 2024, ja kalusteet ja sisustus uusittiin samalla. Ilmalämpöpumppu lämmittää talvella ja viilentää kesällä. Talossa on oma pysäköinti sekä kellarissa suksivarasto ja suksienhuoltotila.

**Sijainti**
Eturinne ja Zero Point ovat noin 200 metrin päässä, ladut alkavat läheltä, ja ravintolat, kaupat ja muut palvelut ovat kävelymatkan päässä.

**Varustelu**
Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni ja kahvinkeitin. Sauna, takka ja polttopuut, pesukone, kolme parveketta, ilmalämpöpumppu, ilmainen WiFi, TV ja äänentoisto. Lapsiperheille pinnasänky, syöttötuoli, turvaportit sekä lastenkirjoja ja leluja.

${MATKATAVARAT_KELLARI}`,
  },
  "karhupirtti": {
    name: "Karhupirtti, hirsihuvila Levin keskustassa",
    metaDescription:
      "Karhupirtti: 220 m² hirsihuvila 14 hengelle Levin keskustassa, Skimbaajankuja 3. Seitsemän makuuhuonetta, ulkoporeallas ja takka. Lemmikit sallittu.",
    shortDescription:
      "220 m² hirsihuvila Levin keskustassa 14 hengelle: seitsemän makuuhuonetta, ulkoporeallas, oma piha ja takka. Alakerran kolmessa makuuhuoneessa oma suihku ja WC, kaikkiaan viisi suihkullista kylpyhuonetta ja yläkerrassa erillinen WC. Täysin remontoitu 2023. Takkapuut sisältyvät. Lemmikit sallittu.",
    longDescription: `**220 m² hirsihuvila Levin keskustassa**

Karhupirtti on pyöröhirsinen huvila aivan Levin keskustassa, osoitteessa Skimbaajankuja 3. Eturinteet, ravintolat ja kaupat ovat noin kolmen minuutin kävelyn päässä. Seitsemään makuuhuoneeseen mahtuu 14 henkeä, joten huvila sopii isoille perheille, sukulomille ja kaveriporukoille. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Seitsemän makuuhuonetta**
Alakerrassa on kolme makuuhuonetta, joissa jokaisessa on oma suihku ja WC. Yläkerrassa on kaksi tosi isoa makuuhuonetta, kummassakin kaksi sänkyä, televisio ja runsaasti tilaa vaikka lasten leikeille. Toisessa on lisäksi vuodesohva. Kummankin yhteydessä on pienempi makuuhuone kahdella täysikokoisella sängyllä, mikä sopii hyvin lapsille: perhe on lähellä toisiaan, mutta jokaisella on oma rauhansa.

Suihkullisia kylpyhuoneita on kaikkiaan viisi, ja yläkerrassa on lisäksi erillinen WC, joten isokaan porukka ei joudu jonottamaan. Olohuoneeseen ja ruokailutilaan mahtuu koko seurue yhteisille aterioille.

**Ulkoporeallas ja grillipaikka**
Poreallas on huvilan omalla isolla pihalla. Kirkkaina iltoina revontulia voi katsella suoraan altaasta. Pihalla on myös grillipaikka.

**Täysin remontoitu 2023**
Huvila remontoitiin kokonaan vuonna 2023 laadukkain materiaalein: Pukkilan laatat, Kährsin lattiat, pähkinäpuiset katot, musta keittiö ja Mielen kodinkoneet. Lopputulos yhdistää hirsihuvilan tunnelman ja nykyaikaisen mukavuuden. Designtakka tuo lämpöä ja tunnelmaa.

**Sijainti**
Eturinteet, Lastenmaa, ruokakauppa, ravintolat ja afterski-paikat ovat lyhyen kävelyn päässä. Lähimmälle moottorikelkkareitille on noin 250 metriä. Pysäköintitilaa on runsaasti. Huvilassa on suksivarasto ja suksienhuoltotila sekä kodinhoitohuone pyykinpesua varten.

**Varustelu**
Täysin varusteltu keittiö, jossa astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja pakastin. Sähkösauna, designtakka, pesukone, ulkoporeallas ja grilli. Ilmalämpöpumppu, ilmainen WiFi, TV ja äänentoisto. Pinnasänky ja turvaportit saatavilla.

${MATKATAVARAT_KYSY}`,
  },
  "skistar-211": {
    name: "Superior Suite 211, Postintie",
    metaDescription:
      "54 m² kahden makuuhuoneen huoneisto 6 hengelle, Postintie 3, Levin keskusta. Oma sauna, parveke, päätyhuoneisto metsänäkymällä.",
    shortDescription:
      "54 m² kahden makuuhuoneen Superior-huoneisto SkiStar-talossa Levin keskustassa. Oma sauna ja parveke. Päätyhuoneisto, ikkunoista metsänäkymä. Esteetön kulku. Ei lemmikkejä.",
    longDescription: `**54 m², kaksi makuuhuonetta ja oma sauna**

Moderni huoneisto SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Huoneistoon mahtuu kuusi henkeä, ja se sopii perheille ja kaveriporukoille. Ravintolat, kaupat ja palvelut ovat kävelymatkan päässä, ja päärinteille on noin 700 metriä.

${LEVIN_KYLA}

**Pohjaratkaisu**
Kummassakin makuuhuoneessa on kaksi erillistä sänkyä, ja olohuoneessa on vuodesohva. Avoimessa keittiössä ja olohuoneessa on hyvin tilaa laittaa ruokaa ja olla yhdessä rinnepäivän jälkeen. Päätyhuoneistona 211:n ikkunoista näkyy metsään, ja rauhaa on tavallista enemmän.

**Sauna ja kuivauskaappi**
Oma sähkösauna rinnepäivän päätteeksi. Kuivauskaapissa märät varusteet ja ulkovaatteet kuivuvat yön aikana. ${SKISTAR_TALO}

${SKISTAR_SIJAINTI} Huoneistoon on esteetön kulku, vaikka sitä ei ole sertifioitu esteettömäksi.

${SKISTAR_2MH_VARUSTELU}

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-212": {
    name: "Superior Suite 212, Postintie",
    metaDescription:
      "54 m² kahden makuuhuoneen huoneisto 6 hengelle, Postintie 3, Levin keskusta. Oma sauna, parveke, lattialämmitys, päätyhuoneisto.",
    shortDescription:
      "54 m² kahden makuuhuoneen Superior-huoneisto SkiStar-talossa Levin keskustassa. Oma sauna, parveke ja lattialämmitys. Päätyhuoneisto, ikkunoista metsänäkymä. Palvelut kävelymatkan päässä. Ei lemmikkejä.",
    longDescription: `**54 m², kaksi makuuhuonetta ja oma sauna**

Moderni huoneisto SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Huoneistoon mahtuu kuusi henkeä, ja se sopii perheille ja kaveriporukoille. Ravintolat, kaupat ja palvelut ovat kävelymatkan päässä, ja päärinteille on noin 700 metriä.

${LEVIN_KYLA}

**Pohjaratkaisu**
Kummassakin makuuhuoneessa on kaksi erillistä sänkyä, ja olohuoneessa on vuodesohva. Avoimessa keittiössä ja olohuoneessa on hyvin tilaa laittaa ruokaa ja olla yhdessä rinnepäivän jälkeen. Lattialämmitys pitää lattiat lämpiminä. Päätyhuoneistona 212:n ikkunoista näkyy metsään, ja rauhaa on tavallista enemmän.

**Sauna ja kuivauskaappi**
Oma sähkösauna rinnepäivän päätteeksi. Kuivauskaapissa märät varusteet ja ulkovaatteet kuivuvat yön aikana. ${SKISTAR_TALO}

${SKISTAR_SIJAINTI} Huoneistoon on esteetön kulku, vaikka sitä ei ole sertifioitu esteettömäksi.

${SKISTAR_2MH_VARUSTELU}

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-209": {
    name: "Superior 209, Levin keskusta",
    metaDescription:
      "43 m² yhden makuuhuoneen huoneisto 4 hengelle, Postintie 3, Levin keskusta. Oma sauna ja parveke, esteetön kulku. Varaa suoraan.",
    shortDescription:
      "43 m² vuonna 2021 valmistunut yhden makuuhuoneen Superior-huoneisto saunalla SkiStar-talossa. Esteetön, ei portaita. Huolella suunniteltu sisustus. Ei lemmikkejä.",
    longDescription: `**43 m², makuuhuone ja oma sauna**

Vuonna 2021 valmistunut yhden makuuhuoneen huoneisto SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Huoneistoon mahtuu neljä henkeä, joten se sopii pariskunnille ja pienille perheille. Päärinteille on noin 700 metriä, ja palvelut ovat kävelymatkan päässä.

${LEVIN_KYLA}

${SKISTAR_1MH_POHJA}

**Sauna ja kuivauskaappi**
Oma sähkösauna rinnepäivän päätteeksi, ja kuivauskaapissa varusteet kuivuvat aamuksi. ${SKISTAR_TALO} Huoneistoon on esteetön kulku ilman portaita, vaikka sitä ei ole sertifioitu esteettömäksi.

${SKISTAR_SIJAINTI}

${SKISTAR_1MH_VARUSTELU}

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-210": {
    name: "Superior 210, Levin keskusta",
    metaDescription:
      "43 m² yhden makuuhuoneen huoneisto 4 hengelle, Postintie 3, Levin keskusta. Oma sauna ja parveke, esteetön kulku. Varaa suoraan.",
    shortDescription:
      "43 m² vuonna 2021 valmistunut yhden makuuhuoneen Superior-huoneisto saunalla SkiStar-talossa. Esteetön, ei portaita. Matkatavarat voi jättää säilytykseen. Ei lemmikkejä.",
    longDescription: `**43 m², makuuhuone ja oma sauna**

Vuonna 2021 valmistunut yhden makuuhuoneen huoneisto SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Huoneistoon mahtuu neljä henkeä, joten se sopii pariskunnille ja pienille perheille. Päärinteille on noin 700 metriä, ja palvelut ovat kävelymatkan päässä.

${LEVIN_KYLA}

${SKISTAR_1MH_POHJA}

**Sauna ja kuivauskaappi**
Oma sähkösauna rinnepäivän päätteeksi, ja kuivauskaapissa varusteet kuivuvat aamuksi. Talossa on yhteinen pesutupa ja lukittava, tuuletettu suksivarasto huoltotelineineen. Huoneistoon on esteetön kulku ilman portaita, vaikka sitä ei ole sertifioitu esteettömäksi.

${SKISTAR_SIJAINTI}

${SKISTAR_1MH_VARUSTELU}

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-310": {
    name: "Superior 310, Levin keskusta",
    metaDescription:
      "43 m² yhden makuuhuoneen huoneisto 4 hengelle, Postintie 3, Levin keskusta. Oma sauna ja parveke. Päärinteille noin 700 m.",
    shortDescription:
      "43 m² vuonna 2021 valmistunut yhden makuuhuoneen Superior-huoneisto saunalla SkiStar-talossa. Huoneisto on maan tasalta laskien toisessa kerroksessa, yhdet portaat. Huolella suunniteltu sisustus. Ei lemmikkejä.",
    longDescription: `**43 m², makuuhuone ja oma sauna**

Vuonna 2021 valmistunut yhden makuuhuoneen huoneisto SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Huoneistoon mahtuu neljä henkeä, joten se sopii pariskunnille ja pienille perheille. Päärinteille on noin 700 metriä, ja palvelut ovat kävelymatkan päässä.

${LEVIN_KYLA}

${SKISTAR_1MH_POHJA}

**Sauna ja kuivauskaappi**
Oma sähkösauna rinnepäivän päätteeksi, ja kuivauskaapissa varusteet kuivuvat aamuksi. ${SKISTAR_TALO} Huoneisto on maan tasalta laskien toisessa kerroksessa, ja sinne kuljetaan yhdet portaat. Talossa ei ole hissiä.

${SKISTAR_SIJAINTI}

${SKISTAR_1MH_VARUSTELU}

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-studio-102": {
    name: "Studio 102, Postintie",
    metaDescription:
      "24 m² studio Levin keskustassa, Postintie 3. Valmistunut 2021, esteetön kulku, K-Market vieressä. Ei saunaa, saunalliset studiot 104, 319, 320 ja 321.",
    shortDescription:
      "24 m² studio SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Valmistunut 2021. Kompaktein huoneistomme. Huomaa: ei saunaa, saunalliset vaihtoehdot ovat muut studiomme 104, 319, 320 ja 321. Esteetön kulku. K-Market muutaman askeleen päässä. Ei lemmikkejä.",
    longDescription: `**Moderni studio Levin keskustassa**

Vuonna 2021 valmistunut 24 m²:n studio SkiStar-talossa osoitteessa Postintie 3. Huomaathan, että tässä studiossa ei ole saunaa. Saunalliset vaihtoehdot ovat muut studiomme 104, 319, 320 ja 321. Studioon mahtuu kolme aikuista tai kahden aikuisen ja kahden lapsen perhe. Päärinteille on noin 700 metriä, ja palvelut ovat kävelymatkan päässä.

${LEVIN_KYLA}

${SKISTAR_STUDIO_POHJA}

**Kuivauskaappi ja talon tilat**
Kuivauskaapissa talvivaatteet ja varusteet kuivuvat aamuksi. ${SKISTAR_TALO} Huoneistoon on esteetön kulku, vaikka sitä ei ole sertifioitu esteettömäksi.

${SKISTAR_SIJAINTI}

**Varustelu**
Täysin varusteltu keittiö, kuivauskaappi, kylpyhuone suihkulla, ilmainen WiFi ja TV. Shampoo ja suihkusaippua kuuluvat varusteluun. Pinnasänky pyynnöstä.

**Huomaathan**
Tässä studiossa ei ole saunaa. Jos oma sauna on sinulle tärkeä, valitse jokin saunallisista 28 m²:n studioistamme: 104, 319, 320 tai 321. Talossa on useita samanlaisia studioita, joiden sisustuksessa on pieniä eroja, ja osassa on pesukone.

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-studio-104": {
    name: "Superior Studio 104 saunalla, Postintie",
    metaDescription:
      "28 m² studio omalla saunalla, Postintie 3, Levin keskusta. Valmistunut 2021, lattialämmitys, esteetön kulku. 3 aikuista tai perhe 2+2.",
    shortDescription:
      "28 m² Superior-studio omalla saunalla SkiStar-talossa osoitteessa Postintie 3. Valmistunut 2021. Lattialämmitys. Täysin varusteltu keittiö astianpesukoneella. Esteetön kulku. Ei lemmikkejä.",
    longDescription: `**28 m² studio omalla saunalla**

Moderni, vuonna 2021 valmistunut studio SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Studioon mahtuu kolme aikuista tai kahden aikuisen ja kahden lapsen perhe. Päärinteille on noin 700 metriä, ja palvelut ovat kävelymatkan päässä.

${LEVIN_KYLA}

${SKISTAR_STUDIO_POHJA}

**Sauna ja kuivauskaappi**
Oma sähkösauna on paras tapa päättää päivä rinteessä tai ladulla. Kuivauskaapissa talvivaatteet ja varusteet kuivuvat aamuksi, ja lattialämmitys pitää lattiat lämpiminä. ${SKISTAR_TALO} Huoneistoon on esteetön kulku, vaikka sitä ei ole sertifioitu esteettömäksi.

${SKISTAR_SIJAINTI}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, kuivauskaappi, lattialämmitys, ilmainen WiFi ja TV. Shampoo ja suihkusaippua kuuluvat varusteluun. Pinnasänky pyynnöstä.

**Huomaathan**
Talossa on useita samanlaisia studioita, joiden sisustuksessa on pieniä eroja. Osassa on myös pesukone.

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-studio-319": {
    name: "Superior Studio 319, Levin keskusta",
    metaDescription:
      "28 m² studio omalla saunalla ja pesukoneella, Postintie 3, Levin keskusta. 3 aikuista tai perhe 2+2, K-Market vieressä.",
    shortDescription:
      "28 m² Superior-studio omalla saunalla SkiStar-talossa osoitteessa Postintie 3. Oma pesukone ja kuivauskaappi. K-Market muutaman askeleen päässä, hisseille noin 700 m. Ei lemmikkejä.",
    longDescription: `**28 m² studio omalla saunalla ja pesukoneella**

Moderni studio SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Studioon mahtuu kolme aikuista tai kahden aikuisen ja kahden lapsen perhe. Päärinteille on noin 700 metriä, ja palvelut ovat kävelymatkan päässä.

${LEVIN_KYLA}

${SKISTAR_STUDIO_POHJA}

**Sauna, pesukone ja kuivauskaappi**
Oma sähkösauna on paras tapa päättää päivä rinteessä tai ladulla. Studiossa on oma pesukone, ja kuivauskaapissa talvivaatteet ja varusteet kuivuvat aamuksi. Peitot ja tyynyt ovat valmiina kaikille vieraille. ${SKISTAR_TALO}

${SKISTAR_SIJAINTI}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, kuivauskaappi, ilmainen WiFi ja TV. Pinnasänky pyynnöstä.

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-studio-320": {
    name: "Studio 320 saunalla, Levin keskusta",
    metaDescription:
      "28 m² studio omalla saunalla ja pesukoneella, Postintie 3, Levin keskusta. K-Market vieressä. 3 aikuista tai perhe 2+2.",
    shortDescription:
      "28 m² studio omalla saunalla ja pesukoneella SkiStar-talossa osoitteessa Postintie 3. Lattialämmitys. K-Market muutaman askeleen päässä. Ei lemmikkejä.",
    longDescription: `**28 m² studio omalla saunalla**

Moderni, vuonna 2021 valmistunut studio SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Studioon mahtuu kolme aikuista tai kahden aikuisen ja kahden lapsen perhe. Päärinteille on noin 700 metriä, ja palvelut ovat kävelymatkan päässä.

${LEVIN_KYLA}

${SKISTAR_STUDIO_POHJA}

**Sauna, pesukone ja kuivauskaappi**
Oma sähkösauna on paras tapa päättää päivä rinteessä tai ladulla. Studiossa on oma pesukone, ja kuivauskaapissa talvivaatteet ja varusteet kuivuvat aamuksi, ja lattialämmitys pitää lattiat lämpiminä. ${SKISTAR_TALO}

${SKISTAR_SIJAINTI}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, kuivauskaappi, lattialämmitys, ilmainen WiFi ja TV. Shampoo ja suihkusaippua kuuluvat varusteluun. Pinnasänky pyynnöstä.

${MATKATAVARAT_KELLARI}`,
  },
  "skistar-studio-321": {
    name: "Studio 321 saunalla, Levin keskusta",
    metaDescription:
      "28 m² studio omalla saunalla ja pesukoneella, Postintie 3, Levin keskusta. K-Market vieressä. 3 aikuista tai perhe 2+2.",
    shortDescription:
      "28 m² studio omalla saunalla ja pesukoneella SkiStar-talossa osoitteessa Postintie 3. Lattialämmitys. K-Market muutaman askeleen päässä, hisseille noin 700 m. Ei lemmikkejä.",
    longDescription: `**28 m² studio omalla saunalla**

Moderni, vuonna 2021 valmistunut studio SkiStar-talossa osoitteessa Postintie 3, Levin keskustassa. Studioon mahtuu kolme aikuista tai kahden aikuisen ja kahden lapsen perhe. Päärinteille on noin 700 metriä, ja palvelut ovat kävelymatkan päässä.

${LEVIN_KYLA}

${SKISTAR_STUDIO_POHJA}

**Sauna, pesukone ja kuivauskaappi**
Oma sähkösauna on paras tapa päättää päivä rinteessä tai ladulla. Studiossa on oma pesukone, ja kuivauskaapissa talvivaatteet ja varusteet kuivuvat aamuksi, ja lattialämmitys pitää lattiat lämpiminä. ${SKISTAR_TALO}

${SKISTAR_SIJAINTI}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, kuivauskaappi, lattialämmitys, ilmainen WiFi ja TV. Shampoo ja suihkusaippua kuuluvat varusteluun. Pinnasänky pyynnöstä.

${MATKATAVARAT_KELLARI}`,
  },
  "karhunvartija-3": {
    name: "Karhunvartija 3, Levin keskusta",
    metaDescription:
      "42 m² huoneisto 4 hengelle Levin keskustassa, Skimbaajankuja 4. Kaksi makuuhuonetta, oma sauna ja luonnonkivitakka. Lemmikit sallittu.",
    shortDescription:
      "42 m² yksitasoinen huoneisto Levin keskustassa: kaksi makuuhuonetta, oma sauna ja luonnonkivitakka. Oma sisäänkäynti Ratsastajankujalta, josta pääsee helposti talon yksityiselle sisäpihalle. Takkapuut sisältyvät. Lemmikit sallittu.",
    longDescription: `**Yksitasoinen huoneisto takalla ja saunalla**

Viihtyisä huoneisto Karhunvartija-talossa aivan Levin keskustassa, osoitteessa Skimbaajankuja 4. Ravintolat, kaupat ja aktiviteetit ovat kävelymatkan päässä, ja rinteet ja ladut alkavat lyhyen kävelyn päästä. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Pohjaratkaisu**
42 m²:n huoneisto on yhdessä tasossa, ja siihen mahtuu neljä henkeä. Huoneistossa on eteinen, avoin keittiö ja olohuone, kaksi makuuhuonetta, joissa kummassakin on kaksi vuodetta, kylpyhuone, erillinen WC, oma sauna ja oma pesukone. Luonnonkivitakka tekee illoista tunnelmallisia, ja takkapuut sisältyvät hintaan.

**Helppo lapsiperheelle**
Huoneiston oma sisäänkäynti on Ratsastajankujalta, ja sieltä pääsee helposti talon yksityiselle sisäpihalle, jossa lapset voivat leikkiä lumikasoissa. Leikkipuistot ovat lähellä.`,
  },
  "levi-platinum-a2": {
    name: "Levi Platinum Superior Studio A2",
    metaDescription:
      "37 m² Platinum-studio 4 hengelle Eturinteen juurella, Hiihtäjänkuja 2, Levi. Valmistunut 2021, oma sauna, pesukone ja oma pysäköintipaikka.",
    shortDescription:
      "37 m² Platinum-tason studio Eturinteen juurella, valmistunut 2021. Oma sauna, pesukone, kuivauskaappi ja lattialämmitys. Oma pysäköintipaikka. Ei lemmikkejä.",
    longDescription: `**Lähes uusi studio Eturinteen juurella**

Levi Platinum -studio on osoitteessa Hiihtäjänkuja 2 Levin keskustassa, Eturinteen juurella, ja kaikkialle kylässä on lyhyt matka. Talo valmistui vuonna 2021, joten huoneisto on lähes uusi. Studioon mahtuu neljä henkeä, ja pihalla on oma pysäköintipaikka.

${LEVIN_KYLA}

**Kodinomainen varustelu**
Täysin varustellussa keittiössä ruoka valmistuu kuin kotona. Lattialämmitys pitää lattiat lämpiminä, ja kylpyhuoneessa on pesukone ja kuivauskaappi laskettelu- ja ulkoiluvarusteille. Päivän päätteeksi voit rentoutua omassa saunassa.

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, kuivauskaappi, lattialämmitys, ilmainen WiFi ja TV. Oma pysäköintipaikka pihalla.`,
  },
  "moonlight-415": {
    name: "Moonlight 415, parvistudio",
    metaDescription:
      "28 m² parvistudio 4 hengelle Hullu Poron vieressä, Leviraitti, Levin keskusta. Suurelta osin remontoitu 2026, oma sauna, pesukone ja kuivauskaappi.",
    shortDescription:
      "28 m² parvistudio Hullu Poron vieressä Levin keskustassa, suurelta osin remontoitu 2026. Parvella kolme vuodetta (jyrkät portaat) ja alakerrassa vuodesohva. Oma sauna, pesukone ja kuivauskaappi. Rinteille ja laduille noin 400 m, kauppaan 150 m. Ei lemmikkejä.",
    longDescription: `**Parvistudio saunalla Hullu Poron vieressä**

Studio on Leviraitin varrella Levin keskustassa, aivan Hullu Poron vieressä. 28 m²:n huoneistoon mahtuu neljä henkeä: parvella on kolme vuodetta ja alakerrassa vuodesohva. Huoneisto remontoitiin suurelta osin ja uudistettiin vuonna 2026, ja paljas hirsiseinä tuo siihen lappilaista lämpöä.

${LEVIN_KYLA}

**Pohjaratkaisu**
Alakerrassa on ruokapöytä, sohva ja minikeittiö, jossa astianpesukone, uuni, mikroaaltouuni, kahvinkeitin ja leivänpaahdin. Parven portaat ovat jyrkät. Lapsia varten portaissa on turvaportti, mutta iäkkäämmille vieraille portaat voivat olla hankalat.

**Sauna, pesukone ja kuivauskaappi**
Huoneistossa on oma sauna, pesukone ja kuivauskaappi, joten varusteet kuivuvat yön aikana. Talossa on lisäksi suksivarasto ja huoltotila.

**Sijainti**
Rinteille ja laduille on noin 400 metriä, ja pulkkamäki kulkee talon ohi. Lähin kauppa on 150 metrin päässä. Hintaan sisältyy yksi pysäköintipaikka lämmitystolpalla.

**Varustelu**
Minikeittiö, oma sauna, pesukone, kuivauskaappi, ilmainen WiFi ja TV. Liinavaatteet ja pyyhkeet voi tilata lisäpalveluna tai tuoda omat.`,
  },
  "glacier-a1": {
    name: "Levi Glacier A1",
    metaDescription:
      "92 m² huoneisto 8 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Neljä makuuhuonetta, oma sauna, hisseille 200 m. Lemmikit sallittu.",
    shortDescription:
      "92 m² huoneisto Eturinteen juurella Zero Point -alueella. Neljä makuuhuonetta kahdeksalle. Kaksi kerrosta: katutaso ja alakerta, josta suora uloskäynti. Oma sauna, lämmin suksivarasto ja talossa lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**92 m² ja neljä makuuhuonetta Eturinteen juurella**

Yksi suurimmista huoneistoistamme ja lähimpänä rinteitä. Huoneisto on Eturinteen Alppikylässä osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Neljään makuuhuoneeseen mahtuu kahdeksan henkeä, joten huoneisto sopii perheille, kaveriporukoille ja urheilujoukkueille. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Kaksi kerrosta**
Neljässä makuuhuoneessa on yhteensä kahdeksan vuodetta. Oleskelutilat ovat katutasossa, ja alakerrasta on suora uloskäynti ja yhteys suksienhuoltotilaan. Ulko-ovelle on vain yksi askelma. Tilavassa keittiössä ja olohuoneessa koko porukka mahtuu syömään ja viettämään iltaa yhdessä.

**Sauna ja kuivauskaappi**
Huoneistossa on oma sauna, pesukone ja kuivauskaappi. Tilava huoneisto sopii hyvin myös pidemmille lomille.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, kuivauskaappi, suksivarasto, WiFi, TV ja radio. Lemmikit sallittu. Samassa talossa on samanlainen huoneisto A3.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-a2": {
    name: "Levi Glacier A2",
    metaDescription:
      "67 m² kolmen makuuhuoneen huoneisto 5 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Oma sauna, iso parveke. Lemmikit sallittu.",
    shortDescription:
      "67 m² kolmen makuuhuoneen huoneisto Eturinteen juurella Zero Point -alueella. Viisi vuodetta viidelle hengelle. Koko huoneiston levyinen parveke. Oma sauna. Lemmikit sallittu.",
    longDescription: `**67 m² ja kolme makuuhuonetta Eturinteen juurella**

Huoneisto on Eturinteen Alppikylässä osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Kolmeen makuuhuoneeseen mahtuu viisi henkeä, ja huoneisto sopii hyvin perheille ja pienille porukoille, jotka haluavat asua mahdollisimman lähellä rinteitä. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Kolme makuuhuonetta kahdessa tasossa**
Makuuhuoneissa on yhteensä viisi vuodetta. Oleskelutilat ovat katutasossa, ja alakerrasta on suora uloskäynti ja yhteys suksienhuoltotilaan. Ulko-ovelle on vain yksi askelma. Koko huoneiston levyiseltä parvekkeelta näkee kylän elämän.

**Sauna ja kuivauskaappi**
Oma sauna rinnepäivän jälkeen. Pesukone ja kuivauskaappi kuuluvat varusteluun.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, kuivauskaappi, suksivarasto, koko huoneiston levyinen parveke, WiFi ja TV. Lemmikit sallittu.

**Tarvitsetko enemmän tilaa?**
Samassa talossa ovat myös 92 m²:n neljän makuuhuoneen huoneistot A1 ja A3 kahdeksalle hengelle.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-a3": {
    name: "Levi Glacier A3",
    metaDescription:
      "92 m² huoneisto 8 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Neljä makuuhuonetta, oma sauna, hisseille 200 m. Lemmikit sallittu.",
    shortDescription:
      "92 m² huoneisto neljällä makuuhuoneella Eturinteen juurella, samassa talossa kuin A1. Kaksi kerrosta: katutaso ja alakerta. Muutaman askeleen päässä rinteistä. Oma sauna ja talossa lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**92 m² ja neljä makuuhuonetta Eturinteen juurella**

Yksi suurimmista huoneistoistamme ja lähimpänä rinteitä. Huoneisto on Eturinteen Alppikylässä osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Neljään makuuhuoneeseen mahtuu kahdeksan henkeä, joten huoneisto sopii perheille, kaveriporukoille ja urheilujoukkueille. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Kaksi kerrosta**
Neljässä makuuhuoneessa on yhteensä kahdeksan vuodetta. Oleskelutilat ovat katutasossa, ja alakerrasta on suora uloskäynti ja yhteys suksienhuoltotilaan. Ulko-ovelle on vain yksi askelma. Tilavassa keittiössä ja olohuoneessa koko porukka mahtuu syömään ja viettämään iltaa yhdessä.

**Sauna ja kuivauskaappi**
Huoneistossa on oma sauna, pesukone ja kuivauskaappi. Tilava huoneisto sopii hyvin myös pidemmille lomille.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, kuivauskaappi, suksivarasto, WiFi, TV ja radio. Lemmikit sallittu. Samassa talossa on samanlainen huoneisto A1.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-a4": {
    name: "Levi Glacier A4",
    metaDescription:
      "72 m² huoneisto 6 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Kaksi makuuhuonetta ja alkovit, oma sauna. Lemmikit sallittu.",
    shortDescription:
      "72 m² huoneisto toisessa kerroksessa Eturinteen juurella. Kaksi makuuhuonetta ja yläkerrassa kaksi alkovivuodetta, yhteensä kuudelle. Parvekkeet molemmissa kerroksissa. Oma sauna. Lemmikit sallittu.",
    longDescription: `**72 m², kaksi makuuhuonetta ja alkovit yläkerrassa**

Huoneisto on Eturinteen Alppikylän talon toisessa kerroksessa osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Kahdessa makuuhuoneessa on neljä vuodetta, ja yläkerran avoimissa alkoveissa on kaksi lisävuodetta, joten huoneistoon mahtuu kuusi henkeä. Lapset tykkäävät alkoveista. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Parvekkeet kahdessa kerroksessa**
Koko huoneiston levyinen parveke avautuu kadulle ja Hullu Poro Areenan suuntaan, ja yläkerrassa on toinen parveke samaan suuntaan. Parvekkeelta näkee Levin iltaelämän.

**Sauna**
Oma sauna rinnepäivän jälkeen.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, suksivarasto, parvekkeet kahdessa kerroksessa, WiFi ja TV. Lemmikit sallittu. Samassa talossa on samanlainen huoneisto A6 sekä 67 m²:n kolmen makuuhuoneen huoneisto A2.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-a5-penthouse": {
    name: "Levi Glacier Penthouse A5",
    metaDescription:
      "84 m² penthouse 8 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Neljä makuuhuonetta, oma sauna, kaksi parveketta. Lemmikit sallittu.",
    shortDescription:
      "84 m² penthouse ylimmässä kerroksessa Eturinteen juurella. Neljä makuuhuonetta kahdeksalle. Parvekkeet kahdessa kerroksessa. Oma sauna ja talossa lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**84 m² penthouse ja neljä makuuhuonetta**

Penthouse on Eturinteen Alppikylän talon ylimmässä kerroksessa osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Parvekkeilta näkyy Hullu Poro Areenan suuntaan. Neljään makuuhuoneeseen mahtuu kahdeksan henkeä, joten huoneisto sopii isoille perheille, kahdelle perheelle yhdessä tai kaveriporukoille. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Neljä makuuhuonetta**
Jokaisessa makuuhuoneessa on kaksi vuodetta, jotka voi pitää erillään tai siirtää yhteen. Ylin kerros tekee huoneistosta valoisan ja avaran. Kaksi parveketta avautuu kadulle ja Hullu Poro Areenan suuntaan.

**Sauna**
Oma sauna rinnepäivän päätteeksi.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, suksivarasto, parvekkeet kahdessa kerroksessa, WiFi ja TV. Lemmikit sallittu.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-a6": {
    name: "Levi Glacier A6",
    metaDescription:
      "72 m² huoneisto 6 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Kaksi makuuhuonetta ja alkovit, oma sauna. Lemmikit sallittu.",
    shortDescription:
      "72 m² huoneisto toisessa kerroksessa Eturinteen juurella. Kaksi makuuhuonetta ja yläkerrassa kaksi alkovivuodetta, yhteensä kuudelle. Parvekkeet kadulle. Sama pohjaratkaisu kuin A4. Lemmikit sallittu.",
    longDescription: `**72 m², kaksi makuuhuonetta ja alkovit yläkerrassa**

Huoneisto on Eturinteen Alppikylän talon toisessa kerroksessa osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Kahdessa makuuhuoneessa on neljä vuodetta, ja yläkerran avoimissa alkoveissa on kaksi lisävuodetta, joten huoneistoon mahtuu kuusi henkeä. Lapset tykkäävät alkoveista. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Parvekkeet kahdessa kerroksessa**
Koko huoneiston levyinen parveke avautuu kadulle ja Hullu Poro Areenan suuntaan, ja yläkerrassa on toinen parveke samaan suuntaan. Parvekkeelta näkee Levin iltaelämän.

**Sauna**
Oma sauna rinnepäivän jälkeen.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, suksivarasto, parvekkeet kahdessa kerroksessa, WiFi ja TV. Lemmikit sallittu. Samassa talossa on samanlainen huoneisto A4 sekä 67 m²:n kolmen makuuhuoneen huoneisto A2.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-b1": {
    name: "Levi Glacier B1",
    metaDescription:
      "105 m² huoneisto 10 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Viisi makuuhuonetta, oma sauna, rinnenäkymä. Lemmikit sallittu.",
    shortDescription:
      "105 m² huoneisto ensimmäisessä kerroksessa: viisi makuuhuonetta, kussakin kaksi vuodetta. Koko huoneiston levyinen parveke, näkymä Eturinteeseen. Talossa lasten leikkihuone. Liinavaatteet lisäpalveluna. Lemmikit sallittu.",
    longDescription: `**105 m² ja viisi makuuhuonetta kymmenelle**

Glacier-talojen suurin huoneisto ja yksi Levin parhaista ryhmämajoituksista rinteiden vieressä. Huoneisto on Eturinteen Alppikylässä osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Se sopii isoille perheille, urheilujoukkueille ja kaveriporukoille, jotka haluavat tilaa ja sijainnin rinteiden vieressä. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Viisi makuuhuonetta**
Jokaisessa viidessä makuuhuoneessa on kaksi vuodetta, joten jokaisella on oma rauhansa. Huoneisto on ensimmäisessä kerroksessa, ja koko huoneiston levyiseltä parvekkeelta sivukadun puolelta näkyy Eturinteeseen. Tilava oleskelutila sopii yhteisille aterioille, peli-illoille ja rentoutumiseen rinnepäivän jälkeen.

**Sauna**
Oma sauna koko porukalle.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, suksivarasto, koko huoneiston levyinen parveke rinnenäkymällä, WiFi ja TV. Liinavaatteet voi tilata lisäpalveluna tai tuoda omat. Lemmikit sallittu.

**Isommalle ryhmälle**
Samassa talossa on samanlainen huoneisto B2. Jos B1 on varattu, katso B2:n saatavuus, tai varaa molemmat, jolloin majoitusta on 20 hengelle.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-b2": {
    name: "Levi Glacier B2",
    metaDescription:
      "105 m² huoneisto 10 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Viisi makuuhuonetta, oma sauna, rinnenäkymä. Lemmikit sallittu.",
    shortDescription:
      "105 m² huoneisto ensimmäisessä kerroksessa viidellä makuuhuoneella. B1:n kaksoshuoneisto, molemmat yhdessä 20 hengelle. Koko huoneiston levyinen parveke, näkymä Eturinteeseen. Lemmikit sallittu.",
    longDescription: `**105 m² ja viisi makuuhuonetta kymmenelle**

Toinen Glacier-talojen kahdesta suurimmasta huoneistosta ja yksi Levin parhaista ryhmämajoituksista rinteiden vieressä. Huoneisto on Eturinteen Alppikylässä osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Se sopii isoille perheille, urheilujoukkueille ja kaveriporukoille. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Viisi makuuhuonetta**
Jokaisessa viidessä makuuhuoneessa on kaksi vuodetta. Huoneisto on ensimmäisessä kerroksessa, ja koko huoneiston levyiseltä parvekkeelta sivukadun puolelta näkyy Eturinteeseen. Tilavaan oleskelutilaan mahtuu koko porukka yhteisille aterioille.

**Sauna**
Oma sauna koko porukalle.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, suksivarasto, koko huoneiston levyinen parveke rinnenäkymällä, WiFi ja TV. Liinavaatteet voi tilata lisäpalveluna tai tuoda omat. Lemmikit sallittu.

**Isommalle ryhmälle**
Samassa talossa on samanlainen huoneisto B1. Jos B2 on varattu, katso B1:n saatavuus, tai varaa molemmat, jolloin majoitusta on 20 hengelle.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-b3-penthouse": {
    name: "Levi Glacier Penthouse B3",
    metaDescription:
      "87 m² penthouse 8 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Kolme makuuhuonetta ja alkovit, sauna, rinneparveke.",
    shortDescription:
      "87 m² penthouse Eturinteen juurella. Kolme makuuhuonetta ja yläkerrassa kaksi alkovivuodetta, yhteensä kahdeksalle. Parvekkeet molemmissa kerroksissa, yläparvekkeelta näkymä Eturinteeseen. Talossa lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**87 m² penthouse ja parveke Eturinteen puolelle**

Tilava penthouse Eturinteen Alppikylän talon ylimmässä kerroksessa osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Kolmessa makuuhuoneessa ja yläkerran avoimissa alkoveissa on tilaa kahdeksalle. Yläparvekkeelta näkyy Eturinteeseen, ja illalla valaistua rinnettä voi katsella omalta parvekkeelta. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Kolme makuuhuonetta ja alkovit**
Pääkerroksessa on kolme makuuhuonetta, ja yläkerran avoimissa alkoveissa on kaksi vuodetta, joista lapset tykkäävät. Pääkerroksen koko huoneiston levyinen parveke avautuu kadulle, yläkerran parveke Eturinteeseen.

**Sauna**
Oma sauna rinnepäivän päätteeksi.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, suksivarasto, parvekkeet kahdessa kerroksessa, WiFi ja TV. Lemmikit sallittu.

**Isommalle ryhmälle**
Samassa talossa on samanlainen penthouse B4. Jos B3 on varattu, katso B4:n saatavuus, tai varaa molemmat, jolloin majoitusta on 16 hengelle.

${MATKATAVARAT_GLACIER}`,
  },
  "glacier-b4-penthouse": {
    name: "Levi Glacier Penthouse B4",
    metaDescription:
      "87 m² penthouse 8 hengelle Eturinteen juurella, Ratsastajankuja 2, Levi. Kolme makuuhuonetta ja alkovit, sauna, rinneparveke.",
    shortDescription:
      "87 m² penthouse Eturinteen juurella, B3:n peilikuva. Kolme makuuhuonetta ja yläkerrassa kaksi alkovivuodetta, yhteensä kahdeksalle. Parvekkeet molemmissa kerroksissa, yläparvekkeelta näkymä Eturinteeseen. Talossa lasten leikkihuone. Lemmikit sallittu.",
    longDescription: `**87 m² penthouse ja parveke Eturinteen puolelle**

Toinen kahdesta samanlaisesta penthousesta Eturinteen Alppikylän talon ylimmässä kerroksessa osoitteessa Ratsastajankuja 2, Zero Point -alueella, noin 200 metrin päässä Eturinteen hisseistä. Kolmessa makuuhuoneessa ja yläkerran avoimissa alkoveissa on tilaa kahdeksalle. Yläparvekkeelta näkyy Eturinteeseen, ja illalla valaistua rinnettä voi katsella omalta parvekkeelta. Lemmikit ovat tervetulleita.

${LEVIN_KYLA}

**Kolme makuuhuonetta ja alkovit**
Alakerrassa on kolme makuuhuonetta, ja yläkerran avoimissa alkoveissa on kaksi vuodetta, joista lapset tykkäävät. Alakerran koko huoneiston levyinen parveke avautuu kadulle, yläkerran parveke Eturinteeseen.

**Sauna**
Oma sauna rinnepäivän päätteeksi.

${GLACIER_SIJAINTI}

${GLACIER_TALO}

**Varustelu**
Täysin varusteltu keittiö, oma sauna, pesukone, suksivarasto, parvekkeet kahdessa kerroksessa, WiFi ja TV. Lemmikit sallittu.

**Isommalle ryhmälle**
Samassa talossa on samanlainen penthouse B3. Jos B4 on varattu, katso B3:n saatavuus, tai varaa molemmat, jolloin majoitusta on 16 hengelle.

${MATKATAVARAT_GLACIER}`,
  },
};

export const locationFi: Record<string, string> = {
  "Levi Center": "Levin keskusta",
  "Front Slope": "Levin Eturinne, Zero Point -alue",
  "Glacier": "Eturinteen juurella, Zero Point -alue",
};

// Per-slug location overrides (Finnish), used when the generic location label is misleading.
export const locationFiBySlug: Record<string, string> = {
  "zero-point-5a2": "Levin Eturinne, Zero Point -alue",
  "zero-point-5b2": "Levin Eturinne, Zero Point -alue",
  "zero-point-5b5-penthouse": "Levin Eturinne, Zero Point -alue",
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

/** Finnish versions of English highlight badges in properties.ts. */
export const highlightFi: Record<string, string> = {
  "Built 2021, modern apartment in Levi center": "Valmistunut 2021, moderni huoneisto Levin keskustassa",
  "In-house laundry room with a professional washing machine": "Talossa pesutupa ja ammattitason pesukone",
  "Top-tier alpine apartment in the heart of Levi": "Tasokas huoneisto Levin ytimessä",
  "Unique: the only log cabin in Levi center": "Levin keskustan ainoa hirsihuvila",
  "Prime location right in Levi center": "Erinomainen sijainti aivan Levin keskustassa",
  "Spacious family apartment": "Tilava perheasunto",
};
