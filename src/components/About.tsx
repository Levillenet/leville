import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getTranslations, Language } from "@/translations";
import ScrollReveal from "./ScrollReveal";

interface AboutProps {
  lang?: Language;
}

const About = ({ lang = "fi" }: AboutProps) => {
  const t = getTranslations(lang).about;

  return (
    <section id="majoitukset" className="py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-aurora-blue/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 md:mb-8 tracking-tight leading-tight">
                {t.title} <span className="text-gradient">{t.titleHighlight}</span>
              </h2>
              
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {t.intro}
              </p>

              <p className="text-muted-foreground mb-10 leading-relaxed">
                {t.description}
              </p>

              <ul className="space-y-4 mb-12 text-left max-w-md mx-auto">
                {t.points.map((point, index) => (
                  <ScrollReveal key={point} delay={0.2 + index * 0.1} direction="up">
                    <li className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-aurora-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-aurora-green" />
                      </div>
                      <span className="text-foreground">{point}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>

              <Link to={lang === "en" ? "/en/accommodations" : "/majoitukset"}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8">
                  {t.cta}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
