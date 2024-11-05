import React, { useState } from 'react';
import NewShipmentModal from './NewShipmentModal';
import ShipmentDetailsModal from './ShipmentDetailsModal';

export const mockShipments = [
  {
    id: 1,
    carrier: "Fast Freight",
    customer: "Acme Corp",
    pickupLocation: "Dallas, TX",
    deliveryLocation: "Chicago, IL",
    pickupDate: "2024-01-15",
    deliveryDate: "2024-01-17",
    rate: 1200,
    dispatch_status: "Available",
    planner: "Sarah Johnson"
  },
  {
    id: 2,
    carrier: "NorthStar Express",
    customer: "Global Inc",
    pickupLocation: "Los Angeles, CA",
    deliveryLocation: "Houston, TX",
    pickupDate: "2024-01-10",
    deliveryDate: "2024-01-13",
    rate: 1800,
    dispatch_status: "Planned",
    planner: "Mike Chen"
  },
  {
    id: 3,
    carrier: "Speedy Haulers",
    customer: "Solar Solutions",
    pickupLocation: "Atlanta, GA",
    deliveryLocation: "Miami, FL",
    pickupDate: "2024-02-03",
    deliveryDate: "2024-02-04",
    rate: 800,
    dispatch_status: "PU TRACKING",
    planner: "David Rodriguez"
  },
  {
    id: 4,
    carrier: "Express Transit",
    customer: "Alpha Industries",
    pickupLocation: "New York, NY",
    deliveryLocation: "Detroit, MI",
    pickupDate: "2024-02-14",
    deliveryDate: "2024-02-15",
    rate: 1100,
    dispatch_status: "LOADING",
    planner: "Emily Taylor"
  },
  {
    id: 5,
    carrier: "Cargo Masters",
    customer: "Beta Logistics",
    pickupLocation: "Phoenix, AZ",
    deliveryLocation: "Denver, CO",
    pickupDate: "2024-02-28",
    deliveryDate: "2024-03-01",
    rate: 950,
    dispatch_status: "DEL TRACKING",
    planner: "James Wilson"
  },
  {
    id: 6,
    carrier: "QuickShip",
    customer: "Pacific Group",
    pickupLocation: "Seattle, WA",
    deliveryLocation: "San Francisco, CA",
    pickupDate: "2024-03-05",
    deliveryDate: "2024-03-06",
    rate: 700,
    dispatch_status: "DELIVERING",
    planner: "Maria Garcia"
  },
  {
    id: 7,
    carrier: "Arrow Logistics",
    customer: "EcoTech",
    pickupLocation: "Boston, MA",
    deliveryLocation: "Nashville, TN",
    pickupDate: "2024-03-15",
    deliveryDate: "2024-03-16",
    rate: 1400,
    dispatch_status: "Available",
    planner: "Tom Anderson"
  },
  {
    id: 8,
    carrier: "Blue Line Freight",
    customer: "Apex Supply",
    pickupLocation: "Orlando, FL",
    deliveryLocation: "Dallas, TX",
    pickupDate: "2024-04-04",
    deliveryDate: "2024-04-05",
    rate: 1350,
    dispatch_status: "Planned",
    planner: "Lisa Brown"
  },
  {
    id: 9,
    carrier: "Titan Transport",
    customer: "Horizon Goods",
    pickupLocation: "Chicago, IL",
    deliveryLocation: "St. Louis, MO",
    pickupDate: "2024-04-12",
    deliveryDate: "2024-04-12",
    rate: 550,
    dispatch_status: "PU TRACKING",
    planner: "Sarah Johnson"
  },
  {
    id: 10,
    carrier: "Eagle Logistics",
    customer: "Urban Mart",
    pickupLocation: "Denver, CO",
    deliveryLocation: "Kansas City, MO",
    pickupDate: "2024-04-19",
    deliveryDate: "2024-04-20",
    rate: 950,
    dispatch_status: "LOADING",
    planner: "Mike Chen"
  },
  {
    id: 11,
    carrier: "Cargo Masters",
    customer: "Acme Corp",
    pickupLocation: "Houston, TX",
    deliveryLocation: "Phoenix, AZ",
    pickupDate: "2024-04-24",
    deliveryDate: "2024-04-26",
    rate: 1250,
    dispatch_status: "DEL TRACKING",
    planner: "David Rodriguez"
  },
  {
    id: 12,
    carrier: "Speedy Haulers",
    customer: "Global Inc",
    pickupLocation: "Miami, FL",
    deliveryLocation: "Atlanta, GA",
    pickupDate: "2024-05-01",
    deliveryDate: "2024-05-02",
    rate: 900,
    dispatch_status: "DELIVERING",
    planner: "Emily Taylor"
  },
  {
    id: 13,
    carrier: "NorthStar Express",
    customer: "Solar Solutions",
    pickupLocation: "Chicago, IL",
    deliveryLocation: "Nashville, TN",
    pickupDate: "2024-05-07",
    deliveryDate: "2024-05-08",
    rate: 1150,
    dispatch_status: "Available",
    planner: "James Wilson"
  },
  {
    id: 14,
    carrier: "Arrow Logistics",
    customer: "Alpha Industries",
    pickupLocation: "Seattle, WA",
    deliveryLocation: "Las Vegas, NV",
    pickupDate: "2024-05-13",
    deliveryDate: "2024-05-15",
    rate: 1650,
    dispatch_status: "Planned",
    planner: "Maria Garcia"
  },
  {
    id: 15,
    carrier: "Blue Line Freight",
    customer: "Beta Logistics",
    pickupLocation: "New York, NY",
    deliveryLocation: "Atlanta, GA",
    pickupDate: "2024-05-22",
    deliveryDate: "2024-05-23",
    rate: 1250,
    dispatch_status: "PU TRACKING",
    planner: "Tom Anderson"
  },
  {
    id: 16,
    carrier: "Titan Transport",
    customer: "Pacific Group",
    pickupLocation: "Los Angeles, CA",
    deliveryLocation: "Portland, OR",
    pickupDate: "2024-05-25",
    deliveryDate: "2024-05-26",
    rate: 1400,
    dispatch_status: "LOADING",
    planner: "Lisa Brown"
  },
  {
    id: 17,
    carrier: "Fast Freight",
    customer: "EcoTech",
    pickupLocation: "San Francisco, CA",
    deliveryLocation: "Las Vegas, NV",
    pickupDate: "2024-06-01",
    deliveryDate: "2024-06-02",
    rate: 950,
    dispatch_status: "DEL TRACKING",
    planner: "Sarah Johnson"
  },
  {
    id: 18,
    carrier: "QuickShip",
    customer: "Apex Supply",
    pickupLocation: "Dallas, TX",
    deliveryLocation: "Chicago, IL",
    pickupDate: "2024-06-07",
    deliveryDate: "2024-06-09",
    rate: 1350,
    dispatch_status: "DELIVERING",
    planner: "Mike Chen"
  },
  {
    id: 19,
    carrier: "Cargo Masters",
    customer: "Horizon Goods",
    pickupLocation: "Phoenix, AZ",
    deliveryLocation: "Denver, CO",
    pickupDate: "2024-06-13",
    deliveryDate: "2024-06-15",
    rate: 800,
    dispatch_status: "Available",
    planner: "David Rodriguez"
  },
  {
    id: 20,
    carrier: "Express Transit",
    customer: "Urban Mart",
    pickupLocation: "Miami, FL",
    deliveryLocation: "New Orleans, LA",
    pickupDate: "2024-06-19",
    deliveryDate: "2024-06-20",
    rate: 700,
    dispatch_status: "Planned",
    planner: "Emily Taylor"
  },
  {
    id: 21,
    carrier: "Arrow Logistics",
    customer: "Acme Corp",
    pickupLocation: "Boston, MA",
    deliveryLocation: "Chicago, IL",
    pickupDate: "2024-06-25",
    deliveryDate: "2024-06-26",
    rate: 1600,
    dispatch_status: "PU TRACKING",
    planner: "James Wilson"
  },
  {
    id: 22,
    carrier: "NorthStar Express",
    customer: "Global Inc",
    pickupLocation: "Atlanta, GA",
    deliveryLocation: "Orlando, FL",
    pickupDate: "2024-07-02",
    deliveryDate: "2024-07-03",
    rate: 900,
    dispatch_status: "LOADING",
    planner: "Maria Garcia"
  },
  {
    id: 23,
    carrier: "Speedy Haulers",
    customer: "Solar Solutions",
    pickupLocation: "Dallas, TX",
    deliveryLocation: "Houston, TX",
    pickupDate: "2024-07-07",
    deliveryDate: "2024-07-07",
    rate: 500,
    dispatch_status: "DEL TRACKING",
    planner: "Tom Anderson"
  },
  {
    id: 24,
    carrier: "Titan Transport",
    customer: "Alpha Industries",
    pickupLocation: "Denver, CO",
    deliveryLocation: "Kansas City, MO",
    pickupDate: "2024-07-12",
    deliveryDate: "2024-07-13",
    rate: 950,
    dispatch_status: "DELIVERING",
    planner: "Lisa Brown"
  },
  {
    id: 25,
    carrier: "Blue Line Freight",
    customer: "Beta Logistics",
    pickupLocation: "Phoenix, AZ",
    deliveryLocation: "Los Angeles, CA",
    pickupDate: "2024-07-19",
    deliveryDate: "2024-07-19",
    rate: 700,
    dispatch_status: "Available",
    planner: "Sarah Johnson"
  },
  {
    id: 26,
    carrier: "Cargo Masters",
    customer: "Pacific Group",
    pickupLocation: "Seattle, WA",
    deliveryLocation: "Portland, OR",
    pickupDate: "2024-07-25",
    deliveryDate: "2024-07-25",
    rate: 600,
    dispatch_status: "Planned",
    planner: "Mike Chen"
  },
  {
    id: 27,
    carrier: "QuickShip",
    customer: "EcoTech",
    pickupLocation: "New York, NY",
    deliveryLocation: "Boston, MA",
    pickupDate: "2024-07-29",
    deliveryDate: "2024-07-29",
    rate: 400,
    dispatch_status: "PU TRACKING",
    planner: "David Rodriguez"
  },
  {
    id: 28,
    carrier: "Eagle Logistics",
    customer: "Apex Supply",
    pickupLocation: "Orlando, FL",
    deliveryLocation: "Miami, FL",
    pickupDate: "2024-08-05",
    deliveryDate: "2024-08-05",
    rate: 500,
    dispatch_status: "LOADING",
    planner: "Emily Taylor"
  },
  {
    id: 29,
    carrier: "Fast Freight",
    customer: "Horizon Goods",
    pickupLocation: "Los Angeles, CA",
    deliveryLocation: "Phoenix, AZ",
    pickupDate: "2024-08-10",
    deliveryDate: "2024-08-11",
    rate: 850,
    dispatch_status: "DEL TRACKING",
    planner: "James Wilson"
  },
  {
    id: 30,
    carrier: "Speedy Haulers",
    customer: "Urban Mart",
    pickupLocation: "Atlanta, GA",
    deliveryLocation: "Charlotte, NC",
    pickupDate: "2024-08-16",
    deliveryDate: "2024-08-16",
    rate: 600,
    dispatch_status: "DELIVERING",
    planner: "Maria Garcia"
  },
  {
    id: 31,
    carrier: "Arrow Logistics",
    customer: "Acme Corp",
    pickupLocation: "San Francisco, CA",
    deliveryLocation: "Seattle, WA",
    pickupDate: "2024-08-20",
    deliveryDate: "2024-08-21",
    rate: 1250,
    dispatch_status: "Available",
    planner: "Tom Anderson"
  },
  {
    id: 32,
    carrier: "Express Transit",
    customer: "Global Inc",
    pickupLocation: "Boston, MA",
    deliveryLocation: "New York, NY",
    pickupDate: "2024-08-27",
    deliveryDate: "2024-08-27",
    rate: 500,
    dispatch_status: "Planned",
    planner: "Lisa Brown"
  },
  {
    id: 33,
    carrier: "NorthStar Express",
    customer: "Solar Solutions",
    pickupLocation: "Dallas, TX",
    deliveryLocation: "Denver, CO",
    pickupDate: "2024-09-02",
    deliveryDate: "2024-09-03",
    rate: 1100,
    dispatch_status: "PU TRACKING",
    planner: "Sarah Johnson"
  },
  {
    id: 34,
    carrier: "Cargo Masters",
    customer: "Alpha Industries",
    pickupLocation: "Phoenix, AZ",
    deliveryLocation: "Las Vegas, NV",
    pickupDate: "2024-09-06",
    deliveryDate: "2024-09-06",
    rate: 700,
    dispatch_status: "LOADING",
    planner: "Mike Chen"
  },
  {
    id: 35,
    carrier: "Blue Line Freight",
    customer: "Beta Logistics",
    pickupLocation: "Miami, FL",
    deliveryLocation: "Atlanta, GA",
    pickupDate: "2024-09-12",
    deliveryDate: "2024-09-13",
    rate: 650,
    dispatch_status: "DEL TRACKING",
    planner: "David Rodriguez"
  },
  {
    id: 36,
    carrier: "Titan Transport",
    customer: "Pacific Group",
    pickupLocation: "New York, NY",
    deliveryLocation: "Chicago, IL",
    pickupDate: "2024-09-18",
    deliveryDate: "2024-09-19",
    rate: 1500,
    dispatch_status: "DELIVERING",
    planner: "Emily Taylor"
  },
  {
    id: 37,
    carrier: "QuickShip",
    customer: "EcoTech",
    pickupLocation: "Seattle, WA",
    deliveryLocation: "San Francisco, CA",
    pickupDate: "2024-09-25",
    deliveryDate: "2024-09-25",
    rate: 900,
    dispatch_status: "Available",
    planner: "James Wilson"
  },
  {
    id: 38,
    carrier: "Eagle Logistics",
    customer: "Apex Supply",
    pickupLocation: "Boston, MA",
    deliveryLocation: "Nashville, TN",
    pickupDate: "2024-10-02",
    deliveryDate: "2024-10-03",
    rate: 1400,
    dispatch_status: "Planned",
    planner: "Maria Garcia"
  },
  {
    id: 39,
    carrier: "Fast Freight",
    customer: "Horizon Goods",
    pickupLocation: "Phoenix, AZ",
    deliveryLocation: "Dallas, TX",
    pickupDate: "2024-10-10",
    deliveryDate: "2024-10-11",
    rate: 1100,
    dispatch_status: "PU TRACKING",
    planner: "Tom Anderson"
  },
  {
    id: 40,
    carrier: "Speedy Haulers",
    customer: "Urban Mart",
    pickupLocation: "Orlando, FL",
    deliveryLocation: "Miami, FL",
    pickupDate: "2024-10-16",
    deliveryDate: "2024-10-16",
    rate: 500,
    dispatch_status: "LOADING",
    planner: "Lisa Brown"
  },
  {
    id: 41,
    carrier: "Express Transit",
    customer: "Acme Corp",
    pickupLocation: "Atlanta, GA",
    deliveryLocation: "Charlotte, NC",
    pickupDate: "2024-10-20",
    deliveryDate: "2024-10-20",
    rate: 700,
    dispatch_status: "DEL TRACKING",
    planner: "Sarah Johnson"
  },
  {
    id: 42,
    carrier: "Cargo Masters",
    customer: "Global Inc",
    pickupLocation: "Los Angeles, CA",
    deliveryLocation: "Phoenix, AZ",
    pickupDate: "2024-10-25",
    deliveryDate: "2024-10-26",
    rate: 800,
    dispatch_status: "DELIVERING",
    planner: "Mike Chen"
  }
].map((shipment, index) => {
  const planners = [
    "Sarah Johnson",
    "Mike Chen",
    "David Rodriguez",
    "Emily Taylor",
    "James Wilson",
    "Maria Garcia",
    "Tom Anderson",
    "Lisa Brown"
  ];
  
  const statuses = [
    "Available",
    "Planned", 
    "PU TRACKING",
    "LOADING",
    "DEL TRACKING",
    "DELIVERING"
  ];
  
  // Use modulo to cycle through statuses and planners
  const statusIndex = index % 6;
  const plannerIndex = index % planners.length;
  
  return {
    ...shipment,
    dispatch_status: statuses[statusIndex],
    planner: planners[plannerIndex]  // Add planner if not already set
  };
});

