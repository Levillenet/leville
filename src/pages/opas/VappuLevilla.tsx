import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import PageCTA from "@/components/PageCTA";
import StickyBookingBar from "@/components/StickyBookingBar";
import WhatsAppChat from "@/components/WhatsAppChat";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import {
  PartyPopper, Ticket, MapPin, Calendar, Snowflake, Music,
  Trophy, Clock, Gift, Mountain, Users, ExternalLink, Copy, Check,
} from "lucide-react";
import { useState } from "react";

/* ─── Decorative SVG components ─── */

const Serpentine = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute pointer-events-none select-none ${className}`}
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 30 Q25 5 50 30 T100 30 T150 30 T200 30"
      stroke="#FACC15"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M0 40 Q25 15 50 40 T100 40 T150 40 T200 40"
      stroke="#3B82F6"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M0 20 Q25 -5 50 20 T100 20 T150 20 T200 20"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.35"
    />
    <path
      d="M0 50 Q25 25 50 50 T100 50 T150 50 T200 50"
      stroke="#22C55E"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.35"
    />
  </svg>
);

const Balloon = ({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) => (
  <svg
    className={`absolute pointer-events-none select-none ${className}`}
    width="36"
    height="52"
    viewBox="0 0 36 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="18" cy="18" rx="16" ry="18" fill={color} opacity="0.7" />
    <ellipse cx="18" cy="18" rx="16" ry="18" fill="white" opacity="0.18" />
    <path d="M18 36 L16 38 L20 38 Z" fill={color} opacity="0.7" />
    <path
      d="M18 38 Q16 42 19 46 Q17 48 18 52"
      stroke={color}
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

const WavyDivider = () => (
  <div className="w-full overflow-hidden my-8 md:my-12">
    <svg
      className="w-full h-6"
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12 Q75 0 150 12 T300 12 T450 12 T600 12 T750 12 T900 12 T1050 12 T1200 12"
        stroke="#FACC15"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M0 18 Q75 6 150 18 T300 18 T450 18 T600 18 T750 18 T900 18 T1050 18 T1200 18"
        stroke="#3B82F6"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
    </svg>
  </div>
);

/* ─── Copy-to-clipboard button ─── */
const CopyCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 bg-white/90 text-gray-800 font-mono font-bold px-4 py-2 rounded-lg border-2 border-dashed border-yellow-400 hover:bg-yellow-50 transition-colors text-lg"
    >
      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
      {code}
    </button>
  );
};

/* ─── Discount Banner ─── */
const DiscountBanner = ({ variant = "hero" }: { variant?: "hero" | "mid" | "final" }) => {
  const isHero = variant === "hero";
  const isFinal = variant === "final";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${
        isHero
          ? "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-8 md:p-10 shadow-2xl"
          : isFinal
            ? "bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 p-8 md:p-10 shadow-xl"
            : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 md:p-8 shadow-lg"
      }`}
    >
      {/* Serpentine decoration */}
      <Serpentine className="top-0 left-0 w-full h-12 opacity-60" />

      <div className="relative z-10 text-center text-white">
        <p className="text-3xl md:text-4xl mb-2">🎉</p>
        <h3
          className={`font-extrabold mb-3 ${
            isHero ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          {isHero
            ? "VARAA VAPPUMAJOITUS -10% ALENNUKSELLA"
            : isFinal
              ? "Älä jää ilman – varaa vappumajoitus nyt!"
              : "🎿 Vielä ehdit varata!"}
        </h3>
        <p className="mb-4 text-white/90 text-sm md:text-base">
          {isHero
            ? "Koodi on voimassa kaikkiin huoneistoihimme ja mökkeihin vappuviikonlopulle 29.4.–2.5.2026."
            : isFinal
              ? "Koodi vappu2026 = -10% kaikista kohteista"
              : "Vappumajoitus -10% koodilla"}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <span className="text-sm text-white/80">Käytä koodia:</span>
          <CopyCode code="vappu2026" />
        </div>

        <a
          href="https://app.moder.fi/levillenet"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 font-bold rounded-xl transition-all ${
            isHero
              ? "bg-white text-orange-600 hover:bg-yellow-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105"
              : isFinal
                ? "bg-white text-amber-600 hover:bg-yellow-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105"
                : "bg-white text-indigo-600 hover:bg-blue-50 px-6 py-3 text-base shadow-md"
          }`}
        >
          {isHero ? "Varaa nyt ja säästä" : isFinal ? "Varaa vappumajoitus" : "Katso vapaat huoneistot"}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

