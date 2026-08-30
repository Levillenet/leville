/**
 * Rakennuskohtaiset koordinaatit JSON-LD:tä varten.
 *
 * Arvot on geokoodattu kohteiden katuosoitteista (OpenStreetMap / Nominatim)
 * ja tallennettu kiinteinä, jotta ajonaikaisia karttarajapintakutsuja ei tarvita.
 */
export interface GeoPoint {
  latitude: number;
  longitude: number;
}

const BUILDING_GEO: Record<string, GeoPoint> = {
  "hiihtajankuja 2": { latitude: 67.806645, longitude: 24.810189 },
  "hiihtajankuja 5": { latitude: 67.805885, longitude: 24.808389 },
  "ratsastajankuja 2": { latitude: 67.805981, longitude: 24.811108 },
  "skimbaajankuja 3": { latitude: 67.806737, longitude: 24.808031 },
  "skimbaajankuja 4": { latitude: 67.807239, longitude: 24.808261 },
  "postintie 3": { latitude: 67.809443, longitude: 24.803158 },
  leviraitti: { latitude: 67.812256, longitude: 24.807677 },
};

const normalize = (value: string) =>
  value
    .split(",")[0]
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Palauttaa rakennuksen koordinaatit katuosoitteen perusteella, tai undefined. */
export function getBuildingGeo(streetAddress?: string | null): GeoPoint | undefined {
  if (!streetAddress) return undefined;
  const key = normalize(streetAddress);
  if (BUILDING_GEO[key]) return BUILDING_GEO[key];
  // Katutason osuma ilman numeroa (esim. "Leviraitti 10" -> "leviraitti")
  const streetOnly = key.replace(/\s+\d+.*$/, "");
  return BUILDING_GEO[streetOnly];
}
