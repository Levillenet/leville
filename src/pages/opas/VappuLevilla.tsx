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

const serpentineColors = [
  { stroke: "#FACC15", width: 3, opacity: 0.55 },
  { stroke: "#3B82F6", width: 2.5, opacity: 0.45 },
  { stroke: "#EF4444", width: 2.2, opacity: 0.4 },
  { stroke: "#22C55E", width: 2, opacity: 0.4 },
  { stroke: "#A855F7", width: 2, opacity: 0.35 },
  { stroke: "#F97316", width: 1.8, opacity: 0.35 },
];

const Serpentine = ({ className = "", variant = 0 }: { className?: string; variant?: number }) => {
  const offsets = [10, 20, 30, 40, 50, 55];
  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      viewBox="0 0 300 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {serpentineColors.slice(variant, variant + 4).map((c, i) => {
        const y = offsets[i + variant] ?? 30;
        return (
          <path
            key={i}
            d={`M0 ${y} Q37 ${y - 20} 75 ${y} T150 ${y} T225 ${y} T300 ${y}`}
            stroke={c.stroke}
            strokeWidth={c.width}
            strokeLinecap="round"
            fill="none"
            opacity={c.opacity}
          />
        );
      })}
    </svg>
  );
};

const _balloonColors = ["#FACC15", "#3B82F6", "#EF4444", "#22C55E", "#A855F7", "#F97316", "#EC4899", "#14B8A6"];

const Balloon = ({
  color,
  className = "",
  size = 36,
}: {
  color: string;
  className?: string;
  size?: number;
}) => {
  const h = Math.round(size * 1.44);
  const rx = Math.round(size * 0.44);
  const ry = Math.round(size * 0.5);
  const cx = Math.round(size / 2);
  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      width={size}
      height={h}
      viewBox={`0 0 ${size} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx={cx} cy={ry} rx={rx} ry={ry} fill={color} opacity="0.75" />
      <ellipse cx={cx} cy={ry} rx={rx} ry={ry} fill="white" opacity="0.2" />
      <ellipse cx={cx - 4} cy={ry - 5} rx={Math.round(rx * 0.3)} ry={Math.round(ry * 0.25)} fill="white" opacity="0.3" />
      <path d={`M${cx} ${ry * 2} L${cx - 2} ${ry * 2 + 3} L${cx + 2} ${ry * 2 + 3} Z`} fill={color} opacity="0.7" />
      <path
        d={`M${cx} ${ry * 2 + 3} Q${cx - 3} ${ry * 2 + 10} ${cx + 1} ${ry * 2 + 16} Q${cx - 1} ${ry * 2 + 20} ${cx} ${h}`}
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
        fill="none"
      />
    </svg>
  );
};

/** Cluster of 3 balloons */
const BalloonCluster = ({ className = "", colors }: { className?: string; colors: string[] }) => (
  <div className={`absolute pointer-events-none select-none ${className}`}>
    <Balloon color={colors[0]} className="relative -left-3 -top-2" size={32} />
    <Balloon color={colors[1]} className="relative left-4 -top-14" size={28} />
    <Balloon color={colors[2]} className="relative left-0 -top-20" size={24} />
  </div>
);

/** Confetti dots scattered */
const ConfettiDots = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none select-none ${className}`} viewBox="0 0 200 100" fill="none">
    {[
      { cx: 15, cy: 20, r: 3, fill: "#FACC15" },
      { cx: 45, cy: 12, r: 2.5, fill: "#EF4444" },
      { cx: 80, cy: 35, r: 3.5, fill: "#3B82F6" },
      { cx: 120, cy: 15, r: 2, fill: "#22C55E" },
      { cx: 150, cy: 40, r: 3, fill: "#A855F7" },
      { cx: 170, cy: 10, r: 2.5, fill: "#F97316" },
      { cx: 30, cy: 55, r: 2, fill: "#EC4899" },
      { cx: 65, cy: 70, r: 3, fill: "#FACC15" },
      { cx: 100, cy: 60, r: 2.5, fill: "#EF4444" },
      { cx: 140, cy: 75, r: 2, fill: "#3B82F6" },
      { cx: 185, cy: 55, r: 3, fill: "#22C55E" },
      { cx: 10, cy: 85, r: 2, fill: "#F97316" },
      { cx: 55, cy: 90, r: 3, fill: "#A855F7" },
      { cx: 110, cy: 88, r: 2.5, fill: "#EC4899" },
      { cx: 175, cy: 85, r: 2, fill: "#FACC15" },
    ].map((d, i) => (
      <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={0.5 + Math.random() * 0.3} />
    ))}
    {/* Small rectangle confetti */}
    {[
      { x: 25, y: 30, fill: "#FACC15", rotate: 25 },
      { x: 90, y: 18, fill: "#EF4444", rotate: -15 },
      { x: 135, y: 50, fill: "#22C55E", rotate: 40 },
      { x: 60, y: 80, fill: "#3B82F6", rotate: -30 },
      { x: 160, y: 65, fill: "#A855F7", rotate: 55 },
    ].map((d, i) => (
      <rect key={`r${i}`} x={d.x} y={d.y} width="6" height="3" rx="1" fill={d.fill} opacity="0.45"
        transform={`rotate(${d.rotate} ${d.x + 3} ${d.y + 1.5})`} />
    ))}
  </svg>
);

