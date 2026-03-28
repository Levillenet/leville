const year = new Date().getFullYear();

export const topWinterActivitiesTranslations = {
  fi: {
    meta: {
      title: `Mitä tehdä Levillä? 15 parasta aktiviteettia ${year}`,
      description: "Huskysafarit, poroajelut, moottorikelkkailu, avantouinti ja revontuliretket. Hinnat, varaus ja paikallisen vinkit.",
      canonical: "https://leville.net/aktiviteetit/parhaat-talviaktiviteetit-levi"
    },
    title: "Parhaat talviaktiviteetit Levillä",
    subtitle: "Kaikki mitä voit tehdä Lapin lumisessa ihmeessä",
    intro: "Levi on Suomen suosituin talvikohde – eikä syyttä. Täällä voit kokea kaiken laskettelusta huskyajeluihin, porosafareista pilkkimiseen. Tämä opas esittelee parhaat talviaktiviteetit ja auttaa sinua suunnittelemaan unelmien Lapin loman.",
    sections: {
      skiing: {
        title: "Laskettelu ja lumilautailu",
        icon: "mountain",
        intro: "Levi on Suomen suurin laskettelukeskus, jossa on 43 rinnettä ja 28 hissiä.",
        subsections: [
          { title: "Rinteet ja hissit", items: ["43 rinnettä kaikille taitotasoille", "28 hissiä – Leevilandiassa lapsille sopivia hissejä", "Pisin rinne 2,5 km", "Korkeusero 325 metriä", "Lumetettu kausi marraskuusta toukokuulle"] },
          { title: "Hiihtokoulu kaikenikäisille", items: ["Levi Ski School tarjoaa opetusta aloittelijoista edistyneisiin", "Lasten hiihtokoulu (Angry Birds Park)", "Yksityistunnit saatavilla", "Vuokrauspalvelut rinteen juurella"] }
        ]
      },
      crossCountry: { title: "Murtomaahiihto", icon: "treepine", intro: "Levi on murtomaahiihtäjän paratiisi, jossa on yli 230 kilometriä huollettuja latuja.", items: ["230 km huollettuja latuja", "Valaistuja latuja iltahiihdoille", "Erätasoisia reittejä tunturimaisemissa", "Hiihtokeskuksen yhteydessä vuokraus ja huolto", "Oulu–Levi -hiihtomäki treenikäyttöön"] },
      husky: { title: "Huskysafarit", icon: "dog", intro: "Huskyajelut ovat unohtumaton kokemus – koirat vetävät sinut halki lumisen erämaan.", options: [{ name: "Lyhyet 2–3 tunnin safarit", desc: "Sopii ensikertalisille, hinnat alkaen 140€" }, { name: "Puolen päivän seikkailut", desc: "Syvemmälle erämaahan, noin 200€" }, { name: "Usean päivän expeditiot", desc: "Kokeille ajajille, yövy koirafarmilla" }], tip: "Huskysafarit ovat suosittuja – varaa ajoissa, erityisesti joulu- ja hiihtolomasesonkina." },
      reindeer: { title: "Poroelämykset", icon: "heart", intro: "Porot ovat Lapin symboli. Levillä voit kokea ne monella tavalla.", options: [{ name: "Porofarmivierailut", desc: "Tapaa porot läheltä, opi niiden elämästä ja ota kuvia." }, { name: "Perinteiset poroajelut", desc: "Rauhallinen kelkka-ajelu poron vetämänä lumisessa maisemassa." }, { name: "Poronhoitajan päivä", desc: "Osallistu poronhoitajan arkeen – syötä poroja ja kulje rekikoirien kanssa." }] },
      iceFishing: { title: "Pilkkiminen jäällä", icon: "fish", intro: "Pilkkiminen on rauhallinen tapa nauttia Lapin talvesta. Jäällä istuminen tuikitähtisen taivaan alla on meditatiivinen kokemus.", items: ["Opastettuja pilkkiretkiä järvelle", "Varusteet (pilkki, viehe, lämpöistuin) kuuluvat hintaan", "Mahdollisuus saada siikaa, ahventa tai haukea", "Usein yhdistetty nuotio-lounaaseen tunturimaisemassa"] },
      snowshoeing: { title: "Lumikenkäily erämaassa", icon: "footprints", intro: "Lumikenkäily on helppo tapa tutustua Lapin luontoon ilman hiihtotaitoja.", items: ["Opastettuja retkiä kansallispuistoissa", "Omatoimisia reittejä merkityillä poluilla", "Yhdistetään usein kahvitaukoon ja nuotioon", "Sopii kaikille kuntotasoille"] },
      fatBiking: { title: "Fatbike-pyöräily lumella", icon: "bike", intro: "Fatbike eli leveärenkainen maastopyörä on hauska tapa tutustua Levin reitteihin talvella.", items: ["Vuokrattavissa Levin keskustasta", "Merkittyjä fatbike-reittejä", "Opastettuja kierroksia saatavilla", "Sopii kaikentasoisille pyöräilijöille"] },
      connecting: { title: "Aktiviteeteista majoitukseen", intro: "Kun yhdistät aktiviteetit mukavaan majoitukseen, saat parhaan Lapin-kokemuksen.", tips: ["Majoituksemme sijaitsevat lähellä rinteitä ja safari-lähtöpaikkoja", "Oma sauna rentoutumiseen aktiviteettipäivän jälkeen", "Kuivaushuone märille varusteille", "Keskustan majoituksista pääset helposti kaikkiin aktiviteetteihin"] },
      faq: { title: "Usein kysytyt kysymykset", items: [
        { q: "Mitkä aktiviteetit sopivat lapsiperheille?", a: "Lähes kaikki! Porofarmivierailut, lyhyet huskysafarit, lasten hiihtokoulu ja lumikenkäily sopivat hyvin perheille. Monet operaattorit tarjoavat lastenistumia ja erikoiskokoja." },
        { q: "Pitääkö aktiviteetit varata etukäteen?", a: "Kyllä, erityisesti sesonkiaikoina (joulu, hiihtoloma, pääsiäinen). Suositut safarit ja hiihtokoulut täyttyvät nopeasti. Suosittelemme varaamaan vähintään viikkoa ennen." },
        { q: "Onko aktiviteetteja tarjolla joulukuun pimeydessä?", a: "Kyllä! Monet aktiviteetit ovat erityisen tunnelmallisia kaamoksen aikaan. Lyhdyt, tulet ja revontulet luovat ainutlaatuisen tunnelman. Hiihtokeskus on valaistu." },
        { q: "Mitä safarihintoihin sisältyy?", a: "Yleensä lämpövarusteet (haalari, kypärä, käsineet), opastus ja usein lämmin juoma/välipala. Tarkista aina operaattorilta ennen varausta." }
      ] }
    },
    cta: { title: "Varaa majoitus aktiviteettien läheisyydestä", text: "Majoituksemme sijaitsevat lähellä kaikkia aktiviteetteja. Nauti täydellisestä Lapin lomasta mukavassa huoneistossa.", button: "Katso majoitukset" },
    readNext: { title: "Lue myös", links: [
      { title: "Laskettelu Levillä", desc: "43 rinnettä ja 28 hissiä", href: "/opas/laskettelu-levi" },
      { title: "Moottorikelkkasafari", desc: "Vinkit ensikertalaiselle", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
      { title: "Koiravaljakkoajelu", desc: "Unohtumaton huskyelämys", href: "/aktiviteetit/koiravaljakkoajelu-levi" },
      { title: "Talvivarusteet", desc: "Pukeutuminen aktiviteetteihin", href: "/opas/talvivarusteet-leville" },
      { title: "Levi vs Ylläs vs Ruka", desc: "Kolmen hiihtokeskuksen vertailu", href: "/opas/levi-vs-yllas-vs-ruka" }
    ] },
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
      { text: "Moottorikelkkasafari-vinkit", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
      { text: "Miten pääsee Leville", href: "/matka/miten-paasee-leville-helsingista" }
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Aktiviteetit Levillä", href: "/opas/aktiviteetit-levi" },
      { label: "Parhaat talviaktiviteetit", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" }
    ],
    activitiesHubLink: "/opas/aktiviteetit-levi",
    activitiesHubText: "← Takaisin aktiviteettioppaaseen",
    accommodationsHref: "/majoitukset"
  },
  en: {
    meta: {
      title: `Things to Do in Levi — 15 Best Activities ${year}`,
      description: "Husky safaris, reindeer rides, snowmobiling, ice swimming and northern lights tours. Prices, booking tips and local picks.",
      canonical: "https://leville.net/activities/top-winter-activities-in-levi-lapland"
    },
    title: "Top Winter Activities in Levi, Lapland",
    subtitle: "Everything you can do in Lapland's winter wonderland",
    intro: "Levi is Finland's most popular winter destination – and for good reason. Here you can experience everything from skiing to husky safaris, reindeer rides to ice fishing. This guide presents the best winter activities and helps you plan your dream Lapland holiday.",
    sections: {
      skiing: {
        title: "Skiing and Snowboarding", icon: "mountain",
        intro: "Levi is Finland's largest ski resort with 43 slopes and 28 lifts.",
        subsections: [
          { title: "Slopes and Lifts", items: ["43 slopes for all skill levels", "28 lifts – Leevilandia has child-friendly lifts", "Longest slope 2.5 km", "Vertical drop 325 meters", "Snow-guaranteed season from October to May"] },
          { title: "Ski School for All Ages", items: ["Levi Ski School offers lessons from beginners to advanced", "Children's ski school (Angry Birds Park)", "Private lessons available", "Rental services at the base"] }
        ]
      },
      crossCountry: { title: "Cross-Country Skiing", icon: "treepine", intro: "Levi is a cross-country skier's paradise with over 230 kilometers of groomed trails.", items: ["230 km of groomed trails", "Illuminated trails for evening skiing", "Wilderness routes in fell landscapes", "Rental and service at ski center", "Oulu–Levi training hill for practice"] },
      husky: { title: "Husky Safaris", icon: "dog", intro: "Husky rides are an unforgettable experience – dogs pull you through the snowy wilderness.", options: [{ name: "Short 2–3 hour safaris", desc: "Perfect for first-timers, prices from €140" }, { name: "Half-day adventures", desc: "Deeper into the wilderness, around €200" }, { name: "Multi-day expeditions", desc: "For experienced riders, overnight at husky farm" }], tip: "Husky safaris are popular – book early, especially during Christmas and ski holiday seasons." },
      reindeer: { title: "Reindeer Experiences", icon: "heart", intro: "Reindeer are the symbol of Lapland. In Levi, you can experience them in many ways.", options: [{ name: "Reindeer Farm Visits", desc: "Meet reindeer up close, learn about their life and take photos." }, { name: "Traditional Reindeer Sleigh Rides", desc: "Peaceful sleigh ride pulled by reindeer through snowy landscape." }, { name: "Reindeer Herder's Day", desc: "Join a reindeer herder's daily life – feed reindeer and ride with sled dogs." }] },
      iceFishing: { title: "Ice Fishing on Frozen Lakes", icon: "fish", intro: "Ice fishing is a peaceful way to enjoy Lapland's winter. Sitting on ice under starry skies is a meditative experience.", items: ["Guided ice fishing trips to lakes", "Equipment (rod, lure, thermal seat) included in price", "Opportunity to catch whitefish, perch or pike", "Often combined with campfire lunch in fell scenery"] },
      snowshoeing: { title: "Snowshoeing in the Wilderness", icon: "footprints", intro: "Snowshoeing is an easy way to explore Lapland nature without skiing skills.", items: ["Guided tours in national parks", "Self-guided routes on marked trails", "Often combined with coffee break and campfire", "Suitable for all fitness levels"] },
      fatBiking: { title: "Fat Biking on Snow", icon: "bike", intro: "Fat biking is a fun way to explore Levi's trails in winter.", items: ["Available for rent in Levi center", "Marked fat bike trails", "Guided tours available", "Suitable for all cycling levels"] },
      connecting: { title: "Connecting Activities to Your Stay", intro: "When you combine activities with comfortable accommodation, you get the best Lapland experience.", tips: ["Our accommodations are located near slopes and safari departure points", "Private sauna for relaxation after activity day", "Drying room for wet gear", "Center accommodations give easy access to all activities"] },
      faq: { title: "Frequently Asked Questions", items: [
        { q: "What activities suit families with children?", a: "Almost all! Reindeer farm visits, short husky safaris, children's ski school and snowshoeing are great for families. Many operators offer child seats and special sizes." },
        { q: "Do I need to book activities in advance?", a: "Yes, especially during peak seasons (Christmas, ski holidays, Easter). Popular safaris and ski schools fill up quickly. We recommend booking at least a week ahead." },
        { q: "Are activities available in December darkness?", a: "Yes! Many activities are especially atmospheric during polar night. Lanterns, fires and northern lights create a unique mood. The ski resort is illuminated." },
        { q: "What's included in safari prices?", a: "Usually thermal gear (overalls, helmet, gloves), guiding and often hot drinks/snacks. Always check with the operator before booking." }
      ] }
    },
    cta: { title: "Book Accommodation Near Activities", text: "Our accommodations are located near all activities. Enjoy the perfect Lapland holiday in a comfortable apartment.", button: "View Accommodations" },
    readNext: { title: "Read Next", links: [
      { title: "Skiing in Levi", desc: "43 slopes and 28 lifts", href: "/guide/skiing-in-levi" },
      { title: "Snowmobile Safari", desc: "Tips for first-timers", href: "/activities/snowmobile-safari-tips-levi" },
      { title: "Husky Safari", desc: "Unforgettable husky experience", href: "/activities/husky-safari-levi" },
      { title: "Winter Clothing", desc: "How to dress for activities", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { title: "Levi vs Ylläs vs Ruka", desc: "Three ski resorts compared", href: "/guide/levi-vs-yllas-vs-ruka-comparison" }
    ] },
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "How to Dress for Winter in Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Snowmobile Safari Tips", href: "/activities/snowmobile-safari-tips-levi" },
      { text: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Activities in Levi", href: "/guide/activities-in-levi" },
      { label: "Top Winter Activities", href: "/activities/top-winter-activities-in-levi-lapland" }
    ],
    activitiesHubLink: "/guide/activities-in-levi",
    activitiesHubText: "← Back to Activities Guide",
    accommodationsHref: "/en/accommodations"
  },
  nl: {
    meta: {
      title: "Winteractiviteiten in Levi – Wat te doen in Lapland | Leville.net",
      description: "De beste winteractiviteiten in Levi: skiën, huskysafari, sneeuwscootertocht, rendierrit, noorderlicht en meer. Praktische tips en prijsindicaties.",
      canonical: "https://leville.net/nl/activiteiten/winteractiviteiten-levi"
    },
    title: "Winteractiviteiten in Levi, Lapland",
    subtitle: "Alles wat je kunt doen in het winterwonderland van Lapland",
    intro: "Levi is de populairste winterbestemming van Finland – en dat is niet zonder reden. Hier kun je alles beleven: van skiën tot huskysafari's, van rendierritten tot ijsvissen. De meeste pakketreizen (Voigt Travel, Nordic) bevatten al 3-4 activiteiten in de prijs. Zelfstandige reizigers kunnen activiteiten boeken via lokale operators of bij Levi Tourist Information. Deze gids presenteert de beste winteractiviteiten met praktische tips en prijsindicaties.",
    sections: {
      skiing: {
        title: "Skiën en snowboarden", icon: "mountain",
        intro: "Levi is het grootste skigebied van Finland met 43 pistes en 28 liften.",
        subsections: [
          { title: "Pistes en liften", items: ["43 pistes voor alle niveaus", "28 liften – Leevilandia heeft kindvriendelijke liften", "Langste piste 2,5 km", "Hoogteverschil 325 meter", "Gegarandeerd sneeuw van oktober tot mei"] },
          { title: "Skischool voor alle leeftijden", items: ["Levi Ski School biedt lessen voor beginners tot gevorderden", "Kinderskischool (Angry Birds Park)", "Privélessen beschikbaar", "Verhuurservice bij de pistes"] }
        ]
      },
      crossCountry: { title: "Langlaufen", icon: "treepine", intro: "Levi is een paradijs voor langlaufers met meer dan 230 kilometer verzorgde loipes.", items: ["230 km verzorgde loipes", "Verlichte loipes voor avondlanglaufen", "Wildernisroutes in het fjelllandschap", "Verhuur en service bij het skicentrum", "Oefenheuvel voor beginners"] },
      husky: { title: "Huskysafari's", icon: "dog", intro: "Een huskysafari is een onvergetelijke ervaring – enthousiaste sledehonden trekken je door het besneeuwde landschap.", options: [{ name: "Korte safari's (2–3 uur)", desc: "Perfect voor beginners, prijzen vanaf €140" }, { name: "Halvedagtochten", desc: "Dieper de wildernis in, ca. €200" }, { name: "Meerdaagse expedities", desc: "Voor ervaren deelnemers, overnachting op de huskyfarm" }], tip: "Huskysafari's zijn populair – boek op tijd, vooral tijdens de Nederlandse/Belgische schoolvakanties (krokusvakantie, kerstvakantie)." },
      reindeer: { title: "Rendier-ervaringen", icon: "heart", intro: "Rendieren zijn het symbool van Lapland. In Levi kun je ze op verschillende manieren beleven.", options: [{ name: "Bezoek aan rendierfarm", desc: "Ontmoet rendieren van dichtbij, leer over hun leven en maak foto's. Prijs ca. €60-80." }, { name: "Traditionele rendiersledetocht", desc: "Rustige sledetocht getrokken door een rendier door het besneeuwde landschap." }, { name: "Dag als rendierherder", desc: "Beleef het dagelijks leven van een rendierherder – voer rendieren en rijd mee op de slee." }] },
      iceFishing: { title: "IJsvissen op bevroren meren", icon: "fish", intro: "IJsvissen is een rustige manier om van de Laplandse winter te genieten. Zitten op het ijs onder een sterrenhemel is een meditatieve ervaring.", items: ["Begeleide ijsvistochten naar meren", "Uitrusting (hengel, aas, warmtekussen) inbegrepen", "Kans op witvis, baars of snoek", "Vaak gecombineerd met kampvuurlunch in het fjelllandschap"] },
      snowshoeing: { title: "Sneeuwschoenwandelen in de wildernis", icon: "footprints", intro: "Sneeuwschoenwandelen is een makkelijke manier om de Laplandse natuur te verkennen zonder ski-ervaring.", items: ["Begeleide tochten in nationale parken", "Zelfgeleide routes op gemarkeerde paden", "Vaak gecombineerd met koffiepauze en kampvuur", "Geschikt voor alle fitnessniveaus"] },
      fatBiking: { title: "Fatbiken in de sneeuw", icon: "bike", intro: "Fatbiken is een leuke manier om de routes van Levi in de winter te verkennen.", items: ["Te huur in het centrum van Levi", "Gemarkeerde fatbike-routes", "Begeleide tochten beschikbaar", "Geschikt voor alle niveaus"] },
      connecting: { title: "Activiteiten en accommodatie combineren", intro: "Combineer activiteiten met comfortabele accommodatie voor de beste Lapland-ervaring.", tips: ["Onze accommodaties liggen dichtbij de pistes en safari-vertrekpunten", "Eigen sauna om te ontspannen na een actieve dag", "Droogruimte voor natte kleding", "Vanuit het centrum bereik je alle activiteiten gemakkelijk"] },
      faq: { title: "Veelgestelde vragen", items: [
        { q: "Welke activiteiten zijn geschikt voor gezinnen met kinderen?", a: "Bijna alles! Rendierfarmbezoeken, korte huskysafari's, kinderskischool en sneeuwschoenwandelen zijn uitstekend voor gezinnen. Veel operators bieden kinderzitjes en speciale maten." },
        { q: "Moet ik activiteiten van tevoren boeken?", a: "Ja, vooral tijdens piekperiodes (kerstvakantie, krokusvakantie, Pasen). Populaire safari's en skischolen raken snel vol. We raden aan minstens een week van tevoren te boeken." },
        { q: "Zijn er activiteiten in de donkere decembermaand?", a: "Ja! Veel activiteiten zijn juist extra sfeervol tijdens de poolnacht. Lantaarns, vuur en noorderlicht creëren een unieke sfeer. Het skigebied is verlicht." },
        { q: "Wat is inbegrepen bij safari-prijzen?", a: "Meestal thermische kleding (overall, helm, handschoenen), begeleiding en vaak warme dranken/snacks. Controleer altijd bij de operator vóór boeking." }
      ] }
    },
    cta: { title: "Boek accommodatie dichtbij de activiteiten", text: "Onze accommodaties liggen dichtbij alle activiteiten. Geniet van de perfecte Lapland-vakantie in een comfortabel appartement.", button: "Bekijk accommodaties" },
    readNext: { title: "Lees ook", links: [
      { title: "Huskysafari in Levi", desc: "Tips en wat je moet weten", href: "/nl/activiteiten/husky-safari-levi" },
      { title: "Skiën in Levi", desc: "43 pistes en 28 liften", href: "/nl/gids/skieen-in-levi" },
      { title: "Winterkleding", desc: "Wat trek je aan bij -30°C?", href: "/nl/gids/winterkleding-levi-lapland" },
      { title: "Accommodaties", desc: "Chalets en appartementen in Levi", href: "/nl/accommodaties" }
    ] },
    relatedTitle: "Lees ook",
    relatedLinks: [
      { text: "Winterkleding voor Levi", href: "/nl/gids/winterkleding-levi-lapland" },
      { text: "Huskysafari in Levi", href: "/nl/activiteiten/husky-safari-levi" },
      { text: "Hoe kom je in Levi", href: "/nl/gids/hoe-kom-je-in-levi" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/nl" },
      { label: "Activiteiten in Levi", href: "/nl/gids/activiteiten-in-levi" },
      { label: "Winteractiviteiten", href: "/nl/activiteiten/winteractiviteiten-levi" }
    ],
    activitiesHubLink: "/nl/gids/activiteiten-in-levi",
    activitiesHubText: "← Terug naar activiteitengids",
    accommodationsHref: "/nl/accommodaties"
  },
  de: {
    meta: {
      title: `Was tun in Levi? Die 15 besten Winteraktivitäten ${year}`,
      description: "Huskysafaris, Rentierschlittenfahrten, Schneemobiltouren, Eisschwimmen und Nordlichtexkursionen. Preise, Buchungstipps und lokale Empfehlungen.",
      canonical: "https://leville.net/de/aktivitaeten/winteraktivitaeten-levi"
    },
    title: "Die besten Winteraktivitäten in Levi",
    subtitle: "Alles, was Sie im Winterwunderland Lapplands erleben können",
    intro: "Levi ist Finnlands beliebtestes Winterreiseziel – und das aus gutem Grund. Hier erleben Sie alles: vom Skifahren über Huskysafaris bis hin zu Rentierschlittenfahrten und Eisangeln. Dieser Guide stellt die besten Winteraktivitäten vor und hilft Ihnen bei der Planung Ihres Traumurlaubs in Lappland.",
    sections: {
      skiing: {
        title: "Skifahren und Snowboarden", icon: "mountain",
        intro: "Levi ist Finnlands größtes Skigebiet mit 43 Pisten und 28 Liften.",
        subsections: [
          { title: "Pisten und Lifte", items: ["43 Pisten für alle Könnensstufen", "28 Lifte – Leevilandia hat kinderfreundliche Lifte", "Längste Piste 2,5 km", "Höhenunterschied 325 Meter", "Schneegarantie von Oktober bis Mai"] },
          { title: "Skischule für alle Altersgruppen", items: ["Levi Ski School bietet Unterricht für Anfänger bis Fortgeschrittene", "Kinderskischule (Angry Birds Park)", "Privatstunden verfügbar", "Verleihservice an der Talstation"] }
        ]
      },
      crossCountry: { title: "Langlauf", icon: "treepine", intro: "Levi ist ein Paradies für Langläufer mit über 230 Kilometern gespurten Loipen.", items: ["230 km gespurte Loipen", "Beleuchtete Loipen für Abendlanglauf", "Wildnisrouten in Fjelllandschaften", "Verleih und Service am Skizentrum", "Übungshügel für Anfänger"] },
      husky: { title: "Huskysafaris", icon: "dog", intro: "Huskyfahrten sind ein unvergessliches Erlebnis – die Hunde ziehen Sie durch die verschneite Wildnis.", options: [{ name: "Kurze 2–3-Stunden-Safaris", desc: "Perfekt für Erstmalige, Preise ab 140 €" }, { name: "Halbtagesabenteuer", desc: "Tiefer in die Wildnis, ca. 200 €" }, { name: "Mehrtägige Expeditionen", desc: "Für erfahrene Fahrer, Übernachtung auf der Huskyfarm" }], tip: "Huskysafaris sind beliebt – buchen Sie frühzeitig, besonders während der Weihnachts- und Skiferiensaison." },
      reindeer: { title: "Rentier-Erlebnisse", icon: "heart", intro: "Rentiere sind das Symbol Lapplands. In Levi können Sie sie auf vielfältige Weise erleben.", options: [{ name: "Rentierfarmbesuche", desc: "Treffen Sie Rentiere hautnah, erfahren Sie alles über ihr Leben und machen Sie Fotos." }, { name: "Traditionelle Rentierschlittenfahrten", desc: "Friedliche Schlittenfahrt, gezogen von einem Rentier durch die verschneite Landschaft." }, { name: "Tag als Rentierhalter", desc: "Erleben Sie den Alltag eines Rentierhalters – füttern Sie Rentiere und fahren Sie mit Schlittenhunden." }] },
      iceFishing: { title: "Eisangeln auf gefrorenen Seen", icon: "fish", intro: "Eisangeln ist eine friedliche Art, den lappländischen Winter zu genießen. Auf dem Eis unter dem Sternenhimmel zu sitzen ist eine meditative Erfahrung.", items: ["Geführte Eisangeltouren zu Seen", "Ausrüstung (Rute, Köder, Wärmesitz) im Preis inbegriffen", "Möglichkeit, Felchen, Barsch oder Hecht zu fangen", "Oft kombiniert mit Lagerfeuer-Mittagessen in der Fjelllandschaft"] },
      snowshoeing: { title: "Schneeschuhwandern in der Wildnis", icon: "footprints", intro: "Schneeschuhwandern ist eine einfache Möglichkeit, die lappländische Natur ohne Skikenntnisse zu erkunden.", items: ["Geführte Touren in Nationalparks", "Selbstgeführte Routen auf markierten Wegen", "Oft kombiniert mit Kaffeepause und Lagerfeuer", "Für alle Fitnesslevel geeignet"] },
      fatBiking: { title: "Fatbiken im Schnee", icon: "bike", intro: "Fatbiken ist eine unterhaltsame Art, Levis Wege im Winter zu erkunden.", items: ["Im Zentrum von Levi mietbar", "Markierte Fatbike-Strecken", "Geführte Touren verfügbar", "Für alle Radfahrniveaus geeignet"] },
      connecting: { title: "Aktivitäten und Unterkunft verbinden", intro: "Wenn Sie Aktivitäten mit komfortabler Unterkunft kombinieren, erleben Sie das Beste Lapplands.", tips: ["Unsere Unterkünfte liegen in der Nähe von Pisten und Safari-Startpunkten", "Eigene Sauna zur Entspannung nach dem Aktivitätentag", "Trockenraum für nasse Ausrüstung", "Von Zentrumsunterkünften erreichen Sie alle Aktivitäten bequem"] },
      faq: { title: "Häufig gestellte Fragen", items: [
        { q: "Welche Aktivitäten eignen sich für Familien mit Kindern?", a: "Fast alle! Rentierfarmbesuche, kurze Huskysafaris, Kinderskischule und Schneeschuhwandern sind ideal für Familien. Viele Anbieter bieten Kindersitze und Sondergrößen." },
        { q: "Muss ich Aktivitäten im Voraus buchen?", a: "Ja, besonders in der Hauptsaison (Weihnachten, Skiferien, Ostern). Beliebte Safaris und Skischulen sind schnell ausgebucht. Wir empfehlen, mindestens eine Woche im Voraus zu buchen." },
        { q: "Gibt es Aktivitäten in der dunklen Dezemberzeit?", a: "Ja! Viele Aktivitäten sind während der Polarnacht besonders stimmungsvoll. Laternen, Feuer und Nordlichter schaffen eine einzigartige Atmosphäre. Das Skigebiet ist beleuchtet." },
        { q: "Was ist in den Safaripreisen enthalten?", a: "In der Regel Thermokleidung (Overall, Helm, Handschuhe), Führung und oft warme Getränke/Snacks. Erkundigen Sie sich immer beim Anbieter vor der Buchung." }
      ] }
    },
    cta: { title: "Buchen Sie eine Unterkunft in Aktivitätennähe", text: "Unsere Unterkünfte liegen in der Nähe aller Aktivitäten. Genießen Sie den perfekten Lappland-Urlaub in einer komfortablen Wohnung.", button: "Unterkünfte ansehen" },
    readNext: { title: "Lesen Sie auch", links: [
      { title: "Skifahren in Levi", desc: "43 Pisten und 28 Lifte", href: "/de/ratgeber/skifahren-in-levi" },
      { title: "Huskysafari", desc: "Tipps für Erstmalige", href: "/de/aktivitaeten/husky-safari-levi" },
      { title: "Rentiersafari", desc: "Unvergessliches Rentiererlebnis", href: "/de/aktivitaeten/rentiersafari-levi" },
      { title: "Winterkleidung", desc: "Richtig anziehen für Aktivitäten", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
    ] },
    relatedTitle: "Lesen Sie auch",
    relatedLinks: [
      { text: "Winterkleidung für Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Schneemobil-Safari Tipps", href: "/de/aktivitaeten/schneemobil-safari-levi" },
      { text: "Anreise nach Levi", href: "/de/ratgeber/anreise-nach-levi" }
    ],
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      { label: "Aktivitäten in Levi", href: "/de/ratgeber/aktivitaeten-in-levi" },
      { label: "Winteraktivitäten", href: "/de/aktivitaeten/winteraktivitaeten-levi" }
    ],
    activitiesHubLink: "/de/ratgeber/aktivitaeten-in-levi",
    activitiesHubText: "← Zurück zum Aktivitätenführer",
    accommodationsHref: "/de/unterkuenfte"
  },
  sv: {
    meta: {
      title: `Vad göra i Levi? De 15 bästa vinteraktiviteterna ${year}`,
      description: "Huskysafari, rensafari, snöskoter, isbadd och norrskenssafari. Priser, bokningstips och lokala rekommendationer.",
      canonical: "https://leville.net/sv/aktiviteter/vinteraktiviteter-levi"
    },
    title: "De bästa vinteraktiviteterna i Levi",
    subtitle: "Allt du kan göra i Lapplands vinterunderland",
    intro: "Levi är Finlands populäraste vinterdestination – och det med goda skäl. Här kan du uppleva allt från skidåkning till huskysafari, rensafari till isfiske. Denna guide presenterar de bästa vinteraktiviteterna och hjälper dig planera din drömresa till Lappland.",
    sections: {
      skiing: {
        title: "Skidåkning och snowboard", icon: "mountain",
        intro: "Levi är Finlands största skidort med 43 backar och 28 liftar.",
        subsections: [
          { title: "Backar och liftar", items: ["43 backar för alla nivåer", "28 liftar – Leevilandia har barnvänliga liftar", "Längsta backe 2,5 km", "Höjdskillnad 325 meter", "Snögaranti från oktober till maj"] },
          { title: "Skidskola för alla åldrar", items: ["Levi Ski School erbjuder lektioner för nybörjare till avancerade", "Barnskidskola (Angry Birds Park)", "Privatlektioner tillgängliga", "Uthyrning vid basen"] }
        ]
      },
      crossCountry: { title: "Längdskidåkning", icon: "treepine", intro: "Levi är ett paradis för längdskidåkare med över 230 kilometer preparerade spår.", items: ["230 km preparerade spår", "Belysta spår för kvällsskidåkning", "Vildmarksleder i fjällandskap", "Uthyrning och service vid skidcentret", "Övningsbacke för nybörjare"] },
      husky: { title: "Huskysafari", icon: "dog", intro: "Huskyturer är en oförglömlig upplevelse – hundarna drar dig genom det snöiga vildmarken.", options: [{ name: "Korta 2–3 timmars safarier", desc: "Perfekt för förstagångsbesökare, priser från 140 €" }, { name: "Halvdagsäventyr", desc: "Djupare in i vildmarken, ca 200 €" }, { name: "Flerdagsexpeditioner", desc: "För erfarna åkare, övernattning på huskygård" }], tip: "Huskysafarier är populära – boka i god tid, särskilt under jul- och sportlovssäsongen." },
      reindeer: { title: "Renupplevelser", icon: "heart", intro: "Renar är Lapplands symbol. I Levi kan du uppleva dem på många sätt.", options: [{ name: "Besök på renfarm", desc: "Möt renar på nära håll, lär dig om deras liv och ta foton." }, { name: "Traditionella renslädeturer", desc: "Fridful slädfärd dragen av ren genom snölandskapet." }, { name: "Dag som renskötare", desc: "Upplev en renskötares vardag – mata renar och åk med slädhundar." }] },
      iceFishing: { title: "Isfiske på frusna sjöar", icon: "fish", intro: "Isfiske är ett fridfullt sätt att njuta av den lappländska vintern. Att sitta på isen under stjärnhimlen är en meditativ upplevelse.", items: ["Guidade isfisketurer till sjöar", "Utrustning (spö, bete, värmesits) ingår", "Möjlighet att fånga sik, abborre eller gädda", "Ofta kombinerat med lägereldslunch i fjällandskap"] },
      snowshoeing: { title: "Snöskovanddring i vildmarken", icon: "footprints", intro: "Snöskovanddring är ett enkelt sätt att utforska Lapplands natur utan skidkunskaper.", items: ["Guidade turer i nationalparker", "Självguidede rutter på markerade leder", "Ofta kombinerat med kaffepaus och lägereld", "Passar alla fitnessnivåer"] },
      fatBiking: { title: "Fatbike i snön", icon: "bike", intro: "Fatbike är ett roligt sätt att utforska Levis leder på vintern.", items: ["Kan hyras i Levi centrum", "Markerade fatbikeleder", "Guidade turer tillgängliga", "Passar alla cykelnivåer"] },
      connecting: { title: "Kombinera aktiviteter med ditt boende", intro: "När du kombinerar aktiviteter med bekvämt boende får du den bästa Lapplandsupplevelsen.", tips: ["Våra boenden ligger nära backar och safariavgångspunkter", "Egen bastu för avkoppling efter aktivitetsdagen", "Torkrum för blöt utrustning", "Centralt boende ger enkel tillgång till alla aktiviteter"] },
      faq: { title: "Vanliga frågor", items: [
        { q: "Vilka aktiviteter passar familjer med barn?", a: "Nästan alla! Renfarmbesök, korta huskysafarier, barnskidskola och snöskovanddring passar utmärkt för familjer. Många operatörer erbjuder barnstolar och specialstorlekar." },
        { q: "Behöver jag boka aktiviteter i förväg?", a: "Ja, särskilt under högsäsong (jul, sportlov, påsk). Populära safarier och skidskolor fylls snabbt. Vi rekommenderar att boka minst en vecka i förväg." },
        { q: "Finns det aktiviteter i decembermörkret?", a: "Ja! Många aktiviteter är extra stämningsfulla under polarnatt. Lyktor, eldar och norrsken skapar en unik atmosfär. Skidorten är belyst." },
        { q: "Vad ingår i safaripriserna?", a: "Vanligtvis termokläder (overall, hjälm, handskar), guidning och ofta varma drycker/snacks. Kontrollera alltid med operatören före bokning." }
      ] }
    },
    cta: { title: "Boka boende nära aktiviteterna", text: "Våra boenden ligger nära alla aktiviteter. Njut av den perfekta Laplandssemestern i en bekväm lägenhet.", button: "Visa boenden" },
    readNext: { title: "Läs också", links: [
      { title: "Skidåkning i Levi", desc: "43 backar och 28 liftar", href: "/sv/guide/skidakning-i-levi" },
      { title: "Huskysafari", desc: "Tips för förstagångsbesökare", href: "/sv/aktiviteter/husky-safari-levi" },
      { title: "Rensafari", desc: "Oförglömlig renupplevelse", href: "/sv/aktiviteter/rensafari-levi" },
      { title: "Vinterkläder", desc: "Så klär du dig för aktiviteter", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
    ] },
    relatedTitle: "Läs också",
    relatedLinks: [
      { text: "Vinterkläder för Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Snöskotursafari tips", href: "/sv/aktiviteter/snoskotersafari-levi" },
      { text: "Hur tar du dig till Levi", href: "/sv/guide/hur-tar-du-dig-till-levi" }
    ],
    breadcrumbs: [
      { label: "Startsida", href: "/sv" },
      { label: "Aktiviteter i Levi", href: "/sv/guide/aktiviteter-i-levi" },
      { label: "Vinteraktiviteter", href: "/sv/aktiviteter/vinteraktiviteter-levi" }
    ],
    activitiesHubLink: "/sv/guide/aktiviteter-i-levi",
    activitiesHubText: "← Tillbaka till aktivitetsguiden",
    accommodationsHref: "/sv/boenden"
  },
  fr: {
    meta: {
      title: `Que faire à Levi ? Les 15 meilleures activités d'hiver ${year}`,
      description: "Safaris en chiens de traîneau, promenades en renne, motoneige, baignade dans la glace et excursions aurores boréales. Prix, réservation et conseils locaux.",
      canonical: "https://leville.net/fr/activites/activites-hiver-levi"
    },
    title: "Les meilleures activités d'hiver à Levi",
    subtitle: "Tout ce que vous pouvez faire au pays des merveilles hivernales de la Laponie",
    intro: "Levi est la destination hivernale la plus populaire de Finlande – et pour de bonnes raisons. Ici, vous pouvez tout vivre : du ski aux safaris en huskys, des promenades en renne à la pêche sur glace. Ce guide présente les meilleures activités hivernales et vous aide à planifier vos vacances de rêve en Laponie.",
    sections: {
      skiing: {
        title: "Ski alpin et snowboard", icon: "mountain",
        intro: "Levi est la plus grande station de ski de Finlande avec 43 pistes et 28 remontées.",
        subsections: [
          { title: "Pistes et remontées", items: ["43 pistes pour tous les niveaux", "28 remontées – Leevilandia a des remontées adaptées aux enfants", "Plus longue piste 2,5 km", "Dénivelé 325 mètres", "Neige garantie d'octobre à mai"] },
          { title: "École de ski pour tous les âges", items: ["Levi Ski School propose des cours pour débutants à avancés", "École de ski pour enfants (Angry Birds Park)", "Cours privés disponibles", "Services de location au pied des pistes"] }
        ]
      },
      crossCountry: { title: "Ski de fond", icon: "treepine", intro: "Levi est un paradis pour les fondeurs avec plus de 230 kilomètres de pistes damées.", items: ["230 km de pistes damées", "Pistes éclairées pour le ski en soirée", "Itinéraires sauvages dans les paysages de fjell", "Location et service au centre de ski", "Colline d'entraînement pour débutants"] },
      husky: { title: "Safaris en huskys", icon: "dog", intro: "Les balades en husky sont une expérience inoubliable – les chiens vous tirent à travers la nature enneigée.", options: [{ name: "Courts safaris de 2–3 heures", desc: "Parfait pour les débutants, prix à partir de 140 €" }, { name: "Aventures d'une demi-journée", desc: "Plus profondément dans la nature, environ 200 €" }, { name: "Expéditions de plusieurs jours", desc: "Pour les conducteurs expérimentés, nuit à la ferme de huskys" }], tip: "Les safaris en huskys sont populaires – réservez à l'avance, surtout pendant les vacances de Noël et de ski." },
      reindeer: { title: "Expériences avec les rennes", icon: "heart", intro: "Les rennes sont le symbole de la Laponie. À Levi, vous pouvez les découvrir de plusieurs façons.", options: [{ name: "Visites de fermes de rennes", desc: "Rencontrez les rennes de près, apprenez leur mode de vie et prenez des photos." }, { name: "Promenades traditionnelles en traîneau à rennes", desc: "Balade paisible en traîneau tiré par un renne à travers le paysage enneigé." }, { name: "Journée d'éleveur de rennes", desc: "Vivez le quotidien d'un éleveur de rennes – nourrissez les rennes et conduisez les chiens de traîneau." }] },
      iceFishing: { title: "Pêche sur glace", icon: "fish", intro: "La pêche sur glace est un moyen paisible de profiter de l'hiver lapon. S'asseoir sur la glace sous le ciel étoilé est une expérience méditative.", items: ["Excursions de pêche sur glace guidées", "Équipement (canne, appât, siège thermique) inclus", "Possibilité d'attraper du corégone, de la perche ou du brochet", "Souvent combiné avec un déjeuner au feu de camp dans le paysage de fjell"] },
      snowshoeing: { title: "Raquettes dans la nature", icon: "footprints", intro: "La raquette est un moyen facile d'explorer la nature lapone sans compétences en ski.", items: ["Excursions guidées dans les parcs nationaux", "Itinéraires autoguidés sur sentiers balisés", "Souvent combiné avec pause café et feu de camp", "Convient à tous les niveaux de forme physique"] },
      fatBiking: { title: "Fat bike dans la neige", icon: "bike", intro: "Le fat bike est un moyen amusant d'explorer les sentiers de Levi en hiver.", items: ["Disponible en location au centre de Levi", "Pistes de fat bike balisées", "Excursions guidées disponibles", "Convient à tous les niveaux de cyclisme"] },
      connecting: { title: "Combiner activités et hébergement", intro: "En combinant activités et hébergement confortable, vous vivez la meilleure expérience de Laponie.", tips: ["Nos hébergements sont situés près des pistes et points de départ des safaris", "Sauna privé pour se détendre après une journée d'activités", "Salle de séchage pour l'équipement mouillé", "Les hébergements au centre donnent un accès facile à toutes les activités"] },
      faq: { title: "Questions fréquentes", items: [
        { q: "Quelles activités conviennent aux familles avec enfants ?", a: "Presque toutes ! Visites de fermes de rennes, courts safaris en huskys, école de ski pour enfants et raquettes conviennent parfaitement aux familles. Beaucoup d'opérateurs proposent des sièges enfants et des tailles spéciales." },
        { q: "Faut-il réserver les activités à l'avance ?", a: "Oui, surtout pendant les périodes de pointe (Noël, vacances de ski, Pâques). Les safaris populaires et les écoles de ski se remplissent vite. Nous recommandons de réserver au moins une semaine à l'avance." },
        { q: "Y a-t-il des activités dans l'obscurité de décembre ?", a: "Oui ! Beaucoup d'activités sont particulièrement atmosphériques pendant la nuit polaire. Lanternes, feux et aurores boréales créent une ambiance unique. La station de ski est éclairée." },
        { q: "Que comprennent les prix des safaris ?", a: "Généralement des vêtements thermiques (combinaison, casque, gants), le guidage et souvent des boissons chaudes/snacks. Vérifiez toujours auprès de l'opérateur avant de réserver." }
      ] }
    },
    cta: { title: "Réservez un hébergement près des activités", text: "Nos hébergements sont situés près de toutes les activités. Profitez de vacances parfaites en Laponie dans un appartement confortable.", button: "Voir les hébergements" },
    readNext: { title: "À lire aussi", links: [
      { title: "Ski à Levi", desc: "43 pistes et 28 remontées", href: "/fr/guide/ski-a-levi" },
      { title: "Safari en huskys", desc: "Conseils pour les débutants", href: "/fr/activites/safari-chiens-levi" },
      { title: "Safari en rennes", desc: "Expérience inoubliable avec les rennes", href: "/fr/activites/safari-rennes-levi" },
      { title: "Vêtements d'hiver", desc: "Comment s'habiller pour les activités", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
    ] },
    relatedTitle: "À lire aussi",
    relatedLinks: [
      { text: "Vêtements d'hiver pour Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Safari motoneige", href: "/fr/activites/safari-motoneige-levi" },
      { text: "Comment se rendre à Levi", href: "/fr/guide/comment-se-rendre-a-levi" }
    ],
    breadcrumbs: [
      { label: "Accueil", href: "/fr" },
      { label: "Activités à Levi", href: "/fr/guide/activites-a-levi" },
      { label: "Activités d'hiver", href: "/fr/activites/activites-hiver-levi" }
    ],
    activitiesHubLink: "/fr/guide/activites-a-levi",
    activitiesHubText: "← Retour au guide des activités",
    accommodationsHref: "/fr/hebergements"
  },
  es: {
    meta: {
      title: `Qué hacer en Levi — Las 15 mejores actividades de invierno ${year}`,
      description: "Safaris de huskys, paseos en reno, motonieve, baño en hielo y excursiones de auroras boreales. Precios, consejos de reserva y recomendaciones locales.",
      canonical: "https://leville.net/es/actividades/actividades-invierno-levi"
    },
    title: "Las mejores actividades de invierno en Levi",
    subtitle: "Todo lo que puedes hacer en el paraíso invernal de Laponia",
    intro: "Levi es el destino invernal más popular de Finlandia, y con razón. Aquí puedes experimentar de todo: desde esquí hasta safaris de huskys, paseos en reno hasta pesca en hielo. Esta guía presenta las mejores actividades de invierno y te ayuda a planificar tus vacaciones soñadas en Laponia.",
    sections: {
      skiing: {
        title: "Esquí y snowboard", icon: "mountain",
        intro: "Levi es la estación de esquí más grande de Finlandia con 43 pistas y 28 remontes.",
        subsections: [
          { title: "Pistas y remontes", items: ["43 pistas para todos los niveles", "28 remontes – Leevilandia tiene remontes adaptados para niños", "Pista más larga de 2,5 km", "Desnivel de 325 metros", "Nieve garantizada de octubre a mayo"] },
          { title: "Escuela de esquí para todas las edades", items: ["Levi Ski School ofrece clases para principiantes a avanzados", "Escuela de esquí infantil (Angry Birds Park)", "Clases privadas disponibles", "Servicios de alquiler al pie de las pistas"] }
        ]
      },
      crossCountry: { title: "Esquí de fondo", icon: "treepine", intro: "Levi es un paraíso para los esquiadores de fondo con más de 230 kilómetros de pistas preparadas.", items: ["230 km de pistas preparadas", "Pistas iluminadas para esquiar por la tarde", "Rutas de naturaleza en paisajes de fjell", "Alquiler y servicio en el centro de esquí", "Colina de práctica para principiantes"] },
      husky: { title: "Safaris de huskys", icon: "dog", intro: "Los paseos en husky son una experiencia inolvidable: los perros te llevan a través de la naturaleza nevada.", options: [{ name: "Safaris cortos de 2–3 horas", desc: "Perfecto para principiantes, precios desde 140 €" }, { name: "Aventuras de medio día", desc: "Más adentro en la naturaleza, aprox. 200 €" }, { name: "Expediciones de varios días", desc: "Para conductores experimentados, noche en granja de huskys" }], tip: "Los safaris de huskys son populares: reserva con anticipación, especialmente durante las temporadas de Navidad y esquí." },
      reindeer: { title: "Experiencias con renos", icon: "heart", intro: "Los renos son el símbolo de Laponia. En Levi puedes experimentarlos de muchas maneras.", options: [{ name: "Visitas a granjas de renos", desc: "Conoce renos de cerca, aprende sobre su vida y toma fotos." }, { name: "Paseos tradicionales en trineo de renos", desc: "Paseo tranquilo en trineo tirado por un reno por el paisaje nevado." }, { name: "Día como pastor de renos", desc: "Vive el día a día de un pastor de renos: alimenta renos y viaja con perros de trineo." }] },
      iceFishing: { title: "Pesca en hielo", icon: "fish", intro: "La pesca en hielo es una forma tranquila de disfrutar del invierno lapón. Sentarse en el hielo bajo el cielo estrellado es una experiencia meditativa.", items: ["Excursiones guiadas de pesca en hielo", "Equipo (caña, cebo, asiento térmico) incluido", "Posibilidad de pescar pescado blanco, perca o lucio", "A menudo combinado con almuerzo junto a la fogata en paisaje de fjell"] },
      snowshoeing: { title: "Raquetas de nieve en la naturaleza", icon: "footprints", intro: "Las raquetas de nieve son una forma fácil de explorar la naturaleza lapona sin habilidades de esquí.", items: ["Excursiones guiadas en parques nacionales", "Rutas autoguiadas en senderos señalizados", "A menudo combinado con pausa para café y fogata", "Apto para todos los niveles de forma física"] },
      fatBiking: { title: "Fat bike en la nieve", icon: "bike", intro: "El fat bike es una forma divertida de explorar los senderos de Levi en invierno.", items: ["Disponible para alquilar en el centro de Levi", "Senderos de fat bike señalizados", "Excursiones guiadas disponibles", "Apto para todos los niveles de ciclismo"] },
      connecting: { title: "Combinar actividades y alojamiento", intro: "Cuando combinas actividades con alojamiento cómodo, obtienes la mejor experiencia de Laponia.", tips: ["Nuestros alojamientos están cerca de las pistas y puntos de partida de safaris", "Sauna privada para relajarte después del día de actividades", "Sala de secado para equipos mojados", "Los alojamientos céntricos dan fácil acceso a todas las actividades"] },
      faq: { title: "Preguntas frecuentes", items: [
        { q: "¿Qué actividades son adecuadas para familias con niños?", a: "¡Casi todas! Visitas a granjas de renos, safaris cortos de huskys, escuela de esquí infantil y raquetas de nieve son ideales para familias. Muchos operadores ofrecen asientos infantiles y tallas especiales." },
        { q: "¿Necesito reservar actividades con anticipación?", a: "Sí, especialmente durante temporada alta (Navidad, vacaciones de esquí, Semana Santa). Los safaris populares y escuelas de esquí se llenan rápidamente. Recomendamos reservar al menos una semana antes." },
        { q: "¿Hay actividades en la oscuridad de diciembre?", a: "¡Sí! Muchas actividades son especialmente atmosféricas durante la noche polar. Faroles, fogatas y auroras boreales crean un ambiente único. La estación de esquí está iluminada." },
        { q: "¿Qué incluyen los precios de los safaris?", a: "Generalmente ropa térmica (mono, casco, guantes), guía y a menudo bebidas calientes/snacks. Siempre consulte con el operador antes de reservar." }
      ] }
    },
    cta: { title: "Reserva alojamiento cerca de las actividades", text: "Nuestros alojamientos están cerca de todas las actividades. Disfruta de las vacaciones perfectas en Laponia en un apartamento cómodo.", button: "Ver alojamientos" },
    readNext: { title: "Lee también", links: [
      { title: "Esquí en Levi", desc: "43 pistas y 28 remontes", href: "/es/guia/esqui-en-levi" },
      { title: "Safari de huskys", desc: "Consejos para principiantes", href: "/es/actividades/safari-huskys-levi" },
      { title: "Safari de renos", desc: "Experiencia inolvidable con renos", href: "/es/actividades/safari-renos-levi" },
      { title: "Ropa de invierno", desc: "Cómo vestirse para las actividades", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
    ] },
    relatedTitle: "Lee también",
    relatedLinks: [
      { text: "Ropa de invierno para Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Safari en motonieve", href: "/es/actividades/safari-motonieve-levi" },
      { text: "Cómo llegar a Levi", href: "/es/guia/como-llegar-a-levi" }
    ],
    breadcrumbs: [
      { label: "Inicio", href: "/es" },
      { label: "Actividades en Levi", href: "/es/guia/actividades-en-levi" },
      { label: "Actividades de invierno", href: "/es/actividades/actividades-invierno-levi" }
    ],
    activitiesHubLink: "/es/guia/actividades-en-levi",
    activitiesHubText: "← Volver a la guía de actividades",
    accommodationsHref: "/es/alojamientos"
  }
};
