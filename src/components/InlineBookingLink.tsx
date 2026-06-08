import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Lang = "fi" | "en" | "sv" | "de" | "es" | "fr" | "nl";

interface BaseProps {
  href: string;
  lang?: Lang;
}

interface InlineProps extends BaseProps {
  variant?: "inline";
  children: React.ReactNode;
}

interface TipProps extends BaseProps {
  variant: "tip";
  text: string;
  linkText: string;
  emoji?: string;
}

type Props = InlineProps | TipProps;

/**
 * Tasteful inline booking link used inside guide prose.
 * - `inline`: a single <Link> styled with the brand primary, underlined on hover.
 * - `tip`: a pull-quote row (left border + emoji + italic sentence + link).
 */
const InlineBookingLink = (props: Props) => {
  if (props.variant === "tip") {
    const { href, text, linkText, emoji = "💡" } = props;
    return (
      <p
        className="my-6 pl-4 border-l-2 border-primary/60 text-foreground/90 italic text-[15px] leading-relaxed"
        role="note"
      >
        <span className="not-italic mr-1.5" aria-hidden>{emoji}</span>
        {text}{" "}
        <Link
          to={href}
          className="not-italic font-medium text-primary underline-offset-4 hover:underline inline-flex items-center gap-0.5"
        >
          {linkText}
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
