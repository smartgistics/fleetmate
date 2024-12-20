import { useState } from 'react'

import { getUnits } from '@/services'
import { UnitType } from '@/types/truckmate'

export const useUnitsGet = ({ unitType }: { unitType?: UnitType }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [units, setUnits] = useState([])

  const execute = async () => {
    setIsLoading(true)
    try {
      const res = await getUnits({ unitType })
      setUnits(res.units)
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
    units,
  }
}
