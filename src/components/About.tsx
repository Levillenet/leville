import { useState, useEffect, useCallback, useRef } from "react";
import { Home, Users, TreePine, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getTranslations, Language } from "@/translations";
import ScrollReveal from "./ScrollReveal";

// About section images
import saunaKarhupirtti from "@/assets/about/sauna-karhupirtti.jpg";
import hotTubWinter from "@/assets/about/hot-tub-winter.jpg";
import diningKarhupirtti from "@/assets/about/dining-karhupirtti.jpg";
import saunaModern from "@/assets/about/sauna-modern.jpg";
import showerLaundry from "@/assets/about/shower-laundry.jpg";
import livingFireplace from "@/assets/about/living-fireplace.jpg";
import diningLiving from "@/assets/about/dining-living.jpg";
import livingStairs from "@/assets/about/living-stairs.jpg";
import saunaLight from "@/assets/about/sauna-light.jpg";
import kitchenDining from "@/assets/about/kitchen-dining.jpg";
import bedroomModern from "@/assets/about/bedroom-modern.jpg";
import studioKitchen from "@/assets/about/studio-kitchen.jpg";
import livingBright from "@/assets/about/living-bright.jpg";
import livingSigns from "@/assets/about/living-signs.jpg";
import livingCozy from "@/assets/about/living-cozy.jpg";

const aboutImages = [
  saunaKarhupirtti,
  hotTubWinter,
  diningKarhupirtti,
  saunaModern,
  showerLaundry,
  livingFireplace,
  diningLiving,
  livingStairs,
  saunaLight,
  kitchenDining,
  bedroomModern,
  studioKitchen,
  livingBright,
  livingSigns,
  livingCozy,
];

interface AboutProps {
  lang?: Language;
}

const FADE_DURATION = 1000;

const About = ({ lang = "fi" }: AboutProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);
  const t = getTranslations(lang).about;

  const pointIcons = [Home, Users, TreePine, CheckCircle];

  const transitionToIndex = useCallback((newIndex: number) => {
    setPreviousImageIndex(currentImageIndex);
    setCurrentImageIndex(newIndex);

    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
    }
    fadeTimeoutRef.current = window.setTimeout(() => {
      setPreviousImageIndex(null);
    }, FADE_DURATION);
  }, [currentImageIndex]);

  const goToNext = useCallback(() => {
    transitionToIndex((currentImageIndex + 1) % aboutImages.length);
  }, [currentImageIndex, transitionToIndex]);

  const goToPrev = useCallback(() => {
    transitionToIndex((currentImageIndex - 1 + aboutImages.length) % aboutImages.length);
  }, [currentImageIndex, transitionToIndex]);

  const goToSlide = useCallback((index: number) => {
    if (index !== currentImageIndex) {
      transitionToIndex(index);
    }
  }, [currentImageIndex, transitionToIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  // Preload nearby images on-demand (current + next 2) instead of all 15
  useEffect(() => {
    const toPreload = [
      (currentImageIndex + 1) % aboutImages.length,
      (currentImageIndex + 2) % aboutImages.length,
    ];
    toPreload.forEach((idx) => {
      const img = new Image();
      img.src = aboutImages[idx];
    });
  }, [currentImageIndex]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="majoitukset" className="py-16 md:py-24 bg-gradient-to-b from-background via-leville-dark/20 to-background relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-leville-turquoise/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-48 h-48 bg-aurora-green/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          {/* Content */}
          <ScrollReveal direction="left" delay={0.1}>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 md:mb-8 tracking-tight leading-tight">
                {t.title} <br className="hidden sm:block" /><span className="text-gradient">{t.titleHighlight}</span>
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t.intro}
              </p>

              {/* Feature list with icons - improved design */}
              <div className="space-y-4 mb-10">
                {t.points.map((point, index) => {
                  const Icon = pointIcons[index] || CheckCircle;
                  return (
                    <ScrollReveal key={point} delay={0.2 + index * 0.1} direction="left">
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-leville-turquoise/30 transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-leville-turquoise/15 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-leville-turquoise" />
                        </div>
                        <span className="text-foreground/90 pt-2">{point}</span>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              <Link to={lang === "en" ? "/en/accommodations" : "/majoitukset"}>
                <Button 
                  size="lg" 
                  className="bg-leville-turquoise hover:bg-leville-turquoise-light text-white font-medium px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t.cta}
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Image Gallery with crossfade */}
          <ScrollReveal direction="right" delay={0.2}>
            <div 
              className="relative group touch-pan-y"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant border border-border/20 relative bg-muted">
                {aboutImages.map((image, index) => {
                  const isCurrent = index === currentImageIndex;
                  const isPrevious = previousImageIndex !== null && index === previousImageIndex;

                  // Only render current and previous for performance
                  if (!isCurrent && !isPrevious) return null;

                  return (
                    <img
                      key={index}
                      src={image}
                      alt={`${t.imageAlt} ${index + 1}`}
                      loading="eager"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
                        isCurrent ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ zIndex: isPrevious ? 2 : isCurrent ? 1 : 0 }}
                    />
                  );
                })}
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-70 hover:opacity-100 transition-all duration-300"
                aria-label={lang === "en" ? "Previous image" : "Edellinen kuva"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-70 hover:opacity-100 transition-all duration-300"
                aria-label={lang === "en" ? "Next image" : "Seuraava kuva"}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Decorative glow */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-leville-turquoise/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-aurora-green/10 rounded-full blur-2xl pointer-events-none" />

              {/* Clickable image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {aboutImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-500 hover:bg-white/70 ${
                      index === currentImageIndex ? 'bg-leville-turquoise w-6' : 'bg-white/40 w-2'
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
