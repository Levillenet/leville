import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, Snowflake, Sun, MapPin, Cloud, ExternalLink, LucideIcon, Video } from "lucide-react";
import { getTranslations, Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";

// Import images
import leviSunsetSlope from "@/assets/levi-sunset-slope.jpg";
import leviCampfire from "@/assets/levi-campfire.jpg";
import leviReindeer from "@/assets/levi-reindeer.jpg";
import leviSlopes from "@/assets/levi-slopes.jpg";
import leviSkiTracks from "@/assets/levi-ski-tracks.jpg";
import leviPanorama from "@/assets/levi-panorama.jpg";

const activityIcons: LucideIcon[] = [Mountain, Snowflake, Sun];
const galleryImageSources = [
  leviSunsetSlope,
  leviSlopes,
  leviCampfire,
  leviReindeer,
  leviSkiTracks,
  leviPanorama,
];

interface LeviProps {
  lang?: Language;
}

const Levi = ({ lang = "fi" }: LeviProps) => {
  const t = getTranslations(lang).levi;

  const galleryImages = t.gallery.map((item, index) => ({
    src: galleryImageSources[index],
    alt: item.alt,
    caption: item.caption,
  }));

  const isEnglish = lang === "en";

  return (
    <>
      <Helmet>
        <html lang={isEnglish ? "en" : "fi"} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </section>

            {/* Hero Image Gallery - Masonry-style */}
            <section className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Large featured image */}
                <div className="md:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-2xl">
                  <img 
                    src={galleryImages[0].src} 
                    alt={galleryImages[0].alt}
                    className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-foreground font-medium text-lg">{galleryImages[0].caption}</p>
                  </div>
                </div>

                {/* Smaller images */}
                {galleryImages.slice(1, 3).map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-foreground font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Activities */}
            <section className="grid md:grid-cols-3 gap-8 mb-20">
              {t.activities.map((activity, index) => {
                const Icon = activityIcons[index];
                return (
                  <Card key={activity.title} className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-foreground">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{activity.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </section>

            {/* Second Gallery Row */}
            <section className="mb-20">
              <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{t.galleryTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {galleryImages.slice(3).map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl aspect-[4/3]">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-foreground font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Live Camera Section */}
            <section className="mb-20">
              <Card className="glass-card border-border/30 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Video className="w-6 h-6 text-primary" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    </div>
                    <CardTitle>{lang === "en" ? "Levi Live Camera" : "Levin live-kamera"}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/Wr9b5aYA4mI?autoplay=0&rel=0"
                      title="Levi Live Camera"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground p-4 text-center">
                    {lang === "en" 
                      ? "Live view from Levi ski resort – see the current conditions on the slopes" 
                      : "Suora näkymä Levin hiihtokeskuksesta – näe rinteiden tilanne reaaliajassa"}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Weather & Map Section */}
            <section className="grid md:grid-cols-2 gap-8 mb-20">
              <Card className="glass-card border-border/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Cloud className="w-6 h-6 text-primary" />
                    <CardTitle>{t.weatherTitle}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t.weatherText}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://www.foreca.fi/Finland/Levi" target="_blank" rel="noopener noreferrer">
                      {t.weatherCta} <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <CardTitle>{t.mapTitle}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t.mapText}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://www.google.com/maps/place/Levi,+Finland" target="_blank" rel="noopener noreferrer">
                      {t.mapCta} <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Useful Links */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-8">{t.linksTitle}</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {t.usefulLinks.map((link) => (
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
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default Levi;
