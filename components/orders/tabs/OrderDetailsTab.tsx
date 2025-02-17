import React from 'react'
import { v4 } from 'uuid'
import { useQuery } from '@tanstack/react-query'

import { fetchCommodities } from '@/services/truckMateService'
import { FormData, ServiceLevel, Commodity } from '@/types/truckmate'

interface OrderDetailsTabProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

export function OrderDetailsTab({
  formData,
  setFormData,
}: OrderDetailsTabProps) {
  const { data: commodities } = useQuery({
    queryKey: ['commodities'],
    queryFn: () => fetchCommodities(),
  })

  const serviceLevels: ServiceLevel[] = [
    {
      code: 'STD',
      description: 'Standard',
      active: true,
      guaranteedService: false,
      expeditedService: false,
    },
    {
      code: 'EXP',
      description: 'Expedited',
      active: true,
      guaranteedService: true,
      expeditedService: true,
    },
  ]

  const handleCommodityAdd = (commodity: Commodity) => {
    setFormData({
      ...formData,
      commodities: [...formData.commodities, commodity],
    })
  }

  return (
    <div className="space-y-6">
      {/* Service Level Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service Level
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, serviceLevel: e.target.value })
          }
          value={formData.serviceLevel}
        >
          <option value="">Select a service level</option>
          {serviceLevels.map((level) => (
            <option key={v4()} value={level.code}>
              {level.description}
            </option>
          ))}
        </select>
      </div>

      {/* Commodities Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Commodities
        </label>
        <div className="mt-2 space-y-4">
          {commodities?.commodities.map((commodity) => (
            <div
              className="flex items-center justify-between p-2 border rounded"
              key={v4()}
            >
              <span>{commodity.description}</span>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleCommodityAdd(commodity)}
                type="button"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Commodities */}
      {formData.commodities.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">
            Selected Commodities
          </h4>
          <div className="mt-2 space-y-2">
            {formData.commodities.map((commodity, index) => (
              <div
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                key={v4()}
              >
                <span>{commodity.description}</span>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => {
                    const newCommodities = formData.commodities.filter(
                      (_, i) => i !== index
                    )
                    setFormData({ ...formData, commodities: newCommodities })
                  }}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
