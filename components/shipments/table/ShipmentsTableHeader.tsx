import { Shipment } from "@/types";

interface ShipmentsTableHeaderProps {
  sortField: keyof Shipment;
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof Shipment) => void;
}

export function ShipmentsTableHeader({
  sortField,
  sortDirection,
  handleSort,
}: ShipmentsTableHeaderProps) {
  const headers = [
    { key: "id", label: "ID" },
    { key: "carrier", label: "Carrier" },
    { key: "customer", label: "Customer" },
    { key: "pickupLocation", label: "Pickup Location" },
    { key: "deliveryLocation", label: "Delivery Location" },
    { key: "pickupDate", label: "Pickup Date" },
    { key: "deliveryDate", label: "Delivery Date" },
    { key: "rate", label: "Rate" },
    { key: "dispatch_status", label: "Dispatch Status" },
    { key: "planner", label: "Planner" },
  ];

  return (
    <tr className='bg-gray-100'>
      {headers.map(({ key, label }) => (
        <th
          key={key}
          className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
          onClick={() => handleSort(key as keyof Shipment)}
        >
          {label} {sortField === key && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
      ))}
    </tr>
  );
}
