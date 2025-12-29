import { useState, useEffect, useCallback } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getTranslations, Language } from "@/translations";
import { galleryImages } from "@/data/galleryImages";
import ScrollReveal from "./ScrollReveal";

interface AboutProps {
  lang?: Language;
}

const About = ({ lang = "fi" }: AboutProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = getTranslations(lang).about;

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  return (
    <section id="majoitukset" className="py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-aurora-blue/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          {/* Content */}
          <ScrollReveal direction="left" delay={0.1}>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 md:mb-8 tracking-tight leading-tight">
                {t.title} <br className="hidden sm:block" /><span className="text-gradient">{t.titleHighlight}</span>
              </h2>
              
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {t.intro}
              </p>

              <p className="text-muted-foreground mb-10 leading-relaxed">
                {t.description}
              </p>

              <ul className="space-y-4 mb-12">
                {t.points.map((point, index) => (
                  <ScrollReveal key={point} delay={0.2 + index * 0.1} direction="left">
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

          {/* Image Gallery with crossfade */}
          <ScrollReveal direction="right" delay={0.2}>
            <div 
              className="relative group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-elegant border border-border/20">
                {galleryImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${t.imageAlt} ${index + 1}`}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out"
                    style={{
                      opacity: index === currentImageIndex ? 1 : 0,
                    }}
                  />
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                aria-label={lang === "en" ? "Previous image" : "Edellinen kuva"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                aria-label={lang === "en" ? "Next image" : "Seuraava kuva"}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-aurora-green/10 rounded-xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-aurora-blue/10 rounded-xl -z-10" />

              {/* Clickable image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 hover:bg-white/70 ${
                      index === currentImageIndex ? 'bg-white w-4' : 'bg-white/40 w-1.5'
                    }`}
                    aria-label={`${lang === "en" ? "Go to image" : "Siirry kuvaan"} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
