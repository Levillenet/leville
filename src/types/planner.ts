// TypeScript types for Levi Holiday Planner

export type HolidayStyle = 'active' | 'balanced' | 'relaxed';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
export type ActivitySource = 'suggested' | 'user';

export interface WizardData {
  adults: number;
  children: number;
  childAges: number[];
  days: number;
  style: HolidayStyle;
  mustHave: string[];
  hasCar: boolean;
}

export interface PlannerActivity {
  id: string;
  activityId: string | null; // null = custom activity
  title: string;
  note?: string;
  source: ActivitySource;
  requiresCar?: boolean;
}

export interface TimeSlot {
  id: string;
  type: TimeOfDay | 'custom';
  label: { fi: string; en: string };
  activities: PlannerActivity[];
}

export interface PlanDay {
  dayNumber: number;
  slots: TimeSlot[];
  note: string;
}

export interface PlannerState {
  step: 'wizard' | 'planner';
  wizardData: WizardData | null;
  days: PlanDay[];
}

// Wizard step tracking
export type WizardStep = 1 | 2 | 3 | 4 | 5;

export const WIZARD_STEPS = {
  GROUP: 1 as WizardStep,
  DURATION: 2 as WizardStep,
  STYLE: 3 as WizardStep,
  ACTIVITIES: 4 as WizardStep,
  TRANSPORT: 5 as WizardStep,
};

// Default time slots for each day
export const DEFAULT_TIME_SLOTS: Omit<TimeSlot, 'id' | 'activities'>[] = [
  { type: 'morning', label: { fi: 'Aamu', en: 'Morning' } },
  { type: 'afternoon', label: { fi: 'Iltapäivä', en: 'Afternoon' } },
  { type: 'evening', label: { fi: 'Ilta', en: 'Evening' } },
];
