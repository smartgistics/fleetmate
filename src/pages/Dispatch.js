import React, { useState } from 'react';
import { mockShipments } from '../components/Shipments';
import ShipmentDetailsModal from '../components/ShipmentDetailsModal';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const statusColors = {
  'NOT_STARTED': 'bg-blue-200',
  'CAUTION': 'bg-yellow-200',
  'ON_TRACK': 'bg-green-200',
  'DELAYED': 'bg-red-200'
};

const DispatchColumn = ({ title, shipments, statusColor, onShipmentClick }) => {
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex-1 min-w-[300px] border-r border-gray-300 last:border-r-0 px-4 
            ${snapshot.isDraggingOver ? 'bg-gray-50' : ''}`}
        >
          <h3 className="font-bold mb-4 text-center bg-gray-100 py-2">{title}</h3>
          <div className="space-y-2">
            {shipments.map((shipment, index) => (
              <Draggable 
                key={shipment.id} 
                draggableId={shipment.id.toString()} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-3 rounded text-sm ${statusColor} 
                      hover:opacity-80 hover:shadow-md transition-all duration-200
                      ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                    onClick={() => onShipmentClick(shipment)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold">{shipment.pickupLocation} → {shipment.deliveryLocation}</div>
                      <div className="text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 6h8v2H8V6zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs mb-1">
                      {shipment.customer} | <span>{shipment.carrier}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>${shipment.rate}</span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

const Dispatch = () => {
  const [brokerTeam, setBrokerTeam] = useState('');
  const [customer, setCustomer] = useState('');
  const [pickRegion, setPickRegion] = useState('');
  const [date, setDate] = useState('');
  const [carrier, setCarrier] = useState('');
  const [delRegion, setDelRegion] = useState('');

  // Add state for managing the slideout
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);

  // Add state for managing shipments
  const [shipments, setShipments] = useState(mockShipments);

  const handleShipmentClick = (shipment) => {
    setSelectedShipment(shipment);
    setIsSlideoutOpen(true);
  };

  const handleCloseSlideout = () => {
    setIsSlideoutOpen(false);
    setSelectedShipment(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    setShipments(prevShipments =>
      prevShipments.map(shipment =>
        shipment.id.toString() === draggableId
          ? { ...shipment, dispatch_status: newStatus }
          : shipment
      )
    );
  };

  // Function to distribute shipments into columns based on dates
  const distributeShipments = () => {
    return {
      available: shipments.filter(s => s.dispatch_status === "Available"),
      planned: shipments.filter(s => s.dispatch_status === "Planned"),
      puTracking: shipments.filter(s => s.dispatch_status === "PU TRACKING"),
      loading: shipments.filter(s => s.dispatch_status === "LOADING"),
      delTracking: shipments.filter(s => s.dispatch_status === "DEL TRACKING"),
      delivering: shipments.filter(s => s.dispatch_status === "DELIVERING")
    };
  };

  const filteredShipments = distributeShipments();

  // Filter function for search
  const applyFilters = (shipments) => {
    return Object.keys(shipments).reduce((acc, key) => {
      acc[key] = shipments[key].filter(shipment => {
        return (
          (!brokerTeam || shipment.carrier.toLowerCase().includes(brokerTeam.toLowerCase())) &&
          (!customer || shipment.customer.toLowerCase().includes(customer.toLowerCase())) &&
          (!pickRegion || shipment.pickupLocation.toLowerCase().includes(pickRegion.toLowerCase())) &&
          (!delRegion || shipment.deliveryLocation.toLowerCase().includes(delRegion.toLowerCase())) &&
          (!carrier || shipment.carrier.toLowerCase().includes(carrier.toLowerCase()))
        );
      });
      return acc;
    }, {});
  };

  const displayShipments = applyFilters(filteredShipments);

  return (
    <div className="p-4">
      {/* Filters Section */}
      <div className="mb-6 border rounded-lg p-4">
        <h2 className="font-bold mb-4">FILTERS</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="BROKER TEAM/REP"
              className="border p-2 w-full"
              value={brokerTeam}
              onChange={(e) => setBrokerTeam(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="date"
                className="border p-2 flex-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <select className="border p-2 w-20">
                <option>+/-</option>
                <option>+1</option>
                <option>-1</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="CUSTOMER"
              className="border p-2 w-full"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <input
              type="text"
              placeholder="CARRIER"
              className="border p-2 w-full"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="PICK REGION"
              className="border p-2 w-full"
              value={pickRegion}
              onChange={(e) => setPickRegion(e.target.value)}
            />
            <input
              type="text"
              placeholder="DEL REGION"
              className="border p-2 w-full"
              value={delRegion}
              onChange={(e) => setDelRegion(e.target.value)}
            />
          </div>
        </div>
        
        {/* Status Legend */}
        <div className="mt-4 flex justify-end gap-2">
          <div className="bg-blue-200 px-2 py-1 text-sm">NOT STARTED</div>
          <div className="bg-yellow-200 px-2 py-1 text-sm">CAUTION</div>
          <div className="bg-green-200 px-2 py-1 text-sm">ON TRACK</div>
          <div className="bg-red-200 px-2 py-1 text-sm">DELAYED/BLOCKED</div>
        </div>
      </div>

      {/* Dispatch Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex overflow-x-auto min-h-[600px] border-l border-r border-gray-300">
          <DispatchColumn 
            title="Available" 
            shipments={displayShipments.available} 
            statusColor="bg-yellow-200"
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn 
            title="Planned" 
            shipments={displayShipments.planned} 
            statusColor="bg-blue-200"
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn 
            title="PU TRACKING" 
            shipments={displayShipments.puTracking} 
            statusColor="bg-green-200"
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn 
            title="LOADING" 
            shipments={displayShipments.loading} 
            statusColor="bg-yellow-200"
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn 
            title="DEL TRACKING" 
            shipments={displayShipments.delTracking} 
            statusColor="bg-red-200"
            onShipmentClick={handleShipmentClick}
          />
          <DispatchColumn 
            title="DELIVERING" 
            shipments={displayShipments.delivering} 
            statusColor="bg-yellow-200"
            onShipmentClick={handleShipmentClick}
          />
        </div>
      </DragDropContext>

      {/* Add the ShipmentDetailsModal */}
      <ShipmentDetailsModal
        isOpen={isSlideoutOpen}
        onClose={handleCloseSlideout}
        shipment={selectedShipment}
      />
    </div>
  );
};

export default Dispatch; 