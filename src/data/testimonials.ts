import { Language } from "@/translations";

// Shared testimonials data with translations
export interface Testimonial {
  name: string;
  location: Record<Language, string>;
  rating: number;
  text: Record<Language, string>;
  shortText: Record<Language, string>;
}

export const testimonials: Testimonial[] = [
  {
    name: "Laura M.",
    location: {
      fi: "Helsinki", en: "Helsinki, Finland", sv: "Helsingfors, Finland", de: "Helsinki, Finnland", es: "Helsinki, Finlandia", fr: "Helsinki, Finlande", nl: "Helsinki, Finland"
    },
    rating: 5,
    text: {
      fi: "Todella loistava majoitus Levillä. Sijainti oli aivan täydellinen, kaikki palvelut ja rinteet kävelymatkan päässä, mutta silti rauhallinen ympäristö. Asunto oli erittäin siisti ja hyvin varusteltu, ja kaikki toimi juuri kuten oli luvattu. Asiakaspalvelu oli poikkeuksellisen ystävällistä ja nopeaa, kysymyksiin vastattiin heti. Tulemme ehdottomasti uudelleen.",
      en: "Absolutely fantastic accommodation in Levi. The location was perfect, all services and slopes within walking distance, yet still a peaceful environment. The apartment was very clean and well-equipped, and everything worked exactly as promised. Customer service was exceptionally friendly and fast. We will definitely come back.",
      sv: "Fantastiskt boende i Levi. Läget var perfekt, alla tjänster och backar inom gångavstånd, men ändå lugn miljö. Lägenheten var mycket ren och välutrustad, och allt fungerade precis som utlovat. Kundservicen var exceptionellt vänlig och snabb. Vi kommer definitivt tillbaka.",
      de: "Wirklich fantastische Unterkunft in Levi. Die Lage war perfekt, alle Dienstleistungen und Pisten in Gehweite, aber dennoch eine ruhige Umgebung. Die Wohnung war sehr sauber und gut ausgestattet. Der Kundenservice war außergewöhnlich freundlich und schnell. Wir kommen definitiv wieder.",
      es: "Alojamiento absolutamente fantástico en Levi. La ubicación era perfecta, todos los servicios y pistas a poca distancia, pero aún así un ambiente tranquilo. El apartamento estaba muy limpio y bien equipado. El servicio al cliente fue excepcionalmente amable y rápido. Definitivamente volveremos.",
      fr: "Hébergement absolument fantastique à Levi. L'emplacement était parfait, tous les services et pistes à distance de marche, mais toujours un environnement paisible. L'appartement était très propre et bien équipé. Le service client était exceptionnellement amical et rapide. Nous reviendrons certainement.",
      nl: "Absoluut fantastische accommodatie in Levi. De locatie was perfect, alle voorzieningen en pistes op loopafstand, maar toch een rustige omgeving. Het appartement was zeer schoon en goed uitgerust. De klantenservice was uitzonderlijk vriendelijk en snel. We komen zeker terug."
    },
    shortText: {
      fi: "Todella loistava majoitus Levillä. Sijainti oli aivan täydellinen, kaikki palvelut ja rinteet kävelymatkan päässä. Asiakaspalvelu oli poikkeuksellisen ystävällistä ja nopeaa. Tulemme ehdottomasti uudelleen.",
      en: "Absolutely fantastic accommodation in Levi. The location was perfect, all services and slopes within walking distance. Customer service was exceptionally friendly and fast. We will definitely come back.",
      sv: "Fantastiskt boende i Levi. Läget var perfekt, alla tjänster och backar inom gångavstånd. Kundservicen var exceptionellt vänlig och snabb. Vi kommer definitivt tillbaka.",
      de: "Fantastische Unterkunft in Levi. Die Lage war perfekt, alle Dienstleistungen in Gehweite. Der Kundenservice war außergewöhnlich freundlich. Wir kommen definitiv wieder.",
      es: "Alojamiento fantástico en Levi. La ubicación era perfecta, todos los servicios a poca distancia. El servicio al cliente fue excepcionalmente amable. Definitivamente volveremos.",
      fr: "Hébergement fantastique à Levi. L'emplacement était parfait, tous les services à distance de marche. Le service client était exceptionnellement amical. Nous reviendrons certainement.",
      nl: "Fantastische accommodatie in Levi. De locatie was perfect, alle voorzieningen op loopafstand. De klantenservice was uitzonderlijk vriendelijk en snel. We komen zeker terug."
    },
  },
  {
    name: "James W.",
    location: {
      fi: "Iso-Britannia", en: "United Kingdom", sv: "Storbritannien", de: "Großbritannien", es: "Reino Unido", fr: "Royaume-Uni", nl: "Verenigd Koninkrijk"
    },
    rating: 5,
    text: {
      fi: "Loistava paikka majoittua Levillä. Huoneisto oli tilava, siisti ja erittäin mukava, täsmälleen kuvauksen mukainen. Sijaintia ei voi parantaa, lähellä ravintoloita, hissejä ja kauppoja. Kommunikaatio oli erinomaista alusta loppuun. Yksi sujuvimmista lomamajoituksista koskaan.",
      en: "Fantastic place to stay in Levi. The apartment was spacious, clean and very comfortable, exactly as described. Location could not be better, close to restaurants, ski lifts and shops. Communication was excellent from start to finish and everything was very well organised. One of the smoothest holiday stays we have ever had.",
      sv: "Fantastiskt ställe att bo på i Levi. Lägenheten var rymlig, ren och mycket bekväm, precis som beskriven. Läget kunde inte vara bättre, nära restauranger, skidliftar och butiker. Kommunikationen var utmärkt från början till slut. En av de smidigaste semestervistelserna vi någonsin haft.",
      de: "Fantastischer Aufenthalt in Levi. Die Wohnung war geräumig, sauber und sehr komfortabel, genau wie beschrieben. Die Lage könnte nicht besser sein, nahe an Restaurants, Skiliften und Geschäften. Die Kommunikation war von Anfang bis Ende ausgezeichnet. Einer der reibungslosesten Urlaubsaufenthalte.",
      es: "Lugar fantástico para alojarse en Levi. El apartamento era espacioso, limpio y muy cómodo, exactamente como se describe. La ubicación no podría ser mejor, cerca de restaurantes, remontes y tiendas. La comunicación fue excelente de principio a fin. Una de las estancias más fluidas que hemos tenido.",
      fr: "Endroit fantastique pour séjourner à Levi. L'appartement était spacieux, propre et très confortable, exactement comme décrit. L'emplacement ne pourrait pas être meilleur, proche des restaurants, remontées et commerces. La communication était excellente du début à la fin. L'un des séjours les plus agréables que nous ayons eus.",
      nl: "Fantastische plek om te verblijven in Levi. Het appartement was ruim, schoon en zeer comfortabel, precies zoals beschreven. De locatie kon niet beter, dicht bij restaurants, skiliften en winkels. De communicatie was uitstekend van begin tot eind. Een van de soepelste vakantieverblijven die we ooit hebben gehad."
    },
    shortText: {
      fi: "Loistava paikka majoittua Levillä. Huoneisto oli tilava, siisti ja erittäin mukava. Kommunikaatio oli erinomaista alusta loppuun. Yksi sujuvimmista lomamajoituksista koskaan.",
      en: "Fantastic place to stay in Levi. The apartment was spacious, clean and very comfortable. Communication was excellent from start to finish. One of the smoothest holiday stays we have ever had.",
      sv: "Fantastiskt ställe att bo på i Levi. Lägenheten var rymlig, ren och mycket bekväm. Kommunikationen var utmärkt. En av de smidigaste semestervistelserna vi någonsin haft.",
      de: "Fantastischer Aufenthalt in Levi. Die Wohnung war geräumig, sauber und komfortabel. Die Kommunikation war ausgezeichnet. Einer der reibungslosesten Urlaubsaufenthalte.",
      es: "Lugar fantástico en Levi. El apartamento era espacioso, limpio y cómodo. La comunicación fue excelente. Una de las estancias más fluidas que hemos tenido.",
      fr: "Endroit fantastique à Levi. L'appartement était spacieux, propre et confortable. La communication était excellente. L'un des séjours les plus agréables.",
      nl: "Fantastische plek in Levi. Het appartement was ruim, schoon en comfortabel. De communicatie was uitstekend. Een van de soepelste vakantieverblijven ooit."
    },
  },
  {
    name: "Mikko S.",
    location: {
      fi: "Tampere", en: "Tampere, Finland", sv: "Tammerfors, Finland", de: "Tampere, Finnland", es: "Tampere, Finlandia", fr: "Tampere, Finlande", nl: "Tampere, Finland"
    },
    rating: 5,
    text: {
      fi: "Erittäin onnistunut reissu. Majoitus oli laadukas ja vastasi täysin odotuksia, jopa ylitti ne. Sijainti teki lomasta helpon, ei tarvinnut autoa lainkaan. Asiakaspalvelu oli joustavaa ja ammattimaista, tuli tunne että asiakkaasta oikeasti välitetään. Harvinaisen toimiva kokonaisuus.",
      en: "Extremely successful trip. The accommodation was high quality and fully met expectations, even exceeded them. The location made the holiday easy, no car needed at all. Customer service was flexible and professional, felt like they really care about customers. A remarkably well-functioning experience.",
      sv: "Extremt lyckad resa. Boendet var av hög kvalitet och motsvarade helt förväntningarna, till och med överträffade dem. Läget gjorde semestern enkel, ingen bil behövdes. Kundservicen var flexibel och professionell. En anmärkningsvärt välfungerande upplevelse.",
      de: "Äußerst erfolgreiche Reise. Die Unterkunft war hochwertig und erfüllte alle Erwartungen, übertraf sie sogar. Die Lage machte den Urlaub einfach, kein Auto nötig. Der Kundenservice war flexibel und professionell. Ein bemerkenswert gut funktionierendes Erlebnis.",
      es: "Viaje extremadamente exitoso. El alojamiento era de alta calidad y cumplió todas las expectativas, incluso las superó. La ubicación facilitó las vacaciones, no se necesitaba coche. El servicio al cliente fue flexible y profesional. Una experiencia notablemente fluida.",
      fr: "Voyage extrêmement réussi. L'hébergement était de haute qualité et a pleinement répondu aux attentes, les dépassant même. L'emplacement a rendu les vacances faciles, pas besoin de voiture. Le service client était flexible et professionnel. Une expérience remarquablement fluide.",
      nl: "Buitengewoon geslaagde reis. De accommodatie was van hoge kwaliteit en overtrof alle verwachtingen. De locatie maakte de vakantie makkelijk, geen auto nodig. De klantenservice was flexibel en professioneel. Een opmerkelijk goed werkende ervaring."
    },
    shortText: {
      fi: "Erittäin onnistunut reissu. Majoitus oli laadukas ja vastasi täysin odotuksia, jopa ylitti ne. Asiakaspalvelu oli joustavaa ja ammattimaista. Harvinaisen toimiva kokonaisuus.",
      en: "Extremely successful trip. The accommodation was high quality and exceeded expectations. Customer service was flexible and professional. A remarkably well-functioning experience.",
      sv: "Extremt lyckad resa. Boendet var av hög kvalitet och överträffade förväntningarna. Kundservicen var flexibel och professionell. En anmärkningsvärt välfungerande upplevelse.",
      de: "Äußerst erfolgreiche Reise. Die Unterkunft war hochwertig und übertraf die Erwartungen. Der Kundenservice war flexibel und professionell.",
      es: "Viaje extremadamente exitoso. El alojamiento era de alta calidad y superó las expectativas. El servicio al cliente fue flexible y profesional.",
      fr: "Voyage extrêmement réussi. L'hébergement était de haute qualité et a dépassé les attentes. Le service client était flexible et professionnel.",
      nl: "Buitengewoon geslaagde reis. De accommodatie was van hoge kwaliteit en overtrof de verwachtingen. De klantenservice was flexibel en professioneel."
    },
  },
  {
    name: "Anna-Lena K.",
    location: {
      fi: "Saksa", en: "Germany", sv: "Tyskland", de: "Deutschland", es: "Alemania", fr: "Allemagne", nl: "Duitsland"
    },
    rating: 5,
    text: {
      fi: "Meillä oli ihana oleskelu. Huoneisto oli viihtyisä, moderni ja erittäin hyvin varusteltu, täydellinen talvilomalle. Sijainti oli erinomainen, kaikki Levin keskustassa oli lähellä. Asiakaspalvelu oli erinomaista, ystävällistä, avuliasta ja aina tavoitettavissa. Suosittelen lämpimästi.",
      en: "We had a wonderful stay. The apartment was cozy, modern and very well equipped, perfect for a winter holiday. The location was excellent, everything in Levi centre was close by. Customer service was outstanding, friendly, helpful and always available when needed. Highly recommended.",
      sv: "Vi hade en underbar vistelse. Lägenheten var mysig, modern och mycket välutrustad, perfekt för en vintersemester. Läget var utmärkt, allt i Levi centrum var nära. Kundservicen var enastående, vänlig, hjälpsam och alltid tillgänglig. Rekommenderas varmt.",
      de: "Wir hatten einen wunderbaren Aufenthalt. Die Wohnung war gemütlich, modern und sehr gut ausgestattet, perfekt für einen Winterurlaub. Die Lage war ausgezeichnet, alles im Zentrum von Levi war in der Nähe. Der Kundenservice war hervorragend, freundlich, hilfsbereit und immer erreichbar. Sehr empfehlenswert.",
      es: "Tuvimos una estancia maravillosa. El apartamento era acogedor, moderno y muy bien equipado, perfecto para unas vacaciones de invierno. La ubicación era excelente, todo en el centro de Levi estaba cerca. El servicio al cliente fue excepcional, amable, servicial y siempre disponible. Muy recomendable.",
      fr: "Nous avons passé un merveilleux séjour. L'appartement était confortable, moderne et très bien équipé, parfait pour des vacances d'hiver. L'emplacement était excellent, tout au centre de Levi était proche. Le service client était exceptionnel, amical, serviable et toujours disponible. Hautement recommandé.",
      nl: "We hadden een prachtig verblijf. Het appartement was gezellig, modern en zeer goed uitgerust, perfect voor een wintervakantie. De locatie was uitstekend, alles in het centrum van Levi was dichtbij. De klantenservice was uitmuntend, vriendelijk en altijd beschikbaar. Zeer aanbevolen."
    },
    shortText: {
      fi: "Meillä oli ihana oleskelu. Huoneisto oli viihtyisä, moderni ja erittäin hyvin varusteltu. Asiakaspalvelu oli erinomaista, ystävällistä ja aina tavoitettavissa. Suosittelen lämpimästi.",
      en: "We had a wonderful stay. The apartment was cozy, modern and very well equipped, perfect for a winter holiday. Customer service was outstanding, friendly and always available. Highly recommended.",
      sv: "Vi hade en underbar vistelse. Lägenheten var mysig, modern och välutrustad. Kundservicen var enastående, vänlig och alltid tillgänglig. Rekommenderas varmt.",
      de: "Wir hatten einen wunderbaren Aufenthalt. Die Wohnung war gemütlich, modern und gut ausgestattet. Der Kundenservice war hervorragend und freundlich. Sehr empfehlenswert.",
      es: "Tuvimos una estancia maravillosa. El apartamento era acogedor, moderno y bien equipado. El servicio al cliente fue excepcional y amable. Muy recomendable.",
      fr: "Nous avons passé un merveilleux séjour. L'appartement était confortable, moderne et bien équipé. Le service client était exceptionnel et amical. Hautement recommandé.",
      nl: "We hadden een prachtig verblijf. Het appartement was gezellig, modern en goed uitgerust. De klantenservice was uitmuntend en vriendelijk. Zeer aanbevolen."
    },
  },
  {
    name: "Petri ja Sari L.",
    location: {
      fi: "Turku", en: "Turku, Finland", sv: "Åbo, Finland", de: "Turku, Finnland", es: "Turku, Finlandia", fr: "Turku, Finlande", nl: "Turku, Finland"
    },
    rating: 5,
    text: {
      fi: "Kaikki sujui alusta loppuun todella vaivattomasti. Varaus, ohjeet ja sisäänkirjautuminen olivat selkeitä. Majoitus oli lämmin, viihtyisä ja hyväkuntoinen, juuri sellainen kuin lomalla toivoo. Sijainti Levillä oli erinomainen ja asiakaspalvelu ansaitsee erityismaininnan nopeudesta ja ystävällisyydestä.",
      en: "Everything went smoothly from start to finish. Booking, instructions and check-in were clear. The accommodation was warm, cozy and in great condition, exactly what you hope for on holiday. The location in Levi was excellent and customer service deserves special mention for speed and friendliness.",
      sv: "Allt gick smidigt från början till slut. Bokning, instruktioner och incheckning var tydliga. Boendet var varmt, mysigt och i bra skick, precis vad man hoppas på under semestern. Läget i Levi var utmärkt och kundservicen förtjänar särskilt omnämnande för snabbhet och vänlighet.",
      de: "Alles lief von Anfang bis Ende reibungslos. Buchung, Anweisungen und Check-in waren klar. Die Unterkunft war warm, gemütlich und in gutem Zustand, genau das, was man sich im Urlaub wünscht. Die Lage in Levi war ausgezeichnet und der Kundenservice verdient besondere Erwähnung.",
      es: "Todo fue perfectamente de principio a fin. La reserva, las instrucciones y el check-in fueron claros. El alojamiento era cálido, acogedor y en excelente estado. La ubicación en Levi era excelente y el servicio al cliente merece mención especial por su rapidez y amabilidad.",
      fr: "Tout s'est déroulé parfaitement du début à la fin. La réservation, les instructions et l'enregistrement étaient clairs. L'hébergement était chaleureux, confortable et en excellent état. L'emplacement à Levi était excellent et le service client mérite une mention spéciale pour sa rapidité et son amabilité.",
      nl: "Alles verliep soepel van begin tot eind. Boeking, instructies en inchecken waren duidelijk. De accommodatie was warm, gezellig en in uitstekende staat. De locatie in Levi was uitstekend en de klantenservice verdient bijzondere vermelding."
    },
    shortText: {
      fi: "Kaikki sujui alusta loppuun todella vaivattomasti. Majoitus oli lämmin, viihtyisä ja hyväkuntoinen. Sijainti Levillä oli erinomainen ja asiakaspalvelu ansaitsee erityismaininnan.",
      en: "Everything went smoothly from start to finish. The accommodation was warm, cozy and in great condition. The location in Levi was excellent and customer service deserves special mention.",
      sv: "Allt gick smidigt från början till slut. Boendet var varmt, mysigt och i bra skick. Läget i Levi var utmärkt och kundservicen förtjänar särskilt omnämnande.",
      de: "Alles lief reibungslos. Die Unterkunft war warm, gemütlich und in gutem Zustand. Die Lage in Levi war ausgezeichnet und der Kundenservice verdient besondere Erwähnung.",
      es: "Todo fue perfectamente. El alojamiento era cálido, acogedor y en excelente estado. La ubicación en Levi era excelente y el servicio al cliente merece mención especial.",
      fr: "Tout s'est déroulé parfaitement. L'hébergement était chaleureux, confortable et en excellent état. L'emplacement à Levi était excellent et le service client mérite une mention spéciale.",
      nl: "Alles verliep soepel. De accommodatie was warm, gezellig en in uitstekende staat. De locatie in Levi was uitstekend en de klantenservice verdient bijzondere vermelding."
    },
  },
  {
    name: "Carlos M.",
    location: {
      fi: "Barcelona, Espanja", en: "Barcelona, Spain", sv: "Barcelona, Spanien", de: "Barcelona, Spanien", es: "Barcelona, España", fr: "Barcelone, Espagne", nl: "Barcelona, Spanje"
    },
    rating: 5,
    text: {
      fi: "Karhupirtti oli yksinkertaisesti upein majoitus, jossa olen koskaan ollut. Tunnelma oli aivan ainutlaatuinen, aitoa Lapin henkeä, lämmin ja kodikas hirsimökki keskellä talvista maisemaa. Erityisesti poreallas kruunasi koko kokemuksen, oli uskomattoman rentouttavaa istua lämpimässä vedessä pakkasillassa. Majoitus oli erittäin siisti ja hyvin varusteltu, ja asiakaspalvelu toimi erinomaisesti koko vierailun ajan. Tämä paikka teki Lapin-matkasta unohtumattoman.",
      en: "Karhupirtti was simply the most amazing accommodation I have ever stayed in. The atmosphere was absolutely unique, authentic Lapland spirit, warm and cozy log cabin in the middle of a winter landscape. Especially the hot tub crowned the whole experience, it was incredibly relaxing to sit in warm water in the freezing cold. The accommodation was very clean and well equipped, and customer service worked excellently throughout. This place made our Lapland trip unforgettable.",
      sv: "Karhupirtti var helt enkelt det mest fantastiska boendet jag någonsin bott i. Atmosfären var helt unik, äkta Lapplands-anda, varm och mysig timmerstuga mitt i ett vinterlandskap. Speciellt bubbelpoolen kronade hela upplevelsen, det var otroligt avkopplande att sitta i varmt vatten i kylan. Boendet var mycket rent och välutrustat. Denna plats gjorde vår Lappland-resa oförglömlig.",
      de: "Karhupirtti war einfach die erstaunlichste Unterkunft, in der ich je übernachtet habe. Die Atmosphäre war absolut einzigartig, authentischer Lappland-Geist, warme und gemütliche Blockhütte inmitten einer Winterlandschaft. Besonders der Whirlpool krönte das ganze Erlebnis. Die Unterkunft war sehr sauber und gut ausgestattet. Dieser Ort machte unsere Lappland-Reise unvergesslich.",
      es: "Karhupirtti fue simplemente el alojamiento más increíble en el que he estado. La atmósfera era absolutamente única, auténtico espíritu de Laponia, cabaña de troncos cálida y acogedora en medio de un paisaje invernal. Especialmente el jacuzzi coronó toda la experiencia, fue increíblemente relajante sentarse en agua caliente en el frío. Este lugar hizo nuestro viaje a Laponia inolvidable.",
      fr: "Karhupirtti était tout simplement l'hébergement le plus incroyable où j'ai séjourné. L'atmosphère était absolument unique, esprit authentique de la Laponie, chalet en bois chaleureux et confortable au milieu d'un paysage hivernal. Le jacuzzi a couronné toute l'expérience, c'était incroyablement relaxant de s'asseoir dans l'eau chaude par temps glacial. Cet endroit a rendu notre voyage en Laponie inoubliable.",
      nl: "Karhupirtti was simpelweg de meest geweldige accommodatie waar ik ooit heb verbleven. De sfeer was absoluut uniek, authentieke Laplandse geest, warme en gezellige blokhut midden in een winterlandschap. Vooral de jacuzzi maakte de ervaring compleet. Deze plek maakte onze Lapland-reis onvergetelijk."
    },
    shortText: {
      fi: "Karhupirtti oli yksinkertaisesti upein majoitus, jossa olen koskaan ollut. Tunnelma oli aivan ainutlaatuinen, aitoa Lapin henkeä. Tämä paikka teki Lapin-matkasta unohtumattoman.",
      en: "Karhupirtti was simply the most amazing accommodation I have ever stayed in. The atmosphere was absolutely unique, authentic Lapland spirit. This place made our Lapland trip unforgettable.",
      sv: "Karhupirtti var det mest fantastiska boendet jag någonsin bott i. Atmosfären var helt unik, äkta Lapplands-anda. Denna plats gjorde vår Lappland-resa oförglömlig.",
      de: "Karhupirtti war die erstaunlichste Unterkunft, in der ich je war. Die Atmosphäre war einzigartig, authentischer Lappland-Geist. Dieser Ort machte unsere Reise unvergesslich.",
      es: "Karhupirtti fue el alojamiento más increíble en el que he estado. La atmósfera era única, auténtico espíritu de Laponia. Este lugar hizo nuestro viaje inolvidable.",
      fr: "Karhupirtti était l'hébergement le plus incroyable où j'ai séjourné. L'atmosphère était unique, esprit authentique de la Laponie. Cet endroit a rendu notre voyage inoubliable.",
      nl: "Karhupirtti was de meest geweldige accommodatie waar ik ooit heb verbleven. De sfeer was uniek, authentieke Laplandse geest. Deze plek maakte onze reis onvergetelijk."
    },
  },
];

// Helper to get testimonial text for a specific language
export const getTestimonialText = (testimonial: Testimonial, lang: Language) => ({
  ...testimonial,
  location: testimonial.location[lang],
  text: testimonial.text[lang],
  shortText: testimonial.shortText[lang],
});