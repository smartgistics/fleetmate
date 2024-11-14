"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RevenueChartProps } from "@/types/dashboard";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
  }).format(date);
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function RevenueChart({ data }: RevenueChartProps) {
  // Calculate min and max for better Y-axis scaling
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const yAxisMax = Math.ceil(maxRevenue / 1000) * 1000;

  return (
    <div className='bg-white p-6 rounded-lg shadow'>
      <h3 className='text-lg font-medium text-gray-900 mb-4'>Weekly Revenue</h3>
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#E5E7EB' />
            <XAxis
              dataKey='week'
              tickFormatter={formatDate}
              stroke='#6B7280'
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              stroke='#6B7280'
              tick={{ fontSize: 12 }}
              tickMargin={10}
              domain={[0, yAxisMax]}
              allowDecimals={false}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), "Revenue"]}
              labelFormatter={(label: string) => `Week of ${formatDate(label)}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "4px",
                padding: "8px",
              }}
            />
            <Bar
              dataKey='revenue'
              fill='#3B82F6'
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
