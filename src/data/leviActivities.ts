// Levi Activity Knowledge Base
// Only activities from this database are used in the planner

export interface LeviActivity {
  id: string;
  name: { fi: string; en: string };
  category: 'outdoor' | 'safari' | 'relaxation' | 'dining' | 'culture' | 'family';
  duration: 'short' | 'half-day' | 'full-day'; // 1-2h, 3-4h, 5-8h
  physicalDemand: 'low' | 'medium' | 'high';
  minAge: number;
  requiresCar: boolean;
  timeOfDay: ('morning' | 'afternoon' | 'evening')[];
  seasonAvailable: ('winter' | 'spring' | 'summer' | 'autumn')[];
  icon: string; // lucide-react icon name
  description: { fi: string; en: string };
}

export const leviActivities: LeviActivity[] = [
  // SKIING & CROSS-COUNTRY
  {
    id: 'skiing',
    name: { fi: 'Laskettelu', en: 'Skiing' },
    category: 'outdoor',
    duration: 'half-day',
    physicalDemand: 'high',
    minAge: 3,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Mountain',
    description: {
      fi: 'Levin 43 rinnettä tarjoavat laskettelijoille kaikentasoisia haasteita.',
      en: "Levi's 43 slopes offer challenges for all skill levels."
    }
  },
  {
    id: 'cross-country',
    name: { fi: 'Murtomaahiihto', en: 'Cross-Country Skiing' },
    category: 'outdoor',
    duration: 'half-day',
    physicalDemand: 'medium',
    minAge: 4,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'TreePine',
    description: {
      fi: '230 km huollettuja latuja tunturimaisemissa.',
      en: '230 km of groomed trails in fell landscapes.'
    }
  },

  // SAFARIS
  {
    id: 'husky-safari',
    name: { fi: 'Huskysafari', en: 'Husky Safari' },
    category: 'safari',
    duration: 'half-day',
    physicalDemand: 'low',
    minAge: 4,
    requiresCar: true,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Dog',
    description: {
      fi: 'Unohtumaton kokemus koiravaljakon kyydissä lumisessa erämaassa.',
      en: 'Unforgettable experience riding a dog sled through snowy wilderness.'
    }
  },
  {
    id: 'reindeer-farm',
    name: { fi: 'Porofarmivierailu', en: 'Reindeer Farm Visit' },
    category: 'safari',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: true,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Heart',
    description: {
      fi: 'Tapaa poroja läheltä ja opi poronhoitajan elämästä.',
      en: 'Meet reindeer up close and learn about herder life.'
    }
  },
  {
    id: 'snowmobile-safari',
    name: { fi: 'Moottorikelkkasafari', en: 'Snowmobile Safari' },
    category: 'safari',
    duration: 'half-day',
    physicalDemand: 'medium',
    minAge: 12,
    requiresCar: true,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Zap',
    description: {
      fi: 'Jännittävä ajelu tunturimaisemissa moottorikelkalla.',
      en: 'Exciting ride through fell landscapes by snowmobile.'
    }
  },
  {
    id: 'northern-lights',
    name: { fi: 'Revontuliretki', en: 'Northern Lights Tour' },
    category: 'safari',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 4,
    requiresCar: true,
    timeOfDay: ['evening'],
    seasonAvailable: ['winter', 'autumn'],
    icon: 'Sparkles',
    description: {
      fi: 'Opastettu retki parhaille revontulipaikoille.',
      en: 'Guided tour to the best aurora viewing spots.'
    }
  },

  // RELAXATION
  {
    id: 'spa',
    name: { fi: 'Kylpylä & Spa', en: 'Spa & Wellness' },
    category: 'relaxation',
    duration: 'half-day',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon', 'evening'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Droplets',
    description: {
      fi: 'Rentoudu kylpylässä uima-altailla ja saunassa.',
      en: 'Relax in spa with pools and sauna.'
    }
  },
  {
    id: 'sauna-evening',
    name: { fi: 'Sauna-ilta majoituksessa', en: 'Sauna Evening' },
    category: 'relaxation',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['evening'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Flame',
    description: {
      fi: 'Nauti omasta saunasta aktiviteettipäivän jälkeen.',
      en: 'Enjoy private sauna after an activity-filled day.'
    }
  },

  // FAMILY ACTIVITIES
  {
    id: 'sledding',
    name: { fi: 'Pulkkailu', en: 'Sledding' },
    category: 'family',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'ArrowDown',
    description: {
      fi: 'Ilmaisia pulkkamäkiä ympäri Leviä.',
      en: 'Free sledding hills around Levi.'
    }
  },
  {
    id: 'kids-ski-school',
    name: { fi: 'Lasten hiihtokoulu', en: 'Kids Ski School' },
    category: 'family',
    duration: 'half-day',
    physicalDemand: 'medium',
    minAge: 3,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Baby',
    description: {
      fi: 'Ammattitaitoinen hiihto-opetus lapsille.',
      en: 'Professional ski instruction for children.'
    }
  },

  // OTHER OUTDOOR
  {
    id: 'ice-karting',
    name: { fi: 'Jääkarting', en: 'Ice Karting' },
    category: 'outdoor',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 7,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon', 'evening'],
    seasonAvailable: ['winter'],
    icon: 'Car',
    description: {
      fi: 'Vauhdikas jääkartingrata Levin keskustassa.',
      en: 'Exciting ice karting track in Levi center.'
    }
  },
  {
    id: 'ice-fishing',
    name: { fi: 'Pilkkiminen', en: 'Ice Fishing' },
    category: 'outdoor',
    duration: 'half-day',
    physicalDemand: 'low',
    minAge: 4,
    requiresCar: true,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Fish',
    description: {
      fi: 'Rauhallinen pilkkihetki jäällä.',
      en: 'Peaceful ice fishing moment.'
    }
  },
  {
    id: 'snowshoeing',
    name: { fi: 'Lumikenkäily', en: 'Snowshoeing' },
    category: 'outdoor',
    duration: 'short',
    physicalDemand: 'medium',
    minAge: 6,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'Footprints',
    description: {
      fi: 'Kävely lumikengillä tunturipolulla.',
      en: 'Walking with snowshoes on fell trails.'
    }
  },

  // FREE TIME / FLEXIBLE
  {
    id: 'free-time',
    name: { fi: 'Vapaa-aika', en: 'Free Time' },
    category: 'relaxation',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon', 'evening'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Coffee',
    description: {
      fi: 'Rentoutumista, ostoksia tai kahvittelua.',
      en: 'Relaxation, shopping or coffee break.'
    }
  },
  {
    id: 'village-walk',
    name: { fi: 'Kylän tutkiminen', en: 'Village Exploration' },
    category: 'relaxation',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['morning', 'afternoon', 'evening'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'MapPin',
    description: {
      fi: 'Tutustu Levin keskustaan, kauppoihin ja ravintoloihin.',
      en: 'Explore Levi center, shops and restaurants.'
    }
  },
  {
    id: 'restaurant-dinner',
    name: { fi: 'Ravintolaillallinen', en: 'Restaurant Dinner' },
    category: 'dining',
    duration: 'short',
    physicalDemand: 'low',
    minAge: 0,
    requiresCar: false,
    timeOfDay: ['evening'],
    seasonAvailable: ['winter', 'spring', 'summer', 'autumn'],
    icon: 'Utensils',
    description: {
      fi: 'Nauti paikallisesta ruokakulttuurista Levin ravintoloissa.',
      en: 'Enjoy local cuisine at Levi restaurants.'
    }
  }
];

// Helper function to get activity by ID
export const getActivityById = (id: string): LeviActivity | undefined => {
  return leviActivities.find(activity => activity.id === id);
};

// Helper function to filter activities by criteria
export const filterActivities = (
  minAge: number,
  hasCar: boolean,
  timeOfDay?: 'morning' | 'afternoon' | 'evening'
): LeviActivity[] => {
  return leviActivities.filter(activity => {
    if (activity.minAge > minAge) return false;
    if (activity.requiresCar && !hasCar) return false;
    if (timeOfDay && !activity.timeOfDay.includes(timeOfDay)) return false;
    return true;
  });
};