const WavyDivider = ({ variant = 0 }: { variant?: number }) => (
  <div className="w-full overflow-hidden my-6 md:my-10 relative">
    <svg
      className="w-full h-8"
      viewBox="0 0 1200 32"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {serpentineColors.slice(variant % 3, variant % 3 + 3).map((c, i) => (
        <path
          key={i}
          d={`M0 ${8 + i * 8} Q75 ${i * 4} 150 ${8 + i * 8} T300 ${8 + i * 8} T450 ${8 + i * 8} T600 ${8 + i * 8} T750 ${8 + i * 8} T900 ${8 + i * 8} T1050 ${8 + i * 8} T1200 ${8 + i * 8}`}
          stroke={c.stroke}
          strokeWidth={c.width * 0.7}
          fill="none"
          opacity={c.opacity * 0.8}
        />
      ))}
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
    { label: "Vappu Levillä", href: "/opas/vappu-levilla" },
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
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300/40 via-amber-200/25 to-orange-100/10 -z-10" />

        {/* LOTS of serpentines! */}
        <Serpentine className="top-2 left-0 w-[70%] h-12 rotate-[-2deg]" variant={0} />
        <Serpentine className="top-8 right-0 w-[65%] h-10 rotate-[3deg]" variant={1} />
        <Serpentine className="top-20 left-[5%] w-[80%] h-10 rotate-[-1deg]" variant={2} />
        <Serpentine className="top-32 right-[5%] w-[60%] h-8 rotate-[2deg]" variant={0} />
        <Serpentine className="bottom-16 left-0 w-[75%] h-10 rotate-[-3deg]" variant={1} />
        <Serpentine className="bottom-4 right-0 w-[55%] h-8 rotate-[1deg]" variant={2} />
        <Serpentine className="top-[45%] left-[10%] w-[50%] h-8 rotate-[-2deg] opacity-50" variant={0} />

        {/* Confetti */}
        <ConfettiDots className="top-4 left-0 w-[40%] h-20 opacity-70" />
        <ConfettiDots className="top-10 right-0 w-[35%] h-16 opacity-60" />
        <ConfettiDots className="bottom-10 left-[20%] w-[50%] h-20 opacity-50" />

        {/* Balloon clusters */}
        <BalloonCluster className="top-16 left-[3%] md:left-[6%]" colors={["#FACC15", "#EF4444", "#3B82F6"]} />
        <BalloonCluster className="top-12 right-[3%] md:right-[8%]" colors={["#22C55E", "#A855F7", "#F97316"]} />
        <BalloonCluster className="top-28 left-[20%] md:left-[18%]" colors={["#EC4899", "#FACC15", "#14B8A6"]} />
        <BalloonCluster className="top-24 right-[22%] md:right-[20%]" colors={["#3B82F6", "#EF4444", "#22C55E"]} />

        {/* Individual floating balloons */}
        <Balloon color="#FACC15" className="top-40 left-[12%] animate-bounce [animation-delay:0ms]" size={40} />
        <Balloon color="#3B82F6" className="top-48 left-[28%] animate-bounce [animation-delay:300ms]" size={30} />
        <Balloon color="#EF4444" className="top-36 right-[15%] animate-bounce [animation-delay:150ms]" size={38} />
        <Balloon color="#22C55E" className="top-52 right-[28%] animate-bounce [animation-delay:450ms]" size={26} />
        <Balloon color="#A855F7" className="bottom-20 left-[8%] animate-bounce [animation-delay:600ms]" size={34} />
        <Balloon color="#F97316" className="bottom-28 right-[10%] animate-bounce [animation-delay:200ms]" size={30} />
        <Balloon color="#EC4899" className="top-20 left-[42%] animate-bounce [animation-delay:500ms]" size={24} />
        <Balloon color="#14B8A6" className="bottom-12 left-[45%] animate-bounce [animation-delay:350ms]" size={28} />

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

      <WavyDivider variant={0} />

      {/* ═══ EVENTS ═══ */}
      <section className="relative container mx-auto px-4 pb-8 overflow-hidden">
        {/* Section decorations */}
        <Serpentine className="top-0 right-0 w-[40%] h-8 rotate-[2deg] opacity-40" variant={1} />
        <Balloon color="#FACC15" className="top-4 right-[5%] animate-bounce [animation-delay:100ms]" size={28} />
        <Balloon color="#EF4444" className="top-16 right-[2%] animate-bounce [animation-delay:400ms]" size={22} />
        <ConfettiDots className="top-0 left-0 w-[30%] h-14 opacity-40" />
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
                  href="https://www.levi.fi/tapahtumat/levi-mayday-2026/"
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
              href="https://www.levi.fi/tapahtumat/levi-mayday-2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80 inline-flex items-center gap-1"
            >
              Levi MayDay 2026 virallinen ohjelma (levi.fi) <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </section>

      <WavyDivider variant={1} />

      {/* Mid-content discount banner */}
      <section className="relative container mx-auto px-4 pb-4 overflow-hidden">
        <BalloonCluster className="top-0 left-[5%]" colors={["#A855F7", "#FACC15", "#EF4444"]} />
        <BalloonCluster className="top-2 right-[5%]" colors={["#3B82F6", "#22C55E", "#F97316"]} />
        <Serpentine className="bottom-0 left-0 w-full h-8 opacity-30" variant={2} />
        <div className="max-w-3xl mx-auto">
          <DiscountBanner variant="mid" />
        </div>
      </section>

      <WavyDivider variant={2} />

      {/* ═══ WHY VAPPU IN LEVI ═══ */}
      <section className="relative container mx-auto px-4 pb-8 overflow-hidden">
        <Serpentine className="top-2 left-0 w-[45%] h-8 rotate-[-1deg] opacity-35" variant={0} />
        <Balloon color="#22C55E" className="top-8 right-[3%] animate-bounce [animation-delay:200ms]" size={30} />
        <Balloon color="#FACC15" className="bottom-4 left-[5%] animate-bounce [animation-delay:500ms]" size={26} />
        <ConfettiDots className="bottom-0 right-0 w-[25%] h-12 opacity-35" />
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

      <WavyDivider variant={0} />

      {/* ═══ PRACTICAL TIPS ═══ */}
      <section className="relative container mx-auto px-4 pb-8 overflow-hidden">
        <Serpentine className="top-0 right-0 w-[50%] h-8 rotate-[1deg] opacity-30" variant={1} />
        <BalloonCluster className="top-4 left-[2%]" colors={["#F97316", "#3B82F6", "#EC4899"]} />
        <Balloon color="#A855F7" className="bottom-8 right-[4%] animate-bounce [animation-delay:300ms]" size={24} />
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

      <WavyDivider variant={1} />

      {/* ═══ FAQ ═══ */}
      <section className="relative container mx-auto px-4 pb-8 overflow-hidden">
        <ConfettiDots className="top-0 right-[5%] w-[30%] h-14 opacity-40" />
        <Serpentine className="bottom-2 left-0 w-[40%] h-6 opacity-30" variant={2} />
        <Balloon color="#EF4444" className="top-6 left-[3%] animate-bounce [animation-delay:100ms]" size={26} />
        <Balloon color="#14B8A6" className="bottom-4 right-[3%] animate-bounce [animation-delay:400ms]" size={22} />
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

      <WavyDivider variant={2} />

      {/* Final discount banner */}
      <section className="relative container mx-auto px-4 pb-8 overflow-hidden">
        <BalloonCluster className="top-0 left-[3%]" colors={["#FACC15", "#EF4444", "#22C55E"]} />
        <BalloonCluster className="top-0 right-[3%]" colors={["#3B82F6", "#A855F7", "#F97316"]} />
        <Serpentine className="top-0 left-0 w-full h-10 opacity-40" variant={0} />
        <Serpentine className="bottom-0 left-0 w-full h-8 opacity-30" variant={1} />
        <ConfettiDots className="top-4 left-[20%] w-[60%] h-16 opacity-50" />
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
