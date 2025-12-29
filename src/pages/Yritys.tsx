import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Building, Home, Users, Briefcase, MapPin, Mail, Star, Quote, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { testimonials } from "@/data/testimonials";
import { getTranslations, Language } from "@/translations";

const serviceIcons: LucideIcon[] = [Building, Home, Users, Briefcase, MapPin];

interface YritysProps {
  lang?: Language;
}

const Yritys = ({ lang = "fi" }: YritysProps) => {
  const t = getTranslations(lang).yritys;
  const linkPrefix = lang === "en" ? "/en" : "";

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        {lang === "en" && <html lang="en" />}
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
            </section>

            {/* Main Introduction */}
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

            {/* Services Grid */}
            <section className="mb-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                {t.servicesTitle}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.services.map((service, index) => {
                  const Icon = serviceIcons[index];
                  return (
                    <Card key={service.title} className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Custom Solutions */}
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

            {/* Why Choose Us */}
            <section className="mb-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                {t.whyTitle}
              </h2>
              <div className="max-w-2xl mx-auto">
                <Card className="glass-card border-border/30 p-8">
                  <CardContent className="p-0">
                    <ul className="space-y-4">
                      {t.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-green-500" />
                          </div>
                          <span className="text-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Customer Testimonials */}
            <section className="mb-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
                {t.testimonialsTitle}
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                {t.testimonialsSubtitle}
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={index} 
                    className="glass-card border-border/30 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
                  >
                    <CardContent className="p-6 relative">
                      {/* Quote icon */}
                      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                      
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      
                      {/* Review text */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-5">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-aurora-green/30 flex items-center justify-center">
                          <span className="text-foreground font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm">{testimonial.name}</p>
                          <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Call to Action */}
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
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Yritys;
