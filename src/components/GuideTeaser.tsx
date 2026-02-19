import { Link } from "react-router-dom";
import { ArrowRight, Mountain, Snowflake, Sun, Compass } from "lucide-react";
import { Language } from "@/translations";
import { motion } from "framer-motion";

interface GuideTeaserProps {
  lang?: Language;
}

const content: Record<Language, {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  cta: string;
  href: string;
  features: string[];
}> = {
  fi: {
    badge: "🏔️ Netin kattavin Levi-opas",
    title: "Suunnittele täydellinen",
    highlight: "Levi-loma",
    description: "43 rinnettä, revontulet, husky-safarit, saunaelämykset ja paljon muuta. Kaikki mitä tarvitset unohtumattomaan Lapin lomaan – yhdessä paikassa.",
    cta: "Tutustu Levi-oppaaseen",
    href: "/levi",
    features: ["Aktiviteetit & rinteet", "Vuodenajat & sää", "Matkavinkit & palvelut"]
  },
  en: {
    badge: "🏔️ The most comprehensive Levi guide online",
    title: "Plan your perfect",
    highlight: "Levi holiday",
    description: "43 slopes, northern lights, husky safaris, sauna experiences and much more. Everything you need for an unforgettable Lapland holiday – in one place.",
    cta: "Explore the Levi Guide",
    href: "/en/levi",
    features: ["Activities & slopes", "Seasons & weather", "Travel tips & services"]
  },
  sv: {
    badge: "🏔️ Nätets mest kompletta Levi-guide",
    title: "Planera din perfekta",
    highlight: "Levi-semester",
    description: "43 backar, norrsken, huskyäventyr, bastuupplevelser och mycket mer. Allt du behöver för en oförglömlig Lapplandsemester – på ett ställe.",
    cta: "Utforska Levi-guiden",
    href: "/sv/levi",
    features: ["Aktiviteter & backar", "Årstider & väder", "Resetips & service"]
  },
  de: {
    badge: "🏔️ Der umfassendste Levi-Guide im Netz",
    title: "Planen Sie Ihren perfekten",
    highlight: "Levi-Urlaub",
    description: "43 Pisten, Nordlichter, Husky-Safaris, Sauna-Erlebnisse und vieles mehr. Alles für einen unvergesslichen Lappland-Urlaub – an einem Ort.",
    cta: "Levi-Guide entdecken",
    href: "/de/levi",
    features: ["Aktivitäten & Pisten", "Jahreszeiten & Wetter", "Reisetipps & Services"]
  },
  es: {
    badge: "🏔️ La guía de Levi más completa en internet",
    title: "Planifica tus vacaciones",
    highlight: "perfectas en Levi",
    description: "43 pistas, auroras boreales, safaris con huskies, experiencias de sauna y mucho más. Todo lo que necesitas para unas vacaciones inolvidables en Laponia.",
    cta: "Explorar la guía de Levi",
    href: "/es/levi",
    features: ["Actividades y pistas", "Estaciones y clima", "Consejos de viaje"]
  },
  fr: {
    badge: "🏔️ Le guide de Levi le plus complet en ligne",
    title: "Planifiez vos vacances",
    highlight: "parfaites à Levi",
    description: "43 pistes, aurores boréales, safaris en traîneau, expériences de sauna et bien plus. Tout pour des vacances inoubliables en Laponie.",
    cta: "Découvrir le guide de Levi",
    href: "/fr/levi",
    features: ["Activités & pistes", "Saisons & météo", "Conseils voyage & services"]
  },
  nl: {
    badge: "🏔️ De meest uitgebreide Levi-gids online",
    title: "Plan uw perfecte",
    highlight: "Levi-vakantie",
    description: "43 pistes, noorderlicht, husky-safari's, sauna-ervaringen en nog veel meer. Alles wat u nodig heeft voor een onvergetelijke Lapland-vakantie – op één plek.",
    cta: "Ontdek de Levi-gids",
    href: "/nl/levi",
    features: ["Activiteiten & pistes", "Seizoenen & weer", "Reistips & voorzieningen"]
  }
};

const featureIcons = [Snowflake, Sun, Compass];

const GuideTeaser = ({ lang = "fi" }: GuideTeaserProps) => {
  const c = content[lang];

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to={c.href}
            className="group block relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            {/* Decorative mountain icon */}
            <Mountain className="absolute -right-4 -top-4 w-32 h-32 text-primary/5 rotate-12 group-hover:text-primary/10 transition-colors duration-500" />

            {/* Badge */}
            <span className="inline-block text-xs sm:text-sm font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
              {c.badge}
            </span>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 relative z-10">
              {c.title}{" "}
              <span className="text-primary">{c.highlight}</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground mb-5 max-w-2xl relative z-10 leading-relaxed">
              {c.description}
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {c.features.map((feature, i) => {
                const Icon = featureIcons[i];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-foreground/80 bg-white/10 backdrop-blur-sm border border-border/30 rounded-full px-3 py-1"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {feature}
                  </span>
                );
              })}
            </div>

            {/* CTA */}
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-primary group-hover:gap-3 transition-all duration-300">
              {c.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GuideTeaser;
