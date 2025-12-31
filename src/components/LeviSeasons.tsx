import { Leaf, Snowflake, Sun, TreeDeciduous } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Language } from "@/translations";
import OptimizedImage from "./OptimizedImage";

// Import season images
import winterImg from "@/assets/seasons/winter.jpg";
import autumnImg from "@/assets/seasons/autumn.jpg";
import summerImg from "@/assets/seasons/summer.jpg";
import springImg from "@/assets/seasons/spring.jpg";

interface SeasonData {
  id: string;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  snowInfo: string;
  accentColor: string;
  bgGradient: string;
}

const seasonsData: Record<Language, SeasonData[]> = {
  fi: [
    {
      id: "autumn",
      title: "Syksy ja ruska",
      period: "Syyskuu – lokakuun alku",
      description: "Levin syksy on luonnon väriloistoa parhaimmillaan. Ruska värjää tunturimaisemat kirkkaan punaisiksi, oransseiksi ja keltaisiksi syyskuun alusta lokakuun alkuun. Ilma on raikas ja raitis, ja luonnossa vallitsee tyyni hiljaisuus. Yöt pimenevät jälleen, mikä tekee revontulien bongaamisesta mahdollista kirkkailla öillä.",
      highlights: [
        "Ruska-ajan väriloisto tunturimaisemissa",
        "Raikas syysilma ja hiljainen luonto",
        "Revontulikausi alkaa pimeiden öiden myötä",
        "Marjastus- ja sienestyskausi"
      ],
      snowInfo: "Pysyvää lunta ei yleensä vielä ole. Ensimmäiset lumisateet saattavat tulla lokakuussa.",
      accentColor: "text-orange-400",
      bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "winter",
      title: "Talvi ja kaamoksen aika",
      period: "Marraskuu – maaliskuu",
      description: "Levin talvi on lumista taikaa ja arktista rauhaa. Kaamos tuo mukanaan mystisen sinisen valon, kun aurinko pysyttelee horisontin alapuolella. Lumiset metsät ja tunturit tarjoavat erinomaisen ympäristön laskettelulle, hiihdolle ja moottorikelkkailulle. Revontulet tanssivat taivaalla kirkkaina pakkas­öinä.",
      highlights: [
        "Kaamoksen sininen valo ja arktinen tunnelma",
        "Revontulet kirkkaalla taivaalla",
        "Laskettelu, murtomaahiihto ja moottorikelkkailu",
        "Luminen tunturimaisema"
      ],
      snowInfo: "Marraskuu: 10–30 cm • Joulukuu: 30–60 cm • Tammikuu: 60–90 cm • Helmikuu: 80–120 cm",
      accentColor: "text-sky-400",
      bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent"
    },
    {
      id: "spring",
      title: "Kevät ja kevätaurinko",
      period: "Maaliskuu – huhtikuu",
      description: "Levin kevät on valoa ja energiaa. Päivät pitenevät huimaa vauhtia, ja aurinko paistaa kirkkaalta taivaalta lumisille rinteille. Kevätauringossa hiihteleminen on ainutlaatuinen kokemus – rinteet hohtavat ja after ski -terassit täyttyvät aurinkoa nauttivista ihmisistä. Lumi on kevättalvella tyypillisesti syvimmillään.",
      highlights: [
        "Kirkkaat ja pitkät auringonpaisteessa vietetyt päivät",
        "Kevätlaskettelu ja murtomaahiihto",
        "Terassit ja ulkoilmaelämä",
        "Lumipeitteen maksimi"
      ],
      snowInfo: "Maaliskuu: 90–120 cm • Huhtikuu: 70–100 cm",
      accentColor: "text-yellow-400",
      bgGradient: "from-yellow-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "summer",
      title: "Kesä ja yötön yö",
      period: "Kesäkuu – heinäkuu",
      description: "Levin kesä on yöttömän yön aikaa. Aurinko ei laske lainkaan kesäkuun ja heinäkuun aikana, mikä luo aivan erityisen tunnelman. Luonto vihertää ja tunturit tarjoavat erinomaisia vaellusreittejä ja maastopyöräilymahdollisuuksia. Kesällä Levi on rauhallinen ja luonnonläheinen – täydellinen paikka rentoutumiseen.",
      highlights: [
        "Keskiyön aurinko ja yötön yö",
        "Vaellus tunturireiteillä",
        "Maastopyöräily ja kalastus",
        "Rauhallinen ja luonnonläheinen tunnelma"
      ],
      snowInfo: "Kesäkuukausina ei ole lunta.",
      accentColor: "text-emerald-400",
      bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent"
    }
  ],
  en: [
    {
      id: "autumn",
      title: "Autumn and Ruska",
      period: "September – early October",
      description: "Autumn in Levi is nature's color spectacle at its finest. Ruska paints the fell landscapes in bright reds, oranges, and yellows from early September to early October. The air is crisp and fresh, and a peaceful silence prevails in nature. Nights grow darker again, making it possible to spot the Northern Lights on clear evenings.",
      highlights: [
        "Ruska colors across the fell landscape",
        "Crisp autumn air and peaceful nature",
        "Northern Lights season begins with darker nights",
        "Berry and mushroom picking season"
      ],
      snowInfo: "Usually no permanent snow yet. First snowfall may occur in October.",
      accentColor: "text-orange-400",
      bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "winter",
      title: "Winter and Polar Night",
      period: "November – March",
      description: "Winter in Levi is snowy magic and arctic tranquility. The polar night brings a mystical blue light as the sun stays below the horizon. Snow-covered forests and fells provide an excellent setting for skiing, cross-country skiing, and snowmobiling. The Northern Lights dance across the sky on clear, frosty nights.",
      highlights: [
        "Magical blue light of the polar night",
        "Northern Lights on clear skies",
        "Skiing, cross-country skiing, and snowmobiling",
        "Snow-covered fell landscape"
      ],
      snowInfo: "November: 10–30 cm • December: 30–60 cm • January: 60–90 cm • February: 80–120 cm",
      accentColor: "text-sky-400",
      bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent"
    },
    {
      id: "spring",
      title: "Spring and Spring Sun",
      period: "March – April",
      description: "Spring in Levi is light and energy. Days lengthen rapidly, and the sun shines from a bright sky onto the snowy slopes. Skiing in the spring sunshine is a unique experience – the slopes glisten and après-ski terraces fill with people enjoying the sun. Snow depth is typically at its maximum during late winter.",
      highlights: [
        "Bright and long sunny days",
        "Spring skiing and cross-country skiing",
        "Outdoor terraces and outdoor life",
        "Maximum snow depth"
      ],
      snowInfo: "March: 90–120 cm • April: 70–100 cm",
      accentColor: "text-yellow-400",
      bgGradient: "from-yellow-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "summer",
      title: "Summer and Midnight Sun",
      period: "June – July",
      description: "Summer in Levi is the time of the midnight sun. The sun does not set at all during June and July, creating a very special atmosphere. Nature turns green, and the fells offer excellent hiking trails and mountain biking opportunities. In summer, Levi is peaceful and close to nature – a perfect place to relax.",
      highlights: [
        "Midnight sun and nightless nights",
        "Hiking on fell trails",
        "Mountain biking and fishing",
        "Peaceful and nature-close atmosphere"
      ],
      snowInfo: "No snow during summer months.",
      accentColor: "text-emerald-400",
      bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent"
    }
  ],
  sv: [
    {
      id: "autumn",
      title: "Höst och Ruska",
      period: "September – början av oktober",
      description: "Hösten i Levi är naturens färgprakt som bäst. Ruska målar fjällandskapen i klara röda, orange och gula toner från början av september till början av oktober. Luften är frisk och ren, och en fridfull tystnad råder i naturen. Nätterna blir mörkare igen, vilket gör det möjligt att se norrsken under klara kvällar.",
      highlights: [
        "Ruska-färger över fjällandskapet",
        "Frisk höstluft och fridfull natur",
        "Norrskensäsongen börjar med mörkare nätter",
        "Bär- och svampplockning"
      ],
      snowInfo: "Vanligtvis ingen permanent snö ännu. Första snöfallet kan komma i oktober.",
      accentColor: "text-orange-400",
      bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "winter",
      title: "Vinter och polarnatt",
      period: "November – mars",
      description: "Vintern i Levi är snöig magi och arktisk lugn. Polarnatten ger ett mystiskt blått ljus när solen stannar under horisonten. Snötäckta skogar och fjäll ger en utmärkt miljö för skidåkning, längdskidåkning och snöskotertur. Norrskenet dansar över himlen under klara, frostiga nätter.",
      highlights: [
        "Magiskt blått ljus under polarnatten",
        "Norrsken på klar himmel",
        "Skidåkning, längdskidåkning och snöskoter",
        "Snötäckt fjällandskap"
      ],
      snowInfo: "November: 10–30 cm • December: 30–60 cm • Januari: 60–90 cm • Februari: 80–120 cm",
      accentColor: "text-sky-400",
      bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent"
    },
    {
      id: "spring",
      title: "Vår och vårsol",
      period: "Mars – april",
      description: "Våren i Levi är ljus och energi. Dagarna blir snabbt längre och solen skiner från en klar himmel på de snöiga backarna. Skidåkning i vårsolen är en unik upplevelse – backarna glittrar och après-ski-terrasserna fylls av människor som njuter av solen. Snödjupet är vanligtvis som störst under senvinter.",
      highlights: [
        "Ljusa och långa soliga dagar",
        "Vårskidåkning och längdskidåkning",
        "Uteserveringar och friluftsliv",
        "Maximalt snödjup"
      ],
      snowInfo: "Mars: 90–120 cm • April: 70–100 cm",
      accentColor: "text-yellow-400",
      bgGradient: "from-yellow-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "summer",
      title: "Sommar och midnattssol",
      period: "Juni – juli",
      description: "Sommaren i Levi är midnattsolens tid. Solen går inte ner alls under juni och juli, vilket skapar en alldeles speciell atmosfär. Naturen blir grön och fjällen erbjuder utmärkta vandringsleder och mountainbike-möjligheter. På sommaren är Levi lugnt och nära naturen – en perfekt plats att koppla av.",
      highlights: [
        "Midnattssol och ljusa nätter",
        "Vandring på fjällleder",
        "Mountainbike och fiske",
        "Lugn och naturnära atmosfär"
      ],
      snowInfo: "Ingen snö under sommarmånaderna.",
      accentColor: "text-emerald-400",
      bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent"
    }
  ],
  de: [
    {
      id: "autumn",
      title: "Herbst und Ruska",
      period: "September – Anfang Oktober",
      description: "Der Herbst in Levi zeigt die Natur von ihrer farbenprächtigsten Seite. Ruska malt die Fjelllandschaften von Anfang September bis Anfang Oktober in leuchtenden Rot-, Orange- und Gelbtönen. Die Luft ist frisch und klar, und eine friedliche Stille herrscht in der Natur. Die Nächte werden wieder dunkler, was es möglich macht, an klaren Abenden Nordlichter zu sehen.",
      highlights: [
        "Ruska-Farben über der Fjelllandschaft",
        "Frische Herbstluft und friedliche Natur",
        "Nordlichtsaison beginnt mit dunkleren Nächten",
        "Beeren- und Pilzsammeln"
      ],
      snowInfo: "Normalerweise noch kein dauerhafter Schnee. Erster Schneefall kann im Oktober kommen.",
      accentColor: "text-orange-400",
      bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "winter",
      title: "Winter und Polarnacht",
      period: "November – März",
      description: "Der Winter in Levi ist schneeweiße Magie und arktische Ruhe. Die Polarnacht bringt ein mystisches blaues Licht, während die Sonne unter dem Horizont bleibt. Schneebedeckte Wälder und Fjells bieten eine hervorragende Kulisse zum Skifahren, Langlaufen und Schneemobilfahren. Die Nordlichter tanzen in klaren, frostigen Nächten über den Himmel.",
      highlights: [
        "Magisches blaues Licht der Polarnacht",
        "Nordlichter am klaren Himmel",
        "Skifahren, Langlauf und Schneemobil",
        "Schneebedeckte Fjelllandschaft"
      ],
      snowInfo: "November: 10–30 cm • Dezember: 30–60 cm • Januar: 60–90 cm • Februar: 80–120 cm",
      accentColor: "text-sky-400",
      bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent"
    },
    {
      id: "spring",
      title: "Frühling und Frühlingssonne",
      period: "März – April",
      description: "Der Frühling in Levi ist Licht und Energie. Die Tage werden schnell länger und die Sonne scheint von einem klaren Himmel auf die verschneiten Pisten. Skifahren in der Frühlingssonne ist ein einzigartiges Erlebnis – die Pisten glitzern und Après-Ski-Terrassen füllen sich mit Menschen, die die Sonne genießen. Die Schneehöhe erreicht typischerweise im Spätwinter ihr Maximum.",
      highlights: [
        "Helle und lange sonnige Tage",
        "Frühlings-Skifahren und Langlauf",
        "Außenterrassen und Outdoor-Leben",
        "Maximale Schneehöhe"
      ],
      snowInfo: "März: 90–120 cm • April: 70–100 cm",
      accentColor: "text-yellow-400",
      bgGradient: "from-yellow-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "summer",
      title: "Sommer und Mitternachtssonne",
      period: "Juni – Juli",
      description: "Der Sommer in Levi ist die Zeit der Mitternachtssonne. Die Sonne geht im Juni und Juli überhaupt nicht unter, was eine ganz besondere Atmosphäre schafft. Die Natur wird grün und die Fjells bieten hervorragende Wanderwege und Mountainbike-Möglichkeiten. Im Sommer ist Levi ruhig und naturnah – ein perfekter Ort zum Entspannen.",
      highlights: [
        "Mitternachtssonne und helle Nächte",
        "Wandern auf Fjell-Pfaden",
        "Mountainbiken und Angeln",
        "Ruhige und naturnahe Atmosphäre"
      ],
      snowInfo: "Kein Schnee in den Sommermonaten.",
      accentColor: "text-emerald-400",
      bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent"
    }
  ],
  es: [
    {
      id: "autumn",
      title: "Otoño y Ruska",
      period: "Septiembre – principios de octubre",
      description: "El otoño en Levi es el espectáculo de colores de la naturaleza en su máxima expresión. Ruska pinta los paisajes de los montes en rojos, naranjas y amarillos brillantes desde principios de septiembre hasta principios de octubre. El aire es fresco y limpio, y un silencio pacífico reina en la naturaleza. Las noches se oscurecen de nuevo, lo que hace posible ver las auroras boreales en noches claras.",
      highlights: [
        "Colores de Ruska en el paisaje montañoso",
        "Aire otoñal fresco y naturaleza tranquila",
        "La temporada de auroras boreales comienza con noches más oscuras",
        "Temporada de recolección de bayas y setas"
      ],
      snowInfo: "Normalmente aún no hay nieve permanente. La primera nevada puede llegar en octubre.",
      accentColor: "text-orange-400",
      bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "winter",
      title: "Invierno y noche polar",
      period: "Noviembre – marzo",
      description: "El invierno en Levi es magia nevada y tranquilidad ártica. La noche polar trae una luz azul mística mientras el sol permanece bajo el horizonte. Los bosques y montes cubiertos de nieve ofrecen un escenario excelente para esquiar, esquí de fondo y motos de nieve. Las auroras boreales danzan por el cielo en noches claras y heladas.",
      highlights: [
        "Luz azul mágica de la noche polar",
        "Auroras boreales en cielos despejados",
        "Esquí, esquí de fondo y moto de nieve",
        "Paisaje montañoso cubierto de nieve"
      ],
      snowInfo: "Noviembre: 10–30 cm • Diciembre: 30–60 cm • Enero: 60–90 cm • Febrero: 80–120 cm",
      accentColor: "text-sky-400",
      bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent"
    },
    {
      id: "spring",
      title: "Primavera y sol primaveral",
      period: "Marzo – abril",
      description: "La primavera en Levi es luz y energía. Los días se alargan rápidamente y el sol brilla desde un cielo despejado sobre las pistas nevadas. Esquiar bajo el sol primaveral es una experiencia única – las pistas brillan y las terrazas de après-ski se llenan de gente disfrutando del sol. La profundidad de la nieve suele alcanzar su máximo a finales del invierno.",
      highlights: [
        "Días soleados largos y brillantes",
        "Esquí de primavera y esquí de fondo",
        "Terrazas al aire libre y vida outdoor",
        "Máxima profundidad de nieve"
      ],
      snowInfo: "Marzo: 90–120 cm • Abril: 70–100 cm",
      accentColor: "text-yellow-400",
      bgGradient: "from-yellow-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "summer",
      title: "Verano y sol de medianoche",
      period: "Junio – julio",
      description: "El verano en Levi es la época del sol de medianoche. El sol no se pone en absoluto durante junio y julio, creando una atmósfera muy especial. La naturaleza se vuelve verde y los montes ofrecen excelentes rutas de senderismo y oportunidades para ciclismo de montaña. En verano, Levi es tranquilo y cercano a la naturaleza – un lugar perfecto para relajarse.",
      highlights: [
        "Sol de medianoche y noches sin oscuridad",
        "Senderismo por senderos de montaña",
        "Ciclismo de montaña y pesca",
        "Atmósfera tranquila y cercana a la naturaleza"
      ],
      snowInfo: "No hay nieve durante los meses de verano.",
      accentColor: "text-emerald-400",
      bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent"
    }
  ],
  fr: [
    {
      id: "autumn",
      title: "Automne et Ruska",
      period: "Septembre – début octobre",
      description: "L'automne à Levi est le spectacle de couleurs de la nature à son apogée. Ruska peint les paysages des fjells en rouges, oranges et jaunes vifs de début septembre à début octobre. L'air est frais et pur, et un silence paisible règne dans la nature. Les nuits s'assombrissent à nouveau, permettant d'observer les aurores boréales lors des soirées claires.",
      highlights: [
        "Couleurs de Ruska sur le paysage des fjells",
        "Air automnal frais et nature paisible",
        "La saison des aurores boréales commence avec les nuits plus sombres",
        "Saison de cueillette de baies et champignons"
      ],
      snowInfo: "Généralement pas encore de neige permanente. Les premières chutes de neige peuvent arriver en octobre.",
      accentColor: "text-orange-400",
      bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "winter",
      title: "Hiver et nuit polaire",
      period: "Novembre – mars",
      description: "L'hiver à Levi est une magie enneigée et une tranquillité arctique. La nuit polaire apporte une lumière bleue mystique alors que le soleil reste sous l'horizon. Les forêts et fjells enneigés offrent un cadre excellent pour le ski, le ski de fond et la motoneige. Les aurores boréales dansent dans le ciel lors des nuits claires et glaciales.",
      highlights: [
        "Lumière bleue magique de la nuit polaire",
        "Aurores boréales sous un ciel clair",
        "Ski, ski de fond et motoneige",
        "Paysage de fjells enneigé"
      ],
      snowInfo: "Novembre: 10–30 cm • Décembre: 30–60 cm • Janvier: 60–90 cm • Février: 80–120 cm",
      accentColor: "text-sky-400",
      bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent"
    },
    {
      id: "spring",
      title: "Printemps et soleil printanier",
      period: "Mars – avril",
      description: "Le printemps à Levi est lumière et énergie. Les jours s'allongent rapidement et le soleil brille d'un ciel clair sur les pistes enneigées. Skier sous le soleil printanier est une expérience unique – les pistes scintillent et les terrasses d'après-ski se remplissent de personnes profitant du soleil. La profondeur de neige atteint généralement son maximum en fin d'hiver.",
      highlights: [
        "Journées ensoleillées longues et lumineuses",
        "Ski de printemps et ski de fond",
        "Terrasses extérieures et vie en plein air",
        "Profondeur de neige maximale"
      ],
      snowInfo: "Mars: 90–120 cm • Avril: 70–100 cm",
      accentColor: "text-yellow-400",
      bgGradient: "from-yellow-500/10 via-amber-500/5 to-transparent"
    },
    {
      id: "summer",
      title: "Été et soleil de minuit",
      period: "Juin – juillet",
      description: "L'été à Levi est la période du soleil de minuit. Le soleil ne se couche pas du tout pendant juin et juillet, créant une atmosphère très spéciale. La nature devient verte et les fjells offrent d'excellents sentiers de randonnée et des possibilités de VTT. En été, Levi est paisible et proche de la nature – un endroit parfait pour se détendre.",
      highlights: [
        "Soleil de minuit et nuits sans obscurité",
        "Randonnée sur les sentiers des fjells",
        "VTT et pêche",
        "Atmosphère paisible et proche de la nature"
      ],
      snowInfo: "Pas de neige pendant les mois d'été.",
      accentColor: "text-emerald-400",
      bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent"
    }
  ]
};

