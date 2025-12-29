import { Leaf, Snowflake, Sun, TreeDeciduous } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Season {
  id: string;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  snowInfo: string;
  icon: React.ReactNode;
  accentColor: string;
  bgGradient: string;
}

const seasons: Season[] = [
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
    icon: <Leaf className="w-8 h-8" />,
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
    icon: <Snowflake className="w-8 h-8" />,
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
    icon: <Sun className="w-8 h-8" />,
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
    icon: <TreeDeciduous className="w-8 h-8" />,
    accentColor: "text-emerald-400",
    bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent"
  }
];

const LeviSeasons = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Levin vuodenajat
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Jokaisella vuodenajalla on oma viehätyksensä Lapissa. Tutustu Levin neljään vuodenaikaan ja suunnittele matkasi juuri sinulle sopivaan aikaan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {seasons.map((season) => (
          <Card 
            key={season.id} 
            className="glass-card border-border/30 overflow-hidden group hover:border-primary/30 transition-all duration-500"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${season.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <CardContent className="p-6 md:p-8 relative">
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`p-3 rounded-xl bg-card/80 border border-border/50 ${season.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                  {season.icon}
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
                  {season.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
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
                    <span className="font-medium text-foreground/70">Lumitilanne:</span>{" "}
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
