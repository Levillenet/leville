import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Printer, RotateCcw, Plus } from 'lucide-react';
import { PlanDay, WizardData, PlannerActivity } from '@/types/planner';
import { regeneratePlan } from '@/lib/planGenerator';
import DayColumn from './DayColumn';
import AddActivityDialog from './AddActivityDialog';
import PrintView from './PrintView';

interface PlannerViewProps {
  lang: 'fi' | 'en';
  wizardData: WizardData;
  initialPlan: PlanDay[];
  onReset: () => void;
}

const translations = {
  fi: {
    title: 'Levi-lomasuunnitelmasi',
    print: 'Tulosta',
    reset: 'Aloita alusta',
    regenerate: 'Luo uudelleen',
    addActivity: 'Lisää aktiviteetti',
    dragTip: 'Vedä ja pudota aktiviteetteja järjestääksesi ohjelmasi uudelleen.',
    carNote: '🚗 Vaatii kuljetuksen',
  },
  en: {
    title: 'Your Levi Holiday Plan',
    print: 'Print',
    reset: 'Start Over',
    regenerate: 'Regenerate',
    addActivity: 'Add Activity',
    dragTip: 'Drag and drop activities to rearrange your program.',
    carNote: '🚗 Requires transport',
  }
};

const PlannerView = ({ lang, wizardData, initialPlan, onReset }: PlannerViewProps) => {
  const t = translations[lang];
  const [plan, setPlan] = useState<PlanDay[]>(initialPlan);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // Update an activity in the plan
  const updateActivity = (
    dayIndex: number,
    slotIndex: number,
    activityIndex: number,
    updates: Partial<PlannerActivity>
  ) => {
    setPlan(prevPlan => {
      const newPlan = [...prevPlan];
      const newDay = { ...newPlan[dayIndex] };
      const newSlots = [...newDay.slots];
      const newSlot = { ...newSlots[slotIndex] };
      const newActivities = [...newSlot.activities];
      newActivities[activityIndex] = { ...newActivities[activityIndex], ...updates };
      newSlot.activities = newActivities;
      newSlots[slotIndex] = newSlot;
      newDay.slots = newSlots;
      newPlan[dayIndex] = newDay;
      return newPlan;
    });
  };

  // Remove an activity from the plan
  const removeActivity = (dayIndex: number, slotIndex: number, activityIndex: number) => {
    setPlan(prevPlan => {
      const newPlan = [...prevPlan];
      const newDay = { ...newPlan[dayIndex] };
      const newSlots = [...newDay.slots];
      const newSlot = { ...newSlots[slotIndex] };
      newSlot.activities = newSlot.activities.filter((_, i) => i !== activityIndex);
      newSlots[slotIndex] = newSlot;
      newDay.slots = newSlots;
      newPlan[dayIndex] = newDay;
      return newPlan;
    });
  };

  // Move activity between slots
  const moveActivity = (
    fromDay: number,
    fromSlot: number,
    fromIndex: number,
    toDay: number,
    toSlot: number
  ) => {
    setPlan(prevPlan => {
      const newPlan = [...prevPlan];
      
      // Get the activity to move
      const activity = newPlan[fromDay].slots[fromSlot].activities[fromIndex];
      
      // Remove from source
      const sourceSlot = { ...newPlan[fromDay].slots[fromSlot] };
      sourceSlot.activities = sourceSlot.activities.filter((_, i) => i !== fromIndex);
      newPlan[fromDay] = {
        ...newPlan[fromDay],
        slots: newPlan[fromDay].slots.map((s, i) => i === fromSlot ? sourceSlot : s)
      };
      
      // Add to destination
      const destSlot = { ...newPlan[toDay].slots[toSlot] };
      destSlot.activities = [...destSlot.activities, activity];
      newPlan[toDay] = {
        ...newPlan[toDay],
        slots: newPlan[toDay].slots.map((s, i) => i === toSlot ? destSlot : s)
      };
      
      return newPlan;
    });
  };

  // Update day note
  const updateDayNote = (dayIndex: number, note: string) => {
    setPlan(prevPlan => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex] = { ...newPlan[dayIndex], note };
      return newPlan;
    });
  };

  // Add new activity
  const addActivity = (dayIndex: number, slotIndex: number, activity: PlannerActivity) => {
    setPlan(prevPlan => {
      const newPlan = [...prevPlan];
      const newDay = { ...newPlan[dayIndex] };
      const newSlots = [...newDay.slots];
      const newSlot = { ...newSlots[slotIndex] };
      newSlot.activities = [...newSlot.activities, activity];
      newSlots[slotIndex] = newSlot;
      newDay.slots = newSlots;
      newPlan[dayIndex] = newDay;
      return newPlan;
    });
    setIsAddDialogOpen(false);
  };

  // Regenerate plan
  const handleRegenerate = () => {
    const newPlan = regeneratePlan(wizardData, plan, lang);
    setPlan(newPlan);
  };

  // Print
  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 100);
  };

  if (isPrintMode) {
    return <PrintView lang={lang} plan={plan} wizardData={wizardData} />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.title}
        </h1>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            {t.print}
          </Button>
          <Button variant="outline" size="sm" onClick={handleRegenerate}>
            <RotateCcw className="h-4 w-4 mr-2" />
            {t.regenerate}
          </Button>
          <Button variant="ghost" size="sm" onClick={onReset}>
            {t.reset}
          </Button>
        </div>
      </div>

      {/* Drag tip */}
      <p className="text-sm text-muted-foreground mb-6">
        💡 {t.dragTip}
      </p>

      {/* Day columns */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {plan.map((day, dayIndex) => (
          <motion.div
            key={day.dayNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.1 }}
            className="min-w-[280px] md:min-w-[300px] flex-shrink-0"
          >
            <DayColumn
              lang={lang}
              day={day}
              dayIndex={dayIndex}
              onUpdateActivity={updateActivity}
              onRemoveActivity={removeActivity}
              onMoveActivity={moveActivity}
              onUpdateNote={updateDayNote}
            />
          </motion.div>
        ))}
      </div>

      {/* Add activity button */}
      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t.addActivity}
        </Button>
      </div>

      {/* Add activity dialog */}
      <AddActivityDialog
        lang={lang}
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        plan={plan}
        onAdd={addActivity}
      />
    </div>
  );
};

export default PlannerView;
