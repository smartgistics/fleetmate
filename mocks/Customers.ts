import { CustomerData } from "@/types";
import { mockShipments } from "./Shipments";

function getMostFrequent(arr: string[]): string {
  return Object.entries(
    arr.reduce<Record<string, number>>((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {})
  ).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}

export const mockCustomers: CustomerData[] = Array.from(
  new Set(mockShipments.map((ship) => ship.customer))
).map((customerName) => {
  const customerShipments = mockShipments.filter(
    (ship) => ship.customer === customerName
  );
  return {
    id: customerShipments[0].id,
    name: customerName,
    totalShipments: customerShipments.length,
    totalSpent: customerShipments.reduce(
      (sum, ship) => sum + (ship.rate || 0),
      0
    ),
    avgShipmentCost: Math.round(
      customerShipments.reduce((sum, ship) => sum + (ship.rate || 0), 0) /
        customerShipments.length
    ),
    commonLocations: {
      pickup: getMostFrequent(
        customerShipments
          .map((ship) => ship.pickupLocation)
          .filter((location): location is string => !!location)
      ),
      delivery: getMostFrequent(
        customerShipments
          .map((ship) => ship.deliveryLocation)
          .filter((location): location is string => !!location)
      ),
    },
    lastShipmentDate: customerShipments.sort(
      (a, b) =>
        new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime()
    )[0].deliveryDate,
    primaryContact: "John Smith", // Default values for demo
    contactPhone: "555-0123",
    contactEmail: "contact@example.com",
    defaultEquipment: "53' Dry Van",
    requiresTemperatureControl: true,
    defaultTempMin: "34",
    defaultTempMax: "36",
  };
});
