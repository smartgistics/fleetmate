'use client'

import { useState } from 'react'
import { Order } from '@/types/truckmate'
import { NewOrderModal } from '@/components/orders/NewOrderModal'
import { OrderDetailsModal } from '@/components/orders/OrderDetailsModal'
import { OrdersGrid } from '@/components/orders/OrdersGrid'
import { OrdersFilters } from '@/components/orders/filters/OrdersFilters'
import { Button } from '@/components/Button'

export default function Orders() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleOrderUpdate = (updatedOrder: Order) => {
    console.log('Order updated:', updatedOrder)
    setSelectedOrder(null)
  }

  return (
    <div className="p-6 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button onClick={() => setIsNewOrderModalOpen(true)}>New Order</Button>
      </div>

      <OrdersFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="overflow-x-auto shadow">
        <OrdersGrid
          onRowClick={({ row }) => setSelectedOrder(row)}
          searchTerm={searchTerm}
        />
      </div>

      {isNewOrderModalOpen && (
        <NewOrderModal onClose={() => setIsNewOrderModalOpen(false)} />
      )}

      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdate={handleOrderUpdate}
        order={selectedOrder}
      />
    </div>
  )
}
