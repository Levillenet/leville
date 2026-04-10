import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { BookingTermsContent } from "@/components/BookingTermsContent";
import { BookingTermsPdfDownload } from "@/components/BookingTermsPdfDownload";
import type { Language } from "@/translations";

interface VarausehdotProps {
  lang?: Language;
}

const getMetaContent = (lang: Language) => {
  const meta = {
    fi: {
      title: "Varausehdot | Leville.net",
      description: "Leville.net varausehdot - peruutusehdot, majoitusohjeet ja vastuut. Lue vuokrausehdot ennen majoituksen varaamista.",
      keywords: "Leville varausehdot, Levi majoitus ehdot, peruutusehdot Levi, vuokrausehdot",
      canonical: "https://leville.net/varausehdot",
      locale: "fi_FI",
      heading: "Varausehdot",
    },
    en: {
      title: "Booking Terms | Leville.net",
      description: "Leville.net booking terms - cancellation policy, accommodation guidelines and responsibilities. Read the rental terms before booking.",
      keywords: "Leville booking terms, Levi accommodation terms, cancellation policy Levi, rental terms",
      canonical: "https://leville.net/en/booking-terms",
      locale: "en_GB",
      heading: "Booking Terms",
    },
    sv: {
      title: "Bokningsvillkor | Leville.net",
      description: "Leville.net bokningsvillkor - avbokningsregler, boendeinstruktioner och ansvar. Läs hyresvillkoren innan du bokar.",
      keywords: "Leville bokningsvillkor, Levi boende villkor, avbokningsregler Levi, hyresvillkor",
      canonical: "https://leville.net/sv/bokningsvillkor",
      locale: "sv_SE",
      heading: "Bokningsvillkor",
    },
    de: {
      title: "Buchungsbedingungen | Leville.net",
      description: "Leville.net Buchungsbedingungen - Stornierungsbedingungen, Unterkunftsrichtlinien und Verantwortlichkeiten. Lesen Sie die Mietbedingungen vor der Buchung.",
      keywords: "Leville Buchungsbedingungen, Levi Unterkunft Bedingungen, Stornierungsbedingungen Levi, Mietbedingungen",
      canonical: "https://leville.net/de/buchungsbedingungen",
      locale: "de_DE",
      heading: "Buchungsbedingungen",
    },
    es: {
      title: "Términos de Reserva | Leville.net",
      description: "Términos de reserva de Leville.net - política de cancelación, directrices de alojamiento y responsabilidades. Lea los términos de alquiler antes de reservar.",
      keywords: "Leville términos de reserva, Levi alojamiento términos, política de cancelación Levi, términos de alquiler",
      canonical: "https://leville.net/es/terminos-de-reserva",
      locale: "es_ES",
      heading: "Términos de Reserva",
    },
    fr: {
      title: "Conditions de Réservation | Leville.net",
      description: "Conditions de réservation Leville.net - politique d'annulation, directives d'hébergement et responsabilités. Lisez les conditions de location avant de réserver.",
      keywords: "Leville conditions de réservation, Levi hébergement conditions, politique d'annulation Levi, conditions de location",
      canonical: "https://leville.net/fr/conditions-de-reservation",
      locale: "fr_FR",
      heading: "Conditions de Réservation",
    },
    nl: {
      title: "Boekingsvoorwaarden | Leville.net",
      description: "Boekingsvoorwaarden van Leville.net - annuleringsbeleid, accommodatierichtlijnen en verantwoordelijkheden. Lees de huurvoorwaarden voor het boeken.",
      keywords: "Leville boekingsvoorwaarden, Levi accommodatie voorwaarden, annuleringsbeleid Levi, huurvoorwaarden",
      canonical: "https://leville.net/nl/boekingsvoorwaarden",
      locale: "nl_NL",
      heading: "Boekingsvoorwaarden",
    },
  };
  return meta[lang];
};

const Varausehdot = ({ lang = "fi" }: VarausehdotProps) => {
  const meta = getMetaContent(lang);
  
  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={meta.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={meta.locale} />
        <meta property="og:site_name" content="Leville.net" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{meta.heading}</h1>
              <p className="text-xl text-muted-foreground mb-6">LEVILLE.NET</p>
              <div className="flex justify-center">
                <BookingTermsPdfDownload currentLang={lang} />
              </div>
            </section>

            <BookingTermsContent lang={lang} />
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default Varausehdot;
