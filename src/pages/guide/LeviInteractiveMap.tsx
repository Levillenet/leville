import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import ReadNextSection from "@/components/guide/ReadNextSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Navigation, Car, ExternalLink, Home, Footprints, X, RotateCcw, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Constants ──────────────────────────────────────────────

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "pk.eyJ1IjoibGV2aWxsZW5ldCIsImEiOiJjbW1ycGNibXAxOGQ5MnlyMHJzNjY1NXdxIn0.PhSMYsZo5wg3bzYuSWZ6ZA";

const LEVI_CENTER: [number, number] = [24.8082, 67.8040]; // Gondola base, Hissitie 8

const ACCOMMODATIONS = [
  { name: "Skistar Apartments", shortName: "Skistar", coords: [24.80344133427575, 67.80940102593588] as [number, number], labelPosition: "left" as const, bookingUrl: "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=412" },
  { name: "Levi Centre Chalets", shortName: "Centre Chalets", coords: [24.80862246230913, 67.80593088058667] as [number, number], labelPosition: "left" as const, bookingUrl: "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=413" },
  { name: "Bearlodge Karhupirtti", shortName: "Bearlodge", coords: [24.80779533870497, 67.80682775484506] as [number, number], labelPosition: "bottom" as const, bookingUrl: "https://app.moder.fi/levillenet/303?step=1" },
  { name: "Levi Glacier Apartments", shortName: "Glacier", coords: [24.81072616416929, 67.80602399128938] as [number, number], labelPosition: "right" as const, bookingUrl: "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=214" },
];

const LANDMARKS = [
  { name: "Utsuvaara", coords: [24.825, 67.800] as [number, number], icon: "mountain", description: "Scenic viewpoint hill" },
  { name: "Levi Golf", coords: [24.87495212839187, 67.80021315268473] as [number, number], icon: "flag", description: "Levi Golf Course" },
  { name: "South Point", coords: [24.85763668481725, 67.76723992669096] as [number, number], icon: "compass", description: "Southern ski area" },
  { name: "Levi Black Slopes", coords: [24.820240762801834, 67.78661609676938] as [number, number], icon: "mountain", description: "Expert-level ski slopes" },
  { name: "K-Market", coords: [24.80309651101312, 67.80576345750278] as [number, number], icon: "cart", description: "Grocery store" },
  { name: "S-Market", coords: [24.805630637199016, 67.8089398914121] as [number, number], icon: "cart", description: "Grocery store" },
  { name: "Levi Spa", coords: [24.802793868554122, 67.80408357275215] as [number, number], icon: "waves", description: "Spa & water park" },
  { name: "Zero Point", coords: [24.808357257365213, 67.80428422200386] as [number, number], icon: "circle", description: "Gondola upper station, fell top" },
];

// ── Helpers ────────────────────────────────────────────────

