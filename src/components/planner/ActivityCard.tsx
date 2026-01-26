import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlannerActivity } from '@/types/planner';
import { getActivityById } from '@/data/leviActivities';
import { cn } from '@/lib/utils';
import { X, GripVertical, Edit2, Car, Mountain, Dog, Heart, Sparkles, Zap, Droplets, Flame, ArrowDown, Baby, Fish, Footprints, Coffee, MapPin, Utensils, TreePine, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ActivityCardProps {
  lang: 'fi' | 'en';
  activity: PlannerActivity;
  dayIndex: number;
  slotIndex: number;
  activityIndex: number;
  onUpdate: (updates: Partial<PlannerActivity>) => void;
  onRemove: () => void;
}

const translations = {
  fi: {
    suggested: 'Ehdotettu',
    userAdded: 'Lisätty',
    edit: 'Muokkaa',
    save: 'Tallenna',
    cancel: 'Peru',
    notePlaceholder: 'Lisää muistiinpano...',
    requiresCar: 'Vaatii kuljetuksen',
  },
  en: {
    suggested: 'Suggested',
    userAdded: 'Added',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    notePlaceholder: 'Add a note...',
    requiresCar: 'Requires transport',
  }
};

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Mountain,
  Dog,
  Heart,
  Sparkles,
  Zap,
  Droplets,
  Flame,
  ArrowDown,
  Baby,
  Car,
  Fish,
  Footprints,
  Coffee,
  MapPin,
  Utensils,
  TreePine,
  Circle,
};

// Get icon component by name
const getIconComponent = (iconName: string): React.ElementType => {
  return iconMap[iconName] || Circle;
};

const ActivityCard = ({
  lang,
  activity,
  dayIndex,
  slotIndex,
  activityIndex,
  onUpdate,
  onRemove,
}: ActivityCardProps) => {
  const t = translations[lang];
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(activity.title);
  const [editNote, setEditNote] = useState(activity.note || '');
  const [isDragging, setIsDragging] = useState(false);

  const leviActivity = activity.activityId ? getActivityById(activity.activityId) : null;
  const IconComponent = leviActivity ? getIconComponent(leviActivity.icon) : Circle;
  const isSuggested = activity.source === 'suggested';
  const requiresCar = activity.requiresCar || (leviActivity?.requiresCar ?? false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify({
      fromDay: dayIndex,
      fromSlot: slotIndex,
      fromIndex: activityIndex,
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    onUpdate({ title: editTitle, note: editNote || undefined });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(activity.title);
    setEditNote(activity.note || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 space-y-2">
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="text-sm"
          autoFocus
        />
        <Textarea
          value={editNote}
          onChange={(e) => setEditNote(e.target.value)}
          placeholder={t.notePlaceholder}
          className="text-sm min-h-[60px]"
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            {t.cancel}
          </Button>
          <Button size="sm" onClick={handleSave}>
            {t.save}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "group relative bg-background rounded-lg p-3 cursor-grab active:cursor-grabbing",
        "border-2 transition-all",
        isSuggested 
          ? "border-primary/30 hover:border-primary/50" 
          : "border-accent hover:border-accent/80",
        isDragging && "opacity-50"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Native drag wrapper */}
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="absolute inset-0"
      />

      {/* Drag handle */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <X className="h-3 w-3" />
      </button>

      {/* Edit button */}
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-1 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <Edit2 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
      </button>

      {/* Content */}
      <div className="flex items-start gap-2 pl-4 relative z-0 pointer-events-none">
        <div className={cn(
          "p-1.5 rounded",
          isSuggested ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"
        )}>
          <IconComponent className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-foreground truncate">
            {activity.title}
          </div>
          {activity.note && (
            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {activity.note}
            </div>
          )}
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded",
              isSuggested 
                ? "bg-primary/10 text-primary" 
                : "bg-accent text-accent-foreground"
            )}>
              {isSuggested ? `⭐ ${t.suggested}` : `🧑 ${t.userAdded}`}
            </span>
            {requiresCar && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <Car className="h-3 w-3" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
