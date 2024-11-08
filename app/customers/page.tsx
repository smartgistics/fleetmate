"use client";

import { useState } from "react";
import { CustomerData } from "@/types";
import { mockShipments } from "@/mocks/Shipments";
import CustomerDetailsModal from "../../components/CustomerDetailsModal";

type SortableFields = keyof CustomerData;

function getMostFrequent(arr: string[]): string {
  return Object.entries(
    arr.reduce<Record<string, number>>((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {})
  ).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}

// Process customer data
const mockCustomers: CustomerData[] = Array.from(
  new Set(mockShipments.map((ship) => ship.customer))
).map((customer, index) => {
  const customerShipments = mockShipments.filter(
    (ship) => ship.customer === customer
  );
  return {
    id: index + 1,
    name: customer,
    totalShipments: customerShipments.length,
    totalSpent: customerShipments.reduce(
      (sum, ship) => sum + (ship.rate || 0),
      0
    ),
    avgShipmentCost: Math.round(
      customerShipments.reduce((sum, ship) => sum + (ship.rate || 0), 0) /
        customerShipments.length
    ),
    commonLocations: {
      pickup: getMostFrequent(
        customerShipments
          .map((ship) => ship.pickupLocation)
          .filter((location): location is string => !!location)
      ),
      delivery: getMostFrequent(
        customerShipments
          .map((ship) => ship.deliveryLocation)
          .filter((location): location is string => !!location)
      ),
    },
    lastShipmentDate: new Date(
      Math.max(
        ...customerShipments.map((ship) =>
          new Date(ship.deliveryDate).getTime()
        )
      )
    )
      .toISOString()
      .split("T")[0],
  };
});

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortableFields>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    null
  );

  const handleSort = (field: SortableFields) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort customers
  const filteredCustomers = mockCustomers
    .filter((customer) =>
      Object.values(customer)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  return (
    <div className='p-6 text-gray-900'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Customers</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search customers...'
          className='w-full px-4 py-2 border rounded text-gray-900 placeholder-gray-500'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr className='bg-gray-100 text-gray-900'>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("id")}
              >
                ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("name")}
              >
                Customer Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("totalShipments")}
              >
                Total Shipments{" "}
                {sortField === "totalShipments" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("totalSpent")}
              >
                Total Spent{" "}
                {sortField === "totalSpent" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("avgShipmentCost")}
              >
                Avg Cost{" "}
                {sortField === "avgShipmentCost" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className='px-6 py-3 border-b'>Most Common Pickup</th>
              <th className='px-6 py-3 border-b'>Most Common Delivery</th>
              <th
                className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
                onClick={() => handleSort("lastShipmentDate")}
              >
                Last Shipment{" "}
                {sortField === "lastShipmentDate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-900'>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className='hover:bg-gray-50 cursor-pointer'
                onClick={() => setSelectedCustomer(customer)}
              >
                <td className='px-6 py-4 border-b'>{customer.id}</td>
                <td className='px-6 py-4 border-b font-medium'>
                  {customer.name}
                </td>
                <td className='px-6 py-4 border-b'>
                  {customer.totalShipments}
                </td>
                <td className='px-6 py-4 border-b'>
                  ${customer.totalSpent.toLocaleString()}
                </td>
                <td className='px-6 py-4 border-b'>
                  ${customer.avgShipmentCost.toLocaleString()}
                </td>
                <td className='px-6 py-4 border-b'>
                  {customer.commonLocations.pickup}
                </td>
                <td className='px-6 py-4 border-b'>
                  {customer.commonLocations.delivery}
                </td>
                <td className='px-6 py-4 border-b'>
                  {customer.lastShipmentDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <CustomerDetailsModal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </div>
  );
}
