// Ski pass allocation system
// Manages ski pass capacity and period-based allocations with special offers
// Settings are now stored in Supabase database via admin-settings edge function

export interface SkiPassPeriodAllocation {
  periodId: string;           // Unique ID for the period (roomId_checkIn_checkOut)
  roomId: string;
  checkIn: string;            // ISO date string
  checkOut: string;           // ISO date string
  allocated: boolean;         // Whether ski passes are allocated for this period
  allocatedAt?: string;       // When the allocation was made
  specialOffer: boolean;      // Show "Erikoistarjous" badge for this period
  customDiscount: number | null; // Custom discount percentage (not shown to customer, but affects price)
  showDiscountBadge: boolean; // Show strikethrough price to customer
}

export interface SkiPassSettings {
  totalCapacity: number;      // Total ski pass capacity (default 4, meaning 2 sets of 2 passes)
  passesPerAllocation: number; // Passes used per period allocation (default 2)
}

// Database period settings interface (from Supabase)
export interface DbPeriodSettings {
  property_id: string;
  check_in: string;
  check_out: string;
  has_ski_pass: boolean;
  has_special_offer: boolean;
  custom_discount: number;
  show_discount: boolean;
}

// Default settings
const defaultSettings: SkiPassSettings = {
  totalCapacity: 4,
  passesPerAllocation: 2
};

// Get ski pass settings (default values - capacity is managed in DB for consistency)
export const getSkiPassSettings = (): SkiPassSettings => {
  return defaultSettings;
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

// Get used passes count for a specific date (from database period settings)
export const getUsedPassesForDate = (
  date: string, 
  periodSettings: DbPeriodSettings[],
  excludePeriodId?: string
): number => {
  const settings = getSkiPassSettings();
  let usedPasses = 0;
  
  for (const period of periodSettings) {
    if (!period.has_ski_pass) continue;
    
    const periodId = generatePeriodId(period.property_id, period.check_in, period.check_out);
    if (excludePeriodId && periodId === excludePeriodId) continue;
    
    // Check if this date falls within the period
    const periodDates = getDatesInRange(period.check_in, period.check_out);
    if (periodDates.includes(date)) {
      usedPasses += settings.passesPerAllocation;
    }
  }
  
  return usedPasses;
};

// Get maximum used passes for any single day in a date range
export const getMaxUsedPassesForDateRange = (
  checkIn: string, 
  checkOut: string, 
  periodSettings: DbPeriodSettings[],
  excludePeriodId?: string
): number => {
  const dates = getDatesInRange(checkIn, checkOut);
  let maxUsed = 0;
  
  for (const date of dates) {
    const used = getUsedPassesForDate(date, periodSettings, excludePeriodId);
    if (used > maxUsed) {
      maxUsed = used;
    }
  }
  
  return maxUsed;
};

// Get minimum available passes for any single day in a date range
export const getAvailablePassesForDateRange = (
  checkIn: string, 
  checkOut: string, 
  periodSettings: DbPeriodSettings[],
  excludePeriodId?: string
): number => {
  const settings = getSkiPassSettings();
  const maxUsed = getMaxUsedPassesForDateRange(checkIn, checkOut, periodSettings, excludePeriodId);
  return settings.totalCapacity - maxUsed;
};

// Get blocking days info - returns list of days where adding passes would exceed capacity
export const getBlockingDays = (
  checkIn: string, 
  checkOut: string, 
  periodSettings: DbPeriodSettings[],
  excludePeriodId?: string
): { date: string; used: number; capacity: number }[] => {
  const settings = getSkiPassSettings();
  const dates = getDatesInRange(checkIn, checkOut);
  const blockingDays: { date: string; used: number; capacity: number }[] = [];
  
  for (const date of dates) {
    const used = getUsedPassesForDate(date, periodSettings, excludePeriodId);
    // Would exceed capacity if we add passesPerAllocation
    if (used + settings.passesPerAllocation > settings.totalCapacity) {
      blockingDays.push({ date, used, capacity: settings.totalCapacity });
    }
  }
  
  return blockingDays;
};

// Check if allocation is possible (enough capacity on every day in the range)
export const canAllocateSkiPass = (
  checkIn: string, 
  checkOut: string, 
  periodSettings: DbPeriodSettings[],
  excludePeriodId?: string
): boolean => {
  const blockingDays = getBlockingDays(checkIn, checkOut, periodSettings, excludePeriodId);
  return blockingDays.length === 0;
};

// Get period settings from database
export const getPeriodSettingsFromDb = (
  roomId: string, 
  checkIn: string, 
  checkOut: string,
  periodSettings: DbPeriodSettings[]
): { specialOffer: boolean; customDiscount: number | null; showDiscountBadge: boolean; hasSkiPass: boolean } => {
  const period = periodSettings.find(
    p => p.property_id === roomId && p.check_in === checkIn && p.check_out === checkOut
  );
  
  return {
    specialOffer: period?.has_special_offer || false,
    customDiscount: period?.custom_discount || null,
    showDiscountBadge: period?.show_discount || false,
    hasSkiPass: period?.has_ski_pass || false
  };
};

// Get all active ski pass allocations from database
export const getActiveAllocationsFromDb = (periodSettings: DbPeriodSettings[]): DbPeriodSettings[] => {
  const now = new Date();
  return periodSettings.filter(p => p.has_ski_pass && new Date(p.check_out) >= now);
};

// Legacy exports for backwards compatibility (empty implementations - data now comes from DB)
export const getSkiPassAllocations = (): SkiPassPeriodAllocation[] => [];
export const saveSkiPassSettings = (_settings: Partial<SkiPassSettings>): void => {};
export const toggleSkiPassAllocation = (_roomId: string, _checkIn: string, _checkOut: string): { success: boolean; error?: string } => {
  return { success: false, error: 'Use database operations instead' };
};
export const updatePeriodSettings = (_roomId: string, _checkIn: string, _checkOut: string, _settings: Record<string, unknown>): void => {};
export const getPeriodSettings = (_roomId: string, _checkIn: string, _checkOut: string): { specialOffer: boolean; customDiscount: number | null; showDiscountBadge: boolean } => {
  return { specialOffer: false, customDiscount: null, showDiscountBadge: false };
};
export const getPeriodAllocationStatus = (_roomId: string, _checkIn: string, _checkOut: string): boolean => false;
export const cleanupExpiredAllocations = (): void => {};
export const getActiveAllocations = (): SkiPassPeriodAllocation[] => [];
export const resetAllAllocations = (): void => {};
