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
    },
  },
];

export const getBuildingPage = (slug: string): BuildingPage | undefined =>
  buildingPages.find((b) => b.slug === slug);
