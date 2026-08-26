// Katu-pohjaiset SEO-hubit Levin keskustan vuokramökeille ja huoneistoille.
// Jokainen hub kerää tietyn kadun omat kohteet (slug-viitteinä properties.ts:ään).

export interface StreetHub {
  /** URL-segmentti: /vuokramokit/<slug> */
  slug: string;
  /** Kadun nimi, esim. "Hiihtäjänkuja" */
  street: string;
  /** Tarkka osoite jos on (esim. "Ratsastajankuja 2") */
  address?: string;
  /** Sivun H1 */
  h1: string;
  /** <title> */
  metaTitle: string;
  /** Meta description (≤155 mrk) */
  metaDescription: string;
  /** Lyhyt 1-rivin yhteenveto sivulle (subtitle) */
  subtitle: string;
  /** Pidempi paikalliskuvaus (200–300 sanaa) */
  intro: string[];
  /** Property slugit /majoitukset/<slug> -sivuille */
  propertySlugs: string[];
  /** Lähimmät palvelut / etäisyydet info-listaan */
  facts: { label: string; value: string }[];
  /** Brändinimet JSON-LD alternateName + hubtaulukon esittelyyn */
  brandNames?: string[];
  /** Sijainnin lyhyt kuvaus (esim. "Zero Point, ydinkeskusta") hubtaulukkoa varten */
  locationLabel?: string;
  /** Kapasiteetti "2–6 hlö" / "14 hlö" hubtaulukkoa varten */
  capacityLabel?: string;
}


