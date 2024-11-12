export interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  latitude?: number;
  longitude?: number;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  appointmentRequired?: boolean;
  hours?: {
    start: string;
    end: string;
    days: string[];
  };
}

export interface Charge {
  type: string;
  code: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  currencyCode: string;
}

// Service Level types
export interface ServiceLevel {
  code: string;
  description: string;
  active: boolean;
  transitDays?: number;
  guaranteedService: boolean;
  expeditedService: boolean;
}

export type EquipmentType =
  | "van"
  | "reefer"
  | "flatbed"
  | "stepdeck"
  | "conestoga"
  | "specialized";

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
