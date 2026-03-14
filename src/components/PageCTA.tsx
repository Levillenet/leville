import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Language, routeConfig } from "@/translations";

interface PageCTAProps {
  lang?: Language;
}

const PageCTA = ({ lang = "fi" }: PageCTAProps) => {
  const content: Record<Language, { heading: string; bookLabel: string; contactLabel: string }> = {
    fi: { heading: "Löydä unelmamajoituksesi Leviltä", bookLabel: "Varaa Levin lomasi tästä!", contactLabel: "Ota yhteyttä" },
    en: { heading: "Find your dream accommodation in Levi", bookLabel: "Book your Levi holiday here!", contactLabel: "Contact us" },
    sv: { heading: "Hitta ditt drömboende i Levi", bookLabel: "Boka din Levi-semester här!", contactLabel: "Kontakta oss" },
    de: { heading: "Finden Sie Ihre Traumunterkunft in Levi", bookLabel: "Buchen Sie Ihren Levi-Urlaub hier!", contactLabel: "Kontaktieren Sie uns" },
    es: { heading: "Encuentra tu alojamiento ideal en Levi", bookLabel: "¡Reserva tus vacaciones en Levi aquí!", contactLabel: "Contáctanos" },
    fr: { heading: "Trouvez votre hébergement idéal à Levi", bookLabel: "Réservez vos vacances à Levi ici !", contactLabel: "Contactez-nous" },
    nl: { heading: "Vind uw droomaccommodatie in Levi", bookLabel: "Boek uw Levi-vakantie hier!", contactLabel: "Neem contact op" },
  };

  const c = content[lang];
  const moderUrl = lang === "fi" ? "https://app.moder.fi/levillenet" : "https://app.moder.fi/levillenet?lang=en";

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">
            {c.heading}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={moderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-xl transition-colors"
            >
              {c.bookLabel}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to={routeConfig.contact[lang]}
              className="inline-flex items-center gap-2 border border-border hover:border-primary/50 text-foreground font-medium px-6 py-3 rounded-xl transition-colors"
            >
              {c.contactLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageCTA;
