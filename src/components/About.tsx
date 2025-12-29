import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
const aboutPoints = ["Modernit studiohuoneistot yksin tai kaksin matkustaville", "Tilavat perheasunnot koko perheen lomailijoille", "Tunnelmalliset hirsimökit aidon Lappi-tunnelman etsijöille", "Kaikki kohteet varusteltu täysin"];
const About = () => {
  return <section id="majoitukset" className="py-16 bg-background relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-aurora-blue/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8 tracking-tight leading-tight">
              Laadukas majoitus <br /><span className="text-gradient">Levin sydämessä</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">Etsitkö majoitusta parhailla sijainnilla Leviltä? Leville.net tarjoaa monipuolisen valikoiman huoneistoja ja vuokramökkejä aivan Levin keskustan parhailla paikoilla.</p>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              Olitpa suunnittelemassa talvilomaa Levin laskettelurinteillä, kesäretkeä Lapin luontoon tai työmatkaa pohjoiseen, meiltä löydät sinulle sopivan majoitusratkaisun.
            </p>

            <ul className="space-y-4 mb-12">
              {aboutPoints.map(point => <li key={point} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-aurora-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-aurora-green" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </li>)}
            </ul>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8">
              Selaa majoituksia
            </Button>
          </div>

          {/* Image placeholder with Lapland feel */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-lapland-night via-lapland-forest to-secondary shadow-elegant border border-border/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aurora-green/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-aurora-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground font-medium tracking-wide">Majoituskuvat</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-aurora-green/10 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-aurora-blue/10 rounded-xl -z-10" />
          </div>
        </div>
      </div>
    </section>;
};
export default About;