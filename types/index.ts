export interface SearchResult {
  type: "shipment" | "carrier" | "customer";
  id: string | number;
  title: string;
  subtitle: string;
}

export interface Shipment {
  id: number;
  carrier?: string;
  customer: string;
  deliveryLocation: string;
  deliveryDate: string;
  deliveryTime: string;
  dispatchStatus: string;
  equipmentType: string;
  planner: string;
  pickupDate?: string;
  pickupLocation?: string;
  planningStatus?: string;
  pickupTime?: string;
  rate?: number;
  referenceNumbers: string;
  specialInstructions?: string;
}

export interface WeeklyData {
  week: string;
  revenue: number;
  shipments: number;
}

export interface CountItem {
  name: string;
  count: number;
}

export interface RevenueItem {
  name: string;
  total: number;
}

export interface Location {
  address: string;
  date: string;
  startTime: string;
  endTime: string;
  confirmed: boolean;
  confirmationNumber: string;
  notes?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface Commodity {
  code: string;
  description: string;
  weight: number;
  pieces: number;
  pallets: number;
  cube?: number;
  volume?: number;
}

export interface FormData {
  // Customer Tab
  customer: string;
  customerReference: string;
  customerContact: string;
  contactPhone: string;
  contactEmail: string;
  billingAddress: string;

  // Order Details Tab
  contractType: string;
  equipmentType: string;
  serviceLevel: string;
  temperatureControlled: boolean;
  tempMin: string;
  tempMax: string;
  commodityCode: string;
  commodities: Commodity[];

  // Pickup/Delivery Tabs
  pickupLocations: Location[];
  deliveryLocations: Location[];

  // Financials Tab
  customerCharges: Charge[];
  carrierCharges: Charge[];
  miscCharges: Charge[];

  // Additional Fields
  notes: string;
  accountManager: string;
  orderPlanner: string;
  status: string;
  parentAccount: string;
  customerId: string;
  creditStatus: string;
  weight?: string;
  pieces?: string;
  pallets?: string;
  cube?: string;
  volume?: string;
}

export interface Charge {
  type: string;
  quantity: number;
  amount: number;
}

export interface CarrierData {
  id: number;
  name: string;
  totalShipments: number;
  totalRevenue: number;
  avgShipmentRate: number;
  activeRoutes: number;
  lastShipmentDate: string;
}

export interface CustomerData {
  id: number;
  name: string;
  totalShipments: number;
  totalSpent: number;
  avgShipmentCost: number;
  commonLocations: {
    pickup: string;
    delivery: string;
  };
  lastShipmentDate: string;
  primaryContact: string;
  contactPhone: string;
  contactEmail: string;
  billingAddress?: string;
  defaultEquipment: string;
  requiresTemperatureControl: boolean;
  defaultTempMin?: string;
  defaultTempMax?: string;
}

export interface DashboardCardProps {
  title: string;
  items: CountItem[] | RevenueItem[];
  valueLabel: string;
}

export interface RevenueChartProps {
  data: WeeklyData[];
}
