"use client";

import { DashboardCardProps } from "@/types/dashboard";
import { useDashboard } from "@/hooks/useDashboard";
// import { RevenueChart } from "./RevenueChart";

// Components
function DashboardCard({ title, items, valueLabel }: DashboardCardProps) {
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg'>
      <div className='p-5'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>{title}</h3>
        <div className='space-y-3'>
          {items.map((item, index) => (
            <div key={item.name} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  {index + 1}.
                </span>
                <span className='ml-2 text-sm text-gray-900'>{item.name}</span>
              </div>
              <span className='text-sm text-gray-500'>
                {valueLabel === "$"
                  ? `$${("total" in item ? item.total : 0).toLocaleString()}`
                  : `${"count" in item ? item.count : 0} ${valueLabel}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className='w-full h-[500px] bg-gray-200 flex justify-center items-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
      </div>
    );
  }

  const hasData = Object.values(dashboardData).some(
    (value) => Array.isArray(value) && value.length > 0
  );

  if (!hasData) {
    return (
      <div className='p-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
          <p className='mt-1 text-sm text-gray-500'>
            No data available at the moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      {/* <div className='mb-6'>
        <RevenueChart data={dashboardData.weeklyRevenue} />
      </div> */}

      <div className='grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2'>
        <DashboardCard
          title='Top Customers by Revenue'
          items={dashboardData.topCustomers}
          valueLabel='$'
        />
        <DashboardCard
          title='Top Carriers by Revenue'
          items={dashboardData.topCarriers}
          valueLabel='$'
        />
        <DashboardCard
          title='Top Origin Locations'
          items={dashboardData.topOrigins}
          valueLabel='shipments'
        />
        <DashboardCard
          title='Top Destination Locations'
          items={dashboardData.topDestinations}
          valueLabel='shipments'
        />
      </div>
    </div>
  );
}
