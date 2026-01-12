import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import LeviSeasons from "@/components/LeviSeasons";
import LeviFacts from "@/components/LeviFacts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, Snowflake, Sun, MapPin, Cloud, ExternalLink, LucideIcon, Video, Brain, Star, Gift, Flame, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getTranslations, Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import OptimizedImage from "@/components/OptimizedImage";
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
  const location = useLocation();

  const galleryImages = t.gallery.map((item, index) => ({
    src: galleryImageSources[index],
    alt: item.alt,
    caption: item.caption,
  }));

  // Multilingual UI content
  const content: Record<Language, {
    quizTitle: string;
    quizDesc: string;
    quizButton: string;
    christmasTitle: string;
    christmasDesc: string;
    christmasButton: string;
    liveCamera: string;
    liveCameraDesc: string;
    pronounceLabel: string;
  }> = {
    fi: {
      quizTitle: "Testaa Levi-tietämyksesi!",
      quizDesc: "Pelaa hauska tietovisa Suomen suosituimmasta hiihtokeskuksesta.",
      quizButton: "Aloita visa",
      christmasTitle: "Joulu Lapissa",
      christmasDesc: "Koe taianomainen joulu joulupukin kotimaassa.",
      christmasButton: "Lue lisää",
      liveCamera: "Levin live-kamera",
      liveCameraDesc: "Suora näkymä Levin hiihtokeskuksesta – näe rinteiden tilanne reaaliajassa",
      pronounceLabel: "Miten Levi lausutaan?"
    },
    en: {
      quizTitle: "Test Your Levi Knowledge!",
      quizDesc: "Take our fun quiz about Finland's favorite ski resort.",
      quizButton: "Start Quiz",
      christmasTitle: "Christmas in Lapland",
      christmasDesc: "Experience a magical Christmas in the home of Santa Claus.",
      christmasButton: "Read more",
      liveCamera: "Levi Live Camera",
      liveCameraDesc: "Live view from Levi ski resort – see the current conditions on the slopes",
      pronounceLabel: "How to pronounce Levi?"
    },
    sv: {
      quizTitle: "Testa din Levi-kunskap!",
      quizDesc: "Spela ett roligt quiz om Finlands populäraste skidort.",
      quizButton: "Starta quiz",
      christmasTitle: "Jul i Lappland",
      christmasDesc: "Upplev en magisk jul i jultomtens hemland.",
      christmasButton: "Läs mer",
      liveCamera: "Levi livekamera",
      liveCameraDesc: "Direktsändning från Levi skidort – se aktuella förhållanden på backarna",
      pronounceLabel: "Hur uttalas Levi?"
    },
    de: {
      quizTitle: "Teste dein Levi-Wissen!",
      quizDesc: "Spiele unser lustiges Quiz über Finnlands beliebtestes Skigebiet.",
      quizButton: "Quiz starten",
      christmasTitle: "Weihnachten in Lappland",
      christmasDesc: "Erlebe ein magisches Weihnachten in der Heimat des Weihnachtsmanns.",
      christmasButton: "Mehr lesen",
      liveCamera: "Levi Live-Kamera",
      liveCameraDesc: "Live-Blick aus dem Skigebiet Levi – sieh die aktuellen Bedingungen auf den Pisten",
      pronounceLabel: "Wie spricht man Levi aus?"
    },
    es: {
      quizTitle: "¡Pon a prueba tus conocimientos sobre Levi!",
      quizDesc: "Juega nuestro divertido quiz sobre la estación de esquí más popular de Finlandia.",
      quizButton: "Comenzar quiz",
      christmasTitle: "Navidad en Laponia",
      christmasDesc: "Vive una Navidad mágica en el hogar de Papá Noel.",
      christmasButton: "Leer más",
      liveCamera: "Cámara en vivo de Levi",
      liveCameraDesc: "Vista en directo desde la estación de esquí de Levi – ve las condiciones actuales en las pistas",
      pronounceLabel: "¿Cómo se pronuncia Levi?"
    },
    fr: {
      quizTitle: "Testez vos connaissances sur Levi !",
      quizDesc: "Jouez à notre quiz amusant sur la station de ski la plus populaire de Finlande.",
      quizButton: "Commencer le quiz",
      christmasTitle: "Noël en Laponie",
      christmasDesc: "Vivez un Noël magique dans le pays du Père Noël.",
      christmasButton: "En savoir plus",
      liveCamera: "Caméra en direct de Levi",
      liveCameraDesc: "Vue en direct de la station de ski de Levi – voyez les conditions actuelles sur les pistes",
      pronounceLabel: "Comment prononcer Levi ?"
    }
  };

  const localeMap: Record<Language, string> = {
    fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR"
  };

  const quizLinks: Record<Language, string> = {
    fi: "/tietovisa", en: "/en/quiz", sv: "/sv/quiz", de: "/de/quiz", es: "/es/quiz", fr: "/fr/quiz"
  };

  const christmasLinks: Record<Language, string> = {
    fi: "/levi/joulu-lapissa",
    en: "/en/levi/christmas-in-lapland",
    sv: "/sv/levi/jul-i-lappland",
    de: "/de/levi/weihnachten-in-lappland",
    es: "/es/levi/navidad-en-laponia",
    fr: "/fr/levi/noel-en-laponie"
  };

  const c = content[lang];

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={localeMap[lang]} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-10 sm:mb-16 px-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
            </section>

            {/* CTA Cards Section */}
            <section className="mb-10 sm:mb-16 grid sm:grid-cols-2 gap-4">
              {/* Quiz CTA */}
              <Card className="glass-card border-primary/30 bg-primary/5 overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {c.quizTitle}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {c.quizDesc}
                      </p>
                    </div>
                    <Button asChild size="default" className="text-sm">
                      <Link to={quizLinks[lang]}>
                        {c.quizButton}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Christmas CTA */}
              <Card className="relative overflow-hidden border-red-500/40 bg-gradient-to-br from-red-950/40 via-red-900/20 to-background">
                {/* Decorative elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <Star className="absolute top-3 left-4 w-4 h-4 text-amber-400/40 animate-pulse" style={{ animationDelay: '0s' }} />
                  <Snowflake className="absolute top-4 right-6 w-5 h-5 text-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <Flame className="absolute bottom-4 left-6 w-4 h-4 text-amber-500/35 animate-pulse" style={{ animationDelay: '1s' }} />
                  <Star className="absolute bottom-6 right-4 w-3 h-3 text-amber-400/35 animate-pulse" style={{ animationDelay: '1.5s' }} />
                  <Flame className="absolute top-1/2 right-8 w-3 h-3 text-amber-500/25 animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
                <CardContent className="p-4 sm:p-6 relative z-10">
                  <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/25 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                      <Gift className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {c.christmasTitle}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {c.christmasDesc}
                      </p>
                    </div>
                    <Button asChild size="default" className="text-sm bg-red-600 hover:bg-red-700 text-white border-0">
                      <Link to={christmasLinks[lang]}>
                        {c.christmasButton}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Levi Facts Section */}
            <LeviFacts lang={lang} />

            {/* Seasons Section */}
            <LeviSeasons lang={lang} />

            {/* Hero Image Gallery - Masonry-style */}
            <section className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Large featured image */}
                <div className="md:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-2xl">
                  <OptimizedImage 
                    src={galleryImages[0].src} 
                    alt={galleryImages[0].alt}
                    priority
                    className="w-full h-64 md:h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <p className="text-foreground font-medium text-lg">{galleryImages[0].caption}</p>
                  </div>
                </div>

                {/* Smaller images */}
                {galleryImages.slice(1, 3).map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl">
                    <OptimizedImage 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-48 md:h-56 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <p className="text-foreground font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Activities */}
            <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-20">
              {t.activities.map((activity, index) => {
                const Icon = activityIcons[index];
                return (
                  <Card key={activity.title} className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-3 sm:mb-4">
                        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl text-foreground">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <p className="text-sm sm:text-base text-muted-foreground">{activity.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </section>

            {/* Second Gallery Row */}
            <section className="mb-12 sm:mb-20">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8 text-center">{t.galleryTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {galleryImages.slice(3).map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl aspect-[4/3]">
                    <OptimizedImage 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <p className="text-foreground font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Live Camera Section */}
            <section className="mb-12 sm:mb-20">
              <Card className="glass-card border-border/30 overflow-hidden">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <Video className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">{c.liveCamera}</CardTitle>
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
                  <p className="text-xs sm:text-sm text-muted-foreground p-3 sm:p-4 text-center">
                    {c.liveCameraDesc}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Pronunciation Link */}
            <section className="mb-12 sm:mb-20 text-center">
              <Link 
                to="/levi-pronounce" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Volume2 className="w-4 h-4 group-hover:text-primary" />
                <span className="text-sm underline-offset-4 group-hover:underline">{c.pronounceLabel}</span>
              </Link>
            </section>

            {/* Useful Links */}
            <section className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8">{t.linksTitle}</h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {t.usefulLinks.map((link) => (
                  <Button key={link.name} asChild variant="secondary" className="text-xs sm:text-sm">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name} <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                    </a>
                  </Button>
                ))}
              </div>
            </section>
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default Levi;
