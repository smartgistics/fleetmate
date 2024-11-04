import { DashboardCard } from '../components/dashboard/DashboardCard';
import { ShipmentsTable } from '../components/shipments/ShipmentsTable';

export function Dashboard() {
  const mockShipments = [
    {
      id: '1',
      referenceNumber: '12345',
      customerId: 'ABC Company',
      origin: { city: 'Los Angeles', state: 'CA' },
      destination: { city: 'Chicago', state: 'IL' },
      status: 'In Transit',
    },
    // Add more mock data as needed
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Active Shipments" value={24} icon="🚚" />
        <DashboardCard title="Revenue (MTD)" value="$45,678" icon="💰" />
        <DashboardCard title="Pending Deliveries" value={12} icon="📦" />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
        <ShipmentsTable shipments={mockShipments} />
      </div>
    </div>
  );
} 