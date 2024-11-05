import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Shipments } from './pages/Shipments';
import Carriers from './pages/Carriers';
import { Customers } from './pages/Customers';
import { Reports } from './pages/Reports';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/carriers" element={<Carriers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

export default App; 