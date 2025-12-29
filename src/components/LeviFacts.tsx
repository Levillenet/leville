import { Mountain, Snowflake, Timer, Thermometer, Route, Cable } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Language } from "@/translations";

interface Fact {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  labelFi: string;
  labelEn: string;
}

const facts: Fact[] = [
  {
    icon: <Mountain className="w-6 h-6" />,
    value: 531,
    suffix: " m",
    labelFi: "Tunturin korkeus",
    labelEn: "Fell height"
  },
  {
    icon: <Route className="w-6 h-6" />,
    value: 43,
    suffix: "",
    labelFi: "Laskettelurinnettä",
    labelEn: "Ski slopes"
  },
  {
    icon: <Cable className="w-6 h-6" />,
    value: 28,
    suffix: "",
    labelFi: "Hissiä",
    labelEn: "Ski lifts"
  },
  {
    icon: <Snowflake className="w-6 h-6" />,
    value: 230,
    suffix: " km",
    labelFi: "Hiihtolatuja",
    labelEn: "Cross-country trails"
  },
  {
    icon: <Timer className="w-6 h-6" />,
    value: 200,
    suffix: "+",
    labelFi: "Laskettelupäivää/kausi",
    labelEn: "Skiing days/season"
  },
  {
    icon: <Thermometer className="w-6 h-6" />,
    value: 51,
    suffix: "",
    labelFi: "Päivää kaamosta",
    labelEn: "Days of polar night"
  }
];

interface LeviFactsProps {
  lang?: Language;
}

const LeviFacts = ({ lang = "fi" }: LeviFactsProps) => {
  const isEnglish = lang === "en";

  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {isEnglish ? "Levi in Numbers" : "Levi lukuina"}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {isEnglish 
            ? "Finland's most popular ski resort offers unforgettable experiences all year round."
            : "Suomen suosituin hiihtokeskus tarjoaa unohtumattomia elämyksiä ympäri vuoden."}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {facts.map((fact, index) => (
          <div 
            key={index}
            className="glass-card border border-border/30 rounded-xl p-5 text-center group hover:border-primary/40 transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              {fact.icon}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              <AnimatedCounter 
                target={fact.value} 
                suffix={fact.suffix}
                duration={2}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {isEnglish ? fact.labelEn : fact.labelFi}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeviFacts;
