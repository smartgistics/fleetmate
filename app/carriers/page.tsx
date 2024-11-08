"use client";

import { useState } from "react";
import { CarrierData } from "@/types";
import { mockShipments } from "@/mocks/Shipments";
import CarrierDetailsModal from "../../components/CarrierDetailsModal";

type SortableFields = keyof CarrierData;

// Process carrier data
const mockCarriers: CarrierData[] = Array.from(
  new Set(mockShipments.map((ship) => ship.carrier))
).map((carrier, index) => {
  const carrierShipments = mockShipments.filter(
    (ship) => ship.carrier === carrier
  );
  return {
    id: index + 1,
    name: carrier,
    totalShipments: carrierShipments.length,
    totalRevenue: carrierShipments.reduce((sum, ship) => sum + ship.rate, 0),
    avgShipmentRate: Math.round(
      carrierShipments.reduce((sum, ship) => sum + ship.rate, 0) /
        carrierShipments.length
    ),
    activeRoutes: Array.from(
      new Set(
        carrierShipments.map(
          (ship) => `${ship.pickupLocation} - ${ship.deliveryLocation}`
        )
      )
    ).length,
    lastShipmentDate: new Date(
      Math.max(
        ...carrierShipments.map((ship) => new Date(ship.deliveryDate).getTime())
      )
    )
      .toISOString()
      .split("T")[0],
  };
});

export default function Carriers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortableFields>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCarrier, setSelectedCarrier] = useState<CarrierData | null>(
    null
  );

  // Handle sorting
  const handleSort = (field: SortableFields) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort carriers
  const filteredCarriers = mockCarriers
    .filter((carrier) =>
      Object.values(carrier)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  return (
    <div className='p-6 text-gray-900'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Carriers</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Add Carrier
        </button>
      </div>

      {/* Search */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search carriers...'
          className='w-full px-4 py-2 border rounded text-gray-900 placeholder-gray-500'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr className='bg-gray-100 text-gray-900'>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("id")}
              >
                ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("name")}
              >
                Carrier Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("totalShipments")}
              >
                Total Shipments{" "}
                {sortField === "totalShipments" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("totalRevenue")}
              >
                Total Revenue{" "}
                {sortField === "totalRevenue" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("avgShipmentRate")}
              >
                Avg Rate{" "}
                {sortField === "avgShipmentRate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("activeRoutes")}
              >
                Active Routes{" "}
                {sortField === "activeRoutes" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("lastShipmentDate")}
              >
                Last Shipment{" "}
                {sortField === "lastShipmentDate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-900'>
            {filteredCarriers.map((carrier) => (
              <tr
                key={carrier.id}
                className='hover:bg-gray-50 cursor-pointer'
                onClick={() => setSelectedCarrier(carrier)}
              >
                <td className='px-6 py-4 border-b'>{carrier.id}</td>
                <td className='px-6 py-4 border-b font-medium'>
                  {carrier.name}
                </td>
                <td className='px-6 py-4 border-b'>{carrier.totalShipments}</td>
                <td className='px-6 py-4 border-b'>
                  ${carrier.totalRevenue.toLocaleString()}
                </td>
                <td className='px-6 py-4 border-b'>
                  ${carrier.avgShipmentRate.toLocaleString()}
                </td>
                <td className='px-6 py-4 border-b'>{carrier.activeRoutes}</td>
                <td className='px-6 py-4 border-b'>
                  {carrier.lastShipmentDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <CarrierDetailsModal
        isOpen={!!selectedCarrier}
        onClose={() => setSelectedCarrier(null)}
        carrier={selectedCarrier}
      />
    </div>
  );
}
