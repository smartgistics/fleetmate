"use server";

import {
  TruckMateQueryParams,
  OrdersResponse,
  TripsResponse,
  ClientsResponse,
  CommoditiesResponse,
  VendorsResponse,
  Client,
} from "@/types/truckmate";

const TRUCKMATE_API_URL = process.env.TRUCKMATE_API_URL;
const TM_MASTERDATA_API_URL = process.env.TM_MASTERDATA_API_URL;
const API_KEY = process.env.TM_API_KEY;

const DEFAULT_LIMIT = 20;

const fetchWithAuth = async <T>(
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> => {
  if (!API_KEY) {
    console.error("TM_API_KEY is not configured");
    throw new Error("API key is not configured");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
    Accept: "application/json",
    "X-API-Version": "1.0",
  };

  if (!url) {
    throw new Error("API URL is not configured");
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 0 },
    });

    // Handle rate limiting
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 1000;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return fetchWithAuth<T>(url, options, retryCount);
    }

    // Handle server errors with retry
    if (response.status >= 500 && retryCount < 3) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, retryCount))
      );
      return fetchWithAuth<T>(url, options, retryCount + 1);
    }

    const data = await response.json();

    if (!response.ok) {
      handleTruckMateError(response.status, data?.message);
      throw new Error(
        data?.message || `HTTP error! status: ${response.status}`
      );
    }

    return data as T;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export const fetchOrders = async (
  params: TruckMateQueryParams = {}
): Promise<OrdersResponse> => {
  if (!TRUCKMATE_API_URL) {
    console.warn("TRUCKMATE_API_URL is not configured");
    return {
      href: "",
      offset: 0,
      limit: DEFAULT_LIMIT,
      sort: "",
      filter: "",
      select: "",
      count: 0,
      orders: [],
    };
  }

  const queryParams = new URLSearchParams();

  // Add only defined parameters
  if (params.offset !== undefined)
    queryParams.set("offset", params.offset.toString());
  if (params.limit !== undefined)
    queryParams.set("limit", params.limit.toString());
  if (params.orderBy) queryParams.set("orderBy", params.orderBy);
  if (params.filter) queryParams.set("filter", params.filter);
  if (params.select) queryParams.set("select", params.select.join(","));
  if (params.expand) queryParams.set("expand", params.expand.join(","));
  if (params.search) queryParams.set("search", params.search);
  if (params.fromDate) queryParams.set("fromDate", params.fromDate);
  if (params.toDate) queryParams.set("toDate", params.toDate);
  if (params.type) queryParams.set("type", params.type);
  if (params.code) queryParams.set("code", params.code);
  if (params.active !== undefined)
    queryParams.set("active", params.active.toString());

  const url = `${TRUCKMATE_API_URL}/orders?${queryParams.toString()}`;
  console.log("Fetching orders from", url);

  try {
    const response = await fetchWithAuth<OrdersResponse>(url);
    return {
      href: response.href,
      offset: response.offset,
      limit: response.limit,
      sort: response.sort,
      filter: response.filter,
      select: response.select,
      count: response.count,
      orders: Array.isArray(response.orders) ? response.orders : [],
    };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: "",
      filter: "",
      select: "",
      count: 0,
      orders: [],
    };
  }
};

export const fetchTrips = async (
  params: TruckMateQueryParams = {}
): Promise<TripsResponse> => {
  if (!TRUCKMATE_API_URL) {
    console.warn("TRUCKMATE_API_URL is not configured");
    return {
      href: "",
      offset: 0,
      limit: DEFAULT_LIMIT,
      sort: "",
      filter: "",
      select: "",
      count: 0,
      trips: [],
    };
  }

  const queryParams = new URLSearchParams();

  // Add only defined parameters
  if (params.offset !== undefined)
    queryParams.set("offset", params.offset.toString());
  if (params.limit !== undefined)
    queryParams.set("limit", params.limit.toString());
  if (params.orderBy) queryParams.set("orderBy", params.orderBy);
  if (params.filter) queryParams.set("filter", params.filter);
  if (params.status) queryParams.set("status", params.status);
  if (params.select) queryParams.set("select", params.select.join(","));
  if (params.expand) queryParams.set("expand", params.expand.join(","));
  if (params.search) queryParams.set("search", params.search);
  if (params.fromDate) queryParams.set("fromDate", params.fromDate);
  if (params.toDate) queryParams.set("toDate", params.toDate);
  if (params.type) queryParams.set("type", params.type);
  if (params.code) queryParams.set("code", params.code);
  if (params.active !== undefined)
    queryParams.set("active", params.active.toString());

  // Add default status filter for trips if not provided
  if (!params.status) {
    queryParams.set("status", "!CANCELLED,!VOID");
  }

  const url = `${TRUCKMATE_API_URL}/trips?${queryParams.toString()}`;
  console.log("Fetching trips from", url);

  try {
    const response = await fetchWithAuth<TripsResponse>(url);
    return {
      href: response.href,
      offset: response.offset,
      limit: response.limit,
      sort: response.sort,
      filter: response.filter,
      select: response.select,
      count: response.count,
      trips: Array.isArray(response.trips) ? response.trips : [],
    };
  } catch (error) {
    console.error("Failed to fetch trips:", error);
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: "",
      filter: "",
      select: "",
      count: 0,
      trips: [],
    };
  }
};

