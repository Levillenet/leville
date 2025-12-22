import { MapPin, Car, MessageCircle, BadgePercent } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Keskustan parhaat sijainnit",
    description: "Kaikki kohteemme sijaitsevat kävelymatkan päässä rinteistä, ravintoloista ja palveluista."
  },
  {
    icon: Car,
    title: "Helppo saapuminen",
    description: "Hyvät pysäköintimahdollisuudet ja selkeät ajo-ohjeet jokaiseen kohteeseen."
  },
  {
    icon: MessageCircle,
    title: "Henkilökohtainen palvelu",
    description: "Nopea ja ystävällinen asiakaspalvelu koko majoituksesi ajan."
  },
  {
    icon: BadgePercent,
    title: "Paras hinta suoraan meiltä",
    description: "Varaa suoraan meiltä – edullisin hinta ilman välikäsiä."
  }
];

const Features = () => {
  return (
    <section id="yritys" className="py-28 bg-card relative overflow-hidden">
      {/* Subtle aurora glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-aurora-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-aurora-blue/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 tracking-tight">
            Miksi valita <span className="text-gradient">Leville.net?</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tarjoamme laadukasta majoitusta parhailla sijainneilla Levin keskustassa jo vuosien kokemuksella.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 rounded-xl bg-secondary/40 border border-border/30 hover:border-aurora-green/30 transition-all duration-500 hover:shadow-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-aurora-green/10 flex items-center justify-center mb-6 group-hover:bg-aurora-green/20 transition-colors duration-500">
                <feature.icon className="w-6 h-6 text-aurora-green" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-serif tracking-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
