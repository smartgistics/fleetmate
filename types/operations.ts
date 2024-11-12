export interface Shipment {
  id: number;
  carrier: string;
  customer: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  rate: number;
  dispatch_status: string;
  planner: string;
  planning_status: string;
} 