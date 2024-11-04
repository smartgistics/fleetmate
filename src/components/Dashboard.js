import React from 'react';
import { mockShipments } from './Shipments';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper function to get top items by count
const getTopItems = (array, key, limit = 5) => {
  const counts = array.reduce((acc, item) => {
    const value = item[key];
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
};

// Helper function to get top items by revenue
const getTopItemsByRevenue = (array, key, limit = 5) => {
  const revenue = array.reduce((acc, item) => {
    const value = item[key];
    acc[value] = (acc[value] || 0) + item.rate;
    return acc;
  }, {});

  return Object.entries(revenue)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, total]) => ({ name, total }));
};

// New helper function to get weekly revenue data
const getWeeklyRevenue = (shipments) => {
  // Group shipments by week
  const weeklyData = shipments.reduce((acc, shipment) => {
    const date = new Date(shipment.pickupDate);
    const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
    const weekKey = weekStart.toISOString().split('T')[0];
    
    if (!acc[weekKey]) {
      acc[weekKey] = {
        week: weekKey,
        revenue: 0,
        shipments: 0
      };
    }
    
    acc[weekKey].revenue += shipment.rate;
    acc[weekKey].shipments += 1;
    
    return acc;
  }, {});

  // Convert to array and sort by week
  return Object.values(weeklyData)
    .sort((a, b) => new Date(a.week) - new Date(b.week))
    .slice(-8); // Get last 8 weeks
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const DashboardCard = ({ title, items, valueLabel }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500">
                {index + 1}.
              </span>
              <span className="ml-2 text-sm text-gray-900">{item.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {valueLabel === '$' 
                ? `$${item.total.toLocaleString()}`
                : `${item.count} ${valueLabel}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RevenueChart = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Revenue</h3>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="week" 
            tickFormatter={formatDate}
            label={{ value: 'Week Starting', position: 'bottom', offset: 0 }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
            labelFormatter={(label) => `Week of ${formatDate(label)}`}
          />
          <Bar 
            dataKey="revenue" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Dashboard = () => {
  const topCustomers = getTopItemsByRevenue(mockShipments, 'customer');
  const topCarriers = getTopItemsByRevenue(mockShipments, 'carrier');
  const topOrigins = getTopItems(mockShipments, 'pickupLocation');
  const topDestinations = getTopItems(mockShipments, 'deliveryLocation');
  const weeklyRevenue = getWeeklyRevenue(mockShipments);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your shipping operations
        </p>
      </div>

      {/* Revenue Chart */}
      <div className="mb-6">
        <RevenueChart data={weeklyRevenue} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <DashboardCard
          title="Top Customers by Revenue"
          items={topCustomers}
          valueLabel="$"
        />
        <DashboardCard
          title="Top Carriers by Revenue"
          items={topCarriers}
          valueLabel="$"
        />
        <DashboardCard
          title="Top Origin Locations"
          items={topOrigins}
          valueLabel="shipments"
        />
        <DashboardCard
          title="Top Destination Locations"
          items={topDestinations}
          valueLabel="shipments"
        />
      </div>
    </div>
  );
};

export default Dashboard; 