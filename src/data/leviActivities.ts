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
      fi: 'Levin 43 rinnettä tarjoavat haastetta kaikentasoisille. Tutustu myös rinneravintoloihin kuten Tuikku ja Gondoli – taukopaikkoihin upeiden maisemien keskellä.',
      en: "Levi's 43 slopes offer challenges for all skill levels. Check out slope restaurants like Tuikku and Gondoli – perfect spots for breaks with stunning views."
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
      fi: '230 km huollettuja latuja tunturimaisemissa. Voit lähteä suoraan keskustasta. Latuinfon saat Levin sivulta.',
      en: '230 km of groomed trails in fell landscapes. Start directly from the center. Check trail info from Levi website.'
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
      fi: 'Koiravaljakkoajelu lumisessa erämaassa on unohtumaton kokemus. Safarit kestävät 1–4 tuntia ja sisältävät kuljetuksen.',
      en: 'Dog sled ride through snowy wilderness is an unforgettable experience. Safaris last 1–4 hours and include transport.'
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
      fi: 'Porofarmilla tapaat poroja, kuulet tarinoita poronhoitajien elämästä ja voit nauttia kupposen kuumaa mehua kodassa. Sopii kaikenikäisille.',
      en: 'At the reindeer farm you meet reindeer, hear stories about herder life and enjoy hot drinks in a traditional kota. Suitable for all ages.'
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
      fi: 'Revontuliretki vie sinut parhaalle katselupaikalle pois valosaasteen keskeltä. Retki sisältää kuljetuksen.',
      en: 'Northern lights tour takes you to the best viewing spots away from light pollution. Tour includes transport.'
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
      fi: 'Kylpylä & Spa -vierailun voit tehdä esim. Levi Hotel Spassa. Altaat, saunat ja hemmotteluhoidot rentouttavat aktiviteettipäivän jälkeen.',
      en: 'Visit Levi Hotel Spa for pools, saunas and spa treatments. Perfect way to relax after an active day.'
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
    timeOfDay: ['evening'],
    seasonAvailable: ['winter', 'spring'],
    icon: 'ArrowDown',
    description: {
      fi: 'Ilmainen pulkkamäki Levin eturinteellä. Pulkkia saa lainata rinteen alaasemalta.',
      en: 'Free sledding hill at Levi front slopes. Sleds can be borrowed from the base station.'
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
      fi: 'Tutustu Levin keskustan pieniin putiikkeihin, matkamuistomyymälöihin ja kahviloihin. Zero Point -alue ja kävelykatu tarjoavat monipuolista shoppailua ja rentoa tunnelmaa.',
      en: 'Explore small boutiques, souvenir shops and cafés in Levi center. Zero Point area and the pedestrian street offer diverse shopping and relaxed atmosphere.'
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
      fi: 'Levillä on ravintoloita jokaiseen makuun: lappilaista ruokaa Hullu Porossa, fine diningtiä King Crabissa tai rentoa tunnelmaa Coloradossa.',
      en: 'Levi has restaurants for every taste: Lappish cuisine at Hullu Poro, fine dining at King Crab or relaxed atmosphere at Colorado.'
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
