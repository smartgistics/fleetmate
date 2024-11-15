"use client";

import { useState, useMemo, useEffect } from "react";
import { Client } from "@/types/truckmate";
import { useCustomers } from "@/hooks/useTruckMate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CustomerDetailsModal from "@/components/customers/CustomerDetailsModal";
import { Pagination } from "@/components/ui/pagination";
import { NewCustomerModal } from "@/components/customers/NewCustomerModal";
import debounce from "lodash/debounce";

const DEFAULT_LIMIT = 20;

type MobileField = {
  key: keyof Client;
  label: string;
  render: (customer: Client) => React.ReactNode;
};

const MOBILE_FIELDS: MobileField[] = [
  {
    key: "clientId",
    label: "Account #",
    render: (customer) => customer.clientId,
  },
  {
    key: "name",
    label: "Name",
    render: (customer) => customer.name,
  },
  {
    key: "status",
    label: "Status",
    render: (customer) => customer.status,
  },
  {
    key: "type",
    label: "Type",
    render: (customer) => customer.type,
  },
  {
    key: "altContact",
    label: "Contact",
    render: (customer) => customer.altContact || "-",
  },
  {
    key: "businessPhone",
    label: "Phone",
    render: (customer) => customer.businessPhone || "-",
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Client>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null);
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);

  const {
    customers,
    isLoading,
    error,
    total,
    params,
    updateParams,
    createCustomer,
  } = useCustomers({
    limit: DEFAULT_LIMIT,
    offset: 0,
    orderBy: `${sortField} ${sortDirection}`,
    filter: "name ne null and name ne ''",
  });

  // Debounced search function only handles the API call
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        updateParams({
          filter: term
            ? `(contains(tolower(name), '${term.toLowerCase()}') or contains(tolower(clientId), '${term.toLowerCase()}'))`
            : "name ne null and name ne ''",
          offset: 0,
        });
      }, 500),
    [updateParams]
  );

  // Handle sorting
  const handleSort = (field: keyof Client) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    updateParams({ orderBy: `${field} ${newDirection}` });
  };

  // Handle search - immediately update UI state, debounce API call
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle pagination
  const handleOffsetChange = (page: number) => {
    const newOffset = (page - 1) * (params.limit || DEFAULT_LIMIT);
    console.log("Changing page:", {
      page,
      newOffset,
      currentLimit: params.limit,
    });
    updateParams({
      offset: newOffset,
      orderBy: `${sortField} ${sortDirection}`,
    });
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

  return (
    <div className='p-4 sm:p-6 text-gray-900'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
        <h1 className='text-2xl font-bold'>Customers</h1>
        <button
          className='w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          onClick={() => setIsNewCustomerModalOpen(true)}
        >
          Add Customer
        </button>
      </div>

      {/* Search Section with controlled input */}
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search customers...'
          className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          value={searchTerm}
          onChange={handleSearch}
          autoFocus
        />
      </div>

      {/* Table Section */}
      <div className='overflow-x-auto shadow'>
        <table className='min-w-full bg-white rounded-lg border'>
          <thead>
            <tr className='bg-gray-50'>
              {MOBILE_FIELDS.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                >
                  {label}
                  {sortField === key && (
                    <span className='ml-1'>
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {customers?.map((customer) => (
              <tr
                key={customer.clientId}
                onClick={() => setSelectedCustomer(customer)}
                className='hover:bg-gray-50 cursor-pointer'
              >
                {MOBILE_FIELDS.map(({ key, render }) => (
                  <td key={`${customer.clientId}-${key}`} className='px-6 py-4'>
                    {render(customer)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > (params.limit || DEFAULT_LIMIT) && (
        <div className='mt-4'>
          <Pagination
            currentPage={
              Math.floor(
                (params.offset || 0) / (params.limit || DEFAULT_LIMIT)
              ) + 1
            }
            pageSize={params.limit || DEFAULT_LIMIT}
            total={total}
            onPageChange={handleOffsetChange}
          />
        </div>
      )}

      {/* Modals */}
      {selectedCustomer && (
        <CustomerDetailsModal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          customer={selectedCustomer}
        />
      )}

      <NewCustomerModal
        isOpen={isNewCustomerModalOpen}
        onClose={() => setIsNewCustomerModalOpen(false)}
        onSubmit={createCustomer}
      />
    </div>
  );
}