export const fetchCommodities = async (
  params: TruckMateQueryParams = {}
): Promise<CommoditiesResponse> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error("TM_MASTERDATA_API_URL is not configured");
  }

  const queryParams = new URLSearchParams();

  if (params.offset !== undefined)
    queryParams.set("offset", params.offset.toString());
  if (params.limit !== undefined)
    queryParams.set("limit", params.limit.toString());
  if (params.orderBy) queryParams.set("orderBy", params.orderBy);
  if (params.filter) queryParams.set("filter", params.filter);
  if (params.select) queryParams.set("select", params.select.join(","));
  if (params.expand) queryParams.set("expand", params.expand.join(","));
  if (params.search) queryParams.set("search", params.search);
  if (params.active !== undefined)
    queryParams.set("active", params.active.toString());

  const url = `${TM_MASTERDATA_API_URL}/commodities?${queryParams.toString()}`;
  console.log("Fetching commodities from", url);

  try {
    const response = await fetchWithAuth<CommoditiesResponse>(url);
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
    };
  } catch (error) {
    console.error("Failed to fetch commodities:", error);
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: "",
      filter: "",
      select: "",
      count: 0,
      commodities: [],
    };
  }
};

export const fetchClients = async (
  params: TruckMateQueryParams = {}
): Promise<ClientsResponse> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error("TM_MASTERDATA_API_URL is not configured");
  }

  const queryParams = new URLSearchParams();

  // Add standard parameters
  if (params.offset !== undefined)
    queryParams.set("offset", params.offset.toString());
  if (params.limit !== undefined)
    queryParams.set("limit", params.limit.toString());
  if (params.orderBy) queryParams.set("orderBy", params.orderBy);
  if (params.select) queryParams.set("select", params.select.join(","));
  if (params.expand) queryParams.set("expand", params.expand.join(","));

  // Build filter expression
  const filters: string[] = [];

  // Handle search term by converting it to a filter
  if (params.search) {
    const searchTerm = params.search.trim();
    filters.push(
      `(name like '%${searchTerm}%' or accountNumber like '%${searchTerm}%')`
    );
  }

  // Add additional filters
  if (params.active !== undefined) {
    filters.push(`isActive eq ${params.active}`);
  }
  if (params.type) {
    filters.push(`type eq '${params.type}'`);
  }
  if (params.filter) {
    filters.push(`(${params.filter})`);
  }

  // Combine all filters with AND operator
  if (filters.length > 0) {
    queryParams.set("$filter", filters.join(" and "));
  }

  const url = `${TM_MASTERDATA_API_URL}/clients?${queryParams.toString()}`;
  console.log("Fetching customers with URL:", url);
  console.log("Applied filters:", filters);

  try {
    const response = await fetchWithAuth<ClientsResponse>(url);
    console.log("API Response:", {
      count: response.count,
      clientsCount: response.clients?.length,
      filter: queryParams.get("filter"),
      url: url,
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: "",
      filter: "",
      select: "",
      count: 0,
      clients: [],
    };
  }
};

export const fetchVendors = async (
  params: TruckMateQueryParams = {}
): Promise<VendorsResponse> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error("TM_MASTERDATA_API_URL is not configured");
  }

  const queryParams = new URLSearchParams();

  if (params.offset !== undefined)
    queryParams.set("offset", params.offset.toString());
  if (params.limit !== undefined)
    queryParams.set("limit", params.limit.toString());
  if (params.orderBy) queryParams.set("orderBy", params.orderBy);
  if (params.filter) queryParams.set("filter", params.filter);
  if (params.select) queryParams.set("select", params.select.join(","));
  if (params.expand) queryParams.set("expand", params.expand.join(","));
  if (params.search) queryParams.set("search", params.search);
  if (params.type) queryParams.set("type", params.type);
  if (params.active !== undefined)
    queryParams.set("active", params.active.toString());

  const url = `${TM_MASTERDATA_API_URL}/vendors?${queryParams.toString()}`;
  console.log("Fetching vendors from", url);

  try {
    const response = await fetchWithAuth<VendorsResponse>(url);
    return {
      href: response.href,
      offset: response.offset,
      limit: response.limit,
      sort: response.sort,
      filter: response.filter,
      select: response.select,
      count: response.count,
      vendors: Array.isArray(response.vendors) ? response.vendors : [],
    };
  } catch (error) {
    console.error("Failed to fetch vendors:", error);
    return {
      href: url,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_LIMIT,
      sort: "",
      filter: "",
      select: "",
      count: 0,
      vendors: [],
    };
  }
};

