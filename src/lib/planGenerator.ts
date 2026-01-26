// Plan Generator Logic for Levi Holiday Planner
// Generates a realistic holiday program based on user preferences

import { WizardData, PlanDay, TimeSlot, PlannerActivity, DEFAULT_TIME_SLOTS } from '@/types/planner';
import { leviActivities, LeviActivity, getActivityById } from '@/data/leviActivities';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Get minimum child age from ages array
const getMinChildAge = (childAges: number[]): number => {
  if (childAges.length === 0) return Infinity;
  return Math.min(...childAges);
};

// Check if activity is suitable for the group
const isActivitySuitable = (
  activity: LeviActivity,
  minChildAge: number,
  hasCar: boolean
): boolean => {
  if (activity.minAge > minChildAge) return false;
  if (activity.requiresCar && !hasCar) return false;
  return true;
};

// Get available activities for a time slot
const getAvailableActivities = (
  timeOfDay: 'morning' | 'afternoon' | 'evening',
  minChildAge: number,
  hasCar: boolean,
  usedActivityIds: Set<string>,
  excludeIds: string[] = []
): LeviActivity[] => {
  return leviActivities.filter(activity => {
    if (!isActivitySuitable(activity, minChildAge, hasCar)) return false;
    if (!activity.timeOfDay.includes(timeOfDay)) return false;
    // Don't suggest the same activity twice (except free-time and sauna-evening which can repeat)
    const repeatableActivities = ['free-time', 'sauna-evening'];
    if (!repeatableActivities.includes(activity.id) && usedActivityIds.has(activity.id)) return false;
    // Also exclude explicitly excluded IDs
    if (excludeIds.includes(activity.id)) return false;
    return true;
  });
};

