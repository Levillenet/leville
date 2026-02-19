// Property details with all parameters from Excel
// This serves as the master data source for all property information
// Database overrides are fetched via useAdminSettings hook

export type PropertyCategory = 'glacier' | 'skistar' | 'chalet' | 'platinum' | 'cabin' | 'other';

export interface PropertyDetail {
  id: string;                    // Beds24 roomId
  name: string;                  // Marketing name (editable in admin)
  cleaningFee: number;           // Cleaning fee in EUR
  bookingUrl: string;            // Moder booking link
  linenFee: number;              // Linen fee per person in EUR
  maxGuests: number;             // Maximum guests
  whatsappNumber: string;        // WhatsApp number for bookings
  oneNightDiscount: number | null;   // 1 night discount %
  twoNightDiscount: number | null;   // 2 night discount %
  longStayDiscount: number | null;   // Long stay discount % (3+ nights)
  showDiscount: boolean;         // Show discount badge on card
  category: PropertyCategory;    // Property category for image selection
  specialOffer: boolean;         // Show special offer badge
  skiPassOffer: boolean;         // Show ski pass offer
  skiPassStartDate: string | null;   // Ski pass offer start date (check-in must be after)
  skiPassEndDate: string | null;     // Ski pass offer end date (check-in must be before)
}

