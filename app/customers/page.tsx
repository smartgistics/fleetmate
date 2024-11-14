"use client";

import { useState, useEffect, useMemo } from "react";
import { Client } from "@/types/truckmate";
import { useCustomers } from "@/hooks/useTruckMate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CustomerDetailsModal from "@/components/customers/CustomerDetailsModal";
import { Pagination } from "@/components/ui/pagination";
import { NewCustomerModal } from "@/components/customers/NewCustomerModal";
import { debounce } from "lodash";

const DEFAULT_LIMIT = 20;

// Define mobile view fields with type-safe access paths
type MobileField = {
  key: keyof Client | "contact.name" | "address.city";
  label: string;
  render: (customer: Client) => React.ReactNode;
};

const MOBILE_FIELDS: MobileField[] = [
  {
    key: "name",
    label: "Name",
    render: (customer) => customer.name,
  },
  {
    key: "accountNumber",
    label: "Account #",
    render: (customer) => customer.accountNumber || "-",
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
    key: "creditStatus",
    label: "Credit",
    render: (customer) => (
      <span className={customer.creditHold ? "text-red-600" : "text-green-600"}>
        {customer.creditStatus || "-"}
      </span>
    ),
  },
  {
    key: "contact.name",
    label: "Contact",
    render: (customer) => customer.contact?.name || "-",
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Client>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null);

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
  });

  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);

  const handleCreateCustomer = async (customerData: Partial<Client>) => {
    try {
      await createCustomer(customerData);
      setIsNewCustomerModalOpen(false);
    } catch (err) {
      console.error("Failed to create customer:", err);
      // You might want to show an error toast here
    }
  };

  // Handle sorting
  const handleSort = (field: keyof Client) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    updateParams({ orderBy: `${field} ${newDirection}` });
  };

  // Debounced search handler with proper cleanup
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        console.log("Performing search with term:", term);
        updateParams({
          search: term,
          offset: 0,
        });
      }, 500),
    [updateParams]
  );

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length === 0 || term.length >= 3) {
      // Only search if term is empty (reset) or at least 3 characters
      debouncedSearch(term);
    }
  };

  // Clean up debounced function
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle pagination
  const handleOffsetChange = (newOffset: number) => {
    updateParams({ offset: newOffset });
  };

  const renderMobileCard = (customer: Client, index: number) => (
    <div
      key={customer.id || `customer-${index}`}
      onClick={() => setSelectedCustomer(customer)}
      className='bg-white rounded-lg shadow mb-4 p-4 cursor-pointer hover:bg-gray-50'
    >
      <div className='flex justify-between items-start mb-2'>
        <div className='flex-1'>
          <h3 className='font-medium text-gray-900'>{customer.name}</h3>
          <p className='text-sm text-gray-500'>
            {customer.accountNumber || "-"}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            customer.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {customer.status}
        </span>
      </div>

      <div className='mt-2 grid grid-cols-2 gap-x-4 gap-y-2'>
        {MOBILE_FIELDS.slice(2).map(({ key, label, render }) => (
          <div key={key} className='flex flex-col'>
            <span className='text-xs text-gray-500'>{label}</span>
            <span className='text-sm text-gray-900'>{render(customer)}</span>
          </div>
        ))}
      </div>

      {customer.contact?.name && (
        <div className='mt-3 pt-3 border-t border-gray-100'>
          <span className='text-xs text-gray-500'>Contact</span>
          <p className='text-sm text-gray-900'>{customer.contact.name}</p>
        </div>
      )}
    </div>
  );

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

  const currentPage =
    Math.floor((params.offset || 0) / (params.limit || DEFAULT_LIMIT)) + 1;

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

      {/* Search Section */}
      <div className='mb-6'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Disabled for now...'
            // placeholder='Search customers (min 3 characters)...'
            className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            value={searchTerm}
            onChange={handleSearch}
            minLength={3}
            disabled={true}
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
            {isLoading ? (
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900' />
            ) : (
              <svg
                className='h-5 w-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className='sm:hidden space-y-4'>
        {customers?.map((customer, index) => renderMobileCard(customer, index))}
      </div>

      {/* Desktop View */}
      <div className='hidden sm:block overflow-x-auto rounded-lg shadow'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr className='bg-gray-50'>
              {MOBILE_FIELDS.map(({ key, label }) => (
                <th
                  key={`header-${key}`}
                  onClick={() => handleSort(key as keyof Client)}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors'
                >
                  <div className='flex items-center space-x-1'>
                    <span>{label}</span>
                    {sortField === key && (
                      <span className='text-blue-500'>
                        {sortDirection === "asc" ? " ↑" : " ↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {customers?.map((customer, index) => (
              <tr
                key={customer.id || `customer-row-${index}`}
                onClick={() => setSelectedCustomer(customer)}
                className='hover:bg-gray-50 cursor-pointer'
              >
                {MOBILE_FIELDS.map(({ key, render }) => (
                  <td
                    key={`${customer.id || index}-${key}`}
                    className='px-6 py-4'
                  >
                    {render(customer)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Adjust for mobile */}
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
        onSubmit={handleCreateCustomer}
      />
    </div>
  );
}
