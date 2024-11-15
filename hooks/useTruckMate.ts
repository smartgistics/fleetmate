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
    // select: [
    //   "orderId",
    //   "billTo",
    //   "billType",
    //   "commodity",
    //   "createdBy",
    //   "createdTime",
    //   "status",
    //   "serviceLevel",
    //   "currentStatusBehaviour",
    //   "totalCharges",
    //   "billToCode",
    //   "billDate",
    //   "actualDelivery",
    //   "actualPickup",
    // ],
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
        const response = await fetchTrips({
          ...params,
          codeBehavior: "assignment",
        });
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
    select: [
      "clientId",
      "name",
      "status",
      "businessPhone",
      "address1",
      "address2",
      "city",
      "province",
      "country",
      "postalCode",
      "businessPhoneExt",
      "faxPhone",
      "comments",
      "customerSince",
      "webEnabled",
    ],
    ...initialParams,
  });
  const [total, setTotal] = useState(0);

  const loadCustomers = useCallback(async () => {
    try {
      setIsLoading(true);

      const apiParams: TruckMateQueryParams = {
        ...params,
        filter: params.filter,
        select: params.select,
        orderBy: params.orderBy,
        limit: params.limit,
        offset: params.offset,
        expand: params.expand,
      };

      const response = await fetchClients(apiParams);

      setCustomers(response.clients);
      setTotal(response.count);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch customers";
      setError(errorMessage);
      console.error("Error loading customers:", err);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    void loadCustomers();
  }, [loadCustomers]);

  const updateParams = useCallback(
    (newParams: Partial<TruckMateQueryParams>) => {
      console.log("Updating params:", {
        current: params,
        new: newParams,
        resultingOffset: newParams.offset,
      });

      setParams((prev) => ({
        ...prev,
        ...newParams,
        offset:
          newParams.filter !== undefined ? 0 : newParams.offset ?? prev.offset,
        select: prev.select,
        expand: prev.expand,
      }));
    },
    [params]
  );

  const createCustomer = async (customerData: Partial<Client>) => {
    try {
      setIsLoading(true);
      await createClient(customerData);
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
    updateParams,
    createCustomer,
  };
};
