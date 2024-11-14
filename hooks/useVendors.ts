import { useQuery } from "@tanstack/react-query";
import { fetchVendors } from "@/services/truckMateService";
import { Vendor, TruckMateQueryParams } from "@/types/truckmate";

export function useVendors(
  vendorType?: Vendor["vendorType"],
  params: TruckMateQueryParams = {}
) {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendors", vendorType, params],
    queryFn: () => fetchVendors(vendorType, params),
  });

  return {
    vendors: response?.vendors ?? [],
    isLoading,
    error,
    total: response?.count ?? 0,
  };
}
