"use server";

import {
  TruckMateQueryParams,
  OrdersResponse,
  TripsResponse,
  ClientsResponse,
  CommoditiesResponse,
  VendorsResponse,
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
  if (params.active !== undefined)
    queryParams.set("active", params.active.toString());

  const url = `${TM_MASTERDATA_API_URL}/clients?${queryParams.toString()}`;
  console.log("Fetching customers from", url);

  try {
    const response = await fetchWithAuth<ClientsResponse>(url);
    return {
      href: response.href,
      offset: response.offset,
      limit: response.limit,
      sort: response.sort,
      filter: response.filter,
      select: response.select,
      count: response.count,
      clients: Array.isArray(response.clients) ? response.clients : [],
    };
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleTruckMateError = (status: number, errorMessage?: string) => {
  const errorDetails = {
    status,
    message: errorMessage,
    timestamp: new Date().toISOString(),
  };

  switch (status) {
    case 400:
      console.error("Bad Request - Invalid input parameters:", errorDetails);
      break;
    case 401:
      console.error("Authentication failed - check API key:", errorDetails);
      break;
    case 403:
      console.error(
        "Authorization failed - insufficient permissions:",
        errorDetails
      );
      break;
    case 404:
      console.error("Resource not found:", errorDetails);
      break;
    case 420:
      console.error("License not available:", errorDetails);
      break;
    case 429:
      console.error(
        "Too many requests - implement rate limiting:",
        errorDetails
      );
      break;
    case 500:
      console.error("Internal server error:", errorDetails);
      break;
    default:
      console.error("API Error:", errorDetails);
  }
};
