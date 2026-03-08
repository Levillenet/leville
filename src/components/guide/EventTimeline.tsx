import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Trophy, Users, Music, Filter } from "lucide-react";
import { Language } from "@/translations";
import { motion, AnimatePresence } from "framer-motion";

type EventCategory = "sports" | "family" | "entertainment";

interface LeviEvent {
  id: string;
  name: { fi: string; en: string };
  dateStart: string;
  dateEnd: string;
  month: number;
  recurring: { fi: string; en: string };
  category: EventCategory;
  description: { fi: string; en: string };
  url: string;
  free: boolean;
}

const events: LeviEvent[] = [
  {
    id: "winter-opening",
    name: { fi: "Talvikauden avajaiset", en: "Winter Season Opening" },
    dateStart: "2025-10-03",
    dateEnd: "2025-10-05",
    month: 10,
    recurring: { fi: "Vuosittain lokakuun alussa", en: "Annually in early October" },
    category: "sports",
    description: {
      fi: "Levin laskettelu- ja maastohiihtokausi avataan. Eturinteille säilötään ennätysmäärä lunta.",
      en: "Alpine and cross-country skiing season opens in Levi. Record amounts of stored snow on the Front Slopes."
    },
    url: "https://www.levi.fi/en/events/winter-season-opening-2025-2026/",
    free: true
  },
  {
    id: "world-cup",
    name: { fi: "FIS Alpine World Cup Slalom", en: "FIS Alpine World Cup Slalom" },
    dateStart: "2026-11-14",
    dateEnd: "2026-11-15",
    month: 11,
    recurring: { fi: "Vuosittain marraskuun puolivälissä", en: "Annually in mid-November" },
    category: "sports",
    description: {
      fi: "Kansainvälinen alppihiihdon maailmancup — kauden avauskilpailu. Naisten ja miesten pujottelu Levi Black -rinteessä. Katselu rinteeltä on ilmaista.",
      en: "International FIS Alpine Ski World Cup — season-opening slalom event. Women's and men's slalom on the Levi Black slope. Free spectating from the slope."
    },
    url: "https://www.levi.fi/en/events/fis-ski-alpine-world-cup-levi/",
    free: true
  },
  {
    id: "christmas-season",
    name: { fi: "Joulusesonki", en: "Christmas Season" },
    dateStart: "2025-12-01",
    dateEnd: "2026-01-06",
    month: 12,
    recurring: { fi: "Vuosittain joulu–tammikuu", en: "Annually December–January" },
    category: "family",
    description: {
      fi: "Joulupukkitapaamiset, joulumarkkinat, erityisohjelma ravintoloissa ja safariyrityksissä. Kaamoksen sininen valo ja jouluvalot.",
      en: "Santa meetings, Christmas markets, special programs at restaurants and safari companies. Blue light of the polar night and Christmas lights."
    },
    url: "/levi/joulu-lapissa",
    free: false
  },
  {
    id: "new-years-eve",
    name: { fi: "Uudenvuodenaatto", en: "New Year's Eve" },
    dateStart: "2025-12-31",
    dateEnd: "2025-12-31",
    month: 12,
    recurring: { fi: "Vuosittain 31.12.", en: "Annually December 31" },
    category: "entertainment",
    description: {
      fi: "Ilotulitukset keskiyöllä keskustan tuntumasta. Baareissa ja ravintoloissa erityisohjelmaa.",
      en: "Fireworks at midnight near the village center. Special programs at bars and restaurants."
    },
    url: "",
    free: true
  },
  {
    id: "ski-holidays",
    name: { fi: "Hiihtolomaviikot", en: "Finnish Ski Holiday Weeks" },
    dateStart: "2026-02-14",
    dateEnd: "2026-03-08",
    month: 2,
    recurring: { fi: "Vuosittain viikot 8–10 (helmi–maaliskuu)", en: "Annually weeks 8–10 (February–March)" },
    category: "sports",
    description: {
      fi: "Kolmen viikon jakso — Levin vilkkain aika. Erityisohjelmaa perheille, kilpailuja ja tapahtumia.",
      en: "Three-week period — Levi's busiest time. Special programs for families, competitions and events."
    },
    url: "",
    free: false
  },
  {
    id: "yllas-levi-ski",
    name: { fi: "Ylläs-Levi Hiihto", en: "Ylläs-Levi Cross-Country Ski Race" },
    dateStart: "2026-04-10",
    dateEnd: "2026-04-11",
    month: 4,
    recurring: { fi: "Vuosittain huhtikuussa", en: "Annually in April" },
    category: "sports",
    description: {
      fi: "Perinteinen pitkän matkan hiihto — 55 km ja 70 km tunturimaisemissa Ylläkseltä Leville. Noin 2000 osallistujaa.",
      en: "Traditional long-distance cross-country skiing — 55 km and 70 km through fell landscapes from Ylläs to Levi. Approximately 2000 participants."
    },
    url: "https://yllaslevi.fi/en/",
    free: false
  },
  {
    id: "ski-snow-fest",
    name: { fi: "Ski & Snow Fest", en: "Ski & Snow Fest" },
    dateStart: "2026-04-13",
    dateEnd: "2026-04-19",
    month: 4,
    recurring: { fi: "Vuosittain huhtikuussa", en: "Annually in April" },
    category: "sports",
    description: {
      fi: "Viikon mittainen kilpailu- ja laskettelu-juhla kevätrinteillä.",
      en: "A week full of competitions and snowy fun on the slopes."
    },
    url: "https://www.levi.fi/en/events/ski&snowfest/",
    free: true
  },
  {
    id: "levi-mayday",
    name: { fi: "Levi MayDay — kauden päätös", en: "Levi MayDay — Season Finale" },
    dateStart: "2026-04-30",
    dateEnd: "2026-05-02",
    month: 5,
    recurring: { fi: "Vuosittain vapun tienoilla", en: "Annually around May Day" },
    category: "sports",
    description: {
      fi: "Laskettelukauden päätöstapahtuma. Kevätaurinko ja rento tunnelma.",
      en: "Ski season closing event. Spring sun and a relaxed atmosphere."
    },
    url: "https://www.levi.fi/en/events/levi-mayday-2026/",
    free: true
  },
  {
    id: "midsummer",
    name: { fi: "Juhannus Levillä", en: "Midsummer in Levi" },
    dateStart: "2026-06-19",
    dateEnd: "2026-06-20",
    month: 6,
    recurring: { fi: "Vuosittain juhannusviikonloppuna", en: "Annually on Midsummer weekend" },
    category: "entertainment",
    description: {
      fi: "Juhannusjuhlat keskiyön auringon alla. Kokko, musiikkia ja perinteistä tunnelmaa.",
      en: "Midsummer celebrations under the midnight sun. Bonfire, music and traditional atmosphere."
    },
    url: "",
    free: true
  },
  {
    id: "yllas-levi-mtb",
    name: { fi: "Ylläs-Levi MTB", en: "Ylläs-Levi MTB" },
    dateStart: "2026-07-25",
    dateEnd: "2026-07-25",
    month: 7,
    recurring: { fi: "Vuosittain heinäkuussa", en: "Annually in July" },
    category: "sports",
    description: {
      fi: "Maastopyörätapahtuma Ylläkseltä Leville tunturimaisemissa.",
      en: "Mountain biking event from Ylläs to Levi through fell landscapes."
    },
    url: "https://yllas.fi/en/events/",
    free: false
  },
  {
    id: "golf-tournament",
    name: { fi: "Panorama Open — golfturnaus", en: "Panorama Open Golf Tournament" },
    dateStart: "2026-08-01",
    dateEnd: "2026-08-02",
    month: 8,
    recurring: { fi: "Vuosittain elokuun alussa", en: "Annually in early August" },
    category: "sports",
    description: {
      fi: "Kaksipäiväinen golfkilpailu Levi Golf & Country Clubilla.",
      en: "Two-day golf competition at Levi Golf & Country Club."
    },
    url: "",
    free: false
  },
  {
    id: "ruskamarathon",
    name: { fi: "Ruskamaraton", en: "Ruskamarathon" },
    dateStart: "2026-09-12",
    dateEnd: "2026-09-12",
    month: 9,
    recurring: { fi: "Vuosittain syyskuun toinen lauantai", en: "Annually on the second Saturday of September" },
    category: "sports",
    description: {
      fi: "Levin vanhin ja rakastetuin tapahtuma — 43. kertaa. Maraton, puolimaraton, 10 km, trailrun ja lasten juoksu. Noin 2500 osallistujaa ruskan väreissä.",
      en: "Levi's oldest and most beloved event — 43rd edition. Marathon, half marathon, 10 km, trail run and kids' run. Approximately 2500 participants in autumn foliage colors."
    },
    url: "https://www.ruskamaraton.com/",
    free: false
  }
];

