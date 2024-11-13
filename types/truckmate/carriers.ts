export interface Carrier {
  carrierId: string;
  name: string;
  status: string;
  mcNumber?: string;
  dotNumber?: string;
  scacCode?: string;
  taxId?: string;

  // Insurance & Compliance
  insuranceExpiration?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceCoverage?: number;
  w9Expiration?: string;
  contractExpiration?: string;

  // Contact Info
  address?: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact?: {
    name: string;
    phone?: string;
    email?: string;
    fax?: string;
  };

  // Payment & Business Terms
  paymentTerms?: {
    method: string;
    terms: string;
    quickPay: boolean;
    quickPayDiscount?: number;
  };

  // Operational Info
  equipmentTypes?: string[];
  preferredLanes?: {
    origin: string;
    destination: string;
  }[];
  rating?: {
    safetyRating?: string;
    reliabilityScore?: number;
    onTimeDelivery?: number;
  };
}
