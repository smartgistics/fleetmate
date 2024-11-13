import { ServiceLevel, Commodity, PaginatedTruckMateResponse } from "./common";

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

// Response types
export interface ClientsResponse extends PaginatedTruckMateResponse {
  clients: Client[];
}
export interface ServiceLevelsResponse extends PaginatedTruckMateResponse {
  serviceLevels: ServiceLevel[];
}
export interface CommoditiesResponse extends PaginatedTruckMateResponse {
  commodities: Commodity[];
}
export interface ChargeCodesResponse extends PaginatedTruckMateResponse {
  chargeCodes: ChargeCode[];
}
export interface DriversResponse extends PaginatedTruckMateResponse {
  drivers: Driver[];
}
export interface VendorsResponse extends PaginatedTruckMateResponse {
  vendors: Vendor[];
}
