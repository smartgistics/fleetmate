"use client";

import { useState } from "react";
import { Vendor } from "@/types/truckmate";
import { useVendors } from "@/hooks/useVendors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type SortableFields = keyof Pick<
  Vendor,
  "vendorId" | "name" | "isActive" | "insurance" | "liability" | "vendorSince"
>;

export default function Carriers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortableFields>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCarrier, setSelectedCarrier] = useState<Vendor | null>(null);

  const { vendors: carriers, isLoading, error } = useVendors("linehaulCarrier");

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
      Object.values({
        name: carrier.name,
        vendorId: carrier.vendorId,
        city: carrier.city,
        province: carrier.province,
      })
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField]?.toString() || "";
      const bValue = b[sortField]?.toString() || "";
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  if (isLoading) {
    return (
      <div className='w-full h-[500px] flex justify-center items-center'>
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
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to load carriers"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Carriers</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Add Carrier
        </button>
      </div>

      {/* Search */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search carriers...'
          className='w-full px-4 py-2 border rounded'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr className='bg-gray-100'>
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
                onClick={() => handleSort("isActive")}
              >
                Status{" "}
                {sortField === "isActive" &&
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
                onClick={() => handleSort("liability")}
              >
                Liability{" "}
                {sortField === "liability" &&
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
          <tbody>
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
                <td className='px-6 py-4 border-b'>
                  {carrier.isActive === "True" ? "Active" : "Inactive"}
                </td>
                <td className='px-6 py-4 border-b'>{carrier.insurance}</td>
                <td className='px-6 py-4 border-b'>{carrier.liability}</td>
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
                <p>
                  {selectedCarrier.isActive === "True" ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <label className='font-medium'>Insurance</label>
                <p>{selectedCarrier.insurance}</p>
              </div>
              <div>
                <label className='font-medium'>Liability</label>
                <p>{selectedCarrier.liability}</p>
              </div>
              <div>
                <label className='font-medium'>Contact</label>
                <p>{selectedCarrier.contact}</p>
              </div>
              <div>
                <label className='font-medium'>Business Phone</label>
                <p>
                  {selectedCarrier.businessPhone}
                  {selectedCarrier.businessPhoneExt &&
                    ` ext. ${selectedCarrier.businessPhoneExt}`}
                </p>
              </div>
              <div>
                <label className='font-medium'>Fax</label>
                <p>{selectedCarrier.faxPhone}</p>
              </div>
              <div>
                <label className='font-medium'>Address</label>
                <p>
                  {selectedCarrier.address1}
                  {selectedCarrier.address2 && <br />}
                  {selectedCarrier.address2}
                  <br />
                  {selectedCarrier.city}, {selectedCarrier.province}{" "}
                  {selectedCarrier.postalCode}
                  <br />
                  {selectedCarrier.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
