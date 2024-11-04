// Basic type definitions for common fields
type UUID = string;
type Currency = 'USD' | 'CAD' | 'MXN';
type LoadType = 'FTL' | 'LTL' | 'Partial' | 'Intermodal';
type ShipmentStatus = 
  | 'Pending' 
  | 'Dispatched'
  | 'In Transit'
  | 'Delivered'
  | 'Cancelled'
  | 'Exception';

// Core Shipment Model
interface Shipment {
  id: UUID;
  referenceNumber: string;
  customerId: UUID;
  carrierId: UUID;
  status: ShipmentStatus;
  loadType: LoadType;
  
  // Pricing
  rate: number;
  currency: Currency;
  carrierPay: number;
  
  // Dates
  pickupDate: Date;
  deliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Location Information
  origin: Location;
  destination: Location;
  
  // Cargo Details
  weight: number;
  pieces: number;
  palletCount?: number;
  commodity: string;
  specialInstructions?: string;
  
  // Documents
  documents?: Document[];
  
  // Tracking
  trackingEvents: TrackingEvent[];
}

// Location Model
interface Location {
  id: UUID;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  appointmentRequired: boolean;
  hours?: string;
}

// Customer Model
interface Customer {
  id: UUID;
  name: string;
  accountNumber: string;
  billingAddress: Location;
  shippingAddresses: Location[];
  creditLimit?: number;
  paymentTerms: string;
  contacts: Contact[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Carrier Model
interface Carrier {
  id: UUID;
  name: string;
  mcNumber: string;
  dotNumber: string;
  address: Location;
  insuranceExpiry: Date;
  insuranceCoverage: number;
  equipmentTypes: string[];
  preferredLanes: Lane[];
  safetyRating?: string;
  active: boolean;
  contacts: Contact[];
  createdAt: Date;
  updatedAt: Date;
}

// Contact Model
interface Contact {
  id: UUID;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  primary: boolean;
}

// Document Model
interface Document {
  id: UUID;
  type: 'BOL' | 'POD' | 'Invoice' | 'RateConfirmation' | 'Other';
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  uploadedBy: UUID;
}

// Tracking Event Model
interface TrackingEvent {
  id: UUID;
  shipmentId: UUID;
  status: ShipmentStatus;
  location?: Location;
  timestamp: Date;
  notes?: string;
  createdBy: UUID;
}

// Lane Model
interface Lane {
  id: UUID;
  originState: string;
  destinationState: string;
  preferredRate?: number;
}

// Invoice Model
interface Invoice {
  id: UUID;
  shipmentId: UUID;
  customerId: UUID;
  invoiceNumber: string;
  amount: number;
  currency: Currency;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Void';
  dueDate: Date;
  issuedDate: Date;
  paidDate?: Date;
  lineItems: InvoiceLineItem[];
}

// Invoice Line Item Model
interface InvoiceLineItem {
  id: UUID;
  invoiceId: UUID;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
} 