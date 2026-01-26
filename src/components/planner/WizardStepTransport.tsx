import { WizardData } from '@/types/planner';
import { Car, Footprints } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardStepTransportProps {
  lang: 'fi' | 'en';
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const translations = {
  fi: {
    title: 'Liikkuminen',
    subtitle: 'Miten liikutte Levillä?',
    withCar: {
      title: 'Autolla',
      description: 'Oma auto tai vuokra-auto käytössä',
    },
    withoutCar: {
      title: 'Ilman autoa',
      description: 'Skibussit, kävely, taksit',
    },
    note: 'Ilman autoa priorisoimme aktiviteetteja kävelyetäisyydellä tai skibussireitin varrella.',
  },
  en: {
    title: 'Getting Around',
    subtitle: 'How will you get around in Levi?',
    withCar: {
      title: 'With a car',
      description: 'Own car or rental car available',
    },
    withoutCar: {
      title: 'Without a car',
      description: 'Ski buses, walking, taxis',
    },
    note: 'Without a car, we\'ll prioritize activities within walking distance or along ski bus routes.',
  }
};

const WizardStepTransport = ({ lang, data, onChange }: WizardStepTransportProps) => {
  const t = translations[lang];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {t.title}
        </h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* With car */}
        <button
          onClick={() => onChange({ hasCar: true })}
          className={cn(
            "p-6 rounded-xl border-2 text-left transition-all duration-200",
            "hover:border-primary/50 hover:bg-accent/50",
            data.hasCar 
              ? "border-primary bg-primary/5" 
              : "border-border bg-card"
          )}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className={cn(
              "p-4 rounded-full",
              data.hasCar ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Car className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {t.withCar.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.withCar.description}
              </p>
            </div>
          </div>
        </button>

        {/* Without car */}
        <button
          onClick={() => onChange({ hasCar: false })}
          className={cn(
            "p-6 rounded-xl border-2 text-left transition-all duration-200",
            "hover:border-primary/50 hover:bg-accent/50",
            !data.hasCar 
              ? "border-primary bg-primary/5" 
              : "border-border bg-card"
          )}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className={cn(
              "p-4 rounded-full",
              !data.hasCar ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Footprints className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {t.withoutCar.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.withoutCar.description}
              </p>
            </div>
          </div>
        </button>
      </div>

      {!data.hasCar && (
        <p className="text-sm text-muted-foreground text-center bg-accent/50 p-3 rounded-lg animate-fade-in">
          💡 {t.note}
        </p>
      )}
    </div>
  );
};

export default WizardStepTransport;
