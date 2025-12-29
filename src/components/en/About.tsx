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
import galleryCabinDining from "@/assets/gallery/cabin-dining.jpg";
import gallerySaunaModern from "@/assets/gallery/sauna-modern.jpg";
import galleryShower from "@/assets/gallery/shower.jpg";
import galleryLivingFireplace from "@/assets/gallery/living-fireplace.jpg";
import galleryDiningLiving from "@/assets/gallery/dining-living.jpg";
import galleryLivingStairs from "@/assets/gallery/living-stairs.jpg";
import gallerySaunaLight from "@/assets/gallery/sauna-light.jpg";
import galleryKitchenDining from "@/assets/gallery/kitchen-dining.jpg";

const galleryImages = [
  galleryKitchen,
  galleryCabinDining,
  galleryBedroom,
  galleryLivingFireplace,
  galleryStudio,
  gallerySaunaModern,
  galleryLiving,
  galleryShower,
  galleryLivingKitchen,
  galleryDiningLiving,
  galleryApartment,
  galleryLivingStairs,
  gallerySauna,
  gallerySaunaLight,
  galleryCabinKitchen,
  galleryKitchenDining,
  galleryHotTub,
  galleryBathroom,
];

const aboutPoints = [
  "Modern studio apartments for solo or couple travelers",
  "Spacious apartments for families and groups",
  "Cozy log cabins for authentic Lapland experience",
  "All properties are fully equipped for a hassle-free holiday"
];

const AboutEN = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="accommodations" className="py-16 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-aurora-blue/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8 tracking-tight leading-tight">
              Quality accommodation <br /><span className="text-gradient">in the heart of Levi</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Looking for accommodation in the best location in Levi? Leville.net offers a diverse selection of apartments and rental cabins in the very best locations in Levi center.
            </p>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              Whether you are planning a winter holiday on Levi ski slopes, a summer trip to Lapland nature or a business trip to the north, we have the right accommodation solution for you.
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
                Browse accommodations
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
                  alt={`Accommodation ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out"
                  style={{
                    opacity: index === currentImageIndex ? 1 : 0,
                  }}
                />
              ))}
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-aurora-green/10 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-aurora-blue/10 rounded-xl -z-10" />

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

export default AboutEN;
