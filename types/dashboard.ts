export interface WeeklyData {
  week: string;
  revenue: number;
  shipments: number;
}

export interface CountItem {
  name: string;
  count: number;
}

export interface RevenueItem {
  name: string;
  total: number;
}

// Dashboard Types
export interface DashboardCardProps {
  title: string;
  items: (CountItem | RevenueItem)[];
  valueLabel: string;
}

export interface RevenueChartProps {
  data: WeeklyData[];
}
