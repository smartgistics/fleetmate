import { DashboardCard } from '../components/dashboard/DashboardCard';
import ShipmentsTable from '../components/shipments/ShipmentsTable';
import { Shipment } from '../types/models';

export function Dashboard() {
  const mockShipments: Shipment[] = [
    {
      id: '1',
      pickupLocation: 'New York, NY',
      deliveryLocation: 'Los Angeles, CA',
      customer: 'Acme Corp',
      carrier: 'Swift Transport',
      date: '2024-03-15',
      status: 'pending'
    },
    // ... other shipments
  ];

  return (
    <div className="space-y-6">
      <DashboardCard title="Recent Shipments">
        <ShipmentsTable shipments={mockShipments} />
      </DashboardCard>
    </div>
  );
} 