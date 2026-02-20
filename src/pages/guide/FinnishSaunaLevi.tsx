import { Helmet } from "react-helmet-async";
import saunaTimerDial from "@/assets/sauna-timer-dial.png";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Brain,
  Snowflake,
  Moon,
  Flame,
  Waves,
  Thermometer,
  Droplets,
  Star,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  XCircle,
  Timer,
  ShowerHead,
} from "lucide-react";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FinnishSaunaLevi = () => {
  const location = useLocation();

  const hreflangUrls = {
    fi: "https://leville.net/opas/sauna-levilla",
    en: "https://leville.net/guide/finnish-sauna-in-levi",
  };

  const faqItems = [
    {
      q: "Do I have to be naked in the sauna?",
      a: "Traditionally yes, but wearing a swimsuit or towel is perfectly acceptable. In your own cabin sauna with family or friends, do whatever feels comfortable. In public saunas (like spas), swimwear is usually required.",
    },
    {
      q: "How hot is a Finnish sauna?",
      a: "Typically 65–80 °C (150–175 °F). For beginners, the lower bench is cooler and the upper bench is hotter. Start low and move up as you get used to the heat.",
    },
    {
      q: "Can children go to sauna?",
      a: "Yes! Finnish children go to sauna from infancy. With children, keep the temperature lower (50–60 °C / 120–140 °F) and sessions shorter. The lower bench is best for kids.",
    },
    {
      q: "What is ice swimming (avantouinti)?",
      a: "Ice swimming means plunging into icy water (typically 1–4 °C / 34–39 °F) after sauna. It sounds extreme, but the feeling is incredibly refreshing. Don't stay in long – a few seconds is enough. Get out and go back to the sauna.",
    },
    {
      q: "How long should I stay in the sauna?",
      a: "As long as it feels good – usually 10–20 minutes per round. Then cool down and go again. A typical sauna session lasts 1–2 hours in total, including breaks.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbItems = [
    { label: "Home", href: "/en" },
    { label: "Travel Guide to Levi", href: "/guide/travel-to-levi" },
    { label: "Finnish Sauna in Levi", href: "/guide/finnish-sauna-in-levi" },
  ];

  const healthBenefits = [
    {
      icon: Heart,
      title: "Circulation & Recovery",
      desc: "Heat dilates blood vessels and improves circulation. After a day on the slopes, sauna is the best recovery for sore muscles.",
      color: "text-red-400",
      bg: "bg-red-500/15",
    },
    {
      icon: Brain,
      title: "Stress Relief",
      desc: 'Sauna lowers cortisol levels and releases endorphins. As the Finns say: "The sauna is the poor man\'s pharmacy."',
      color: "text-purple-400",
      bg: "bg-purple-500/15",
    },
    {
      icon: Snowflake,
      title: "Immune System",
      desc: "Regular sauna use combined with hot-cold alternation strengthens the immune system. Ice swimming after sauna is the ultimate version of this.",
      color: "text-sky-400",
      bg: "bg-sky-500/15",
    },
    {
      icon: Moon,
      title: "Sleep",
      desc: "An evening sauna helps you fall asleep. The drop in body temperature after sauna triggers natural drowsiness.",
      color: "text-indigo-400",
      bg: "bg-indigo-500/15",
    },
  ];

  const experiences = [
    {
      icon: Flame,
      title: "Smoke Sauna",
      desc: "The smoke sauna is the oldest form of Finnish sauna – the stove is heated for hours without a chimney, resulting in a soft, mystical steam. In Levi, you can experience a smoke sauna at Sammuntupa and Immelkartano, among others.",
      color: "text-orange-400",
      bg: "bg-orange-500/15",
    },
    {
      icon: Waves,
      title: "Floating Arctic Sauna",
      desc: "Immelkartano's floating sauna on the frozen Lake Immeljärvi is a unique experience: a wood-heated sauna on ice, an ice hole, and a lake illuminated from below. Available during the winter season.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/15",
    },
    {
      icon: Snowflake,
      title: "Igloo Sauna",
      desc: "At Northern Lights Village, you can sauna in an igloo sauna where you can see the starry sky and possible northern lights through the glass roof while bathing.",
      color: "text-sky-400",
      bg: "bg-sky-500/15",
    },
    {
      icon: Thermometer,
      title: "Ice Swimming",
      desc: "Many sauna experiences include ice swimming – a plunge into icy water (1–4 °C / 34–39 °F) after sauna. It sounds crazy, but the feeling is incredibly refreshing and leaves your body tingling. Available at Immelkartano, Sammuntupa and Elves Village, among others.",
      color: "text-blue-400",
      bg: "bg-blue-500/15",
    },
    {
      icon: Droplets,
      title: "Water World Levi Spa",
      desc: "Located at Levi Hotel Spa, Water World Levi offers a traditional Finnish sauna, log sauna and steam room plus swimming pools, water slide and outdoor jacuzzis. Great for the whole family.",
      color: "text-teal-400",
      bg: "bg-teal-500/15",
    },
    {
      icon: Star,
      title: "Private Sauna & Hot Tub",
      desc: "Many Levi accommodations offer a private sauna plus an outdoor hot tub. Imagine: sitting in a steaming hot tub in freezing temperatures, gazing at the starry sky or northern lights above. This is many visitors' highlight of their Lapland holiday.",
      color: "text-amber-400",
      bg: "bg-amber-500/15",
    },
  ];

  const etiquette = [
    { text: "Shower first – Always shower before entering the sauna. This is an absolute rule.", ok: true },
    { text: "Nudity is normal – In traditional Finnish sauna, people go nude, but wearing a swimsuit or towel is perfectly acceptable, especially in a cabin sauna with friends.", ok: true },
    { text: "Sit on a towel – The bench is hot. Place a towel underneath you.", ok: true },
    { text: "Throw water gently – Start with a small amount of water on the stones. You can add more if you want more heat. Ask others before throwing more löyly.", ok: true },
    { text: "Cool down – Step outside between rounds to cool down. In winter, you can stand on the terrace or take a dip in an ice hole.", ok: true },
    { text: "Drink water – Sauna dehydrates. Drink water before, during and after.", ok: true },
    { text: "Silence is golden – You can talk in the sauna, but many enjoy the silence. Respect the mood.", ok: true },
    { text: "Don't compete – Sauna is not an endurance test. If it's too hot, move to a lower bench or step outside.", ok: false },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Finnish Sauna in Levi – Culture, Tips & Experiences | Leville.net</title>
        <meta name="description" content="Everything about Finnish sauna in Levi: sauna culture, how to use an electric heater, health benefits and the best sauna experiences from smoke sauna to ice swimming." />
        <link rel="canonical" href="https://leville.net/guide/finnish-sauna-in-levi" />
        <meta property="og:title" content="Finnish Sauna in Levi – Culture, Tips & Experiences | Leville.net" />
        <meta property="og:description" content="Everything about Finnish sauna in Levi: sauna culture, how to use an electric heater, health benefits and the best sauna experiences from smoke sauna to ice swimming." />
        <meta property="og:url" content="https://leville.net/guide/finnish-sauna-in-levi" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Finnish Sauna in Levi – Culture, Tips & Experiences | Leville.net" />
        <meta name="twitter:description" content="Everything about Finnish sauna in Levi: sauna culture, how to use an electric heater, health benefits and the best sauna experiences from smoke sauna to ice swimming." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Finnish Sauna in Levi – A Guide to Sauna Culture
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about sauna on your Lapland holiday
            </p>
          </header>

          {/* Intro */}
          <section className="mb-12">
            <p className="text-muted-foreground leading-relaxed">
              Finland has over 3 million saunas – more than passenger cars. For Finns, the sauna is much more than a place to wash: it is a sanctuary of relaxation, silence and togetherness. UNESCO added Finnish sauna culture to its Intangible Cultural Heritage list in 2020. In Levi, this tradition is especially strong – nearly every cabin and apartment has its own sauna, and the area has over 2,000 saunas in total. This guide tells you everything you need to know about sauna on your Levi holiday – whether it's your first time or your thousandth.
            </p>
          </section>

          {/* What Is Finnish Sauna */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">What Is Finnish Sauna?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sauna is simple: you sit in a hot room (typically 65–80 °C / 150–175 °F), throw water on the hot stones to create steam (called "löyly"), sweat, cool down, and repeat. In Finnish sauna, the pleasure comes from the gentle heat, the hiss of steam, and the contrast with cold – in winter, that might mean a dip in an ice hole or a roll in the snow. Sauna is not a competition or an endurance test. Go at your own pace, listen to your body, and enjoy.
            </p>
          </section>

          {/* Health Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Health Benefits of Sauna</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {healthBenefits.map((b, i) => (
                <Card key={i} className="border-border/30">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center mx-auto mb-3`}>
                      <b.icon className={`w-6 h-6 ${b.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Etiquette */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Sauna Etiquette – How to Behave</h2>
            <Card className="border-border/30 bg-muted/30">
              <CardContent className="p-5 sm:p-6 space-y-3">
                {etiquette.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {item.ok ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* How to Heat an Electric Sauna */}
          <section className="mb-12" id="electric-sauna">
            <h2 className="text-2xl font-bold text-foreground mb-6">How to Heat an Electric Sauna</h2>

            <div className="bg-muted/40 border border-border/40 rounded-xl shadow-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-orange-500/15 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground">🔥 How to Heat an Electric Sauna in Your Accommodation</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                This guide covers the most common type of electric sauna heater – one with a <strong>manual timer dial</strong>. Some newer saunas may have a <strong>digital control panel</strong>, which is usually simpler to operate: just press the power button to turn it on and off. The instructions below apply to the traditional manual timer switch.
              </p>

              {/* Before heating */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <ShowerHead className="w-4 h-4 text-primary" />
                  Before heating
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Check the sauna room. Make sure there is no laundry or anything else on the heater and that the door and window are closed.
                </p>
              </div>

              {/* Timer */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Timer className="w-4 h-4 text-primary" />
                  The heater is controlled by a timer switch
                </h4>
                <p className="text-sm text-muted-foreground">The timer switch has two ranges:</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                  {/* Timer dial image card */}
                  <div className="bg-background/60 rounded-lg p-4 border border-border/30 flex flex-col items-center justify-center">
                    <img 
                      src={saunaTimerDial} 
                      alt="Sauna timer dial showing Range A (1-4 hours, immediate heating) and Range B (1-8 hours, delayed heating)" 
                      className="w-full max-w-[180px] object-contain"
                    />
                    <p className="text-xs text-muted-foreground text-center mt-2">Timer switch with ranges A & B</p>
                  </div>

                  {/* Range A */}
                  <div className="bg-background/60 rounded-lg p-4 border border-border/30">
                    <div className="font-semibold text-foreground mb-1 text-sm">Range A (1–4 hours) – Immediate heating</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The heating elements switch on immediately and the heater stays warm for the selected number of hours (h).
                    </p>
                  </div>

                  {/* Range B */}
                  <div className="bg-background/60 rounded-lg p-4 border border-border/30">
                    <div className="font-semibold text-foreground mb-1 text-sm">Range B (1–8 hours) – Delayed heating</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A preselected time after which the heater will switch on. For example, if you select 4, the heater will turn on after four hours and stay warm for four hours unless it is manually switched off earlier.
                    </p>
                  </div>
                </div>
              </div>

              {/* Temperature control */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Temperature control</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Turn the thermostat switch to set the desired temperature. Experiment to find the right level for you. Start with the maximum position of the control range. If the temperature gets too high during your bathing session, turn the switch slightly counterclockwise. Please note that even a small adjustment can cause a noticeable temperature change. A comfortable sauna temperature is <strong>65–80 °C (150–175 °F)</strong>.
                </p>
              </div>

              {/* Important note */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-sm text-amber-200 leading-relaxed font-medium">
                  ⚠️ <strong>Important note:</strong> Electric radiators in the cottage/apartment may turn themselves off while the sauna is being heated. Please turn off the heater immediately after use so that the electric radiators turn on again.
                </p>
              </div>

              {/* Switching off */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Switching off</h4>
                <p className="text-sm text-muted-foreground">Turn the timer switch counterclockwise to the 0 position.</p>
              </div>

              {/* Heater variations and visual guide */}
              <div className="bg-background/60 rounded-lg p-4 border border-border/30 space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Heaters vary slightly between accommodations, but most electric sauna heaters work as described above.
                </p>
                <a
                  href="/docs/sahkosauna-ohje-en.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary bg-primary/10 border border-primary/30 rounded-lg px-4 py-2.5 hover:bg-primary/20 transition-colors"
                >
                  📄 Detailed visual guide to the most common sauna heater
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-5 sm:p-6 space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" /> Tips
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>💡 <strong>Heating time:</strong> The sauna takes about 30–45 minutes to heat up. You'll get a good steam once it's ready.</li>
                <li>💡 <strong>Timer example:</strong> If you go out for 3 hours and want the sauna to be warm when you return – use timer range B and set it to the 2-hour mark. The sauna will start heating after 2 hours and be ready when you arrive.</li>
                <li>💡 <strong>Throwing water:</strong> The air in the sauna becomes dry when heated. It is necessary to increase the humidity by throwing water on the heater stones. Experiment to find the right temperature and humidity for you. Throw only water on the heater – nothing else.</li>
              </ul>
            </div>
          </section>

          {/* Sauna Experiences */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Sauna Experiences in Levi</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In Levi, you can enjoy your accommodation's private sauna, but the area also offers unique sauna experiences:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {experiences.map((exp, i) => (
                <Card key={i} className="border-border/30 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 rounded-xl ${exp.bg} flex items-center justify-center mb-3`}>
                      <exp.icon className={`w-6 h-6 ${exp.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sauna in Your Accommodation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Sauna in Your Accommodation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nearly every rental cabin and apartment in Levi comes with its own private sauna – this is normal in Finland but often a surprise for international visitors. In practice, this means you can sauna every evening on your own schedule. Most accommodation saunas have an electric heater (see the <a href="#electric-sauna" className="text-primary hover:underline">instructions above</a>), but some premium cabins have a wood-fired stove. Book accommodation with a sauna – it's the essential highlight of any Lapland holiday.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border/30 rounded-lg px-4">
                  <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Read also */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Read Also</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Winter Clothing Guide", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
                { title: "Accommodation in Levi", href: "/en/accommodations" },
                { title: "Christmas in Lapland", href: "/en/levi/christmas-in-lapland" },
              ].map((link, i) => (
                <Link key={i} to={link.href}>
                  <Card className="border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">{link.title}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <Link to="/guide/travel-to-levi" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Travel Guide
            </Link>
            <Button asChild size="lg">
              <Link to="/en/accommodations">
                Book accommodation with sauna
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer lang="en" />
      <WhatsAppChat lang="en" />
      <StickyBookingBar lang="en" />
    </div>
  );
};

export default FinnishSaunaLevi;
