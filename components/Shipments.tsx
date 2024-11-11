"use client";

import { useState } from "react";
import { Shipment } from "@/types";
import { mockShipments } from "@/mocks/Shipments";
import { ShipmentsFilters } from "./shipments/filters/ShipmentsFilters";
import { ShipmentsTableHeader } from "./shipments/table/ShipmentsTableHeader";
import { ShipmentsTableRow } from "./shipments/table/ShipmentsTableRow";
import { ShipmentDetailsModal } from "@/components/shipments/ShipmentDetailsModal";

interface ShipmentsProps {
  setIsNewShipmentModalOpen: (isOpen: boolean) => void;
}

export function Shipments({ setIsNewShipmentModalOpen }: ShipmentsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Shipment>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCarrier, setSelectedCarrier] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments);

  const uniqueCarriers = [...new Set(mockShipments.map((ship) => ship.carrier))];

  const handleSort = (field: keyof Shipment) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredShipments = shipments
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
        return (a[sortField] ?? "") > (b[sortField] ?? "") ? 1 : -1;
      }
      return (a[sortField] ?? "") < (b[sortField] ?? "") ? 1 : -1;
    });

  const handleShipmentUpdate = (updatedShipment: Shipment) => {
    // Update both the shipments array and the selected shipment
    const updatedShipments = shipments.map((shipment) =>
      shipment.id === updatedShipment.id ? updatedShipment : shipment
    );
    setShipments(updatedShipments);
    setSelectedShipment(updatedShipment); // Update the selected shipment as well
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Shipments</h1>
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          onClick={() => setIsNewShipmentModalOpen(true)}
        >
          New Shipment
        </button>
      </div>

      <ShipmentsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCarrier={selectedCarrier}
        setSelectedCarrier={setSelectedCarrier}
        uniqueCarriers={uniqueCarriers.filter((carrier) => carrier !== undefined) as string[]}
      />

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <ShipmentsTableHeader
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <ShipmentsTableRow
                key={shipment.id}
                shipment={shipment}
                onClick={() => setSelectedShipment(shipment)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ShipmentDetailsModal
        isOpen={!!selectedShipment}
        onClose={() => setSelectedShipment(null)}
        shipment={selectedShipment}
        onUpdate={handleShipmentUpdate}
      />
    </div>
  );
}

export default Shipments;
