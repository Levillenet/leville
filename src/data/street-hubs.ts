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
    h1: "Vuokramökit ja huoneistot Hiihtäjänkujalla, Levi",
    metaTitle: "Hiihtäjänkuja Levi – vuokrahuoneistot Eturinteellä | Leville.net",
    metaDescription:
      "Front Slope -alppihuoneistot Hiihtäjänkujalla, Levin Eturinteellä. Saunalliset huoneistot 200 m Eturinteen rinteiltä – varaa suoraan ilman välityspalkkioita.",
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
    h1: "Vuokramökki Skimbaajankujalla, Levi – Karhupirtti hirsihuvila",
    metaTitle: "Skimbaajankuja Levi – Karhupirtti hirsihuvila 14 hengelle | Leville.net",
    metaDescription:
      "Karhupirtti on perinteinen hirsihuvila Skimbaajankujalla, Levin keskustassa. Ulkoporeallas, takka, 7 makuuhuonetta – varaa suoraan ilman välityspalkkioita.",
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
    slug: "ratsastajankuja-levi",
    street: "Ratsastajankuja",
    address: "Ratsastajankuja 2",
    h1: "Vuokramökit ja huoneistot Ratsastajankuja 2, Levi – Glacier-alppitalo",
    metaTitle: "Ratsastajankuja 2 Levi – Glacier-alppihuoneistot Alppikylässä | Leville.net",
    metaDescription:
      "Glacier A & B -alppihuoneistot Ratsastajankuja 2:ssa, Levin Eturinteen Alppikylässä. Vain n. 20 m hiihtoladulta ja n. 150 m päärinteestä – 10 saunallista huoneistoa.",
    subtitle:
      "Glacier-alppitalo Eturinteen Alppikylässä – n. 20 m hiihtoladulta ja n. 150 m päärinteestä.",
    intro: [
      "Ratsastajankuja 2 sijaitsee Levin Eturinteen Alppikylässä loistavalla sijainnilla: hiihtoladulle on vain noin 20 metriä ja päärinteelle noin 150 metriä. Kaikki keskustan palvelut, ravintolat ja kaupat ovat askelmatkan päässä. Osoitteessa sijaitsee Levi Glacier -alppitalo, jossa on yhteensä 10 modernia huoneistoa kahdessa rakennuksessa (A- ja B-talot).",
      "Glacier-huoneistot on suunniteltu erityisesti perheille, urheiluseuroille ja yritysryhmille. Jokaisessa huoneistossa on oma sauna, parveke ja täysin varusteltu keittiö. Huoneistoja on kahdesta neljään makuuhuonetta, ja kattohuoneistoissa on tilaa jopa kymmenelle hengelle. Talossa on myös pelihuone lapsille.",
      "Kun haluat majoittaa koko seurueen samaan rakennukseen, voit varata 4–10 huoneistoa kerrallaan ja saada koko talon yksityiskäyttöön. Kaikki Glacierin huoneistot voi varata suoraan Leville.netin kautta ilman välityspalkkioita.",
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
      { label: "Hiihtoladulle", value: "n. 20 m" },
      { label: "Päärinteelle", value: "n. 150 m" },
      { label: "Levin keskustaan", value: "n. 400 m" },
      { label: "Huoneistoja yhteensä", value: "10 (A & B)" },
    ],
  },
  {
    slug: "glacier-apartments-levi",
    street: "Glacier Apartments",
    address: "Ratsastajankuja 2",
    h1: "Glacier Apartments Levi – Levin keskustan suurin 10 huoneiston alppitalo",
    metaTitle: "Glacier Apartments Levi – 10 saunallista alppihuoneistoa | Leville.net",
    metaDescription:
      "Levi Glacier Apartments – 10 saunallisen huoneiston alppitalo Ratsastajankuja 2:ssa Levin Eturinteen Alppikylässä. Vain n. 20 m hiihtoladulta ja n. 150 m päärinteestä.",
    subtitle:
      "Levin keskustan suurin alppitalo Eturinteen Alppikylässä – n. 20 m hiihtoladulta ja n. 150 m päärinteestä.",
    intro: [
      "Levi Glacier Apartments on Levin keskustan suurin yksittäinen huoneistokokonaisuus: 10 modernia saunallista alppihuoneistoa samassa osoitteessa, Ratsastajankuja 2:ssa Eturinteen Alppikylässä. Sijainti on huippuluokkaa – hiihtoladulle on vain noin 20 metriä ja päärinteelle noin 150 metriä, ja kaikki Levin keskustan palvelut, ravintolat ja kaupat löytyvät askelmatkan päästä. Lähistöllä ovat myös Hullu Poro -hotelli ja Hullu Poro Areena.",
      "Glacier Apartments jakautuu kahteen rakennukseen (A- ja B-talo), joissa on yhteensä kuusi A-puolen ja neljä B-puolen huoneistoa. Huoneistoissa on 2–4 makuuhuonetta ja kattohuoneistoissa (A5, B3, B4 Penthouse) tilaa jopa kymmenelle hengelle. Jokaisessa huoneistossa on oma sauna, parveke, täysin varusteltu keittiö ja WiFi. Talossa on myös lasten pelihuone.",
      "Glacier Apartments on Levin suosituin valinta isoille ryhmille, urheiluseuroille, yritystapahtumille ja sukujuhlille – voit varata jopa koko 10 huoneiston talon samalle ajalle ja saada sen yksityiskäyttöön. Kaikki Glacier-huoneistot voi varata suoraan Leville.netin kautta ilman välityspalkkioita.",
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
      { label: "Levin keskustaan", value: "n. 400 m" },
      { label: "Suurin huoneisto", value: "10 hengelle (Penthouse)" },
    ],
  },
  {
    slug: "postintie-levi",
    street: "Postintie",
    address: "Postintie 3",
    h1: "Vuokrahuoneistot Postintie 3, Levi – Skistar-talon kolmiot ja studiot",
    metaTitle: "Postintie 3 Levi – Skistar-talon vuokrahuoneistot keskustassa | Leville.net",
    metaDescription:
      "Skistar-talon kolmiot ja studiot Postintie 3:ssa, aivan Levin keskustassa. 9 huoneistoa kävelymatkan päässä rinteistä, ravintoloista ja palveluista – varaa suoraan.",
    subtitle:
      "Skistar-talo Levin keskustassa – 9 huoneistoa kävelymatkan päässä rinteistä ja palveluista.",
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
];

export const getStreetHub = (slug: string) =>
  streetHubs.find((h) => h.slug === slug);