const months = [
  { num: 10, fi: "Loka", en: "Oct" },
  { num: 11, fi: "Marras", en: "Nov" },
  { num: 12, fi: "Joulu", en: "Dec" },
  { num: 1, fi: "Tammi", en: "Jan" },
  { num: 2, fi: "Helmi", en: "Feb" },
  { num: 3, fi: "Maalis", en: "Mar" },
  { num: 4, fi: "Huhti", en: "Apr" },
  { num: 5, fi: "Touko", en: "May" },
  { num: 6, fi: "Kesä", en: "Jun" },
  { num: 7, fi: "Heinä", en: "Jul" },
  { num: 8, fi: "Elo", en: "Aug" },
  { num: 9, fi: "Syys", en: "Sep" },
];

// Season assignment for month colors
const getSeasonForMonth = (month: number): "winter" | "spring" | "summer" | "autumn" => {
  if ([11, 12, 1, 2, 3].includes(month)) return "winter";
  if ([4, 5].includes(month)) return "spring";
  if ([6, 7, 8].includes(month)) return "summer";
  return "autumn"; // 9, 10
};

const seasonStyles: Record<string, { bg: string; border: string; text: string }> = {
  winter: { bg: "bg-sky-500/15", border: "border-sky-500/30", text: "text-sky-400" },
  spring: { bg: "bg-emerald-500/15", border: "border-emerald-500/30", text: "text-emerald-400" },
  summer: { bg: "bg-amber-500/15", border: "border-amber-500/30", text: "text-amber-400" },
  autumn: { bg: "bg-orange-500/15", border: "border-orange-500/30", text: "text-orange-400" },
};

