import { Order, Trip } from "@/types/truckmate";
import { Card } from "@/components/ui/card";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface OperationsColumnProps {
  title: string;
  items: (Order | Trip)[];
  statusColor: string;
  onItemClick: (item: Order | Trip) => void;
  onDragEnd?: () => void;
}

interface DragConfirmationState {
  isOpen: boolean;
  item: Order | Trip | null;
  sourceColumn: string;
  destinationColumn: string;
}

export function OperationsColumn({
  title,
  items,
  statusColor,
  onItemClick,
  onDragEnd,
}: OperationsColumnProps) {
  const [dragConfirmation, setDragConfirmation] =
    useState<DragConfirmationState>({
      isOpen: false,
      item: null,
      sourceColumn: "",
      destinationColumn: "",
    });

  const isOrder = (item: Order | Trip | null): item is Order => {
    return Boolean(item && "orderId" in item);
  };

  const formatCurrency = (amount?: number) => {
    return amount ? `$${amount.toLocaleString()}` : "$0";
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleDragEnd = () => {
    setDragConfirmation({
      isOpen: false,
      item: null,
      sourceColumn: "",
      destinationColumn: "",
    });
    onDragEnd?.();
  };

  const handleDragStart = (item: Order | Trip, sourceColumn: string) => {
    setDragConfirmation((prev) => ({
      ...prev,
      item,
      sourceColumn,
    }));
  };

  const handleDragEnter = (destinationColumn: string) => {
    if (dragConfirmation.sourceColumn !== destinationColumn) {
      setDragConfirmation((prev) => ({
        ...prev,
        destinationColumn,
        isOpen: true,
      }));
    }
  };

  return (
    <>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-w-[300px] border-r border-gray-300 last:border-r-0 px-2 
                ${snapshot.isDraggingOver ? "bg-gray-50" : ""}`}
            onDragEnter={() => handleDragEnter(title)}
          >
            <div className='sticky top-0 z-10 bg-white'>
              <h3 className='font-bold mb-2 text-center bg-gray-100 py-2 text-sm text-gray-900'>
                {title} ({items.length})
              </h3>
            </div>
            <div className='space-y-2'>
              {items.map((item, index) => (
                <Draggable
                  key={
                    isOrder(item)
                      ? `order-${item.orderId}`
                      : `trip-${item.tripNumber}`
                  }
                  draggableId={
                    isOrder(item)
                      ? item.orderId.toString()
                      : item.tripNumber.toString()
                  }
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-3 rounded text-xs ${statusColor} text-gray-900
                          hover:opacity-80 hover:shadow-md transition-all duration-200
                          ${snapshot.isDragging ? "shadow-lg" : ""}`}
                      onClick={() => onItemClick(item)}
                      onDragStart={() => handleDragStart(item, title)}
                    >
                      {isOrder(item) ? (
                        // Order Card Content
                        <>
                          <div className='flex items-center justify-between mb-1'>
                            <div className='font-semibold'>
                              Order #{item.orderId}
                            </div>
                            <div className='text-green-700 font-medium'>
                              {formatCurrency(item.totalCharges)}
                            </div>
                          </div>
                          <div className='grid grid-cols-2 gap-x-2 gap-y-1 mt-2'>
                            <div className='text-gray-600'>Customer:</div>
                            <div className='font-medium truncate'>
                              {item.billToCode}
                            </div>
                            <div className='text-gray-600'>Service:</div>
                            <div className='font-medium'>
                              {item.serviceLevel}
                            </div>
                            <div className='text-gray-600'>Commodity:</div>
                            <div className='font-medium truncate'>
                              {item.commodity}
                            </div>
                          </div>
                        </>
                      ) : (
                        // Trip Card Content
                        <>
                          <div className='flex items-center justify-between mb-1'>
                            <div className='font-semibold'>
                              Trip #{item.tripNumber}
                            </div>
                            <div className='text-xs font-medium text-gray-600'>
                              {item.carriers?.[0]?.vendor?.name || "Unassigned"}
                            </div>
                          </div>
                          <div className='grid grid-cols-2 gap-x-2 gap-y-1 mt-2'>
                            <div className='text-gray-600'>Origin:</div>
                            <div className='font-medium truncate'>
                              {item.origZoneDesc}
                            </div>
                            <div className='text-gray-600'>Destination:</div>
                            <div className='font-medium truncate'>
                              {item.destZoneDesc}
                            </div>
                            <div className='text-gray-600'>ETD:</div>
                            <div className='font-medium'>
                              {formatDateTime(item.eTD)}
                            </div>
                            <div className='text-gray-600'>ETA:</div>
                            <div className='font-medium'>
                              {formatDateTime(item.eTA)}
                            </div>
                          </div>
                        </>
                      )}
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      <AlertDialog
        open={dragConfirmation.isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDragConfirmation((prev) => ({ ...prev, isOpen: false }));
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to move{" "}
              {isOrder(dragConfirmation.item!)
                ? `Order #${dragConfirmation.item.orderId}`
                : `Trip #${dragConfirmation.item?.tripNumber}`}{" "}
              from {dragConfirmation.sourceColumn} to{" "}
              {dragConfirmation.destinationColumn}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDragConfirmation((prev) => ({ ...prev, isOpen: false }));
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDragEnd}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
