import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import galleryKitchen from "@/assets/gallery/kitchen-modern.jpg";
import galleryBathroom from "@/assets/gallery/bathroom.jpg";
import galleryBedroom from "@/assets/gallery/bedroom.jpg";
import galleryStudio from "@/assets/gallery/studio.jpg";
import galleryLiving from "@/assets/gallery/living-room.jpg";
import galleryLivingKitchen from "@/assets/gallery/living-kitchen.jpg";
import galleryApartment from "@/assets/gallery/apartment-view.jpg";
import gallerySauna from "@/assets/gallery/sauna.jpg";
import galleryCabinKitchen from "@/assets/gallery/cabin-kitchen.jpg";
import galleryHotTub from "@/assets/gallery/hot-tub.jpg";

const galleryImages = [
  galleryKitchen,
  galleryBathroom,
  galleryBedroom,
  galleryStudio,
  galleryLiving,
  galleryLivingKitchen,
  galleryApartment,
  gallerySauna,
  galleryCabinKitchen,
  galleryHotTub,
];

const aboutPoints = [
  "Modernit studiohuoneistot yksin tai kaksin matkustaville",
  "Tilavat asunnot niin perheille kuin porukoille",
  "Tunnelmalliset hirsimökit aidon Lappi-tunnelman etsijöille",
  "Kaikki kohteemme on täysin varusteltuja mutkattomaan loman viettoosi"
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="majoitukset" className="py-16 bg-background relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-aurora-blue/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8 tracking-tight leading-tight">
              Laadukas majoitus <br /><span className="text-gradient">Levin sydämessä</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Etsitkö majoitusta parhailla sijainnilla Leviltä? Leville.net tarjoaa monipuolisen valikoiman huoneistoja ja vuokramökkejä aivan Levin keskustan parhailla paikoilla.
            </p>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              Olitpa suunnittelemassa talvilomaa Levin laskettelurinteillä, kesäretkeä Lapin luontoon tai työmatkaa pohjoiseen, meiltä löydät sinulle sopivan majoitusratkaisun.
            </p>

            <ul className="space-y-4 mb-12">
              {aboutPoints.map(point => (
                <li key={point} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-aurora-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-aurora-green" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <Link to="/majoitukset">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8">
                Selaa majoituksia
              </Button>
            </Link>
          </div>

          {/* Image Gallery with crossfade */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-elegant border border-border/20">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Majoituskuva ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out"
                  style={{
                    opacity: index === currentImageIndex ? 1 : 0,
                  }}
                />
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-aurora-green/10 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-aurora-blue/10 rounded-xl -z-10" />

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {galleryImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    index === currentImageIndex ? 'bg-white w-4' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
