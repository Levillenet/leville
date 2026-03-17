import { Language } from "@/translations";

export interface GuideItem {
  id: string;
  title: string;
  description: string;
  href: string;
  iconKey: string;
}

export interface CategoryGroup {
  title: string;
  subtitle: string;
  guides: GuideItem[];
}

export interface TravelHubContent {
  title: string;
  subtitle: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  backToHub: string;
  readMore: string;
  bookCta: string;
  accommodationsLink: string;
  planning: CategoryGroup;
  onsite: CategoryGroup;
  accommodation: CategoryGroup;
}

export const travelHubContent: Record<Language, TravelHubContent> = {
  fi: {
    title: "Matkaopas Leville",
    subtitle: "Kaikki mitä tarvitset matkallesi",
    intro: "Suunnitteletko matkaa Leville? Löydä käytännölliset oppaat matkan suunnitteluun, paikan päällä oleskeluun ja majoituksen valintaan.",
    metaTitle: "Matkaopas Leville – Matkustaminen, pukeutuminen, palvelut | Leville.net",
    metaDescription: "Suunnittele täydellinen Levi-matka: miten pääset perille, mitä vaatteita tarvitset, paikalliset palvelut ja vinkit lapsiperheille.",
    backToHub: "Takaisin Levi-oppaaseen",
    readMore: "Lue opas",
    bookCta: "Varaa majoitus Leviltä",
    accommodationsLink: "/majoitukset",
    planning: {
      title: "🗺️ Lapin matkan suunnittelu",
      subtitle: "Suunnittele matkasi Leville – kaikki mitä tarvitset ennen lähtöä",
      guides: [
        { id: "getting-there", title: "Miten pääsee Leville", description: "Lentoyhteydet, junayhteydet ja autoilutiedot Leville. Kaikki matkustusvaihtoehdot.", href: "/matka/miten-paasee-leville-helsingista", iconKey: "plane" },
        { id: "best-time", title: "Paras aika matkustaa Leville", description: "Kuukausittainen opas: milloin on paras aika lasketteluun, revontuliin, ruskaan tai kesälomaan.", href: "/opas/paras-aika-matkustaa-leville", iconKey: "calendar" },
        { id: "clothing", title: "Talvivarusteet", description: "Mitä vaatteita tarvitset Levin talveen? Pukeutumisvinkit -30°C pakkasiin.", href: "/opas/talvivarusteet-leville", iconKey: "shirt" },
        { id: "packing", title: "Pakkauslista Lapin lomalle", description: "Tulostettava muistilista – mitä pakata mukaan Lapin matkalle.", href: "/opas/pakkauslista-lapin-lomalle", iconKey: "list" },
        { id: "prices", title: "Hinnat Levillä", description: "Hissilippujen, ravintoloiden, aktiviteettien ja ruokakauppojen hinnat.", href: "/opas/hinnat-levilla", iconKey: "euro" },
        { id: "car-free", title: "Levi ilman autoa", description: "Miten saavut ja liikut Levillä ilman omaa autoa.", href: "/opas/levi-ilman-autoa", iconKey: "footprints" },
        { id: "family", title: "Lapsiperheet Levillä", description: "Lasten rinteet, aktiviteetit ja käytännön vinkit perhematkoille.", href: "/opas/lapsiperheet-levilla", iconKey: "baby" },
        { id: "weather", title: "Sää ja lämpötilat", description: "Kuukausittaiset keskiarvot, lumitilanne ja mitä odottaa Levin säältä.", href: "/levi/saatieto-levilta", iconKey: "thermometer" },
        { id: "accessible", title: "Esteettömyys Levillä", description: "Esteettömät palvelut, rinteet ja majoitusvaihtoehdot Levillä.", href: "/opas/esteetton-levi", iconKey: "accessibility" },
      ],
    },
    onsite: {
      title: "🏔️ Perillä Levillä",
      subtitle: "Kun olet saapunut – näin nautit lomastasi",
      guides: [
        { id: "transport", title: "Liikkuminen Levillä", description: "Skibussit, taksit ja autonvuokraus. Miten liikut kätevästi Levillä.", href: "/opas/liikkuminen-levilla", iconKey: "bus" },
        { id: "services", title: "Ravintolat ja palvelut", description: "Ravintolat, kaupat, vuokraamot ja muut palvelut Levin keskustassa.", href: "/opas/ravintolat-ja-palvelut-levilla", iconKey: "utensils" },
        { id: "apres-ski", title: "Afterski ja yöelämä", description: "Levin parhaat afterski-baarit ja illanviettokohteet.", href: "/opas/afterski-ja-yoelama-levilla", iconKey: "glass" },
        { id: "rental", title: "Välinevuokraus", description: "Sukset, lumikenk\u00e4t, moottorikelkat – mistä vuokraat välineet Levillä.", href: "/opas/valineenvuokraus-levilla", iconKey: "ski" },
        { id: "events", title: "Tapahtumat Levillä", description: "Konsertteja, kilpailuja ja kausiluonteisia tapahtumia ympäri vuoden.", href: "/opas/tapahtumat-levilla", iconKey: "ticket" },
        { id: "day-trips", title: "Päiväretket Leviltä", description: "Retkikohteet Levin lähialueilla – Ylläs, Muonio, jäämeri.", href: "/opas/paivaretket-levilla", iconKey: "compass" },
        { id: "santa", title: "Joulupukki Levillä", description: "Missä tapaat joulupukin Levillä ja mitä jouluteemaa on tarjolla.", href: "/opas/joulupukki-levilla", iconKey: "gift" },
        { id: "glossary", title: "Lapin sanasto", description: "40+ suomalaista sanaa selityksineen – tykkylumi, kuksa, poronkäristys.", href: "/opas/lapin-sanasto", iconKey: "book" },
        { id: "sami", title: "Saamelaisuus Levillä", description: "Saamelaisesta kulttuurista ja perinteistä Levin alueella.", href: "/opas/saamelaiset-levilla", iconKey: "heart" },
        { id: "romantic", title: "Romanttinen Levi", description: "Vinkit pariskunnille: parhaat ravintolat, aktiviteetit ja elämykset.", href: "/opas/romanttinen-loma-levilla", iconKey: "heart" },
        { id: "map", title: "Levin interaktiivinen kartta", description: "Katso rinteet, ladut, ravintolat ja palvelut kartalla.", href: "/levi-map", iconKey: "map" },
      ],
    },
    accommodation: {
      title: "🏠 Majoitusvinkit ja vertailut",
      subtitle: "Valitse oikea majoitus ja opi käyttämään sen varusteet",
      guides: [
        { id: "cabin-apartment", title: "Mökki vai huoneisto?", description: "Kumpi sopii sinulle – oma mökki vai keskustan lomahuoneisto? Hinnat, sijainti ja erot.", href: "/opas/mokki-vai-huoneisto-levi", iconKey: "home" },
        { id: "levi-vs-yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Suomen kolmen suurimman hiihtokeskuksen rinteet, hissit ja palvelut vertailussa.", href: "/opas/levi-vs-yllas-vs-ruka", iconKey: "mountain" },
        { id: "levi-vs-rovaniemi", title: "Levi vs Rovaniemi", description: "Kumpi sopii sinulle paremmin lomakohteeksi? Rinteet, sijainti ja tunnelma.", href: "/opas/levi-vs-rovaniemi", iconKey: "mapPin" },
        { id: "levi-vs-saariselka", title: "Levi vs Saariselkä", description: "Vilkkaampi tunturikylä vai rauhaisaa oleilua? Vertailemme molempia.", href: "/opas/levi-vs-saariselka", iconKey: "mapPin" },
        { id: "heating", title: "Lämmitysjärjestelmät", description: "Näin toimivat sähköpatterit, lattialämmitys, takat ja ilmalämpöpumput.", href: "/opas/lammitysjarjestelmat-levi", iconKey: "thermometer" },
        { id: "sauna", title: "Saunaopas", description: "Saunakulttuuri, sähkökiukaan käyttöohje ja saunaelämykset Levillä.", href: "/opas/sauna-levilla", iconKey: "flame" },
        { id: "hot-tub", title: "Ulkoporeallas mökissä", description: "Mitä vieraan on hyvä tietää ulkoporealtaan käytöstä mökkimajoituksessa.", href: "/opas/ulkoporeallas-levilla", iconKey: "droplets" },
      ],
    },
  },
  en: {
    title: "Travel Guide to Levi",
    subtitle: "Everything you need for your trip",
    intro: "Planning a trip to Levi? Find practical guides for planning, on-site navigation and choosing the right accommodation.",
    metaTitle: "Travel Guide to Levi – Getting There, Clothing, Services | Leville.net",
    metaDescription: "Plan your perfect Levi trip: how to get there, what clothes you need, local services and tips for families with children.",
    backToHub: "Back to Levi Guide",
    readMore: "Read guide",
    bookCta: "Book accommodation in Levi",
    accommodationsLink: "/en/accommodations",
    planning: {
      title: "🗺️ Planning Your Trip",
      subtitle: "Everything you need before you go",
      guides: [
        { id: "getting-there", title: "Getting to Levi", description: "Flight connections, train routes and driving directions to Levi.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", iconKey: "plane" },
        { id: "best-time", title: "Best Time to Visit Levi", description: "Monthly guide: the best time for skiing, northern lights, autumn colors or summer.", href: "/guide/best-time-to-visit-levi", iconKey: "calendar" },
        { id: "clothing", title: "Winter Clothing Guide", description: "What clothes do you need for Levi winter? Dressing tips for -30°C.", href: "/guide/how-to-dress-for-winter-in-levi-lapland", iconKey: "shirt" },
        { id: "packing", title: "Packing List for Lapland", description: "Printable checklist – what to pack for a Lapland holiday.", href: "/guide/packing-list-for-lapland", iconKey: "list" },
        { id: "prices", title: "Prices in Levi", description: "Ski passes, dining, activities and grocery prices.", href: "/guide/prices-in-levi", iconKey: "euro" },
        { id: "car-free", title: "Levi Without a Car", description: "How to arrive and get around in Levi without your own car.", href: "/guide/levi-without-a-car", iconKey: "footprints" },
        { id: "family", title: "Levi with Children", description: "Kids' slopes, activities and practical tips for family trips.", href: "/guide/levi-with-children", iconKey: "baby" },
        { id: "weather", title: "Weather in Levi", description: "Monthly averages, snow conditions and what to expect year-round.", href: "/en/levi/weather-in-levi", iconKey: "thermometer" },
        { id: "accessible", title: "Accessible Levi", description: "Accessible services, slopes and accommodation options.", href: "/guide/accessible-levi", iconKey: "accessibility" },
      ],
    },
    onsite: {
      title: "🏔️ On-Site in Levi",
      subtitle: "You've arrived – here's how to enjoy your holiday",
      guides: [
        { id: "transport", title: "Getting Around Levi", description: "Ski buses, taxis and car rental. How to get around in Levi.", href: "/guide/getting-around-in-levi", iconKey: "bus" },
        { id: "services", title: "Restaurants & Services", description: "Restaurants, shops, rentals and other services in Levi center.", href: "/guide/restaurants-and-services-in-levi", iconKey: "utensils" },
        { id: "apres-ski", title: "Après-Ski & Nightlife", description: "Best après-ski bars and nightlife spots in Levi.", href: "/guide/apres-ski-nightlife-levi", iconKey: "glass" },
        { id: "rental", title: "Equipment Rental", description: "Skis, snowshoes, snowmobiles – where to rent gear in Levi.", href: "/guide/equipment-rental-levi", iconKey: "ski" },
        { id: "events", title: "Events in Levi", description: "Concerts, competitions and seasonal events throughout the year.", href: "/guide/events-in-levi", iconKey: "ticket" },
        { id: "day-trips", title: "Day Trips from Levi", description: "Explore nearby destinations – Ylläs, Muonio, Arctic Ocean.", href: "/guide/day-trips-from-levi", iconKey: "compass" },
        { id: "santa", title: "Santa Claus in Levi", description: "Where to meet Santa in Levi and what Christmas activities are on offer.", href: "/guide/santa-claus-levi", iconKey: "gift" },
        { id: "glossary", title: "Lapland Glossary", description: "40+ Finnish words with pronunciations and explanations.", href: "/guide/lapland-glossary", iconKey: "book" },
        { id: "sami", title: "Sámi Culture in Levi", description: "Learn about indigenous Sámi culture and traditions in Levi.", href: "/guide/sami-culture-in-levi", iconKey: "heart" },
        { id: "romantic", title: "Romantic Getaway in Levi", description: "Tips for couples: best restaurants, activities and experiences.", href: "/guide/romantic-getaway-in-levi", iconKey: "heart" },
        { id: "map", title: "Interactive Levi Map", description: "View slopes, trails, restaurants and services on the map.", href: "/levi-map", iconKey: "map" },
      ],
    },
    accommodation: {
      title: "🏠 Accommodation Tips & Comparisons",
      subtitle: "Choose the right accommodation and learn to use its features",
      guides: [
        { id: "cabin-apartment", title: "Cabin or Apartment?", description: "Which suits you – a peaceful cabin or a central apartment? Prices and differences.", href: "/guide/cabin-vs-apartment-in-levi", iconKey: "home" },
        { id: "levi-vs-yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Finland's three biggest ski resorts: slopes, lifts and services compared.", href: "/guide/levi-vs-yllas-vs-ruka-comparison", iconKey: "mountain" },
        { id: "levi-vs-rovaniemi", title: "Levi vs Rovaniemi", description: "Which suits you better? Slopes, location, services and atmosphere.", href: "/guide/levi-vs-rovaniemi-comparison", iconKey: "mapPin" },
        { id: "levi-vs-saariselka", title: "Levi vs Saariselkä", description: "A lively fell village or peaceful quiet retreat? We compare both.", href: "/guide/levi-vs-saariselka-comparison", iconKey: "mapPin" },
        { id: "heating", title: "Heating Systems", description: "Electric radiators, floor heating, fireplaces and heat pumps explained.", href: "/guide/heating-systems-in-levi", iconKey: "thermometer" },
        { id: "sauna", title: "Finnish Sauna Guide", description: "Sauna culture, electric heater instructions and sauna experiences.", href: "/guide/finnish-sauna-in-levi", iconKey: "flame" },
        { id: "hot-tub", title: "Outdoor Hot Tub Guide", description: "What guests should know about using outdoor hot tubs.", href: "/guide/outdoor-hot-tub-levi-cabin", iconKey: "droplets" },
      ],
    },
  },
  sv: {
    title: "Reseguide till Levi",
    subtitle: "Allt du behöver för din resa",
    intro: "Planerar du en resa till Levi? Hitta praktiska guider för planering, navigering på plats och val av boende.",
    metaTitle: "Reseguide till Levi – Resa, kläder, tjänster | Leville.net",
    metaDescription: "Planera din perfekta Levi-resa: hur du tar dig dit, vilka kläder du behöver, lokala tjänster och tips för barnfamiljer.",
    backToHub: "Tillbaka till Levi-guiden",
    readMore: "Läs guide",
    bookCta: "Boka boende i Levi",
    accommodationsLink: "/sv/boende",
    planning: {
      title: "🗺️ Planera din resa",
      subtitle: "Allt du behöver innan du åker",
      guides: [
        { id: "getting-there", title: "Ta sig till Levi", description: "Flygförbindelser, tåg och körvägbeskrivningar.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", iconKey: "plane" },
        { id: "best-time", title: "Bästa tiden att besöka Levi", description: "Månatlig guide: bästa tiden för skidåkning, norrsken och höstfärger.", href: "/guide/best-time-to-visit-levi", iconKey: "calendar" },
        { id: "clothing", title: "Vinterkläder", description: "Vilka kläder behöver du? Klädtips för -30°C.", href: "/guide/how-to-dress-for-winter-in-levi-lapland", iconKey: "shirt" },
        { id: "family", title: "Familjer i Levi", description: "Barnbackar, aktiviteter och tips för familjer.", href: "/guide/levi-with-children", iconKey: "baby" },
        { id: "weather", title: "Väder i Levi", description: "Månadsgenomsnitt och snöförhållanden.", href: "/en/levi/weather-in-levi", iconKey: "thermometer" },
      ],
    },
    onsite: {
      title: "🏔️ På plats i Levi",
      subtitle: "Du har anlänt – så här njuter du av din semester",
      guides: [
        { id: "transport", title: "Ta sig runt i Levi", description: "Skidbusar, taxi och biluthyrning.", href: "/guide/getting-around-in-levi", iconKey: "bus" },
        { id: "services", title: "Restauranger och tjänster", description: "Restauranger, butiker och tjänster i Levi centrum.", href: "/guide/restaurants-and-services-in-levi", iconKey: "utensils" },
        { id: "glossary", title: "Lapplandsordlista", description: "Finska ord med förklaringar för besökare.", href: "/guide/lapland-glossary", iconKey: "book" },
      ],
    },
    accommodation: {
      title: "🏠 Boendetips och jämförelser",
      subtitle: "Välj rätt boende och lär dig använda dess funktioner",
      guides: [
        { id: "cabin-apartment", title: "Stuga eller lägenhet?", description: "Vilken passar dig – en lugn stuga eller en central semesterlägenhet?", href: "/guide/cabin-vs-apartment-in-levi", iconKey: "home" },
        { id: "levi-vs-yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Finlands tre största skidorter jämförda.", href: "/guide/levi-vs-yllas-vs-ruka-comparison", iconKey: "mountain" },
        { id: "heating", title: "Värmesystem", description: "Så fungerar uppvärmningen i Levi.", href: "/guide/heating-systems-in-levi", iconKey: "thermometer" },
        { id: "sauna", title: "Bastunguide", description: "Bastukultur och unika bastuupplevelser.", href: "/guide/finnish-sauna-in-levi", iconKey: "flame" },
      ],
    },
  },
  de: {
    title: "Reiseführer nach Levi",
    subtitle: "Alles was Sie für Ihre Reise brauchen",
    intro: "Planen Sie eine Reise nach Levi? Finden Sie praktische Guides für Planung, Navigation vor Ort und Unterkunftswahl.",
    metaTitle: "Reiseführer nach Levi – Anreise, Kleidung, Services | Leville.net",
    metaDescription: "Planen Sie Ihre perfekte Levi-Reise: wie Sie dorthin kommen, welche Kleidung Sie brauchen, lokale Services und Tipps für Familien.",
    backToHub: "Zurück zum Levi-Guide",
    readMore: "Guide lesen",
    bookCta: "Unterkunft in Levi buchen",
    accommodationsLink: "/de/unterkuenfte",
    planning: {
      title: "🗺️ Reiseplanung",
      subtitle: "Alles was Sie vor der Abreise wissen müssen",
      guides: [
        { id: "getting-there", title: "Anreise nach Levi", description: "Flugverbindungen, Zugverbindungen und Anfahrtswege.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", iconKey: "plane" },
        { id: "best-time", title: "Beste Reisezeit für Levi", description: "Monatlicher Guide: beste Zeit für Skifahren, Nordlichter und mehr.", href: "/guide/best-time-to-visit-levi", iconKey: "calendar" },
        { id: "clothing", title: "Winterkleidung", description: "Kleidungstipps für -30°C Frost.", href: "/guide/how-to-dress-for-winter-in-levi-lapland", iconKey: "shirt" },
        { id: "family", title: "Familien in Levi", description: "Kinderpisten, Aktivitäten und Tipps für Familienreisen.", href: "/guide/levi-with-children", iconKey: "baby" },
        { id: "weather", title: "Wetter in Levi", description: "Monatliche Durchschnittswerte und Schneeverhältnisse.", href: "/en/levi/weather-in-levi", iconKey: "thermometer" },
      ],
    },
    onsite: {
      title: "🏔️ Vor Ort in Levi",
      subtitle: "Sie sind angekommen – so genießen Sie Ihren Urlaub",
      guides: [
        { id: "transport", title: "Unterwegs in Levi", description: "Skibusse, Taxis und Autovermietung.", href: "/guide/getting-around-in-levi", iconKey: "bus" },
        { id: "services", title: "Restaurants und Services", description: "Restaurants, Geschäfte und Services im Zentrum.", href: "/guide/restaurants-and-services-in-levi", iconKey: "utensils" },
      ],
    },
    accommodation: {
      title: "🏠 Unterkunftstipps und Vergleiche",
      subtitle: "Wählen Sie die richtige Unterkunft",
      guides: [
        { id: "cabin-apartment", title: "Hütte oder Wohnung?", description: "Was passt besser – eine ruhige Hütte oder eine zentrale Ferienwohnung?", href: "/guide/cabin-vs-apartment-in-levi", iconKey: "home" },
        { id: "levi-vs-yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Finlands drei größte Skigebiete im Vergleich.", href: "/guide/levi-vs-yllas-vs-ruka-comparison", iconKey: "mountain" },
        { id: "levi-vs-rovaniemi", title: "Levi vs Rovaniemi", description: "Welches passt besser als Urlaubsziel?", href: "/guide/levi-vs-rovaniemi-comparison", iconKey: "mapPin" },
        { id: "heating", title: "Heizsysteme", description: "So funktioniert die Heizung in Levi.", href: "/guide/heating-systems-in-levi", iconKey: "thermometer" },
        { id: "sauna", title: "Saunaguide", description: "Saunakultur und Saunaerlebnisse.", href: "/guide/finnish-sauna-in-levi", iconKey: "flame" },
      ],
    },
  },
  es: {
    title: "Guía de viaje a Levi",
    subtitle: "Todo lo que necesitas para tu viaje",
    intro: "¿Planeas un viaje a Levi? Encuentra guías prácticas para planificar, navegar en destino y elegir alojamiento.",
    metaTitle: "Guía de viaje a Levi – Cómo llegar, ropa, servicios | Leville.net",
    metaDescription: "Planifica tu viaje perfecto a Levi: cómo llegar, qué ropa necesitas, servicios locales y consejos para familias.",
    backToHub: "Volver a la guía de Levi",
    readMore: "Leer guía",
    bookCta: "Reservar alojamiento en Levi",
    accommodationsLink: "/es/alojamientos",
    planning: {
      title: "🗺️ Planifica tu viaje",
      subtitle: "Todo lo que necesitas antes de salir",
      guides: [
        { id: "getting-there", title: "Cómo llegar a Levi", description: "Vuelos, trenes e indicaciones para conducir.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", iconKey: "plane" },
        { id: "best-time", title: "Mejor época para visitar Levi", description: "Guía mensual: mejor momento para esquí, auroras y más.", href: "/guide/best-time-to-visit-levi", iconKey: "calendar" },
        { id: "clothing", title: "Ropa de invierno", description: "Consejos de vestimenta para -30°C.", href: "/guide/how-to-dress-for-winter-in-levi-lapland", iconKey: "shirt" },
        { id: "family", title: "Familias en Levi", description: "Pistas para niños y consejos para viajes familiares.", href: "/guide/levi-with-children", iconKey: "baby" },
      ],
    },
    onsite: {
      title: "🏔️ En Levi",
      subtitle: "Has llegado – así disfrutarás de tus vacaciones",
      guides: [
        { id: "transport", title: "Moverse por Levi", description: "Autobuses de esquí, taxis y alquiler de coches.", href: "/guide/getting-around-in-levi", iconKey: "bus" },
        { id: "services", title: "Restaurantes y servicios", description: "Restaurantes, tiendas y servicios en el centro.", href: "/guide/restaurants-and-services-in-levi", iconKey: "utensils" },
      ],
    },
    accommodation: {
      title: "🏠 Consejos de alojamiento y comparaciones",
      subtitle: "Elige el alojamiento adecuado",
      guides: [
        { id: "cabin-apartment", title: "¿Cabaña o apartamento?", description: "¿Qué te conviene más? Precios, ubicación y diferencias.", href: "/guide/cabin-vs-apartment-in-levi", iconKey: "home" },
        { id: "levi-vs-yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Las tres estaciones más grandes de Finlandia comparadas.", href: "/guide/levi-vs-yllas-vs-ruka-comparison", iconKey: "mountain" },
        { id: "levi-vs-rovaniemi", title: "Levi vs Rovaniemi", description: "¿Cuál te conviene más como destino?", href: "/guide/levi-vs-rovaniemi-comparison", iconKey: "mapPin" },
        { id: "heating", title: "Sistemas de calefacción", description: "Cómo funcionan los sistemas de calefacción.", href: "/guide/heating-systems-in-levi", iconKey: "thermometer" },
        { id: "sauna", title: "Guía de sauna finlandesa", description: "Cultura de sauna y experiencias únicas.", href: "/guide/finnish-sauna-in-levi", iconKey: "flame" },
      ],
    },
  },
  fr: {
    title: "Guide de voyage à Levi",
    subtitle: "Tout ce dont vous avez besoin pour votre voyage",
    intro: "Vous planifiez un voyage à Levi ? Trouvez des guides pratiques pour la planification, la navigation sur place et le choix de l'hébergement.",
    metaTitle: "Guide de voyage à Levi – Comment y aller, vêtements, services | Leville.net",
    metaDescription: "Planifiez votre voyage parfait à Levi : comment y arriver, quels vêtements vous avez besoin, services locaux et conseils pour les familles.",
    backToHub: "Retour au guide de Levi",
    readMore: "Lire le guide",
    bookCta: "Réserver un hébergement à Levi",
    accommodationsLink: "/fr/hebergements",
    planning: {
      title: "🗺️ Planifiez votre voyage",
      subtitle: "Tout ce dont vous avez besoin avant de partir",
      guides: [
        { id: "getting-there", title: "Se rendre à Levi", description: "Connexions aériennes, ferroviaires et itinéraires routiers.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", iconKey: "plane" },
        { id: "best-time", title: "Meilleur moment pour visiter Levi", description: "Guide mensuel : meilleur moment pour le ski, les aurores boréales et plus.", href: "/guide/best-time-to-visit-levi", iconKey: "calendar" },
        { id: "clothing", title: "Vêtements d'hiver", description: "Conseils vestimentaires pour -30°C.", href: "/guide/how-to-dress-for-winter-in-levi-lapland", iconKey: "shirt" },
        { id: "family", title: "Familles à Levi", description: "Pistes pour enfants et conseils pour voyages en famille.", href: "/guide/levi-with-children", iconKey: "baby" },
      ],
    },
    onsite: {
      title: "🏔️ Sur place à Levi",
      subtitle: "Vous êtes arrivé – voici comment profiter de vos vacances",
      guides: [
        { id: "transport", title: "Se déplacer à Levi", description: "Bus de ski, taxis et location de voiture.", href: "/guide/getting-around-in-levi", iconKey: "bus" },
        { id: "services", title: "Restaurants et services", description: "Restaurants, boutiques et services au centre.", href: "/guide/restaurants-and-services-in-levi", iconKey: "utensils" },
      ],
    },
    accommodation: {
      title: "🏠 Conseils d'hébergement et comparaisons",
      subtitle: "Choisissez le bon hébergement",
      guides: [
        { id: "cabin-apartment", title: "Chalet ou appartement ?", description: "Lequel vous convient – un chalet paisible ou un appartement central ?", href: "/guide/cabin-vs-apartment-in-levi", iconKey: "home" },
        { id: "levi-vs-yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Les trois plus grandes stations de Finlande comparées.", href: "/guide/levi-vs-yllas-vs-ruka-comparison", iconKey: "mountain" },
        { id: "levi-vs-rovaniemi", title: "Levi vs Rovaniemi", description: "Laquelle vous convient le mieux ?", href: "/guide/levi-vs-rovaniemi-comparison", iconKey: "mapPin" },
        { id: "heating", title: "Systèmes de chauffage", description: "Comment fonctionnent les systèmes de chauffage.", href: "/guide/heating-systems-in-levi", iconKey: "thermometer" },
        { id: "sauna", title: "Guide du sauna finlandais", description: "Culture du sauna et expériences uniques.", href: "/guide/finnish-sauna-in-levi", iconKey: "flame" },
      ],
    },
  },
  nl: {
    title: "Reisgids naar Levi",
    subtitle: "Alles wat je nodig hebt voor je reis",
    intro: "Plan je een reis naar Levi? Vind praktische gidsen voor planning, navigatie ter plaatse en het kiezen van de juiste accommodatie.",
    metaTitle: "Reisgids Levi – Praktische tips voor je Lapland vakantie | Leville.net",
    metaDescription: "Alles wat je moet weten voor je reis naar Levi. Vervoer, winterkleding, restaurants, gezinstips en meer.",
    backToHub: "Terug naar Levi-gids",
    readMore: "Lees gids",
    bookCta: "Boek accommodatie in Levi",
    accommodationsLink: "/nl/accommodaties",
    planning: {
      title: "🗺️ Plan je reis",
      subtitle: "Alles wat je nodig hebt voordat je vertrekt",
      guides: [
        { id: "getting-there", title: "Naar Levi reizen", description: "Vliegverbindingen, treinverbindingen en routebeschrijvingen.", href: "/nl/gids/hoe-kom-je-in-levi", iconKey: "plane" },
        { id: "best-time", title: "Beste tijd om Levi te bezoeken", description: "Maandelijkse gids: beste tijd voor skiën, noorderlicht en meer.", href: "/guide/best-time-to-visit-levi", iconKey: "calendar" },
        { id: "clothing", title: "Winterkleding", description: "Kledingstips voor -30°C vorst.", href: "/nl/gids/winterkleding-levi-lapland", iconKey: "shirt" },
        { id: "family", title: "Gezinnen in Levi", description: "Kinderpistes en praktische tips voor gezinsvakanties.", href: "/nl/gids/levi-met-kinderen", iconKey: "baby" },
        { id: "prices", title: "Prijzen in Levi", description: "Skipassen, restaurants, activiteiten en boodschappenprijzen.", href: "/nl/gids/prijzen-in-levi", iconKey: "euro" },
        { id: "weather", title: "Weer in Levi", description: "Maandgemiddelden en sneeuwcondities.", href: "/en/levi/weather-in-levi", iconKey: "thermometer" },
      ],
    },
    onsite: {
      title: "🏔️ Ter plaatse in Levi",
      subtitle: "Je bent er – zo geniet je van je vakantie",
      guides: [
        { id: "transport", title: "Vervoer in Levi", description: "Skibussen, taxi's en autoverhuur.", href: "/guide/getting-around-in-levi", iconKey: "bus" },
        { id: "services", title: "Restaurants en diensten", description: "Restaurants, winkels en diensten in het centrum.", href: "/guide/restaurants-and-services-in-levi", iconKey: "utensils" },
        { id: "glossary", title: "Lapland woordenlijst", description: "40+ Finse woorden met uitleg voor bezoekers.", href: "/guide/lapland-glossary", iconKey: "book" },
      ],
    },
    accommodation: {
      title: "🏠 Accommodatietips en vergelijkingen",
      subtitle: "Kies de juiste accommodatie",
      guides: [
        { id: "cabin-apartment", title: "Huisje of appartement?", description: "Wat past het beste bij jou? Prijzen, locatie en verschillen.", href: "/guide/cabin-vs-apartment-in-levi", iconKey: "home" },
        { id: "levi-vs-yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "De drie grootste skigebieden van Finland vergeleken.", href: "/guide/levi-vs-yllas-vs-ruka-comparison", iconKey: "mountain" },
        { id: "levi-vs-rovaniemi", title: "Levi vs Rovaniemi", description: "Welke past het beste bij jou?", href: "/guide/levi-vs-rovaniemi-comparison", iconKey: "mapPin" },
        { id: "heating", title: "Verwarmingssystemen", description: "Hoe verwarming werkt in Levi.", href: "/guide/heating-systems-in-levi", iconKey: "thermometer" },
        { id: "sauna", title: "Finse sauna gids", description: "Saunacultuur en unieke sauna-ervaringen.", href: "/guide/finnish-sauna-in-levi", iconKey: "flame" },
        { id: "hot-tub", title: "Buitenjacuzzi gids", description: "Wat gasten moeten weten over buitenjacuzzi's.", href: "/guide/outdoor-hot-tub-levi-cabin", iconKey: "droplets" },
      ],
    },
  },
};
