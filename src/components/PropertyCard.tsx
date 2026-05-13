import { Maximize, DoorOpen, Bed, Users, MapPin, ExternalLink, PawPrint, Flame, Accessibility, Droplets, ArrowRight, Mountain, Waves, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";
import type { Property } from "@/data/properties";
import { propertyFi, locationFi, locationFiBySlug, translateYearFi } from "@/data/propertyTranslationsFi";

interface PropertyCardProps {
  property: Property;
  /** When set, shows a "Lue lisää" link to the internal landing page (e.g. /majoitukset/{slug}). */
  detailHref?: string;
  /** Localised label for the internal detail link. Defaults to "Learn more". */
  detailLabel?: string;
  /** Localised label for the booking CTA. Defaults to "Check availability". */
  bookLabel?: string;
  /** Language for card content. Defaults to English. */
  lang?: "fi" | "en";
}

const LABELS = {
  en: { studio: "Studio", br: "BR", beds: "beds", sauna: "Sauna", fireplace: "Fireplace", pets: "Pets", accessible: "Accessible", hotTub: "Hot tub", prev: "Previous image", next: "Next image" },
  fi: { studio: "Studio", br: "MH", beds: "vuodetta", sauna: "Sauna", fireplace: "Takka", pets: "Lemmikit", accessible: "Esteetön", hotTub: "Ulkoporeallas", prev: "Edellinen kuva", next: "Seuraava kuva" },
} as const;

const PropertyCard = ({
  property,
  detailHref,
  detailLabel = "Learn more",
  bookLabel = "Check availability",
  lang = "en",
}: PropertyCardProps) => {
  const totalBeds = property.beds + property.extraBeds;
  const titleHref = detailHref ?? property.bookingUrl;
  const isInternalTitle = Boolean(detailHref);
  const fi = lang === "fi" ? propertyFi[property.slug] : undefined;
  const displayName = fi?.name ?? property.name;
  const displayDescription = fi?.shortDescription ?? property.shortDescription;
  const displayLocation = lang === "fi"
    ? (locationFiBySlug[property.slug] ?? locationFi[property.location] ?? property.location)
    : property.location;
  const displayYear = lang === "fi" ? translateYearFi(property.yearBuiltOrRenovated) : property.yearBuiltOrRenovated;
  const L = LABELS[lang];

  const gallery = property.images && property.images.length > 0
    ? property.images
    : (property.heroImage ? [property.heroImage] : []);
  const [imgIdx, setImgIdx] = useState(0);
  const hasMultiple = gallery.length > 1;
  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + gallery.length) % gallery.length);
  };
  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % gallery.length);
  };

  return (
    <Card className="group relative overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10 border-border/60 flex flex-col">
      {/* Hero image or placeholder */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/15 via-muted to-secondary/15">
        {property.heroImage ? (
          <OptimizedImage
            src={property.heroImage}
            alt={displayName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/40">
            <Mountain className="w-14 h-14" aria-hidden="true" />
          </div>
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-background/90 text-foreground backdrop-blur">
          <MapPin className="w-3 h-3 text-primary" /> {displayLocation}
        </span>
      </div>

      <CardContent className="p-5 sm:p-6 flex flex-col gap-4 flex-grow">
        {displayYear && (
          <span className="inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary">
            {displayYear}
          </span>
        )}

        <h3 className="text-lg font-semibold leading-tight">
          {isInternalTitle ? (
            <Link
              to={titleHref}
              className="hover:underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary"
            >
              {displayName}
            </Link>
          ) : (
            <a
              href={titleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary"
            >
              {displayName}
            </a>
          )}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {displayDescription}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize className="w-4 h-4 text-primary" />
            <span>{property.sqm} m²</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <DoorOpen className="w-4 h-4 text-primary" />
            <span>{property.bedrooms === 0 ? L.studio : `${property.bedrooms} ${L.br}`}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bed className="w-4 h-4 text-primary" />
            <span>{totalBeds} {L.beds}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{property.guestRange}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {property.sauna && (
            <Badge variant="secondary" className="gap-1 bg-primary/15 text-primary border-primary/30 text-xs">
              <Droplets className="w-3 h-3" /> {L.sauna}
            </Badge>
          )}
          {property.fireplace && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Flame className="w-3 h-3" /> {L.fireplace}
            </Badge>
          )}
          {property.petsAllowed && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <PawPrint className="w-3 h-3" /> {L.pets}
            </Badge>
          )}
          {property.accessible && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Accessibility className="w-3 h-3" /> {L.accessible}
            </Badge>
          )}
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-2">
          <Button asChild className="gap-2 flex-1">
            <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer">
              {bookLabel} <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          {detailHref && (
            <Button asChild variant="outline" className="gap-1 flex-1">
              <Link to={detailHref}>
                {detailLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
