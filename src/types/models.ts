export interface Shipment {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  customer: string;
  carrier: string;
  date: string;
  status: 'pending' | 'inProgress' | 'completed';
} 