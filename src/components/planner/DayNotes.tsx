import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote } from 'lucide-react';

interface DayNotesProps {
  lang: 'fi' | 'en';
  note: string;
  onChange: (note: string) => void;
}

const translations = {
  fi: {
    placeholder: 'Muistiinpanot tälle päivälle...',
    label: 'Muistio',
  },
  en: {
    placeholder: 'Notes for this day...',
    label: 'Notes',
  }
};

const DayNotes = ({ lang, note, onChange }: DayNotesProps) => {
  const t = translations[lang];
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="border border-border rounded-lg p-2 bg-muted/30">
      <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
        <StickyNote className="h-3 w-3" />
        {t.label}
      </div>
      <Textarea
        value={note}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={t.placeholder}
        className={`min-h-[40px] text-xs resize-none border-0 bg-transparent p-0 focus-visible:ring-0 ${
          isFocused ? 'placeholder:text-muted-foreground/50' : ''
        }`}
      />
    </div>
  );
};

export default DayNotes;
