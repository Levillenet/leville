// Ski pass allocation system
// Manages ski pass capacity and period-based allocations

export interface SkiPassPeriodAllocation {
  periodId: string;           // Unique ID for the period (roomId_checkIn_checkOut)
  roomId: string;
  checkIn: string;            // ISO date string
  checkOut: string;           // ISO date string
  allocated: boolean;         // Whether ski passes are allocated for this period
  allocatedAt?: string;       // When the allocation was made
}

export interface SkiPassSettings {
  totalCapacity: number;      // Total ski pass capacity (default 4, meaning 2 sets of 2 passes)
  passesPerAllocation: number; // Passes used per period allocation (default 2)
}

// LocalStorage keys
const SETTINGS_KEY = 'leville_skipass_settings';
const ALLOCATIONS_KEY = 'leville_skipass_allocations';

// Default settings
const defaultSettings: SkiPassSettings = {
  totalCapacity: 4,
  passesPerAllocation: 2
};

// Get ski pass settings
export const getSkiPassSettings = (): SkiPassSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

// Save ski pass settings
export const saveSkiPassSettings = (settings: Partial<SkiPassSettings>): void => {
  const current = getSkiPassSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
};

// Get all ski pass allocations
export const getSkiPassAllocations = (): SkiPassPeriodAllocation[] => {
  try {
    const stored = localStorage.getItem(ALLOCATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save all allocations
const saveAllocations = (allocations: SkiPassPeriodAllocation[]): void => {
  localStorage.setItem(ALLOCATIONS_KEY, JSON.stringify(allocations));
};

// Generate period ID
export const generatePeriodId = (roomId: string, checkIn: string, checkOut: string): string => {
  return `${roomId}_${checkIn}_${checkOut}`;
};

// Get all dates in a range (each night)
const getDatesInRange = (start: string, end: string): string[] => {
  const dates: string[] = [];
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  // Include each night (from check-in to day before check-out)
  const current = new Date(startDate);
  while (current < endDate) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
};

// Get used passes count for a specific date
const getUsedPassesForDate = (date: string, excludePeriodId?: string): number => {
  const allocations = getSkiPassAllocations();
  const settings = getSkiPassSettings();
  
  let usedPasses = 0;
  for (const allocation of allocations) {
    if (!allocation.allocated) continue;
    if (excludePeriodId && allocation.periodId === excludePeriodId) continue;
    
    // Check if this date falls within the allocation period
    const allocDates = getDatesInRange(allocation.checkIn, allocation.checkOut);
    if (allocDates.includes(date)) {
      usedPasses += settings.passesPerAllocation;
    }
  }
  
  return usedPasses;
};

// Get maximum used passes for any single day in a date range
export const getMaxUsedPassesForDateRange = (checkIn: string, checkOut: string, excludePeriodId?: string): number => {
  const dates = getDatesInRange(checkIn, checkOut);
  let maxUsed = 0;
  
  for (const date of dates) {
    const used = getUsedPassesForDate(date, excludePeriodId);
    if (used > maxUsed) {
      maxUsed = used;
    }
  }
  
  return maxUsed;
};

// Get minimum available passes for any single day in a date range
export const getAvailablePassesForDateRange = (checkIn: string, checkOut: string, excludePeriodId?: string): number => {
  const settings = getSkiPassSettings();
  const maxUsed = getMaxUsedPassesForDateRange(checkIn, checkOut, excludePeriodId);
  return settings.totalCapacity - maxUsed;
};

// Check if allocation is possible (enough capacity on every day in the range)
export const canAllocateSkiPass = (checkIn: string, checkOut: string, excludePeriodId?: string): boolean => {
  const settings = getSkiPassSettings();
  const available = getAvailablePassesForDateRange(checkIn, checkOut, excludePeriodId);
  return available >= settings.passesPerAllocation;
};

// Toggle ski pass allocation for a period
export const toggleSkiPassAllocation = (
  roomId: string,
  checkIn: string,
  checkOut: string
): { success: boolean; error?: string } => {
  const periodId = generatePeriodId(roomId, checkIn, checkOut);
  const allocations = getSkiPassAllocations();
  const existingIndex = allocations.findIndex(a => a.periodId === periodId);
  
  if (existingIndex >= 0) {
    // Toggle off - remove allocation
    if (allocations[existingIndex].allocated) {
      allocations[existingIndex].allocated = false;
      saveAllocations(allocations);
      return { success: true };
    }
  }
  
  // Check if we can allocate
  if (!canAllocateSkiPass(checkIn, checkOut, periodId)) {
    return { 
      success: false, 
      error: 'Ei riittävästi vapaita hissilippuja tälle ajanjaksolle' 
    };
  }
  
  // Allocate
  if (existingIndex >= 0) {
    allocations[existingIndex].allocated = true;
    allocations[existingIndex].allocatedAt = new Date().toISOString();
  } else {
    allocations.push({
      periodId,
      roomId,
      checkIn,
      checkOut,
      allocated: true,
      allocatedAt: new Date().toISOString()
    });
  }
  
  saveAllocations(allocations);
  return { success: true };
};

// Get allocation status for a period
export const getPeriodAllocationStatus = (roomId: string, checkIn: string, checkOut: string): boolean => {
  const periodId = generatePeriodId(roomId, checkIn, checkOut);
  const allocations = getSkiPassAllocations();
  const allocation = allocations.find(a => a.periodId === periodId);
  return allocation?.allocated || false;
};

// Clear expired allocations (periods that have already ended)
export const cleanupExpiredAllocations = (): void => {
  const allocations = getSkiPassAllocations();
  const now = new Date();
  const activeAllocations = allocations.filter(a => new Date(a.checkOut) >= now);
  saveAllocations(activeAllocations);
};

// Get all active allocations (for display)
export const getActiveAllocations = (): SkiPassPeriodAllocation[] => {
  const allocations = getSkiPassAllocations();
  const now = new Date();
  return allocations.filter(a => a.allocated && new Date(a.checkOut) >= now);
};

// Reset all allocations
export const resetAllAllocations = (): void => {
  localStorage.removeItem(ALLOCATIONS_KEY);
};
