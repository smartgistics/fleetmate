import { useState } from 'react'

import { getZones } from '@/services'

export const useZonesGet = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [zones, setZones] = useState([])

  const execute = async () => {
    setIsLoading(true)
    try {
      const res = await getZones()
      setZones(res)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    error,
    execute,
    isLoading,
    zones,
  }
}
