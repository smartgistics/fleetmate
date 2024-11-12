import { useEffect, useState } from "react";
import { fetchOrders, fetchTrips } from "@/services/truckMateService";
import { Order, Trip } from "@/types";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  return { orders, isLoading, error };
};

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await fetchTrips();
        setTrips(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch trips");
      } finally {
        setIsLoading(false);
      }
    };

    loadTrips();
  }, []);

  return { trips, isLoading, error };
};
