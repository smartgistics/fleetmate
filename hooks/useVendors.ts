import { useQuery } from "@tanstack/react-query";
import { fetchVendors } from "@/services/truckMateService";
import { Vendor, TruckMateQueryParams } from "@/types/truckmate";
import { useState } from "react";

export function useVendors(
  vendorType?: Vendor["vendorType"],
  initialParams: TruckMateQueryParams = {}
) {
  const [params, setParams] = useState<TruckMateQueryParams>(initialParams);

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendors", vendorType, params],
    queryFn: () => fetchVendors(vendorType, params),
  });

  const updateParams = (newParams: Partial<TruckMateQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  return {
    vendors: response?.vendors ?? [],
    isLoading,
    error,
    total: response?.count ?? 0,
    params,
    updateParams,
  };
}
