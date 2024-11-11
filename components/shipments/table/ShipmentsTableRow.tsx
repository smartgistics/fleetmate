import { Shipment } from "@/types";

interface ShipmentsTableRowProps {
  shipment: Shipment;
  onClick: () => void;
}

export function ShipmentsTableRow({
  shipment,
  onClick,
}: ShipmentsTableRowProps) {
  return (
    <tr className='hover:bg-gray-50 cursor-pointer' onClick={onClick}>
      <td className='px-6 py-4 border-b'>{shipment.id}</td>
      <td className='px-6 py-4 border-b'>{shipment.carrier}</td>
      <td className='px-6 py-4 border-b'>{shipment.customer}</td>
      <td className='px-6 py-4 border-b'>{shipment.pickupLocation}</td>
      <td className='px-6 py-4 border-b'>{shipment.deliveryLocation}</td>
      <td className='px-6 py-4 border-b'>{shipment.pickupDate}</td>
      <td className='px-6 py-4 border-b'>{shipment.deliveryDate}</td>
      <td className='px-6 py-4 border-b'>
        ${shipment.rate?.toLocaleString() ?? "0"}
      </td>
      <td className='px-6 py-4 border-b'>{shipment.dispatchStatus}</td>
      <td className='px-6 py-4 border-b'>{shipment.planner}</td>
    </tr>
  );
}
