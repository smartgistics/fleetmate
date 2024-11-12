"use server";

import { Order, Trip, TruckMateResponse, Commodity } from "@/types";

const TRUCKMATE_API_URL = process.env.TRUCKMATE_API_URL;
const TM_MASTERDATA_API_URL = process.env.TM_MASTERDATA_API_URL;
const API_KEY = process.env.TM_API_KEY;
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const fetchWithAuth = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  if (!url) {
    throw new Error("API URL is not configured");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      if (IS_DEVELOPMENT) {
        throw new Error(`API Error (${url}): ${errorMessage}`);
      }
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  if (!TRUCKMATE_API_URL) {
    console.warn("TRUCKMATE_API_URL is not configured");
    return [];
  }

  const url = `${TRUCKMATE_API_URL}/orders`;
  console.log("Fetching orders from", url);

  try {
    const response = await fetchWithAuth<TruckMateResponse<Order[]>>(url);
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const fetchTrips = async (): Promise<Trip[]> => {
  if (!TRUCKMATE_API_URL) {
    console.warn("TRUCKMATE_API_URL is not configured");
    return [];
  }

  const url = `${TRUCKMATE_API_URL}/trips?status=!CANCELLED&status=!VOID&limit=2&expand=carriers`;
  console.log("Fetching trips from", url);

  try {
    const response = await fetchWithAuth<TruckMateResponse<Trip[]>>(url);
    const trips = response.data || [];

    return trips.filter(
      (trip) => trip.status !== "CANCELLED" && trip.status !== "VOID"
    );
  } catch (error) {
    console.error("Failed to fetch trips:", error);
    throw error;
  }
};

export const fetchCommodities = async (): Promise<Commodity[]> => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error("TM_MASTERDATA_API_URL is not configured");
  }

  const url = `${TM_MASTERDATA_API_URL}/commodities`;
  console.log("Fetching commodities from", url);
  const response = await fetchWithAuth<TruckMateResponse<Commodity[]>>(url);
  return response.data || [];
};
