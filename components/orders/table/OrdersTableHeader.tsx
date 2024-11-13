import { Order } from "@/types/truckmate";

interface OrdersTableHeaderProps {
  sortField: keyof Order;
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof Order) => void;
}

export function OrdersTableHeader({
  sortField,
  sortDirection,
  handleSort,
}: OrdersTableHeaderProps) {
  const headers = [
    { key: "orderId", label: "Order ID" },
    { key: "billTo", label: "Bill To" },
    { key: "billType", label: "Bill Type" },
    { key: "status", label: "Status" },
    { key: "serviceLevel", label: "Service Level" },
    { key: "createdTime", label: "Created Time" },
    { key: "totalCharges", label: "Total Charges" },
    { key: "currentStatusBehaviour", label: "Status Behavior" },
  ] as const;

  return (
    <tr className='bg-gray-100'>
      {headers.map(({ key, label }) => (
        <th
          key={key}
          className='px-6 py-3 border-b cursor-pointer hover:bg-gray-200'
          onClick={() => handleSort(key)}
        >
          {label} {sortField === key && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
      ))}
    </tr>
  );
}