// Default property data from Excel - this is the base data
// Admin overrides are stored in database (property_settings table)
const defaultPropertyDetails: PropertyDetail[] = [
  // Levi Centre Chalet (Hiihtäjänkuja)
  { id: "350161", name: "Hiihtäjänkuja 5B5 (4MH House)", cleaningFee: 110, bookingUrl: "https://app.moder.fi/levillenet/306?step=1", linenFee: 19, maxGuests: 8, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'chalet', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "350162", name: "Hiihtäjänkuja 5A2 (2MH Apartment)", cleaningFee: 78, bookingUrl: "https://app.moder.fi/levillenet/304?step=1", linenFee: 19, maxGuests: 6, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'chalet', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "350160", name: "Hiihtäjänkuja 5B2 (2MH Apartment)", cleaningFee: 78, bookingUrl: "https://app.moder.fi/levillenet/449?step=1", linenFee: 19, maxGuests: 6, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'chalet', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  
  // Glacier apartments
  { id: "504843", name: "Glacier A1 92m2 (6+2 hlö)", cleaningFee: 90, bookingUrl: "https://app.moder.fi/levillenet/3504?step=1", linenFee: 19, maxGuests: 8, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504854", name: "Glacier A2 67m2 (5+2 hlö)", cleaningFee: 80, bookingUrl: "https://app.moder.fi/levillenet/3897?step=1", linenFee: 19, maxGuests: 7, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504855", name: "Glacier A3 92m2 (6+2 hlö)", cleaningFee: 90, bookingUrl: "https://app.moder.fi/levillenet/3898?step=1", linenFee: 19, maxGuests: 8, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504856", name: "Glacier A4 72m2 (6 hlö)", cleaningFee: 80, bookingUrl: "https://app.moder.fi/levillenet/3899?step=1", linenFee: 19, maxGuests: 6, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504857", name: "Glacier A5 Penthouse 84m2 (6+2 hlö)", cleaningFee: 120, bookingUrl: "https://app.moder.fi/levillenet/3900?step=1", linenFee: 19, maxGuests: 8, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504858", name: "Glacier A6 72m2 (6 hlö)", cleaningFee: 90, bookingUrl: "https://app.moder.fi/levillenet/3901?step=1", linenFee: 19, maxGuests: 6, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504859", name: "Glacier B1 105m2 (10 hlö)", cleaningFee: 130, bookingUrl: "https://app.moder.fi/levillenet/3902?step=1", linenFee: 19, maxGuests: 10, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504860", name: "Glacier B2 105m2 (10 hlö)", cleaningFee: 130, bookingUrl: "https://app.moder.fi/levillenet/3903?step=1", linenFee: 19, maxGuests: 10, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504861", name: "Glacier B3 Penthouse 87m2 (6+2 hlö)", cleaningFee: 110, bookingUrl: "https://app.moder.fi/levillenet/3904?step=1", linenFee: 19, maxGuests: 8, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "504862", name: "Glacier B4 Penthouse 87m2 (6+2 hlö)", cleaningFee: 110, bookingUrl: "https://app.moder.fi/levillenet/3905?step=1", linenFee: 19, maxGuests: 8, whatsappNumber: "+35844131313", oneNightDiscount: 20, twoNightDiscount: 20, longStayDiscount: 15, showDiscount: false, category: 'glacier', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  
  // Skistar apartments
  { id: "625187", name: "Skistar 319 Superior Studio", cleaningFee: 50, bookingUrl: "https://app.moder.fi/levillenet/8440?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "413958", name: "Skistar 321 Superior Studio", cleaningFee: 50, bookingUrl: "https://app.moder.fi/levillenet/1435?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "350158", name: "Skistar 320 Superior Studio", cleaningFee: 50, bookingUrl: "https://app.moder.fi/levillenet/452?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "350156", name: "Skistar 104 Superior Studio", cleaningFee: 50, bookingUrl: "https://app.moder.fi/levillenet/305?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "485409", name: "Skistar 102 Superior Apartment", cleaningFee: 50, bookingUrl: "https://app.moder.fi/levillenet/2896?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "350155", name: "Skistar 210 One-Bedroom Apartment", cleaningFee: 60, bookingUrl: "https://app.moder.fi/levillenet/307?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "350154", name: "Skistar 211 Two-Bedroom Apartment", cleaningFee: 60, bookingUrl: "https://app.moder.fi/levillenet/308?step=1", linenFee: 19, maxGuests: 6, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "350159", name: "Skistar 212 Two-Bedroom Apartment", cleaningFee: 60, bookingUrl: "https://app.moder.fi/levillenet/451?step=1", linenFee: 19, maxGuests: 6, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "350157", name: "Skistar 209 Superior Apartment", cleaningFee: 60, bookingUrl: "https://app.moder.fi/levillenet/450?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'skistar', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  
  // Levi Platinum
  { id: "547818", name: "Levi Platinum Superior 2MH", cleaningFee: 70, bookingUrl: "", linenFee: 19, maxGuests: 6, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'platinum', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "414014", name: "Levi Platinum Superior Studio A2", cleaningFee: 70, bookingUrl: "https://app.moder.fi/levillenet/1204?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'platinum', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  
  // Cabins
  { id: "353045", name: "Karhupirtti (7MH Mökki)", cleaningFee: 220, bookingUrl: "https://app.moder.fi/levillenet/303?step=1", linenFee: 19, maxGuests: 14, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'cabin', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "620949", name: "Karhunvartija 3", cleaningFee: 60, bookingUrl: "https://app.moder.fi/levillenet/8898?step=1", linenFee: 19, maxGuests: 4, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: 15, showDiscount: false, category: 'other', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  
  // Other
  { id: "419423", name: "Levistar Studio with Sauna", cleaningFee: 0, bookingUrl: "", linenFee: 19, maxGuests: 2, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: null, showDiscount: false, category: 'other', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "625005", name: "Room 5 (Moonlight 415)", cleaningFee: 0, bookingUrl: "", linenFee: 19, maxGuests: 2, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: null, showDiscount: false, category: 'other', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null },
  { id: "645946", name: "Moonlight 415", cleaningFee: 59, bookingUrl: "", linenFee: 19, maxGuests: 2, whatsappNumber: "+35844131313", oneNightDiscount: null, twoNightDiscount: null, longStayDiscount: null, showDiscount: false, category: 'other', specialOffer: false, skiPassOffer: false, skiPassStartDate: null, skiPassEndDate: null }
];

// Database property settings interface (from Supabase)
export interface DbPropertySettings {
  property_id: string;
  marketing_name: string | null;
  cleaning_fee: number;
  discount_1_night: number;
  discount_2_nights: number;
  discount_3_plus_nights: number;
  show_discount: boolean;
}

// Get default property by ID (no database override)
export const getDefaultPropertyDetails = (roomId: string): PropertyDetail | undefined => {
  return defaultPropertyDetails.find(p => p.id === roomId);
};

// Get all default properties
export const getAllDefaultPropertyDetails = (): PropertyDetail[] => {
  return [...defaultPropertyDetails];
};

// Get property details with database override applied
export const getPropertyDetailsWithOverride = (
  roomId: string,
  dbSettings?: DbPropertySettings[]
): PropertyDetail | undefined => {
  const defaultProperty = defaultPropertyDetails.find(p => p.id === roomId);
  if (!defaultProperty) return undefined;
  
  const dbOverride = dbSettings?.find(s => s.property_id === roomId);
  if (!dbOverride) return defaultProperty;
  
  return {
    ...defaultProperty,
    name: dbOverride.marketing_name || defaultProperty.name,
    cleaningFee: dbOverride.cleaning_fee ?? defaultProperty.cleaningFee,
    oneNightDiscount: dbOverride.discount_1_night || null,
    twoNightDiscount: dbOverride.discount_2_nights || null,
    longStayDiscount: dbOverride.discount_3_plus_nights || null,
    showDiscount: dbOverride.show_discount ?? defaultProperty.showDiscount
  };
};

// Get all properties with database overrides applied
export const getAllPropertyDetailsWithOverride = (
  dbSettings?: DbPropertySettings[]
): PropertyDetail[] => {
  return defaultPropertyDetails.map(property => {
    const dbOverride = dbSettings?.find(s => s.property_id === property.id);
    if (!dbOverride) return property;
    
    return {
      ...property,
      name: dbOverride.marketing_name || property.name,
      cleaningFee: dbOverride.cleaning_fee ?? property.cleaningFee,
      oneNightDiscount: dbOverride.discount_1_night || null,
      twoNightDiscount: dbOverride.discount_2_nights || null,
      longStayDiscount: dbOverride.discount_3_plus_nights || null,
      showDiscount: dbOverride.show_discount ?? property.showDiscount
    };
  });
};

// Legacy exports for backwards compatibility (uses default data only)
export const getPropertyDetails = getDefaultPropertyDetails;
export const getAllPropertyDetails = getAllDefaultPropertyDetails;

// Export for backwards compatibility
export const propertyDetails = getAllDefaultPropertyDetails();