/* ─── Event Card ─── */
const EventCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="glass-card border-border/30 rounded-xl p-6 hover:border-yellow-400/50 transition-colors">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 shrink-0">
        <Icon className="w-6 h-6 text-yellow-500" />
      </div>
      <div>
        <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
        <div className="text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  </div>
);

/* ─── FAQ item ─── */
const FAQItem = ({ q, a }: { q: string; a: string }) => (
  <details className="group glass-card border-border/30 rounded-xl p-5 cursor-pointer hover:border-yellow-400/40 transition-colors">
    <summary className="font-semibold text-foreground flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
      <span className="text-yellow-500 text-lg">❓</span>
      {q}
      <span className="ml-auto text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
    </summary>
    <p className="mt-3 text-muted-foreground leading-relaxed pl-7">{a}</p>
  </details>
);

/* ─── Main page ─── */
const VappuLevilla = () => {
  const lang = "fi";

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Levi MayDay 2026",
    startDate: "2026-04-29",
    endDate: "2026-05-01",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Levi Ski Resort",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Levi",
        addressRegion: "Lapland",
        addressCountry: "FI",
      },
    },
    description:
      "Vappu Levillä – kevätlaskettelua, vappukulkue, vesihiihto, live-esiintyjiä ja ikimuistoinen tunnelma Suomen Lapin tunturissa.",
    organizer: {
      "@type": "Organization",
      name: "Levi Ski Resort",
      url: "https://www.levi.fi",
    },
    offers: {
      "@type": "Offer",
      name: "Vappumajoitus -10% alennuksella",
      url: "https://app.moder.fi/levillenet",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  const faqItems = [
    {
      question: "Ovatko rinteet auki vappuna?",
      answer:
        "Kyllä! Levin rinteet ovat tyypillisesti auki toukokuun toiselle viikolle asti. Vappuna pääset nauttimaan aurinkoisista keväthangista.",
    },
    {
      question: "Miten alennuskoodi vappu2026 toimii?",
      answer:
        "Mene varaussivullemme (app.moder.fi/levillenet), valitse haluamasi huoneisto ja päivät, ja syötä koodi vappu2026 varausta tehdessäsi. Saat -10% alennuksen kaikista kohteistamme.",
    },
    {
      question: "Millainen sää on vappuna Levillä?",
      answer:
        "Tyypillisesti -5°C – +5°C. Päivät ovat pitkiä ja aurinkoisia. Lunta on vielä runsaasti rinteissä mutta kylässä sulaa jo.",
    },
    {
      question: "Tarvitseeko vappukulkueeseen lippua?",
      answer:
        "Ei – kulkue on ilmainen ja avoin kaikille! Pue naamiaisasu ja liity mukaan Game Bar Levin edestä 30.4. klo 14.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbItems = [
    { label: "Etusivu", href: "/" },
    { label: "Opas", href: "/opas/matkaopas-levi" },
    { label: "Vappu Levillä" },
  ];

  const readNextLinks = [
    { title: "Laskettelu Levillä", desc: "Kaikki rinteistä ja hisseistä", href: "/opas/laskettelu-levi" },
    { title: "Miten saavut Leville", desc: "Lennot, autolla, julkiset", href: "/opas/miten-paasee-leville" },
    { title: "Ravintolat ja palvelut", desc: "Ruoka ja palvelut Levillä", href: "/opas/ravintolat-ja-palvelut-levilla" },
    { title: "Huhtikuu Levillä", desc: "Kevään parhaat kelitiedot", href: "/opas/levi-huhtikuussa" },
    { title: "Toukokuu Levillä", desc: "Kauden päätös", href: "/opas/levi-toukokuussa" },
    { title: "Majoitusopas", desc: "Mökki vai huoneisto?", href: "/opas/majoitus-levilla" },
  ];

  return (
    <>
      <SeoMeta
        title="Vappu Levillä – Majoitus -10% koodilla vappu2026 | Leville.net"
        description="Vappu Levillä on kevään kohokohta! Rinteet auki, vappukulkue, vesihiihto ja live-esiintyjät. Varaa majoitus -10% alennuksella koodilla vappu2026."
        canonicalUrl="https://leville.net/opas/vappu-levilla"
        lang={lang}
        ogType="article"
      />
      <HreflangTags
        currentPath="/opas/vappu-levilla"
        currentLang="fi"
        customUrls={{ fi: "/opas/vappu-levilla" }}
      />
      <JsonLd data={eventJsonLd} />
      <JsonLd data={faqJsonLd} />

      <Header />
      <SubpageBackground />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Festive sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300/30 via-amber-100/20 to-transparent -z-10" />

        {/* Decorative serpentines */}
        <Serpentine className="top-4 left-0 w-[60%] h-10 rotate-[-2deg]" />
        <Serpentine className="top-12 right-0 w-[50%] h-8 rotate-[3deg]" />
        <Serpentine className="bottom-8 left-[10%] w-[70%] h-8 rotate-[-1deg]" />

        {/* Balloons */}
        <Balloon color="#FACC15" className="top-16 left-[8%] w-8 h-12 md:w-10 md:h-14 animate-bounce" />
        <Balloon color="#3B82F6" className="top-24 left-[15%] w-6 h-10 md:w-8 md:h-12 animate-bounce [animation-delay:200ms]" />
        <Balloon color="#EF4444" className="top-20 right-[10%] w-9 h-13 md:w-11 md:h-16 animate-bounce [animation-delay:400ms]" />
        <Balloon color="#22C55E" className="top-28 right-[18%] w-7 h-11 md:w-9 md:h-13 animate-bounce [animation-delay:600ms]" />
        <Balloon color="#A855F7" className="top-12 right-[30%] w-6 h-10 md:w-8 md:h-12 animate-bounce [animation-delay:300ms]" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="max-w-4xl mx-auto text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/40 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-yellow-700 dark:text-yellow-300">
              <PartyPopper className="w-4 h-4" />
              Levi MayDay 2026 · 29.4.–1.5.
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              Vappu Levillä
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Kevään railakkain tunturijuhla
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
              Vappu Levillä ei ole tavallinen vappu. Kun muualla Suomessa juhlitaan kaupunkien
              puistoissa, Levillä lasketaan aurinkoisilla keväthangilla, pukeudutaan hulvattomiin
              naamiaisasuihin ja juhlistetaan kauden parhaita laskukelejä. Levi MayDay on useamman
              päivän tapahtuma joka täyttää tunturikylän musiikilla, kilpailuilla ja aidolla Lapin
              vapputunnelmalla. Rinteet ovat auki toukokuun alkupuolelle asti – harva paikka Suomessa
              tarjoaa tätä.
            </p>

            {/* Hero discount banner */}
            <DiscountBanner variant="hero" />
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* ═══ EVENTS ═══ */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-yellow-500" />
            Levi MayDay 2026 – Tapahtumat ja ohjelma
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Levi MayDay on Levin kevätkauden päätapahtuma joka järjestetään vappuviikolla.
            Tässä tärkeimmät tapahtumat:
          </p>

          <div className="grid gap-5">
            <EventCard icon={PartyPopper} title="Vappukulkue 30.4. klo 14:00">
              <p>
                Levin legendaarinen naamiaiskulkue starttaa Game Bar Levin edestä klo 14 ja kiertää
                kylän läpi V'inkkariin. Parhaat asut palkitaan! Pue yllesi hulvattomimmat tamineesi ja
                liity mukaan.
              </p>
            </EventCard>

            <EventCard icon={Mountain} title="Vesihiihto eturinteillä">
              <p>
                Hullunkurista vesihiihtoa eturinteiden kupeessa! Liidä lammen yli taidolla tai
                tunteella – tekniikalla on väliä lähinnä pinnalla pysymistä varten. Alkukarsintojen
                jälkeen finaalit.
              </p>
            </EventCard>

            <EventCard icon={Music} title="Live-esiintyjät">
              <p>
                Vappuviikolla Levin lavoilla nähdään tunnettuja artisteja. Showtime noin klo 23.30.
                Tarkempi aikataulu ja esiintyjätiedot julkaistaan{" "}
                <a
                  href="https://www.levi.fi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80 inline-flex items-center gap-1"
                >
                  Levi MayDay 2026 -sivulla <ExternalLink className="w-3 h-3" />
                </a>
                .
              </p>
            </EventCard>

            <EventCard icon={Snowflake} title="Rinteet auki vappuna">
              <p>
                Levin rinteet ovat auki vappunakin – toukokuun alkupuolelle asti pääset nauttimaan
                aurinkoisista keväthangista. Kevätaurinko lämmittää, hanki kantaa ja jonot ovat
                lyhyet. Parasta kevätlaskettelua!
              </p>
            </EventCard>

            <EventCard icon={Users} title="After ski ja ravintolat">
              <p>
                Levin ravintolat ja baarit (V'inkkari, Hullu Poro, Game Bar, Ihku) ovat vapun aikaan
                täydessä vauhdissa. Vappu on yksi kauden vilkkaimmista viikonlopuista – tunnelma on
                katossa.
              </p>
            </EventCard>
          </div>

          <p className="mt-6 text-muted-foreground">
            Lisätietoa kaikista tapahtumista:{" "}
            <a
              href="https://www.levi.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80 inline-flex items-center gap-1"
            >
              Levi MayDay 2026 virallinen ohjelma (levi.fi) <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </section>

      <WavyDivider />

      {/* Mid-content discount banner */}
      <section className="container mx-auto px-4 pb-4">
        <div className="max-w-3xl mx-auto">
          <DiscountBanner variant="mid" />
        </div>
      </section>

      <WavyDivider />

      {/* ═══ WHY VAPPU IN LEVI ═══ */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Miksi viettää vappu Levillä?
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Snowflake,
                title: "Rinteet vielä auki",
                text: "Levin rinteet ovat auki tyypillisesti toukokuun toiselle viikolle asti. Vappu on loistava aika laskettelulle: pitkät valoisat päivät, pehmeä keväthankikeli ja lyhyet hissijonot. Tämä on yksi kauden parhaista viikoista hinta-laatusuhteella.",
              },
              {
                icon: PartyPopper,
                title: "Ainutlaatuinen tunnelma",
                text: "Vappu tunturissa on aivan eri kokemus kuin kaupungissa. Naamiaiskulkue lumisessa kylässä, after ski auringonlaskun aikaan ja rinteiltä suoraan ravintolaan. Missään muualla Suomessa ei voi laskea ja juhlia samaan aikaan.",
              },
              {
                icon: Ticket,
                title: "Edullisemmat hinnat",
                text: "Vappuviikko on huippusesongin ja kesän välissä, joten majoitushinnat ovat merkittävästi edullisempia kuin joulu- tai hiihtolomakaudella. Ja meidän -10% vappukoodilla säästät entisestään.",
              },
              {
                icon: MapPin,
                title: "Helppo saavutettavuus",
                text: "Kittilän lentokenttä on 15 minuutin päässä Leviltä. Suorat lennot Helsingistä, ja autopaikka sisältyy kaikkiin majoituksiimme.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-card border-border/30 rounded-xl p-6 hover:border-yellow-400/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-yellow-400/20 to-orange-400/20">
                    <item.icon className="w-5 h-5 text-yellow-500" />
                  </div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* ═══ PRACTICAL TIPS ═══ */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 flex items-center gap-3">
            <Gift className="w-8 h-8 text-yellow-500" />
            Käytännön vinkit vappulomalle Levillä
          </h2>

          <div className="space-y-5">
            {[
              {
                icon: Clock,
                title: "Varaa ajoissa",
                text: (
                  <>
                    Vappuviikko on suosittu. Parhaat huoneistot varataan aikaisin. Käytä koodia{" "}
                    <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded font-mono text-sm font-bold">
                      vappu2026
                    </code>{" "}
                    niin saat -10%.
                  </>
                ),
              },
              {
                icon: Gift,
                title: "Pukeutuminen",
                text: "Päivällä rinteessä riittää kevyempi kerrastus kuin keskitalvella. Illalla voi olla viileämpää, joten ota takki mukaan iltamenoihin. Ja tietysti naamiaisasu vappukulkuetta varten!",
              },
              {
                icon: Mountain,
                title: "Rinteiden aukioloajat",
                text: (
                  <>
                    Tarkista rinnetilanne{" "}
                    <a
                      href="https://www.levi.fi/rinteet-ja-ladut"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Levin rinneinfosta
                    </a>
                    . Keväällä rinteet voivat avautua myöhemmin aamulla ja sulkeutua aikaisemmin – tämä vaihtelee vuosittain.
                  </>
                ),
              },
              {
                icon: Users,
                title: "Ravintolat",
                text: (
                  <>
                    Varaa pöytä hyvissä ajoin jos haluat syödä vappupäivänä. Katso suositukset{" "}
                    <a
                      href="/opas/ravintolat-ja-palvelut-levilla"
                      className="text-primary underline hover:text-primary/80"
                    >
                      ravintolaoppaastamme
                    </a>
                    .
                  </>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-card border-border/30 rounded-xl p-5 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-yellow-400/20 to-orange-400/20 shrink-0">
                  <item.icon className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* ═══ FAQ ═══ */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-yellow-500" />
            Usein kysytyt kysymykset vappulomasta Levillä
          </h2>

          <div className="space-y-4">
            {faqItems.map((f, idx) => (
              <FAQItem key={idx} q={f.question} a={f.answer} />
            ))}
          </div>
        </div>
      </section>

      <WavyDivider />

      {/* Final discount banner */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <DiscountBanner variant="final" />
        </div>
      </section>

      {/* Read Next */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ReadNextSection title="Lue myös" links={readNextLinks} />
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <GuideDisclaimer lang={lang} />
        </div>
      </div>

      <PageCTA lang={lang} />
      <Footer lang={lang} />
      <StickyBookingBar lang={lang} />
      <WhatsAppChat />
    </>
  );
};

export default VappuLevilla;
