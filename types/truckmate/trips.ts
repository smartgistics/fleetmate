import { PaginatedTruckMateResponse } from "./common";

export interface Trip {
  tripId: number;
  orderId: number;
  status: string;
  customer: string;
  deliveryLocation: string;
  deliveryDate: string;
  deliveryTime: string;
  dispatchStatus: string;
  equipmentType: string;
  planner: string;
  pickupDate?: string;
  pickupLocation?: string;
  pickupTime?: string;
  rate?: number;
  carriers?: {
    carrierId: string;
    name: string;
  }[];

  // Planning Info
  planningStatus: string;

  // Equipment
  powerUnit?: string;
  trailer?: string;

  // Route Details
  originTerminal: string;
  destinationTerminal: string;
  totalDistance: number;
  distanceUnits: string;
  estimatedDuration: number;
  durationUnits: string;

  // Schedule
  scheduledStartDate: string;
  scheduledStartTime: string;
  scheduledEndDate: string;
  scheduledEndTime: string;
  actualStartDate?: string;
  actualStartTime?: string;
  actualEndDate?: string;
  actualEndTime?: string;

  // Personnel
  driver1: string;
  driver2?: string;
  driver1Status?: string;
  driver2Status?: string;

  // Stops
  stops: TripStop[];

  // Financial
  revenue: number;
  cost: number;
  currencyCode: string;

  // Tracking
  currentLocation?: {
    latitude: number;
    longitude: number;
    timestamp: string;
    speed?: number;
    heading?: number;
  };

  // Metadata
  createdBy: string;
  createdDateTime: string;
  modifiedBy: string;
  modifiedDateTime: string;
}

export interface TripStop {
  stopId: number;
  tripId: number;
  sequenceNumber: number;
  stopType: "pickup" | "delivery" | "fuel" | "rest" | "other";

  // Location
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };

  // Schedule
  scheduledDate: string;
  scheduledTime: string;
  actualDate?: string;
  actualTime?: string;
  estimatedDuration: number;
  durationUnits: string;

  // Status
  status: string;
  statusReason?: string;

  // Instructions
  specialInstructions?: string;
  contactName?: string;
  contactPhone?: string;

  // References
  orderNumber?: string;
  referenceNumbers?: string[];
}

export interface TripsResponse extends PaginatedTruckMateResponse {
  trips: Trip[];
}
