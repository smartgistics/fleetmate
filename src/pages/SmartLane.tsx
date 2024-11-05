import React from 'react';

export function SmartLane() {
  const lanes = [
    {
      id: '1',
      origin: 'Atlanta, GA',
      destination: 'Miami, FL',
      averageRate: 1250,
      volume: '15 loads/week',
      reliability: '95%',
      lastUpdated: '2024-03-20'
    },
    {
      id: '2',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      averageRate: 1850,
      volume: '22 loads/week',
      reliability: '92%',
      lastUpdated: '2024-03-20'
    },
    {
      id: '3',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      averageRate: 950,
      volume: '18 loads/week',
      reliability: '88%',
      lastUpdated: '2024-03-20'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SmartLane Analytics</h1>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search lanes..."
            className="px-4 py-2 border rounded-lg"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Lane
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reliability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lanes.map((lane) => (
                <tr key={lane.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{lane.origin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{lane.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${lane.averageRate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{lane.volume}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: lane.reliability }}
                        ></div>
                      </div>
                      <span>{lane.reliability}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{lane.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 