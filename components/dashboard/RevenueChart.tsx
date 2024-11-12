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
import { RevenueChartProps } from "@/types";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow'>
      <h3 className='text-lg font-medium text-gray-900 mb-4'>Weekly Revenue</h3>
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='week'
              tickFormatter={formatDate}
              label={{ value: "Week Starting", position: "bottom", offset: 0 }}
            />
            <YAxis
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              label={{ value: "Revenue", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Revenue",
              ]}
              labelFormatter={(label: string) => `Week of ${formatDate(label)}`}
            />
            <Bar dataKey='revenue' fill='#3B82F6' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
