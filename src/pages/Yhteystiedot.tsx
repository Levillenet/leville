import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { getTranslations, Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";

type SocialType = "whatsapp" | "facebook" | "instagram" | null;

const getSocialIcon = (socialType: SocialType, className: string) => {
  switch (socialType) {
    case "whatsapp":
      return <WhatsAppIcon className={className} />;
    case "facebook":
      return <FacebookIcon className={className} />;
    case "instagram":
      return <InstagramIcon className={className} />;
    default:
      return null;
  }
};

const getSocialColor = (socialType: SocialType) => {
  switch (socialType) {
    case "whatsapp":
      return { bg: "bg-green-500/20", text: "text-green-500", hover: "hover:text-green-400" };
    case "facebook":
      return { bg: "bg-blue-600/20", text: "text-blue-500", hover: "hover:text-blue-400" };
    case "instagram":
      return { bg: "bg-pink-500/20", text: "text-pink-500", hover: "hover:text-pink-400" };
    default:
      return { bg: "bg-primary/20", text: "text-primary", hover: "hover:text-primary" };
  }
};

interface YhteystiedotProps {
  lang?: Language;
}

const Yhteystiedot = ({ lang = "fi" }: YhteystiedotProps) => {
  const t = getTranslations(lang).yhteystiedot;
  const location = useLocation();

  const contactInfo = [
    {
      icon: Mail,
      title: t.contactInfo.email,
      value: "info@leville.net",
      href: "mailto:info@leville.net",
      socialType: null as SocialType,
    },
    {
      icon: Phone,
      title: t.contactInfo.phone,
      value: "+358 44 131 313",
      href: "tel:+35844131313",
      socialType: null as SocialType,
    },
    {
      icon: "whatsapp",
      title: "WhatsApp",
      value: "+358 44 131 313",
      href: "https://wa.me/35844131313",
      socialType: "whatsapp" as SocialType,
    },
    {
      icon: "facebook",
      title: "Facebook",
      value: "Leville.net",
      href: "https://facebook.com/leville.net",
      socialType: "facebook" as SocialType,
    },
    {
      icon: "instagram",
      title: "Instagram",
      value: "@leville.net",
      href: "https://instagram.com/leville.net",
      socialType: "instagram" as SocialType,
    },
    {
      icon: MapPin,
      title: t.contactInfo.address,
      value: t.contactInfo.addressValue,
      href: null,
      socialType: null as SocialType,
    },
    {
      icon: Clock,
      title: t.contactInfo.customerService,
      value: t.contactInfo.hoursValue,
      href: null,
      socialType: null as SocialType,
    },
  ];

  const isEnglish = lang === "en";

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Leville.net",
    "telephone": "+358 44 131 313",
    "email": "info@leville.net",
    "url": "https://leville.net",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Levin keskusta",
      "addressLocality": "Sirkka",
      "postalCode": "99130",
      "addressCountry": "FI"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "67.80",
      "longitude": "24.80"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  };

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={isEnglish ? "en" : "fi"} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        
        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-10 sm:mb-16 px-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
            </section>

            {/* Contact Cards */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20">
              {contactInfo.map((info) => {
                const colors = getSocialColor(info.socialType);
                const isSocial = info.socialType !== null;
                
                return (
                  <Card key={info.title} className="glass-card border-border/30 text-center">
                    <CardHeader className="p-3 sm:p-6">
                      <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-4 ${colors.bg}`}>
                        {isSocial ? (
                          getSocialIcon(info.socialType, `w-5 h-5 sm:w-7 sm:h-7 ${colors.text}`)
                        ) : (
                          typeof info.icon !== 'string' && <info.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${colors.text}`} />
                        )}
                      </div>
                      <CardTitle className="text-sm sm:text-lg text-foreground">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6 pt-0">
                      {info.href ? (
                        <a 
                          href={info.href} 
                          target={isSocial ? "_blank" : undefined}
                          rel={isSocial ? "noopener noreferrer" : undefined}
                          className={`text-xs sm:text-base transition-colors whitespace-pre-line break-all ${isSocial ? `${colors.text} ${colors.hover}` : 'text-muted-foreground hover:text-primary'}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-base text-muted-foreground whitespace-pre-line">{info.value}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </section>

            {/* Map Section */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground text-center mb-6 sm:mb-8">{t.locationTitle}</h2>
              <div className="glass-card border-border/30 rounded-lg overflow-hidden h-64 sm:h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14269.254901538582!2d24.80!3d67.80!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45d28a3a3a3a3a3a%3A0x0!2sLevi%2C%20Finland!5e0!3m2!1sen!2sfi!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t.mapTitle}
                />
              </div>
            </section>
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default Yhteystiedot;
