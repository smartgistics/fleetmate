import { WeeklyData } from "@/types";
import { mockShipments } from "./Shipments";

// Helper function to get week start date
const getWeekStart = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - date.getDay());
  return newDate;
};

// Process shipments into weekly revenue data
const processWeeklyRevenue = (): WeeklyData[] => {
  const weeklyData = mockShipments.reduce<Record<string, WeeklyData>>(
    (acc, shipment) => {
      const date = new Date(shipment.pickupDate);
      const weekStart = getWeekStart(date);
      const weekKey = weekStart.toISOString().split("T")[0];

      if (!acc[weekKey]) {
        acc[weekKey] = {
          week: weekKey,
          revenue: 0,
          shipments: 0,
        };
      }

      acc[weekKey].revenue += shipment.rate;
      acc[weekKey].shipments += 1;

      return acc;
    },
    {}
  );

  return Object.values(weeklyData)
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
    .slice(-8); // Get last 8 weeks
};

export const mockRevenueData: WeeklyData[] = processWeeklyRevenue();
