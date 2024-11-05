import React, { ReactNode } from 'react';

export interface DashboardCardProps {
  title: string;
  children: ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}; 