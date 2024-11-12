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

// Commodity related types
export interface Commodity {
  code: string;
  active: boolean;
  description: string;
  nmfcNumber?: string;
  class?: string;
  weight: number;
  weightUnits: string;
  pieces: number;
  pallets?: number;
  cube?: number;
  volume?: number;
  hazmat?: boolean;
  hazmatCode?: string;
  temperature?: {
    required: boolean;
    min?: number;
    max?: number;
    units?: string;
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

export interface FormData {
  // Customer Tab
  customer: string;
  customerReference: string;
  customerContact: string;
  contactPhone: string;
  contactEmail: string;
  billingAddress: string;

  // Order Details Tab
  contractType: string;
  equipmentType: string;
  serviceLevel: string;
  temperatureControlled: boolean;
  tempMin: string;
  tempMax: string;
  commodityCode: string;
  commodities: Commodity[];

  // Financials Tab
  customerCharges: Charge[];
  carrierCharges: Charge[];
  miscCharges: Charge[];

  // Additional Fields
  notes: string;
  accountManager: string;
  orderPlanner: string;
  status: string;
  parentAccount: string;
  customerId: string;
  creditStatus: string;
}
