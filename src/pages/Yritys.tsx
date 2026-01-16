import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Building, Home, Users, Briefcase, MapPin, Mail, Star, Quote, LucideIcon, Calendar, Award, Heart, Moon, UserCheck, Building2 } from "lucide-react";
import { testimonials, getTestimonialText } from "@/data/testimonials";
import { getTranslations, Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";

const serviceIcons: LucideIcon[] = [Building, Home, Users, Briefcase, MapPin];

interface YritysProps {
  lang?: Language;
}

const Yritys = ({ lang = "fi" }: YritysProps) => {
  const t = getTranslations(lang).yritys;
  const location = useLocation();
  const linkPrefix = lang === "en" ? "/en" : "";

  const stats = lang === "en" 
    ? [
        { value: 20000, label: "Nights annually", prefix: "", suffix: "+", icon: Moon },
        { value: 5000, label: "Guests annually", prefix: "", suffix: "+", icon: UserCheck },
        { value: 30, label: "Properties", prefix: "", suffix: "", icon: Building2 },
        { value: 14, label: "Years of experience", prefix: "", suffix: "+", icon: Award },
      ]
    : [
        { value: 20000, label: "Yöpymistä vuodessa", prefix: "", suffix: "+", icon: Moon },
        { value: 5000, label: "Asiakasta vuodessa", prefix: "", suffix: "+", icon: UserCheck },
        { value: 30, label: "Majoituskohdetta", prefix: "", suffix: "", icon: Building2 },
        { value: 14, label: "Vuotta kokemusta", prefix: "", suffix: "+", icon: Award },
      ];

  const isEnglish = lang === "en";

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Leville.net",
    "url": "https://leville.net",
    "logo": "https://leville.net/leville-logo.png",
    "foundingDate": "2011",
    "description": isEnglish 
      ? "Leville.net offers quality accommodation in Levi since 2011."
      : "Leville.net tarjoaa laadukasta majoitusta Levillä vuodesta 2011.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sirkka",
      "postalCode": "99130",
      "addressCountry": "FI"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+358 44 131 313",
      "contactType": "customer service",
      "email": "info@leville.net"
    },
    "sameAs": [
      "https://facebook.com/leville.net",
      "https://instagram.com/leville.net"
    ]
  };

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "en" ? "en_US" : lang === "sv" ? "sv_SE" : lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : "fr_FR"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <ScrollReveal>
              <section className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {t.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
              </section>
            </ScrollReveal>

            {/* Animated Stats */}
            <ScrollReveal delay={0.1}>
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 max-w-5xl mx-auto">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="glass-card border-border/30 rounded-xl p-6 md:p-8 text-center group hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                      <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                      <AnimatedCounter 
                        target={stat.value} 
                        prefix={stat.prefix} 
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </section>
            </ScrollReveal>

            {/* Main Introduction */}
            <ScrollReveal delay={0.2}>
              <section className="max-w-4xl mx-auto mb-20">
                <Card className="glass-card border-border/30 p-8 md:p-12">
                  <CardContent className="p-0 space-y-6">
                    <p 
                      className="text-lg text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: t.introText }}
                    />
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>

            {/* Services Grid */}
            <section className="mb-20">
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                  {t.servicesTitle}
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.services.map((service, index) => {
                  const Icon = serviceIcons[index];
                  return (
                    <ScrollReveal key={service.title} delay={index * 0.1} direction="up">
                      <TiltCard className="h-full">
                        <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                          </CardContent>
                        </Card>
                      </TiltCard>
                    </ScrollReveal>
                  );
                })}
              </div>
            </section>

            {/* Custom Solutions */}
            <ScrollReveal>
              <section className="max-w-4xl mx-auto mb-20">
                <Card className="glass-card border-border/30 p-8 md:p-12">
                  <CardContent className="p-0 space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">{t.customTitle}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.customText1}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.customText2}
                    </p>
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>

            {/* Why Choose Us */}
            <section className="mb-20">
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                  {t.whyTitle}
                </h2>
              </ScrollReveal>
              <div className="max-w-2xl mx-auto">
                <ScrollReveal delay={0.1}>
                  <Card className="glass-card border-border/30 p-8">
                    <CardContent className="p-0">
                      <ul className="space-y-4">
                        {t.benefits.map((benefit, index) => (
                          <ScrollReveal key={benefit} delay={0.1 + index * 0.05} direction="left">
                            <li className="flex items-start gap-4">
                              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-4 h-4 text-green-500" />
                              </div>
                              <span className="text-foreground">{benefit}</span>
                            </li>
                          </ScrollReveal>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </section>

            {/* Customer Testimonials */}
            <section className="mb-20">
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
                  {t.testimonialsTitle}
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  {t.testimonialsSubtitle}
                </p>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => {
                  const translatedTestimonial = getTestimonialText(testimonial, lang);
                  return (
                    <ScrollReveal key={index} delay={index * 0.1} direction="up">
                      <TiltCard className="h-full">
                        <Card 
                          className="glass-card border-border/30 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden h-full"
                        >
                          <CardContent className="p-6 relative">
                            {/* Quote icon */}
                            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                            
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                              {[...Array(translatedTestimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              ))}
                            </div>
                            
                            {/* Review text */}
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-5">
                              "{translatedTestimonial.text}"
                            </p>
                            
                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-aurora-green/30 flex items-center justify-center">
                                <span className="text-foreground font-semibold text-sm">
                                  {translatedTestimonial.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-foreground font-medium text-sm">{translatedTestimonial.name}</p>
                                <p className="text-muted-foreground text-xs">{translatedTestimonial.location}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TiltCard>
                    </ScrollReveal>
                  );
                })}
              </div>
            </section>

            {/* Call to Action */}
            <ScrollReveal>
              <section className="text-center max-w-3xl mx-auto">
                <Card className="glass-card border-primary/30 p-8 md:p-12">
                  <CardContent className="p-0 space-y-6">
                    <p 
                      className="text-lg text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: t.ctaText }}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link to={`${linkPrefix}/majoitukset`}>
                          {t.exploreCta}
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link to={`${linkPrefix}/yhteystiedot`}>
                          <Mail className="w-4 h-4 mr-2" />
                          {t.contactCta}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default Yritys;
