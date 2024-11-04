import React, { useState } from 'react';

const statusColors = {
  'NOT_STARTED': 'bg-blue-200',
  'CAUTION': 'bg-yellow-200',
  'ON_TRACK': 'bg-green-200',
  'DELAYED': 'bg-red-200'
};

const DispatchColumn = ({ title, shipments, statusColor }) => (
  <div className="flex-1 min-w-[200px] border-r border-gray-300 last:border-r-0 px-4">
    <h3 className="font-bold mb-4 text-center bg-gray-100 py-2">{title}</h3>
    <div className="space-y-2">
      {shipments.map((shipment, index) => (
        <div 
          key={index} 
          className={`p-2 rounded text-sm ${statusColor} cursor-pointer hover:opacity-80`}
        >
          {shipment.origin} TO {shipment.destination}
        </div>
      ))}
    </div>
  </div>
);

const Dispatch = () => {
  const [brokerTeam, setBrokerTeam] = useState('');
  const [customer, setCustomer] = useState('');
  const [pickRegion, setPickRegion] = useState('');
  const [date, setDate] = useState('');
  const [carrier, setCarrier] = useState('');
  const [delRegion, setDelRegion] = useState('');

  // Mock data for shipment cards
  const mockShipments = {
    available: [
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
    ],
    planned: [
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
    ],
    puTracking: [
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
    ],
    loading: [
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
    ],
    delTracking: [
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
    ],
    delivering: [
      { origin: 'ATLANTA,GA', destination: 'TAMPA,FL' },
    ]
  };

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
      <div className="flex overflow-x-auto min-h-[600px] border-l border-r border-gray-300">
        <DispatchColumn title="Available" shipments={mockShipments.available} statusColor="bg-yellow-200" />
        <DispatchColumn title="Planned" shipments={mockShipments.planned} statusColor="bg-blue-200" />
        <DispatchColumn title="PU TRACKING" shipments={mockShipments.puTracking} statusColor="bg-green-200" />
        <DispatchColumn title="LOADING" shipments={mockShipments.loading} statusColor="bg-yellow-200" />
        <DispatchColumn title="DEL TRACKING" shipments={mockShipments.delTracking} statusColor="bg-red-200" />
        <DispatchColumn title="DELIVERING" shipments={mockShipments.delivering} statusColor="bg-yellow-200" />
      </div>
    </div>
  );
};

export default Dispatch; 