import { Link } from "react-router-dom";
import { ArrowRight, Compass, Mountain, Building2 } from "lucide-react";
import { properties } from "@/data/properties";
import { propertyFi } from "@/data/propertyTranslationsFi";
import { propertyEn } from "@/data/propertyTranslationsEn";
import { propertyPathByLanguage } from "@/data/propertyTranslationStatus";

type Lang = "fi" | "en";
type Location = "Levi Center" | "Front Slope" | "Glacier";

interface Props {
  location: Location;
  currentPropertyId: string;
  lang: Lang;
}

const ui = {
  fi: {
    section1Title: "Suunnittele Levi-lomasi",
    section2Title: "Tekemistä Levillä",
    section3Title: "Samankaltaisia majoituksia",
    viewAll: "Katso kaikki",
    plan: [
      { label: "Miten Leville pääsee", href: "/matka/miten-paasee-leville-helsingista" },
      { label: "Levin matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Lomasuunnittelija", href: "/lomasuunnittelija" },
      { label: "Säätieto Leviltä", href: "/levi/saatieto-levilta" },
    ],
    activities: [
      { label: "Parhaat talviaktiviteetit Levillä", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
      { label: "Koiravaljakkoajelu — vinkit", href: "/aktiviteetit/koiravaljakkoajelu-levi" },
      { label: "Moottorikelkkasafari — vinkit", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
      { label: "Vaellus ja maastopyöräily", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
    ],
    hubByLocation: {
      "Front Slope": { label: "Hiihtäjänkuja — alueen majoitukset", href: "/vuokramokit/hiihtajankuja-levi" },
      "Glacier": { label: "Ratsastajankuja 2 — Glacier-alppitalo", href: "/vuokramokit/ratsastajankuja-levi" },
      "Levi Center": { label: "Postintie 3 — Skistar-talon huoneistot", href: "/vuokramokit/postintie-levi" },
    },
    similarTitle: "Vastaava huoneisto",
  },
  en: {
    section1Title: "Plan your Levi trip",
    section2Title: "Things to do in Levi",
    section3Title: "Similar accommodation",
    viewAll: "View all",
    plan: [
      { label: "How to get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
      { label: "Levi travel guide", href: "/guide/travel-to-levi" },
      { label: "Holiday planner", href: "/en/holiday-planner" },
      { label: "Weather in Levi", href: "/en/levi/weather-in-levi" },
    ],
    activities: [
      { label: "Top winter activities in Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
      { label: "Husky safari tips", href: "/activities/husky-safari-levi" },
      { label: "Snowmobile safari tips", href: "/activities/snowmobile-safari-tips-levi" },
      { label: "Hiking and biking in Levi", href: "/activities/hiking-and-biking-levi" },
    ],
    hubByLocation: {
      "Front Slope": { label: "Apartments at the foot of the slopes", href: "/en/apartments/levi-center" },
      "Glacier": { label: "Penthouse apartments in Levi", href: "/en/apartments/penthouse" },
      "Levi Center": { label: "Large-group accommodation in Levi", href: "/en/apartments/large-group" },
    },
    similarTitle: "Similar property",
  },
} as const;

// Per-location pick of 2 concrete properties to cross-link to.
const similarPicksByLocation: Record<Location, string[]> = {
  "Front Slope": ["glacier-a1", "karhupirtti"],
  "Glacier": ["zero-point-5a2", "karhupirtti"],
  "Levi Center": ["zero-point-5a2", "glacier-a1"],
};

const PropertyCrossLinks = ({ location, currentPropertyId, lang }: Props) => {
  const t = ui[lang];
  const translations = lang === "en" ? propertyEn : propertyFi;

  // Resolve concrete similar properties; filter out current; fall back if needed.
  const picks = similarPicksByLocation[location].filter((id) => id !== currentPropertyId);
  const fallback = ["zero-point-5a2", "glacier-a1", "karhupirtti"].filter(
    (id) => id !== currentPropertyId && !picks.includes(id),
  );
  const finalPicks = [...picks, ...fallback].slice(0, 2);

  const similar = finalPicks
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      id: p.id,
      label: translations[p.id]?.name ?? p.name,
      href: propertyPathByLanguage[lang](p.slug),
    }));

  const hub = t.hubByLocation[location];

  return (
    <section
      aria-label={lang === "fi" ? "Lisää Leville" : "Explore more"}
      className="mt-12 border-t border-border/40 pt-10"
    >
      <div className="grid gap-8 md:grid-cols-3">
        <CrossLinkColumn icon={Compass} title={t.section1Title} items={t.plan} />
        <CrossLinkColumn icon={Mountain} title={t.section2Title} items={t.activities} />
        <CrossLinkColumn
          icon={Building2}
          title={t.section3Title}
          items={[hub, ...similar]}
        />
      </div>
    </section>
  );
};

const CrossLinkColumn = ({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Compass;
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) => (
  <div>
    <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground mb-4">
      <Icon className="w-4 h-4 text-primary" /> {title}
    </h3>
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            to={item.href}
            className="inline-flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-primary/60 group-hover:translate-x-0.5 transition-transform" />
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default PropertyCrossLinks;
