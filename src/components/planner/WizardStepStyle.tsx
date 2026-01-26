import { WizardData, HolidayStyle } from '@/types/planner';
import { Zap, Scale, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardStepStyleProps {
  lang: 'fi' | 'en';
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const translations = {
  fi: {
    title: 'Lomatyyli',
    subtitle: 'Millaista lomaa haluatte viettää?',
    styles: {
      active: {
        title: 'Aktiivinen',
        description: 'Paljon aktiviteetteja, täyteläiset päivät',
      },
      balanced: {
        title: 'Tasapainoinen',
        description: 'Sekoitus toimintaa ja lepoa',
      },
      relaxed: {
        title: 'Rento',
        description: 'Rauhallinen tahti, paljon vapaata aikaa',
      },
    },
  },
  en: {
    title: 'Holiday Style',
    subtitle: 'What kind of holiday do you want?',
    styles: {
      active: {
        title: 'Active',
        description: 'Lots of activities, full days',
      },
      balanced: {
        title: 'Balanced',
        description: 'Mix of activities and rest',
      },
      relaxed: {
        title: 'Relaxed',
        description: 'Calm pace, plenty of free time',
      },
    },
  }
};

const styleIcons = {
  active: Zap,
  balanced: Scale,
  relaxed: Coffee,
};

const WizardStepStyle = ({ lang, data, onChange }: WizardStepStyleProps) => {
  const t = translations[lang];

  const styles: HolidayStyle[] = ['active', 'balanced', 'relaxed'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {t.title}
        </h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid gap-4">
        {styles.map((style) => {
          const Icon = styleIcons[style];
          const isSelected = data.style === style;

          return (
            <button
              key={style}
              onClick={() => onChange({ style })}
              className={cn(
                "p-5 rounded-xl border-2 text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50",
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {t.styles[style].title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.styles[style].description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WizardStepStyle;
