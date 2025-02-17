import { ServiceLevel, Commodity, PaginatedTruckMateResponse } from './common'

// Client/Account related types
export interface Client {
  clientId: string
  name: string
  address1: string
  address2?: string
  city: string
  province: string
  country: string
  postalCode: string
  businessPhone?: string
  businessPhoneExt?: string
  faxPhone?: string
  businessCell?: string
  openTime?: string
  closeTime?: string
  comments?: string
  preferredDriver?: string
  customerSince?: string
  altContact?: string
  altBusinessPhone?: string
  altBusinessPhoneExt?: string
  altFaxPhone?: string
  altBusinessCell?: string
  status: 'lost' | 'lead' | 'doNotCall' | 'terminated' | 'prospect' | 'active'
  type: string
  taxId?: string
  webEnabled?: boolean
  parentAccount?: string
  creditStatus?: string
  user1?: string
  user2?: string
  user3?: string
  user4?: string
  user5?: string
  user6?: string
  user7?: string
  user8?: string
  user9?: string
  user10?: string
}

// Driver types
export interface Driver {
  driverId: string
  employeeId: string
  status: 'active' | 'inactive'

  // Personal Info
  firstName: string
  lastName: string
  dateOfBirth: string
  licenseNumber: string
  licenseState: string
  licenseExpiration: string

  // Contact Info
  phone: string
  email?: string
  address: {
    street1: string
    street2?: string
    city: string
    state: string
    zip: string
  }

  // Qualifications
  endorsements: string[]
  restrictions?: string[]
  hazmatCertified: boolean
  hazmatExpiration?: string
  driverCycle?: '7' | '8' | '14' | 'BFM' | 'STD' | 'WA'
  driverCycleZone?: 'AU' | 'CA' | 'US'

  // Employment
  hireDate: string
  terminationDate?: string
  homeTerminal: string
  dispatchGroup?: string
  homeZone?: string

  // Equipment & Certifications
  assignedUnit?: string
  equipmentQualifications: string[]
  drugTest?: boolean
  roadTest?: boolean
  twic?: boolean
  tdgCert?: boolean
  tdgExpiryDate?: string
  abstractExpiryDate?: string
}

export const VENDOR_TYPES = {
  agentCarrier: 'Agent Carrier',
  agentSales: 'Agent Sales',
  broker: 'Broker',
  competitorCarrier: 'Competitor Carrier',
  customsBroker: 'Customs Broker',
  insurer: 'Insurer',
  interliner: 'Interliner',
  linehaulCarrier: 'Line haul carrier',
  other: 'Other',
  palletCompany: 'Pallet company',
  rental: 'Rental',
  supplier: 'Supplier',
  vendor: 'Vendor',
} as const

export type VendorType = keyof typeof VENDOR_TYPES

// Vendor/Carrier types
export interface Vendor {
  aChargeCodes?: AChargeCode[]
  aChargeSplits?: AChargeSplit[]
  address1: string
  address2?: string
  businessPhone?: string
  businessPhoneExt?: string
  city: string
  comment?: string
  contact?: string
  contacts?: Contact[]
  country: string
  customDefs?: CustomDef[]
  d83s?: D83[]
  defaultZone?: string
  discounts?: Discount[]
  faxPhone?: string
  id: string
  insurance?: string
  isActive?: 'True' | 'False' | ''
  isInactive?: 'True' | 'False'
  liability?: string
  longDescription?: string
  name: string
  postalCode: string
  previousCode?: string
  province: string
  rateSheetLinks?: RateSheetLink[]
  shortDescription?: string
  status?: string
  tariffClasses?: VendorTariffClass[]
  travelModes?: TravelMode[]
  user10?: string
  user1?: string
  user2?: string
  user3?: string
  user4?: string
  user5?: string
  user6?: string
  user7?: string
  user8?: string
  user9?: string
  vendorId: string
  vendorSince?: string
  vendorType: VendorType
  webEnabled?: 'True' | 'False' | ''
}

// Charge Code types
export interface ChargeCode {
  code: string
  description: string
  type: string
  active: boolean
  taxable: boolean
  fuelSurchargeable: boolean
  accessorialCode?: string
}

// Response types
export interface ClientsResponse extends PaginatedTruckMateResponse {
  clients: Client[]
}
export interface ServiceLevelsResponse extends PaginatedTruckMateResponse {
  serviceLevels: ServiceLevel[]
}
export interface CommoditiesResponse extends PaginatedTruckMateResponse {
  commodities: Commodity[]
}
export interface ChargeCodesResponse extends PaginatedTruckMateResponse {
  chargeCodes: ChargeCode[]
}
export interface DriversResponse extends PaginatedTruckMateResponse {
  drivers: Driver[]
}
export interface VendorsResponse extends PaginatedTruckMateResponse {
  vendors: Vendor[]
}

