import { useState } from 'react';
import { Shipment } from '../types/models';
import { ShipmentsTable } from '../components/shipments/ShipmentsTable';

export function Shipments() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with API call later
  const mockShipments = [
    {
      id: '1',
      referenceNumber: '12345',
      customerId: 'ABC Company',
      origin: { city: 'Los Angeles', state: 'CA' },
      destination: { city: 'Chicago', state: 'IL' },
      status: 'In Transit',
    },
    {
      id: '2',
      referenceNumber: '12346',
      customerId: 'XYZ Corp',
      origin: { city: 'Miami', state: 'FL' },
      destination: { city: 'Atlanta', state: 'GA' },
      status: 'Pending',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          New Shipment
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search shipments..."
            className="w-full px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border rounded">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>
        <select className="px-4 py-2 border rounded">
          <option value="">All Types</option>
          <option value="ftl">FTL</option>
          <option value="ltl">LTL</option>
          <option value="partial">Partial</option>
        </select>
      </div>

      {/* Shipments Table */}
      <ShipmentsTable shipments={mockShipments} />

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing 1-10 of 100 shipments
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded hover:bg-gray-100">Previous</button>
          <button className="px-4 py-2 border rounded hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
} 