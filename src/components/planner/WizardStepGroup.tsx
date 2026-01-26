import { WizardData } from '@/types/planner';
import { Button } from '@/components/ui/button';
import { Users, Baby } from 'lucide-react';

interface WizardStepGroupProps {
  lang: 'fi' | 'en';
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const translations = {
  fi: {
    title: 'Matkaseurue',
    adults: 'Aikuisia',
    children: 'Lapsia',
    childAges: 'Lasten ikähaarukka',
    ageRanges: ['Alle 4 vuotta', '4–7 vuotta', '8–12 vuotta', '13+ vuotta'],
    selectAges: 'Valitse lasten iät',
  },
  en: {
    title: 'Travel Group',
    adults: 'Adults',
    children: 'Children',
    childAges: 'Children age range',
    ageRanges: ['Under 4 years', '4–7 years', '8–12 years', '13+ years'],
    selectAges: 'Select children\'s ages',
  }
};

const ageRangeValues = [2, 5, 10, 14]; // Representative ages for each range

const WizardStepGroup = ({ lang, data, onChange }: WizardStepGroupProps) => {
  const t = translations[lang];

  const handleAdultsChange = (value: number) => {
    onChange({ adults: Math.max(1, Math.min(10, value)) });
  };

  const handleChildrenChange = (value: number) => {
    const newCount = Math.max(0, Math.min(6, value));
    const newAges = data.childAges.slice(0, newCount);
    // Fill with default age if adding children
    while (newAges.length < newCount) {
      newAges.push(5);
    }
    onChange({ children: newCount, childAges: newAges });
  };

  const toggleAgeRange = (ageValue: number) => {
    const newAges = [...data.childAges];
    const index = newAges.indexOf(ageValue);
    if (index > -1) {
      newAges.splice(index, 1);
    } else if (newAges.length < data.children) {
      newAges.push(ageValue);
    }
    onChange({ childAges: newAges });
  };

  const setChildAge = (index: number, ageValue: number) => {
    const newAges = [...data.childAges];
    newAges[index] = ageValue;
    onChange({ childAges: newAges });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        {t.title}
      </h2>

      {/* Adults */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">{t.adults}</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <Button
              key={num}
              variant={data.adults === num ? 'default' : 'outline'}
              onClick={() => handleAdultsChange(num)}
              className="w-12 h-12 text-lg"
            >
              {num}{num === 4 ? '+' : ''}
            </Button>
          ))}
        </div>
      </div>

      {/* Children */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Baby className="h-4 w-4" />
          {t.children}
        </label>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((num) => (
            <Button
              key={num}
              variant={data.children === num ? 'default' : 'outline'}
              onClick={() => handleChildrenChange(num)}
              className="w-12 h-12 text-lg"
            >
              {num}{num === 3 ? '+' : ''}
            </Button>
          ))}
        </div>
      </div>

      {/* Child Ages */}
      {data.children > 0 && (
        <div className="space-y-3 animate-fade-in">
          <label className="text-sm font-medium text-foreground">{t.selectAges}</label>
          <div className="space-y-3">
            {Array.from({ length: data.children }).map((_, childIndex) => (
              <div key={childIndex} className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground w-full mb-1">
                  {lang === 'fi' ? `Lapsi ${childIndex + 1}:` : `Child ${childIndex + 1}:`}
                </span>
                {t.ageRanges.map((range, ageIndex) => (
                  <Button
                    key={ageIndex}
                    variant={data.childAges[childIndex] === ageRangeValues[ageIndex] ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setChildAge(childIndex, ageRangeValues[ageIndex])}
                    className="text-xs"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WizardStepGroup;
