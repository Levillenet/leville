import { useEffect, useRef } from "react";
import { Language } from "@/translations";

interface ModerBookingWidgetProps {
  lang?: Language;
}

const ModerBookingWidget = ({ lang = "fi" }: ModerBookingWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Set global settings before loading the script
    (window as any).ModerSettings = {
      property: 'levillenet',
      lang: lang === 'fi' ? undefined : (lang === 'sv' ? 'sv' : 'en')
    };

    // Load script only once
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js';
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    }
  }, [lang]);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
      style={{ 
        isolation: 'isolate',
        pointerEvents: 'auto'
      }}
    >
      {/* Moder widget loads here */}
      <div 
        id="moder-embed" 
        ref={containerRef}
        className="relative"
        style={{
          position: 'relative',
          zIndex: 9999
        }}
      />
    </div>
  );
};

export default ModerBookingWidget;
