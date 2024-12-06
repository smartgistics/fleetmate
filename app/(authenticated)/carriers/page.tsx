'use client'

import { useState } from 'react'

import { Vendor } from '@/types/truckmate'
import { Button } from '@/components/Button'
import { CarrierDetailsModal } from '@/components/carriers/CarrierDetailsModal'
import { CarriersGrid } from '@/components/carriers/CarriersGrid'
import { NewCarrierModal } from '@/components/carriers/NewCarrierModal'
import { useVendors } from '@/hooks/useVendors'

export default function CarriersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCarrier, setSelectedCarrier] = useState<Vendor | null>(null)
  const [newModalOpen, setNewModalOpen] = useState(false)
  const { createVendor } = useVendors('interliner', {})

  // Handle search - immediately update UI state, debounce API call
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
  }

  return (
    <div className="p-4 sm:p-6 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Carriers</h1>
        <Button onClick={() => setNewModalOpen(true)}>Add Carrier</Button>
      </div>

      <div className="mb-6">
        <input
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleSearch}
          placeholder="Search carriers..."
          type="text"
          value={searchTerm}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <CarriersGrid
          onRowClick={({ row }) => setSelectedCarrier(row)}
          searchTerm={searchTerm}
        />
      </div>

      <CarrierDetailsModal
        carrier={selectedCarrier}
        onClose={() => setSelectedCarrier(null)}
      />

      <NewCarrierModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onSubmit={createVendor}
      />
    </div>
  )
}
