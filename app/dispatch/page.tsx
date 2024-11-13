"use client";

import React, { useState } from "react";
import { TripDetailsModal } from "@/components/trips/TripDetailsModal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Trip } from "@/types/truckmate";
import Tabs from "@/components/Tabs";
import { useDispatch } from "@/hooks/useDispatch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

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
  trips: Trip[];
  statusColor: string;
  onTripClick: (trip: Trip) => void;
}

function DispatchColumn({
  title,
  trips,
  statusColor,
  onTripClick,
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
            {trips.map((trip, index) => (
              <Draggable
                key={trip.tripId}
                draggableId={trip.tripId.toString()}
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
                    onClick={() => onTripClick(trip)}
                  >
                    <div className='flex items-center justify-between mb-1'>
                      <div className='font-semibold truncate pr-1'>
                        {trip.pickupLocation} → {trip.deliveryLocation}
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
                      {trip.customer} |{" "}
                      {trip.carriers?.[0]?.name || "Unassigned"}
                    </div>
                    <div className='text-[11px] font-medium text-gray-800'>
                      {trip.scheduledStartDate}
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

export default function DispatchPage() {
  const [activeTab, setActiveTab] = useState("dispatch");
  const { trips, isLoading, error, filters, setFilters } = useDispatch();
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [dragConfirmation, setDragConfirmation] = useState<{
    isOpen: boolean;
    tripId: string | null;
    newStatus: string | null;
    sourceStatus: string | null;
  }>({
    isOpen: false,
    tripId: null,
    newStatus: null,
    sourceStatus: null,
  });

  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [carrierPhone, setCarrierPhone] = useState("");

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, source, destination } = result;

    // Don't show confirmation if dropped in same column
    if (source.droppableId === destination.droppableId) return;
    setDragConfirmation({
      isOpen: true,
      tripId: draggableId,
      newStatus: destination.droppableId,
      sourceStatus: source.droppableId,
    });
  };

  const handleStatusUpdate = (confirmed: boolean) => {
    if (confirmed && dragConfirmation.tripId && dragConfirmation.newStatus) {
      // Here you would typically make an API call to update the trip status
      console.log("Updating trip status:", {
        tripId: dragConfirmation.tripId,
        newStatus: dragConfirmation.newStatus,
        carrier: selectedCarrier,
        carrierPhone,
      });
    }
    setDragConfirmation({
      isOpen: false,
      tripId: null,
      newStatus: null,
      sourceStatus: null,
    });
    setSelectedCarrier("");
    setCarrierPhone("");
  };

  if (isLoading) {
    return (
      <div className='w-full h-[500px] bg-gray-200 flex justify-center items-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6'>
        <Alert variant='destructive'>
          <ExclamationTriangleIcon className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='p-6 text-gray-900'>
      {/* Tabs */}
      <div className='mb-6'>
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
      </div>

      {/* Filters */}
      <div className='mb-6 border rounded-lg p-4 bg-white'>
        <h2 className='font-bold mb-4 text-gray-900'>FILTERS</h2>
        <div className='grid grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='PLANNER'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={filters.planner}
              onChange={(e) =>
                setFilters({ ...filters, planner: e.target.value })
              }
            />
            <input
              type='date'
              className='border p-2 w-full text-gray-900'
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='CUSTOMER'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={filters.customer}
              onChange={(e) =>
                setFilters({ ...filters, customer: e.target.value })
              }
            />
            <input
              type='text'
              placeholder='CARRIER'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={filters.carrier}
              onChange={(e) =>
                setFilters({ ...filters, carrier: e.target.value })
              }
            />
          </div>
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='PICK REGION'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={filters.pickRegion}
              onChange={(e) =>
                setFilters({ ...filters, pickRegion: e.target.value })
              }
            />
            <input
              type='text'
              placeholder='DEL REGION'
              className='border p-2 w-full text-gray-900 placeholder-gray-500'
              value={filters.delRegion}
              onChange={(e) =>
                setFilters({ ...filters, delRegion: e.target.value })
              }
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
                trips={trips.available}
                statusColor={statusColors.NOT_STARTED}
                onTripClick={setSelectedTrip}
              />
              <DispatchColumn
                title='Planned'
                trips={trips.planned}
                statusColor={statusColors.CAUTION}
                onTripClick={setSelectedTrip}
              />
              <DispatchColumn
                title='PU TRACKING'
                trips={trips.puTracking}
                statusColor={statusColors.ON_TRACK}
                onTripClick={setSelectedTrip}
              />
              <DispatchColumn
                title='LOADING'
                trips={trips.loading}
                statusColor={statusColors.CAUTION}
                onTripClick={setSelectedTrip}
              />
              <DispatchColumn
                title='DEL TRACKING'
                trips={trips.delTracking}
                statusColor={statusColors.DELAYED}
                onTripClick={setSelectedTrip}
              />
              <DispatchColumn
                title='DELIVERING'
                trips={trips.delivering}
                statusColor={statusColors.DELAYED}
                onTripClick={setSelectedTrip}
              />
            </>
          )}
          {activeTab === "planning" && (
            <>
              <DispatchColumn
                title='Needs Appointments'
                trips={trips.needsAppointments}
                statusColor={statusColors.CAUTION}
                onTripClick={setSelectedTrip}
              />
              <DispatchColumn
                title='Needs Rates'
                trips={trips.needsRates}
                statusColor={statusColors.ON_TRACK}
                onTripClick={setSelectedTrip}
              />
              <DispatchColumn
                title='Assign Carrier'
                trips={trips.assignCarrier}
                statusColor={statusColors.DELAYED}
                onTripClick={setSelectedTrip}
              />
            </>
          )}
        </div>
      </DragDropContext>

      {/* Trip Details Modal */}
      <TripDetailsModal
        isOpen={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        trip={selectedTrip}
        onUpdate={() => {
          // Handle trip update
          setSelectedTrip(null);
        }}
      />

      {/* Status Change Confirmation Modal */}
      {dragConfirmation.isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full'>
            <h3 className='text-lg font-bold mb-4'>Confirm Status Change</h3>
            <p className='mb-4'>
              Are you sure you want to move this trip from &quot;
              {dragConfirmation.sourceStatus}&quot; to &quot;
              {dragConfirmation.newStatus}&quot;?
            </p>

            {dragConfirmation.sourceStatus === "Available" &&
              dragConfirmation.newStatus === "Planned" && (
                <div className='space-y-4 mb-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Assign Carrier *
                    </label>
                    <select
                      value={selectedCarrier}
                      onChange={(e) => setSelectedCarrier(e.target.value)}
                      className='w-full border rounded-md p-2'
                      required
                    >
                      <option value=''>Select a carrier</option>
                      <option value='Carrier A'>Carrier A</option>
                      <option value='Carrier B'>Carrier B</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Carrier Phone Number *
                    </label>
                    <input
                      type='tel'
                      value={carrierPhone}
                      onChange={(e) => setCarrierPhone(e.target.value)}
                      placeholder='Enter phone number'
                      className='w-full border rounded-md p-2'
                      required
                    />
                  </div>
                </div>
              )}

            <div className='flex justify-end gap-4'>
              <button
                onClick={() => handleStatusUpdate(false)}
                className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(true)}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                disabled={
                  dragConfirmation.newStatus === "Planned" &&
                  (!selectedCarrier || !carrierPhone)
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
