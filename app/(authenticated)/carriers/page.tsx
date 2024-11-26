"use client";

import { useState } from "react";
import { Vendor } from "@/types/truckmate";
import { useVendors } from "@/hooks/useVendors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Pagination } from "@/components/ui/pagination";

const DEFAULT_LIMIT = 20;

type SortableFields = keyof Pick<
  Vendor,
  "vendorId" | "name" | "isActive" | "insurance" | "liability" | "vendorSince"
>;

export default function Carriers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortableFields>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCarrier, setSelectedCarrier] = useState<Vendor | null>(null);

  const {
    vendors: carriers,
    isLoading,
    error,
    total,
    params,
    updateParams,
  } = useVendors("interliner", {
    limit: DEFAULT_LIMIT,
    offset: 0,
    orderBy: `${sortField} ${sortDirection}`,
    filter: "isInactive eq 'True'",
  });

  const handleSort = (field: SortableFields) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    updateParams({ orderBy: `${field} ${newDirection}` });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filter = term
      ? `isActive eq 'True' and (contains(name,'${term}') or contains(vendorId,'${term}') or contains(city,'${term}') or contains(province,'${term}'))`
      : "isActive eq 'True'";
    updateParams({ filter, offset: 0 });
  };

  const handleOffsetChange = (newOffset: number) => {
    updateParams({ offset: newOffset });
  };

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

  const currentPage =
    Math.floor((params.offset || 0) / (params.limit || DEFAULT_LIMIT)) + 1;

  return (
    <div className='p-4 sm:p-6 text-gray-900'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Carriers</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
          Add Carrier
        </button>
      </div>

      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search carriers...'
          className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto rounded-lg shadow'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr className='bg-gray-50'>
              <th
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort("vendorId")}
              >
                ID{" "}
                {sortField === "vendorId" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort("name")}
              >
                Carrier Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort("isActive")}
              >
                Status{" "}
                {sortField === "isActive" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort("insurance")}
              >
                Insurance{" "}
                {sortField === "insurance" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort("liability")}
              >
                Liability{" "}
                {sortField === "liability" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort("vendorSince")}
              >
                Vendor Since{" "}
                {sortField === "vendorSince" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {carriers.map((carrier) => (
              <tr
                key={carrier.vendorId}
                className='hover:bg-gray-50 cursor-pointer'
                onClick={() => setSelectedCarrier(carrier)}
              >
                <td className='px-6 py-4 text-gray-900'>{carrier.vendorId}</td>
                <td className='px-6 py-4 text-gray-900 font-medium'>
                  {carrier.name}
                </td>
                <td className='px-6 py-4 text-gray-900'>
                  {carrier.isInactive === "True" ? "Active" : "Inactive"}
                </td>
                <td className='px-6 py-4 text-gray-900'>{carrier.insurance}</td>
                <td className='px-6 py-4 text-gray-900'>{carrier.liability}</td>
                <td className='px-6 py-4 text-gray-900'>
                  {carrier.vendorSince}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total > (params.limit || DEFAULT_LIMIT) && (
        <div className='mt-6'>
          <Pagination
            currentPage={currentPage}
            pageSize={params.limit || DEFAULT_LIMIT}
            total={total}
            onPageChange={(page) =>
              handleOffsetChange((page - 1) * (params.limit || DEFAULT_LIMIT))
            }
          />
        </div>
      )}

      {selectedCarrier && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg p-6 max-w-2xl w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold text-gray-900'>
                Carrier Details
              </h2>
              <button
                onClick={() => setSelectedCarrier(null)}
                className='text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='font-medium text-gray-700'>Name</label>
                <p className='text-gray-900'>{selectedCarrier.name}</p>
              </div>
              <div>
                <label className='font-medium text-gray-700'>Status</label>
                <p className='text-gray-900'>
                  {selectedCarrier.isActive === "True" ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <label className='font-medium text-gray-700'>Insurance</label>
                <p className='text-gray-900'>{selectedCarrier.insurance}</p>
              </div>
              <div>
                <label className='font-medium text-gray-700'>Liability</label>
                <p className='text-gray-900'>{selectedCarrier.liability}</p>
              </div>
              <div>
                <label className='font-medium text-gray-700'>Contact</label>
                <p className='text-gray-900'>{selectedCarrier.contact}</p>
              </div>
              <div>
                <label className='font-medium text-gray-700'>
                  Business Phone
                </label>
                <p className='text-gray-900'>
                  {selectedCarrier.businessPhone}
                  {selectedCarrier.businessPhoneExt &&
                    ` ext. ${selectedCarrier.businessPhoneExt}`}
                </p>
              </div>
              <div>
                <label className='font-medium text-gray-700'>Fax</label>
                <p className='text-gray-900'>{selectedCarrier.faxPhone}</p>
              </div>
              <div>
                <label className='font-medium text-gray-700'>Address</label>
                <p className='text-gray-900'>
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
