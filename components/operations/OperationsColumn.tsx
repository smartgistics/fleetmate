import { Order, Trip } from "@/types/truckmate";
import { Card } from "@/components/ui/card";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface OperationsColumnProps {
  title: string;
  items: (Order | Trip)[];
  statusColor: string;
  onItemClick: (item: Order | Trip) => void;
}

export function OperationsColumn({
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
                    className={`p-2 rounded text-xs ${statusColor} text-gray-900
                        hover:opacity-80 hover:shadow-md transition-all duration-200
                        ${snapshot.isDragging ? "shadow-lg" : ""}`}
                    onClick={() => onItemClick(item)}
                  >
                    <div className='flex items-center justify-between mb-1'>
                      <div className='font-semibold truncate pr-1'>
                        {isOrder(item)
                          ? `Order #${item.orderId}`
                          : `${item.origZoneDesc} → ${item.destZoneDesc}`}
                      </div>
                    </div>
                    <div className='truncate text-[11px] text-gray-800'>
                      {isOrder(item) ? item.billToCode : "Customer Name"}
                    </div>
                    <div className='text-[11px] font-medium text-gray-800'>
                      {isOrder(item)
                        ? `$${item.totalCharges?.toLocaleString()}`
                        : item.eTA}
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