const categoryConfig: Record<EventCategory, { icon: typeof Trophy; color: string; bgColor: string }> = {
  sports: { icon: Trophy, color: "text-primary", bgColor: "bg-primary/20" },
  family: { icon: Users, color: "text-emerald-400", bgColor: "bg-emerald-500/20" },
  entertainment: { icon: Music, color: "text-amber-400", bgColor: "bg-amber-500/20" },
};

const t = {
  fi: {
    all: "Kaikki",
    sports: "Urheilu",
    family: "Perhe",
    entertainment: "Viihde",
    free: "Ilmainen",
    readMore: "Lue lisää",
    disclaimer: "Tapahtumakalenteri on suuntaa-antava. Tarkat päivämäärät voivat muuttua vuosittain. Tarkista aina ajantasaiset tiedot tapahtuman omilta sivuilta tai osoitteesta levi.fi/tapahtumat.",
    calendarTitle: "Tapahtumakalenteri",
  },
  en: {
    all: "All",
    sports: "Sports",
    family: "Family",
    entertainment: "Entertainment",
    free: "Free",
    readMore: "Read more",
    disclaimer: "The event calendar is indicative. Exact dates may change annually. Always check current information on the event's own website or at levi.fi/events.",
    calendarTitle: "Event Calendar",
  },
};

function formatDateRange(dateStart: string, dateEnd: string, lang: string): string {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const locale = lang === "fi" ? "fi-FI" : "en-GB";
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "numeric", year: "numeric" };

  if (dateStart === dateEnd) {
    return start.toLocaleDateString(locale, opts);
  }
  const startShort: Intl.DateTimeFormatOptions = { day: "numeric", month: "numeric" };
  return `${start.toLocaleDateString(locale, startShort)}–${end.toLocaleDateString(locale, opts)}`;
}

interface EventTimelineProps {
  lang?: Language;
}

