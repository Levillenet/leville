import BookingWidget from "./BookingWidget";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center hero-gradient pt-20 pb-32"
      style={{ overflow: 'visible' }}
    >
      {/* Aurora borealis effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-b from-aurora-green/20 via-aurora-blue/10 to-transparent rounded-full blur-3xl animate-aurora" />
        <div
          className="absolute top-10 right-1/4 w-[500px] h-[350px] bg-gradient-to-b from-aurora-blue/15 via-aurora-green/8 to-transparent rounded-full blur-3xl animate-aurora"
          style={{ animationDelay: '-5s' }}
        />
      </div>

      {/* Snow/stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10" style={{ overflow: 'visible' }}>
        <div className="max-w-4xl mx-auto text-center" style={{ overflow: 'visible' }}>
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6 animate-slide-up tracking-tight">
            Tervetuloa <span className="text-gradient">Leville</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Majoitu leppoisasti Levin keskustassa – modernit huoneistot ja tunnelmalliset mökit parhailla paikoilla
          </p>

          {/* Booking Widget */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s', overflow: 'visible' }}>
            <BookingWidget />
          </div>

          {/* Trust indicators */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-aurora-green rounded-full" />
              <span className="tracking-wide">Keskustan parhaat sijainnit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-aurora-green rounded-full" />
              <span className="tracking-wide">Suora varaus ilman välikäsiä</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-aurora-green rounded-full" />
              <span className="tracking-wide">Henkilökohtainen palvelu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-muted-foreground/40 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