const Shipments = ({ isNewShipmentModalOpen, setIsNewShipmentModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedCarrier, setSelectedCarrier] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Get unique carriers for filter dropdown
  const uniqueCarriers = [...new Set(mockShipments.map(ship => ship.carrier))];

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort shipments
  const filteredShipments = mockShipments
    .filter(shipment => {
      const matchesSearch = Object.values(shipment)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCarrier = selectedCarrier === "all" || shipment.carrier === selectedCarrier;
      return matchesSearch && matchesCarrier;
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsNewShipmentModalOpen(true)}
        >
          New Shipment
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search shipments..."
          className="flex-1 px-4 py-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded px-4 py-2"
          value={selectedCarrier}
          onChange={(e) => setSelectedCarrier(e.target.value)}
        >
          <option value="all">All Carriers</option>
          {uniqueCarriers.map(carrier => (
            <option key={carrier} value={carrier}>{carrier}</option>
          ))}
        </select>
      </div>

      {/* Add table below the filters */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('id')}
              >
                ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('carrier')}
              >
                Carrier {sortField === 'carrier' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('customer')}
              >
                Customer {sortField === 'customer' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('pickupLocation')}
              >
                Pickup Location {sortField === 'pickupLocation' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('deliveryLocation')}
              >
                Delivery Location {sortField === 'deliveryLocation' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('pickupDate')}
              >
                Pickup Date {sortField === 'pickupDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('deliveryDate')}
              >
                Delivery Date {sortField === 'deliveryDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('rate')}
              >
                Rate {sortField === 'rate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('dispatch_status')}
              >
                Dispatch Status {sortField === 'dispatch_status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('planner')}
              >
                Planner {sortField === 'planner' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <tr 
                key={shipment.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedShipment(shipment)}
              >
                <td className="px-6 py-4 border-b">{shipment.id}</td>
                <td className="px-6 py-4 border-b">{shipment.carrier}</td>
                <td className="px-6 py-4 border-b">{shipment.customer}</td>
                <td className="px-6 py-4 border-b">{shipment.pickupLocation}</td>
                <td className="px-6 py-4 border-b">{shipment.deliveryLocation}</td>
                <td className="px-6 py-4 border-b">{shipment.pickupDate}</td>
                <td className="px-6 py-4 border-b">{shipment.deliveryDate}</td>
                <td className="px-6 py-4 border-b">${shipment.rate.toLocaleString()}</td>
                <td className="px-6 py-4 border-b">{shipment.dispatch_status}</td>
                <td className="px-6 py-4 border-b">{shipment.planner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShipmentDetailsModal
        isOpen={!!selectedShipment}
        onClose={() => setSelectedShipment(null)}
        shipment={selectedShipment}
      />
    </div>
  );
};

export default Shipments; 