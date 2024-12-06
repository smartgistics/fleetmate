'use server'

import {
  TruckMateQueryParams,
  OrdersResponse,
  TripsResponse,
  ClientsResponse,
  CommoditiesResponse,
  VendorsResponse,
  Client,
  TripsQueryParams,
  Vendor,
} from '@/types/truckmate'

const TRUCKMATE_API_URL = process.env.TRUCKMATE_API_URL
const TM_MASTERDATA_API_URL = process.env.TM_MASTERDATA_API_URL
const API_KEY = process.env.TM_API_KEY

const DEFAULT_LIMIT = 20

const toTMTruthy = (bool: any) => (bool ? 'True' : 'False')

const fetchWithAuth = async <T>(
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> => {
  if (!API_KEY) {
    console.error('TM_API_KEY is not configured')
    throw new Error('API key is not configured')
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
    Accept: 'application/json',
    'X-API-Version': '1.0',
  }

  if (!url) {
    throw new Error('API URL is not configured')
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 0 },
    })

    // Handle rate limiting
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After')
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 1000
      await new Promise((resolve) => setTimeout(resolve, waitTime))
      return fetchWithAuth<T>(url, options, retryCount)
    }

    // Handle server errors with retry
    if (response.status >= 500 && retryCount < 3) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, retryCount))
      )
      return fetchWithAuth<T>(url, options, retryCount + 1)
    }

    const data = await response.json()

    if (!response.ok) {
      console.error('API Error:', data)
    }

    return data as T
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

export const fetchOrders = async (
  params: TruckMateQueryParams = {}
): Promise<OrdersResponse> => {
  if (!TRUCKMATE_API_URL) {
    console.warn('TRUCKMATE_API_URL is not configured')
    return {
      href: '',
      offset: 0,
      limit: DEFAULT_LIMIT,
      sort: '',
      filter: '',
      select: '',
      count: 0,
      orders: [],
    }
  }

  const queryParams = new URLSearchParams()

  // Add only defined parameters
  if (params.offset !== undefined)
    queryParams.set('offset', params.offset.toString())
  if (params.limit !== undefined)
    queryParams.set('limit', params.limit.toString())
  if (params.filter) queryParams.set('$filter', params.filter)
  if (params.select) queryParams.set('$select', params.select.join(','))
  if (params.orderBy) queryParams.set('$orderBy', params.orderBy)
  if (params.expand) queryParams.set('expand', params.expand.join(','))

  const url = `${TRUCKMATE_API_URL}/orders?${queryParams.toString()}`
  console.log('Fetching orders from', url)

  try {
    const response = await fetchWithAuth<OrdersResponse>(url)
    return {
      href: response.href,
      offset: response.offset,
      limit: response.limit,
      filter: response.filter,
      sort: response.sort,
      select: response.select,
      count: response.count,
      orders: Array.isArray(response.orders) ? response.orders : [],
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      filter: '',
      sort: '',
      select: '',
      count: 0,
      orders: [],
    }
  }
}

export const fetchTrips = async (
  params: TripsQueryParams = {}
): Promise<TripsResponse> => {
  if (!TRUCKMATE_API_URL) {
    console.warn('TRUCKMATE_API_URL is not configured')
    return {
      href: '',
      offset: 0,
      limit: DEFAULT_LIMIT,
      filter: '',
      sort: '',
      select: '',
      count: 0,
      trips: [],
    }
  }

  const queryParams = new URLSearchParams()

  // Add only defined parameters
  if (params.limit !== undefined)
    queryParams.set('limit', params.limit.toString())
  if (params.offset !== undefined)
    queryParams.set('offset', params.offset.toString())
  if (params.filter) queryParams.set('$filter', params.filter)
  // if (params.select) queryParams.set("$select", params.select.join(","));
  if (params.orderBy) queryParams.set('$orderBy', params.orderBy)
  if (params.expand) queryParams.set('expand', params.expand.join(','))
  if (params.codeBehavior) queryParams.set('codeBehavior', params.codeBehavior)

  const url = `${TRUCKMATE_API_URL}/trips?${queryParams.toString()}`
  console.log('Fetching trips from', url)

  try {
    const response = await fetchWithAuth<TripsResponse>(url)
    return {
      href: response.href,
      offset: response.offset,
      limit: response.limit,
      sort: response.sort,
      filter: response.filter,
      select: response.select,
      count: response.count,
      trips: Array.isArray(response.trips) ? response.trips : [],
    }
  } catch (error) {
    console.error('Failed to fetch trips:', error)
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: '',
      filter: '',
      select: '',
      count: 0,
      trips: [],
    }
  }
}

