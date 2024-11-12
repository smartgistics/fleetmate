"use client";

import { useState } from "react";
import { Client } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "@/services/truckMateService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CustomerDetailsModal from "@/components/CustomerDetailsModal";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Client>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null);

  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort customers
  const filteredCustomers = Array.isArray(customers)
    ? customers
        .filter((customer) =>
          Object.values(customer)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (sortDirection === "asc") {
            return (a[sortField] ?? "") > (b[sortField] ?? "") ? 1 : -1;
          }
          return (a[sortField] ?? "") < (b[sortField] ?? "") ? 1 : -1;
        })
    : [];

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
        <h1 className='text-2xl font-bold text-gray-900'>Customers</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search customers...'
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
                onClick={() => handleSort("name")}
              >
                Customer Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("type")}
              >
                Type{" "}
                {sortField === "type" && (sortDirection === "asc" ? "↑" : "↓")}
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
                onClick={() => handleSort("creditStatus")}
              >
                Credit Status{" "}
                {sortField === "creditStatus" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("accountNumber")}
              >
                Account Number{" "}
                {sortField === "accountNumber" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("paymentTerms")}
              >
                Payment Terms{" "}
                {sortField === "paymentTerms" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-900'>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className='hover:bg-gray-50 cursor-pointer'
                onClick={() => setSelectedCustomer(customer)}
              >
                <td className='px-6 py-4 border-b font-medium'>
                  {customer.name}
                </td>
                <td className='px-6 py-4 border-b'>{customer.type}</td>
                <td className='px-6 py-4 border-b'>{customer.status}</td>
                <td className='px-6 py-4 border-b'>{customer.creditStatus}</td>
                <td className='px-6 py-4 border-b'>{customer.accountNumber}</td>
                <td className='px-6 py-4 border-b'>{customer.paymentTerms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
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
