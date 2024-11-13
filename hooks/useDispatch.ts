import { useQuery } from "@tanstack/react-query";
import { fetchTrips } from "@/services/truckMateService";
import { Trip } from "@/types/truckmate";
import { useState } from "react";

interface FilteredTrips {
  available: Trip[];
  planned: Trip[];
  puTracking: Trip[];
  loading: Trip[];
  delTracking: Trip[];
  delivering: Trip[];
  needsAppointments: Trip[];
  needsRates: Trip[];
  assignCarrier: Trip[];
}

interface DispatchFilters {
  planner: string;
  customer: string;
  pickRegion: string;
  delRegion: string;
  carrier: string;
  date: string;
}

export function useDispatch() {
  const [filters, setFilters] = useState<DispatchFilters>({
    planner: "",
    customer: "",
    pickRegion: "",
    delRegion: "",
    carrier: "",
    date: "",
  });

  const {
    data: trips = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: fetchTrips,
  });

  const distributeTrips = (): FilteredTrips => {
    return {
      available: trips.filter((t) => t.status === "Available"),
      planned: trips.filter((t) => t.status === "Planned"),
      puTracking: trips.filter((t) => t.status === "PU TRACKING"),
      loading: trips.filter((t) => t.status === "LOADING"),
      delTracking: trips.filter((t) => t.status === "DEL TRACKING"),
      delivering: trips.filter((t) => t.status === "DELIVERING"),
      needsAppointments: trips.filter(
        (t) => t.planningStatus === "Needs Appointments"
      ),
      needsRates: trips.filter((t) => t.planningStatus === "Needs Rates"),
      assignCarrier: trips.filter((t) => t.planningStatus === "Assign Carrier"),
    };
  };

  const applyFilters = (trips: FilteredTrips): FilteredTrips => {
    return Object.keys(trips).reduce<FilteredTrips>((acc, key) => {
      const k = key as keyof FilteredTrips;
      acc[k] = trips[k].filter((trip) => {
        const matchesPlanner =
          !filters.planner ||
          trip.planner.toLowerCase().includes(filters.planner.toLowerCase());
        const matchesCustomer =
          !filters.customer ||
          trip.customer.toLowerCase().includes(filters.customer.toLowerCase());
        const matchesPickup =
          !filters.pickRegion ||
          trip.pickupLocation
            ?.toLowerCase()
            .includes(filters.pickRegion.toLowerCase());
        const matchesDelivery =
          !filters.delRegion ||
          trip.deliveryLocation
            .toLowerCase()
            .includes(filters.delRegion.toLowerCase());
        const matchesCarrier =
          !filters.carrier ||
          trip.carriers?.some((c) =>
            c.name.toLowerCase().includes(filters.carrier.toLowerCase())
          );
        const matchesDate =
          !filters.date || trip.scheduledStartDate === filters.date;

        return (
          matchesPlanner &&
          matchesCustomer &&
          matchesPickup &&
          matchesDelivery &&
          matchesCarrier &&
          matchesDate
        );
      });
      return acc;
    }, {} as FilteredTrips);
  };

  const filteredTrips = applyFilters(distributeTrips());

  return {
    trips: filteredTrips,
    isLoading,
    error,
    filters,
    setFilters,
  };
}