// Vendor related interfaces
interface VendorTariffClass {
  tariffClassId: number
  vendorId: string
  description?: string
  effectiveFrom?: string // DateTime: yyyy-MM-ddThh:mm:ss
  effectiveTo?: string // DateTime: yyyy-MM-ddThh:mm:ss
  multiServiceLevels?: VendorMultiServiceLevel[]
}

interface VendorMultiServiceLevel {
  multiServiceLevelId: number
  tariffClassId: number
  serviceLevel: string // Max length 10
  remarks?: string // Max length 100
  isDefault?: boolean
}

interface RateSheetLink {
  rateSheetLinkId: number
  vendorId: string
  rateSheetId: number
  effectiveFrom?: string // DateTime: yyyy-MM-ddThh:mm:ss
  effectiveTo?: string // DateTime: yyyy-MM-ddThh:mm:ss
  description?: string // Max length 40
}

interface Contact {
  contactId: number
  vendorId: string
  name: string // Max length 40
  title?: string // Max length 20
  phone?: string // Max length 20
  phoneExt?: string // Max length 5
  cell?: string // Max length 20
  fax?: string // Max length 20
  email?: string // Max length 128
  comment?: string // Max length 240
  contactType?: string // Max length 20
}

interface Discount {
  discountId: number
  vendorId: string
  description?: string // Max length 40
  effectiveFrom?: string // DateTime: yyyy-MM-ddThh:mm:ss
  effectiveTo?: string // DateTime: yyyy-MM-ddThh:mm:ss
  discountPercentage?: number
  minimumAmount?: number
  customSQL?: string // Max length 131072
}

interface D83 {
  d83Id: number
  vendorId: string
  splitPlusPercentage?: 'True' | 'False' | ''
  exceedMinimum?: 'True' | 'False' | ''
  addOnPercentage?: number
  carrierDiscount?: number
  effectiveFrom?: string // DateTime: yyyy-MM-ddThh:mm:ss
  effectiveTo?: string // DateTime: yyyy-MM-ddThh:mm:ss
  carrierMaximum?: number
  carrierMinimum?: number
  description?: string // Max length 40
  destinationEndingZip?: string // Max length 10
  destinationStartingZip?: string // Max length 10
  endZone?: string // Max length 10
  originEndingZip?: string // Max length 10
  originStartingZip?: string // Max length 10
  sequence?: number
}

interface AChargeSplit {
  aChargeSplitId: number
  vendorId: string
  aChargeCodeId: string // Max length 10
  splitPercentage?: number
  effectiveFrom?: string // DateTime: yyyy-MM-ddThh:mm:ss
  effectiveTo?: string // DateTime: yyyy-MM-ddThh:mm:ss
  description?: string // Max length 40
}

interface AChargeCode {
  aChargeCodeId: string // Max length 10
  vendorId: string
  description?: string // Max length 40
  effectiveFrom?: string // DateTime: yyyy-MM-ddThh:mm:ss
  effectiveTo?: string // DateTime: yyyy-MM-ddThh:mm:ss
  carrierMovementType?:
    | 'advance'
    | 'any'
    | 'beyond'
    | 'crossdock'
    | 'linehaul'
    | 'other'
  passType?: 'none' | 'percentage' | 'quantity'
  thresholdAmount?: number
  excludeLegs?: 'True' | 'False'
  aChargeDetails?: AChargeDetail[]
  valuations?: AChargeValuation[]
  restrictBillTypes?: RestrictBillType[]
}

interface AChargeDetail {
  aChargeDetailId: number
  aChargeCodeId: string
  factor: number
  effectiveFrom?: string // DateTime: yyyy-MM-ddThh:mm:ss
  effectiveTo?: string // DateTime: yyyy-MM-ddThh:mm:ss
  multiVendors?: MultiVendor[]
  multiServiceLevels?: AChargeDetailMultiServiceLevel[]
}

interface AChargeValuation {
  valuationId: number
  aChargeCodeId: string
  valuation: string // Max length 10
}

interface RestrictBillType {
  restrictBillTypeId: number
  aChargeCodeId: string
  billType: string // Max length 10
}

interface MultiVendor {
  multiVendorId: number
  aChargeDetailId: number
  vendorId: string // Max length 10
}

interface AChargeDetailMultiServiceLevel {
  multiServiceLevelId: number
  aChargeDetailId: number
  aChargeCodeId: string // Max length 10
  serviceLevel: string // Max length 10
}

interface CustomDef {
  customDefId: number
  customLabel: string
  customValue: string | number
  customType?: string
  sequence?: number
}

interface TravelMode {
  vendorId: string
  travelMode: string // Max length 10
  remarks?: string // Max length 100
  matrixId?: number
  isDefault?: boolean
}
