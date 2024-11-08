"use client";

import React, { useState } from "react";
import { mockShipments } from "@/mocks/Shipments";
import ShipmentDetailsModal from "@/components/shipments/ShipmentDetailsModal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Shipment } from "@/types";

interface StatusColors {
  NOT_STARTED: string;
  CAUTION: string;
  ON_TRACK: string;
  DELAYED: string;
}

const statusColors: StatusColors = {
  NOT_STARTED: "bg-blue-200",
  CAUTION: "bg-yellow-200",
  ON_TRACK: "bg-green-200",
  DELAYED: "bg-red-200",
};

interface DispatchColumnProps {
  title: string;
  shipments: Shipment[];
  statusColor: string;
  onShipmentClick: (shipment: Shipment) => void;
}

export function DispatchColumn({
  title,
  shipments,
  statusColor,
  onShipmentClick,
}: DispatchColumnProps) {
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex-1 min-w-[200px] border-r border-gray-300 last:border-r-0 px-2 
            ${snapshot.isDraggingOver ? "bg-gray-50" : ""}`}
        >
          <h3 className='font-bold mb-2 text-center bg-gray-100 py-1 text-sm text-gray-900'>
            {title}
          </h3>
          <div className='space-y-1'>
            {shipments.map((shipment, index) => (
              <Draggable
                key={shipment.id}
                draggableId={shipment.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-2 rounded text-xs ${statusColor} text-gray-900
                      hover:opacity-80 hover:shadow-md transition-all duration-200
                      ${snapshot.isDragging ? "shadow-lg" : ""}`}
                    onClick={() => onShipmentClick(shipment)}
                  >
                    <div className='flex items-center justify-between mb-1'>
                      <div className='font-semibold truncate pr-1'>
                        {shipment.pickupLocation} → {shipment.deliveryLocation}
                      </div>
                      <div className='text-gray-700 flex-shrink-0'>
                        <svg
                          className='w-3 h-3'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M8 6h8v2H8V6zm0 4h8v2H8v-2zm0 4h8v2H8v-2z' />
                        </svg>
                      </div>
                    </div>
                    <div className='truncate text-[11px] text-gray-800'>
                      {shipment.customer} | {shipment.carrier}
                    </div>
                    <div className='text-[11px] font-medium text-gray-800'>
                      {new Date(shipment.pickupDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

interface FilteredShipments {
  available: Shipment[];
  planned: Shipment[];
  puTracking: Shipment[];
  loading: Shipment[];
  delTracking: Shipment[];
  delivering: Shipment[];
}

export default function DispatchPage() {
  const [planner, setPlanner] = useState("");
  const [customer, setCustomer] = useState("");
  const [pickRegion, setPickRegion] = useState("");
  const [date, setDate] = useState("");
  const [carrier, setCarrier] = useState("");
  const [delRegion, setDelRegion] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );
  const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments);

  const handleShipmentClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsSlideoutOpen(true);
  };

  const handleCloseSlideout = () => {
    setIsSlideoutOpen(false);
    setSelectedShipment(null);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    setShipments((prevShipments) =>
      prevShipments.map((shipment) =>
        shipment.id.toString() === draggableId
          ? { ...shipment, dispatch_status: newStatus }
          : shipment
      )
    );
  };

  const distributeShipments = (): FilteredShipments => {
    return {
      available: shipments.filter((s) => s.dispatch_status === "Available"),
      planned: shipments.filter((s) => s.dispatch_status === "Planned"),
      puTracking: shipments.filter((s) => s.dispatch_status === "PU TRACKING"),
      loading: shipments.filter((s) => s.dispatch_status === "LOADING"),
      delTracking: shipments.filter(
        (s) => s.dispatch_status === "DEL TRACKING"
      ),
      delivering: shipments.filter((s) => s.dispatch_status === "DELIVERING"),
    };
  };

  const filteredShipments = distributeShipments();

  const applyFilters = (shipments: FilteredShipments): FilteredShipments => {
    return Object.keys(shipments).reduce<FilteredShipments>((acc, key) => {
      const k = key as keyof FilteredShipments;
      acc[k] = shipments[k].filter((shipment) => {
        return (
          (!planner ||
            shipment.planner.toLowerCase().includes(planner.toLowerCase())) &&
          (!customer ||
            shipment.customer.toLowerCase().includes(customer.toLowerCase())) &&
          (!pickRegion ||
            shipment.pickupLocation
              .toLowerCase()
              .includes(pickRegion.toLowerCase())) &&
          (!delRegion ||
            shipment.deliveryLocation
              .toLowerCase()
              .includes(delRegion.toLowerCase())) &&
          (!carrier ||
            shipment.carrier.toLowerCase().includes(carrier.toLowerCase()))
        );
      });
      return acc;
    }, {} as FilteredShipments);
  };

  const displayShipments = applyFilters(filteredShipments);

  return (
    <div className='p-4 text-gray-900'>
      {/* Filters Section */}
      <div className='mb-6 border rounded-lg p-4 bg-white'>
        <h2 className='font-bold mb-4 text-gray-900'>FILTERS</h2>
        <div className='grid grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='PLANNER'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={planner}
              onChange={(e) => setPlanner(e.target.value)}
            />
            <div className='flex gap-2'>
              <input
                type='date'
                className='border p-2 flex-1 text-gray-900'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <select className='border p-2 w-20 text-gray-900'>
                <option>+/-</option>
                <option>+1</option>
                <option>-1</option>
              </select>
            </div>
          </div>
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='CUSTOMER'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <input
              type='text'
              placeholder='CARRIER'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='PICK REGION'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={pickRegion}
              onChange={(e) => setPickRegion(e.target.value)}
            />
            <input
              type='text'
              placeholder='DEL REGION'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={delRegion}
              onChange={(e) => setDelRegion(e.target.value)}
            />
          </div>
        </div>

        {/* Status Legend */}
        <div className='mt-4 flex justify-end gap-2'>
          <div
            className={`${statusColors.NOT_STARTED} px-2 py-1 text-sm text-gray-900`}
          >
            NOT STARTED
          </div>
          <div
            className={`${statusColors.CAUTION} px-2 py-1 text-sm text-gray-900`}
          >
            CAUTION
          </div>
          <div
            className={`${statusColors.ON_TRACK} px-2 py-1 text-sm text-gray-900`}
          >
            ON TRACK
          </div>
          <div
            className={`${statusColors.DELAYED} px-2 py-1 text-sm text-gray-900`}
          >
            DELAYED/BLOCKED
          </div>
        </div>
      </div>

      {/* Dispatch Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex min-h-[600px] border-l border-r border-gray-300 w-full bg-white'>
          <DispatchColumn
            title='Available'
            shipments={displayShipments.available}
            statusColor={statusColors.NOT_STARTED}
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn
            title='Planned'
            shipments={displayShipments.planned}
            statusColor={statusColors.CAUTION}
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn
            title='PU TRACKING'
            shipments={displayShipments.puTracking}
            statusColor={statusColors.ON_TRACK}
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn
            title='LOADING'
            shipments={displayShipments.loading}
            statusColor={statusColors.CAUTION}
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn
            title='DEL TRACKING'
            shipments={displayShipments.delTracking}
            statusColor={statusColors.DELAYED}
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn
            title='DELIVERING'
            shipments={displayShipments.delivering}
            statusColor={statusColors.DELAYED}
            onShipmentClick={handleShipmentClick}
          />
        </div>
      </DragDropContext>

      {/* Add the ShipmentDetailsModal */}
      <ShipmentDetailsModal
        isOpen={isSlideoutOpen}
        onClose={handleCloseSlideout}
        shipment={selectedShipment}
      />
    </div>
  );
}
