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
    queryFn: () => {
      console.log("Fetching vendors with params:", params);
      return fetchVendors(vendorType, params);
    },
  });

  const updateParams = (newParams: Partial<TruckMateQueryParams>) => {
    console.log("Updating params:", { current: params, new: newParams });
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  console.log("useVendors response:", {
    total: response?.count,
    currentPage: Math.floor((params.offset || 0) / (params.limit || 20)) + 1,
    vendors: response?.vendors?.length,
  });

  return {
    vendors: response?.vendors ?? [],
    isLoading,
    error,
    total: response?.count ?? 0,
    params,
    updateParams,
  };
}
