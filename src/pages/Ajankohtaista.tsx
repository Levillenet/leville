import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sparkles, Clock } from "lucide-react";
import { getTranslations, Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppChat from "@/components/WhatsAppChat";

interface AjankohtaistaProps {
  lang?: Language;
}

const Ajankohtaista = ({ lang = "fi" }: AjankohtaistaProps) => {
  const t = getTranslations(lang).ajankohtaista;
  const isEnglish = lang === "en";

  return (
    <>
      <Helmet>
        <html lang={isEnglish ? "en" : "fi"} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.badge}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {t.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {t.subtitle}
                </p>
              </section>
            </ScrollReveal>

            {/* News/Offers Grid */}
            <section className="max-w-4xl mx-auto space-y-8">
              {t.items.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          {item.badge}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl text-foreground">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>
                      {item.highlight && (
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                          <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-foreground font-medium">{item.highlight}</p>
                        </div>
                      )}
                      <a
                        href="https://app.moder.fi/levillenet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        {t.bookCta}
                      </a>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </section>
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default Ajankohtaista;
