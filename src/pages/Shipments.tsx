import React, { useState } from 'react';
import { ShipmentsTable } from '../components/shipments/ShipmentsTable';

interface MockShipment {
  id: string;
  referenceNumber: string;
  customerId: string;
  origin: {
    city: string;
    state: string;
  };
  destination: {
    city: string;
    state: string;
  };
  status: string;
  pickupDate: string;
  deliveryDate: string;
  rate: number;
}

export function Shipments() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockShipments: MockShipment[] = [
    {
      id: '1',
      referenceNumber: '12345',
      customerId: 'ABC Company',
      origin: { city: 'Los Angeles', state: 'CA' },
      destination: { city: 'Chicago', state: 'IL' },
      status: 'In Transit',
      pickupDate: '2024-03-20',
      deliveryDate: '2024-03-22',
      rate: 2500,
    },
    {
      id: '2',
      referenceNumber: '12346',
      customerId: 'XYZ Corp',
      origin: { city: 'Miami', state: 'FL' },
      destination: { city: 'Atlanta', state: 'GA' },
      status: 'Pending',
      pickupDate: '2024-03-21',
      deliveryDate: '2024-03-23',
      rate: 1800,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium">
          Create Order
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search shipments..."
              className="w-full px-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border rounded-lg">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Shipments Table */}
      <ShipmentsTable shipments={mockShipments} />

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div>
          Showing 1-10 of 100 shipments
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
} 