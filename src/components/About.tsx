import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const aboutPoints = [
  "Modernit studiohuoneistot yksin tai kaksin matkustaville",
  "Tilavat perheasunnot koko perheen lomailijoille",
  "Tunnelmalliset hirsimökit aidon Lappi-tunnelman etsijöille",
  "Kaikki kohteet varusteltu täysin"
];

const About = () => {
  return (
    <section id="majoitukset" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Laadukas majoitus <span className="text-gradient">Levin sydämessä</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Etsitkö laadukasta majoitusta parhailla sijainnilla Leviltä? Leville.net tarjoaa monipuolisen valikoiman huoneistoja ja vuokramökkejä aivan Levin keskustan parhailla paikoilla.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Olitpa suunnittelemassa talvilomaa Levin laskettelurinteillä, kesäretkeä Lapin luontoon tai työmatkaa pohjoiseen, meiltä löydät sinulle sopivan majoitusratkaisun.
            </p>

            <ul className="space-y-4 mb-10">
              {aboutPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              Selaa majoituksia
            </Button>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted shadow-elegant">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground font-medium">Majoituskuvat</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