export const createClient = async (
  clientData: Partial<Client>
): Promise<Client> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error("TM_MASTERDATA_API_URL is not configured");
  }

  const url = `${TM_MASTERDATA_API_URL}/clients`;

  // Format the request body according to API spec
  const requestBody = {
    clientId: clientData.accountNumber, // Required field
    name: clientData.name, // Required field
    type: clientData.type || "Regular", // Required field with default
    status: clientData.status || "Active", // Required field with default
    address1: clientData.address?.street1,
    address2: clientData.address?.street2,
    city: clientData.address?.city,
    province: clientData.address?.state,
    country: clientData.address?.country || "USA",
    postalCode: clientData.address?.zip,
    businessPhone: clientData.contact?.phone,
    businessPhoneExt: "",
    faxPhone: clientData.contact?.fax,
    businessCell: "",
    openTime: "",
    closeTime: "",
    comments: "",
    preferredDriver: "",
    customerSince: new Date().toISOString().split("T")[0],
    altContact: clientData.contact?.name,
    altBusinessPhone: "",
    altBusinessPhoneExt: "",
    altFaxPhone: "",
    altBusinessCell: "",
    taxId: clientData.taxId,
    webEnabled: clientData.webEnabled ?? true,
    isActive: clientData.isActive ?? true,
  };

  // Validate required fields before making request
  if (!requestBody.clientId) {
    throw new Error("Account Number (clientId) is required");
  }
  if (!requestBody.name) {
    throw new Error("Customer Name is required");
  }

  console.log("Creating new customer:", {
    url,
    requestBody,
    headers: {
      "Content-Type": "application/json",
      "X-API-Version": "1.0",
      Authorization: "Bearer [REDACTED]",
    },
  });

  try {
    const response = await fetchWithAuth<{ client: Client }>(url, {
      method: "POST",
      body: JSON.stringify(requestBody), // Remove array wrapper as per API spec
    });

    console.log("Customer creation response:", response);
    return response.client;
  } catch (error) {
    // Enhanced error handling
    let errorMessage = "Failed to create customer: ";

    if (error instanceof Error) {
      console.error("Customer creation error details:", {
        message: error.message,
        stack: error.stack,
        requestBody,
        url,
      });

      // Parse specific error cases
      if (error.message.includes("400")) {
        errorMessage +=
          "Invalid input parameters. Please check all required fields.";
      } else if (error.message.includes("500")) {
        errorMessage +=
          "Internal server error. The server encountered an unexpected condition.";
      } else {
        errorMessage += error.message;
      }
    } else {
      console.error("Unknown error during customer creation:", error);
      errorMessage += "An unexpected error occurred";
    }

    throw new Error(errorMessage);
  }
};

// Update error handler with more specific error messages
const handleTruckMateError = (status: number, errorMessage?: string) => {
  const errorDetails = {
    status,
    message: errorMessage,
    timestamp: new Date().toISOString(),
  };

  let logMessage = "";

  switch (status) {
    case 400:
      logMessage =
        "Bad Request - Invalid input parameters. Check required fields and data types.";
      break;
    case 401:
      logMessage = "Authentication failed - Invalid or expired API key.";
      break;
    case 403:
      logMessage =
        "Authorization failed - Your API key doesn't have permission for this operation.";
      break;
    case 404:
      logMessage =
        "Resource not found - The requested endpoint or resource doesn't exist.";
      break;
    case 420:
      logMessage =
        "License not available - Your TruckMate license doesn't include this feature.";
      break;
    case 429:
      logMessage =
        "Too many requests - Please implement rate limiting or reduce request frequency.";
      break;
    case 500:
      logMessage =
        "Internal server error - The server encountered an unexpected condition. Check request payload.";
      break;
    default:
      logMessage = `API Error (${status}): ${errorMessage || "Unknown error"}`;
  }

  console.error(logMessage, errorDetails);
  return logMessage;
};
