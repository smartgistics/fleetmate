import { PaginatedTruckMateResponse } from "./common";
import { Client } from "./masterdata";

export interface Order {
  orderId: number;
  billTo: string;
  billType: string;
  commodity: string;
  createdBy: string;
  createdTime: string;
  status: string;
  serviceLevel: string;
  currentStatusBehaviour: string;
  totalCharges: number;

  // Financial
  charges: number;
  tax1: number;
  tax2: number;

  // Dates and Times
  actualDelivery: string;
  actualPickup: string;
  billDate: string;
  billNumber: string;
  billNumberKey: string;

  // Additional Details
  billToCode: string;
  billingAuditNumber: number;
  carrierMarkupBase: number | null;
  carrierMarkupExtra: number | null;
  cashCollect: string;
  codAmount: number | null;
  currencyCode: string;

  // Expanded Data (from API expansion)
  billToCustomer?: Client;

  // Measurements
  weight: number;
  weightUnits: string;
  pieces: number;
  piecesUnits: string;
  pallets: number;
  palletUnits: string;
  cube: number;
  cubeUnits: string;
  volume: number;
  volumeUnits: string;
  temperature: number;
  temperatureUnits: string;
  distance: number;
  distanceUnits: string;
}

export interface OrdersResponse extends PaginatedTruckMateResponse {
  orders: Order[];
}
