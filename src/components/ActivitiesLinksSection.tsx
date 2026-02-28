import { Link } from "react-router-dom";
import { Sparkles, Compass, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const cards = [
  {
    emoji: "🐕‍🦺",
    title: "Koiravaljakkoajelu",
    desc: "Huskysafari Lapin lumisissa maisemissa. Aja omaa valjakkoa tai nauti kyydistä.",
    href: "/aktiviteetit/koiravaljakkoajelu-levi",
    meta: "Kesto: 2–4 tuntia",
  },
  {
    emoji: "🏔️",
    title: "Moottorikelkkasafari",
    desc: "Tunturimaisemat ja adrenaliini yhdistyvät. Vinkit ensikertalaisen safarille.",
    href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi",
    meta: "Kesto: 2–6 tuntia",
  },
  {
    icon: Sparkles,
    title: "Revontulet Levillä",
    desc: "Paras aika, parhaat paikat ja ennusteet. Levin pimeä taivas on täydellinen revontulille.",
    href: "/revontulet",
    meta: "Kausi: syys–maaliskuu",
  },
  {
    icon: Compass,
    title: "Kaikki aktiviteetit",
    desc: "Katso kaikki talvi- ja kesäaktiviteetit yhdellä sivulla.",
    href: "/opas/aktiviteetit-levi",
    meta: "20+ aktiviteettia",
  },
];

const ActivitiesLinksSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[hsl(218,30%,6%)]">
      <div className="container max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              Aktiviteetit
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Levin suosituimmat elämykset
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Poroajelut, koiravaljakot, moottorikelkat ja paljon muuta
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {cards.map((card, i) => (
            <ScrollReveal key={card.href} delay={i * 0.08}>
              <Link
                to={card.href}
                className="group flex flex-col justify-between h-full rounded-2xl border border-border/30 bg-gradient-to-br from-[hsl(218,28%,12%)] to-[hsl(218,30%,9%)] p-6 md:p-7 hover:border-primary/50 transition-all duration-300"
              >
                <div>
                  <div className="mb-4 text-3xl">
                    {card.emoji ? (
                      <span>{card.emoji}</span>
                    ) : card.icon ? (
                      <card.icon className="w-8 h-8 text-primary" />
                    ) : null}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {card.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground/60">{card.meta}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Lue lisää <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesLinksSection;