export const fetchCommodities = async (
  params: TruckMateQueryParams = {}
): Promise<CommoditiesResponse> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error('TM_MASTERDATA_API_URL is not configured')
  }

  const queryParams = new URLSearchParams()

  if (params.limit !== undefined)
    queryParams.set('limit', params.limit.toString())
  if (params.offset !== undefined)
    queryParams.set('offset', params.offset.toString())
  if (params.filter) queryParams.set('$filter', params.filter)
  if (params.select) queryParams.set('$select', params.select.join(','))
  if (params.orderBy) queryParams.set('$orderBy', params.orderBy)
  if (params.expand) queryParams.set('expand', params.expand.join(','))

  const url = `${TM_MASTERDATA_API_URL}/commodities?${queryParams.toString()}`
  console.log('Fetching commodities from', url)

  try {
    const response = await fetchWithAuth<CommoditiesResponse>(url)
    return {
      href: response.href,
      offset: response.offset,
      limit: response.limit,
      sort: response.sort,
      filter: response.filter,
      select: response.select,
      count: response.count,
      commodities: Array.isArray(response.commodities)
        ? response.commodities
        : [],
    }
  } catch (error) {
    console.error('Failed to fetch commodities:', error)
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: '',
      filter: '',
      select: '',
      count: 0,
      commodities: [],
    }
  }
}

export const fetchClients = async (
  params: TruckMateQueryParams = {}
): Promise<ClientsResponse> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error('TM_MASTERDATA_API_URL is not configured')
  }

  const queryParams = new URLSearchParams()

  // Add only defined parameters with correct $ prefix for OData
  if (params.limit !== undefined)
    queryParams.set('limit', params.limit.toString())
  if (params.offset !== undefined)
    queryParams.set('offset', params.offset.toString())
  if (params.filter) queryParams.set('$filter', params.filter)
  if (params.select) queryParams.set('$select', params.select.join(','))
  if (params.orderBy) queryParams.set('$orderBy', params.orderBy)
  if (params.expand) queryParams.set('expand', params.expand.join(','))

  const url = `${TM_MASTERDATA_API_URL}/clients?${queryParams.toString()}`
  console.log('Fetching customers with URL:', url)

  try {
    const response = await fetchWithAuth<ClientsResponse>(url)
    console.log('API Response:', {
      count: response.count,
      clientsCount: response.clients?.length,
      filter: queryParams.get('$filter'),
      url: url,
    })

    return {
      href: response.href,
      offset: response.offset || params.offset || 0,
      limit: response.limit || params.limit || DEFAULT_LIMIT,
      sort: response.sort || '',
      filter: response.filter || '',
      select: response.select || '',
      count: response.count || 0,
      clients: Array.isArray(response.clients)
        ? response.clients.map((client) => ({
            ...client,
            // Ensure required fields are present
            clientId: client.clientId || '',
            name: client.name || '',
            status: client.status || 'active',
            type: client.type || 'Regular',
          }))
        : [],
    }
  } catch (error) {
    console.error('Failed to fetch customers:', error)
    throw error
  }
}

export const fetchVendors = async (
  vendorType?: Vendor['vendorType'],
  params: TruckMateQueryParams = {}
): Promise<VendorsResponse> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error('TM_MASTERDATA_API_URL is not configured')
  }

  const queryParams = new URLSearchParams()

  // Add vendorType filter if provided
  const filters = []
  if (vendorType) {
    filters.push(`vendorType eq '${vendorType}'`)
  }
  if (params.filter) {
    filters.push(`(${params.filter})`)
  }
  if (filters.length > 0) {
    queryParams.set('$filter', filters.join(' and '))
  }

  // Add pagination parameters
  if (params.limit !== undefined) {
    queryParams.set('limit', params.limit.toString())
  }
  if (params.offset !== undefined) {
    queryParams.set('offset', params.offset.toString())
  }
  if (params.orderBy) {
    queryParams.set('$orderBy', params.orderBy)
  }
  if (params.select) {
    queryParams.set('$select', params.select.join(','))
  }
  if (params.expand) {
    queryParams.set('expand', params.expand.join(','))
  }

  const url = `${TM_MASTERDATA_API_URL}/vendors?${queryParams.toString()}`
  console.log('Fetching vendors from', url)

  try {
    const response = await fetchWithAuth<VendorsResponse>(url)
    return {
      href: response.href,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: response.sort,
      filter: response.filter,
      select: response.select,
      count: response.count,
      vendors: Array.isArray(response.vendors) ? response.vendors : [],
    }
  } catch (error) {
    console.error('Failed to fetch vendors:', error)
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: '',
      filter: '',
      select: '',
      count: 0,
      vendors: [],
    }
  }
}

const requiredVendorFields = {
  name: 'Name',
  address1: 'Address',
  city: 'City',
  province: 'Province',
  country: 'Country',
  postalCode: 'Postal/ZIP code',
  vendorType: 'Vendor type',
}

