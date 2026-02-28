import { Link } from "react-router-dom";
import { Mountain, TreePine, Flame, UtensilsCrossed, Plane, Thermometer, ChevronRight, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const cards = [
  {
    icon: Mountain,
    title: "Laskettelu Levillä",
    desc: "43 rinnettä, 27 hissiä ja Suomen suurin hiihtokeskus. Aloittelijan ja kokeneemman laskijan opas.",
    href: "/opas/laskettelu-levi",
  },
  {
    icon: TreePine,
    title: "Hiihtoladut ja murtomaahiihto",
    desc: "Yli 230 km huollettua latua tunturimaisemissa. Reitit, palvelut ja vinkit.",
    href: "/opas/hiihtoladut-levi",
  },
  {
    icon: Flame,
    title: "Sauna ja saunaelämykset",
    desc: "Savusaunat, avantouinti ja sähkökiukaan käyttöohje – opas suomalaiseen saunaan.",
    href: "/opas/sauna-levilla",
  },
  {
    icon: UtensilsCrossed,
    title: "Ravintolat ja palvelut",
    desc: "Levin parhaat ravintolat, kaupat, Alko ja käytännön palvelut keskustassa.",
    href: "/opas/ravintolat-ja-palvelut-levilla",
  },
  {
    icon: Plane,
    title: "Miten Leville pääsee?",
    desc: "Lennot, junat, bussit ja autoilu. Käytännön opas perille pääsemiseen.",
    href: "/matka/miten-paasee-leville-helsingista",
  },
  {
    icon: Thermometer,
    title: "Pukeutuminen talvella",
    desc: "Miten pukeutua −25 °C pakkaseen? Kerrosvaatetus ja pakolliset varusteet.",
    href: "/opas/talvivarusteet-leville",
  },
];

const GuideLinksSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[hsl(218,30%,8%)]">
      <div className="container max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              Matkaopas Leville
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Kaikki mitä tarvitset tietää Levin lomasta
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Paikalliset vinkit majoituksesta, aktiviteeteista ja käytännön asioista
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {cards.map((card, i) => (
            <ScrollReveal key={card.href} delay={i * 0.07}>
              <Link
                to={card.href}
                className="group flex flex-col justify-between h-full rounded-xl border border-border/30 bg-[hsl(218,28%,12%)] p-5 md:p-6 hover:bg-[hsl(218,28%,16%)] hover:border-primary/40 transition-all duration-300"
              >
                <div>
                  <card.icon className="w-7 h-7 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.45}>
          <div className="mt-10 text-center">
            <Link
              to="/levi"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Katso kaikki oppaat
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GuideLinksSection;
