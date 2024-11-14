import { Order } from "@/types/truckmate";

interface OrdersTableRowProps {
  order: Order;
  onClick: () => void;
}

export function OrdersTableRow({ order, onClick }: OrdersTableRowProps) {
  return (
    <tr className='hover:bg-gray-50 cursor-pointer' onClick={onClick}>
      <td className='px-6 py-4 border-b'>{order.orderId}</td>
      <td className='px-6 py-4 border-b'>{order.billToCode}</td>
      <td className='px-6 py-4 border-b'>{order.billType}</td>
      <td className='px-6 py-4 border-b'>{order.status}</td>
      <td className='px-6 py-4 border-b'>{order.serviceLevel}</td>
      <td className='px-6 py-4 border-b'>{order.createdTime}</td>
      <td className='px-6 py-4 border-b'>
        ${order.totalCharges?.toLocaleString() ?? "0"}
      </td>
      <td className='px-6 py-4 border-b'>{order.currentStatusBehaviour}</td>
    </tr>
  );
}
