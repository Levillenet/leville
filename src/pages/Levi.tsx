import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, Snowflake, Sun, MapPin, Cloud, ExternalLink } from "lucide-react";

const activities = [
  {
    title: "Laskettelu",
    description: "Levin laskettelukeskus tarjoaa 43 rinnettä ja 28 hissiä. Rinteitä löytyy kaikentasoisille laskijoille.",
    icon: Mountain,
  },
  {
    title: "Hiihto",
    description: "Yli 230 km huollettuja latuja. Lapin upeat maisemat avautuvat latuverkostolla.",
    icon: Snowflake,
  },
  {
    title: "Revontulet",
    description: "Levi on yksi parhaista paikoista ihailla revontulia. Kausi kestää syyskuusta maaliskuuhun.",
    icon: Sun,
  },
];

const usefulLinks = [
  { name: "Levi.fi – Virallinen matkailusivusto", url: "https://www.levi.fi/" },
  { name: "Levin rinnekartta", url: "https://www.levi.fi/fi/rinteet-ladut/rinteet/rinnekartta" },
  { name: "Ski.fi – Latukartta", url: "https://www.ski.fi/" },
];

const Levi = () => {
  return (
    <>
      <Helmet>
        <title>Levi – Aktiviteetit ja tietoa | Leville.net</title>
        <meta 
          name="description" 
          content="Tutustu Levin aktiviteetteihin: laskettelu, hiihto, revontulet ja paljon muuta. Hyödyllisiä linkkejä Levin palveluihin ja säätietoihin." 
        />
        <meta name="keywords" content="Levi aktiviteetit, Levi laskettelu, Levi hiihto, Levi revontulet, Levi sää" />
        <link rel="canonical" href="https://leville.net/levi" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Levi – Lapin helmi
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Suomen suurin hiihtokeskus tarjoaa elämyksiä ympäri vuoden. Tutustu Levin aktiviteetteihin ja palveluihin.
              </p>
            </section>

            {/* Activities */}
            <section className="grid md:grid-cols-3 gap-8 mb-20">
              {activities.map((activity) => (
                <Card key={activity.title} className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <activity.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Weather & Map Section */}
            <section className="grid md:grid-cols-2 gap-8 mb-20">
              <Card className="glass-card border-border/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Cloud className="w-6 h-6 text-primary" />
                    <CardTitle>Levin sää</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Tarkista Levin ajankohtainen säätilanne ja ennuste ennen matkaasi.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://www.foreca.fi/Finland/Levi" target="_blank" rel="noopener noreferrer">
                      Katso säätiedot <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <CardTitle>Levin kartta</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Tutustu Levin keskustaan ja ympäristöön kartan avulla.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://www.google.com/maps/place/Levi,+Finland" target="_blank" rel="noopener noreferrer">
                      Avaa kartta <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Useful Links */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-8">Hyödyllisiä linkkejä</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {usefulLinks.map((link) => (
                  <Button key={link.name} asChild variant="secondary">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name} <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
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

export default Levi;
