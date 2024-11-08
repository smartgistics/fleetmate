"use client";

import { useState } from "react";
import { Shipment } from "@/types";
import { mockShipments } from "@/mocks/Shipments";
import { ShipmentDetailsModal } from "@/components/shipments/ShipmentDetailsModal";
import { NewShipmentModal } from "@/components/shipments/NewShipmentModal";

export default function Shipments() {
  const [isNewShipmentModalOpen, setIsNewShipmentModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Shipment>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCarrier, setSelectedCarrier] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );

  // Get unique carriers for filter dropdown
  const uniqueCarriers = [
    ...new Set(mockShipments.map((ship) => ship.carrier)),
  ];

  // Handle sorting
  const handleSort = (field: keyof Shipment) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort shipments
  const filteredShipments = mockShipments
    .filter((shipment) => {
      const matchesSearch = Object.values(shipment)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCarrier =
        selectedCarrier === "all" || shipment.carrier === selectedCarrier;
      return matchesSearch && matchesCarrier;
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  return (
    <div className='p-6 text-gray-900'>
      {/* Rest of the JSX remains the same */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Shipments</h1>
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          onClick={() => setIsNewShipmentModalOpen(true)}
        >
          New Shipment
        </button>
      </div>

      {/* Filters */}
      <div className='mb-4 flex gap-4'>
        <input
          type='text'
          placeholder='Search shipments...'
          className='flex-1 px-4 py-2 border rounded text-gray-900 placeholder-gray-500'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className='border rounded px-4 py-2 text-gray-900'
          value={selectedCarrier}
          onChange={(e) => setSelectedCarrier(e.target.value)}
        >
          <option value='all'>All Carriers</option>
          {uniqueCarriers.map((carrier) => (
            <option key={carrier} value={carrier}>
              {carrier}
            </option>
          ))}
        </select>
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
                onClick={() => handleSort("carrier")}
              >
                Carrier{" "}
                {sortField === "carrier" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("customer")}
              >
                Customer{" "}
                {sortField === "customer" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("pickupLocation")}
              >
                Pickup Location{" "}
                {sortField === "pickupLocation" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("deliveryLocation")}
              >
                Delivery Location{" "}
                {sortField === "deliveryLocation" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("pickupDate")}
              >
                Pickup Date{" "}
                {sortField === "pickupDate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("deliveryDate")}
              >
                Delivery Date{" "}
                {sortField === "deliveryDate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("rate")}
              >
                Rate{" "}
                {sortField === "rate" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("dispatchStatus")}
              >
                Dispatch Status{" "}
                {sortField === "dispatchStatus" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("planner")}
              >
                Planner{" "}
                {sortField === "planner" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-900'>
            {filteredShipments.map((shipment) => (
              <tr
                key={shipment.id}
                className='hover:bg-gray-50 cursor-pointer'
                onClick={() => setSelectedShipment(shipment)}
              >
                <td className='px-6 py-4 border-b'>{shipment.id}</td>
                <td className='px-6 py-4 border-b'>{shipment.carrier}</td>
                <td className='px-6 py-4 border-b'>{shipment.customer}</td>
                <td className='px-6 py-4 border-b'>
                  {shipment.pickupLocation}
                </td>
                <td className='px-6 py-4 border-b'>
                  {shipment.deliveryLocation}
                </td>
                <td className='px-6 py-4 border-b'>{shipment.pickupDate}</td>
                <td className='px-6 py-4 border-b'>{shipment.deliveryDate}</td>
                <td className='px-6 py-4 border-b'>
                  ${shipment.rate.toLocaleString()}
                </td>
                <td className='px-6 py-4 border-b'>
                  {shipment.dispatchStatus}
                </td>
                <td className='px-6 py-4 border-b'>{shipment.planner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add the NewShipmentModal component if you have one */}
      {isNewShipmentModalOpen && (
        <NewShipmentModal
          isOpen={isNewShipmentModalOpen}
          onClose={() => setIsNewShipmentModalOpen(false)}
        />
      )}

      <ShipmentDetailsModal
        isOpen={!!selectedShipment}
        onClose={() => setSelectedShipment(null)}
        shipment={selectedShipment}
      />
    </div>
  );
}
