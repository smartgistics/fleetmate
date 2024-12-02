'use client'

import React, { useState, useMemo } from 'react'
import { OrderDetailsModal } from '@/components/orders/OrderDetailsModal'
import { TripDetailsModal } from '@/components/trips/TripDetailsModal'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import Tabs from '@/components/Tabs'
import type { Order, Trip } from '@/types/truckmate'
import { useOrders } from '@/hooks/useTruckMate'
import { useDispatch } from '@/hooks/useDispatch'
import { OperationsColumn } from '@/components/operations/OperationsColumn'

interface StatusColors {
  NOT_STARTED: string
  CAUTION: string
  ON_TRACK: string
  DELAYED: string
}

const STATUS_COLORS: StatusColors = {
  NOT_STARTED: 'bg-blue-200',
  CAUTION: 'bg-yellow-200',
  ON_TRACK: 'bg-green-200',
  DELAYED: 'bg-red-200',
}

const FILTER_OPTIONS = {
  status: [
    { label: 'All', value: '' },
    { label: 'Available', value: 'AVAIL' },
    { label: 'Planned', value: 'PLANNED' },
    { label: 'Dispatched', value: 'DISP' },
    { label: 'At Shipper', value: 'ARVSHPR' },
    { label: 'In Transit', value: 'LOADED' },
    { label: 'At Consignee', value: 'DELVD' },
  ],
  equipmentTypes: [
    { label: 'All', value: '' },
    { label: 'Van', value: 'VAN' },
    { label: 'Reefer', value: 'REEF' },
    { label: 'Flatbed', value: 'FLAT' },
    { label: 'Step Deck', value: 'STEP' },
  ],
}

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState('dispatch')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    planner: '',
    customer: '',
    pickRegion: '',
    delRegion: '',
    carrier: '',
    date: '',
    equipmentType: '',
  })

  const { trips, isLoading: tripsLoading } = useDispatch()
  const { orders, isLoading: ordersLoading } = useOrders()
  const [selectedItem, setSelectedItem] = useState<{
    type: 'order' | 'trip'
    data: Order | Trip
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter trips in memory based on search and filters
  const filteredTrips = useMemo(() => {
    const searchLower = searchTerm.toLowerCase()
    const filterTrip = (trip: Trip) => {
      const matchesSearch =
        !searchTerm ||
        trip.origZoneDesc?.toLowerCase().includes(searchLower) ||
        trip.destZoneDesc?.toLowerCase().includes(searchLower)

      const matchesPlanner =
        !selectedFilters.planner ||
        trip.user1
          ?.toLowerCase()
          .includes(selectedFilters.planner.toLowerCase())

      const matchesCustomer =
        !selectedFilters.customer ||
        trip.user2
          ?.toLowerCase()
          .includes(selectedFilters.customer.toLowerCase())

      const matchesPickRegion =
        !selectedFilters.pickRegion ||
        trip.origZoneDesc
          ?.toLowerCase()
          .includes(selectedFilters.pickRegion.toLowerCase())

      const matchesDelRegion =
        !selectedFilters.delRegion ||
        trip.destZoneDesc
          ?.toLowerCase()
          .includes(selectedFilters.delRegion.toLowerCase())

      const matchesCarrier =
        !selectedFilters.carrier ||
        trip.carriers?.some((c) =>
          c.vendor?.name
            ?.toLowerCase()
            .includes(selectedFilters.carrier.toLowerCase())
        )

      const matchesDate =
        !selectedFilters.date || trip.eTD?.includes(selectedFilters.date)

      return (
        matchesSearch &&
        matchesPlanner &&
        matchesCustomer &&
        matchesPickRegion &&
        matchesDelRegion &&
        matchesCarrier &&
        matchesDate
      )
    }

    return {
      available: trips.available.filter(filterTrip),
      planned: trips.planned.filter(filterTrip),
      dispatched: trips.dispatched.filter(filterTrip),
      arrivedAtShipper: trips.arrivedAtShipper.filter(filterTrip),
      inTransit: trips.inTransit.filter(filterTrip),
      delivering: trips.delivering.filter(filterTrip),
    }
  }, [trips, searchTerm, selectedFilters])

  // Handle search - immediately filter in memory
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle filter changes - immediately filter in memory
  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterName]: value }))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    console.log(result)
  }

  const handleItemClick = (item: Order | Trip) => {
    const type = 'orderId' in item ? 'order' : 'trip'
    setSelectedItem({ type, data: item })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const handleClearDate = () => {
    handleFilterChange('date', '')
  }

  if (tripsLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <div className="p-4 text-gray-900">
      <div className="mb-6">
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            { label: 'Dispatch', value: 'dispatch' },
            { label: 'Planning', value: 'planning' },
            { label: 'Tracking', value: 'tracking' },
            { label: 'Billing', value: 'billing' },
          ]}
        />
      </div>

      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        {/* Top row - Search and Date Range */}
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleSearch}
              placeholder="Search by Trip #, Customer, Origin, or Destination..."
              type="text"
              value={searchTerm}
            />
          </div>
          <div className="flex gap-2">
            <input
              className="px-4 py-2 border rounded-lg"
              onChange={(e) => handleFilterChange('date', e.target.value)}
              type="date"
              value={selectedFilters.date}
            />
            {selectedFilters.date && (
              <button
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={handleClearDate}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Bottom row - Additional Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <select
            className="px-4 py-2 border rounded-lg"
            onChange={(e) =>
              handleFilterChange('equipmentType', e.target.value)
            }
            value={selectedFilters.equipmentType}
          >
            <option value="">Equipment Type</option>
            {FILTER_OPTIONS.equipmentTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            className="px-4 py-2 border rounded-lg"
            onChange={(e) => handleFilterChange('pickRegion', e.target.value)}
            placeholder="Origin City/Region"
            type="text"
            value={selectedFilters.pickRegion}
          />

          <input
            className="px-4 py-2 border rounded-lg"
            onChange={(e) => handleFilterChange('delRegion', e.target.value)}
            placeholder="Destination City/Region"
            type="text"
            value={selectedFilters.delRegion}
          />

          <input
            className="px-4 py-2 border rounded-lg"
            onChange={(e) => handleFilterChange('customer', e.target.value)}
            placeholder="Customer"
            type="text"
            value={selectedFilters.customer}
          />

          <input
            className="px-4 py-2 border rounded-lg"
            onChange={(e) => handleFilterChange('carrier', e.target.value)}
            placeholder="Carrier"
            type="text"
            value={selectedFilters.carrier}
          />

          <input
            className="px-4 py-2 border rounded-lg"
            onChange={(e) => handleFilterChange('planner', e.target.value)}
            placeholder="Planner"
            type="text"
            value={selectedFilters.planner}
          />
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex min-h-[600px] border-l border-r border-gray-300 w-full bg-white overflow-x-auto">
          {activeTab === 'dispatch' && (
            <>
              <OperationsColumn
                items={filteredTrips.available}
                onItemClick={handleItemClick}
                statusColor={STATUS_COLORS.NOT_STARTED}
                title="Available"
              />
              <OperationsColumn
                items={filteredTrips.planned}
                onItemClick={handleItemClick}
                statusColor={STATUS_COLORS.CAUTION}
                title="Planned"
              />
              <OperationsColumn
                items={filteredTrips.dispatched}
                onItemClick={handleItemClick}
                statusColor={STATUS_COLORS.ON_TRACK}
                title="Dispatched"
              />
              <OperationsColumn
                items={filteredTrips.arrivedAtShipper}
                onItemClick={handleItemClick}
                statusColor={STATUS_COLORS.CAUTION}
                title="Arrived @ Shipper"
              />
              <OperationsColumn
                items={filteredTrips.inTransit}
                onItemClick={handleItemClick}
                statusColor={STATUS_COLORS.CAUTION}
                title="In Transit"
              />
              <OperationsColumn
                items={filteredTrips.delivering}
                onItemClick={handleItemClick}
                statusColor={STATUS_COLORS.CAUTION}
                title="Arrived @ Consignee"
              />
            </>
          )}
          {activeTab === 'planning' && (
            <>
              <OperationsColumn
                items={orders.filter((order) => order.status === 'New')}
                onItemClick={handleItemClick}
                statusColor={STATUS_COLORS.NOT_STARTED}
                title="New Orders"
              />
              <OperationsColumn
                items={orders.filter((order) => order.status === 'Planning')}
                onItemClick={handleItemClick}
                statusColor={STATUS_COLORS.CAUTION}
                title="Planning"
              />
            </>
          )}
        </div>
      </DragDropContext>

      {selectedItem?.type === 'order' ? (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleCloseModal}
          order={selectedItem.data as Order}
        />
      ) : selectedItem?.type === 'trip' ? (
        <TripDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleCloseModal}
          trip={selectedItem.data as Trip}
        />
      ) : null}
    </div>
  )
}
