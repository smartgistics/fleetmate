'use client'

import { useState } from 'react'

import { Trip } from '@/types/truckmate'
import { PageError } from '@/components/PageError'
import { TripDetailsModal } from '@/components/trips/TripDetailsModal'
import { NewTripModal } from '@/components/trips/NewTripModal'
import { Pagination } from '@/components/ui/pagination'
import { useTrips } from '@/hooks/useTruckMate'

const DEFAULT_LIMIT = 20

export default function Trips() {
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof Trip>('tripNumber')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

  const { trips, isLoading, error, total, params, updateParams } = useTrips({
    limit: DEFAULT_LIMIT,
    offset: 0,
    orderBy: `${sortField} ${sortDirection}`,
    filter: 'status ne CANCL',
  })

  // Handle sorting
  const handleSort = (field: keyof Trip) => {
    const newDirection =
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(newDirection)
    updateParams({ orderBy: `${field} ${newDirection}` })
  }

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    updateParams({ filter: term, offset: 0 }) // Reset to first record on new search
  }

  // Handle pagination
  const handleOffsetChange = (newOffset: number) => {
    updateParams({ offset: newOffset })
  }

  const handleTripUpdate = (updatedTrip: Trip) => {
    console.log('Trip updated:', updatedTrip)
    setSelectedTrip(null)
  }

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (error) {
    return <PageError message={error} />
  }

  // Calculate current page from offset and limit
  const currentPage =
    Math.floor((params.offset || 0) / (params.limit || DEFAULT_LIMIT)) + 1

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trips</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsNewTripModalOpen(true)}
        >
          New Trip
        </button>
      </div>

      <div className="mb-4">
        <input
          className="w-full px-4 py-2 border rounded"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search trips..."
          type="text"
          value={searchTerm}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              {[
                { key: 'tripNumber', label: 'Trip Number' },
                { key: 'customer', label: 'Customer' },
                { key: 'status', label: 'Status' },
                { key: 'eTD', label: 'Delivery Date' },
                { key: 'revenue', label: 'Revenue' },
              ].map(({ key, label }) => (
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  key={key}
                  onClick={() => handleSort(key as keyof Trip)}
                >
                  {label}
                  {sortField === key && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trips.map((trip) => (
              <tr
                className="hover:bg-gray-50 cursor-pointer"
                key={trip.tripNumber}
                onClick={() => setSelectedTrip(trip)}
              >
                <td className="px-6 py-4">{trip.tripNumber}</td>
                <td className="px-6 py-4">Customer Name</td>
                <td className="px-6 py-4">{trip.status}</td>
                <td className="px-6 py-4">{trip.eTD}</td>
                <td className="px-6 py-4">$1000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total > (params.limit || DEFAULT_LIMIT) && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) =>
              handleOffsetChange((page - 1) * (params.limit || DEFAULT_LIMIT))
            }
            pageSize={params.limit || DEFAULT_LIMIT}
            total={total}
          />
        </div>
      )}

      <NewTripModal
        isOpen={isNewTripModalOpen}
        onClose={() => setIsNewTripModalOpen(false)}
      />

      <TripDetailsModal
        isOpen={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        onUpdate={handleTripUpdate}
        trip={selectedTrip}
      />
    </div>
  )
}
