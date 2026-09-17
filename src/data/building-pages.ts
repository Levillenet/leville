// Talokohtaiset esittelysivut ryhmille (treenileirit, yritysryhmät, sukujuhlat).
// Sivut eivät ole navigaatiossa – ne löytyvät suorasta linkistä tai Googlesta.
// Uuden talon lisääminen: lisää yksi olio tähän + reitit App.tsx:ään ja sitemapiin.

export interface BuildingFact {
  label: string;
  value: string;
}

export interface BuildingFaq {
  q: string;
  a: string;
}

export interface BuildingCrossLink {
  heading: string;
  text: string;
  linkLabel: string;
  href: string;
}

export interface BuildingLangContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  facts: BuildingFact[];
  sections: { heading: string; paragraphs: string[] }[];
  groupHeading: string;
  groupBullets: string[];
  locationHeading: string;
  locationParagraphs: string[];
  faqHeading: string;
  faqs: BuildingFaq[];
  formHeading: string;
  formIntro: string;
  crossLink?: BuildingCrossLink;
}

export interface BuildingPage {
  slug: string;
  path: { fi: string; en: string };
  name: string;
  address: string;
  postal: { street: string; postalCode: string; locality: string };
  units: number;
  images: { src: string; alt: string }[];
  geo: { lat: number; lng: number };
  fi: BuildingLangContent;
  en: BuildingLangContent;
}

