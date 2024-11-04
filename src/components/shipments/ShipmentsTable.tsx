import { Shipment } from '../../types/models';

interface ShipmentsTableProps {
  shipments: Partial<Shipment>[];
}

export function ShipmentsTable({ shipments }: ShipmentsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left">Shipment ID</th>
            <th className="px-6 py-3 text-left">Customer</th>
            <th className="px-6 py-3 text-left">Origin</th>
            <th className="px-6 py-3 text-left">Destination</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-b">
              <td className="px-6 py-4">#{shipment.referenceNumber}</td>
              <td className="px-6 py-4">{shipment.customerId}</td>
              <td className="px-6 py-4">{`${shipment.origin?.city}, ${shipment.origin?.state}`}</td>
              <td className="px-6 py-4">{`${shipment.destination?.city}, ${shipment.destination?.state}`}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                  {shipment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 