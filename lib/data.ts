import { WeeklyData, CountItem, RevenueItem } from "@/types/dashboard";
import { Trip, Order } from "@/types/truckmate";
import { fetchOrders, fetchTrips } from "@/services/truckMateService";

// Type guards
const isOrder = (item: Order | Trip): item is Order => {
  return "billToCode" in item && "totalCharges" in item;
};

const isTrip = (item: Order | Trip): item is Trip => {
  return "carriers" in item && "revenue" in item;
};

// Utility types
type CommonKeys = keyof (Order & Trip);
type OrderOnlyKeys = Exclude<keyof Order, CommonKeys>;
type TripOnlyKeys = Exclude<keyof Trip, CommonKeys>;
type ValidKeys = CommonKeys | OrderOnlyKeys | TripOnlyKeys;

export async function getWeeklyRevenue(): Promise<WeeklyData[]> {
  try {
    const [orders, trips] = await Promise.all([fetchOrders(), fetchTrips()]);
    const allItems = [...orders.orders, ...trips.trips];

    const weeklyData = allItems.reduce<Record<string, WeeklyData>>(
      (acc, item) => {
        const date = new Date(
          isOrder(item) ? item.createdTime : new Date(item.eTA || "")
        );
        const weekStart = new Date(
          date.setDate(date.getDate() - date.getDay())
        );
        const weekKey = weekStart.toISOString().split("T")[0];

        if (!acc[weekKey]) {
          acc[weekKey] = {
            week: weekKey,
            revenue: 0,
            shipments: 0,
          };
        }

        acc[weekKey].revenue += isOrder(item) ? item.totalCharges : 0;
        acc[weekKey].shipments += 1;

        return acc;
      },
      {}
    );

    return Object.values(weeklyData)
      .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
      .slice(-8);
  } catch (error) {
    console.error("Failed to fetch weekly revenue:", error);
    return [];
  }
}

export async function getTopItems(
  key: keyof Trip,
  limit = 5
): Promise<CountItem[]> {
  try {
    const trips = await fetchTrips();

    const counts = trips.trips.reduce<Record<string, number>>((acc, trip) => {
      let value: string;

      if (key === "carriers") {
        value = trip.carriers?.[0]?.vendorId || "Unknown";
      } else if (key === "originZone" || key === "destinationZone") {
        value = String(trip[key] || "Unknown");
      } else {
        value = String(trip[key] || "Unknown");
      }

      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));
  } catch (error) {
    console.error("Failed to fetch top items:", error);
    return [];
  }
}

export async function getTopItemsByRevenue(
  key: ValidKeys,
  limit = 5
): Promise<RevenueItem[]> {
  try {
    const [orders, trips] = await Promise.all([fetchOrders(), fetchTrips()]);
    const allItems = [...orders.orders, ...trips.trips];

    const revenue = allItems.reduce<Record<string, number>>((acc, item) => {
      let value: string;

      if (isOrder(item)) {
        value = String(item[key as keyof Order] || "Unknown");
      } else if (isTrip(item)) {
        if (key === "carriers") {
          value = item.carriers?.[0]?.vendorId || "Unknown";
        } else {
          value = String(item[key as keyof Trip] || "Unknown");
        }
      } else {
        value = "Unknown";
      }

      const amount = isOrder(item) ? item.totalCharges : 0;
      acc[value] = (acc[value] || 0) + amount;
      return acc;
    }, {});

    return Object.entries(revenue)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name, total]) => ({ name, total }));
  } catch (error) {
    console.error("Failed to fetch top items by revenue:", error);
    return [];
  }
}
