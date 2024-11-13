"use client";

import { useState } from "react";
import { Client } from "@/types/truckmate";
import { useCustomers } from "@/hooks/useTruckMate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CustomerDetailsModal from "@/components/CustomerDetailsModal";
import { Pagination } from "@/components/ui/pagination";

const DEFAULT_LIMIT = 20;

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Client>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null);

  const { customers, isLoading, error, total, params, updateParams } =
    useCustomers({
      limit: DEFAULT_LIMIT,
      offset: 0,
      orderBy: `${sortField} ${sortDirection}`,
    });

  // Handle sorting
  const handleSort = (field: keyof Client) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    updateParams({ orderBy: `${field} ${newDirection}` });
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    updateParams({ search: term, offset: 0 }); // Reset to first record on new search
  };

  // Handle pagination
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
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Calculate current page from offset and limit
  const currentPage =
    Math.floor((params.offset || 0) / (params.limit || DEFAULT_LIMIT)) + 1;

  return (
    <div className='p-6 text-gray-900'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Customers</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Add Customer
        </button>
      </div>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search customers...'
          className='w-full px-4 py-2 border rounded'
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto shadow'>
        <table className='min-w-full bg-white rounded-lg border'>
          <thead>
            <tr className='bg-gray-100'>
              {[
                { key: "name", label: "Customer Name" },
                { key: "type", label: "Type" },
                { key: "status", label: "Status" },
                { key: "creditStatus", label: "Credit Status" },
                { key: "accountNumber", label: "Account Number" },
                { key: "paymentTerms", label: "Payment Terms" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof Client)}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                >
                  {label}
                  {sortField === key && (sortDirection === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className='hover:bg-gray-50 cursor-pointer'
              >
                <td className='px-6 py-4 font-medium'>{customer.name}</td>
                <td className='px-6 py-4'>{customer.type}</td>
                <td className='px-6 py-4'>{customer.status}</td>
                <td className='px-6 py-4'>{customer.creditStatus}</td>
                <td className='px-6 py-4'>{customer.accountNumber}</td>
                <td className='px-6 py-4'>{customer.paymentTerms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total > (params.limit || DEFAULT_LIMIT) && (
        <div className='mt-4'>
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

      {selectedCustomer && (
        <CustomerDetailsModal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
}
