import { ServiceLevel, Commodity } from "./common";

// Base interfaces for common patterns
interface BaseResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
}

interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Client/Account related types
export interface Client {
  id: string;
  name: string;
  status: string;
  type: string;
  accountNumber?: string;
  taxId?: string;
  creditLimit?: number;
  creditStatus?: string;
  paymentTerms?: string;
}

// Driver types
export interface Driver {
  driverId: string;
  employeeId: string;
  status: "active" | "inactive";

  // Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  licenseNumber: string;
  licenseState: string;
  licenseExpiration: string;

  // Contact Info
  phone: string;
  email?: string;
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
  };

  // Qualifications
  endorsements: string[];
  restrictions?: string[];
  hazmatCertified: boolean;
  hazmatExpiration?: string;
  driverCycle?: "7" | "8" | "14" | "BFM" | "STD" | "WA";
  driverCycleZone?: "AU" | "CA" | "US";

  // Employment
  hireDate: string;
  terminationDate?: string;
  homeTerminal: string;
  dispatchGroup?: string;
  homeZone?: string;

  // Equipment & Certifications
  assignedUnit?: string;
  equipmentQualifications: string[];
  drugTest?: boolean;
  roadTest?: boolean;
  twic?: boolean;
  tdgCert?: boolean;
  tdgExpiryDate?: string;
  abstractExpiryDate?: string;
}

// Vendor/Carrier types
export interface Vendor {
  vendorId: string;
  name: string;
  vendorType:
    | "agentCarrier"
    | "agentSales"
    | "broker"
    | "competitorCarrier"
    | "customsBroker"
    | "insurer"
    | "interliner"
    | "linehaulCarrier"
    | "other"
    | "palletCompany"
    | "rental"
    | "supplier"
    | "vendor";
  status: string;

  // Contact Info
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  businessPhone?: string;
  businessPhoneExt?: string;
  faxPhone?: string;
  contact?: string;
  email?: string;

  // Business Details
  defaultZone?: string;
  vendorSince?: string;
  insurance?: string;
  liability?: string;
  cargo?: string;
  workComp?: string;
  iccNumber?: string;
  w9?: string;
  federalId?: string;
  dotNumber?: string;

  // Operational Settings
  webEnabled?: boolean;
  isInactive?: boolean;
  defaultTerminal?: string;
  rateMode?: string;
}

// Charge Code types
export interface ChargeCode {
  code: string;
  description: string;
  type: string;
  active: boolean;
  taxable: boolean;
  fuelSurchargeable: boolean;
  accessorialCode?: string;
}

// Eligible Carrier Response
export interface EligibleCarrierResponse extends BaseResponse {
  carriers: {
    carrierId: string;
    isEligible: boolean;
    reason?: string;
  }[];
}

// Response types
export interface ClientResponse extends PaginatedResponse<Client> {
  clients: Client[];
}
export interface ServiceLevelResponse extends PaginatedResponse<ServiceLevel> {
  serviceLevels: ServiceLevel[];
}
export interface CommodityResponse extends PaginatedResponse<Commodity> {
  commodities: Commodity[];
}
export interface ChargeCodeResponse extends PaginatedResponse<ChargeCode> {
  chargeCodes: ChargeCode[];
}
export interface DriverResponse extends PaginatedResponse<Driver> {
  drivers: Driver[];
}
export interface VendorResponse extends PaginatedResponse<Vendor> {
  vendors: Vendor[];
}

// Query parameter types
export interface MasterDataQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  active?: boolean;
  expand?: string[];
  filter?: string;
}
