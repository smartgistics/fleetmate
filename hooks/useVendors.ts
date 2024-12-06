import { useQuery } from '@tanstack/react-query'
import { fetchVendors, vendorPost } from '@/services/truckMateService'
import { Vendor, TruckMateQueryParams } from '@/types/truckmate'
import { useState } from 'react'

export function useVendors(
  vendorType?: Vendor['vendorType'],
  initialParams: TruckMateQueryParams = {}
) {
  const [params, setParams] = useState<TruckMateQueryParams>(initialParams)
  const [isPending, setIsPending] = useState<boolean>(false)
  const [postError, setPostError] = useState<string>('')

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['vendors', vendorType, params],
    queryFn: () => {
      console.log('Fetching vendors with params:', params)
      return fetchVendors(vendorType, params)
    },
    refetchInterval: false,
  })

  const updateParams = (newParams: Partial<TruckMateQueryParams>) => {
    console.log('Updating params:', { current: params, new: newParams })
    setParams((prev) => ({ ...prev, ...newParams }))
  }

  console.log('useVendors response:', {
    total: response?.count,
    currentPage: Math.floor((params.offset || 0) / (params.limit || 20)) + 1,
    vendors: response?.vendors?.length,
  })

  const createVendor = async (vendorData: Partial<Vendor>) => {
    try {
      setPostError('')
      setIsPending(true)
      await vendorPost(vendorData)
      await refetch()
    } catch (err) {
      setPostError(
        err instanceof Error ? err.message : 'Failed to create carrier'
      )
      throw err
    } finally {
      setIsPending(false)
    }
  }

  return {
    createVendor,
    error,
    isLoading: isLoading || isPending,
    params,
    postError,
    total: response?.count ?? 0,
    updateParams,
    vendors: response?.vendors ?? [],
  }
}
