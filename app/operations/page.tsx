"use client";

import React, { useState } from "react";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { TripDetailsModal } from "@/components/trips/TripDetailsModal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Tabs from "@/components/Tabs";
import type { Order, Trip } from "@/types";
import { useOrders } from "@/hooks/useTruckMate";
import { useDispatch } from "@/hooks/useDispatch";
import { Card } from "@/components/ui/card";

interface StatusColors {
  NOT_STARTED: string;
  CAUTION: string;
  ON_TRACK: string;
  DELAYED: string;
}

const STATUS_COLORS: StatusColors = {
  NOT_STARTED: "bg-blue-200",
  CAUTION: "bg-yellow-200",
  ON_TRACK: "bg-green-200",
  DELAYED: "bg-red-200",
};

interface OperationsColumnProps {
  title: string;
  items: (Order | Trip)[];
  statusColor: string;
  onItemClick: (item: Order | Trip) => void;
}

function OperationsColumn({
  title,
  items,
  statusColor,
  onItemClick,
}: OperationsColumnProps) {
  const isOrder = (item: Order | Trip): item is Order => {
    return "orderId" in item;
  };

  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex-1 min-w-[200px] border-r border-gray-300 last:border-r-0 px-2 
            ${snapshot.isDraggingOver ? "bg-gray-50" : ""}`}
        >
          <h3 className='font-bold mb-2 text-center bg-gray-100 py-1 text-sm text-gray-900'>
            {title}
          </h3>
          <div className='space-y-1'>
            {items.map((item, index) => (
              <Draggable
                key={
                  isOrder(item)
                    ? `order-${item.orderId}`
                    : `trip-${item.tripId}`
                }
                draggableId={
                  isOrder(item)
                    ? item.orderId.toString()
                    : item.tripId.toString()
                }
                index={index}
              >
                {(provided, snapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-2 rounded text-xs ${statusColor} text-gray-900
                      hover:opacity-80 hover:shadow-md transition-all duration-200
                      ${snapshot.isDragging ? "shadow-lg" : ""}`}
                    onClick={() => onItemClick(item)}
                  >
                    <div className='flex items-center justify-between mb-1'>
                      <div className='font-semibold truncate pr-1'>
                        {isOrder(item)
                          ? `Order #${item.orderId}`
                          : `${item.pickupLocation} → ${item.deliveryLocation}`}
                      </div>
                    </div>
                    <div className='truncate text-[11px] text-gray-800'>
                      {isOrder(item) ? item.billTo : item.customer}
                    </div>
                    <div className='text-[11px] font-medium text-gray-800'>
                      {isOrder(item)
                        ? `$${item.totalCharges?.toLocaleString()}`
                        : new Date(
                            item.scheduledStartDate
                          ).toLocaleDateString()}
                    </div>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState("dispatch");
  const { trips, isLoading: tripsLoading } = useDispatch();
  const { orders, isLoading: ordersLoading } = useOrders();
  const [selectedItem, setSelectedItem] = useState<{
    type: "order" | "trip";
    data: Order | Trip;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    // Implement drag and drop logic here
    console.log(result);
  };

  const handleItemClick = (item: Order | Trip) => {
    const type = "orderId" in item ? "order" : "trip";
    setSelectedItem({ type, data: item });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const renderColumns = () => {
    switch (activeTab) {
      case "dispatch":
        return (
          <>
            <OperationsColumn
              title='Available'
              items={trips.available}
              statusColor={STATUS_COLORS.NOT_STARTED}
              onItemClick={handleItemClick}
            />
            <OperationsColumn
              title='Planned'
              items={trips.planned}
              statusColor={STATUS_COLORS.CAUTION}
              onItemClick={handleItemClick}
            />
            <OperationsColumn
              title='In Transit'
              items={trips.puTracking}
              statusColor={STATUS_COLORS.ON_TRACK}
              onItemClick={handleItemClick}
            />
          </>
        );
      case "planning":
        return (
          <>
            <OperationsColumn
              title='New Orders'
              items={orders.filter((order) => order.status === "New")}
              statusColor={STATUS_COLORS.NOT_STARTED}
              onItemClick={handleItemClick}
            />
            <OperationsColumn
              title='Planning'
              items={orders.filter((order) => order.status === "Planning")}
              statusColor={STATUS_COLORS.CAUTION}
              onItemClick={handleItemClick}
            />
          </>
        );
      default:
        return null;
    }
  };

  if (tripsLoading || ordersLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
      </div>
    );
  }

  return (
    <div className='p-4 text-gray-900'>
      <div className='mb-6'>
        <Tabs
          tabs={[
            { label: "Dispatch", value: "dispatch" },
            { label: "Planning", value: "planning" },
            { label: "Tracking", value: "tracking" },
            { label: "Billing", value: "billing" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex min-h-[600px] border-l border-r border-gray-300 w-full bg-white'>
          {renderColumns()}
        </div>
      </DragDropContext>

      {selectedItem?.type === "order" ? (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          order={selectedItem.data as Order}
          onUpdate={handleCloseModal}
        />
      ) : selectedItem?.type === "trip" ? (
        <TripDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          trip={selectedItem.data as Trip}
          onUpdate={handleCloseModal}
        />
      ) : null}
    </div>
  );
}
