import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Lang = "fi" | "en" | "sv" | "de" | "es" | "fr" | "nl";

type Intent =
  | "stayCentre"        // generic — stay walking distance
  | "summerStay"        // summer / midnight sun
  | "skiSlopeside"      // skiing — slopeside
  | "trackside"         // cross-country — by the trails
  | "familySpace"       // family-friendly apartments
  | "groupCabin"        // cabins for groups
  | "directNoFees"      // pricing — book direct
  | "glacierPrime"      // Glacier Apartments — ~20 m to track, ~150 m to main slope
  | "auroraStay";       // northern lights — dark spots a short walk away

interface Preset {
  text: string;
  linkText: string;
  href: string;
  emoji?: string;
}

const PRESETS: Record<Intent, Partial<Record<Lang, Preset>>> = {
  stayCentre: {
    fi: { text: "Vinkki: kävelymatkan päässä ravintoloista ja rinteistä —", linkText: "katso vapaat huoneistot Levin keskustasta", href: "/levi-keskusta-huoneistot", emoji: "🏔️" },
    en: { text: "Tip: stay walking distance from restaurants and lifts —", linkText: "see free apartments in Levi centre", href: "/en/apartments/levi-center-apartments", emoji: "🏔️" },
  },
  summerStay: {
    fi: { text: "Vinkki: kesälomalla keskiyön aurinko maistuu parhaiten omalla terassilla —", linkText: "katso kesän vapaat majoitukset", href: "/majoitukset", emoji: "☀️" },
    en: { text: "Tip: enjoy the midnight sun from your own terrace —", linkText: "browse summer accommodations in Levi", href: "/en/accommodations", emoji: "☀️" },
  },
  skiSlopeside: {
    fi: { text: "Vinkki: keskeinen sijainti palveluiden vieressä, n. 700 m hisseille —", linkText: "katso Skistar Postintie 3 -huoneistot", href: "/kadut/skistar-postintie-3", emoji: "⛷️" },
    en: { text: "Tip: central location next to all services, about 700 m to the lifts —", linkText: "see Skistar Postintie 3 apartments", href: "/en/apartments/levi-center-apartments", emoji: "⛷️" },
  },
  trackside: {
    fi: { text: "Vinkki: hiihtoladulle vain n. 20 m ovelta —", linkText: "katso Glacier Apartments Eturinteen Alppikylässä", href: "/kadut/glacier-apartments-levi", emoji: "🎿" },
    en: { text: "Tip: cross-country track just ~20 m from the door —", linkText: "see Glacier Apartments in the Front Slope Alpine Village", href: "/en/accommodations", emoji: "🎿" },
  },
  familySpace: {
    fi: { text: "Vinkki: lapsiperheelle tilaa, sauna ja oma keittiö —", linkText: "katso 4–8 hengen huoneistot keskustassa", href: "/majoitukset", emoji: "👨‍👩‍👧‍👦" },
    en: { text: "Tip: spacious family apartments with sauna and kitchen —", linkText: "see apartments for 4–8 in Levi centre", href: "/en/accommodations", emoji: "👨‍👩‍👧‍👦" },
  },
  groupCabin: {
    fi: { text: "Vinkki: isolle porukalle oma mökki saunalla —", linkText: "katso Levin mökit", href: "/mokit-levilla", emoji: "🏡" },
    en: { text: "Tip: own cabin with sauna for bigger groups —", linkText: "browse cabins in Levi", href: "/en/accommodations", emoji: "🏡" },
  },
  directNoFees: {
    fi: { text: "Säästä välityskuluissa —", linkText: "varaa majoitus suoraan omistajalta", href: "/majoitukset", emoji: "💶" },
    en: { text: "Skip the booking fees —", linkText: "book directly from the owner", href: "/en/accommodations", emoji: "💶" },
  },
  glacierPrime: {
    fi: { text: "Vinkki: vain n. 20 m hiihtoladulta ja n. 150 m päärinteestä, palvelut askelmatkan päässä —", linkText: "katso Glacier Apartments Eturinteen Alppikylässä", href: "/kadut/glacier-apartments-levi", emoji: "🏔️" },
    en: { text: "Tip: just ~20 m to the cross-country track and ~150 m to the main slope, services on your doorstep —", linkText: "see Glacier Apartments in the Front Slope Alpine Village", href: "/en/accommodations", emoji: "🏔️" },
  },
};

interface BaseProps {
  lang?: Lang;
}

interface InlineProps extends BaseProps {
  variant?: "inline";
  href: string;
  children: React.ReactNode;
}

interface TipPresetProps extends BaseProps {
  variant: "tip";
  intent: Intent;
  /** Optional overrides */
  text?: string;
  linkText?: string;
  href?: string;
  emoji?: string;
}

interface TipCustomProps extends BaseProps {
  variant: "tip";
  intent?: never;
  text: string;
  linkText: string;
  href: string;
  emoji?: string;
}

type Props = InlineProps | TipPresetProps | TipCustomProps;

const resolveCopy = (lang: Lang, intent: Intent, overrides: Partial<Preset>): Preset => {
  const presetForLang = PRESETS[intent][lang] ?? PRESETS[intent].en ?? PRESETS[intent].fi!;
  return { ...presetForLang, ...overrides };
};

/**
 * Tasteful inline booking link used inside guide prose.
 * - `inline`: a single <Link> styled with the brand primary, underlined on hover.
 * - `tip`: a pull-quote row (left border + emoji + sentence + link).
 *   Supply `intent` for a preset (multilingual), or pass `text`/`linkText`/`href` directly.
 */
const InlineBookingLink = (props: Props) => {
  if (props.variant === "tip") {
    const lang = props.lang ?? "fi";
    let copy: Preset;
    if ("intent" in props && props.intent) {
      copy = resolveCopy(lang, props.intent, {
        text: props.text,
        linkText: props.linkText,
        href: props.href,
        emoji: props.emoji,
      });
    } else {
      const p = props as TipCustomProps;
      copy = { text: p.text, linkText: p.linkText, href: p.href, emoji: p.emoji };
    }
    const emoji = copy.emoji ?? "💡";
    return (
      <p
        className="my-6 pl-4 border-l-2 border-primary/60 text-foreground/90 italic text-[15px] leading-relaxed"
        role="note"
      >
        <span className="not-italic mr-1.5" aria-hidden>{emoji}</span>
        {copy.text}{" "}
        <Link
          to={copy.href}
          className="not-italic font-medium text-primary underline-offset-4 hover:underline inline-flex items-center gap-0.5"
        >
          {copy.linkText}
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
        </Link>
        .
      </p>
    );
  }

  const { href, children } = props as InlineProps;
  return (
    <Link
      to={href}
      className="text-primary font-medium underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors"
    >
      {children}
    </Link>
  );
};

export default InlineBookingLink;
