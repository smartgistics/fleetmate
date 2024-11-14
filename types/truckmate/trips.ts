import { Carrier } from "./carriers";
import { PaginatedTruckMateResponse, TruckMateQueryParams } from "./common";

export interface Trip {
  tripNumber: number;
  description?: string;
  status: string;
  statusDesc?: string;
  originZone?: string;
  origZoneDesc?: string;
  destinationZone?: string;
  destZoneDesc?: string;
  currentZone?: string;
  currentZoneDesc?: string;
  legCount?: number;
  activeLeg?: number;
  manifest?: string;
  user1?: string;
  user2?: string;
  user3?: string;
  user4?: string;
  user5?: string;
  user6?: string;
  user7?: string;
  user8?: string;
  user9?: string;
  user10?: string;
  driver?: string;
  driver2?: string;
  powerUnit?: string;
  miscEquip?: string;
  miscEquip2?: string;
  trailer?: string;
  trailer2?: string;
  trailer3?: string;
  isActive?: boolean;
  eTA?: string; // Estimated Time of Arrival
  eTD?: string; // Estimated Time of Departure
  carriers?: Carrier[];
}

export interface TripStop {
  type: string;
  resourceType:
    | "driver"
    | "powerUnit"
    | "miscEquip"
    | "trailer"
    | "freight"
    | "chassis"
    | "container"
    | "interliner"
    | "";
  resourceId: string | number;
  action: "drop" | "pick" | "";
  attemptedFreight: "False" | "True" | null;
}

export interface TripStatusChange {
  changed: string;
  statusCode: string;
  statComment?: string;
  updatedBy?: string;
  tripNumber: number;
  legId?: number;
  zone?: string;
  insDate: string;
}

export interface TripsResponse extends PaginatedTruckMateResponse {
  trips: Trip[];
}

export interface TripsQueryParams extends TruckMateQueryParams {
  codeBehavior?:
    | "arriveDock"
    | "departDock"
    | "departShipper"
    | "arriveConsignee"
    | "assignment"
    | "complete"
    | "dispatch"
    | "departConsignee"
    | "late"
    | "other"
    | "arriveShipper"
    | "spotting"
    | "terminal"
    | "cancel";
}