export const vendorPost = async (
  clientData: Partial<Vendor>
): Promise<Vendor> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error('TM_MASTERDATA_API_URL is not configured')
  }

  const url = `${TM_MASTERDATA_API_URL}/vendors`

  // Format the request body according to API spec
  const requestBody = {
    ...clientData,
    webEnabled: toTMTruthy(clientData.webEnabled),
  }

  // Validate required fields before making request
  Object.entries(requiredVendorFields).forEach(([field, label]) => {
    if (!requestBody[field]) {
      throw new Error(`${label} is required`)
    }
  })

  console.log('Creating new vendor:', {
    url,
    requestBody,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': '1.0',
      Authorization: 'Bearer [REDACTED]',
    },
  })

  try {
    const response = await fetchWithAuth<{ vendor: Vendor }>(url, {
      body: JSON.stringify({ vendors: [requestBody] }),
      method: 'POST',
    })

    console.log('Vendor creation response:', response)
    return response.vendor
  } catch (error) {
    let errorMessage = 'Failed to create vendor: '

    if (error instanceof Error) {
      console.error('Vendor creation error details:', {
        message: error.message,
        stack: error.stack,
        requestBody,
        url,
      })

      if (error.message.includes('400')) {
        errorMessage +=
          'Invalid input parameters. Please check all required fields.'
      } else if (error.message.includes('500')) {
        errorMessage +=
          'Internal server error. The server encountered an unexpected condition.'
      } else {
        errorMessage += error.message
      }
    } else {
      console.error('Unknown error during vendor creation:', error)
      errorMessage += 'An unexpected error occurred'
    }

    throw new Error(errorMessage)
  }
}

export const createClient = async (
  clientData: Partial<Client>
): Promise<Client> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error('TM_MASTERDATA_API_URL is not configured')
  }

  const url = `${TM_MASTERDATA_API_URL}/clients`

  // Format the request body according to API spec
  const requestBody = {
    address1: clientData.address1,
    address2: clientData.address2,
    altBusinessCell: clientData.altBusinessCell || '',
    altBusinessPhone: clientData.altBusinessPhone || '',
    altBusinessPhoneExt: clientData.altBusinessPhoneExt || '',
    altContact: clientData.altContact,
    altFaxPhone: clientData.altFaxPhone || '',
    businessCell: clientData.businessCell || '',
    businessPhone: clientData.businessPhone,
    businessPhoneExt: clientData.businessPhoneExt || '',
    city: clientData.city,
    clientId: clientData.clientId, // Required field
    closeTime: clientData.closeTime || undefined,
    comments: clientData.comments || '',
    country: clientData.country || 'USA',
    customerSince:
      clientData.customerSince || new Date().toISOString().split('T')[0],
    faxPhone: clientData.faxPhone,
    name: clientData.name, // Required field
    openTime: clientData.openTime || undefined,
    postalCode: clientData.postalCode,
    preferredDriver: clientData.preferredDriver || '',
    province: clientData.province,
    status: clientData.status || 'active', // Required field with default
    taxId: clientData.taxId,
    type: clientData.type || 'Regular', // Required field with default
    user10: clientData.user10,
    user1: clientData.user1,
    user2: clientData.user2,
    user3: clientData.user3,
    user4: clientData.user4,
    user5: clientData.user5,
    user6: clientData.user6,
    user7: clientData.user7,
    user8: clientData.user8,
    user9: clientData.user9,
    webEnabled: toTMTruthy(clientData.webEnabled),
  }

  // Validate required fields before making request
  if (!requestBody.clientId) {
    throw new Error('Client ID is required')
  }
  if (!requestBody.name) {
    throw new Error('Customer Name is required')
  }

  console.log('Creating new customer:', {
    url,
    requestBody,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': '1.0',
      Authorization: 'Bearer [REDACTED]',
    },
  })

  try {
    const response = await fetchWithAuth<{ client: Client }>(url, {
      body: JSON.stringify({ clients: [requestBody] }),
      method: 'POST',
    })

    console.log('Customer creation response:', response)
    return response.client
  } catch (error) {
    let errorMessage = 'Failed to create customer: '

    if (error instanceof Error) {
      console.error('Customer creation error details:', {
        message: error.message,
        stack: error.stack,
        requestBody,
        url,
      })

      if (error.message.includes('400')) {
        errorMessage +=
          'Invalid input parameters. Please check all required fields.'
      } else if (error.message.includes('500')) {
        errorMessage +=
          'Internal server error. The server encountered an unexpected condition.'
      } else {
        errorMessage += error.message
      }
    } else {
      console.error('Unknown error during customer creation:', error)
      errorMessage += 'An unexpected error occurred'
    }

    throw new Error(errorMessage)
  }
}
