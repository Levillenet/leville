import { useMemo, useState } from "react";
import { Users, BedDouble, Flame, Waves, X, SlidersHorizontal } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/data/properties";

type Lang = "fi" | "en";

interface Props {
  properties: Property[];
  lang: Lang;
}

const COPY = {
  fi: {
    heading: "Etsi sopiva majoitus Leviltä",
    intro: "Rajaa kohteet henkilömäärän, makuuhuoneiden ja varustelun mukaan. Kaikki kohteet ovat omiamme Levin keskustassa – varaus suoraan omistajalta.",
    guests: "Henkilömäärä",
    bedrooms: "Makuuhuoneet",
    sauna: "Oma sauna",
    fireplace: "Takka",
    hotTub: "Ulkoporeallas",
    any: "Kaikki",
    min: (n: number) => `${n}+`,
    results: (n: number) => `${n} kohdetta vastaa hakuasi`,
    none: "Yksikään kohde ei vastaa hakua. Väljennä rajauksia.",
    clear: "Tyhjennä rajaukset",
    detail: "Lue lisää",
    book: "Katso saatavuus",
  },
  en: {
    heading: "Find the right accommodation in Levi",
    intro: "Filter by group size, bedrooms and amenities. Every property is our own in Levi centre – book directly from the owner.",
    guests: "Guests",
    bedrooms: "Bedrooms",
    sauna: "Private sauna",
    fireplace: "Fireplace",
    hotTub: "Hot tub",
    any: "All",
    min: (n: number) => `${n}+`,
    results: (n: number) => `${n} properties match your search`,
    none: "No properties match. Try loosening the filters.",
    clear: "Clear filters",
    detail: "Learn more",
    book: "Check availability",
  },
} as const;

const GUEST_STEPS = [2, 4, 6, 8, 10];
const BEDROOM_STEPS = [1, 2, 3, 4];

const PropertyFilters = ({ properties, lang }: Props) => {
  const t = COPY[lang];
  const [guests, setGuests] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [sauna, setSauna] = useState(false);
  const [fireplace, setFireplace] = useState(false);
  const [hotTub, setHotTub] = useState(false);

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        if (guests && p.maxGuests < guests) return false;
        if (bedrooms && p.bedrooms < bedrooms) return false;
        if (sauna && !p.sauna) return false;
        if (fireplace && !p.fireplace) return false;
        if (hotTub && !p.hotTub) return false;
        return true;
      }),
    [properties, guests, bedrooms, sauna, fireplace, hotTub],
  );

  const active = guests !== null || bedrooms !== null || sauna || fireplace || hotTub;

  const chip = (selected: boolean) =>
    `px-3 py-1.5 rounded-full text-sm border transition-colors ${
      selected
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-background border-border text-muted-foreground hover:border-primary/50"
    }`;

  const clear = () => {
    setGuests(null);
    setBedrooms(null);
    setSauna(false);
    setFireplace(false);
    setHotTub(false);
  };

  const detailHref = (slug: string) =>
    lang === "fi" ? `/majoitukset/${slug}` : `/en/accommodations/${slug}`;

  return (
    <section className="mb-14 md:mb-16" id="hae-majoitus">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <SlidersHorizontal className="w-6 h-6 text-primary" />
          {t.heading}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-3xl">{t.intro}</p>

        <div className="glass-card border border-border/30 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground mr-1">
              <Users className="w-4 h-4 text-primary" /> {t.guests}
            </span>
            <button type="button" className={chip(guests === null)} onClick={() => setGuests(null)}>
              {t.any}
            </button>
            {GUEST_STEPS.map((n) => (
              <button key={n} type="button" className={chip(guests === n)} onClick={() => setGuests(n)}>
                {t.min(n)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground mr-1">
              <BedDouble className="w-4 h-4 text-primary" /> {t.bedrooms}
            </span>
            <button type="button" className={chip(bedrooms === null)} onClick={() => setBedrooms(null)}>
              {t.any}
            </button>
            {BEDROOM_STEPS.map((n) => (
              <button key={n} type="button" className={chip(bedrooms === n)} onClick={() => setBedrooms(n)}>
                {t.min(n)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={chip(sauna)} onClick={() => setSauna((v) => !v)}>
              {t.sauna}
            </button>
            <button type="button" className={chip(fireplace)} onClick={() => setFireplace((v) => !v)}>
              <span className="inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> {t.fireplace}
              </span>
            </button>
            <button type="button" className={chip(hotTub)} onClick={() => setHotTub((v) => !v)}>
              <span className="inline-flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5" /> {t.hotTub}
              </span>
            </button>
            {active && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline ml-auto"
              >
                <X className="w-3.5 h-3.5" /> {t.clear}
              </button>
            )}
          </div>

          <p className="text-sm text-muted-foreground pt-1" aria-live="polite">
            {filtered.length > 0 ? t.results(filtered.length) : t.none}
          </p>
        </div>

        {active && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {filtered.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                lang={lang}
                detailHref={detailHref(p.slug)}
                detailLabel={t.detail}
                bookLabel={t.book}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyFilters;
