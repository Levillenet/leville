import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Language, getTranslations, routeConfig } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";

interface NewsHighlightProps {
  lang?: Language;
}

const sectionLabels: Record<Language, { title: string; subtitle: string; cta: string }> = {
  fi: { title: "Ajankohtaista", subtitle: "Uusimmat kuulumiset Leviltä", cta: "Kaikki uutiset" },
  en: { title: "Latest News", subtitle: "The latest updates from Levi", cta: "All news" },
  sv: { title: "Nyheter", subtitle: "Senaste nytt från Levi", cta: "Alla nyheter" },
  de: { title: "Aktuelles", subtitle: "Die neuesten Nachrichten aus Levi", cta: "Alle Neuigkeiten" },
  es: { title: "Noticias", subtitle: "Las últimas novedades de Levi", cta: "Todas las noticias" },
  fr: { title: "Actualités", subtitle: "Les dernières nouvelles de Levi", cta: "Toutes les actualités" },
  nl: { title: "Nieuws", subtitle: "Het laatste nieuws uit Levi", cta: "Alle nieuws" },
};

const NewsHighlight = ({ lang = "fi" }: NewsHighlightProps) => {
  const t = getTranslations(lang).ajankohtaista;
  const labels = sectionLabels[lang];
  const latestItem = t.items[0];
  const newsRoute = routeConfig.news[lang];

  if (!latestItem) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Newspaper className="w-4 h-4" />
              <span className="text-sm font-medium">{labels.title}</span>
            </div>
            <p className="text-muted-foreground">{labels.subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Card className="max-w-3xl mx-auto glass-card border-border/30 hover:border-primary/40 transition-all duration-300 group">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  {latestItem.badge}
                </Badge>
                <span className="text-sm text-muted-foreground">{latestItem.date}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {latestItem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                {latestItem.description}
              </p>
              <Link
                to={newsRoute}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {labels.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsHighlight;
