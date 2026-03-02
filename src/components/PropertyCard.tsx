import { Maximize, DoorOpen, Bed, Users, MapPin, ExternalLink, PawPrint, Flame, Accessibility, Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const totalBeds = property.beds + property.extraBeds;

  return (
    <Card className="group relative overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10 border-border/60">
      <CardContent className="p-5 sm:p-6 flex flex-col gap-4">
        {/* Year / renovation tag */}
        {property.yearBuiltOrRenovated && (
          <span className="inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary">
            {property.yearBuiltOrRenovated}
          </span>
        )}

        {/* Name as clickable link */}
        <h3 className="text-lg font-semibold leading-tight">
          <a
            href={property.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary"
          >
            {property.name}
          </a>
        </h3>

        {/* Short description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {property.shortDescription}
        </p>

        {/* Specs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize className="w-4 h-4 text-primary" />
            <span>{property.sqm} m²</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <DoorOpen className="w-4 h-4 text-primary" />
            <span>{property.bedrooms === 0 ? "Studio" : `${property.bedrooms} BR`}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bed className="w-4 h-4 text-primary" />
            <span>{totalBeds} beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{property.guestRange}</span>
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-1.5">
          {property.sauna && (
            <Badge variant="secondary" className="gap-1 bg-primary/15 text-primary border-primary/30 text-xs">
              <Droplets className="w-3 h-3" /> Sauna
            </Badge>
          )}
          {property.fireplace && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Flame className="w-3 h-3" /> Fireplace
            </Badge>
          )}
          {property.petsAllowed && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <PawPrint className="w-3 h-3" /> Pets Allowed
            </Badge>
          )}
          {property.accessible && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Accessibility className="w-3 h-3" /> Accessible
            </Badge>
          )}
          <Badge variant="outline" className="gap-1 text-xs">
            <MapPin className="w-3 h-3" /> {property.location}
          </Badge>
        </div>

        {/* CTA button */}
        <Button asChild className="mt-auto w-full sm:w-auto self-start gap-2">
          <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer">
            Check availability <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
