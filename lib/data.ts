import { Shipment, WeeklyData } from "@/types";
import { mockShipments } from "@/mocks/Shipments";

export async function getWeeklyRevenue(): Promise<WeeklyData[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const weeklyData = mockShipments.reduce<Record<string, WeeklyData>>(
    (acc, shipment) => {
      const date = new Date(shipment.pickupDate ?? "");
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
      const weekKey = weekStart.toISOString().split("T")[0];

      if (!acc[weekKey]) {
        acc[weekKey] = {
          week: weekKey,
          revenue: 0,
          shipments: 0,
        };
      }

      acc[weekKey].revenue += shipment.rate || 0;
      acc[weekKey].shipments += 1;

      return acc;
    },
    {}
  );

  return Object.values(weeklyData)
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
    .slice(-8);
}

export async function getTopItems(key: keyof Shipment, limit = 5) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const counts = mockShipments.reduce<Record<string, number>>((acc, item) => {
    const value = item[key] as string;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export async function getTopItemsByRevenue(key: keyof Shipment, limit = 5) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const revenue = mockShipments.reduce<Record<string, number>>((acc, item) => {
    const value = item[key] as string;
    acc[value] = (acc[value] || 0) + (item.rate || 0);
    return acc;
  }, {});

  return Object.entries(revenue)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, total]) => ({ name, total }));
}