function haversine(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function fmtKm(km: number) {
  return km.toFixed(1).replace(".", ",") + " km";
}

function fmtEur(val: number) {
  return val.toFixed(2).replace(".", ",") + " €";
}

function taxiFare(km: number) {
  return 7.9 + km * 1.6;
}

function walkTime(km: number) {
  const mins = Math.round((km / 4) * 60);
  if (mins > 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `~${h} h ${m} min`;
  }
  return `~${mins} min`;
}

function distToCenter(coords: [number, number]) {
  return haversine(coords, LEVI_CENTER);
}

// ── Marker HTML builders ───────────────────────────────────

type MarkerLabelPosition = "top" | "right" | "bottom" | "left";

function createCenterMarkerEl(name: string, labelPosition: MarkerLabelPosition = "right") {
  const el = document.createElement("div");
  el.className = `levi-marker-with-label levi-label-${labelPosition}`;
  el.innerHTML = `
    <div class="levi-center-marker">
      <div class="levi-pulse-ring"></div>
      <div class="levi-pulse-dot"></div>
    </div>
    <div class="levi-marker-label levi-marker-label-center">${name}</div>
  `;
  return el;
}

function createAccommodationMarkerEl(name: string, labelPosition: MarkerLabelPosition = "bottom") {
  const el = document.createElement("div");
  el.className = `levi-marker-with-label levi-label-${labelPosition}`;
  el.innerHTML = `
    <div class="levi-accom-marker">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    </div>
    <div class="levi-marker-label levi-marker-label-accom">${name}</div>
  `;
  return el;
}

function createLandmarkMarkerEl(name: string, labelPosition: MarkerLabelPosition = "top") {
  const el = document.createElement("div");
  el.className = `levi-marker-with-label levi-label-${labelPosition}`;
  el.innerHTML = `
    <div class="levi-landmark-marker">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    </div>
    <div class="levi-marker-label levi-marker-label-landmark">${name}</div>
  `;
  return el;
}

function createUserMarkerEl(label: string) {
  const el = document.createElement("div");
  el.className = "levi-user-marker";
  el.innerHTML = `<span>${label}</span>`;
  return el;
}

// ── Routing helper ─────────────────────────────────────────

async function fetchRoute(a: [number, number], b: [number, number]): Promise<{ distance_km: number; geometry: GeoJSON.LineString } | null> {
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${a[0]},${a[1]};${b[0]},${b[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const route = data.routes?.[0];
    if (!route) return null;
    return { distance_km: route.distance / 1000, geometry: route.geometry };
  } catch {
    return null;
  }
}

// ── Component ──────────────────────────────────────────────

interface SelectedPoint {
  coords: [number, number];
  name: string;
  marker: mapboxgl.Marker;
}

const LeviInteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [legendOpen, setLegendOpen] = useState(true);
  const [pointA, setPointA] = useState<SelectedPoint | null>(null);
  const [pointB, setPointB] = useState<SelectedPoint | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance_km: number } | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [noToken, setNoToken] = useState(false);
  const pointARef = useRef<SelectedPoint | null>(null);
  const pointBRef = useRef<SelectedPoint | null>(null);

  // keep refs in sync
  useEffect(() => { pointARef.current = pointA; }, [pointA]);
  useEffect(() => { pointBRef.current = pointB; }, [pointB]);

  const clearSelection = useCallback(() => {
    pointARef.current?.marker.remove();
    pointBRef.current?.marker.remove();
    setPointA(null);
    setPointB(null);
    setRouteInfo(null);
    setRouteLoading(false);
    const map = mapRef.current;
    if (map) {
      if (map.getLayer("ab-line-layer")) map.removeLayer("ab-line-layer");
      if (map.getSource("ab-line")) map.removeSource("ab-line");
    }
  }, []);

  const resetView = useCallback(() => {
    clearSelection();
    mapRef.current?.flyTo({ center: LEVI_CENTER, zoom: 13 });
  }, [clearSelection]);

  // Handle map click – the core two-click logic
  const handleMapClick = useCallback(async (coords: [number, number], name: string) => {
    const map = mapRef.current;
    if (!map) return;

    const a = pointARef.current;
    const b = pointBRef.current;

    if (!a) {
      // First click → set A
      const marker = new mapboxgl.Marker({ element: createUserMarkerEl("A") })
        .setLngLat(coords)
        .addTo(map);
      setPointA({ coords, name, marker });
    } else if (!b) {
      // Second click → set B and fetch route
      const marker = new mapboxgl.Marker({ element: createUserMarkerEl("B") })
        .setLngLat(coords)
        .addTo(map);
      setPointB({ coords, name, marker });
      setRouteLoading(true);

      // Clean old line
      if (map.getLayer("ab-line-layer")) map.removeLayer("ab-line-layer");
      if (map.getSource("ab-line")) map.removeSource("ab-line");

      // Fetch real route
      const route = await fetchRoute(a.coords, coords);
      const geometry = route?.geometry || { type: "LineString" as const, coordinates: [a.coords, coords] };
      const distance_km = route?.distance_km ?? haversine(a.coords, coords);
      setRouteInfo({ distance_km });
      setRouteLoading(false);

      map.addSource("ab-line", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry,
        },
      });
      map.addLayer({
        id: "ab-line-layer",
        type: "line",
        source: "ab-line",
        paint: {
          "line-color": "#ef4444",
          "line-width": 4,
          "line-dasharray": [0],
        },
      });
    } else {
      // Third click → reset and set new A
      clearSelection();
      const marker = new mapboxgl.Marker({ element: createUserMarkerEl("A") })
        .setLngLat(coords)
        .addTo(map);
      setPointA({ coords, name, marker });
    }
  }, [clearSelection]);

  // ── Init map ──────────────────────────────────────────────
  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      setNoToken(true);
      return;
    }
    if (mapRef.current || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: LEVI_CENTER,
      zoom: 13,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      setMapReady(true);

      // ─ Levi Center marker ─
      const centerEl = createCenterMarkerEl("Levi Center", "right");
      new mapboxgl.Marker({ element: centerEl, anchor: 'center' })
        .setLngLat(LEVI_CENTER)
        .addTo(map);
      centerEl.addEventListener("click", (e) => {
        e.stopPropagation();
        handleMapClick(LEVI_CENTER, "Levi Center – Gondola Lift");
      });

      // ─ Accommodation markers ─
      ACCOMMODATIONS.forEach((acc) => {
        const el = createAccommodationMarkerEl(acc.shortName, acc.labelPosition);
        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat(acc.coords)
          .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, className: "levi-popup" })
          .setHTML(`
            <div class="levi-popup-inner">
              <strong>${acc.name}</strong>
              <p class="text-xs mt-1 opacity-70">${fmtKm(distToCenter(acc.coords))} from center</p>
              <a href="${acc.bookingUrl}" target="_blank" rel="noopener noreferrer" class="levi-popup-book">Book Now →</a>
            </div>
          `);
        marker.setPopup(popup);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          window.open(acc.bookingUrl, "_blank", "noopener,noreferrer");
          handleMapClick(acc.coords, acc.name);
        });
      });

      // ─ Landmark markers ─
      LANDMARKS.forEach((lm) => {
        const el = createLandmarkMarkerEl(lm.name, "top");
        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat(lm.coords)
          .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, className: "levi-popup" })
          .setHTML(`
            <div class="levi-popup-inner">
              <strong>${lm.name}</strong>
              <p class="text-xs mt-1 opacity-70">${lm.description}</p>
              <p class="text-xs mt-1 opacity-70">${fmtKm(distToCenter(lm.coords))} from center</p>
            </div>
          `);
        marker.setPopup(popup);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          handleMapClick(lm.coords, lm.name);
        });
      });

      // ─ Map background click ─
      map.on("click", (e) => {
        handleMapClick([e.lngLat.lng, e.lngLat.lat], "Custom Location");
      });
    });

    return () => { map.remove(); mapRef.current = null; };
  }, [handleMapClick]);

  // ── Comparison data ───────────────────────────────────────
  const comparison = pointA && pointB ? (() => {
    const dist = routeInfo?.distance_km ?? haversine(pointA.coords, pointB.coords);
    return {
      dist,
      fare: taxiFare(dist),
      walk: walkTime(dist),
      aToCenter: distToCenter(pointA.coords),
      bToCenter: distToCenter(pointB.coords),
      isRoute: !!routeInfo,
    };
  })() : null;

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Interactive Levi Map – Distances, Taxi Prices & Walking Times | Leville.net"
        description="Explore Levi ski resort with our interactive map. Click locations to see distances, taxi fares, and walking times. Find and book our accommodations directly from the map."
        canonicalUrl="https://leville.net/levi-map"
        lang="en"
        ogType="website"
      />
      <Header />

      <main className="pt-20 sm:pt-24">
        {/* Hero */}
        <section className="container mx-auto px-4 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Interactive Levi Map
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Click two points on the map to compare distances, estimated taxi fares and walking times. Click on our accommodations to book directly.
          </p>
        </section>

        {/* Map */}
        <section className="container mx-auto px-4 pb-8">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-border/40">
            {noToken ? (
              <div className="h-[60vh] sm:h-[75vh] flex items-center justify-center bg-muted/30">
                <p className="text-muted-foreground text-center px-4">
                  Mapbox token not configured. Set <code className="bg-muted px-1 py-0.5 rounded text-xs">VITE_MAPBOX_TOKEN</code> to enable the map.
                </p>
              </div>
            ) : (
              <div ref={mapContainer} className="h-[60vh] sm:h-[75vh] w-full" />
            )}

            {/* Legend */}
            {mapReady && (
              <div className={cn(
                "absolute top-3 left-3 z-10 bg-background/90 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg transition-all",
                legendOpen ? "p-3" : "p-2"
              )}>
                <button onClick={() => setLegendOpen(!legendOpen)} className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                  <Layers className="w-3.5 h-3.5" />
                  {legendOpen ? "Legend" : "Legend"}
                </button>
                {legendOpen && (
                  <div className="mt-2 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-background shadow inline-block" style={{ background: "hsl(217,91%,60%)" }} /> Levi Center</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-background shadow inline-block" style={{ background: "hsl(38,92%,50%)" }} /> Our Accommodations</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-background shadow inline-block" style={{ background: "hsl(173,58%,39%)" }} /> Landmarks & Services</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-background shadow inline-block" style={{ background: "hsl(0,84%,60%)" }} /> Your selected points</div>
                    <p className="text-muted-foreground pt-1 border-t border-border/30 mt-1">💡 Click two points to compare</p>
                  </div>
                )}
              </div>
            )}

            {/* Reset button */}
            {mapReady && (
              <Button variant="outline" size="sm" onClick={resetView} className="absolute top-3 right-12 z-10 bg-background/90 backdrop-blur-sm shadow-lg text-xs gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </Button>
            )}

            {/* Point A info */}
            {pointA && !pointB && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-xl px-4 py-3 max-w-xs text-center animate-fade-in">
                <p className="text-sm font-medium text-foreground">📍 Point A: {pointA.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{fmtKm(distToCenter(pointA.coords))} from Levi Center</p>
                <p className="text-xs text-muted-foreground mt-1">Click another location to compare.</p>
              </div>
            )}

            {/* Loading indicator */}
            {routeLoading && pointA && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-xl px-4 py-3 max-w-xs text-center animate-fade-in">
                <p className="text-sm text-muted-foreground">🔄 Calculating route...</p>
              </div>
            )}

            {/* Comparison panel */}
            {comparison && pointA && pointB && !routeLoading && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-xl px-4 sm:px-6 py-4 w-[calc(100%-1.5rem)] sm:w-auto sm:max-w-md animate-fade-in">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">📍 {pointA.name}</span>
                    <span className="text-muted-foreground mx-2">→</span>
                    <span className="font-semibold text-foreground">📍 {pointB.name}</span>
                  </div>
                  <button onClick={clearSelection} className="text-muted-foreground hover:text-foreground ml-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="border-t border-border/40 pt-2 space-y-1 text-sm">
                  <div className="flex items-center gap-2"><Navigation className="w-3.5 h-3.5 text-primary" /> <span>Distance {comparison.isRoute ? "(road)" : "(straight line)"}: <strong>{fmtKm(comparison.dist)}</strong></span></div>
                  <div className="flex items-center gap-2"><Car className="w-3.5 h-3.5 text-primary" /> <span>Taxi fare: <strong>~{fmtEur(comparison.fare)}</strong></span></div>
                  <div className="flex items-center gap-2"><Footprints className="w-3.5 h-3.5 text-primary" /> <span>Walking: <strong>{comparison.walk}</strong></span></div>
                </div>
                <div className="border-t border-border/40 pt-2 mt-2 text-xs text-muted-foreground space-y-0.5">
                  <p>A → Levi Center: ~{fmtKm(comparison.aToCenter)}</p>
                  <p>B → Levi Center: ~{fmtKm(comparison.bToCenter)}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Info cards */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* How It Works */}
            <Card className="glass-card border-border/30 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Footprints className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">How To Use This Map</h2>
              </div>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Click any location on the map to set Point A</li>
                <li>Click a second location to set Point B</li>
                <li>See the distance, taxi fare, and walking time</li>
                <li>Click again to start a new comparison</li>
              </ol>
              <p className="text-xs text-muted-foreground mt-3 border-t border-border/30 pt-3">
                💡 Tip: Click on landmarks and accommodations too — they work as points!
              </p>
            </Card>

            {/* Taxi Info */}
            <Card className="glass-card border-border/30 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Car className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Taxi Fare Estimates</h2>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Standard Levi-area taxi rates:</p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Base fare: 7,90 €</li>
                  <li>Per kilometer: 1,60 €/km</li>
                </ul>
                <p className="mt-2 text-xs">These are estimates. Actual fares may vary based on time of day, waiting time, and number of passengers.</p>
              </div>
              <p className="text-xs text-muted-foreground mt-3 border-t border-border/30 pt-3">
                💡 Tip: Kittilä Airport → Levi center (~15 km) costs roughly 30–35 € by taxi.
              </p>
            </Card>

            {/* Our Accommodations */}
            <Card className="glass-card border-border/30 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Home className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Stay With Us</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-3">All our properties are within walking distance of Levi center:</p>
              <ul className="space-y-2">
                {ACCOMMODATIONS.map((acc) => (
                  <li key={acc.name}>
                    <a href={acc.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                      {acc.name} <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Read Next */}
        <section className="container mx-auto px-4 pb-16">
          <ReadNextSection
            title="Plan Your Levi Trip"
            links={[
              { title: "How to Get to Levi", desc: "Flights, buses, and driving directions to Levi ski resort.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
              { title: "Accommodations in Levi", desc: "Browse all our cabins, chalets and apartments in Levi.", href: "/en/accommodations" },
              { title: "Levi Activities & Things to Do", desc: "Discover the best experiences from skiing to Northern Lights.", href: "/guide/activities-in-levi" },
            ]}
          />
        </section>
      </main>

      <Footer />

      {/* Mapbox marker & popup styles */}
      <style>{`
        /* ── Levi Center pulsing marker ── */
        .levi-center-marker { position: absolute; width: 24px; height: 24px; cursor: pointer; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .levi-pulse-dot { width: 14px; height: 14px; background: hsl(var(--primary, 217 91% 60%)); border: 3px solid white; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 6px rgba(59,130,246,.5); z-index: 2; }
        .levi-pulse-ring { width: 24px; height: 24px; border-radius: 50%; background: rgba(59,130,246,.25); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: levi-pulse 2s ease-out infinite; }
        @keyframes levi-pulse { 0% { transform: translate(-50%,-50%) scale(1); opacity: .6; } 100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; } }

        /* ── Shared named-marker label system ── */
        .levi-marker-with-label { position: relative; width: 0; height: 0; overflow: visible; cursor: pointer; }
        .levi-marker-label { position: absolute; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; line-height: 1.2; white-space: nowrap; box-shadow: 0 1px 4px rgba(0,0,0,.2); max-width: 150px; z-index: 3; }
        .levi-label-top .levi-marker-label { bottom: 18px; left: 50%; transform: translateX(-50%); }
        .levi-label-bottom .levi-marker-label { top: 18px; left: 50%; transform: translateX(-50%); }
        .levi-label-right .levi-marker-label { left: 20px; top: 50%; transform: translateY(-50%); }
        .levi-label-left .levi-marker-label { right: 20px; top: 50%; transform: translateY(-50%); }

        /* ── Accommodation markers ── */
        .levi-accom-marker { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #d97706); border: 2.5px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(217,119,6,.4); transition: transform .15s; }
        .levi-marker-with-label:hover .levi-accom-marker { transform: scale(1.15); }
        .levi-marker-label-accom { background: rgba(120,53,0,.85); color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.3); }

        /* ── Landmark markers ── */
        .levi-landmark-marker { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #0d9488, #0f766e); border: 2.5px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(13,148,136,.4); transition: transform .15s; }
        .levi-marker-with-label:hover .levi-landmark-marker { transform: scale(1.15); }
        .levi-marker-label-landmark { background: rgba(5,80,72,.85); color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.3); }
        .levi-marker-label-center { background: rgba(30,64,175,.9); color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.3); }

        /* ── User-placed A/B markers ── */
        .levi-user-marker { width: 28px; height: 28px; border-radius: 50%; background: #ef4444; border: 2.5px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(239,68,68,.4); cursor: pointer; }
        .levi-user-marker span { color: white; font-weight: 700; font-size: 13px; line-height: 1; }

        /* ── Custom popup ── */
        .levi-popup .mapboxgl-popup-content { background: hsl(var(--background, 0 0% 100%)); border-radius: 0.75rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,.15); padding: 0; border: 1px solid hsl(var(--border, 0 0% 90%)); }
        .levi-popup .mapboxgl-popup-tip { border-top-color: hsl(var(--background, 0 0% 100%)); }
        .levi-popup-inner { padding: 12px 16px; font-family: inherit; }
        .levi-popup-inner strong { font-size: 14px; color: hsl(var(--foreground, 0 0% 10%)); }
        .levi-popup-inner p { color: hsl(var(--muted-foreground, 0 0% 45%)); }
        .levi-popup-book { display: inline-block; margin-top: 8px; padding: 4px 12px; border-radius: 6px; background: hsl(var(--primary, 217 91% 60%)); color: white; font-size: 12px; font-weight: 600; text-decoration: none; transition: opacity .15s; }
        .levi-popup-book:hover { opacity: .85; }

        /* Hide default close btn */
        .levi-popup .mapboxgl-popup-close-button { display: none; }
      `}</style>
    </div>
  );
};

export default LeviInteractiveMap;
