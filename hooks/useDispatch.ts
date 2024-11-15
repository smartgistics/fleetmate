import { useQuery } from "@tanstack/react-query";
import { fetchTrips } from "@/services/truckMateService";
import { Trip, TripsResponse, TripsQueryParams } from "@/types/truckmate";
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

interface DispatchFilters extends Partial<TripsQueryParams> {
  planner?: string;
  customer?: string;
  pickRegion?: string;
  delRegion?: string;
  carrier?: string;
  date?: string;
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

export function useDispatch() {
  const [filters] = useState<DispatchFilters>({
    limit: 1000,
    select: [
      "tripNumber",
      "status",
      "destZoneDesc",
      "origZoneDesc",
      "eTD",
      "eTA",
      "user1", // planner
      "user2", // customer
      "carriers",
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
    queryFn: async () => fetchTrips(filters),
    refetchInterval: 5000, // Refetch every 5 seconds
    staleTime: 0, // Consider data immediately stale to enable background updates
  });

  const trips = response?.trips || [];

  const distributeTrips = (): FilteredTrips => ({
    available: trips.filter((t) => t.status === "AVAIL"),
    planned: trips.filter((t) => t.status === "PLANNED"),
    dispatched: trips.filter((t) => t.status === "DISP"),
    arrivedAtShipper: trips.filter((t) => t.status === "ARVSHPR"),
    inTransit: trips.filter((t) => t.status === "LOADED"),
    delivering: trips.filter((t) => t.status === "DELVD"),
    needsAppointments: trips.filter((t) => t.status === "NEEDS_APPT"),
    needsRates: trips.filter((t) => t.status === "NEEDS_RATES"),
    assignCarrier: trips.filter((t) => t.status === "ASSIGN_CARRIER"),
  });

  return {
    trips: distributeTrips(),
    isLoading,
    error,
    total: response?.count || 0,
  };
}