const icons = [
  <Leaf className="w-8 h-8" key="leaf" />,
  <Snowflake className="w-8 h-8" key="snowflake" />,
  <Sun className="w-8 h-8" key="sun" />,
  <TreeDeciduous className="w-8 h-8" key="tree" />
];

const seasonImages = [autumnImg, winterImg, springImg, summerImg];

// Section titles
const sectionContent: Record<Language, { title: string; description: string; snowConditions: string }> = {
  fi: {
    title: "Levin vuodenajat",
    description: "Jokaisella vuodenajalla on oma viehätyksensä Lapissa. Tutustu Levin neljään vuodenaikaan ja suunnittele matkasi juuri sinulle sopivaan aikaan.",
    snowConditions: "Lumitilanne:"
  },
  en: {
    title: "Seasons in Levi",
    description: "Each season has its own charm in Lapland. Discover the four seasons in Levi and plan your trip for the perfect time.",
    snowConditions: "Snow conditions:"
  },
  sv: {
    title: "Årstider i Levi",
    description: "Varje årstid har sin egen charm i Lappland. Upptäck de fyra årstiderna i Levi och planera din resa för den perfekta tiden.",
    snowConditions: "Snöförhållanden:"
  },
  de: {
    title: "Jahreszeiten in Levi",
    description: "Jede Jahreszeit hat ihren eigenen Charme in Lappland. Entdecken Sie die vier Jahreszeiten in Levi und planen Sie Ihre Reise für die perfekte Zeit.",
    snowConditions: "Schneeverhältnisse:"
  },
  es: {
    title: "Estaciones en Levi",
    description: "Cada estación tiene su propio encanto en Laponia. Descubre las cuatro estaciones en Levi y planifica tu viaje para el momento perfecto.",
    snowConditions: "Condiciones de nieve:"
  },
  fr: {
    title: "Saisons à Levi",
    description: "Chaque saison a son propre charme en Laponie. Découvrez les quatre saisons à Levi et planifiez votre voyage au moment idéal.",
    snowConditions: "Conditions de neige:"
  }
};

