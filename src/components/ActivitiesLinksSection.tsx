import { Link } from "react-router-dom";
import { Sparkles, Compass, ArrowRight, LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Language } from "@/translations";

interface ActivityCard {
  emoji?: string;
  icon?: LucideIcon;
  title: string;
  desc: string;
  href: string;
  meta: string;
}

interface ActivitiesContent {
  badge: string;
  heading: string;
  subtitle: string;
  cards: ActivityCard[];
}

const content: Record<Language, ActivitiesContent> = {
  fi: {
    badge: "Aktiviteetit",
    heading: "Levin suosituimmat elämykset",
    subtitle: "Poroajelut, koiravaljakot, moottorikelkat ja paljon muuta",
    cards: [
      { emoji: "🐕‍🦺", title: "Koiravaljakkoajelu", desc: "Huskysafari Lapin lumisissa maisemissa. Aja omaa valjakkoa tai nauti kyydistä.", href: "/aktiviteetit/koiravaljakkoajelu-levi", meta: "Kesto: 2–4 tuntia" },
      { emoji: "🏔️", title: "Moottorikelkkasafari", desc: "Tunturimaisemat ja adrenaliini yhdistyvät. Vinkit ensikertalaisen safarille.", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi", meta: "Kesto: 2–6 tuntia" },
      { icon: Sparkles, title: "Revontulet Levillä", desc: "Paras aika, parhaat paikat ja ennusteet. Levin pimeä taivas on täydellinen revontulille.", href: "/revontulet", meta: "Kausi: syys–maaliskuu" },
      { icon: Compass, title: "Kaikki aktiviteetit", desc: "Katso kaikki talvi- ja kesäaktiviteetit yhdellä sivulla.", href: "/opas/aktiviteetit-levi", meta: "20+ aktiviteettia" },
    ],
  },
  en: {
    badge: "Activities",
    heading: "Levi's most popular experiences",
    subtitle: "Husky safaris, snowmobiles, Northern Lights and much more",
    cards: [
      { emoji: "🐕‍🦺", title: "Husky Safari", desc: "Dog sledding through snowy Lapland. Drive your own team or enjoy the ride.", href: "/activities/husky-safari-levi", meta: "Duration: 2–4 hours" },
      { emoji: "🏔️", title: "Snowmobile Safari", desc: "Fell landscapes meet adrenaline. Tips for your first snowmobile safari.", href: "/activities/snowmobile-safari-tips-levi", meta: "Duration: 2–6 hours" },
      { icon: Sparkles, title: "Northern Lights", desc: "Best times, best spots and forecasts. Levi's dark skies are perfect for aurora.", href: "/en/northern-lights", meta: "Season: Sep–Mar" },
      { icon: Compass, title: "All Activities", desc: "Browse all winter and summer activities on one page.", href: "/guide/activities-in-levi", meta: "20+ activities" },
    ],
  },
  de: {
    badge: "Aktivitäten",
    heading: "Die beliebtesten Erlebnisse in Levi",
    subtitle: "Hundeschlittenfahrten, Schneemobile, Nordlichter und vieles mehr",
    cards: [
      { emoji: "🐕‍🦺", title: "Husky-Safari", desc: "Hundeschlittenfahrt durch verschneite Landschaften. Steuere dein eigenes Gespann.", href: "/de/levi", meta: "Dauer: 2–4 Stunden" },
      { emoji: "🏔️", title: "Schneemobil-Safari", desc: "Fjälllandschaft trifft Adrenalin. Tipps für deine erste Safari.", href: "/de/levi", meta: "Dauer: 2–6 Stunden" },
      { icon: Sparkles, title: "Nordlichter", desc: "Beste Zeiten, beste Orte und Vorhersagen. Levis dunkler Himmel ist perfekt.", href: "/de/nordlichter", meta: "Saison: Sep–Mär" },
      { icon: Compass, title: "Alle Aktivitäten", desc: "Entdecke alle Winter- und Sommeraktivitäten auf einer Seite.", href: "/de/levi", meta: "20+ Aktivitäten" },
    ],
  },
  sv: {
    badge: "Aktiviteter",
    heading: "Levis mest populära upplevelser",
    subtitle: "Hundspann, snöskotrar, norrsken och mycket mer",
    cards: [
      { emoji: "🐕‍🦺", title: "Hundspannssafari", desc: "Hundspannsåkning genom Lapplands snölandskap. Kör ditt eget spann.", href: "/sv/levi", meta: "Längd: 2–4 timmar" },
      { emoji: "🏔️", title: "Snöskoterutflykt", desc: "Fjällandskap möter adrenalin. Tips för din första utflykt.", href: "/sv/levi", meta: "Längd: 2–6 timmar" },
      { icon: Sparkles, title: "Norrsken", desc: "Bästa tiderna, platserna och prognoser. Levis mörka himmel är perfekt.", href: "/sv/levi", meta: "Säsong: sep–mar" },
      { icon: Compass, title: "Alla aktiviteter", desc: "Se alla vinter- och sommaraktiviteter på en sida.", href: "/sv/levi", meta: "20+ aktiviteter" },
    ],
  },
  fr: {
    badge: "Activités",
    heading: "Les expériences les plus populaires à Levi",
    subtitle: "Traîneaux à chiens, motoneiges, aurores boréales et bien plus",
    cards: [
      { emoji: "🐕‍🦺", title: "Safari en traîneau", desc: "Balade en traîneau dans les paysages enneigés de Laponie. Conduisez votre attelage.", href: "/fr/levi", meta: "Durée : 2–4 h" },
      { emoji: "🏔️", title: "Safari motoneige", desc: "Paysages de fjell et adrénaline. Conseils pour votre premier safari.", href: "/fr/levi", meta: "Durée : 2–6 h" },
      { icon: Sparkles, title: "Aurores boréales", desc: "Meilleurs moments, spots et prévisions. Le ciel sombre de Levi est idéal.", href: "/fr/levi", meta: "Saison : sep–mar" },
      { icon: Compass, title: "Toutes les activités", desc: "Découvrez toutes les activités d'hiver et d'été.", href: "/fr/levi", meta: "20+ activités" },
    ],
  },
  es: {
    badge: "Actividades",
    heading: "Las experiencias más populares en Levi",
    subtitle: "Trineos de perros, motos de nieve, auroras boreales y mucho más",
    cards: [
      { emoji: "🐕‍🦺", title: "Safari de huskies", desc: "Trineo tirado por perros por los paisajes nevados de Laponia.", href: "/es/levi", meta: "Duración: 2–4 h" },
      { emoji: "🏔️", title: "Safari en motonieve", desc: "Paisajes de tunturi y adrenalina. Consejos para tu primer safari.", href: "/es/levi", meta: "Duración: 2–6 h" },
      { icon: Sparkles, title: "Aurora boreal", desc: "Mejores momentos, lugares y previsiones. El cielo oscuro de Levi es perfecto.", href: "/es/levi", meta: "Temporada: sep–mar" },
      { icon: Compass, title: "Todas las actividades", desc: "Descubre todas las actividades de invierno y verano.", href: "/es/levi", meta: "20+ actividades" },
    ],
  },
  nl: {
    badge: "Activiteiten",
    heading: "De populairste ervaringen in Levi",
    subtitle: "Husky-safari's, sneeuwscooters, noorderlicht en nog veel meer",
    cards: [
      { emoji: "🐕‍🦺", title: "Husky-safari", desc: "Hondensleetocht door besneeuwde Lapse landschappen. Bestuur je eigen team.", href: "/nl/activiteiten/husky-safari-levi", meta: "Duur: 2–4 uur" },
      { emoji: "🏔️", title: "Sneeuwscootersafari", desc: "Fjälllandschap ontmoet adrenaline. Tips voor je eerste safari.", href: "/nl/levi", meta: "Duur: 2–6 uur" },
      { icon: Sparkles, title: "Noorderlicht", desc: "Beste tijden, plekken en verwachtingen. De donkere lucht van Levi is perfect.", href: "/nl/noorderlicht", meta: "Seizoen: sep–mrt" },
      { icon: Compass, title: "Alle activiteiten", desc: "Bekijk alle winter- en zomeractiviteiten op één pagina.", href: "/nl/gids/activiteiten-in-levi", meta: "20+ activiteiten" },
    ],
  },
};

interface ActivitiesLinksSectionProps {
  lang?: Language;
}

const ActivitiesLinksSection = ({ lang = "fi" }: ActivitiesLinksSectionProps) => {
  const t = content[lang];

  return (
    <section className="relative py-16 md:py-24 bg-[hsl(218,30%,6%)]">
      <div className="container max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {t.cards.map((card, i) => (
            <ScrollReveal key={card.href + card.title} delay={i * 0.08}>
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
                    <ArrowRight className="w-3.5 h-3.5" />
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
