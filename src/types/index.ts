export type Language = 'mr' | 'hi' | 'en';

export type UserRole = 'FARMER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
  village: string;
  district: string;
  state: string;
  landAreaAcres?: number;
  primaryCrops: string[];
  createdAt: string;
}

export type ToxicityCategory = 'GREEN' | 'BLUE' | 'YELLOW' | 'RED';

export interface Medicine {
  id: string;
  commercialName: {
    mr: string;
    hi: string;
    en: string;
  };
  technicalName: string;
  type: 'CHEMICAL_INSECTICIDE' | 'CHEMICAL_FUNGICIDE' | 'BIO_PESTICIDE' | 'BIO_FUNGICIDE' | 'HERBICIDE';
  toxicityColor: ToxicityCategory; // Green (Mild), Blue (Moderate), Yellow (High), Red (Extremely Toxic)
  toxicityLabel: {
    mr: string;
    hi: string;
    en: string;
  };
  dosePerPump15L: string; // e.g., "5 ml" or "30 g"
  dosePerAcre200L: string; // e.g., "70 ml" or "400 g"
  applicationMethod: {
    mr: string;
    hi: string;
    en: string;
  };
  waitingPeriodDays: number; // PHI (Pre-Harvest Interval)
  precautions: {
    mr: string[];
    hi: string[];
    en: string[];
  };
  approvedCrops: string[];
  approxCostPerPack?: string;
}

export interface Disease {
  id: string;
  name: {
    mr: string;
    hi: string;
    en: string;
  };
  cropId: string;
  cropName: {
    mr: string;
    hi: string;
    en: string;
  };
  category: 'FUNGAL' | 'BACTERIAL' | 'VIRAL' | 'PEST_INSECT' | 'DEFICIENCY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  symptoms: {
    mr: string[];
    hi: string[];
    en: string[];
  };
  favorableConditions: {
    mr: string;
    hi: string;
    en: string;
  };
  preventionTips: {
    mr: string[];
    hi: string[];
    en: string[];
  };
  chemicalTreatments: Medicine[];
  organicTreatments: {
    name: {
      mr: string;
      hi: string;
      en: string;
    };
    description: {
      mr: string;
      hi: string;
      en: string;
    };
    dosage: string;
    preparationMethod?: {
      mr: string;
      hi: string;
      en: string;
    };
  }[];
  imageUrl: string;
}

export interface Crop {
  id: string;
  name: {
    mr: string;
    hi: string;
    en: string;
  };
  botanicalName: string;
  category: 'CASH_CROP' | 'OILSEED' | 'CEREAL' | 'VEGETABLE' | 'HORTICULTURE' | 'PULSE';
  season: 'KHARIF' | 'RABI' | 'SUMMER' | 'ANNUAL';
  imageUrl: string;
  soil: {
    mr: string;
    hi: string;
    en: string;
  };
  phRange: string;
  durationDays: string;
  irrigation: {
    mr: string;
    hi: string;
    en: string;
  };
  fertilizers: {
    npkRatio: string;
    schedule: {
      stage: { mr: string; hi: string; en: string };
      dose: { mr: string; hi: string; en: string };
    }[];
  };
  cultivationSteps: {
    step: { mr: string; hi: string; en: string };
    desc: { mr: string; hi: string; en: string };
  }[];
  commonDiseasesCount: number;
}

export interface WeatherData {
  district: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  rainChance: number;
  condition: string;
  conditionCode: 'SUNNY' | 'PARTLY_CLOUDY' | 'CLOUDY' | 'RAIN' | 'STORM';
  spraySuitability: 'EXCELLENT' | 'MODERATE' | 'NOT_RECOMMENDED';
  sprayAdvisory: {
    mr: string;
    hi: string;
    en: string;
  };
  forecast: {
    day: string;
    maxTemp: number;
    minTemp: number;
    rainProb: number;
    condition: string;
  }[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  cropId?: string;
  cropName: string;
  diseaseName?: string;
  timestamp: string;
}
