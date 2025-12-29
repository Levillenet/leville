import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Mountain, Wifi, Car, Snowflake, LucideIcon } from "lucide-react";
import { getTranslations, Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import WhatsAppChat from "@/components/WhatsAppChat";
import LeviMap from "@/components/LeviMap";

const accommodationIcons: LucideIcon[] = [Home, Users, Mountain];
const amenityIcons: LucideIcon[] = [Wifi, Car, Snowflake];

interface MajoituksetProps {
  lang?: Language;
}

const Majoitukset = ({ lang = "fi" }: MajoituksetProps) => {
  const t = getTranslations(lang).majoitukset;

  const isEnglish = lang === "en";

  return (
    <>
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
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <ScrollReveal>
              <section className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {t.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {t.subtitle}
                </p>
              </section>
            </ScrollReveal>

            {/* Accommodations Grid */}
            <section className="grid md:grid-cols-3 gap-8 mb-20">
              {t.accommodations.map((acc, index) => {
                const Icon = accommodationIcons[index];
                return (
                  <ScrollReveal key={acc.title} delay={index * 0.15} direction="up">
                    <TiltCard className="h-full">
                      <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                        <CardHeader>
                          <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                          <CardTitle className="text-xl text-foreground">{acc.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                          <p className="text-muted-foreground mb-4">{acc.description}</p>
                          <ul className="space-y-2 mb-6 flex-grow">
                            {acc.features.map((feature) => (
                              <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <a
                            href="https://app.moder.fi/levillenet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full text-center py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors mt-auto"
                          >
                            {t.bookCta}
                          </a>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </section>

            {/* Map Section */}
            <ScrollReveal delay={0.2}>
              <section className="mb-20">
                <LeviMap lang={lang} />
              </section>
            </ScrollReveal>

            {/* Amenities */}
            <ScrollReveal delay={0.3}>
              <section className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-8">{t.amenitiesTitle}</h2>
                <div className="flex flex-wrap justify-center gap-8">
                  {t.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[index];
                    return (
                      <div key={amenity.label} className="flex items-center gap-3 text-muted-foreground">
                        <Icon className="w-5 h-5 text-primary" />
                        <span>{amenity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default Majoitukset;
