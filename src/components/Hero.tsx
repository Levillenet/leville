import { useEffect } from "react";
import BookingWidget from "./BookingWidget";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Northern lights effect */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 animate-slide-up">
            Tervetuloa <span className="text-gradient">Leville.net</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Majoitu mukavasti Levin keskustassa – modernit huoneistot ja tunnelmalliset mökit parhailla paikoilla
          </p>

          {/* Booking Widget */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <BookingWidget />
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Keskustan parhaat sijainnit
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Suora varaus ilman välikäsiä
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Henkilökohtainen palvelu
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
