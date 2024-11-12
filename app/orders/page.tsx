"use client";

import { useState } from "react";
import { Order } from "@/types";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { NewOrderModal } from "@/components/orders/NewOrderModal";
import { useOrders } from "@/hooks/useTruckMate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { OrdersFilters } from "@/components/orders/filters/OrdersFilters";
import { OrdersTableHeader } from "@/components/orders/table/OrdersTableHeader";
import { OrdersTableRow } from "@/components/orders/table/OrdersTableRow";

export default function Orders() {
  const { orders, isLoading, error } = useOrders();
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Order>("orderId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Handle sorting
  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort orders
  const filteredOrders = Array.isArray(orders)
    ? orders
        .filter((order) =>
          Object.values(order)
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

  const handleOrderUpdate = (updatedOrder: Order) => {
    console.log("Order updated:", updatedOrder);
    setSelectedOrder(null);
  };

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
        <h1 className='text-2xl font-bold text-gray-900'>Orders</h1>
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          onClick={() => setIsNewOrderModalOpen(true)}
        >
          New Order
        </button>
      </div>

      <OrdersFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <OrdersTableHeader
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          </thead>
          <tbody className='text-gray-900'>
            {filteredOrders.map((order) => (
              <OrdersTableRow
                key={`order-${order.orderId}`}
                order={order}
                onClick={() => setSelectedOrder(order)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {isNewOrderModalOpen && (
        <NewOrderModal
          isOpen={isNewOrderModalOpen}
          onClose={() => setIsNewOrderModalOpen(false)}
        />
      )}

      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdate={handleOrderUpdate}
      />
    </div>
  );
}
