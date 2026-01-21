import { useState, useEffect } from "react";
import { MapPin, Car, Users, Wallet, ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import { Language, getTranslations } from "@/translations";
import { testimonials, getTestimonialText } from "@/data/testimonials";

interface FeaturesProps {
  lang?: Language;
}

const Features = ({ lang = "fi" }: FeaturesProps) => {
  const t = getTranslations(lang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const featureIcons = [MapPin, Car, Users, Wallet];
  const features = t.features.items || [];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials[currentIndex];
  const testimonialText = getTestimonialText(currentTestimonial, lang);

  return (
    <section id={t.features.sectionId} className="py-20 md:py-28 bg-gradient-to-b from-background to-leville-dark/20">
      <div className="container">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              {t.features.title}{" "}
              <span className="text-gradient">{t.features.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.features.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Feature cards - 4 column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = featureIcons[index] || MapPin;
            return (
              <ScrollReveal key={index} delay={index * 100}>
                <TiltCard className="h-full">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 feature-card-hover h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-leville-turquoise/15 flex items-center justify-center mb-5">
                      <Icon className="w-8 h-8 text-leville-turquoise" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Testimonials section */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground text-center mb-10">
              {t.features.testimonialTitle}
            </h3>

            {/* Testimonial carousel */}
            <div className="relative">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 relative overflow-hidden">
                {/* Quote icon */}
                <Quote className="absolute top-6 left-6 w-10 h-10 text-leville-turquoise/20" />
                
                {/* Testimonial content */}
                <div className="relative z-10 text-center">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-leville-turquoise text-leville-turquoise" />
                    ))}
                  </div>
                  
                  {/* Quote text */}
                  <blockquote className="text-lg sm:text-xl text-foreground/90 italic mb-6 leading-relaxed min-h-[80px]">
                    "{testimonialText.text}"
                  </blockquote>
                  
                  {/* Author */}
                  <div>
                    <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonialText.location}</p>
                  </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-leville-turquoise/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Navigation arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border border-border hover:border-leville-turquoise/50 flex items-center justify-center text-foreground transition-all shadow-lg"
                aria-label={t.features.prevAriaLabel}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-card border border-border hover:border-leville-turquoise/50 flex items-center justify-center text-foreground transition-all shadow-lg"
                aria-label={t.features.nextAriaLabel}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-leville-turquoise w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`${t.features.dotAriaLabel} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Features;
