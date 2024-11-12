"use client";

import { useState } from "react";
import { Trip } from "@/types";
import { TripDetailsModal } from "@/components/trips/TripDetailsModal";
import { NewTripModal } from "@/components/trips/NewTripModal";
import { useTrips } from "@/hooks/useTruckMate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Trips() {
  const { trips, isLoading, error } = useTrips();
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Trip>("tripId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCarrier, setSelectedCarrier] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Get unique carriers for filter dropdown
  const uniqueCarriers = Array.isArray(trips)
    ? [
        ...new Set(
          trips
            .map((trip) => trip.carriers?.[0]?.carrierId)
            .filter((carrier): carrier is string => carrier !== undefined)
        ),
      ]
    : [];

  // Handle sorting
  const handleSort = (field: keyof Trip) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort trips
  const filteredTrips = Array.isArray(trips)
    ? trips
        .filter((trip) => {
          const matchesSearch = Object.values(trip)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesCarrier =
            selectedCarrier === "all" ||
            trip.carriers?.[0]?.carrierId === selectedCarrier;
          return matchesSearch && matchesCarrier;
        })
        .sort((a, b) => {
          if (sortDirection === "asc") {
            return (a[sortField] ?? "") > (b[sortField] ?? "") ? 1 : -1;
          }
          return (a[sortField] ?? "") < (b[sortField] ?? "") ? 1 : -1;
        })
    : [];

  const handleTripUpdate = (updatedTrip: Trip) => {
    console.log("Trip updated:", updatedTrip);
    setSelectedTrip(null);
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
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Trips</h1>
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          onClick={() => setIsNewTripModalOpen(true)}
        >
          New Trip
        </button>
      </div>

      {/* Filters */}
      <div className='mb-4 flex gap-4'>
        <input
          type='text'
          placeholder='Search trips...'
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
                onClick={() => handleSort("tripId")}
              >
                ID{" "}
                {sortField === "tripId" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className='px-6 py-3 border-b'>Carrier</th>
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
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortField === "status" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("revenue")}
              >
                Revenue{" "}
                {sortField === "revenue" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("scheduledStartDate")}
              >
                Start Date{" "}
                {sortField === "scheduledStartDate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-900'>
            {filteredTrips.map((trip) => (
              <tr
                key={trip.tripId}
                className='hover:bg-gray-50 cursor-pointer'
                onClick={() => setSelectedTrip(trip)}
              >
                <td className='px-6 py-4 border-b'>{trip.tripId}</td>
                <td className='px-6 py-4 border-b'>
                  {trip.carriers?.[0]?.name || "Unassigned"}
                </td>
                <td className='px-6 py-4 border-b'>{trip.customer}</td>
                <td className='px-6 py-4 border-b'>{trip.status}</td>
                <td className='px-6 py-4 border-b'>
                  ${trip.revenue.toLocaleString()}
                </td>
                <td className='px-6 py-4 border-b'>
                  {trip.scheduledStartDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewTripModal
        isOpen={isNewTripModalOpen}
        onClose={() => setIsNewTripModalOpen(false)}
      />

      <TripDetailsModal
        isOpen={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        trip={selectedTrip}
        onUpdate={handleTripUpdate}
      />
    </div>
  );
}
