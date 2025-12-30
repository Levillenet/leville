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
  ]
};

const icons = [
  <Leaf className="w-8 h-8" key="leaf" />,
  <Snowflake className="w-8 h-8" key="snowflake" />,
  <Sun className="w-8 h-8" key="sun" />,
  <TreeDeciduous className="w-8 h-8" key="tree" />
];

const seasonImages = [autumnImg, winterImg, springImg, summerImg];

interface LeviSeasonsProps {
  lang?: Language;
}

const LeviSeasons = ({ lang = "fi" }: LeviSeasonsProps) => {
  const seasons = seasonsData[lang];
  const isEnglish = lang === "en";

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {isEnglish ? "Seasons in Levi" : "Levin vuodenajat"}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {isEnglish 
            ? "Each season has its own charm in Lapland. Discover the four seasons in Levi and plan your trip for the perfect time."
            : "Jokaisella vuodenajalla on oma viehätyksensä Lapissa. Tutustu Levin neljään vuodenaikaan ja suunnittele matkasi juuri sinulle sopivaan aikaan."}
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
                      {isEnglish ? "Snow conditions:" : "Lumitilanne:"}
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