interface LeviSeasonsProps {
  lang?: Language;
}

const LeviSeasons = ({ lang = "fi" }: LeviSeasonsProps) => {
  const seasons = seasonsData[lang];
  const section = sectionContent[lang];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {section.title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {section.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {seasons.map((season, index) => (
          <Card 
            key={season.id} 
            className="glass-card border-border/30 overflow-hidden group hover:border-primary/30 transition-all duration-500 relative"
          >
            {/* Color gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${season.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />
            
            {/* Background season image - visible in bottom right corner */}
            <div className="absolute -bottom-8 -right-8 w-80 h-80 md:w-[28rem] md:h-[28rem] overflow-hidden pointer-events-none z-0">
              <OptimizedImage 
                src={seasonImages[index]} 
                alt=""
                className="w-full h-full opacity-45 group-hover:opacity-55 transition-opacity duration-500 rounded-2xl"
                style={{
                  maskImage: 'radial-gradient(ellipse at bottom right, black 25%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 25%, transparent 80%)',
                }}
              />
            </div>
            
            <CardContent className="p-6 md:p-8 relative z-20">
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`p-3 rounded-xl bg-card/80 border border-border/50 ${season.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                  {icons[index]}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                    {season.title}
                  </h3>
                  <p className={`text-sm font-medium ${season.accentColor}`}>
                    {season.period}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-5">
                {season.description}
              </p>

              {/* Highlights */}
              <div className="mb-5">
                <ul className="space-y-2">
                  {season.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${season.accentColor.replace('text-', 'bg-')} flex-shrink-0`} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Snow Info */}
              <div className="pt-4 border-t border-border/30">
                <div className="flex items-start gap-2">
                  <Snowflake className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/70">
                      {section.snowConditions}
                    </span>{" "}
                    {season.snowInfo}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LeviSeasons;
