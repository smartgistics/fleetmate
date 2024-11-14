"use client";

import { useState } from "react";
import { Order } from "@/types/truckmate";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { NewOrderModal } from "@/components/orders/NewOrderModal";
import { useOrders } from "@/hooks/useTruckMate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { OrdersFilters } from "@/components/orders/filters/OrdersFilters";
import { OrdersTableHeader } from "@/components/orders/table/OrdersTableHeader";
import { OrdersTableRow } from "@/components/orders/table/OrdersTableRow";
import { Pagination } from "@/components/ui/pagination";

const DEFAULT_LIMIT = 20;

export default function Orders() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Order>("orderId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { orders, isLoading, error, total, params, updateParams } = useOrders({
    limit: DEFAULT_LIMIT,
    offset: 0,
    orderBy: `${sortField} ${sortDirection}`,
  });

  // Handle sorting
  const handleSort = (field: keyof Order) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    updateParams({ orderBy: `${field} ${newDirection}` });
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    updateParams({ filter: term, offset: 0 }); // Reset to first page on new search
  };

  // Handle pagination
  const handleOffsetChange = (newOffset: number) => {
    updateParams({ offset: newOffset });
  };

  const handleOrderUpdate = (updatedOrder: Order) => {
    console.log("Order updated:", updatedOrder);
    setSelectedOrder(null);
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
        <h1 className='text-2xl font-bold'>Orders</h1>
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          onClick={() => setIsNewOrderModalOpen(true)}
        >
          New Order
        </button>
      </div>

      <OrdersFilters searchTerm={searchTerm} setSearchTerm={handleSearch} />

      <div className='overflow-x-auto shadow'>
        <table className='min-w-full bg-white rounded-lg border'>
          <thead>
            <OrdersTableHeader
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          </thead>
          <tbody className='text-gray-900'>
            {orders.map((order) => (
              <OrdersTableRow
                key={order.orderId}
                order={order}
                onClick={() => setSelectedOrder(order)}
              />
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
