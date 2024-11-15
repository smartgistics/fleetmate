import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { fetchOrders, fetchTrips } from "@/services/truckMateService";
import {
  Order,
  Trip,
  OrdersResponse,
  TripsResponse,
  TruckMateQueryParams,
  TripsQueryParams,
} from "@/types/truckmate";
import { WeeklyData, CountItem, RevenueItem } from "@/types/dashboard";

// Type guards
const isOrder = (item: Order | Trip): item is Order => {
  return "billToCode" in item && "totalCharges" in item;
};

// Utility types
type CommonKeys = keyof (Order & Trip);
type OrderOnlyKeys = Exclude<keyof Order, CommonKeys>;
type TripOnlyKeys = Exclude<keyof Trip, CommonKeys>;
type ValidKeys = CommonKeys | OrderOnlyKeys | TripOnlyKeys;

type FetchResponse = OrdersResponse | TripsResponse;

// Add these functions after the type definitions and before getTopItemsByRevenue

const getItemValue = (item: Order | Trip, key: ValidKeys): string => {
  if (isOrder(item)) {
    if (key === "billToCode") {
      return item.billToCustomer?.name || item.billToCode || "Unknown";
    }
    if (key in item) return String(item[key as keyof Order] || "Unknown");
  }
  if (key === "carriers" && "carriers" in item && item.carriers?.[0]) {
    return (
      item.carriers[0].vendor?.name ||
      item.carriers[0].vendor?.vendorId ||
      item.carriers[0].vendorId ||
      "Unknown"
    );
  }
  if (key === "originZone" && !isOrder(item)) {
    return item.origZoneDesc || item.originZone || "Unknown";
  }
  if (key === "destinationZone" && !isOrder(item)) {
    return item.destZoneDesc || item.destinationZone || "Unknown";
  }
  if (key in item) {
    if (!isOrder(item)) {
      return String(item[key as keyof Trip] || "Unknown");
    }
    return String(item[key as keyof Order] || "Unknown");
  }
  return "Unknown";
};

const getItemRevenue = (item: Order | Trip): number => {
  if (isOrder(item)) {
    return item.totalCharges || 0;
  }
  return 0; // For trips, we currently don't have revenue data
};

