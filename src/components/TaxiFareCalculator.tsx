import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, Users, MapPin, Plane } from "lucide-react";
import { Language } from "@/translations";

interface TaxiFareCalculatorProps {
  lang?: Language;
}

const translations = {
  fi: {
    title: "Levin taksilaskuri",
    subtitle: "Arvioi taksimatkan hinta Levillä",
    passengers: "Matkustajat",
    passengersGroup1: "1–4 henkilöä",
    passengersGroup2: "5–8 henkilöä",
    route: "Valitse reitti",
    customKm: "Vapaa kilometrimäärä",
    km: "km",
    min: "min",
    estimate: "Hinta-arvio",
    kmFee: "Ajomatka",
    timeFee: "Ajoaika",
    total: "Yhteensä",
    fixedPrice: "Kiinteä hinta",
    levilleNetPrice: "Leville.net-asiakkaille",
    disclaimer: "Hinnat ovat arvioita ja voivat vaihdella. Lentokenttäkuljetus kiinteällä hinnalla varaamalla suoraan.",
    estTime: "Arvioitu ajoaika",
  },
  en: {
    title: "Taxi Fare Calculator",
    subtitle: "Estimate your taxi fare in Levi",
    passengers: "Passengers",
    passengersGroup1: "1–4 persons",
    passengersGroup2: "5–8 persons",
    route: "Choose route",
    customKm: "Custom distance",
    km: "km",
    min: "min",
    estimate: "Fare Estimate",
    kmFee: "Distance",
    timeFee: "Time",
    total: "Total",
    fixedPrice: "Fixed price",
    levilleNetPrice: "For Leville.net guests",
    disclaimer: "Prices are estimates and may vary. Airport transfer at fixed price when booked directly.",
    estTime: "Estimated travel time",
  },
  nl: {
    title: "Taxicalculator",
    subtitle: "Schat je taxikosten in Levi",
    passengers: "Passagiers",
    passengersGroup1: "1–4 personen",
    passengersGroup2: "5–8 personen",
    route: "Kies route",
    customKm: "Vrije afstand",
    km: "km",
    min: "min",
    estimate: "Geschatte prijs",
    kmFee: "Afstand",
    timeFee: "Tijd",
    total: "Totaal",
    fixedPrice: "Vaste prijs",
    levilleNetPrice: "Voor Leville.net gasten",
    disclaimer: "Prijzen zijn schattingen en kunnen variëren. Luchthaventransfer tegen vaste prijs bij directe boeking.",
    estTime: "Geschatte reistijd",
  },
};

interface Route {
  id: string;
  label: Record<string, string>;
  km: number;
  isAirport?: boolean;
}

const routes: Route[] = [
  {
    id: "airport",
    label: { fi: "Kittilän lentokenttä → Levi (Hiihtäjänkuja)", en: "Kittilä Airport → Levi (Hiihtäjänkuja)", nl: "Luchthaven Kittilä → Levi (Hiihtäjänkuja)" },
    km: 15,
    isAirport: true,
  },
  {
    id: "southpoint",
    label: { fi: "South Point → Levin keskusta (Hiihtäjänkuja)", en: "South Point → Levi center (Hiihtäjänkuja)", nl: "South Point → Levi centrum (Hiihtäjänkuja)" },
    km: 6,
  },
  {
    id: "custom",
    label: { fi: "Muu matka", en: "Other distance", nl: "Andere afstand" },
    km: 5,
  },
];

const TaxiFareCalculator = ({ lang = "fi" }: TaxiFareCalculatorProps) => {
  const t = translations[lang] || translations.fi;
  const [passengerGroup, setPassengerGroup] = useState<1 | 2>(1);
  const [selectedRoute, setSelectedRoute] = useState("airport");
  const [customKm, setCustomKm] = useState(5);

  const route = routes.find((r) => r.id === selectedRoute) || routes[0];
  const km = selectedRoute === "custom" ? customKm : route.km;

  const fare = useMemo(() => {
    if (route.isAirport) {
      return { kmCost: 0, timeCost: 0, total: 60, isFixed: true, minutes: 15 };
    }
    const kmRate = passengerGroup === 1 ? 1.6 : 2.0;
    const timeRate = 1.15;
    const avgSpeed = 40;
    const minutes = Math.ceil((km / avgSpeed) * 60);
    const kmCost = km * kmRate;
    const timeCost = minutes * timeRate;
    return { kmCost, timeCost, total: kmCost + timeCost, isFixed: false, minutes };
  }, [km, passengerGroup, route.isAirport]);

  const sectionId = "levin-taksilaskuri";

  return (
    <section id={sectionId} aria-labelledby={`${sectionId}-heading`} className="mt-6">
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 id={`${sectionId}-heading`} className="text-lg font-semibold">{t.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">{t.subtitle}</p>

          {/* Passenger group */}
          <div className="mb-5">
            <label className="text-sm font-medium flex items-center gap-1.5 mb-2">
              <Users className="w-4 h-4" aria-hidden="true" /> {t.passengers}
            </label>
            <div className="flex gap-2">
              <Button
                variant={passengerGroup === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setPassengerGroup(1)}
              >
                {t.passengersGroup1} (€1,60/km)
              </Button>
              <Button
                variant={passengerGroup === 2 ? "default" : "outline"}
                size="sm"
                onClick={() => setPassengerGroup(2)}
              >
                {t.passengersGroup2} (€2,00/km)
              </Button>
            </div>
          </div>

          {/* Route selection */}
          <div className="mb-5">
            <label className="text-sm font-medium flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4" aria-hidden="true" /> {t.route}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {routes.map((r) => (
                <Button
                  key={r.id}
                  variant={selectedRoute === r.id ? "default" : "outline"}
                  size="sm"
                  className="justify-start text-left h-auto py-2"
                  onClick={() => setSelectedRoute(r.id)}
                >
                  {r.isAirport && <Plane className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" aria-hidden="true" />}
                  <span className="truncate">
                    {r.label[lang] || r.label.en}
                    {r.id !== "custom" && ` (${r.km} km)`}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom km slider */}
          {selectedRoute === "custom" && (
            <div className="mb-5">
              <label className="text-sm font-medium mb-2 block">
                {t.customKm}: {customKm} {t.km}
              </label>
              <Slider
                value={[customKm]}
                onValueChange={(v) => setCustomKm(v[0])}
                min={1}
                max={50}
                step={0.5}
                className="mt-2"
              />
            </div>
          )}

          {/* Result */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2" role="status" aria-live="polite">
            <h4 className="font-semibold text-sm">{t.estimate}</h4>

            {fare.isFixed ? (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5" aria-hidden="true" /> {t.fixedPrice}
                  </span>
                  <span className="font-bold text-primary">€60,00</span>
                </div>
                <p className="text-xs text-primary font-medium">{t.levilleNetPrice}</p>
                <p className="text-xs text-muted-foreground">
                  {t.estTime}: ~15 {t.min}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{t.kmFee} ({km} {t.km} × €{passengerGroup === 1 ? "1,60" : "2,00"})</span>
                  <span>€{fare.kmCost.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t.timeFee} (~{fare.minutes} {t.min} × €1,15)</span>
                  <span>€{fare.timeCost.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="border-t border-border pt-1 flex justify-between font-bold">
                  <span>{t.total}</span>
                  <span className="text-primary">~€{fare.total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-3">{t.disclaimer}</p>
        </CardContent>
      </Card>
    </section>
  );
};

export default TaxiFareCalculator;
