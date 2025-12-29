import { useState, useEffect } from "react";
import { MapPin, Car, MessageCircle, BadgePercent, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Best locations in center",
    description: "All our properties are within walking distance of slopes, restaurants and services."
  },
  {
    icon: Car,
    title: "Easy arrival",
    description: "Good parking facilities and clear driving directions to each property."
  },
  {
    icon: MessageCircle,
    title: "Personal service",
    description: "Fast and friendly customer service throughout your stay."
  },
  {
    icon: BadgePercent,
    title: "Best price directly from us",
    description: "Book directly from us – the best price without intermediaries."
  }
];

const testimonials = [
  {
    name: "Maria S.",
    location: "Helsinki",
    text: "Excellent location and a cozy apartment! The view of the slopes was amazing and everything was within walking distance.",
    rating: 5
  },
  {
    name: "John T.",
    location: "Stockholm",
    text: "We had an amazing family holiday. The cabin was spacious and fully equipped. Will definitely come back!",
    rating: 5
  },
  {
    name: "Anna K.",
    location: "Oslo",
    text: "Perfect service from start to finish. The booking was easy and the apartment exceeded our expectations.",
    rating: 5
  }
];

const FeaturesEN = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="company" className="py-28 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-aurora-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-aurora-blue/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 tracking-tight">
            Why choose <span className="text-gradient">Leville.net?</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We offer quality accommodation in the best locations in Levi center with years of experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 rounded-xl bg-secondary/40 border border-border/30 hover:border-aurora-green/30 transition-all duration-500 hover:shadow-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-aurora-green/10 flex items-center justify-center mb-6 group-hover:bg-aurora-green/20 transition-colors duration-500">
                <feature.icon className="w-6 h-6 text-aurora-green" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-3 font-serif tracking-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-center mb-12 tracking-tight">
            Customer experiences
          </h3>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="glass-card border-border/30 p-8 md:p-12 rounded-2xl relative">
                      <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
                      
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      
                      <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-serif italic">
                        "{testimonial.text}"
                      </blockquote>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-aurora-green/40 flex items-center justify-center">
                          <span className="text-foreground font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-foreground font-semibold">{testimonial.name}</p>
                          <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full glass-card border-border/30 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full glass-card border-border/30 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-border/50 hover:bg-border'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesEN;
