import { useState } from 'react';

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockCustomers = [
    {
      id: '1',
      name: 'ABC Manufacturing',
      accountNumber: 'CUST001',
      creditLimit: 50000,
      paymentTerms: 'Net 30',
      activeShipments: 3,
      active: true,
    },
    {
      id: '2',
      name: 'XYZ Distribution',
      accountNumber: 'CUST002',
      creditLimit: 75000,
      paymentTerms: 'Net 15',
      activeShipments: 5,
      active: true,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Customer
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border rounded">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Account Number</th>
              <th className="px-6 py-3 text-left">Credit Limit</th>
              <th className="px-6 py-3 text-left">Payment Terms</th>
              <th className="px-6 py-3 text-left">Active Shipments</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="px-6 py-4 font-medium">{customer.name}</td>
                <td className="px-6 py-4">{customer.accountNumber}</td>
                <td className="px-6 py-4">${customer.creditLimit.toLocaleString()}</td>
                <td className="px-6 py-4">{customer.paymentTerms}</td>
                <td className="px-6 py-4">{customer.activeShipments}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-blue-500 hover:text-blue-700 mr-2">View Shipments</button>
                  <button className="text-red-500 hover:text-red-700">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 