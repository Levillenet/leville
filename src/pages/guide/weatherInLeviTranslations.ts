export const weatherInLeviTranslations = {
  de: {
    meta: {
      title: "Wetter in Levi – Temperatur, Schneehöhe & Prognose",
      description: "Aktuelle Wetterdaten für Levi: Temperatur, Schneehöhe und Windbedingungen. Monatliche Durchschnittswerte für Ihre Reiseplanung.",
      canonical: "https://leville.net/de/levi/wetter-in-levi"
    },
    title: "Wetter in Levi",
    subtitle: "Schneehöhe, Temperaturen und Jahreszeiten aus Reisendenperspektive",
    intro: "Das Wetter in Levi ist arktisch, aber vielfältig. Die Winter sind schneereich und die Polarnacht hat ihren eigenen Reiz, während im Sommer die Mitternachtssonne scheint. Dieser Guide hilft Ihnen, Ihre Reise nach den Wetterbedingungen in Levi zu planen.",
    sections: {
      seasons: {
        title: "Wetter nach Jahreszeit in Levi",
        items: [
          { season: "Winter", months: "November–März", temp: "-5 bis -35°C", desc: "Die Polarnacht bringt mystisches blaues Licht im Dezember–Januar. Schneehöhe typischerweise 60–120 cm. Perfekte Zeit zum Skifahren, Nordlicht-Beobachten und für Winterabenteuer.", icon: "snowflake" },
          { season: "Frühling", months: "März–Mai", temp: "-10 bis +10°C", desc: "Die Frühlingssonne bringt helle Tage. Schneebedingungen sind optimal zum Langlaufen. Skifahren geht oft bis zum 1. Mai.", icon: "sun" },
          { season: "Sommer", months: "Juni–August", temp: "+10 bis +25°C", desc: "Die Mitternachtssonne erhellt die Nacht. Wandern, Radfahren und Angeln locken Naturliebhaber.", icon: "sun" },
          { season: "Herbst", months: "September–Oktober", temp: "+5 bis -5°C", desc: "Ruska färbt die Fjells im September. Der erste Schnee kommt meist im Oktober. Eine ruhige Jahreszeit vor dem Winter.", icon: "tree" }
        ]
      },
      snowDepth: {
        title: "Schneehöhe in Levi nach Jahr",
        intro: "Daten des Finnischen Meteorologischen Instituts (FMI) bei Kittilä zeigen typische Schneeverhältnisse.",
        arrivalTitle: "Wann kommt der Schnee?",
        arrivalDesc: "Der erste dauerhafte Schnee kommt in Levi typischerweise Ende Oktober oder Anfang November. Schneekanonen ermöglichen es, Pisten bereits im Oktober zu öffnen, aber natürlicher Schneefall verstärkt sich im November.",
        decemberTitle: "Schneehöhe im Dezember",
        decemberDesc: "Anfang Dezember beträgt die Schneehöhe durchschnittlich 40–60 cm. Zu Weihnachten liegt typischerweise 50–80 cm Schnee, was weiße Weihnachten garantiert.",
        tableTitle: "Typische Schneehöhe nach Monat",
        months: [
          { month: "November", depth: "20–40 cm", note: "Erster Schnee" },
          { month: "Dezember", depth: "40–70 cm", note: "Weiße Weihnachten garantiert" },
          { month: "Januar", depth: "50–80 cm", note: "Dicke Schneedecke" },
          { month: "Februar", depth: "60–90 cm", note: "Maximale Schneehöhe" },
          { month: "März", depth: "70–100 cm", note: "Frühlingssonne, ausgezeichnetes Skifahren" },
          { month: "April", depth: "50–80 cm", note: "Allmähliche Schneeschmelze" }
        ],
        exceptionNote: "Ausnahmen kommen vor: 2020 war der Dezember ungewöhnlich schneearm, aber Schneekanonen sorgten dafür, dass die Pisten offen blieben."
      },
      temperatures: {
        title: "Typische Temperaturen in Levi",
        intro: "Das arktische Klima bringt Abwechslung. Hier sind typische Temperaturen im Jahresverlauf.",
        months: [
          { month: "Januar", temp: "-15 bis -35°C", tip: "Kälteste Tage, warm anziehen" },
          { month: "Februar", temp: "-10 bis -30°C", tip: "Licht kehrt zurück, Frost bleibt" },
          { month: "März", temp: "-5 bis -20°C", tip: "Frühlingssonne wärmt" },
          { month: "April", temp: "-5 bis +5°C", tip: "Tauperiode naht" },
          { month: "Mai", temp: "0 bis +15°C", tip: "Frühling in vollem Gange" },
          { month: "Juni", temp: "+5 bis +20°C", tip: "Mitternachtssonne beginnt" },
          { month: "Juli", temp: "+10 bis +25°C", tip: "Wärmste Tage" },
          { month: "August", temp: "+8 bis +20°C", tip: "Spätsommer kühlt ab" },
          { month: "September", temp: "+2 bis +12°C", tip: "Ruska-Saison" },
          { month: "Oktober", temp: "-5 bis +5°C", tip: "Erster Frost" },
          { month: "November", temp: "-5 bis -15°C", tip: "Winter beginnt" },
          { month: "Dezember", temp: "-10 bis -25°C", tip: "Polarnacht und Schneelandschaft" }
        ],
        tips: [
          "Kleiden Sie sich in Schichten: Basisschicht, Mittelschicht, winddichte Außenschicht",
          "Bei strenger Kälte (-25°C oder kälter) schützen Sie besonders Gesicht und Finger",
          "Wollsocken und gute Winterstiefel sind unerlässlich",
          "Unterschätzen Sie den Windchill nicht – es fühlt sich kälter an als das Thermometer zeigt"
        ]
      },
      travelImpact: {
        title: "Wie das Wetter Ihren Urlaub in Levi beeinflusst",
        categories: [
          { title: "Skifahren", icon: "mountain", items: ["Schneekanonen sichern Pistenöffnung bereits im Oktober", "Beste Skizeit: Dezember–April", "Bei strenger Kälte (-25°C) können einige Lifte schließen"] },
          { title: "Nordlichter", icon: "star", items: ["Beste Zeit: September–März", "Beste Bedingungen: klarer Nachthimmel, kaltes Wetter", "Polarnacht bringt lange Nächte – mehr Chancen"] },
          { title: "Familienurlaub", icon: "calendar", items: ["Wärmste Wintermonate: November und März", "Unter -20°C kann die Draußenzeit für kleine Kinder begrenzt sein", "Skischulen arbeiten bei jedem Wetter"] },
          { title: "Safaris und Outdoor-Aktivitäten", icon: "cloud", items: ["Husky- und Rentiersafaris haben Kältegrenze bei ca. -20°C", "Schneemobilsafaris fahren bei fast allen Bedingungen", "Schneeschuhwandern und Langlauf sind im März am besten"] }
        ]
      }
    },
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Liegt in Levi immer Schnee zu Weihnachten?", a: "Ja, Levi hat fast immer Schnee zu Weihnachten. Die typische Schneehöhe im Dezember beträgt 50–70 cm. In Ausnahmejahren garantieren Schneekanonen Schnee auf den Pisten." },
        { q: "Wie kalt ist es in Levi im Februar?", a: "Februartemperaturen schwanken typischerweise zwischen -10°C und -30°C. Das Tageslicht kehrt jedoch zurück, sodass die Tage heller wirken als im Dezember." },
        { q: "Wann ist die beste Reisezeit für Levi mit Familie?", a: "Für Familien ist der März ausgezeichnet: viel Tageslicht, mildere Temperaturen (-5 bis -15°C) und noch viel Schnee." },
        { q: "Beeinflusst das Wetter die Nordlicht-Beobachtung?", a: "Ja. Nordlichter erfordern klaren Himmel. Die besten Chancen sind in kalten Nächten mit wolkenlosem Himmel. Prüfen Sie Wettervorhersage und Nordlichtprognose." }
      ]
    },
    cta: {
      hub: "Zurück zum Levi-Reiseführer",
      hubLink: "/de/levi",
      accommodation: "Unterkunft in Levi buchen",
      accommodationLink: "/de/unterkuenfte"
    },
    breadcrumbLabel: "Wetter in Levi",
    readNext: {
      title: "Lesen Sie auch",
      links: [
        { title: "Winter in Levi", desc: "Polarnacht, Schnee und Aktivitäten", href: "/guide/winter-in-levi" },
        { title: "Levi Schneebericht", desc: "Schneehöhe und Bedingungen", href: "/en/snowreport" },
        { title: "Skifahren in Levi", desc: "Pistenbedingungen und Tipps", href: "/de/ratgeber/skifahren-in-levi" },
        { title: "Winterkleidung", desc: "Richtig anziehen für das Wetter", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Nordlichter", desc: "Wann sieht man Nordlichter", href: "/en/northern-lights" },
      ],
    },
  },
  sv: {
    meta: {
      title: "Väder i Levi – temperatur, snödjup & prognos",
      description: "Aktuella väderdata för Levi: temperatur, snödjup och vindförhållanden. Månatliga genomsnitt för reseplanering.",
      canonical: "https://leville.net/sv/levi/vader-i-levi"
    },
    title: "Väder i Levi",
    subtitle: "Snödjup, temperaturer och årstider ur resenärens perspektiv",
    intro: "Vädret i Levi är arktiskt men varierat. Vintrarna är snörika och polarnattens blåa ljus har sin egen charm, medan sommaren bjuder på midnattssol. Den här guiden hjälper dig planera din resa efter väderförhållandena i Levi.",
    sections: {
      seasons: {
        title: "Väder per årstid i Levi",
        items: [
          { season: "Vinter", months: "November–mars", temp: "-5 till -35°C", desc: "Polarnattens mystiska blåa ljus i december–januari. Snödjup normalt 60–120 cm. Perfekt tid för skidåkning, norrsken och vinteräventyr.", icon: "snowflake" },
          { season: "Vår", months: "Mars–maj", temp: "-10 till +10°C", desc: "Vårsolen ger ljusa dagar. Snöförhållandena är optimala för längdskidåkning. Utförsåkning fortsätter ofta till 1 maj.", icon: "sun" },
          { season: "Sommar", months: "Juni–augusti", temp: "+10 till +25°C", desc: "Midnattssolen lyser genom natten. Vandring, cykling och fiske lockar naturälskare.", icon: "sun" },
          { season: "Höst", months: "September–oktober", temp: "+5 till -5°C", desc: "Ruska färgar fjällen i september. Första snön kommer vanligtvis i oktober. En lugn årstid före vintern.", icon: "tree" }
        ]
      },
      snowDepth: {
        title: "Snödjup i Levi per år",
        intro: "Data från Finlands meteorologiska institut (FMI) vid Kittilä visar typiska snöförhållanden.",
        arrivalTitle: "När kommer snön?",
        arrivalDesc: "Den första permanenta snön kommer till Levi vanligtvis i slutet av oktober eller början av november. Snökanoner gör det möjligt att öppna backar redan i oktober, men naturligt snöfall förstärks i november.",
        decemberTitle: "Snödjup i december",
        decemberDesc: "I början av december är snödjupet i genomsnitt 40–60 cm. Vid jul ligger det normalt 50–80 cm snö, vilket garanterar en vit jul.",
        tableTitle: "Typiskt snödjup per månad",
        months: [
          { month: "November", depth: "20–40 cm", note: "Första snön" },
          { month: "December", depth: "40–70 cm", note: "Vit jul garanterad" },
          { month: "Januari", depth: "50–80 cm", note: "Tjockt snötäcke" },
          { month: "Februari", depth: "60–90 cm", note: "Maximalt snödjup" },
          { month: "Mars", depth: "70–100 cm", note: "Vårsol, utmärkt skidåkning" },
          { month: "April", depth: "50–80 cm", note: "Gradvis avsmältning" }
        ],
        exceptionNote: "Undantag förekommer: 2020 var december ovanligt snöfattig, men snökanoner säkerställde att backarna förblev öppna."
      },
      temperatures: {
        title: "Typiska temperaturer i Levi",
        intro: "Det arktiska klimatet ger variation. Här är typiska temperaturer under året.",
        months: [
          { month: "Januari", temp: "-15 till -35°C", tip: "Kallaste dagarna, klä dig varmt" },
          { month: "Februari", temp: "-10 till -30°C", tip: "Ljuset återvänder, frosten fortsätter" },
          { month: "Mars", temp: "-5 till -20°C", tip: "Vårsolen värmer" },
          { month: "April", temp: "-5 till +5°C", tip: "Smältperioden närmar sig" },
          { month: "Maj", temp: "0 till +15°C", tip: "Våren i full gång" },
          { month: "Juni", temp: "+5 till +20°C", tip: "Midnattssolen börjar" },
          { month: "Juli", temp: "+10 till +25°C", tip: "Varmaste dagarna" },
          { month: "Augusti", temp: "+8 till +20°C", tip: "Sensommaren svalnar" },
          { month: "September", temp: "+2 till +12°C", tip: "Ruska-säsong" },
          { month: "Oktober", temp: "-5 till +5°C", tip: "Första frosten" },
          { month: "November", temp: "-5 till -15°C", tip: "Vintern börjar" },
          { month: "December", temp: "-10 till -25°C", tip: "Polarnatt och snölandskap" }
        ],
        tips: [
          "Klä dig i lager: baslager, mellanlager, vindtätt yttre lager",
          "Vid sträng kyla (-25°C eller kallare) skydda särskilt ansikte och fingrar",
          "Ullstrumpor och ordentliga vinterkängor är nödvändiga",
          "Underskatta inte vindkylan – det känns kallare än termometern visar"
        ]
      },
      travelImpact: {
        title: "Hur vädret påverkar din semester i Levi",
        categories: [
          { title: "Skidåkning", icon: "mountain", items: ["Snökanoner säkerställer att backar öppnar redan i oktober", "Bästa skidtiden: december–april", "Vid sträng kyla (-25°C) kan vissa liftar stänga"] },
          { title: "Norrsken", icon: "star", items: ["Bästa tiden: september–mars", "Bästa förhållanden: klar natthimmel, kallt väder", "Polarnatt ger långa nätter – fler chanser"] },
          { title: "Familjesemester", icon: "calendar", items: ["Varmaste vintermånaderna: november och mars", "Under -20°C kan utomhustid för små barn begränsas", "Skidskolor körs oavsett väder"] },
          { title: "Safaris och utomhusaktiviteter", icon: "cloud", items: ["Husky- och rensafaris har köldgräns ca -20°C", "Snöskotrsafaris körs i nästan alla förhållanden", "Snöskovandring och längdskidåkning är bäst i mars"] }
        ]
      }
    },
    faq: {
      title: "Vanliga frågor",
      items: [
        { q: "Finns det alltid snö i Levi på julen?", a: "Ja, Levi har nästan alltid snö vid jul. Typiskt snödjup i december är 50–70 cm. Under exceptionella år garanterar snökanoner snö på backarna." },
        { q: "Hur kallt är det i Levi i februari?", a: "Februaritemperaturerna varierar vanligtvis mellan -10°C och -30°C. Dagsljuset återvänder dock, vilket gör dagarna ljusare än i december." },
        { q: "När är bästa tiden att besöka Levi med familjen?", a: "För familjer är mars utmärkt: gott om dagsljus, mildare temperaturer (-5 till -15°C) och fortfarande mycket snö." },
        { q: "Påverkar vädret norrskensobservation?", a: "Ja. Norrsken kräver klar himmel. Bästa chanserna är under kalla nätter med molnfri himmel. Kolla väderprognosen och norrskensprognosen." }
      ]
    },
    cta: {
      hub: "Tillbaka till Levi-guiden",
      hubLink: "/sv/levi",
      accommodation: "Boka boende i Levi",
      accommodationLink: "/sv/boende"
    },
    breadcrumbLabel: "Väder i Levi",
    readNext: {
      title: "Läs också",
      links: [
        { title: "Vinter i Levi", desc: "Polarnatt, snö och aktiviteter", href: "/guide/winter-in-levi" },
        { title: "Levis snörapport", desc: "Snödjup och förhållanden", href: "/en/snowreport" },
        { title: "Skidåkning i Levi", desc: "Pistförhållanden och tips", href: "/sv/guide/skidakning-i-levi" },
        { title: "Vinterkläder", desc: "Klä dig rätt för vädret", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Norrsken", desc: "När ser man norrsken", href: "/en/northern-lights" },
      ],
    },
  },
  fr: {
    meta: {
      title: "Météo à Levi – température, enneigement & prévisions",
      description: "Données météo en direct pour Levi : température, enneigement et conditions de vent. Moyennes mensuelles pour planifier votre voyage.",
      canonical: "https://leville.net/fr/levi/meteo-a-levi"
    },
    title: "Météo à Levi",
    subtitle: "Enneigement, températures et saisons du point de vue du voyageur",
    intro: "Le climat de Levi est arctique mais varié. Les hivers sont enneigés et la nuit polaire a son propre charme, tandis que l'été apporte le soleil de minuit. Ce guide vous aide à planifier votre voyage selon les conditions météorologiques de Levi.",
    sections: {
      seasons: {
        title: "Météo par saison à Levi",
        items: [
          { season: "Hiver", months: "Novembre–mars", temp: "-5 à -35°C", desc: "La nuit polaire apporte une lumière bleue mystique en décembre–janvier. Enneigement typiquement 60–120 cm. Moment idéal pour le ski, les aurores boréales et les aventures hivernales.", icon: "snowflake" },
          { season: "Printemps", months: "Mars–mai", temp: "-10 à +10°C", desc: "Le soleil printanier apporte des journées lumineuses. Les conditions de neige sont optimales pour le ski de fond. Le ski alpin continue souvent jusqu'au 1er mai.", icon: "sun" },
          { season: "Été", months: "Juin–août", temp: "+10 à +25°C", desc: "Le soleil de minuit éclaire la nuit. Randonnée, vélo et pêche attirent les amoureux de la nature.", icon: "sun" },
          { season: "Automne", months: "Septembre–octobre", temp: "+5 à -5°C", desc: "Le ruska colore les fjells en septembre. La première neige arrive généralement en octobre. Une saison paisible avant l'hiver.", icon: "tree" }
        ]
      },
      snowDepth: {
        title: "Enneigement à Levi par année",
        intro: "Données de l'Institut météorologique finlandais (FMI) à Kittilä montrant les conditions d'enneigement typiques.",
        arrivalTitle: "Quand arrive la neige ?",
        arrivalDesc: "La première neige permanente arrive à Levi typiquement fin octobre ou début novembre. Les canons à neige permettent d'ouvrir les pistes dès octobre, mais les chutes de neige naturelles se renforcent en novembre.",
        decemberTitle: "Enneigement en décembre",
        decemberDesc: "Début décembre, l'enneigement moyen est de 40–60 cm. À Noël, il y a typiquement 50–80 cm de neige, garantissant un Noël blanc.",
        tableTitle: "Enneigement typique par mois",
        months: [
          { month: "Novembre", depth: "20–40 cm", note: "Première neige" },
          { month: "Décembre", depth: "40–70 cm", note: "Noël blanc garanti" },
          { month: "Janvier", depth: "50–80 cm", note: "Épaisse couche de neige" },
          { month: "Février", depth: "60–90 cm", note: "Enneigement maximum" },
          { month: "Mars", depth: "70–100 cm", note: "Soleil printanier, excellent ski" },
          { month: "Avril", depth: "50–80 cm", note: "Fonte progressive" }
        ],
        exceptionNote: "Des exceptions surviennent : en 2020, décembre a connu un enneigement exceptionnellement faible, mais les canons à neige ont assuré l'ouverture des pistes."
      },
      temperatures: {
        title: "Températures typiques à Levi",
        intro: "Le climat arctique apporte de la variété. Voici les températures typiques tout au long de l'année.",
        months: [
          { month: "Janvier", temp: "-15 à -35°C", tip: "Jours les plus froids, habillez-vous chaudement" },
          { month: "Février", temp: "-10 à -30°C", tip: "La lumière revient, le gel continue" },
          { month: "Mars", temp: "-5 à -20°C", tip: "Le soleil printanier réchauffe" },
          { month: "Avril", temp: "-5 à +5°C", tip: "La période de dégel approche" },
          { month: "Mai", temp: "0 à +15°C", tip: "Printemps en plein essor" },
          { month: "Juin", temp: "+5 à +20°C", tip: "Le soleil de minuit commence" },
          { month: "Juillet", temp: "+10 à +25°C", tip: "Jours les plus chauds" },
          { month: "Août", temp: "+8 à +20°C", tip: "Fin d'été fraîche" },
          { month: "Septembre", temp: "+2 à +12°C", tip: "Saison du ruska" },
          { month: "Octobre", temp: "-5 à +5°C", tip: "Premières gelées" },
          { month: "Novembre", temp: "-5 à -15°C", tip: "L'hiver commence" },
          { month: "Décembre", temp: "-10 à -25°C", tip: "Nuit polaire et paysage enneigé" }
        ],
        tips: [
          "Habillez-vous en couches : sous-couche, couche intermédiaire, couche extérieure coupe-vent",
          "Par grand froid (-25°C ou moins) protégez surtout le visage et les doigts",
          "Les chaussettes en laine et de bonnes bottes d'hiver sont indispensables",
          "Ne sous-estimez pas le facteur vent – il fait plus froid que ce que le thermomètre indique"
        ]
      },
      travelImpact: {
        title: "Comment la météo affecte vos vacances à Levi",
        categories: [
          { title: "Ski", icon: "mountain", items: ["Les canons à neige assurent l'ouverture des pistes dès octobre", "Meilleure période : décembre–avril", "Par grand froid (-25°C) certaines remontées peuvent fermer"] },
          { title: "Aurores boréales", icon: "star", items: ["Meilleure période : septembre–mars", "Meilleures conditions : ciel nocturne dégagé, temps froid", "La nuit polaire apporte de longues nuits – plus de chances"] },
          { title: "Vacances en famille", icon: "calendar", items: ["Mois d'hiver les plus doux : novembre et mars", "En dessous de -20°C le temps en extérieur pour les jeunes enfants peut être limité", "Les écoles de ski fonctionnent quel que soit le temps"] },
          { title: "Safaris et activités de plein air", icon: "cloud", items: ["Les safaris en traîneau et renne ont une limite de froid d'env. -20°C", "Les safaris en motoneige fonctionnent dans presque toutes les conditions", "Raquettes et ski de fond sont au mieux en mars"] }
        ]
      }
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Y a-t-il toujours de la neige à Levi à Noël ?", a: "Oui, Levi a presque toujours de la neige à Noël. L'enneigement typique en décembre est de 50–70 cm. Les années exceptionnelles, les canons à neige garantissent la neige sur les pistes." },
        { q: "Quel froid fait-il à Levi en février ?", a: "Les températures de février varient typiquement de -10°C à -30°C. Cependant, la lumière du jour revient, rendant les journées plus lumineuses qu'en décembre." },
        { q: "Quand est le meilleur moment pour visiter Levi en famille ?", a: "Pour les familles, mars est excellent : beaucoup de lumière, températures plus douces (-5 à -15°C) et encore beaucoup de neige." },
        { q: "La météo affecte-t-elle l'observation des aurores ?", a: "Oui. Les aurores boréales nécessitent un ciel dégagé. Les meilleures chances sont par nuits froides avec un ciel sans nuages. Consultez les prévisions météo et d'aurores." }
      ]
    },
    cta: {
      hub: "Retour au guide de Levi",
      hubLink: "/fr/levi",
      accommodation: "Réserver un hébergement à Levi",
      accommodationLink: "/fr/hebergements"
    },
    breadcrumbLabel: "Météo à Levi",
    readNext: {
      title: "À lire aussi",
      links: [
        { title: "Hiver à Levi", desc: "Nuit polaire, neige et activités", href: "/guide/winter-in-levi" },
        { title: "Bulletin neige Levi", desc: "Enneigement et conditions", href: "/en/snowreport" },
        { title: "Ski à Levi", desc: "Conditions et conseils", href: "/fr/guide/ski-a-levi" },
        { title: "Vêtements d'hiver", desc: "S'habiller pour le froid", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Aurores boréales", desc: "Quand voir les aurores", href: "/en/northern-lights" },
      ],
    },
  },
  es: {
    meta: {
      title: "Clima en Levi – temperatura, nieve y pronóstico",
      description: "Datos meteorológicos en vivo de Levi: temperatura, espesor de nieve y condiciones de viento. Promedios mensuales para planificar tu viaje.",
      canonical: "https://leville.net/es/levi/clima-en-levi"
    },
    title: "Clima en Levi",
    subtitle: "Nieve, temperaturas y estaciones desde la perspectiva del viajero",
    intro: "El clima de Levi es ártico pero diverso. Los inviernos son nevados y la noche polar tiene su propio encanto, mientras que el verano trae el sol de medianoche. Esta guía te ayuda a planificar tu viaje según las condiciones meteorológicas de Levi.",
    sections: {
      seasons: {
        title: "Clima por estación en Levi",
        items: [
          { season: "Invierno", months: "Noviembre–marzo", temp: "-5 a -35°C", desc: "La noche polar trae una luz azul mística en diciembre–enero. Espesor de nieve típico 60–120 cm. Momento perfecto para esquiar, ver auroras boreales y aventuras invernales.", icon: "snowflake" },
          { season: "Primavera", months: "Marzo–mayo", temp: "-10 a +10°C", desc: "El sol primaveral trae días luminosos. Las condiciones de nieve son óptimas para el esquí de fondo. El esquí alpino suele continuar hasta el 1 de mayo.", icon: "sun" },
          { season: "Verano", months: "Junio–agosto", temp: "+10 a +25°C", desc: "El sol de medianoche ilumina la noche. Senderismo, ciclismo y pesca atraen a los amantes de la naturaleza.", icon: "sun" },
          { season: "Otoño", months: "Septiembre–octubre", temp: "+5 a -5°C", desc: "El ruska colorea los fjells en septiembre. La primera nieve suele llegar en octubre. Una estación tranquila antes del invierno.", icon: "tree" }
        ]
      },
      snowDepth: {
        title: "Espesor de nieve en Levi por año",
        intro: "Datos del Instituto Meteorológico de Finlandia (FMI) en Kittilä muestran condiciones típicas de nieve.",
        arrivalTitle: "¿Cuándo llega la nieve?",
        arrivalDesc: "La primera nieve permanente llega a Levi típicamente a finales de octubre o principios de noviembre. Los cañones de nieve permiten abrir pistas desde octubre, pero las nevadas naturales se intensifican en noviembre.",
        decemberTitle: "Espesor de nieve en diciembre",
        decemberDesc: "A principios de diciembre, el espesor medio es de 40–60 cm. En Navidad, hay típicamente 50–80 cm de nieve, garantizando unas navidades blancas.",
        tableTitle: "Espesor de nieve típico por mes",
        months: [
          { month: "Noviembre", depth: "20–40 cm", note: "Primera nieve" },
          { month: "Diciembre", depth: "40–70 cm", note: "Navidades blancas garantizadas" },
          { month: "Enero", depth: "50–80 cm", note: "Gruesa capa de nieve" },
          { month: "Febrero", depth: "60–90 cm", note: "Máximo espesor de nieve" },
          { month: "Marzo", depth: "70–100 cm", note: "Sol primaveral, excelente esquí" },
          { month: "Abril", depth: "50–80 cm", note: "Deshielo gradual" }
        ],
        exceptionNote: "Hay excepciones: en 2020, diciembre tuvo una nieve natural inusualmente baja, pero los cañones de nieve aseguraron que las pistas permanecieran abiertas."
      },
      temperatures: {
        title: "Temperaturas típicas en Levi",
        intro: "El clima ártico trae variación. Aquí están las temperaturas típicas a lo largo del año.",
        months: [
          { month: "Enero", temp: "-15 a -35°C", tip: "Días más fríos, abrígate bien" },
          { month: "Febrero", temp: "-10 a -30°C", tip: "La luz regresa, las heladas continúan" },
          { month: "Marzo", temp: "-5 a -20°C", tip: "El sol primaveral calienta" },
          { month: "Abril", temp: "-5 a +5°C", tip: "Se acerca el deshielo" },
          { month: "Mayo", temp: "0 a +15°C", tip: "Primavera en pleno apogeo" },
          { month: "Junio", temp: "+5 a +20°C", tip: "Comienza el sol de medianoche" },
          { month: "Julio", temp: "+10 a +25°C", tip: "Días más cálidos" },
          { month: "Agosto", temp: "+8 a +20°C", tip: "Final de verano fresco" },
          { month: "Septiembre", temp: "+2 a +12°C", tip: "Temporada de ruska" },
          { month: "Octubre", temp: "-5 a +5°C", tip: "Primeras heladas" },
          { month: "Noviembre", temp: "-5 a -15°C", tip: "Comienza el invierno" },
          { month: "Diciembre", temp: "-10 a -25°C", tip: "Noche polar y paisaje nevado" }
        ],
        tips: [
          "Vístete en capas: capa base, capa intermedia, capa exterior cortavientos",
          "Con frío intenso (-25°C o menos) protege especialmente cara y dedos",
          "Calcetines de lana y buenas botas de invierno son imprescindibles",
          "No subestimes la sensación térmica del viento – hace más frío de lo que marca el termómetro"
        ]
      },
      travelImpact: {
        title: "Cómo afecta el clima a tus vacaciones en Levi",
        categories: [
          { title: "Esquí", icon: "mountain", items: ["Los cañones de nieve aseguran apertura de pistas desde octubre", "Mejor época: diciembre–abril", "Con frío intenso (-25°C) algunos remontes pueden cerrar"] },
          { title: "Auroras boreales", icon: "star", items: ["Mejor época: septiembre–marzo", "Mejores condiciones: cielo nocturno despejado, frío", "La noche polar trae noches largas – más oportunidades"] },
          { title: "Viaje familiar", icon: "calendar", items: ["Meses invernales más templados: noviembre y marzo", "Bajo -20°C el tiempo exterior para niños pequeños puede limitarse", "Las escuelas de esquí funcionan independientemente del clima"] },
          { title: "Safaris y actividades al aire libre", icon: "cloud", items: ["Safaris de huskies y renos tienen límite de frío de aprox. -20°C", "Los safaris en moto de nieve funcionan en casi todas las condiciones", "Raquetas de nieve y esquí de fondo son mejores en marzo"] }
        ]
      }
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Siempre hay nieve en Levi en Navidad?", a: "Sí, Levi casi siempre tiene nieve en Navidad. El espesor típico en diciembre es de 50–70 cm. En años excepcionales, los cañones de nieve garantizan nieve en las pistas." },
        { q: "¿Cuánto frío hace en Levi en febrero?", a: "Las temperaturas de febrero varían típicamente de -10°C a -30°C. Sin embargo, la luz del día regresa, haciendo que los días se sientan más luminosos que en diciembre." },
        { q: "¿Cuándo es el mejor momento para visitar Levi con la familia?", a: "Para familias, marzo es excelente: mucha luz, temperaturas más suaves (-5 a -15°C) y todavía mucha nieve." },
        { q: "¿El clima afecta la observación de auroras?", a: "Sí. Las auroras boreales requieren cielos despejados. Las mejores oportunidades son en noches frías con cielo sin nubes. Consulta el pronóstico meteorológico y el de auroras." }
      ]
    },
    cta: {
      hub: "Volver a la guía de Levi",
      hubLink: "/es/levi",
      accommodation: "Reservar alojamiento en Levi",
      accommodationLink: "/es/alojamientos"
    },
    breadcrumbLabel: "Clima en Levi",
    readNext: {
      title: "Lee también",
      links: [
        { title: "Invierno en Levi", desc: "Noche polar, nieve y actividades", href: "/guide/winter-in-levi" },
        { title: "Parte de nieve Levi", desc: "Espesor de nieve y condiciones", href: "/en/snowreport" },
        { title: "Esquí en Levi", desc: "Condiciones y consejos", href: "/es/guia/esqui-en-levi" },
        { title: "Ropa de invierno", desc: "Vístete bien para el frío", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Auroras boreales", desc: "Cuándo ver auroras", href: "/en/northern-lights" },
      ],
    },
  }
};
