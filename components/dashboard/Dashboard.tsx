"use client";

import React, { useMemo } from "react";
import { mockShipments } from "@/mocks/Shipments";
import {
  Shipment,
  CountItem,
  RevenueItem,
  WeeklyData,
  DashboardCardProps,
} from "@/types";
import { RevenueChart } from "./RevenueChart";

// Helper functions
const getTopItems = (
  array: Shipment[],
  key: keyof Shipment,
  limit = 5
): CountItem[] => {
  const counts = array.reduce<Record<string, number>>((acc, item) => {
    const value = item[key] as string;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
};

const getTopItemsByRevenue = (
  array: Shipment[],
  key: keyof Shipment,
  limit = 5
): RevenueItem[] => {
  const revenue = array.reduce<Record<string, number>>((acc, item) => {
    const value = item[key] as string;
    acc[value] = (acc[value] || 0) + (item.rate || 0);
    return acc;
  }, {});

  return Object.entries(revenue)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, total]) => ({ name, total }));
};

const getWeeklyRevenue = (shipments: Shipment[]): WeeklyData[] => {
  const weeklyData = shipments.reduce<Record<string, WeeklyData>>(
    (acc, shipment) => {
      const date = new Date(shipment.pickupDate ?? "");
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
      const weekKey = weekStart.toISOString().split("T")[0];

      if (!acc[weekKey]) {
        acc[weekKey] = {
          week: weekKey,
          revenue: 0,
          shipments: 0,
        };
      }

      acc[weekKey].revenue += shipment.rate || 0;
      acc[weekKey].shipments += 1;

      return acc;
    },
    {}
  );

  return Object.values(weeklyData)
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
    .slice(-8);
};

// Components
export function DashboardCard({
  title,
  items,
  valueLabel,
}: DashboardCardProps) {
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
  // Use useMemo to ensure consistent data between renders
  const dashboardData = useMemo(() => {
    const topCustomers = getTopItemsByRevenue(mockShipments, "customer");
    const topCarriers = getTopItemsByRevenue(mockShipments, "carrier");
    const topOrigins = getTopItems(mockShipments, "pickupLocation");
    const topDestinations = getTopItems(mockShipments, "deliveryLocation");
    const weeklyRevenue = getWeeklyRevenue(mockShipments);

    return {
      topCustomers,
      topCarriers,
      topOrigins,
      topDestinations,
      weeklyRevenue,
    };
  }, []); // Empty dependency array since mockShipments is static

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
        <p className='mt-1 text-sm text-gray-500'>
          Overview of your shipping operations
        </p>
      </div>

      <div className='mb-6'>
        <RevenueChart data={dashboardData.weeklyRevenue} />
      </div>

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
