import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchOrders, fetchTrips } from "@/services/truckMateService";
import {
  Order,
  Trip,
  WeeklyData,
  CountItem,
  RevenueItem,
} from "@/types/truckmate";

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
      value = item.carriers?.[0]?.carrierId || "Unknown";
    } else if (key === "pickupLocation" || key === "deliveryLocation") {
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
    if (key === "carriers") return item.carriers?.[0]?.carrierId || "Unknown";
    if (key in item) return String(item[key as keyof Trip]);
  }
  return "Unknown";
};

const getItemRevenue = (item: Order | Trip): number => {
  if (isOrder(item)) return item.totalCharges;
  if (isTrip(item)) return item.revenue;
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
      isOrder(item) ? item.createdTime : item.createdDateTime
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
  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: trips = [],
    isLoading: isLoadingTrips,
    error: tripsError,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: fetchTrips,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = isLoadingOrders || isLoadingTrips;

  const dashboardData = {
    topCustomers: getTopItemsByRevenue(orders, "billTo"),
    topCarriers: getTopItemsByRevenue(trips, "carriers"),
    topOrigins: getTopItems(trips, "pickupLocation"),
    topDestinations: getTopItems(trips, "deliveryLocation"),
    weeklyRevenue: getWeeklyRevenue([...orders, ...trips]),
  };

  // Debugging Logs
  useEffect(() => {
    if (orders.length > 0) {
      console.log("Orders fetched successfully:", orders);
    } else {
      console.log("No orders fetched");
    }
  }, [orders]);

  useEffect(() => {
    if (trips.length > 0) {
      console.log("Trips fetched successfully:", trips);
    } else {
      console.log("No trips fetched");
    }
  }, [trips]);

  useEffect(() => {
    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
    }
    if (tripsError) {
      console.error("Error fetching trips:", tripsError);
    }
  }, [ordersError, tripsError]);

  console.log("Dashboard Data:", {
    ordersCount: orders.length,
    tripsCount: trips.length,
    dashboardData,
  });

  return {
    dashboardData,
    isLoading,
  };
}
