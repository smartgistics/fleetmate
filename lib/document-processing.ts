import { FormData } from "@/types"

export function extractShippingData(text: string): Partial<FormData> {
  const data: Partial<FormData> = {}
  
  // Example pattern matching - enhance based on your PDF formats
  const patterns = {
    customer: /Customer:\s*([^\n]+)/,
    customerReference: /Reference:\s*([^\n]+)/,
    customerContact: /Contact:\s*([^\n]+)/,
    contactPhone: /Phone:\s*([^\n]+)/,
    contactEmail: /Email:\s*([^\n]+)/,
    billingAddress: /Billing Address:\s*([^\n]+)/,
  }

  // Extract data using patterns
  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = text.match(pattern)
    if (match) {
      data[key as keyof FormData] = match[1].trim()
    }
  })

  return data
}

export function mapExcelToFormData(row: any): Partial<FormData> {
  return {
    customer: row.Customer || "",
    customerReference: row.Reference || "",
    customerContact: row.Contact || "",
    contactPhone: row.Phone || "",
    contactEmail: row.Email || "",
    billingAddress: row.Address || "",
    // Map additional fields as needed
  }
} 