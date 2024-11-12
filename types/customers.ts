export interface Customer {
  customerId: string;
  name: string;
  status: string;
  creditStatus: string;

  // Contact Info
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact: {
    name: string;
    phone?: string;
    email?: string;
    fax?: string;
  };

  // Business Terms
  paymentTerms?: {
    method: string;
    terms: string;
  };

  // Preferences
  defaultEquipmentType?: string;
  defaultServiceLevel?: string;
  temperatureRequirements?: {
    required: boolean;
    minTemp?: number;
    maxTemp?: number;
    tempUnits?: string;
  };

  // Custom Fields
  user1?: string;
  user2?: string;
  user3?: string;
  user4?: string;
  user5?: string;
}