// Select activity based on style and constraints
const selectActivity = (
  available: LeviActivity[],
  style: 'active' | 'balanced' | 'relaxed',
  preferRelaxation: boolean,
  alreadyHasHighDemand: boolean
): LeviActivity | null => {
  if (available.length === 0) return null;

  let filtered = available;

  // If already has high demand activity today, avoid another one
  if (alreadyHasHighDemand) {
    filtered = filtered.filter(a => a.physicalDemand !== 'high');
  }

  // Style-based filtering
  if (style === 'relaxed' || preferRelaxation) {
    // Prefer low demand activities
    const lowDemand = filtered.filter(a => a.physicalDemand === 'low');
    if (lowDemand.length > 0) filtered = lowDemand;
  } else if (style === 'active') {
    // Allow all, but shuffle to get variety
    // Nothing special needed
  }

  // Random selection from filtered
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

// Create a planner activity from a Levi activity
const createPlannerActivity = (
  activity: LeviActivity,
  lang: 'fi' | 'en'
): PlannerActivity => ({
  id: generateId(),
  activityId: activity.id,
  title: activity.name[lang],
  source: 'suggested',
  requiresCar: activity.requiresCar
});

// Create empty time slots for a day
const createTimeSlots = (lang: 'fi' | 'en'): TimeSlot[] => {
  return DEFAULT_TIME_SLOTS.map(slot => ({
    id: generateId(),
    type: slot.type,
    label: slot.label,
    activities: []
  }));
};

// Main plan generation function
export const generatePlan = (
  wizardData: WizardData,
  lang: 'fi' | 'en' = 'fi'
): PlanDay[] => {
  const { adults, children, childAges, days, style, mustHave, hasCar } = wizardData;
  
  const minChildAge = getMinChildAge(childAges);
  const hasSmallChildren = minChildAge < 4;
  const hasYoungChildren = minChildAge < 7;
  
  const usedActivityIds = new Set<string>();
  const plan: PlanDay[] = [];

  // Track demanding days for family logic
  let previousDayWasDemanding = false;

  // Distribute must-have activities across days
  const mustHaveQueue = [...mustHave];

  for (let dayNum = 1; dayNum <= days; dayNum++) {
    const slots = createTimeSlots(lang);
    let dayHasHighDemand = false;
    
    // Determine if this should be an easy day
    const isEasyDay = 
      (hasYoungChildren && previousDayWasDemanding) || 
      (children > 0 && dayNum === Math.ceil(days / 2)); // Mid-trip easy day for families

    // Force relaxation based on style
    const forceRelaxation = 
      style === 'relaxed' || 
      isEasyDay ||
      (style === 'balanced' && dayNum % 2 === 0);

    // Process each time slot
    slots.forEach((slot, slotIndex) => {
      const timeOfDay = slot.type as 'morning' | 'afternoon' | 'evening';
      
      // Get available activities for this slot
      let available = getAvailableActivities(
        timeOfDay,
        minChildAge,
        hasCar,
        usedActivityIds
      );

      // Skip evening activities for small children unless relaxation
      if (hasSmallChildren && timeOfDay === 'evening') {
        available = available.filter(a => 
          a.category === 'relaxation' || a.category === 'dining'
        );
      }

      // Determine how many activities to add based on style
      let targetActivities = 0;
      if (style === 'active') {
        targetActivities = timeOfDay === 'evening' ? 1 : 1;
      } else if (style === 'balanced') {
        targetActivities = slotIndex === 0 ? 1 : (forceRelaxation ? 0 : 1);
      } else {
        targetActivities = slotIndex === 0 && !forceRelaxation ? 1 : 0;
      }

      // Try to add must-have activity first
      if (mustHaveQueue.length > 0 && targetActivities > 0) {
        const mustHaveId = mustHaveQueue[0];
        const mustHaveActivity = getActivityById(mustHaveId);
        
        if (mustHaveActivity && 
            isActivitySuitable(mustHaveActivity, minChildAge, hasCar) &&
            mustHaveActivity.timeOfDay.includes(timeOfDay) &&
            !(dayHasHighDemand && mustHaveActivity.physicalDemand === 'high')) {
          
          slot.activities.push(createPlannerActivity(mustHaveActivity, lang));
          usedActivityIds.add(mustHaveId);
          mustHaveQueue.shift();
          
          if (mustHaveActivity.physicalDemand === 'high') {
            dayHasHighDemand = true;
          }
          targetActivities--;
        }
      }

      // Add regular activities
      while (targetActivities > 0 && available.length > 0) {
        const activity = selectActivity(
          available,
          style,
          forceRelaxation,
          dayHasHighDemand
        );

        if (!activity) break;

        slot.activities.push(createPlannerActivity(activity, lang));
        usedActivityIds.add(activity.id);
        
        if (activity.physicalDemand === 'high') {
          dayHasHighDemand = true;
        }

        // Remove selected activity from available
        available = available.filter(a => a.id !== activity.id);
        targetActivities--;
      }

      // If no activities in afternoon slot for relaxed/balanced, add something
      if (style !== 'active' && slot.activities.length === 0 && slotIndex === 1) {
        // Try to find any suitable relaxation activity that hasn't been used
        const relaxAvailable = available.filter(a => a.category === 'relaxation' || a.physicalDemand === 'low');
        if (relaxAvailable.length > 0) {
          const randomRelax = relaxAvailable[Math.floor(Math.random() * relaxAvailable.length)];
          slot.activities.push(createPlannerActivity(randomRelax, lang));
          usedActivityIds.add(randomRelax.id);
        } else {
          // Only use free-time as last resort
          const freeTime = getActivityById('free-time');
          if (freeTime) {
            slot.activities.push(createPlannerActivity(freeTime, lang));
          }
        }
      }
    });

    // Track demanding days
    previousDayWasDemanding = dayHasHighDemand;

    plan.push({
      dayNumber: dayNum,
      slots,
      note: ''
    });
  }

  // Add remaining must-have activities if possible
  while (mustHaveQueue.length > 0) {
    const mustHaveId = mustHaveQueue.shift()!;
    const activity = getActivityById(mustHaveId);
    if (!activity) continue;

    // Find a suitable slot
    for (const day of plan) {
      for (const slot of day.slots) {
        const timeOfDay = slot.type as 'morning' | 'afternoon' | 'evening';
        if (activity.timeOfDay.includes(timeOfDay) && slot.activities.length < 2) {
          slot.activities.push(createPlannerActivity(activity, lang));
          break;
        }
      }
    }
  }

  return plan;
};

// Regenerate plan while preserving user additions
export const regeneratePlan = (
  wizardData: WizardData,
  currentPlan: PlanDay[],
  lang: 'fi' | 'en' = 'fi'
): PlanDay[] => {
  const newPlan = generatePlan(wizardData, lang);

  // Preserve user-added activities and notes
  currentPlan.forEach((day, dayIndex) => {
    if (dayIndex < newPlan.length) {
      // Preserve day notes
      newPlan[dayIndex].note = day.note;

      // Preserve user-added activities
      day.slots.forEach((slot, slotIndex) => {
        if (slotIndex < newPlan[dayIndex].slots.length) {
          const userActivities = slot.activities.filter(a => a.source === 'user');
          newPlan[dayIndex].slots[slotIndex].activities.push(...userActivities);
        }
      });
    }
  });

  return newPlan;
};
