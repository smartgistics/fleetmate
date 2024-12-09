'use client'

import { useState } from 'react'

import CustomerDetailsModal from '@/components/customers/CustomerDetailsModal'
import { CustomersGrid } from '@/components/customers/CustomersGrid'
import { NewCustomerModal } from '@/components/customers/NewCustomerModal'
import { Button } from '@/components/Button'
import { useCustomers } from '@/hooks/useTruckMate'
import { Client } from '@/types/truckmate'

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null)
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false)

  const { createCustomer } = useCustomers({})

  return (
    <div className="p-4 sm:p-6 text-gray-900">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button onClick={() => setIsNewCustomerModalOpen(true)}>
          Add Customer
        </Button>
      </div>

      {/* Search Section with controlled input */}
      <div className="mb-6">
        <input
          autoFocus
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={({ target: { value } }) => setSearchTerm(value)}
          placeholder="Search customers..."
          type="text"
          value={searchTerm}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto shadow">
        <CustomersGrid
          onRowClick={({ row }) => setSelectedCustomer(row)}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modals */}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      <NewCustomerModal
        isOpen={isNewCustomerModalOpen}
        onClose={() => setIsNewCustomerModalOpen(false)}
        onSubmit={createCustomer}
      />
    </div>
  )
}
