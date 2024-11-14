import { useEffect, useState, useCallback } from "react";
import {
  fetchOrders,
  fetchTrips,
  fetchClients,
  createClient,
} from "@/services/truckMateService";
import { Order, Trip, TruckMateQueryParams, Client } from "@/types/truckmate";

const DEFAULT_LIMIT = 20;

export const useOrders = (initialParams: TruckMateQueryParams = {}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<TruckMateQueryParams>({
    limit: DEFAULT_LIMIT,
    offset: 0,
    ...initialParams,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetchOrders(params);
        setOrders(response.orders);
        setTotal(response.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
      } finally {
        setIsLoading(false);
      }
    };

    void loadOrders();
  }, [params]);

  return {
    orders,
    isLoading,
    error,
    total,
    params,
    updateParams: setParams,
  };
};

export const useTrips = (initialParams: TruckMateQueryParams = {}) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<TruckMateQueryParams>({
    limit: DEFAULT_LIMIT,
    offset: 0,
    ...initialParams,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTrips(params);
        setTrips(response.trips);
        setTotal(response.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch trips");
      } finally {
        setIsLoading(false);
      }
    };

    void loadTrips();
  }, [params]);

  return {
    trips,
    isLoading,
    error,
    total,
    params,
    updateParams: setParams,
  };
};

export const useCustomers = (initialParams: TruckMateQueryParams = {}) => {
  const [customers, setCustomers] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<TruckMateQueryParams>({
    limit: DEFAULT_LIMIT,
    offset: 0,
    ...initialParams,
  });
  const [total, setTotal] = useState(0);

  const loadCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchClients(params);
      setCustomers(response.clients);
      setTotal(response.count);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch customers"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    void loadCustomers();
  }, [loadCustomers]);

  const createCustomer = async (customerData: Partial<Client>) => {
    try {
      setIsLoading(true);
      await createClient(customerData);
      // Reload the customers list after creating a new one
      await loadCustomers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create customer"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    customers,
    isLoading,
    error,
    total,
    params,
    updateParams: setParams,
    createCustomer,
  };
};
