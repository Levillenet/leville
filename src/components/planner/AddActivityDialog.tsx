import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlanDay, PlannerActivity } from '@/types/planner';

interface AddActivityDialogProps {
  lang: 'fi' | 'en';
  isOpen: boolean;
  onClose: () => void;
  plan: PlanDay[];
  onAdd: (dayIndex: number, slotIndex: number, activity: PlannerActivity) => void;
  initialDayIndex?: number;
  initialSlotIndex?: number;
}

const translations = {
  fi: {
    title: 'Lisää aktiviteetti',
    activityName: 'Aktiviteetin nimi',
    activityNamePlaceholder: 'esim. Ravintolaillallinen',
    note: 'Muistiinpano (valinnainen)',
    notePlaceholder: 'esim. Hullu Poro klo 19',
    selectDay: 'Valitse päivä',
    selectSlot: 'Valitse ajankohta',
    day: 'Päivä',
    morning: 'Aamu',
    afternoon: 'Iltapäivä',
    evening: 'Ilta',
    add: 'Lisää',
    cancel: 'Peru',
  },
  en: {
    title: 'Add Activity',
    activityName: 'Activity name',
    activityNamePlaceholder: 'e.g., Restaurant dinner',
    note: 'Note (optional)',
    notePlaceholder: 'e.g., Hullu Poro at 7pm',
    selectDay: 'Select day',
    selectSlot: 'Select time',
    day: 'Day',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    add: 'Add',
    cancel: 'Cancel',
  }
};

const generateId = () => Math.random().toString(36).substring(2, 9);

const AddActivityDialog = ({ 
  lang, 
  isOpen, 
  onClose, 
  plan, 
  onAdd,
  initialDayIndex,
  initialSlotIndex 
}: AddActivityDialogProps) => {
  const t = translations[lang];
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Pre-select day and slot when provided
  useEffect(() => {
    if (isOpen) {
      if (initialDayIndex !== undefined) {
        setSelectedDay(initialDayIndex.toString());
      }
      if (initialSlotIndex !== undefined) {
        setSelectedSlot(initialSlotIndex.toString());
      }
    }
  }, [isOpen, initialDayIndex, initialSlotIndex]);

  const handleAdd = () => {
    if (!title || !selectedDay || !selectedSlot) return;

    const dayIndex = parseInt(selectedDay, 10);
    const slotIndex = parseInt(selectedSlot, 10);

    const activity: PlannerActivity = {
      id: generateId(),
      activityId: null,
      title,
      note: note || undefined,
      source: 'user',
    };

    onAdd(dayIndex, slotIndex, activity);
    
    // Reset form
    setTitle('');
    setNote('');
    setSelectedDay('');
    setSelectedSlot('');
  };

  const handleClose = () => {
    setTitle('');
    setNote('');
    setSelectedDay('');
    setSelectedSlot('');
    onClose();
  };

  const slotLabels: Record<string, string> = {
    morning: t.morning,
    afternoon: t.afternoon,
    evening: t.evening,
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Activity name */}
          <div className="space-y-2">
            <Label htmlFor="activity-name">{t.activityName}</Label>
            <Input
              id="activity-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.activityNamePlaceholder}
            />
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="activity-note">{t.note}</Label>
            <Textarea
              id="activity-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.notePlaceholder}
              className="min-h-[80px]"
            />
          </div>

          {/* Day selection */}
          <div className="space-y-2">
            <Label>{t.selectDay}</Label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue placeholder={t.selectDay} />
              </SelectTrigger>
              <SelectContent>
                {plan.map((day, index) => (
                  <SelectItem key={day.dayNumber} value={index.toString()}>
                    {t.day} {day.dayNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Slot selection */}
          {selectedDay && (
            <div className="space-y-2 animate-fade-in">
              <Label>{t.selectSlot}</Label>
              <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSlot} />
                </SelectTrigger>
                <SelectContent>
                  {plan[parseInt(selectedDay, 10)]?.slots.map((slot, index) => (
                    <SelectItem key={slot.id} value={index.toString()}>
                      {slotLabels[slot.type] || slot.label[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={handleClose}>
              {t.cancel}
            </Button>
            <Button 
              onClick={handleAdd}
              disabled={!title || !selectedDay || !selectedSlot}
            >
              {t.add}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddActivityDialog;
