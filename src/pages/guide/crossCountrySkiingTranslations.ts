const year = new Date().getFullYear();

export const crossCountrySkiingTranslations = {
  fi: {
    meta: {
      title: `Hiihtoladut Levillä ${year} — 230 km latuja ja kartta`,
      description: "Levin ladut: 230 km huollettuja hiihtolatuja helposta vaativaan. Latukartta, helpot ladut aloittelijoille ja Levin kierros kokeneille hiihtäjille.",
      canonical: "https://leville.net/opas/hiihtoladut-levi"
    },
    title: "Hiihto Levillä",
    subtitle: "230 km huollettuja latuja Lapin tunturimaisemissa",
    intro: "Levin latuverkosto on yksi Suomen laajimmista ja kauneimmista. 230 kilometriä huollettuja latuja vie sinut läpi lumisten metsien ja avoimien tunturimaisemien. Ladut sopivat sekä perinteiseen hiihtoon että luistelutyyliin, ja valaistuja latuja on hiihtäjille myös pimeään aikaan.",
    sections: {
      network: {
        title: "Latuverkosto",
        stats: [
          { label: "Latuja yhteensä", value: "230 km", icon: "route" },
          { label: "Valaistuja latuja", value: "28 km", icon: "moon" },
          { label: "Tunturilatuja", value: "Useita", icon: "mountain" },
          { label: "Lumetuslatu", value: "Aina auki", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Suosituimmat ladut",
        items: [
          { name: "Immeljärven lenkit", length: "5–15 km", desc: "Helpot ladut aloittelijoille, kauniit järvinäkymät" },
          { name: "Tunturilatu", length: "10–25 km", desc: "Vaihtelevia nousuja ja laskuja, upeat maisemat" },
          { name: "Kätkäntunturin latu", length: "20 km", desc: "Haastava reitti kokeneille hiihtäjille" },
          { name: "Valaistu keskustalatu", length: "7 km", desc: "Täydellinen iltahiihtoon pimeinä kuukausina" }
        ]
      },
      tips: {
        title: "Hiihtovinkit",
        items: [
          "Tarkista latujen kunto Levi Ski Resortin sivuilta ennen lähtöä",
          "Varaa tarpeeksi aikaa – tunturiladuilla aika kuluu nopeasti",
          "Ota mukaan lämmin juoma ja pieni evästä pidemmille reiteille",
          "Vuokraa välineet Leviltä jos et omista – laaja valikoima",
          "Kokeile molempia tyylejä: perinteinen ja luistelu"
        ]
      },
      services: {
        title: "Latupalvelut",
        content: "Levin ladut huolletaan päivittäin. Latukarttoja saa turistineuvonnasta ja latukahviloista. Hiihtokoulussa on opetusta kaikentasoisille. Välinevuokraamoista saat sekki- ja luisteluhiihtosukset."
      },
      conditions: {
        title: "Latukausi ja olosuhteet",
        content: "Latukausi alkaa tyypillisesti lokakuun alkupäivinä ensilumen ladulla, jonne latu tehdään säilölumella. Täysi latuverkosto avautuu riittävien lumisateiden jälkeen, yleensä marraskuussa. Kausi jatkuu vapun yli — tunturiladuilla lunta on usein toukokuuhun asti."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Milloin Levin ladut aukeavat?", a: "Latukausi alkaa tyypillisesti lokakuun alussa ensilumen ladulla. Täysi latuverkosto avautuu riittävien lumisateiden jälkeen, tyypillisesti marraskuussa." },
        { q: "Onko Levillä hiihdon opetusta?", a: "Kyllä, Levin hiihtokoulut tarjoavat opetusta kaikentasoisille hiihtäjille, sekä perinteiseen että luisteluhiihtoon." },
        { q: "Voinko hiihtää illalla?", a: "Kyllä, Levillä on 28 km valaistuja latuja, jotka ovat auki myös pimeään aikaan." },
        { q: "Tarvitseeko latumaksun?", a: "Levin ladut ovat maksuttomia. Välineet voi vuokrata paikan päältä." }
      ]
    },
    cta: { hub: "Takaisin Levi-oppaaseen", hubLink: "/levi", accommodation: "Varaa majoitus Leviltä", accommodationLink: "/majoitukset" },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Talvi Levillä", desc: "Kaamos, lumi ja aktiviteetit", href: "/opas/talvi-levi" },
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja 28 hissiä", href: "/opas/laskettelu-levi" },
        { title: "Levin lumitilanne", desc: "Lumensyvyys ja latujen kunto nyt", href: "/lumitilanne" },
        { title: "Sää ja lumitilanne", desc: "Lämpötilat ja olosuhteet", href: "/levi/saatieto-levilta" },
        { title: "Kevät Levillä", desc: "Parhaat hiihtokelit kevätauringossa", href: "/opas/kevat-levi" },
        { title: "Levi vs Ylläs vs Ruka", desc: "Latuverkostojen ja keskusten vertailu", href: "/opas/levi-vs-yllas-vs-ruka" }
      ]
    },
    breadcrumbLabel: "Hiihto Levillä"
  },
  en: {
    meta: {
      title: `Cross-Country Skiing in Levi ${year} — 230 km Trails`,
      description: "Levi cross-country skiing guide: 230 km of groomed trails through Lapland fells. Trail maps, easy routes for beginners and tips for your ski holiday.",
      canonical: "https://leville.net/guide/cross-country-skiing-in-levi"
    },
    title: "Cross-Country Skiing in Levi",
    subtitle: "230 km of groomed trails in Lapland's fell landscapes",
    intro: "Levi's trail network is one of the most extensive and beautiful in Finland. 230 kilometers of groomed trails take you through snowy forests and open fell landscapes. Trails are suitable for both classic and skating styles, and illuminated trails are available for skiing in the dark season.",
    sections: {
      network: {
        title: "Trail Network",
        stats: [
          { label: "Total trails", value: "230 km", icon: "route" },
          { label: "Illuminated trails", value: "28 km", icon: "moon" },
          { label: "Fell trails", value: "Multiple", icon: "mountain" },
          { label: "Snow-making trail", value: "Always open", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Most Popular Trails",
        items: [
          { name: "Immeljärvi loops", length: "5–15 km", desc: "Easy trails for beginners, beautiful lake views" },
          { name: "Fell trail", length: "10–25 km", desc: "Varied climbs and descents, stunning scenery" },
          { name: "Kätkätunturi trail", length: "20 km", desc: "Challenging route for experienced skiers" },
          { name: "Illuminated center trail", length: "7 km", desc: "Perfect for evening skiing in dark months" }
        ]
      },
      tips: {
        title: "Skiing Tips",
        items: [
          "Check trail conditions on Levi Ski Resort's website before heading out",
          "Allow plenty of time – hours fly by on fell trails",
          "Bring a warm drink and snacks for longer routes",
          "Rent equipment in Levi if you don't own any – wide selection",
          "Try both styles: classic and skating"
        ]
      },
      services: {
        title: "Trail Services",
        content: "Levi's trails are groomed daily. Trail maps are available at the tourist information and trail cafés. Ski schools offer lessons for all skill levels. Rental shops have both classic and skating skis."
      },
      conditions: {
        title: "Season and Conditions",
        content: "The trail season typically starts in early October on the first-snow trail, which is made using stored snow. The full trail network opens after sufficient snowfall, usually in November. The season continues past May Day — fell trails often have snow until May."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "When do Levi's trails open?", a: "The trail season typically starts in early October on the first snow track. The full trail network opens after sufficient snowfall, usually in November." },
        { q: "Is there ski instruction in Levi?", a: "Yes, Levi's ski schools offer lessons for all skill levels, in both classic and skating techniques." },
        { q: "Can I ski in the evening?", a: "Yes, Levi has 28 km of illuminated trails that are open during dark hours." },
        { q: "Is there a trail fee?", a: "Levi's trails are free of charge. Equipment can be rented on site." }
      ]
    },
    cta: { hub: "Back to Levi Travel Guide", hubLink: "/en/levi", accommodation: "Book accommodation in Levi", accommodationLink: "/en/accommodations" },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Winter in Levi", desc: "Polar night, snow and winter activities", href: "/guide/winter-in-levi" },
        { title: "Skiing in Levi", desc: "43 slopes and 28 lifts", href: "/guide/skiing-in-levi" },
        { title: "Levi Snow Report", desc: "Snow depth and conditions now", href: "/en/snowreport" },
        { title: "Weather in Levi", desc: "Temperatures and snow conditions", href: "/en/levi/weather-in-levi" },
        { title: "Spring in Levi", desc: "Best skiing in spring sunshine", href: "/guide/spring-in-levi" },
        { title: "Levi vs Ylläs vs Ruka", desc: "Trail networks and resorts compared", href: "/guide/levi-vs-yllas-vs-ruka-comparison" }
      ]
    },
    breadcrumbLabel: "Cross-Country Skiing in Levi"
  },
  nl: {
    meta: {
      title: "Langlaufen in Levi – 230 km loipes in Fins Lapland | Leville.net",
      description: "Ontdek 230+ km geprepareerde langlaufloipes in Levi. Routes voor beginners en gevorderden, verhuur, lessen en de beste seizoenen voor langlaufen.",
      canonical: "https://leville.net/nl/gids/langlaufen-in-levi"
    },
    title: "Langlaufen in Levi",
    subtitle: "230 km geprepareerde loipes in het fjelllandschap van Lapland",
    intro: "Langlaufen is enorm populair onder Nederlandse bezoekers die meer willen dan alleen alpineskiën. Het loipenetwerk van Levi is een van de meest uitgebreide en mooiste in Finland. 230 kilometer aan geprepareerde loipes voeren je door besneeuwde bossen en open fjelllandschappen. De loipes zijn geschikt voor zowel klassiek als skating, en verlichte loipes zijn beschikbaar voor langlaufen in het donkere seizoen.",
    sections: {
      network: {
        title: "Loipenetwerk",
        stats: [
          { label: "Totaal loipes", value: "230 km", icon: "route" },
          { label: "Verlichte loipes", value: "28 km", icon: "moon" },
          { label: "Fjellloipes", value: "Meerdere", icon: "mountain" },
          { label: "Kunstsneeuwloipe", value: "Altijd open", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Populairste loipes",
        items: [
          { name: "Immeljärvi-rondjes", length: "5–15 km", desc: "Makkelijke loipes voor beginners, prachtig uitzicht op het meer" },
          { name: "Fjellloipe", length: "10–25 km", desc: "Afwisselende klimmen en dalen, schitterend landschap" },
          { name: "Kätkätunturi-loipe", length: "20 km", desc: "Uitdagende route voor ervaren langlaufers" },
          { name: "Verlichte centrumloipe", length: "7 km", desc: "Perfect voor avondlanglaufen in de donkere maanden" }
        ]
      },
      tips: {
        title: "Langlauftips",
        items: [
          "Controleer de loipecondities op de website van Levi Ski Resort voor vertrek",
          "Neem genoeg tijd – de uren vliegen voorbij op de fjellloipes",
          "Neem een warme drank en snacks mee voor langere routes",
          "Huur uitrusting bij verhuurwinkels in Levi (~€25-35/dag) als je geen eigen ski's hebt",
          "Probeer beide stijlen: klassiek en skating",
          "Gratis loipekaart beschikbaar bij Tourist Information of online op levi.fi"
        ]
      },
      services: {
        title: "Loipeservice",
        content: "De loipes van Levi worden dagelijks geprepareerd. Loipekaarten zijn verkrijgbaar bij de toeristinformatie en bij loipecafés. De Levi Ski School biedt langlauflessen voor alle niveaus. Bij verhuurwinkels in de buurt van de pistes kun je zowel klassieke als skating-ski's huren."
      },
      conditions: {
        title: "Seizoen en omstandigheden",
        content: "Het loipeseizoen begint meestal begin oktober op de eerste-sneeuwloipe, die wordt gemaakt met opgeslagen sneeuw. Het volledige loipenetwerk opent na voldoende sneeuwval, meestal in november. Het seizoen loopt door tot na 1 mei — op de fjellloipes ligt vaak sneeuw tot mei."
      }
    },
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Wanneer gaan de loipes in Levi open?", a: "Het loipeseizoen begint meestal begin oktober op het eerste sneeuwspoor. Het volledige loipenetwerk opent na voldoende sneeuwval, meestal in november." },
        { q: "Zijn er langlauflessen in Levi?", a: "Ja, de skischolen van Levi bieden lessen voor alle niveaus, zowel klassiek als skating." },
        { q: "Kan ik 's avonds langlaufen?", a: "Ja, Levi heeft 28 km verlichte loipes die ook in het donker open zijn." },
        { q: "Moet ik betalen voor de loipes?", a: "Nee, de loipes van Levi zijn gratis. Uitrusting kun je ter plaatse huren." }
      ]
    },
    cta: { hub: "Terug naar Levi-gids", hubLink: "/nl/levi", accommodation: "Boek accommodatie in Levi", accommodationLink: "/nl/accommodaties" },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Skiën in Levi", desc: "43 pistes en 28 liften", href: "/nl/gids/skieen-in-levi" },
        { title: "Winterkleding", desc: "Kledingstips voor Levi", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "Seizoenen in Levi", desc: "Wanneer is het beste seizoen?", href: "/nl/gids/seizoenen-in-levi" },
        { title: "Accommodaties", desc: "Chalets en appartementen in Levi", href: "/nl/accommodaties" }
      ]
    },
    breadcrumbLabel: "Langlaufen in Levi"
  },
  de: {
    meta: {
      title: `Langlauf in Levi ${year} — 230 km Loipen in Lappland`,
      description: "Langlauf in Levi: 230 km gespurte Loipen durch Fjelllandschaften. Loipenkarte, leichte Routen für Anfänger und Tipps für Ihren Skiurlaub.",
      canonical: "https://leville.net/de/ratgeber/langlauf-in-levi"
    },
    title: "Langlauf in Levi",
    subtitle: "230 km gespurte Loipen in Lapplands Fjelllandschaften",
    intro: "Das Loipennetz von Levi gehört zu den umfangreichsten und schönsten in Finnland. 230 Kilometer gespurte Loipen führen Sie durch verschneite Wälder und offene Fjelllandschaften. Die Loipen sind sowohl für den klassischen Stil als auch für Skating geeignet, und beleuchtete Loipen stehen auch in der dunklen Jahreszeit zur Verfügung.",
    sections: {
      network: {
        title: "Loipennetz",
        stats: [
          { label: "Loipen gesamt", value: "230 km", icon: "route" },
          { label: "Beleuchtete Loipen", value: "28 km", icon: "moon" },
          { label: "Fjell-Loipen", value: "Mehrere", icon: "mountain" },
          { label: "Kunstschnee-Loipe", value: "Immer geöffnet", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Die beliebtesten Loipen",
        items: [
          { name: "Immeljärvi-Runden", length: "5–15 km", desc: "Leichte Loipen für Anfänger mit schöner Seenkulisse" },
          { name: "Fjell-Loipe", length: "10–25 km", desc: "Abwechslungsreiche Anstiege und Abfahrten, atemberaubende Landschaft" },
          { name: "Kätkätunturi-Loipe", length: "20 km", desc: "Anspruchsvolle Route für erfahrene Langläufer" },
          { name: "Beleuchtete Zentrumsloipe", length: "7 km", desc: "Perfekt für Abendlanglauf in den dunklen Monaten" }
        ]
      },
      tips: {
        title: "Langlauf-Tipps",
        items: [
          "Überprüfen Sie den Loipenzustand auf der Website des Levi Ski Resort vor der Abfahrt",
          "Planen Sie genügend Zeit ein – auf den Fjell-Loipen verfliegt die Zeit",
          "Nehmen Sie ein warmes Getränk und Snacks für längere Routen mit",
          "Leihen Sie Ausrüstung in Levi, wenn Sie keine eigene haben – große Auswahl",
          "Probieren Sie beide Stile aus: Klassisch und Skating"
        ]
      },
      services: {
        title: "Loipen-Service",
        content: "Die Loipen von Levi werden täglich gespurt. Loipenkarten sind bei der Touristeninformation und in Loipencafés erhältlich. Die Skischule bietet Unterricht für alle Könnensstufen. In Verleihgeschäften gibt es sowohl klassische als auch Skating-Ski."
      },
      conditions: {
        title: "Saison und Bedingungen",
        content: "Die Loipensaison beginnt typischerweise Anfang Oktober auf der Erstschnee-Loipe, die mit gespeichertem Schnee angelegt wird. Das vollständige Loipennetz öffnet nach ausreichend Schneefall, meist im November. Die Saison dauert bis über den 1. Mai hinaus — auf den Fjell-Loipen liegt oft bis Mai Schnee."
      }
    },
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Wann öffnen die Loipen in Levi?", a: "Die Loipensaison beginnt typischerweise Anfang Oktober auf der Erstschnee-Loipe. Das vollständige Loipennetz öffnet nach ausreichend Schneefall, meist im November." },
        { q: "Gibt es Langlaufunterricht in Levi?", a: "Ja, die Skischulen in Levi bieten Unterricht für alle Könnensstufen, sowohl klassisch als auch Skating." },
        { q: "Kann ich abends Langlauf fahren?", a: "Ja, Levi hat 28 km beleuchtete Loipen, die auch in der Dunkelheit geöffnet sind." },
        { q: "Gibt es eine Loipengebühr?", a: "Die Loipen von Levi sind kostenlos. Ausrüstung kann vor Ort gemietet werden." }
      ]
    },
    cta: { hub: "Zurück zum Levi-Reiseführer", hubLink: "/de/levi", accommodation: "Unterkunft in Levi buchen", accommodationLink: "/de/unterkuenfte" },
    readNext: {
      title: "Lesen Sie auch",
      links: [
        { title: "Skifahren in Levi", desc: "43 Pisten und 28 Lifte", href: "/de/ratgeber/skifahren-in-levi" },
        { title: "Winter in Levi", desc: "Polarnacht, Schnee und Aktivitäten", href: "/guide/winter-in-levi" },
        { title: "Wetter in Levi", desc: "Temperaturen und Schneeverhältnisse", href: "/de/ratgeber/wetter-in-levi" },
        { title: "Winterkleidung", desc: "Richtig anziehen für Lappland", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
      ]
    },
    breadcrumbLabel: "Langlauf in Levi"
  },
  sv: {
    meta: {
      title: `Längdskidåkning i Levi ${year} — 230 km spår i Lappland`,
      description: "Längdskidåkning i Levi: 230 km preparerade spår genom fjällandskap. Spårkarta, lätta leder för nybörjare och tips för din skidsemester.",
      canonical: "https://leville.net/sv/guide/langdskidakning-i-levi"
    },
    title: "Längdskidåkning i Levi",
    subtitle: "230 km preparerade spår i Lapplands fjällandskap",
    intro: "Levis spårnätverk är ett av de mest omfattande och vackraste i Finland. 230 kilometer preparerade spår tar dig genom snöiga skogar och öppna fjällandskap. Spåren är lämpliga för både klassisk stil och skating, och belysta spår finns tillgängliga för skidåkning under den mörka årstiden.",
    sections: {
      network: {
        title: "Spårnätverk",
        stats: [
          { label: "Totalt spår", value: "230 km", icon: "route" },
          { label: "Belysta spår", value: "28 km", icon: "moon" },
          { label: "Fjällspår", value: "Flera", icon: "mountain" },
          { label: "Konstsnöspår", value: "Alltid öppet", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Populäraste spåren",
        items: [
          { name: "Immeljärvi-rundor", length: "5–15 km", desc: "Lätta spår för nybörjare med vacker sjöutsikt" },
          { name: "Fjällspåret", length: "10–25 km", desc: "Varierande stigningar och utförsåkningar, fantastisk utsikt" },
          { name: "Kätkätunturi-spåret", length: "20 km", desc: "Utmanande rutt för erfarna skidåkare" },
          { name: "Belyst centrumspår", length: "7 km", desc: "Perfekt för kvällsskidåkning under mörka månader" }
        ]
      },
      tips: {
        title: "Skidtips",
        items: [
          "Kontrollera spårförhållandena på Levi Ski Resorts webbplats innan du åker ut",
          "Avsätt gott om tid – timmarna flyger iväg på fjällspåren",
          "Ta med en varm dryck och snacks för längre rutter",
          "Hyr utrustning i Levi om du inte äger egen – stort utbud",
          "Prova båda stilarna: klassisk och skating"
        ]
      },
      services: {
        title: "Spårservice",
        content: "Levis spår prepareras dagligen. Spårkartor finns tillgängliga vid turistinformationen och spårcaféer. Skidskolan erbjuder lektioner för alla nivåer. Uthyrningsbutiker har både klassiska och skating-skidor."
      },
      conditions: {
        title: "Säsong och förhållanden",
        content: "Spårsäsongen börjar vanligtvis i början av oktober på förstsnöspåret som görs med lagrad snö. Det fullständiga spårnätverket öppnar efter tillräckligt snöfall, vanligtvis i november. Säsongen fortsätter förbi Valborg — fjällspåren har ofta snö till maj."
      }
    },
    faq: {
      title: "Vanliga frågor",
      items: [
        { q: "När öppnar spåren i Levi?", a: "Spårsäsongen börjar vanligtvis i början av oktober på förstsnöspåret. Det fullständiga spårnätverket öppnar efter tillräckligt snöfall, vanligtvis i november." },
        { q: "Finns det skidundervisning i Levi?", a: "Ja, Levis skidskolor erbjuder lektioner för alla nivåer, både klassisk och skating." },
        { q: "Kan jag åka skidor på kvällen?", a: "Ja, Levi har 28 km belysta spår som är öppna även i mörker." },
        { q: "Kostar det att använda spåren?", a: "Levis spår är gratis. Utrustning kan hyras på plats." }
      ]
    },
    cta: { hub: "Tillbaka till Levi-guiden", hubLink: "/sv/levi", accommodation: "Boka boende i Levi", accommodationLink: "/sv/boenden" },
    readNext: {
      title: "Läs också",
      links: [
        { title: "Skidåkning i Levi", desc: "43 backar och 28 liftar", href: "/sv/guide/skidakning-i-levi" },
        { title: "Väder i Levi", desc: "Temperaturer och snöförhållanden", href: "/sv/guide/vader-i-levi" },
        { title: "Vinteraktiviteter", desc: "De bästa vinterupplevelserna", href: "/sv/aktiviteter/vinteraktiviteter-levi" },
        { title: "Vinterkläder", desc: "Så klär du dig för Lappland", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
      ]
    },
    breadcrumbLabel: "Längdskidåkning i Levi"
  },
  fr: {
    meta: {
      title: `Ski de fond à Levi ${year} — 230 km de pistes en Laponie`,
      description: "Ski de fond à Levi : 230 km de pistes damées à travers les paysages de fjells. Carte des pistes, itinéraires faciles et conseils pour votre séjour ski.",
      canonical: "https://leville.net/fr/guide/ski-de-fond-a-levi"
    },
    title: "Ski de fond à Levi",
    subtitle: "230 km de pistes damées dans les paysages de fjells de Laponie",
    intro: "Le réseau de pistes de Levi est l'un des plus vastes et des plus beaux de Finlande. 230 kilomètres de pistes damées vous emmènent à travers des forêts enneigées et des paysages de fjells ouverts. Les pistes conviennent au style classique comme au skating, et des pistes éclairées sont disponibles pour skier pendant la saison sombre.",
    sections: {
      network: {
        title: "Réseau de pistes",
        stats: [
          { label: "Total des pistes", value: "230 km", icon: "route" },
          { label: "Pistes éclairées", value: "28 km", icon: "moon" },
          { label: "Pistes de fjell", value: "Plusieurs", icon: "mountain" },
          { label: "Piste enneigée", value: "Toujours ouverte", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Pistes les plus populaires",
        items: [
          { name: "Boucles d'Immeljärvi", length: "5–15 km", desc: "Pistes faciles pour débutants avec belle vue sur le lac" },
          { name: "Piste du fjell", length: "10–25 km", desc: "Montées et descentes variées, paysages magnifiques" },
          { name: "Piste de Kätkätunturi", length: "20 km", desc: "Itinéraire exigeant pour skieurs expérimentés" },
          { name: "Piste éclairée du centre", length: "7 km", desc: "Parfaite pour le ski en soirée pendant les mois sombres" }
        ]
      },
      tips: {
        title: "Conseils de ski",
        items: [
          "Vérifiez l'état des pistes sur le site du Levi Ski Resort avant de partir",
          "Prévoyez suffisamment de temps — les heures passent vite sur les pistes de fjell",
          "Emportez une boisson chaude et des en-cas pour les itinéraires plus longs",
          "Louez du matériel à Levi si vous n'en possédez pas — large choix disponible",
          "Essayez les deux styles : classique et skating"
        ]
      },
      services: {
        title: "Services de pistes",
        content: "Les pistes de Levi sont damées quotidiennement. Les cartes des pistes sont disponibles à l'office du tourisme et dans les cafés de piste. L'école de ski propose des cours pour tous les niveaux. Les boutiques de location proposent des skis classiques et de skating."
      },
      conditions: {
        title: "Saison et conditions",
        content: "La saison des pistes commence généralement début octobre sur la piste de première neige, fabriquée avec de la neige stockée. Le réseau complet ouvre après des chutes de neige suffisantes, généralement en novembre. La saison se poursuit au-delà du 1er mai — les pistes de fjell ont souvent de la neige jusqu'en mai."
      }
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Quand les pistes de Levi ouvrent-elles ?", a: "La saison commence généralement début octobre sur la piste de première neige. Le réseau complet ouvre après des chutes de neige suffisantes, généralement en novembre." },
        { q: "Y a-t-il des cours de ski de fond à Levi ?", a: "Oui, les écoles de ski de Levi proposent des cours pour tous les niveaux, en style classique et skating." },
        { q: "Peut-on skier le soir ?", a: "Oui, Levi dispose de 28 km de pistes éclairées ouvertes même pendant les heures sombres." },
        { q: "Y a-t-il un forfait pour les pistes ?", a: "Les pistes de Levi sont gratuites. Le matériel peut être loué sur place." }
      ]
    },
    cta: { hub: "Retour au guide de Levi", hubLink: "/fr/levi", accommodation: "Réserver un hébergement à Levi", accommodationLink: "/fr/hebergements" },
    readNext: {
      title: "À lire aussi",
      links: [
        { title: "Ski à Levi", desc: "43 pistes et 28 remontées", href: "/fr/guide/ski-a-levi" },
        { title: "Météo à Levi", desc: "Températures et conditions de neige", href: "/fr/guide/meteo-a-levi" },
        { title: "Activités d'hiver", desc: "Les meilleures expériences hivernales", href: "/fr/activites/activites-hiver-levi" },
        { title: "Vêtements d'hiver", desc: "Comment s'habiller pour la Laponie", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
      ]
    },
    breadcrumbLabel: "Ski de fond à Levi"
  },
  es: {
    meta: {
      title: `Esquí de fondo en Levi ${year} — 230 km de pistas en Laponia`,
      description: "Esquí de fondo en Levi: 230 km de pistas preparadas a través de paisajes de fjell. Mapa de pistas, rutas fáciles para principiantes y consejos para tus vacaciones de esquí.",
      canonical: "https://leville.net/es/guia/esqui-de-fondo-en-levi"
    },
    title: "Esquí de fondo en Levi",
    subtitle: "230 km de pistas preparadas en los paisajes de fjell de Laponia",
    intro: "La red de pistas de Levi es una de las más extensas y hermosas de Finlandia. 230 kilómetros de pistas preparadas te llevan a través de bosques nevados y paisajes abiertos de fjell. Las pistas son aptas tanto para estilo clásico como skating, y hay pistas iluminadas disponibles para esquiar en la temporada oscura.",
    sections: {
      network: {
        title: "Red de pistas",
        stats: [
          { label: "Total de pistas", value: "230 km", icon: "route" },
          { label: "Pistas iluminadas", value: "28 km", icon: "moon" },
          { label: "Pistas de fjell", value: "Varias", icon: "mountain" },
          { label: "Pista de nieve artificial", value: "Siempre abierta", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Pistas más populares",
        items: [
          { name: "Circuitos de Immeljärvi", length: "5–15 km", desc: "Pistas fáciles para principiantes con hermosas vistas al lago" },
          { name: "Pista del fjell", length: "10–25 km", desc: "Subidas y bajadas variadas, paisajes impresionantes" },
          { name: "Pista de Kätkätunturi", length: "20 km", desc: "Ruta exigente para esquiadores experimentados" },
          { name: "Pista iluminada del centro", length: "7 km", desc: "Perfecta para esquiar por la tarde en los meses oscuros" }
        ]
      },
      tips: {
        title: "Consejos de esquí",
        items: [
          "Consulta el estado de las pistas en el sitio web de Levi Ski Resort antes de salir",
          "Reserva suficiente tiempo — las horas pasan volando en las pistas de fjell",
          "Lleva una bebida caliente y snacks para las rutas más largas",
          "Alquila equipo en Levi si no tienes propio — amplia selección disponible",
          "Prueba ambos estilos: clásico y skating"
        ]
      },
      services: {
        title: "Servicios de pistas",
        content: "Las pistas de Levi se preparan diariamente. Los mapas de pistas están disponibles en la oficina de turismo y en los cafés de pista. La escuela de esquí ofrece clases para todos los niveles. Las tiendas de alquiler tienen esquís clásicos y de skating."
      },
      conditions: {
        title: "Temporada y condiciones",
        content: "La temporada de pistas comienza típicamente a principios de octubre en la pista de primera nieve, hecha con nieve almacenada. La red completa abre después de suficientes nevadas, generalmente en noviembre. La temporada continúa más allá del 1 de mayo — las pistas de fjell suelen tener nieve hasta mayo."
      }
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Cuándo abren las pistas de Levi?", a: "La temporada comienza típicamente a principios de octubre en la pista de primera nieve. La red completa abre después de suficientes nevadas, generalmente en noviembre." },
        { q: "¿Hay clases de esquí de fondo en Levi?", a: "Sí, las escuelas de esquí de Levi ofrecen clases para todos los niveles, tanto en estilo clásico como skating." },
        { q: "¿Se puede esquiar por la tarde?", a: "Sí, Levi tiene 28 km de pistas iluminadas que están abiertas incluso en las horas oscuras." },
        { q: "¿Hay que pagar por las pistas?", a: "Las pistas de Levi son gratuitas. El equipo se puede alquilar en el lugar." }
      ]
    },
    cta: { hub: "Volver a la guía de Levi", hubLink: "/es/levi", accommodation: "Reservar alojamiento en Levi", accommodationLink: "/es/alojamientos" },
    readNext: {
      title: "Lee también",
      links: [
        { title: "Esquí en Levi", desc: "43 pistas y 28 remontes", href: "/es/guia/esqui-en-levi" },
        { title: "Clima en Levi", desc: "Temperaturas y condiciones de nieve", href: "/es/guia/clima-en-levi" },
        { title: "Actividades de invierno", desc: "Las mejores experiencias invernales", href: "/es/actividades/actividades-invierno-levi" },
        { title: "Ropa de invierno", desc: "Cómo vestirse para Laponia", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
      ]
    },
    breadcrumbLabel: "Esquí de fondo en Levi"
  }
};
