import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  TruckIcon, 
  UsersIcon, 
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  MapIcon  // Add this for SmartLane
} from '@heroicons/react/24/outline';

function Sidebar() {
  const navigationItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Dashboard', path: '/dashboard', icon: ClipboardDocumentListIcon },
    { name: 'Customers', path: '/customers', icon: UsersIcon },
    { name: 'Carriers', path: '/carriers', icon: BuildingStorefrontIcon },
    { name: 'Dispatch', path: '/dispatch', icon: TruckIcon },
    { name: 'SmartLane', path: '/smartlane', icon: MapIcon }  // Add this new item
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar; 