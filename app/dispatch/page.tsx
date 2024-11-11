"use client";

import React, { useState } from "react";
import { mockShipments } from "@/mocks/Shipments";
import { ShipmentDetailsModal } from "@/components/shipments/ShipmentDetailsModal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Shipment } from "@/types";
import Tabs from "@/components/Tabs";

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

function DispatchColumn({
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
  needsAppointments: Shipment[];
  needsRates: Shipment[];
  assignCarrier: Shipment[];
}

export default function DispatchPage() {
  const [activeTab, setActiveTab] = useState("dispatch");
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments);
  const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );
  const [dragConfirmation, setDragConfirmation] = useState<{
    isOpen: boolean;
    shipmentId: string | null;
    newStatus: string | null;
    sourceStatus: string | null;
  }>({
    isOpen: false,
    shipmentId: null,
    newStatus: null,
    sourceStatus: null,
  });

  const [planner, setPlanner] = useState("");
  const [customer, setCustomer] = useState("");
  const [pickRegion, setPickRegion] = useState("");
  const [delRegion, setDelRegion] = useState("");
  const [carrier, setCarrier] = useState("");
  const [date, setDate] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState("");

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

    const { draggableId, source, destination } = result;

    // Don't show confirmation if dropped in same column
    if (source.droppableId === destination.droppableId) return;
    setDragConfirmation({
      isOpen: true,
      shipmentId: draggableId,
      newStatus: destination.droppableId,
      sourceStatus: source.droppableId,
    });
  };

  const handleStatusUpdate = (confirmed: boolean) => {
    if (confirmed) {
      setShipments((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id.toString() === dragConfirmation.shipmentId
            ? {
                ...shipment,
                dispatch_status:
                  dragConfirmation.newStatus || shipment.dispatch_status,
                ...(dragConfirmation.newStatus === "Planned" && {
                  carrier: selectedCarrier,
                }),
              }
            : shipment
        )
      );
    }
    setDragConfirmation({
      isOpen: false,
      shipmentId: null,
      newStatus: null,
      sourceStatus: null,
    });
    setSelectedCarrier(""); // Reset selected carrier
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
      needsAppointments: shipments.filter(
        (s) => s.planning_status === "Needs Appointments"
      ),
      needsRates: shipments.filter(
        (s) => s.planning_status === "Needs Rates"
      ),
      assignCarrier: shipments.filter(
        (s) => s.planning_status === "Assign Carrier"
      ),
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
      {/* Tabs Component */}
      <Tabs
        tabs={[
          { label: "Dispatch", value: "dispatch" },
          { label: "Planning", value: "planning" },
          { label: "Tracking", value: "tracking" },
          { label: "Billing", value: "billing" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

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
      </div>

      {/* Dispatch Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex min-h-[600px] border-l border-r border-gray-300 w-full bg-white'>
          {activeTab === "dispatch" && (
            <>
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
            </>
          )}
          {activeTab === "planning" && (
            <>
              <DispatchColumn
                title='Needs Appointments'
                shipments={displayShipments.needsAppointments}
                statusColor={statusColors.CAUTION}
                onShipmentClick={handleShipmentClick}
              />
              <DispatchColumn
                title='Needs Rates'
                shipments={displayShipments.needsRates}
                statusColor={statusColors.ON_TRACK}
                onShipmentClick={handleShipmentClick}
              />
              <DispatchColumn
                title='Assign Carrier'
                shipments={displayShipments.assignCarrier}
                statusColor={statusColors.DELAYED}
                onShipmentClick={handleShipmentClick}
              />
            </>
          )}
          {activeTab === "tracking" && (
            <>
              {/* Tracking Columns */}
            </>
          )}
          {activeTab === "billing" && (
            <>
              {/* Billing Columns */}
            </>
          )}
        </div>
      </DragDropContext>

      {/* Shipment Details Modal */}
      <ShipmentDetailsModal
        isOpen={isSlideoutOpen}
        onClose={handleCloseSlideout}
        shipment={selectedShipment}
      />

      {dragConfirmation.isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full'>
            <h3 className='text-lg font-bold mb-4'>Confirm Status Change</h3>
            <p className='mb-4'>
              Are you sure you want to move this shipment from &quot;
              {dragConfirmation.sourceStatus}&quot; to &quot;
              {dragConfirmation.newStatus}&quot;?
            </p>
            <div className='flex justify-end gap-4'>
              <button
                onClick={() => handleStatusUpdate(false)}
                className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(true)}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={
                  dragConfirmation.newStatus === "Planned" &&
                  selectedCarrier === ""
                }
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
