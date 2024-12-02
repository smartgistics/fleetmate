'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { RevenueChartProps } from '@/types/dashboard'

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
  }).format(date)
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Calculate min and max for better Y-axis scaling
  const maxRevenue = Math.max(...data.map((d) => d.revenue))
  const yAxisMax = Math.ceil(maxRevenue / 1000) * 1000

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Revenue</h3>
      <div className="h-80">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
          >
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
              tickFormatter={formatDate}
              tickMargin={10}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, yAxisMax]}
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
              tickMargin={10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                padding: '8px',
              }}
              formatter={(value: number) => [formatCurrency(value), 'Revenue']}
              labelFormatter={(label: string) => `Week of ${formatDate(label)}`}
            />
            <Bar
              dataKey="revenue"
              fill="#3B82F6"
              maxBarSize={50}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
