// Shared last-minute (äkkilähtö) price calculation.
// Used by both the public /akkilahdot page and the admin price check tool so
// the two can never drift apart.

export interface SuperDiscountSettings {
  d3: number;
  d5: number;
  d7: number;
}

export interface DealPricingSettings {
  /** Base discount % applied to every last-minute stay */
  baseDiscount: number;
  /** Hidden extra discount % by days until check-in */
  superDiscount: SuperDiscountSettings;
  /** Whether 1-night stays get discounts at all */
  discountOneNight: boolean;
}

export interface DealPriceInput {
  /** Moder length-of-stay price for the exact stay, EUR (no cleaning fee) */
  moderPrice: number;
  /** Cleaning fee added on top, EUR (0 when Moder already includes it) */
  cleaningFee: number;
  nights: number;
  checkIn: string; // YYYY-MM-DD
  todayIso: string; // YYYY-MM-DD
  settings: DealPricingSettings;
  /** Additional period-specific discount % from admin period settings */
  periodDiscountPct?: number | null;
}

export interface DealPriceBreakdown {
  moderPrice: number;
  cleaningFee: number;
  nights: number;
  daysUntilCheckIn: number;
  discountsApplied: boolean;
  baseDiscountPct: number;
  baseDiscountAmount: number;
  superDiscountPct: number;
  superDiscountAmount: number;
  periodDiscountPct: number;
  periodDiscountAmount: number;
  /** Price after discounts, before cleaning fee */
  discountedPrice: number;
  /** Final price shown to the guest (rounded) */
  total: number;
  /** Reference price without discounts (rounded) */
  originalTotal: number;
  totalDiscountPct: number;
  perNight: number;
}

export const daysUntil = (checkIn: string, todayIso: string): number =>
  Math.round(
    (new Date(`${checkIn}T00:00:00`).getTime() - new Date(`${todayIso}T00:00:00`).getTime()) / 86400000
  );

export const getSuperDiscountPct = (
  checkIn: string,
  todayIso: string,
  superDiscount: SuperDiscountSettings
): number => {
  const days = daysUntil(checkIn, todayIso);
  if (days < 0) return 0;
  if (days < 3) return superDiscount.d3 || 0;
  if (days < 5) return superDiscount.d5 || 0;
  if (days < 7) return superDiscount.d7 || 0;
  return 0;
};

export const computeDealPrice = ({
  moderPrice,
  cleaningFee,
  nights,
  checkIn,
  todayIso,
  settings,
  periodDiscountPct,
}: DealPriceInput): DealPriceBreakdown => {
  const days = daysUntil(checkIn, todayIso);
  const discountsApplied = nights > 1 || settings.discountOneNight;

  const basePct = discountsApplied ? settings.baseDiscount || 0 : 0;
  const superPct = discountsApplied ? getSuperDiscountPct(checkIn, todayIso, settings.superDiscount) : 0;
  const periodPct = discountsApplied ? (periodDiscountPct && periodDiscountPct > 0 ? periodDiscountPct : 0) : 0;

  const afterBase = moderPrice * (1 - basePct / 100);
  const baseDiscountAmount = moderPrice - afterBase;

  const afterSuper = afterBase * (1 - superPct / 100);
  const superDiscountAmount = afterBase - afterSuper;

  const afterPeriod = afterSuper * (1 - periodPct / 100);
  const periodDiscountAmount = afterSuper - afterPeriod;

  const total = Math.round(afterPeriod + cleaningFee);
  const originalTotal = Math.round(moderPrice + cleaningFee);

  return {
    moderPrice,
    cleaningFee,
    nights,
    daysUntilCheckIn: days,
    discountsApplied,
    baseDiscountPct: basePct,
    baseDiscountAmount,
    superDiscountPct: superPct,
    superDiscountAmount,
    periodDiscountPct: periodPct,
    periodDiscountAmount,
    discountedPrice: afterPeriod,
    total,
    originalTotal,
    totalDiscountPct: originalTotal > 0 ? Math.round((1 - total / originalTotal) * 100) : 0,
    perNight: nights > 0 ? Math.round(total / nights) : total,
  };
};
