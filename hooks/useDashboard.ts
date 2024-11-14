import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { fetchOrders, fetchTrips } from "@/services/truckMateService";
import {
  Order,
  Trip,
  OrdersResponse,
  TripsResponse,
  TruckMateQueryParams,
} from "@/types/truckmate";
import { WeeklyData, CountItem, RevenueItem } from "@/types/dashboard";

// Type guards
const isOrder = (item: Order | Trip): item is Order => {
  return "billTo" in item && "totalCharges" in item;
};

const isTrip = (item: Order | Trip): item is Trip => {
  return "carriers" in item && "revenue" in item;
};

// Utility types
type CommonKeys = keyof (Order & Trip);
type OrderOnlyKeys = Exclude<keyof Order, CommonKeys>;
type TripOnlyKeys = Exclude<keyof Trip, CommonKeys>;
type ValidKeys = CommonKeys | OrderOnlyKeys | TripOnlyKeys;

// Helper functions
const getTopItems = (
  array: Trip[],
  key: keyof Trip,
  limit = 5
): CountItem[] => {
  const counts = array.reduce<Record<string, number>>((acc, item) => {
    let value: string;

    if (key === "carriers") {
      value = item.carriers?.[0]?.name || "Unknown";
    } else if (key === "originZone" || key === "destinationZone") {
      value = String(item[key] || "Unknown");
    } else {
      value = String(item[key] || "Unknown");
    }

    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
};

const getItemValue = (item: Order | Trip, key: ValidKeys): string => {
  if (isOrder(item)) {
    if (key === "billTo") return item.billTo;
    if (key in item) return String(item[key as keyof Order]);
  }
  if (isTrip(item)) {
    if (key === "carriers") return item.carriers?.[0]?.name || "Unknown";
    if (key in item) return String(item[key as keyof Trip]);
  }
  return "Unknown";
};

const getItemRevenue = (item: Order | Trip): number => {
  if (isOrder(item)) return item.totalCharges || 0;
  if (isTrip(item)) return 1000; // TODO: Implement trip revenue
  return 0;
};

const getTopItemsByRevenue = (
  array: (Order | Trip)[],
  key: ValidKeys,
  limit = 5
): RevenueItem[] => {
  const revenue = array.reduce<Record<string, number>>((acc, item) => {
    const value = getItemValue(item, key);
    const amount = getItemRevenue(item);
    acc[value] = (acc[value] || 0) + amount;
    return acc;
  }, {});

  return Object.entries(revenue)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, total]) => ({ name, total }));
};

const getWeeklyRevenue = (items: (Order | Trip)[]): WeeklyData[] => {
  const weeklyData = items.reduce<Record<string, WeeklyData>>((acc, item) => {
    const date = new Date(
      isOrder(item) ? item.createdTime : new Date(item.eTD || "")
    );
    const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!acc[weekKey]) {
      acc[weekKey] = {
        week: weekKey,
        revenue: 0,
        shipments: 0,
      };
    }

    acc[weekKey].revenue += getItemRevenue(item);
    acc[weekKey].shipments += 1;

    return acc;
  }, {});

  return Object.values(weeklyData)
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
    .slice(-8);
};

export function useDashboard() {
  const queryParams: TruckMateQueryParams = {
    limit: 100,
    orderBy: "createdDateTime desc",
    select: [
      "orderId",
      "billTo",
      "totalCharges",
      "createdTime",
      "status",
      "serviceLevel",
    ],
  };

  const {
    data: ordersResponse,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useQuery<OrdersResponse>({
    queryKey: ["orders", queryParams],
    queryFn: () => fetchOrders(queryParams),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: tripsResponse,
    isLoading: isLoadingTrips,
    error: tripsError,
  } = useQuery<TripsResponse>({
    queryKey: ["trips", queryParams],
    queryFn: () => fetchTrips({ ...queryParams, codeBehavior: "assignment" }),
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = isLoadingOrders || isLoadingTrips;
  const orders = useMemo(() => ordersResponse?.orders || [], [ordersResponse]);
  const trips = useMemo(() => tripsResponse?.trips || [], [tripsResponse]);

  const dashboardData = {
    topCustomers: getTopItemsByRevenue(orders, "billTo"),
    topCarriers: getTopItemsByRevenue(trips, "carriers"),
    topOrigins: getTopItems(trips, "originZone"),
    topDestinations: getTopItems(trips, "destinationZone"),
    weeklyRevenue: getWeeklyRevenue([...orders, ...trips]),
  };

  // Debugging Logs
  useEffect(() => {
    if (orders.length > 0) {
      console.log("Orders fetched successfully:", {
        count: ordersResponse?.count,
        orders: orders.length,
      });
    } else {
      console.log("No orders fetched");
    }
  }, [orders, ordersResponse?.count]);

  useEffect(() => {
    if (trips.length > 0) {
      console.log("Trips fetched successfully:", {
        count: tripsResponse?.count,
        trips: trips.length,
      });
    } else {
      console.log("No trips fetched");
    }
  }, [trips, tripsResponse?.count]);

  useEffect(() => {
    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
    }
    if (tripsError) {
      console.error("Error fetching trips:", tripsError);
    }
  }, [ordersError, tripsError]);

  return {
    dashboardData,
    isLoading,
    error: ordersError || tripsError,
    ordersCount: ordersResponse?.count || 0,
    tripsCount: tripsResponse?.count || 0,
  };
}
