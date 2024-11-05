import React from 'react';
import { Shipment } from '../../types/models';

interface ShipmentsTableProps {
  shipments: Shipment[];
}

const ShipmentsTable: React.FC<ShipmentsTableProps> = ({ shipments }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pickup
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delivery
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Carrier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-t">
              <td className="px-6 py-4 whitespace-nowrap">{shipment.pickupLocation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{shipment.deliveryLocation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{shipment.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap">{shipment.carrier}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(shipment.date).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{shipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentsTable; 