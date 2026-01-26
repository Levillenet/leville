import { WizardData } from '@/types/planner';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface WizardStepDurationProps {
  lang: 'fi' | 'en';
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const translations = {
  fi: {
    title: 'Loman pituus',
    subtitle: 'Kuinka monta päivää vietät Levillä?',
    days: 'päivää',
    nights: 'yötä',
  },
  en: {
    title: 'Holiday Duration',
    subtitle: 'How many days will you spend in Levi?',
    days: 'days',
    nights: 'nights',
  }
};

const WizardStepDuration = ({ lang, data, onChange }: WizardStepDurationProps) => {
  const t = translations[lang];

  const dayOptions = [3, 4, 5, 6, 7];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-primary" />
          {t.title}
        </h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {dayOptions.map((num) => (
          <Button
            key={num}
            variant={data.days === num ? 'default' : 'outline'}
            onClick={() => onChange({ days: num })}
            className="w-24 h-20 flex flex-col items-center justify-center gap-1"
          >
            <span className="text-2xl font-bold">{num}</span>
            <span className="text-xs opacity-80">{t.days}</span>
          </Button>
        ))}
      </div>

      <div className="text-center text-muted-foreground text-sm">
        = {data.days - 1} {t.nights}
      </div>
    </div>
  );
};

export default WizardStepDuration;