const EventTimeline = ({ lang = "fi" }: EventTimelineProps) => {
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">("all");
  const labels = t[lang as keyof typeof t] || t.fi;
  const langKey = (lang === "fi" ? "fi" : "en") as "fi" | "en";

  const filteredEvents = useMemo(() => {
    if (activeCategory === "all") return events;
    return events.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  const categories: { key: EventCategory | "all"; label: string; icon?: typeof Trophy }[] = [
    { key: "all", label: labels.all },
    { key: "sports", label: labels.sports, icon: Trophy },
    { key: "family", label: labels.family, icon: Users },
    { key: "entertainment", label: labels.entertainment, icon: Music },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Filter className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{labels.calendarTitle}</h2>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          const Icon = cat.icon;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card/50 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Month bar */}
          <div className="flex gap-0 mb-6 rounded-xl overflow-hidden border border-border/30">
            {months.map((m) => {
              const season = getSeasonForMonth(m.num);
              const style = seasonStyles[season];
              const hasEvents = filteredEvents.some((e) => e.month === m.num);
              return (
                <div
                  key={m.num}
                  className={`flex-1 py-2.5 text-center text-xs font-semibold ${style.bg} ${style.text} ${
                    hasEvents ? "opacity-100" : "opacity-40"
                  } transition-opacity`}
                >
                  {langKey === "fi" ? m.fi : m.en}
                </div>
              );
            })}
          </div>

          {/* Events grouped by month */}
          <div className="grid grid-cols-12 gap-1">
            {months.map((m) => {
              const monthEvents = filteredEvents.filter((e) => e.month === m.num);
              const season = getSeasonForMonth(m.num);
              const style = seasonStyles[season];

              return (
                <div key={m.num} className="relative flex flex-col items-center">
                  {/* Vertical connector line */}
                  {monthEvents.length > 0 && (
                    <div className={`w-0.5 h-4 ${style.bg} rounded-full mb-1`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Event cards - full width list below timeline */}
          <div className="space-y-3 mt-2">
            <AnimatePresence mode="popLayout">
              {months.map((m) => {
                const monthEvents = filteredEvents.filter((e) => e.month === m.num);
                if (monthEvents.length === 0) return null;
                const season = getSeasonForMonth(m.num);
                const style = seasonStyles[season];

                return monthEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EventCard
                      event={event}
                      lang={langKey}
                      labels={labels}
                      seasonStyle={style}
                      seasonName={langKey === "fi" ? m.fi : m.en}
                    />
                  </motion.div>
                ));
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical list */}
      <div className="md:hidden space-y-3">
        <AnimatePresence mode="popLayout">
          {months.map((m) => {
            const monthEvents = filteredEvents.filter((e) => e.month === m.num);
            if (monthEvents.length === 0) return null;
            const season = getSeasonForMonth(m.num);
            const style = seasonStyles[season];

            return (
              <div key={m.num}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 ${style.bg} ${style.text}`}>
                  {langKey === "fi" ? m.fi : m.en}
                </div>
                <div className="space-y-3 ml-1 pl-3 border-l-2 border-border/30">
                  {monthEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EventCard
                        event={event}
                        lang={langKey}
                        labels={labels}
                        seasonStyle={style}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <Card className="glass-card border-border/30 p-4 mt-6">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground italic">{labels.disclaimer}</p>
        </div>
      </Card>
    </section>
  );
};

interface EventCardProps {
  event: LeviEvent;
  lang: "fi" | "en";
  labels: typeof t.fi;
  seasonStyle: { bg: string; border: string; text: string };
  seasonName?: string;
}

const EventCard = ({ event, lang, labels, seasonStyle, seasonName }: EventCardProps) => {
  const catConfig = categoryConfig[event.category];
  const CatIcon = catConfig.icon;
  const isExternal = event.url.startsWith("http");
  const hasUrl = event.url.length > 0;

  return (
    <Card className="glass-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Category icon */}
          <div className={`w-9 h-9 rounded-lg ${catConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
            <CatIcon className={`w-4.5 h-4.5 ${catConfig.color}`} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Name + season tag */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base leading-tight">
                {event.name[lang]}
              </h3>
              {seasonName && (
                <span className={`hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${seasonStyle.bg} ${seasonStyle.text}`}>
                  {seasonName}
                </span>
              )}
            </div>

            {/* Date */}
            <p className="text-xs text-muted-foreground mb-0.5">
              {formatDateRange(event.dateStart, event.dateEnd, lang)}
            </p>

            {/* Recurring info */}
            <p className="text-xs text-muted-foreground/70 mb-2">
              {event.recurring[lang]}
            </p>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {event.description[lang]}
            </p>

            {/* Badges + link */}
            <div className="flex items-center gap-2 flex-wrap">
              {event.free && (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
                  🎟 {labels.free}
                </Badge>
              )}
              {hasUrl && (
                isExternal ? (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                  >
                    {labels.readMore}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                ) : (
                  <Link
                    to={event.url}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                  >
                    {labels.readMore}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventTimeline;
