import { useEffect, useRef } from "react";

const BookingWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up Moder settings
    (window as any).ModerSettings = {
      property: 'levillenet'
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="moder-embeds"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js';
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="glass-card rounded-xl p-6 md:p-8 shadow-elegant border border-border/30 max-w-4xl mx-auto relative" style={{ overflow: 'visible', zIndex: 40 }}>
      <h2 className="text-xl font-serif font-semibold text-foreground mb-6 tracking-wide">
        Katso vapaana olevat majoituksemme
      </h2>
      <div 
        id="moder-embed" 
        ref={containerRef} 
        className="min-h-[250px] relative"
        style={{ overflow: 'visible', zIndex: 50 }}
      />
    </div>
  );
};

export default BookingWidget;
