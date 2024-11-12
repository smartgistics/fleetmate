import type { FormData } from "@/types";

type StringFields = Extract<keyof FormData, string>;
type ExtractableFields = Exclude<
  StringFields,
  "customerCharges" | "carrierCharges" | "miscCharges" | "commodities"
>;

const STRING_FIELDS = [
  "commodityCode",
  "customer",
  "customerReference",
  "customerContact",
  "contactPhone",
  "contactEmail",
  "billingAddress",
  "equipmentType",
  "serviceLevel",
  "tempMin",
  "tempMax",
  "notes",
  "accountManager",
  "orderPlanner",
  "status",
  "parentAccount",
  "customerId",
  "creditStatus",
  "contractType",
] as const;

type StringField = (typeof STRING_FIELDS)[number];

const SHIPPING_PATTERNS: Partial<Record<ExtractableFields, RegExp>> = {
  customer: /Customer:\s*([^\n]+)/i,
  customerReference: /Reference(?:\sNumber)?:\s*([^\n]+)/i,
  customerContact: /Contact(?:\sName)?:\s*([^\n]+)/i,
  contactPhone: /(?:Phone|Tel|Telephone):\s*([^\n]+)/i,
  contactEmail: /Email:\s*([^\n]+)/i,
  billingAddress: /Billing\sAddress:\s*((?:[^\n]+\n?)+)/i,
  equipmentType: /Equipment(?:\sType)?:\s*([^\n]+)/i,
  serviceLevel: /Service(?:\sLevel)?:\s*([^\n]+)/i,
  commodityCode: /Commodity(?:\sCode)?:\s*([^\n]+)/i,
  tempMin: /Min\s*Temp:\s*([-\d.]+)/i,
  tempMax: /Max\s*Temp:\s*([-\d.]+)/i,
  notes: /Notes:\s*([^\n]+)/i,
  accountManager: /Account\sManager:\s*([^\n]+)/i,
  orderPlanner: /Order\sPlanner:\s*([^\n]+)/i,
  status: /Status:\s*([^\n]+)/i,
  parentAccount: /Parent\sAccount:\s*([^\n]+)/i,
  customerId: /Customer\sID:\s*([^\n]+)/i,
  creditStatus: /Credit\sStatus:\s*([^\n]+)/i,
  contractType: /Contract\sType:\s*([^\n]+)/i,
};

function isStringField(key: string): key is StringField {
  return STRING_FIELDS.includes(key as StringField);
}

export function extractShippingData(text: string): Partial<FormData> {
  const data: Partial<FormData> = {};

  Object.entries(SHIPPING_PATTERNS).forEach(([key, pattern]) => {
    if (isStringField(key)) {
      const match = text.match(pattern);
      if (match?.[1]) {
        const value = match[1].trim();
        if (value) {
          (data as Record<StringField, string>)[key] = value;
        }
      }
    }
  });

  // Special handling for temperature control
  const tempControlled = /Temperature\s*Controlled:\s*(Yes|No)/i.exec(text);
  if (tempControlled) {
    data.temperatureControlled = tempControlled[1].toLowerCase() === "yes";
  }

  return data;
}

export function mapExcelToFormData(
  row: Record<string, unknown>
): Partial<FormData> {
  const data: Partial<FormData> = {};

  Object.entries(row).forEach(([excelField, value]) => {
    if (value != null && value !== "") {
      const formField = excelField.toLowerCase().replace(/\s+/g, "");

      if (formField === "temperaturecontrolled") {
        data.temperatureControlled = String(value).toLowerCase() === "yes";
      } else if (isStringField(formField)) {
        (data as Record<StringField, string>)[formField] = String(value).trim();
      }
    }
  });

  return data;
}
