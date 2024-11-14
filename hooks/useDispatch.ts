import { useQuery } from "@tanstack/react-query";
import { fetchTrips } from "@/services/truckMateService";
import {
  Trip,
  TruckMateQueryParams,
  TripsResponse,
  TripsQueryParams,
} from "@/types/truckmate";
import { useState } from "react";

interface FilteredTrips {
  available: Trip[];
  planned: Trip[];
  dispatched: Trip[];
  arrivedAtShipper: Trip[];
  inTransit: Trip[];
  delivering: Trip[];
  needsAppointments: Trip[];
  needsRates: Trip[];
  assignCarrier: Trip[];
}

interface DispatchFilters extends Partial<TruckMateQueryParams> {
  planner?: string;
  customer?: string;
  pickRegion?: string;
  delRegion?: string;
  carrier?: string;
  date?: string;
}

export function useDispatch() {
  const [filters, setFilters] = useState<DispatchFilters>({
    // planner: "",
    // customer: "",
    // pickRegion: "",
    // delRegion: "",
    // carrier: "",
    // date: "",
    // TruckMate API specific params
    limit: 1000,
    // orderBy: "scheduledStartDate desc",
    select: [
      "tripNumber",
      "status",
      // "customer",
      "destZoneDesc",
      "origZoneDesc",
      // "planner",
      "eTD",
      // "carriers",
      // "planningStatus",
    ],
    filter:
      "status in ('AVAIL','PLANNED','DISP','ARVSHPR','LOADED','DELVD') AND eTA ne null",
  });

  const {
    data: response,
    isLoading,
    error,
  } = useQuery<TripsResponse>({
    queryKey: ["trips", filters],
    queryFn: async () => {
      // Convert filters to TruckMate API params
      const queryParams: TripsQueryParams = {
        limit: filters.limit,
        orderBy: filters.orderBy,
        select: filters.select,
        filter: filters.filter,
        // filter: buildFilterString(filters),
      };
      return fetchTrips(queryParams);
    },
  });

  const trips = response?.trips || [];

  // trips?
  // limit=100
  // &
  // %24select=tripNumber%2Cstatus%2Ccustomer%2CdeliveryLocation%2CpickupLocation%2Cplanner%2CscheduledStartDate%2Ccarriers%2CplanningStatus
  // &
  // %24orderBy=scheduledStartDate+desc

  const distributeTrips = (): FilteredTrips => ({
    available: trips.filter((t) => t.status === "AVAIL"),
    planned: trips.filter((t) => t.status === "PLANNED"),
    dispatched: trips.filter((t) => t.status === "DISP"),
    arrivedAtShipper: trips.filter((t) => t.status === "ARVSHPR"),
    inTransit: trips.filter((t) => t.status === "LOADED"),
    delivering: trips.filter((t) => t.status === "DELVD"),
    needsAppointments: [],
    needsRates: [],
    assignCarrier: [],
    // needsAppointments: trips.filter(
    //   (t) => t.planningStatus === "Needs Appointments"
    // ),
    // needsRates: trips.filter((t) => t.planningStatus === "Needs Rates"),
    // assignCarrier: trips.filter((t) => t.planningStatus === "Assign Carrier"),
  });

  // const buildFilterString = (filters: DispatchFilters): string => {
  //   const conditions: string[] = [];

  //   if (filters.planner) {
  //     conditions.push(`planner like '%${filters.planner}%'`);
  //   }
  //   if (filters.customer) {
  //     conditions.push(`customer like '%${filters.customer}%'`);
  //   }
  //   if (filters.pickRegion) {
  //     conditions.push(`pickupLocation like '%${filters.pickRegion}%'`);
  //   }
  //   if (filters.delRegion) {
  //     conditions.push(`deliveryLocation like '%${filters.delRegion}%'`);
  //   }
  //   if (filters.carrier) {
  //     conditions.push(`carriers/any(c: c/name like '%${filters.carrier}%')`);
  //   }
  //   if (filters.date) {
  //     conditions.push(`scheduledStartDate eq '${filters.date}'`);
  //   }

  //   return conditions.length > 0 ? conditions.join(" and ") : "";
  // };

  const filteredTrips = distributeTrips();

  return {
    trips: filteredTrips,
    isLoading,
    error,
    filters,
    setFilters,
    total: response?.count || 0,
  };
}
