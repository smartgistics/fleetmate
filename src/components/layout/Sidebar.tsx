import React from 'react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/shipments', label: 'Shipments', icon: '🚛' },
    { path: '/carriers', label: 'Carriers', icon: '🏢' },
    { path: '/customers', label: 'Customers', icon: '👥' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <div className="text-xl font-bold mb-6">FleetMate TMS</div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center py-2 px-4 rounded hover:bg-gray-700"
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 