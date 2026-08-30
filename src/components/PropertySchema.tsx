import JsonLd from "@/components/JsonLd";
import type { Property } from "@/data/properties";

const BASE_URL = "https://leville.net";

/** House rules verified in public/llms.txt (Check-in 4 PM, Check-out 10 AM). */
const CHECKIN_TIME = "16:00";
const CHECKOUT_TIME = "10:00";

const abs = (src: string) => (src.startsWith("http") ? src : `${BASE_URL}${src}`);

const feature = (name: string) => ({
  "@type": "LocationFeatureSpecification",
  name,
  value: true,
});

interface VacationRentalSchemaProps {
  property: Property;
  /** Canonical URL of the page rendering this schema. */
  canonical: string;
  /** Display name (already localized). */
  name: string;
  /** The page's own meta description. */
  description: string;
  /** Fallback street address if property.address is missing. */
  streetAddress?: string;
  /** Optional coordinates — only pass when real data exists. */
  geo?: { latitude: number; longitude: number };
}

/**
 * VacationRental JSON-LD for a single property page.
 *
 * Rules: only fields backed by real data in src/data/properties.ts are emitted.
 * No `offers` block (no per-night price data exists in the codebase) and no
 * `aggregateRating` (the site shows no first-party review scores).
 */
export const buildVacationRentalSchema = ({
  property,
  canonical,
  name,
  description,
  streetAddress,
  geo,
}: VacationRentalSchemaProps) => {
  const street = property.address?.street ?? streetAddress;
  const images = [property.heroImage, ...(property.images ?? [])]
    .filter((src): src is string => Boolean(src))
    .filter((src, i, arr) => arr.indexOf(src) === i)
    .slice(0, 12)
    .map(abs);

  const bathroomsTotal = Number.parseFloat(property.bathrooms);

  const amenities = [
    property.sauna ? feature("Sauna") : null,
    property.fireplace ? feature("Fireplace") : null,
    property.hotTub ? feature("Outdoor hot tub") : null,
    property.accessible ? feature("Wheelchair accessible") : null,
    feature("WiFi"),
    feature("Kitchen"),
    feature("Free parking"),
    feature("Dishwasher"),
  ].filter(Boolean);

  const accommodation: Record<string, unknown> = {
    "@type": "Accommodation",
    name,
    occupancy: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: property.maxGuests,
      unitCode: "C62",
    },
    amenityFeature: amenities,
  };
  if (property.bedrooms) accommodation.numberOfBedrooms = property.bedrooms;
  if (Number.isFinite(bathroomsTotal)) accommodation.numberOfBathroomsTotal = bathroomsTotal;
  if (property.sqm) {
    accommodation.floorSize = {
      "@type": "QuantitativeValue",
      value: property.sqm,
      unitCode: "MTK",
    };
  }

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name,
    identifier: property.slug,
    description,
    url: canonical,
    ...(images.length ? { image: images } : {}),
    address: {
      "@type": "PostalAddress",
      ...(street ? { streetAddress: street } : {}),
      addressLocality: "Sirkka",
      postalCode: property.address?.postalCode ?? "99130",
      addressRegion: "Lappi",
      addressCountry: "FI",
    },
    ...(geo
      ? { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } }
      : {}),
    containsPlace: accommodation,
    checkinTime: CHECKIN_TIME,
    checkoutTime: CHECKOUT_TIME,
    petsAllowed: !!property.petsAllowed,
    numberOfRooms: property.bedrooms || undefined,
    ...(property.sqm
      ? { floorSize: { "@type": "QuantitativeValue", value: property.sqm, unitCode: "MTK" } }
      : {}),
    amenityFeature: amenities,
    // No offers: no verified per-night price data exists in the data layer.
    // No aggregateRating: the site displays no first-party review scores.
  };

  return schema;
};

const PropertySchema = (props: VacationRentalSchemaProps) => (
  <JsonLd data={buildVacationRentalSchema(props)} />
);

export interface ComplexUnit {
  name: string;
  url: string;
  maxGuests?: number;
  sqm?: number;
  bedrooms?: number;
}

interface ComplexSchemaProps {
  name: string;
  alternateName?: string[];
  description: string;
  canonical: string;
  streetAddress?: string;
  units: ComplexUnit[];
  images?: string[];
  /** Stable identifier (hub slug). */
  identifier?: string;
  /** Optional coordinates — only pass when real data exists. */
  geo?: { latitude: number; longitude: number };
}

/** ApartmentComplex JSON-LD for building/street hub pages. */
export const buildApartmentComplexSchema = ({
  name,
  alternateName,
  description,
  canonical,
  streetAddress,
  units,
  images,
  identifier,
  geo,
}: ComplexSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name,
  ...(identifier ? { identifier } : {}),
  ...(alternateName && alternateName.length ? { alternateName } : {}),
  description,
  url: canonical,
  ...(images && images.length
    ? { image: images.filter((v, i, a) => a.indexOf(v) === i).slice(0, 12).map(abs) }
    : {}),
  address: {
    "@type": "PostalAddress",
    ...(streetAddress ? { streetAddress } : {}),
    addressLocality: "Sirkka",
    postalCode: "99130",
    addressRegion: "Lappi",
    addressCountry: "FI",
  },
  ...(geo
    ? { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } }
    : {}),
  numberOfAccommodationUnits: {
    "@type": "QuantitativeValue",
    value: units.length,
  },
  containsPlace: units.map((u) => ({
    "@type": "Accommodation",
    name: u.name,
    url: u.url,
    ...(u.bedrooms ? { numberOfBedrooms: u.bedrooms } : {}),
    ...(u.sqm
      ? { floorSize: { "@type": "QuantitativeValue", value: u.sqm, unitCode: "MTK" } }
      : {}),
    ...(u.maxGuests
      ? {
          occupancy: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: u.maxGuests,
            unitCode: "C62",
          },
        }
      : {}),
  })),
});

export const ApartmentComplexSchema = (props: ComplexSchemaProps) => (
  <JsonLd data={buildApartmentComplexSchema(props)} />
);

export default PropertySchema;
