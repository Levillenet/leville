import { Snowflake, Sparkles, Sun, Plane, Droplets, Mountain, Route, Cable, Timer } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Language } from "@/translations";

interface Fact {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: Record<Language, string>;
  isSpecial?: boolean;
}

const skiResortFacts: Fact[] = [
  {
    icon: <Mountain className="w-6 h-6" />,
    value: 531,
    suffix: " m",
    label: {
      fi: "Tunturin korkeus", en: "Fell height", sv: "Fjällets höjd",
      de: "Fjellhöhe", es: "Altura del monte", fr: "Hauteur du fjell",
      nl: "Fjellhoogte"
    }
  },
  {
    icon: <Route className="w-6 h-6" />,
    value: 43,
    suffix: "",
    label: {
      fi: "Laskettelurinnettä", en: "Ski slopes", sv: "Skidbackar",
      de: "Skipisten", es: "Pistas de esquí", fr: "Pistes de ski",
      nl: "Skipistes"
    }
  },
  {
    icon: <Cable className="w-6 h-6" />,
    value: 28,
    suffix: "",
    label: {
      fi: "Hissiä", en: "Ski lifts", sv: "Skidliftar",
      de: "Skilifte", es: "Remontes", fr: "Remontées",
      nl: "Skiliften"
    }
  },
  {
    icon: <Snowflake className="w-6 h-6" />,
    value: 230,
    suffix: " km",
    label: {
      fi: "Hiihtolatuja", en: "Cross-country trails", sv: "Längdskidspår",
      de: "Langlaufloipen", es: "Pistas de esquí de fondo", fr: "Pistes de ski de fond",
      nl: "Langlaufloipes"
    }
  },
  {
    icon: <Timer className="w-6 h-6" />,
    value: 200,
    suffix: "+",
    label: {
      fi: "Laskettelupäivää/kausi", en: "Skiing days/season", sv: "Skiddagar/säsong",
      de: "Skitage/Saison", es: "Días de esquí/temporada", fr: "Jours de ski/saison",
      nl: "Skidagen/seizoen"
    }
  }
];

const interestingFacts: Fact[] = [
  {
    icon: <Snowflake className="w-6 h-6" />,
    value: 200,
    suffix: "",
    label: {
      fi: "Lumipäivää vuodessa", en: "Snow days per year", sv: "Snödagar per år",
      de: "Schneetage pro Jahr", es: "Días de nieve al año", fr: "Jours de neige par an",
      nl: "Sneeuwdagen per jaar"
    }
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    value: 200,
    suffix: "",
    label: {
      fi: "Revontuliyötä vuodessa", en: "Northern Lights nights/year", sv: "Norrskensnätter/år",
      de: "Polarlicht-Nächte/Jahr", es: "Noches de aurora boreal/año", fr: "Nuits d'aurores boréales/an",
      nl: "Noorderlicht nachten/jaar"
    }
  },
  {
    icon: <Sun className="w-6 h-6" />,
    value: 7,
    suffix: "",
    label: {
      fi: "Viikkoa yötöntä yötä", en: "Weeks of midnight sun", sv: "Veckor av midnattssol",
      de: "Wochen Mitternachtssonne", es: "Semanas de sol de medianoche", fr: "Semaines de soleil de minuit",
      nl: "Weken middernachtzon"
    }
  },
  {
    icon: <Plane className="w-6 h-6" />,
    value: 15,
    suffix: " min",
    label: {
      fi: "Lentokentältä", en: "From the airport", sv: "Från flygplatsen",
      de: "Vom Flughafen", es: "Desde el aeropuerto", fr: "De l'aéroport",
      nl: "Vanaf de luchthaven"
    }
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    value: 1,
    suffix: "",
    label: {
      fi: "Euroopan puhtain ilma & vesi", en: "Cleanest air & water in Europe", sv: "Europas renaste luft & vatten",
      de: "Sauberste Luft & Wasser Europas", es: "El aire y agua más limpios de Europa", fr: "L'air et l'eau les plus purs d'Europe",
      nl: "Schoonste lucht & water van Europa"
    },
    isSpecial: true
  }
];

const sectionContent: Record<Language, { title: string; description: string }> = {
  fi: {
    title: "Mielenkiintoisia Levi-faktoja",
    description: "Tutustu siihen, mikä tekee Levistä ainutlaatuisen kohteen Suomen Lapissa."
  },
  en: {
    title: "Interesting Levi Facts",
    description: "Discover what makes Levi a truly unique destination in Finnish Lapland."
  },
  sv: {
    title: "Intressanta Levi-fakta",
    description: "Upptäck vad som gör Levi till en unik destination i finska Lappland."
  },
  de: {
    title: "Interessante Levi-Fakten",
    description: "Entdecken Sie, was Levi zu einem einzigartigen Reiseziel in Finnisch-Lappland macht."
  },
  es: {
    title: "Datos interesantes sobre Levi",
    description: "Descubre qué hace de Levi un destino único en la Laponia finlandesa."
  },
  fr: {
    title: "Faits intéressants sur Levi",
    description: "Découvrez ce qui fait de Levi une destination unique en Laponie finlandaise."
  },
  nl: {
    title: "Interessante Levi-feiten",
    description: "Ontdek wat Levi tot een unieke bestemming in Fins Lapland maakt."
  }
};

interface LeviFactsProps {
  lang?: Language;
}

const LeviFacts = ({ lang = "fi" }: LeviFactsProps) => {
  const section = sectionContent[lang];

  const renderFactCard = (fact: Fact, index: number) => (
    <div 
      key={index}
      className="glass-card border border-border/30 rounded-xl p-5 text-center group hover:border-primary/40 transition-all duration-300"
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
        {fact.icon}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
        {fact.isSpecial ? (
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
        {fact.label[lang]}
      </p>
    </div>
  );

  const skiResortTitle: Record<Language, string> = {
    fi: "Levin hiihtokeskus",
    en: "Levi Ski Resort",
    sv: "Levi Skidort",
    de: "Skigebiet Levi",
    es: "Estación de esquí de Levi",
    fr: "Station de ski de Levi",
    nl: "Skigebied Levi"
  };

  return (
    <>
      {/* Ski Resort Facts */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
          {skiResortTitle[lang]}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {skiResortFacts.map((fact, index) => renderFactCard(fact, index))}
        </div>
      </section>

      {/* Interesting Levi Facts */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {interestingFacts.map((fact, index) => renderFactCard(fact, index))}
        </div>
      </section>
    </>
  );
};

export default LeviFacts;
