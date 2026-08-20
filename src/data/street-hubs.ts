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
];


export const getStreetHub = (slug: string) =>
  streetHubs.find((h) => h.slug === slug);
