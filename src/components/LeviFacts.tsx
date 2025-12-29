import { Snowflake, Sparkles, Sun, Plane, Droplets } from "lucide-react";
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
    icon: <Snowflake className="w-6 h-6" />,
    value: 200,
    suffix: "",
    labelFi: "Lumipäivää vuodessa",
    labelEn: "Snow days per year"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    value: 200,
    suffix: "",
    labelFi: "Revontuliyötä vuodessa",
    labelEn: "Northern Lights nights/year"
  },
  {
    icon: <Sun className="w-6 h-6" />,
    value: 7,
    suffix: "",
    labelFi: "Viikkoa yötöntä yötä",
    labelEn: "Weeks of midnight sun"
  },
  {
    icon: <Plane className="w-6 h-6" />,
    value: 15,
    suffix: " min",
    labelFi: "Lentokentältä",
    labelEn: "From the airport"
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    value: 1,
    suffix: "",
    labelFi: "Euroopan puhtain ilma & vesi",
    labelEn: "Cleanest air & water in Europe"
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {facts.map((fact, index) => (
          <div 
            key={index}
            className="glass-card border border-border/30 rounded-xl p-5 text-center group hover:border-primary/40 transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              {fact.icon}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {fact.value === 1 ? (
                <span>#1</span>
              ) : (
                <AnimatedCounter 
                  target={fact.value} 
                  suffix={fact.suffix}
                  duration={2}
                />
              )}
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
