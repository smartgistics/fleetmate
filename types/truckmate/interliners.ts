export interface Interliner {
  interlinerId: string;
  name: string;
  status: string;
  type: "carrier" | "agent" | "partner";

  // Contact Info
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contacts: InterlinerContact[];

  // Service Areas
  servicePoints: ServicePoint[];
  serviceLanes: ServiceLane[];

  // Business Terms
  agreement?: {
    effectiveDate: string;
    expirationDate?: string;
    status: string;
    terms: string;
  };

  // Financial
  paymentTerms: {
    method: string;
    terms: string;
    currency: string;
  };

  // Operational
  transitTimes: {
    origin: string;
    destination: string;
    standardDays: number;
    expeditedDays?: number;
  }[];

  // Service Capabilities
  capabilities: {
    equipmentTypes: string[];
    services: string[];
    specialHandling?: string[];
    restrictions?: string[];
  };

  // Performance Metrics
  metrics?: {
    onTimePickup: number;
    onTimeDelivery: number;
    claimRatio: number;
    avgTransitDays: number;
  };
}

export interface InterlinerContact {
  name: string;
  title?: string;
  department?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  isPrimary: boolean;
}

export interface ServicePoint {
  terminal: string;
  type: "origin" | "destination" | "both";
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  operatingHours: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }[];
  contacts: InterlinerContact[];
}

export interface ServiceLane {
  origin: {
    terminal: string;
    state: string;
    country: string;
    serviceArea: string[];
  };
  destination: {
    terminal: string;
    state: string;
    country: string;
    serviceArea: string[];
  };
  services: {
    type: string;
    transitDays: number;
    frequency: string;
    restrictions?: string[];
  }[];
}
