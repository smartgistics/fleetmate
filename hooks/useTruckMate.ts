import { useEffect, useState } from "react";
import {
  fetchOrders,
  fetchTrips,
  fetchClients,
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

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setIsLoading(true);
        const response = await fetchClients(params);
        console.log(`${response.count} customers fetched`);
        console.log("First customer", JSON.stringify(response.clients[0]));
        setCustomers(response.clients);
        setTotal(response.count);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch customers"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadCustomers();
  }, [params]);

  return {
    customers,
    isLoading,
    error,
    total,
    params,
    updateParams: setParams,
  };
};
