import { Link } from "react-router-dom";
import { ArrowRight, Home, MapPin } from "lucide-react";

type Lang = "fi" | "en" | "sv" | "de" | "es" | "fr" | "nl";

interface Props {
  lang?: Lang;
  variant?: "default" | "compact";
  /** Optional override for the main CTA target. */
  href?: string;
  /** Optional override for the secondary link target. */
  secondaryHref?: string;
  /** Optional override for the headline. */
  title?: string;
  /** Optional override for the body copy. */
  body?: string;
}

const COPY: Record<"fi" | "en", { title: string; body: string; cta: string; secondary: string; secondaryHref: string }> = {
  fi: {
    title: "Etsitkö majoitusta Leviltä?",
    body: "Vuokraamme suoraan omistajalta saunallisia huoneistoja ja mökkejä Levin keskustassa. Ei välityskuluja, henkilökohtainen palvelu, kävelymatka rinteille.",
    cta: "Majoitus Levillä – katso kaikki kohteet",
    secondary: "Mökit Levillä",
    secondaryHref: "/mokit-levilla",
  },
  en: {
    title: "Looking for accommodation in Levi?",
    body: "We rent saunaed apartments and cabins in Levi Center directly from the owner. No middleman fees, personal service, walking distance to the slopes.",
    cta: "Accommodation in Levi – see all",
    secondary: "Cabins in Levi",
    secondaryHref: "/en/accommodations",
  },
};

const PRIMARY_HREF_BY_LANG: Record<Lang, string> = {
  fi: "/majoitukset",
  en: "/en/accommodations",
  sv: "/sv/boende",
  de: "/de/unterkuenfte",
  es: "/es/alojamientos",
  fr: "/fr/hebergements",
  nl: "/nl/accommodaties",
};

const MajoitusCallout = ({
  lang = "fi",
  variant = "default",
  href,
  secondaryHref,
  title,
  body,
}: Props) => {
  const copyLang: "fi" | "en" = lang === "fi" ? "fi" : "en";
  const t = COPY[copyLang];
  const primaryHref = href ?? PRIMARY_HREF_BY_LANG[lang];
  const secHref = secondaryHref ?? t.secondaryHref;
  const heading = title ?? t.title;
  const text = body ?? t.body;

  if (variant === "compact") {
    return (
      <aside
        className="my-8 rounded-lg border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
        aria-label={heading}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
          <Home className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{heading}</p>
          <p className="text-sm text-muted-foreground mt-1">{text}</p>
        </div>
        <Link
          to={primaryHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline whitespace-nowrap"
        >
          {t.cta} <ArrowRight className="w-4 h-4" />
        </Link>
      </aside>
    );
  }

  return (
    <aside
      className="my-12 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8"
      aria-label={heading}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{text}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:ml-16">
        <Link
          to={primaryHref}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          {t.cta} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={secHref}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border bg-background font-medium hover:bg-secondary/40 transition-colors"
        >
          {t.secondary}
        </Link>
      </div>
    </aside>
  );
};

export default MajoitusCallout;
