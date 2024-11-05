import React from 'react';
import { Shipment } from '../../types/models';

interface ShipmentsGridProps {
  shipments: Shipment[];
}

const ShipmentsGrid: React.FC<ShipmentsGridProps> = ({ shipments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shipments.map((shipment) => (
        <div key={shipment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="font-semibold">
            {shipment.pickupLocation} → {shipment.deliveryLocation}
          </div>
          <div className="text-sm text-gray-600">
            <div>Customer: {shipment.customer}</div>
            <div>Carrier: {shipment.carrier}</div>
            <div>Date: {new Date(shipment.date).toLocaleDateString()}</div>
            <div>Status: {shipment.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipmentsGrid; 