import { WizardData } from '@/types/planner';
import { Checkbox } from '@/components/ui/checkbox';
import { Mountain, Dog, Heart, Sparkles, Car, Droplets, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardStepActivitiesProps {
  lang: 'fi' | 'en';
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const translations = {
  fi: {
    title: 'Toiveaktiviteetit',
    subtitle: 'Valitse aktiviteetit, jotka haluatte ehdottomasti kokea. Voit myös jättää tyhjäksi.',
    noPreference: 'Ei erityistoiveita – ehdota vapaasti',
    activities: {
      skiing: 'Laskettelu / lumilautailu',
      'husky-safari': 'Huskysafari',
      'reindeer-farm': 'Porofarmi',
      'northern-lights': 'Revontuliretki',
      'ice-karting': 'Jääkarting',
      spa: 'Kylpylä / rentoutuminen',
    },
  },
  en: {
    title: 'Must-Have Activities',
    subtitle: 'Select activities you definitely want to experience. You can also leave this empty.',
    noPreference: 'No preferences – suggest freely',
    activities: {
      skiing: 'Skiing / snowboarding',
      'husky-safari': 'Husky safari',
      'reindeer-farm': 'Reindeer farm',
      'northern-lights': 'Northern lights tour',
      'ice-karting': 'Ice karting',
      spa: 'Spa / relaxation',
    },
  }
};

const activityIcons: Record<string, React.ElementType> = {
  skiing: Mountain,
  'husky-safari': Dog,
  'reindeer-farm': Heart,
  'northern-lights': Sparkles,
  'ice-karting': Car,
  spa: Droplets,
};

const activityIds = ['skiing', 'husky-safari', 'reindeer-farm', 'northern-lights', 'ice-karting', 'spa'];

const WizardStepActivities = ({ lang, data, onChange }: WizardStepActivitiesProps) => {
  const t = translations[lang];

  const toggleActivity = (activityId: string) => {
    const newMustHave = data.mustHave.includes(activityId)
      ? data.mustHave.filter(id => id !== activityId)
      : [...data.mustHave, activityId];
    onChange({ mustHave: newMustHave });
  };

  const clearAll = () => {
    onChange({ mustHave: [] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {t.title}
        </h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {activityIds.map((activityId) => {
          const Icon = activityIcons[activityId];
          const isSelected = data.mustHave.includes(activityId);

          return (
            <button
              key={activityId}
              onClick={() => toggleActivity(activityId)}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-all duration-200",
                "hover:border-primary/50 flex items-center gap-3",
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-border bg-card"
              )}
            >
              <Checkbox checked={isSelected} className="pointer-events-none" />
              <Icon className={cn(
                "h-5 w-5",
                isSelected ? "text-primary" : "text-muted-foreground"
              )} />
              <span className="font-medium text-foreground">
                {t.activities[activityId as keyof typeof t.activities]}
              </span>
            </button>
          );
        })}
      </div>

      {/* No preference option */}
      <button
        onClick={clearAll}
        className={cn(
          "w-full p-4 rounded-lg border-2 text-center transition-all duration-200",
          "hover:border-primary/50 flex items-center justify-center gap-2",
          data.mustHave.length === 0 
            ? "border-primary bg-primary/5" 
            : "border-border bg-card"
        )}
      >
        <HelpCircle className="h-5 w-5 text-muted-foreground" />
        <span className="text-muted-foreground">{t.noPreference}</span>
      </button>
    </div>
  );
};

export default WizardStepActivities;
