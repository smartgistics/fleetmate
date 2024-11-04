import { Shipment } from '../../types/models';

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

interface ShipmentsTableProps {
  shipments: MockShipment[];
}

export function ShipmentsTable({ shipments }: ShipmentsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">#{shipment.referenceNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{shipment.customerId}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {`${shipment.origin.city}, ${shipment.origin.state} → ${shipment.destination.city}, ${shipment.destination.state}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(shipment.pickupDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(shipment.deliveryDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">${shipment.rate.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                  {shipment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-blue-600 hover:text-blue-900">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 