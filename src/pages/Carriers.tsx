import React, { useState } from 'react';
import AddCarrierModal from '../components/AddCarrierModal';

export default function Carriers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const mockCarriers = [
    {
      id: '1',
      name: 'Express Logistics',
      mcNumber: 'MC123456',
      dotNumber: 'DOT789012',
      equipmentTypes: ['Dry Van', 'Reefer'],
      safetyRating: 'Satisfactory',
      active: true,
    },
    {
      id: '2',
      name: 'Swift Transport',
      mcNumber: 'MC654321',
      dotNumber: 'DOT210987',
      equipmentTypes: ['Flatbed', 'Step Deck'],
      safetyRating: 'Satisfactory',
      active: true,
    },
  ];

  const handleAddCarrier = (carrierData: any) => {
    console.log('New carrier data:', carrierData);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Carriers</h1>
        <button 
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Carrier
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search carriers..."
            className="w-full px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border rounded">
          <option value="">All Equipment</option>
          <option value="dry_van">Dry Van</option>
          <option value="reefer">Reefer</option>
          <option value="flatbed">Flatbed</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Carrier Name</th>
              <th className="px-6 py-3 text-left">MC Number</th>
              <th className="px-6 py-3 text-left">DOT Number</th>
              <th className="px-6 py-3 text-left">Equipment</th>
              <th className="px-6 py-3 text-left">Safety Rating</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCarriers.map((carrier) => (
              <tr key={carrier.id} className="border-b">
                <td className="px-6 py-4 font-medium">{carrier.name}</td>
                <td className="px-6 py-4">{carrier.mcNumber}</td>
                <td className="px-6 py-4">{carrier.dotNumber}</td>
                <td className="px-6 py-4">{carrier.equipmentTypes.join(', ')}</td>
                <td className="px-6 py-4">{carrier.safetyRating}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCarrierModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCarrier}
      />
    </div>
  );
} 