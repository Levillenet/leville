import { PlanDay } from '@/types/planner';
import TimeSlot from './TimeSlot';
import DayNotes from './DayNotes';
import { PlannerActivity } from '@/types/planner';

interface DayColumnProps {
  lang: 'fi' | 'en';
  day: PlanDay;
  dayIndex: number;
  onUpdateActivity: (dayIndex: number, slotIndex: number, activityIndex: number, updates: Partial<PlannerActivity>) => void;
  onRemoveActivity: (dayIndex: number, slotIndex: number, activityIndex: number) => void;
  onMoveActivity: (fromDay: number, fromSlot: number, fromIndex: number, toDay: number, toSlot: number) => void;
  onUpdateNote: (dayIndex: number, note: string) => void;
}

const translations = {
  fi: {
    day: 'Päivä',
  },
  en: {
    day: 'Day',
  }
};

const DayColumn = ({
  lang,
  day,
  dayIndex,
  onUpdateActivity,
  onRemoveActivity,
  onMoveActivity,
  onUpdateNote,
}: DayColumnProps) => {
  const t = translations[lang];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Day header */}
      <div className="bg-primary/10 px-4 py-3 border-b border-border">
        <h2 className="font-semibold text-foreground text-center">
          {t.day} {day.dayNumber}
        </h2>
      </div>

      {/* Time slots */}
      <div className="p-3 space-y-3">
        {day.slots.map((slot, slotIndex) => (
          <TimeSlot
            key={slot.id}
            lang={lang}
            slot={slot}
            dayIndex={dayIndex}
            slotIndex={slotIndex}
            onUpdateActivity={(actIndex, updates) => 
              onUpdateActivity(dayIndex, slotIndex, actIndex, updates)
            }
            onRemoveActivity={(actIndex) => 
              onRemoveActivity(dayIndex, slotIndex, actIndex)
            }
            onDropActivity={(fromDay, fromSlot, fromIndex) => 
              onMoveActivity(fromDay, fromSlot, fromIndex, dayIndex, slotIndex)
            }
          />
        ))}
      </div>

      {/* Day notes */}
      <div className="px-3 pb-3">
        <DayNotes
          lang={lang}
          note={day.note}
          onChange={(note) => onUpdateNote(dayIndex, note)}
        />
      </div>
    </div>
  );
};

export default DayColumn;
