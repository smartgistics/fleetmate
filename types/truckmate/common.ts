// Query Parameters (matching TruckMate API exactly)
export interface TruckMateQueryParams {
  // Pagination
  offset?: number; // Starting record number
  limit?: number; // Default is 20 records

  // Sorting
  orderBy?: string; // Format: "field asc|desc"

  // Filtering
  filter?: string; // Filter criteria
  status?: string; // Status filter (e.g. "!CANCELLED,!VOID" for trips)

  // Field Selection
  select?: string[]; // Fields to include in response
  expand?: string[]; // Related entities to expand

  // Search
  search?: string; // Text search across fields

  // Additional filters
  fromDate?: string; // Filter by date range
  toDate?: string;
  type?: string; // Filter by record type
  code?: string; // Filter by code
  active?: boolean; // Filter by active status
}

// TruckMate API Error Types
export interface TruckMateError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type ErrorCode =
  | "movedPermanently"
  | "unauthorized"
  | "forbidden"
  | "resourceNotFound"
  | "methodNotAllowed"
  | "resourceConflict"
  | "licenseNotAvailable"
  | "tooManyRequests"
  | "serverError"
  | "belowMinValue"
  | "exceedsMaxLength"
  | "invalidJsonArray"
  | "invalidJsonObject"
  | "noValidFields"
  | "invalidJsonValue"
  | "invalidDateTime"
  | "invalidDate"
  | "invalidTime"
  | "invalidPattern"
  | "invalidFormat"
  | "invalidDouble"
  | "invalidEnum"
  | "invalidInteger"
  | "invalidString"
  | "missingRequiredField"
  | "invalidQueryParameter"
  | "invalidDBValue"
  | "invalidBusinessLogic";

// TruckMate API Response Types
export interface TruckMateResponse<T> {
  success: boolean;
  data?: T;
  error?: TruckMateError;
}

export interface PaginatedTruckMateResponse {
  href: string;
  offset: number;
  limit: number;
  sort: string;
  filter: string;
  select: string;
  count: number;
}

// Search Results shared types
export interface SearchResult {
  type: "shipment" | "carrier" | "customer";
  id: string | number;
  title: string;
  subtitle: string;
}

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
