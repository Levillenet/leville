import { useState } from 'react';
import { TimeSlot as TimeSlotType, PlannerActivity } from '@/types/planner';
import ActivityCard from './ActivityCard';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface TimeSlotProps {
  lang: 'fi' | 'en';
  slot: TimeSlotType;
  dayIndex: number;
  slotIndex: number;
  onUpdateActivity: (activityIndex: number, updates: Partial<PlannerActivity>) => void;
  onRemoveActivity: (activityIndex: number) => void;
  onDropActivity: (fromDay: number, fromSlot: number, fromIndex: number) => void;
  onAddActivity?: () => void;
}

const translations = {
  fi: {
    addActivity: 'Lisää aktiviteetti',
    free: 'Vapaa',
  },
  en: {
    addActivity: 'Add activity',
    free: 'Free',
  }
};

const TimeSlot = ({
  lang,
  slot,
  dayIndex,
  slotIndex,
  onUpdateActivity,
  onRemoveActivity,
  onDropActivity,
  onAddActivity,
}: TimeSlotProps) => {
  const t = translations[lang];
  const [isDropTarget, setIsDropTarget] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropTarget(true);
  };

  const handleDragLeave = () => {
    setIsDropTarget(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropTarget(false);
    
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      try {
        const { fromDay, fromSlot, fromIndex } = JSON.parse(data);
        // Don't drop on same slot
        if (fromDay === dayIndex && fromSlot === slotIndex) return;
        onDropActivity(fromDay, fromSlot, fromIndex);
      } catch {
        console.error('Invalid drag data');
      }
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-border p-2 min-h-[80px] transition-colors",
        isDropTarget && "border-primary bg-primary/5"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Slot label */}
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
        {slot.label[lang]}
      </div>

      {/* Activities */}
      <div className="space-y-2">
        {slot.activities.length > 0 ? (
          slot.activities.map((activity, actIndex) => (
            <ActivityCard
              key={activity.id}
              lang={lang}
              activity={activity}
              dayIndex={dayIndex}
              slotIndex={slotIndex}
              activityIndex={actIndex}
              onUpdate={(updates) => onUpdateActivity(actIndex, updates)}
              onRemove={() => onRemoveActivity(actIndex)}
            />
          ))
        ) : (
          <button
            onClick={onAddActivity}
            className="w-full text-xs text-muted-foreground/70 hover:text-primary hover:bg-primary/5 rounded-md py-3 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="h-3 w-3" />
            {t.addActivity}
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;