export const streetHubs: StreetHub[] = [
  {
    slug: "hiihtajankuja-levi",
    street: "Hiihtäjänkuja",
    h1: "Front Slope Apartments Levi – vuokrahuoneistot Hiihtäjänkujalla Eturinteellä",
    metaTitle: "Front Slope Apartments Levi – vuokrahuoneistot Eturinteellä | Leville.net",
    metaDescription:
      "Front Slope -huoneistot Hiihtäjänkujalla, Levin Eturinteellä: saunallisia kämppiä 2–8 hengelle, rinne ja hissi n. 200 m. Varaa suoraan ilman välityspalkkioita.",
    brandNames: ["Front Slope Apartments", "Front Slope Levi", "Hiihtäjänkuja Levi"],
    locationLabel: "Eturinne, Zero Point",
    capacityLabel: "2–8 hlö",
    subtitle:
      "Levin Eturinne, Zero Point -alueella – noin 200 metriä Eturinteen rinteiltä.",
    intro: [
      "Hiihtäjänkuja sijaitsee Levin Eturinteen juurella Zero Point -alueella, noin 200 metrin päässä Eturinteen rinteiltä ja hisseiltä. Katu on yksi Levin halutuimmista majoituskaduista, koska rinteille pääsee suksilla suoraan ovelta ja Levin keskustan palvelut ovat parin sadan metrin kävelymatkan päässä.",
      "Hiihtäjänkujan Front Slope -alppihuoneistot ovat moderneja, saunallisia ja täysin varusteltuja. Huoneistot sopivat sekä pariskunnille, perheille että pienille kaveriporukoille – Penthouse-asunnossa on tilaa jopa kymmenelle hengelle. Jokaisesta huoneistosta on lyhyt kävelymatka Hullu Poro -alueen ravintoloihin, K-Marketiin ja Levin keskustaan.",
      "Kaikki Leville.netin Hiihtäjänkujan kohteet voi varata suoraan ilman välityspalkkioita. Vapaat ajat ja hinnat näkyvät reaaliaikaisesti.",
    ],
    propertySlugs: [
      "zero-point-5a2",
      "zero-point-5b2",
      "zero-point-5b5-penthouse",
    ],
    facts: [
      { label: "Eturinteen rinteille", value: "n. 200 m" },
      { label: "Levin keskustaan", value: "n. 400 m" },
      { label: "Lähin ruokakauppa", value: "n. 250 m (K-Market Levi)" },
      { label: "Gondoli (Levi 2)", value: "n. 600 m" },
    ],

  },
  {
    slug: "skimbaajankuja-levi",
    street: "Skimbaajankuja",
    h1: "Bear Lodge / Karhupirtti Levi – 14 hengen hirsihuvila Levin keskustassa",
    metaTitle: "Bear Lodge / Karhupirtti Levi – 14 hengen hirsihuvila | Leville.net",
    metaDescription:
      "Bear Lodge Karhupirtti Levin keskustassa päärinteen alueella: 14 hengen hirsihuvila, ulkoporeallas, sauna ja takka. Varaa suoraan ilman välityspalkkioita.",
    brandNames: ["Bear Lodge", "Bear Lodge Levi", "Karhupirtti", "Karhupirtti Levi"],
    locationLabel: "Levin keskusta, päärinteen alue",
    capacityLabel: "14 hlö",
    subtitle:
      "Tunnelmallinen hirsihuvila ulkoporealtaalla Levin keskustassa.",
    intro: [
      "Skimbaajankuja on rauhallinen sivukatu Levin keskustassa, lyhyen kävelymatkan päässä Hullu Poro -ravintoloista ja Levin pääkadulta. Kadulla sijaitsee Karhupirtti – perinteinen, tilava hirsihuvila joka sopii suurille perheille, ystäväporukoille ja yritysryhmille.",
      "Karhupirtissä on 7 makuuhuonetta, takka, täysin varusteltu keittiö ja oma ulkoporeallas pihalla. Mökki majoittaa enintään 14 henkeä ja tarjoaa aidon lappilaisen hirsimökkikokemuksen ilman että keskustan palveluista täytyy tinkiä. Lähimmät rinteet (Front Slope) ovat parin sadan metrin päässä.",
      "Skimbaajankujan Karhupirtti voi varata suoraan Leville.netin kautta – ilman välityspalkkioita ja samat hinnat kuin Booking.comissa.",
    ],
    propertySlugs: ["karhupirtti"],
    facts: [
      { label: "Levin keskustaan", value: "n. 300 m" },
      { label: "Front Slope -rinteille", value: "n. 350 m" },
      { label: "Lähin ravintola", value: "n. 200 m (Hullu Poro)" },
      { label: "Makuupaikkoja", value: "14" },
    ],
  },
  {
    slug: "glacier-apartments-levi",
    street: "Glacier Apartments",
    address: "Ratsastajankuja 2",
    h1: "Glacier Apartments Levi – 10 huoneiston kokonaisuus Eturinteen Alppikylässä",
    metaTitle: "Glacier Apartments Levi – 10 perhehuoneistoa keskustassa | Leville.net",
    metaDescription:
      "Glacier Apartments Ratsastajankuja 2: 10 saunallista perhehuoneistoa Levin ydinkeskustassa. Hiihtoladulle 20 m, päärinteelle 150 m. Varaa suoraan ilman välityspalkkioita.",
    brandNames: ["Glacier Apartments", "Glacier Apartments Levi", "Levi Glacier", "Glacier Levi"],
    locationLabel: "Eturinteen Alppikylä, ydinkeskusta",
    capacityLabel: "6–10 hlö (4–5 mh)",
    subtitle:
      "Levin suurin yksittäinen huoneistokokonaisuus Eturinteen Alppikylässä – 10 perhehuoneistoa, hiihtoladulle 20 m ja päärinteelle 150 m.",
    intro: [
      "Levi Glacier Apartments on Levin ydinkeskustan suurin yksittäinen huoneistokokonaisuus: 10 modernia saunallista perhehuoneistoa samassa osoitteessa, Ratsastajankuja 2:ssa Eturinteen Alppikylä -alueella. Sijainti on huippuluokkaa – hiihtoladulle on vain noin 20 metriä ja päärinteelle noin 150 metriä, ja kaikki Levin keskustan palvelut, ravintolat ja kaupat löytyvät askelmatkan päästä.",
      "Glacier Apartments jakautuu kahteen rakennukseen (A- ja B-talo), joissa on yhteensä kuusi A-puolen ja neljä B-puolen huoneistoa. Pääosin huoneistoissa on 4–5 makuuhuonetta ja tilaa 6–10 hengelle; kattohuoneistoissa (A5, B3, B4 Penthouse) majoittuu jopa kymmenen henkeä. Jokaisessa huoneistossa on oma sauna, parveke, täysin varusteltu keittiö ja WiFi. Talossa on myös lasten pelihuone.",
      "Glacier Apartments on Levin suosituin valinta isoille perheille, urheiluseuroille, yritystapahtumille ja sukujuhlille – voit varata jopa koko 10 huoneiston talon samalle ajalle ja saada sen yksityiskäyttöön. Kaikki Glacier-huoneistot voi varata suoraan Leville.netin kautta ilman välityspalkkioita.",
    ],
    propertySlugs: [
      "glacier-a1",
      "glacier-a2",
      "glacier-a3",
      "glacier-a4",
      "glacier-a5-penthouse",
      "glacier-a6",
      "glacier-b1",
      "glacier-b2",
      "glacier-b3-penthouse",
      "glacier-b4-penthouse",
    ],
    facts: [
      { label: "Huoneistoja yhteensä", value: "10 (A & B)" },
      { label: "Hiihtoladulle", value: "n. 20 m" },
      { label: "Päärinteelle", value: "n. 150 m" },
      { label: "Sijainti", value: "Eturinteen Alppikylä, ydinkeskusta" },
      { label: "Makuuhuoneita", value: "pääosin 4–5 mh" },
    ],
  },
  {
    slug: "postintie-levi",
    street: "Postintie",
    address: "Postintie 3",
    h1: "Skistar-talon huoneistot Levi – Postintie 3 keskustassa",
    metaTitle: "Skistar-talon huoneistot Levi – Postintie 3 keskustassa | Leville.net",
    metaDescription:
      "Skistar-talon vuokrahuoneistot Levin keskustassa Postintie 3:ssa: saunallisia kämppiä 2–6 hengelle, kylpylän vieressä. Varaa suoraan ilman välityspalkkioita.",
    brandNames: ["Skistar-talo", "Skistar-talo Levi", "Skistar Levi", "Postintie 3 Levi"],
    locationLabel: "Ydinkeskusta",
    capacityLabel: "2–6 hlö",
    subtitle:
      "Skistar-talo Levin keskustassa – 10 huoneistoa kävelymatkan päässä rinteistä ja palveluista.",
    intro: [
      "Postintie 3 sijaitsee aivan Levin ydinkeskustassa, askelten päässä K-Marketista, ravintoloista ja Levin pääkadun palveluista. Osoitteessa sijaitsee Skistar-talo, jossa Leville.netillä on yhteensä 10 huoneistoa: viisi kaksiota (kerrokset 2 ja 3) ja viisi studiota (kerrokset 1 ja 3).",
      "Skistar-talon kaksiot sopivat perheille ja pienille kaveriporukoille, kun taas modernit studiot ovat erinomainen valinta pariskunnille tai yksin matkustaville Leville. Jokaisessa huoneistossa on täysin varusteltu keittiö ja WiFi. Talossa ei ole hissiä. Sijainti on Levin keskustassa palveluiden ja kauppojen lähistöllä – hisseille on noin 700 metrin kävelymatka (n. 8–10 min), joten ei ihan ovelta rinteeseen, mutta kuitenkin lähistöllä.",
      "Kun haluat ryhmämajoitusta keskustassa, voit varata useamman Skistar-huoneiston samasta talosta yhdellä kertaa. Kaikki Postintie 3:n huoneistot voi varata suoraan Leville.netin kautta – ilman välityspalkkioita ja samat hinnat kuin Booking.comissa.",
    ],
    propertySlugs: [
      "skistar-211",
      "skistar-212",
      "skistar-209",
      "skistar-210",
      "skistar-310",
      "skistar-studio-102",
      "skistar-studio-104",
      "skistar-studio-319",
      "skistar-studio-320",
      "skistar-studio-321",
    ],
    facts: [
      { label: "Levin keskustaan", value: "askelmatka" },
      { label: "Hisseille / rinteille", value: "n. 700 m (8–10 min kävely)" },
      { label: "Lähin ruokakauppa", value: "n. 150 m (K-Market Levi)" },
      { label: "Huoneistoja yhteensä", value: "10 (kaksiot & studiot)" },
    ],
  },
  {
    slug: "hiihtajankuja-2-levi",
    street: "Hiihtäjänkuja",
    address: "Hiihtäjänkuja 2",
    h1: "Levi Platinum Hiihtäjänkuja 2 – studiomajoitus Eturinteen juurella",
    metaTitle: "Levi Platinum, Hiihtäjänkuja 2 – studio Eturinteellä | Leville.net",
    metaDescription:
      "Levi Platinum A2 -studio Hiihtäjänkuja 2:ssa Levin Eturinteen juurella: oma sauna, 37 m², 1–4 hengelle. Varaa suoraan omistajalta ilman välityspalkkioita.",
    brandNames: ["Levi Platinum", "Levi Platinum A2", "Hiihtäjänkuja 2 Levi"],
    locationLabel: "Eturinne, Hiihtäjänkuja 2",
    capacityLabel: "1–4 hlö",
    subtitle:
      "Levi Platinum -talo Hiihtäjänkuja 2:ssa – Eturinteen juurella, kävelymatka keskustaan.",
    intro: [
      "Hiihtäjänkuja 2 sijaitsee Levin Eturinteen juurella, samalla kadulla kuin Front Slope -alppihuoneistot. Osoite on yksi Levin käytännöllisimmistä: rinteille ja hisseille on lyhyt matka, ja Levin keskustan ravintolat ja kaupat ovat kävelyetäisyydellä.",
      "Leville.netillä on Hiihtäjänkuja 2:ssa Levi Platinum Superior Studio A2 – 37 neliön studio, joka avattiin vuonna 2023 ja on kohteistamme uusin. Studiossa on oma sauna, lattialämmitys, pyykinpesukone ja kuivauskaappi. Se sopii pariskunnille sekä pienelle perheelle, majoitusta enintään neljälle hengelle. Lemmikkejä kohteeseen ei valitettavasti voi ottaa.",
      "Varaus tapahtuu suoraan meiltä ilman välityspalkkioita, ja vapaat ajat näkyvät reaaliaikaisesti.",
    ],
    propertySlugs: ["levi-platinum-a2"],
    facts: [
      { label: "Eturinteen rinteille", value: "n. 250 m" },
      { label: "Levin keskustaan", value: "n. 400 m" },
      { label: "Lähin ruokakauppa", value: "n. 250 m (K-Market Levi)" },
      { label: "Kohteita osoitteessa", value: "1 studio (1–4 hlö)" },
    ],
  },
  {
    slug: "skimbaajankuja-4-levi",
    street: "Skimbaajankuja",
    address: "Skimbaajankuja 4",
    h1: "Karhunvartija 3, Skimbaajankuja 4 – perhehuoneisto Levin keskustassa",
    metaTitle: "Karhunvartija 3, Skimbaajankuja 4 Levi – perhehuoneisto | Leville.net",
    metaDescription:
      "Karhunvartija 3 Skimbaajankuja 4:ssä Levin keskustassa: 42 m², 2 makuuhuonetta, oma sauna, takka ja aidattu piha. Lemmikit sallittu. Varaa suoraan omistajalta.",
    brandNames: ["Karhunvartija 3", "Karhunvartija Levi", "Skimbaajankuja 4 Levi"],
    locationLabel: "Levin keskusta, Skimbaajankuja 4",
    capacityLabel: "1–4 hlö",
    subtitle:
      "Karhunvartija 3 – kahden makuuhuoneen huoneisto omalla saunalla ja takalla Levin keskustassa.",
    intro: [
      "Skimbaajankuja 4 sijaitsee Levin keskustan tuntumassa, samalla alueella kuin Karhupirtti-hirsihuvila. Alue on rauhallinen mutta silti kävelymatkan päässä Levin palveluista ja rinnealueesta.",
      "Osoitteessa on Karhunvartija 3 -huoneistomme: 42 neliötä, kaksi makuuhuonetta, luonnonkivitakka, oma sauna ja aidattu piha. Oma sisäänkäynti on Ratsastajankujan puolelta. Huoneisto majoittaa neljä henkeä ja sopii erityisen hyvin perheille – lemmikit ovat tervetulleita.",
      "Kohteen voi varata suoraan Leville.netin kautta ilman välityspalkkioita, ja saatavuus näkyy reaaliaikaisesti.",
    ],
    propertySlugs: ["karhunvartija-3"],
    facts: [
      { label: "Levin keskustaan", value: "n. 500 m" },
      { label: "Rinteille", value: "n. 500 m" },
      { label: "Makuuhuoneet", value: "2 (4 hengelle)" },
      { label: "Lemmikit", value: "Sallittu" },
    ],
  },
  {
    slug: "leviraitti-levi",
    street: "Leviraitti",
    address: "Leviraitti",
    h1: "Moonlight 415 Leviraitilla – studiomajoitus Levin sydämessä",
    metaTitle: "Moonlight 415, Leviraitti Levi – studio keskustassa | Leville.net",
    metaDescription:
      "Moonlight 415 -loftstudio Leviraitilla, Hullu Poron vieressä: oma sauna, 28 m², 1–4 hengelle. Rinteille n. 400 m. Varaa suoraan omistajalta.",
    brandNames: ["Moonlight 415", "Moonlight Levi", "Leviraitti Levi"],
    locationLabel: "Ydinkeskusta, Leviraitti",
    capacityLabel: "1–4 hlö",
    subtitle:
      "Moonlight-talo Leviraitilla – Levin kävelykadun tuntumassa, Hullu Poron naapurissa.",
    intro: [
      "Leviraitti on Levin keskustan pääraitti, jonka varrella ovat resortin ravintolat, kaupat ja iltaelämä. Osoite on paras mahdollinen, jos haluat kaiken kävelymatkan päähän ilman autoa.",
      "Moonlight 415 on 28 neliön loftstudio Hullu Poron vieressä. Yläkerran parvella on vuodepaikat kolmelle (portaat ovat jyrkät) ja alakerrassa vuodesohva, joten majoitusta on enintään neljälle. Studiossa on oma sauna. Rinteille ja latureitille on noin 400 metriä ja lähimpään kauppaan noin 150 metriä. Lemmikkejä kohteeseen ei voi ottaa.",
      "Varaa suoraan meiltä ilman välityspalkkioita – vapaat ajat näet reaaliaikaisesti.",
    ],
    propertySlugs: ["moonlight-415"],
    facts: [
      { label: "Rinteille ja ladulle", value: "n. 400 m" },
      { label: "Lähin ruokakauppa", value: "n. 150 m" },
      { label: "Ravintolat", value: "Hullu Poro naapurissa" },
      { label: "Kohteita osoitteessa", value: "1 studio (1–4 hlö)" },
    ],
  },
];



export const getStreetHub = (slug: string) =>
  streetHubs.find((h) => h.slug === slug);