export const buildingPages: BuildingPage[] = [
  {
    slug: "glacier",
    path: { fi: "/glacier", en: "/en/glacier" },
    name: "Levi Glacier Apartments",
    address: "Ratsastajankuja 2, 99130 Sirkka",
    postal: { street: "Ratsastajankuja 2", postalCode: "99130", locality: "Sirkka" },
    units: 10,
    geo: { lat: 67.8045, lng: 24.8025 },
    images: [
      { src: "/glacier/exterior-a.webp", alt: "Glacier Apartments A-talo Levin keskustassa" },
      { src: "/glacier/exterior-b.webp", alt: "Glacier Apartments B-talo Levin keskustassa" },
      { src: "/glacier/b1-b2/01.webp", alt: "Glacier Apartments -huoneiston olohuone" },
    ],
    fi: {
      metaTitle: "Harjoitusleirin ja ryhmän majoitus Levillä – Glacier Apartments | Leville.net",
      metaDescription:
        "Treenileirit ja yritysryhmät Levillä: Glacier Apartments, kaksi alppitaloa ydinkeskustassa. Koko talon voi vuokrata, suksien huoltotilat ja pelihuone. Pyydä tarjous.",
      h1: "Harjoitusleirin ja ryhmän majoitus Levillä – Glacier Apartments",
      lead: "Kaksi alppitaloa aivan Eturinteen kupeessa Levin ydinkeskustassa. Kumman tahansa talon voi vuokrata kokonaisuudessaan treenileirille, yritysryhmälle tai sukujuhlaan – koko porukka majoittuu samaan osoitteeseen.",
      facts: [
        { label: "Huoneistoja", value: "10 (kaksi taloa)" },
        { label: "Makuupaikkoja yhteensä", value: "78" },
        { label: "Hiihtoladulle", value: "n. 20 m" },
        { label: "Päärinteelle", value: "n. 150 m" },
      ],
      sections: [
        {
          heading: "Kaksi alppitaloa, kymmenen perhehuoneistoa",
          paragraphs: [
            "Glacier Apartments sijaitsee osoitteessa Ratsastajankuja 2 Levin Eturinteen Alppikylässä. Kokonaisuus muodostuu kahdesta erillisestä alppitalosta: A-talossa on kuusi huoneistoa 6–8 hengelle ja B-talossa neljä huoneistoa 8–10 hengelle. Yhteensä makuupaikkoja on 78.",
            "Kaikki huoneistot ovat perhehuoneistoja: omat makuuhuoneet, oma sauna, parveke, täysin varusteltu keittiö ja WiFi. Ryhmä saa siis samalla kertaa sekä yhteisen osoitteen että jokaiselle huoneistolle oman rauhan, keittiön ja saunan.",
          ],
        },
      ],
      groupHeading: "Treenileirit, urheiluseurat ja yritysryhmät",
      groupBullets: [
        "Kumman tahansa talon voi vuokrata kokonaan – koko leiri tai yritysryhmä majoittuu samassa osoitteessa.",
        "Erinomaiset suksien huoltotilat hiihto- ja slalomjoukkueille sekä lämmin välinevarasto.",
        "Lasten pelihuone talossa – toimii myös leirin kokoontumis- ja oleskelutilana.",
        "Omat keittiöt jokaisessa huoneistossa: ruokailun voi hoitaa itse tai keskustan ravintoloissa kävelymatkan päässä.",
        "Laskutus onnistuu yritykselle tai seuralle – sovitaan tarjouksen yhteydessä.",
        "Leiriläisiä ja yritysasiakkaita majoittuu taloissa säännöllisesti, joten järjestelyt ovat rutiinia.",
      ],
      locationHeading: "Sijainti Levin keskustassa",
      locationParagraphs: [
        "Hiihtoladulle on noin 20 metriä ja Levin päärinteelle noin 150 metriä. Keskustan ravintolat, kaupat ja hiihtokoulu ovat kävelymatkan päässä, joten leiriporukka liikkuu päivittäin ilman kuljetuksia.",
        "Kittilän lentoasemalle on noin 15 minuutin ajomatka ja Levin linja-autoasemalle muutama minuutti.",
      ],
      faqHeading: "Usein kysyttyä ryhmistä ja leireistä",
      faqs: [
        {
          q: "Voiko koko talon vuokrata harjoitusleirille?",
          a: "Kyllä. A-talon kuusi huoneistoa tai B-talon neljä huoneistoa voidaan varata kokonaisuutena yhdelle ryhmälle. Tarvittaessa käytössä ovat molemmat talot, jolloin majoituspaikkoja on 78.",
        },
        {
          q: "Onko taloissa suksien huoltotilat joukkueelle?",
          a: "Kyllä. Taloissa on erinomaiset suksien huoltotilat ja lämmin välinevarasto, mikä on tärkeää etenkin hiihto- ja slalomjoukkueille.",
        },
        {
          q: "Montako henkeä huoneistoihin mahtuu?",
          a: "A-talon huoneistot majoittavat 6–8 henkeä ja B-talon huoneistot 8–10 henkeä. Yhteensä kymmenessä huoneistossa on 78 makuupaikkaa.",
        },
        {
          q: "Miten ruokailu järjestetään leirin aikana?",
          a: "Jokaisessa huoneistossa on täysin varusteltu keittiö, joten ryhmä voi valmistaa ruoan itse. Levin keskustan ravintolat ovat kävelymatkan päässä, ja isommille ryhmille voi sopia ruokailut erikseen ravintoloiden kanssa.",
        },
        {
          q: "Voiko majoituksen laskuttaa yritykseltä tai seuralta?",
          a: "Kyllä. Laskutus yritykselle tai urheiluseuralle sovitaan tarjouksen yhteydessä.",
        },
        {
          q: "Miten saan tarjouksen ryhmälle?",
          a: "Täytä tämän sivun tarjouspyyntölomake tai ota yhteyttä WhatsAppilla tai sähköpostilla. Vastaamme yleensä saman tai seuraavan arkipäivän aikana.",
        },
      ],
      formHeading: "Pyydä tarjous ryhmälle",
      formIntro:
        "Kerro ajankohta ja ryhmän koko, niin lähetämme tarjouksen. Hinta muodostuu ajankohdan, ryhmän koon ja varattavien huoneistojen mukaan.",
      crossLink: {
        heading: "Toinen vaihtoehto ryhmälle",
        text: "Jos ryhmä haluaa enemmän yksityisyyttä pienemmissä majoitusyksiköissä, Skistar-talo Levin ydinkeskustassa tarjoaa eri kokoisia huoneistoja – kahden ja yhden makuuhuoneen huoneistoja sekä studioita – samasta modernista talosta.",
        linkLabel: "Katso Skistar-talon ryhmämajoitus",
        href: "/skistar",
      },
    },
    en: {
      metaTitle: "Training Camp & Group Accommodation in Levi – Glacier Apartments | Leville.net",
      metaDescription:
        "Training camps and corporate groups in Levi: Glacier Apartments, two alpine buildings in the centre. Rent a whole building, ski service room, games room. Request a quote.",
      h1: "Training Camp and Group Accommodation in Levi – Glacier Apartments",
      lead: "Two alpine buildings right beside the front slope in central Levi. Either building can be rented in full for a training camp, a corporate group or a family gathering – the whole group stays at one address.",
      facts: [
        { label: "Apartments", value: "10 (two buildings)" },
        { label: "Total beds", value: "78" },
        { label: "To the ski track", value: "approx. 20 m" },
        { label: "To the main slope", value: "approx. 150 m" },
      ],
      sections: [
        {
          heading: "Two alpine buildings, ten family apartments",
          paragraphs: [
            "Glacier Apartments is located at Ratsastajankuja 2 in the Alppikylä area by Levi's front slope. The complex consists of two separate alpine buildings: building A has six apartments for 6–8 guests and building B has four apartments for 8–10 guests. In total there are 78 beds.",
            "Every apartment is a family apartment with separate bedrooms, a private sauna, a balcony, a fully equipped kitchen and WiFi. A group gets one shared address while each apartment keeps its own kitchen, sauna and privacy.",
          ],
        },
      ],
      groupHeading: "Training camps, sports clubs and corporate groups",
      groupBullets: [
        "Either building can be rented in full – the entire camp or corporate group stays at the same address.",
        "Excellent ski service facilities for cross-country and slalom teams, plus warm equipment storage.",
        "Children's games room in the building – also works as a meeting and common area for a camp.",
        "Private kitchens in every apartment: cook yourselves or eat in the town centre restaurants a short walk away.",
        "Invoicing to a company or sports club is possible – agreed together with the quote.",
        "Training camps and corporate guests stay with us regularly, so group arrangements are routine.",
      ],
      locationHeading: "Location in central Levi",
      locationParagraphs: [
        "It is about 20 metres to the ski track and about 150 metres to Levi's main slope. Restaurants, shops and the ski school are within walking distance, so a camp group gets around daily without transfers.",
        "Kittilä Airport is about a 15-minute drive away and the Levi bus station only a few minutes.",
      ],
      faqHeading: "Frequently asked questions about groups and camps",
      faqs: [
        {
          q: "Can a whole building be rented for a training camp?",
          a: "Yes. The six apartments of building A or the four apartments of building B can be booked as a whole for one group. Both buildings together provide 78 beds.",
        },
        {
          q: "Is there a ski service room for a team?",
          a: "Yes. The buildings have excellent ski service facilities and warm equipment storage, which matters especially for cross-country and slalom teams.",
        },
        {
          q: "How many people fit in the apartments?",
          a: "Apartments in building A sleep 6–8 guests and apartments in building B sleep 8–10 guests. The ten apartments have 78 beds in total.",
        },
        {
          q: "How are meals arranged during a camp?",
          a: "Every apartment has a fully equipped kitchen, so the group can cook. Levi centre restaurants are within walking distance and meals for larger groups can be arranged with them separately.",
        },
        {
          q: "Can the stay be invoiced to a company or club?",
          a: "Yes. Invoicing to a company or sports club is agreed together with the quote.",
        },
        {
          q: "How do I get a quote for a group?",
          a: "Fill in the quote request form on this page or contact us on WhatsApp or by email. We normally reply the same or the next business day.",
        },
      ],
      formHeading: "Request a group quote",
      formIntro:
        "Tell us the dates and the size of the group and we will send a quote. The price depends on the season, group size and the number of apartments booked.",
      crossLink: {
        heading: "Another option for a group",
        text: "If your group wants more privacy in smaller units, the Skistar building in central Levi offers apartments of different sizes – two-bedroom and one-bedroom apartments as well as studios – in the same modern building.",
        linkLabel: "See group accommodation at the Skistar building",
        href: "/en/skistar",
      },
    },
  },
  {
    slug: "skistar",
    path: { fi: "/skistar", en: "/en/skistar" },
    name: "Skistar-talo, Postintie 3",
    address: "Postintie 3, 99130 Sirkka",
    postal: { street: "Postintie 3", postalCode: "99130", locality: "Sirkka" },
    units: 10,
    geo: { lat: 67.8048, lng: 24.8085 },
    images: [
      { src: "/skistar/exterior.webp", alt: "Skistar-talo Levin keskustassa, Postintie 3" },
      { src: "/skistar/kaksio/05.webp", alt: "Skistar-talon huoneiston olohuone Levillä" },
      { src: "/skistar/studio-102/01.webp", alt: "Skistar-talon moderni studio Levin keskustassa" },
    ],
    fi: {
      metaTitle: "Ryhmämajoitus Levin keskustassa – Skistar-talo, Postintie 3 | Leville.net",
      metaDescription:
        "Treenileirit ja yritysryhmät Levin ydinkeskustassa: Skistar-talossa 10 huoneistoa – kahden ja yhden makuuhuoneen huoneistoja sekä studioita. Suksien huoltotila. Pyydä tarjous.",
      h1: "Ryhmämajoitus Levin keskustassa – Skistar-talo",
      lead: "Moderni talo Levin ydinkeskustassa, jossa on eri kokoisia huoneistoja. Ryhmä majoittuu samaan osoitteeseen, mutta jokainen pienemmässä omassa yksikössään – juuri silloin kun halutaan yhteinen tukikohta ja silti oma rauha.",
      facts: [
        { label: "Huoneistoja", value: "10 (yhdessä talossa)" },
        { label: "Makuupaikkoja yhteensä", value: "39" },
        { label: "Levin keskustaan", value: "askelmatka" },
        { label: "Hisseille", value: "n. 700 m (8–10 min)" },
      ],
      sections: [
        {
          heading: "Eri kokoisia huoneistoja samasta talosta",
          paragraphs: [
            "Skistar-talo sijaitsee osoitteessa Postintie 3 aivan Levin ydinkeskustassa. Leville.netillä on talossa kymmenen huoneistoa: kaksi kahden makuuhuoneen huoneistoa kuudelle hengelle, kolme yhden makuuhuoneen huoneistoa neljälle hengelle ja viisi studiota kolmelle hengelle. Makuupaikkoja on yhteensä 39.",
            "Talo on uudehko ja moderni, ja lähes jokaisessa huoneistossa on oma sauna. Kaikissa on täysin varusteltu keittiö ja WiFi. Ryhmä voi valita kokoonpanon tarpeen mukaan: valmentajille ja ohjaajille studiot, perheille ja kimppakämppäläisille isommat huoneistot.",
          ],
        },
      ],
      groupHeading: "Ryhmille, jotka haluavat yksityisyyttä pienemmissä yksiköissä",
      groupBullets: [
        "Useamman huoneiston voi varata kerralla samasta talosta – koko ryhmä majoittuu yhteen osoitteeseen.",
        "Pienemmät majoitusyksiköt tuovat yksityisyyttä: oma keittiö, oma sauna ja oma rauha jokaiselle porukan osalle.",
        "Suksien huoltotila talossa hiihto- ja slalomjoukkueille sekä välineiden säilytys.",
        "Ydinkeskustan sijainti: ruokakauppa noin 150 metrin päässä ja ravintolat askelten päässä, ei kuljetuksia iltaisin.",
        "Laskutus yritykselle tai urheiluseuralle sovitaan tarjouksen yhteydessä.",
        "Joustava kokoonpano eri kokoisista huoneistoista – tarjous räätälöidään ryhmän koon mukaan.",
      ],
      locationHeading: "Sijainti Levin ydinkeskustassa",
      locationParagraphs: [
        "Postintie 3 on keskellä Levin palveluita: K-Market on noin 150 metrin päässä ja keskustan ravintolat sekä kaupat kävelymatkan päässä. Hisseille ja rinteille on noin 700 metriä eli 8–10 minuutin kävely – ei suoraan ovelta rinteeseen, mutta kaikki palvelut ovat lähellä. Talossa ei ole hissiä.",
        "Kittilän lentoasemalle on noin 15 minuutin ajomatka ja Levin linja-autoasemalle muutama minuutti.",
      ],
      faqHeading: "Usein kysyttyä ryhmistä ja leireistä",
      faqs: [
        {
          q: "Voiko useamman huoneiston varata kerralla samalle ryhmälle?",
          a: "Kyllä. Talon kaikki kymmenen huoneistoa voidaan varata yhdelle ryhmälle tai niistä voidaan koota juuri ryhmän kokoinen kokonaisuus.",
        },
        {
          q: "Montako henkeä taloon mahtuu?",
          a: "Yhteensä 39 henkeä: kaksi kahden makuuhuoneen huoneistoa kuudelle, kolme yhden makuuhuoneen huoneistoa neljälle ja viisi studiota kolmelle hengelle.",
        },
        {
          q: "Onko talossa suksien huoltotila?",
          a: "Kyllä. Talossa on suksien huoltotila ja välineiden säilytys, mikä palvelee etenkin hiihto- ja slalomjoukkueita.",
        },
        {
          q: "Kuinka kaukana rinteet ovat?",
          a: "Hisseille ja rinteille on noin 700 metriä, eli 8–10 minuutin kävely. Keskustan palvelut ovat aivan vieressä.",
        },
        {
          q: "Voiko majoituksen laskuttaa yritykseltä tai seuralta?",
          a: "Kyllä. Laskutus yritykselle tai urheiluseuralle sovitaan tarjouksen yhteydessä.",
        },
        {
          q: "Mitä eroa on Skistar-talolla ja Glacier Apartmentsilla?",
          a: "Skistar-talo sopii ryhmälle, joka haluaa yksityisyyttä pienemmissä huoneistoissa keskustan palveluiden äärellä. Glacier Apartments taas sopii, kun halutaan vuokrata kokonainen alppitalo isoille perhehuoneistoille aivan eturinteen kupeeseen.",
        },
      ],
      formHeading: "Pyydä tarjous ryhmälle",
      formIntro:
        "Kerro ajankohta ja ryhmän koko, niin kokoamme sopivan huoneistokokonaisuuden ja lähetämme tarjouksen.",
      crossLink: {
        heading: "Toinen vaihtoehto ryhmälle",
        text: "Jos haluatte vuokrata koko talon leirille aivan eturinteen kupeesta, Glacier Apartmentsin kaksi alppitaloa tarjoavat isoja perhehuoneistoja ja jopa 78 makuupaikkaa.",
        linkLabel: "Katso Glacier Apartmentsin ryhmämajoitus",
        href: "/glacier",
      },
    },
    en: {
      metaTitle: "Group Accommodation in Levi Centre – Skistar Building | Leville.net",
      metaDescription:
        "Training camps and corporate groups in central Levi: the Skistar building has 10 apartments – two-bedroom, one-bedroom and studios. Ski service room. Request a quote.",
      h1: "Group Accommodation in Levi Centre – the Skistar Building",
      lead: "A modern building in the heart of Levi with apartments of different sizes. The group stays at one address while each part of it has its own smaller unit – a shared base with privacy for everyone.",
      facts: [
        { label: "Apartments", value: "10 (one building)" },
        { label: "Total beds", value: "39" },
        { label: "To Levi centre", value: "a few steps" },
        { label: "To the lifts", value: "approx. 700 m (8–10 min)" },
      ],
      sections: [
        {
          heading: "Apartments of different sizes in one building",
          paragraphs: [
            "The Skistar building is at Postintie 3 in the heart of Levi. Leville.net has ten apartments there: two two-bedroom apartments for six guests, three one-bedroom apartments for four guests and five studios for three guests. In total there are 39 beds.",
            "The building is modern and almost every apartment has a private sauna. All have a fully equipped kitchen and WiFi. A group can pick the combination it needs: studios for coaches and leaders, larger apartments for families and groups of friends.",
          ],
        },
      ],
      groupHeading: "For groups that want privacy in smaller units",
      groupBullets: [
        "Several apartments can be booked at once in the same building – the whole group stays at one address.",
        "Smaller units mean privacy: a private kitchen, a private sauna and quiet space for each part of the group.",
        "Ski service room in the building for cross-country and slalom teams, plus equipment storage.",
        "Central location: a grocery store about 150 m away and restaurants a few steps away, no evening transfers needed.",
        "Invoicing to a company or sports club is agreed together with the quote.",
        "A flexible mix of apartment sizes – the quote is tailored to the size of the group.",
      ],
      locationHeading: "Location in the heart of Levi",
      locationParagraphs: [
        "Postintie 3 sits among Levi's services: a K-Market is about 150 metres away and the centre's restaurants and shops are within walking distance. The lifts and slopes are about 700 metres away, an 8–10 minute walk – not ski-in, ski-out, but everything else is next door. The building has no elevator.",
        "Kittilä Airport is about a 15-minute drive away and the Levi bus station only a few minutes.",
      ],
      faqHeading: "Frequently asked questions about groups and camps",
      faqs: [
        {
          q: "Can several apartments be booked for one group?",
          a: "Yes. All ten apartments can be booked for a single group, or a combination matching the size of the group can be put together.",
        },
        {
          q: "How many people fit in the building?",
          a: "39 in total: two two-bedroom apartments for six, three one-bedroom apartments for four and five studios for three guests.",
        },
        {
          q: "Is there a ski service room?",
          a: "Yes. The building has a ski service room and equipment storage, which serves cross-country and slalom teams especially well.",
        },
        {
          q: "How far are the slopes?",
          a: "The lifts and slopes are about 700 metres away, an 8–10 minute walk. The town centre services are right next door.",
        },
        {
          q: "Can the stay be invoiced to a company or club?",
          a: "Yes. Invoicing to a company or sports club is agreed together with the quote.",
        },
        {
          q: "What is the difference between the Skistar building and Glacier Apartments?",
          a: "The Skistar building suits a group that wants privacy in smaller apartments next to the centre's services. Glacier Apartments suits groups that want to rent a whole alpine building with large family apartments right beside the front slope.",
        },
      ],
      formHeading: "Request a group quote",
      formIntro:
        "Tell us the dates and the size of the group and we will put together a suitable set of apartments and send a quote.",
      crossLink: {
        heading: "Another option for a group",
        text: "If you want to rent a whole building for a camp right beside the front slope, the two alpine buildings of Glacier Apartments offer large family apartments and up to 78 beds.",
        linkLabel: "See group accommodation at Glacier Apartments",
        href: "/en/glacier",
      },
    },
  },
];

export const getBuildingPage = (slug: string): BuildingPage | undefined =>
  buildingPages.find((b) => b.slug === slug);