const getTopItems = (
  array: (Order | Trip)[],
  key: keyof Trip,
  limit = 5
): CountItem[] => {
  const tripsOnly = array.filter((item): item is Trip => !isOrder(item));

  const counts = tripsOnly.reduce<Record<string, number>>((acc, item) => {
    let value: string;

    if (key === "carriers") {
      value =
        item.carriers?.[0]?.vendor?.name ||
        item.carriers?.[0]?.vendor?.vendorId ||
        item.carriers?.[0]?.vendorId ||
        "Unknown";
    } else if (key === "originZone") {
      value = item.origZoneDesc || item.originZone || "Unknown";
    } else if (key === "destinationZone") {
      value = item.destZoneDesc || item.destinationZone || "Unknown";
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
  // Get the current date
  const today = new Date();

  // Create an array of the last 8 weeks
  const lastEightWeeks = Array.from({ length: 8 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (date.getDay() + 7 * i));
    return date.toISOString().split("T")[0];
  }).reverse();

  // Initialize weekly data with zero values
  const initialWeeklyData = lastEightWeeks.reduce<Record<string, WeeklyData>>(
    (acc, weekStart) => {
      acc[weekStart] = {
        week: weekStart,
        revenue: 0,
        shipments: 0,
      };
      return acc;
    },
    {}
  );

  // Aggregate actual data
  const weeklyData = items.reduce<Record<string, WeeklyData>>((acc, item) => {
    const date = new Date(isOrder(item) ? item.createdTime : item.eTD || "");
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split("T")[0];

    if (acc[weekKey]) {
      acc[weekKey].revenue += isOrder(item) ? item.totalCharges || 0 : 0;
      acc[weekKey].shipments += 1;
    }

    return acc;
  }, initialWeeklyData);

  return Object.values(weeklyData).sort(
    (a, b) => new Date(a.week).getTime() - new Date(b.week).getTime()
  );
};

// Update the fetchAllPages function to be more type-safe
const fetchAllPages = async <
  T extends FetchResponse,
  P extends TruckMateQueryParams
>(
  fetchFn: (params: P) => Promise<T>,
  queryParams: P,
  maxRecords = 500
): Promise<(Order | Trip)[]> => {
  const results: (Order | Trip)[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore && results.length < maxRecords) {
    const response = await fetchFn({
      ...queryParams,
      offset,
      limit: 100,
    });

    const items = "orders" in response ? response.orders : response.trips;
    if (items && items.length > 0) {
      results.push(...items);
    }

    hasMore = (items?.length || 0) === 100 && results.length < maxRecords;
    offset += 100;
  }

  return results;
};

export function useDashboard() {
  // Calculate date range for last 8 weeks
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Format dates for API filter
  const fromDate = thirtyDaysAgo.toISOString().split("T")[0];
  const toDate = today.toISOString().split("T")[0];

  const orderParams: Required<
    Pick<
      TruckMateQueryParams,
      "limit" | "orderBy" | "select" | "filter" | "expand"
    >
  > = {
    limit: 100,
    orderBy: "totalCharges desc",
    select: ["orderId", "billToCode", "totalCharges", "createdTime"],
    expand: ["billToCustomer"],
    filter: `createdTime ge '${fromDate}' and createdTime le '${toDate}' and totalCharges gt 0`,
  };

  const tripParams: TruckMateQueryParams = {
    limit: 100,
    orderBy: "eTD desc",
    expand: ["carriers"],
    select: [
      "tripNumber",
      "originZone",
      "origZoneDesc",
      "destinationZone",
      "destZoneDesc",
      "eTD",
    ],
    filter: `eTD ge '${fromDate}' and eTD le '${toDate}' and status ne 'CANCL'`,
  };

  // Function to fetch all pages
  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useQuery({
    queryKey: ["orders", orderParams],
    queryFn: () =>
      fetchAllPages<OrdersResponse, TruckMateQueryParams>(
        fetchOrders,
        orderParams,
        500
      ),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: trips = [],
    isLoading: isLoadingTrips,
    error: tripsError,
  } = useQuery({
    queryKey: ["trips", tripParams],
    queryFn: () =>
      fetchAllPages<TripsResponse, TripsQueryParams>(
        fetchTrips,
        { ...tripParams, codeBehavior: "assignment" } as TripsQueryParams,
        500
      ),
    staleTime: 1000 * 60 * 5,
  });

  const dashboardData = useMemo(
    () => ({
      topCustomers: getTopItemsByRevenue(orders, "billToCode"),
      topCarriers: getTopItemsByRevenue(trips, "carriers"),
      topOrigins: getTopItems(trips, "originZone"),
      topDestinations: getTopItems(trips, "destinationZone"),
      weeklyRevenue: getWeeklyRevenue([...orders, ...trips]),
    }),
    [orders, trips]
  );

  // Debugging Logs
  useEffect(() => {
    if (orders.length > 0) {
      console.log("Orders fetched successfully:", {
        orders: orders.length,
        dateRange: `${fromDate} to ${toDate}`,
      });
    }
  }, [orders, fromDate, toDate]);

  useEffect(() => {
    if (trips.length > 0) {
      console.log("Trips fetched successfully:", {
        trips: trips.length,
        dateRange: `${fromDate} to ${toDate}`,
      });
    }
  }, [trips, fromDate, toDate]);

  return {
    dashboardData,
    isLoading: isLoadingOrders || isLoadingTrips,
    error: ordersError || tripsError,
    ordersCount: orders.length,
    tripsCount: trips.length,
  };
}
