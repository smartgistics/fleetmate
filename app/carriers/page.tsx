"use client";

import { useState } from "react";
import { Vendor } from "@/types/truckmate";
import { useQuery } from "@tanstack/react-query";
import { fetchVendors } from "@/services/truckMateService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type SortableFields = keyof Vendor;

export default function Carriers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortableFields>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCarrier, setSelectedCarrier] = useState<Vendor | null>(null);

  const {
    data: carriers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => fetchVendors("linehaulCarrier"), // Filter for carriers only
  });

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
  const filteredCarriers = carriers
    .filter((carrier) =>
      Object.values(carrier)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return (a[sortField] ?? "") > (b[sortField] ?? "") ? 1 : -1;
      }
      return (a[sortField] ?? "") < (b[sortField] ?? "") ? 1 : -1;
    });

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
                onClick={() => handleSort("vendorId")}
              >
                ID{" "}
                {sortField === "vendorId" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
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
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortField === "status" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("dotNumber")}
              >
                DOT Number{" "}
                {sortField === "dotNumber" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("insurance")}
              >
                Insurance{" "}
                {sortField === "insurance" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("vendorSince")}
              >
                Vendor Since{" "}
                {sortField === "vendorSince" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-900'>
            {filteredCarriers.map((carrier) => (
              <tr
                key={carrier.vendorId}
                className='hover:bg-gray-50 cursor-pointer'
                onClick={() => setSelectedCarrier(carrier)}
              >
                <td className='px-6 py-4 border-b'>{carrier.vendorId}</td>
                <td className='px-6 py-4 border-b font-medium'>
                  {carrier.name}
                </td>
                <td className='px-6 py-4 border-b'>{carrier.status}</td>
                <td className='px-6 py-4 border-b'>{carrier.dotNumber}</td>
                <td className='px-6 py-4 border-b'>{carrier.insurance}</td>
                <td className='px-6 py-4 border-b'>{carrier.vendorSince}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedCarrier && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg p-6 max-w-2xl w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Carrier Details</h2>
              <button
                onClick={() => setSelectedCarrier(null)}
                className='text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='font-medium'>Name</label>
                <p>{selectedCarrier.name}</p>
              </div>
              <div>
                <label className='font-medium'>Status</label>
                <p>{selectedCarrier.status}</p>
              </div>
              <div>
                <label className='font-medium'>DOT Number</label>
                <p>{selectedCarrier.dotNumber}</p>
              </div>
              <div>
                <label className='font-medium'>Insurance</label>
                <p>{selectedCarrier.insurance}</p>
              </div>
              <div>
                <label className='font-medium'>Contact</label>
                <p>{selectedCarrier.contact}</p>
              </div>
              <div>
                <label className='font-medium'>Email</label>
                <p>{selectedCarrier.email}</p>
              </div>
              <div>
                <label className='font-medium'>Phone</label>
                <p>{selectedCarrier.businessPhone}</p>
              </div>
              <div>
                <label className='font-medium'>Address</label>
                <p>
                  {selectedCarrier.address1}
                  {selectedCarrier.address2 && `, ${selectedCarrier.address2}`}
                  <br />
                  {selectedCarrier.city}, {selectedCarrier.province}{" "}
                  {selectedCarrier.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
