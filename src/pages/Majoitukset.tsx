import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Mountain, Wifi, Car, Snowflake } from "lucide-react";

const accommodations = [
  {
    title: "Modernit huoneistot",
    description: "Täysin varustetut huoneistot Levin keskustassa. Täydellinen sijainti sekä rinteille että palveluihin.",
    icon: Home,
    features: ["2-4 henkilöä", "Keittiö", "Sauna", "WiFi"],
  },
  {
    title: "Tilavat perheasunnot",
    description: "Isommat asunnot perheille ja ryhmille. Runsaasti tilaa ja mukavuuksia kaikille.",
    icon: Users,
    features: ["4-8 henkilöä", "Useita makuuhuoneita", "Täysvarustettu keittiö", "Parveke"],
  },
  {
    title: "Tunnelmalliset hirsimökit",
    description: "Perinteisiä hirsimökkejä luonnon rauhassa. Aitoa Lapin tunnelmaa.",
    icon: Mountain,
    features: ["2-6 henkilöä", "Takka", "Oma piha", "Grilli"],
  },
];

const amenities = [
  { icon: Wifi, label: "Ilmainen WiFi" },
  { icon: Car, label: "Pysäköinti" },
  { icon: Snowflake, label: "Suksivarasto" },
];

const Majoitukset = () => {
  return (
    <>
      <Helmet>
        <title>Majoitukset | Leville.net – Huoneistot ja mökit Leviltä</title>
        <meta 
          name="description" 
          content="Tutustu Leville.net majoitusvaihtoehtoihin: modernit huoneistot, tilavat perheasunnot ja tunnelmalliset hirsimökit Levin keskustassa ja ympäristössä." 
        />
        <meta name="keywords" content="Levi majoitus, Levi huoneisto, Levi mökki, Levin vuokramökit" />
        <link rel="canonical" href="https://leville.net/majoitukset" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Majoituksemme
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Laadukkaat majoitusvaihtoehdot Levin sydämessä. Valitse sinulle sopiva kohde ja nauti Lapin taianomaisesta luonnosta.
              </p>
            </section>

            {/* Accommodations Grid */}
            <section className="grid md:grid-cols-3 gap-8 mb-20">
              {accommodations.map((acc) => (
                <Card key={acc.title} className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <acc.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{acc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{acc.description}</p>
                    <ul className="space-y-2">
                      {acc.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Amenities */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-8">Kaikissa majoituksissamme</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {amenities.map((amenity) => (
                  <div key={amenity.label} className="flex items-center gap-3 text-muted-foreground">
                    <amenity.icon className="w-5 h-5 text-primary" />
                    <span>{amenity.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Majoitukset;
